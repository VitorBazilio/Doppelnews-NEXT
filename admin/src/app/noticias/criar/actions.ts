"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@doppelnews/shared/lib/prisma";
import {
  sanitizeHtmlContent,
  sanitizePlainText,
  stripHtml,
} from "@doppelnews/shared/lib/security";
import { createUniqueArticleSlug } from "@doppelnews/shared/lib/slugs";

type CreateNewsField =
  | "title"
  | "slug"
  | "category"
  | "tags"
  | "manchete"
  | "content"
  | "publish-date";

export type CreateNewsState = {
  message: string;
  errors: Partial<Record<CreateNewsField, string[]>>;
};

const MAX_TAGS = 10;
const ADMIN_EMAIL = "admin@doppelnews.local";

function getText(formData: FormData, key: CreateNewsField) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function addError(
  errors: CreateNewsState["errors"],
  field: CreateNewsField,
  message: string,
) {
  errors[field] = [...(errors[field] ?? []), message];
}

function parsePublishDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseTags(value: string, errors: CreateNewsState["errors"]) {
  // Remove duplicadas, espaços extras e entradas vazias antes de salvar.
  const tags = Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => sanitizePlainText(tag, { maxLength: 255 }))
        .filter(Boolean),
    ),
  );

  if (tags.length > MAX_TAGS) {
    addError(errors, "tags", `Use no máximo ${MAX_TAGS} tags.`);
  }

  if (tags.some((tag) => tag.length > 255)) {
    addError(errors, "tags", "Cada tag deve ter no máximo 255 caracteres.");
  }

  return tags.slice(0, MAX_TAGS);
}

export async function createNews(
  _previousState: CreateNewsState,
  formData: FormData,
): Promise<CreateNewsState> {
  const title = sanitizePlainText(getText(formData, "title"), { maxLength: 255 });
  const requestedSlug = getText(formData, "slug");
  const category = sanitizePlainText(getText(formData, "category"), {
    maxLength: 255,
  });
  const headline = sanitizePlainText(getText(formData, "manchete"), {
    maxLength: 255,
  });
  const content = sanitizeHtmlContent(getText(formData, "content"));
  const publishDateValue = getText(formData, "publish-date");
  const errors: CreateNewsState["errors"] = {};

  // Validação defensiva no servidor, mesmo com campos obrigatórios no HTML.
  if (title.length < 3) {
    addError(errors, "title", "Informe um título com pelo menos 3 caracteres.");
  }

  if (title.length > 255) {
    addError(errors, "title", "O título deve ter no máximo 255 caracteres.");
  }

  if (requestedSlug.length > 180) {
    addError(errors, "slug", "A URL deve ter no máximo 180 caracteres.");
  }

  if (!category) {
    addError(errors, "category", "Selecione ou crie uma categoria.");
  }

  if (category.length > 255) {
    addError(errors, "category", "A categoria deve ter no máximo 255 caracteres.");
  }

  if (headline.length < 5) {
    addError(
      errors,
      "manchete",
      "Informe uma manchete com pelo menos 5 caracteres.",
    );
  }

  if (headline.length > 255) {
    addError(errors, "manchete", "A manchete deve ter no máximo 255 caracteres.");
  }

  if (!stripHtml(content)) {
    addError(errors, "content", "Escreva o conteúdo da notícia.");
  }

  const publishedAt = parsePublishDate(publishDateValue);
  if (!publishedAt) {
    addError(errors, "publish-date", "Informe uma data de publicação válida.");
  }

  const tags = parseTags(getText(formData, "tags"), errors);

  if (Object.keys(errors).length > 0 || !publishedAt) {
    return {
      message: "Revise os campos destacados antes de publicar.",
      errors,
    };
  }

  const slug = await createUniqueArticleSlug(
    requestedSlug || title,
    async (candidate) => {
      const existingArticle = await prisma.article.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      return !!existingArticle;
    },
  );

  // Garante um autor administrativo local para associar novas publicações.
  const author = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      name: "DoppelNews Admin",
      email: ADMIN_EMAIL,
      password: randomUUID(),
    },
    select: {
      id: true,
    },
  });

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      category,
      headline,
      content,
      publishedAt,
      tags,
      authorId: author.id,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  // Atualiza as páginas que dependem da lista de notícias antes do redirect.
  revalidatePath("/");
  revalidatePath("/noticias");
  redirect(`/noticias/editar/${article.id}`);
}
