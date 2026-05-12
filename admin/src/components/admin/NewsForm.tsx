"use client";

import { useActionState, useEffect } from "react";
import Script from "next/script";
import { createNews, type CreateNewsState } from "@/app/noticias/criar/actions";
import RichTextEditor, {
  initializeCreateNews,
} from "@/components/admin/RichTextEditor";

const DEFAULT_CATEGORIES = ["RPG", "Ação", "Aventura", "Estratégia"];
const DEFAULT_TAGS = [
  "RPG",
  "Ação",
  "Aventura",
  "Estratégia",
  "Indie",
  "Multiplayer",
];

const initialCreateNewsState: CreateNewsState = {
  message: "",
  errors: {},
};

function FieldErrors({
  errors,
  field,
}: {
  errors: CreateNewsState["errors"];
  field: keyof CreateNewsState["errors"];
}) {
  const fieldErrors = errors[field];

  if (!fieldErrors?.length) {
    return null;
  }

  return (
    <ul className="form-error" aria-live="polite">
      {fieldErrors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

function PickerButton({
  children,
  className,
  dataAttribute,
}: {
  children: React.ReactNode;
  className: string;
  dataAttribute?: Record<string, string>;
}) {
  return (
    <button type="button" className={className} {...dataAttribute}>
      {children}
    </button>
  );
}

export default function NewsForm() {
  const [state, formAction, pending] = useActionState(
    createNews,
    initialCreateNewsState,
  );

  useEffect(() => {
    // Liga o editor Quill e os seletores customizados depois da hidratação.
    initializeCreateNews();
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      />

      <Script
        src="https://cdn.quilljs.com/1.3.6/quill.js"
        strategy="afterInteractive"
        onReady={initializeCreateNews}
      />

      <main>
        <section className="create-form" aria-label="Formulário de criação">
          <h2>Criar notícia</h2>

          <form action={formAction}>
            {state.message ? (
              <p className="form-message" role="status">
                {state.message}
              </p>
            ) : null}

            {/* Campo principal exibido nas listagens e na página da notícia. */}
            <label htmlFor="title">Título:</label>
            <input type="text" id="title" name="title" maxLength={255} required />
            <FieldErrors errors={state.errors} field="title" />

            <label htmlFor="slug">URL da notícia:</label>
            <div className="slug-field">
              <span aria-hidden="true">/noticias/</span>
              <input
                type="text"
                id="slug"
                name="slug"
                maxLength={180}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="url-da-noticia"
                aria-describedby="slugHelp"
              />
            </div>
            <p className="field-hint" id="slugHelp">
              Gerada pelo título, mas pode ser editada antes de publicar.
            </p>
            <FieldErrors errors={state.errors} field="slug" />

            {/* Categoria única, enviada em um input hidden para a Server Action. */}
            <label>Categoria:</label>
            <div className="category-picker">
              <div className="category-selected" id="selectedCategory">
                Nenhuma categoria selecionada
              </div>

              <div className="category-options" id="categoryOptions">
                {DEFAULT_CATEGORIES.map((category) => (
                  <PickerButton
                    key={category}
                    className="tag-chip category-option"
                    dataAttribute={{ "data-category": category }}
                  >
                    {category}
                  </PickerButton>
                ))}
                <button type="button" className="tag-chip category-add-button" id="addCategoryChip">
                  +
                </button>
              </div>

              <div className="category-add-input" id="categoryAddInput" hidden>
                <input
                  type="text"
                  id="categoryCustom"
                  maxLength={255}
                  placeholder="Adicionar nova categoria"
                />
                <button type="button" id="addCategoryBtn">
                  OK
                </button>
              </div>

              <input type="hidden" id="category" name="category" defaultValue="" />
            </div>
            <FieldErrors errors={state.errors} field="category" />

            {/* Tags múltiplas, salvas em lista separada por vírgula antes do envio. */}
            <label>Tags:</label>
            <div className="tag-picker">
              <div className="tag-selected" id="selectedTags">
                Nenhuma tag selecionada
              </div>

              <div className="tag-options" id="tagOptions">
                {DEFAULT_TAGS.map((tag) => (
                  <PickerButton
                    key={tag}
                    className="tag-chip tag-option"
                    dataAttribute={{ "data-tag": tag }}
                  >
                    {tag}
                  </PickerButton>
                ))}
                <button
                  type="button"
                  className="tag-chip tag-add-button"
                  id="addTagChip"
                >
                  +
                </button>
              </div>

              <div className="tag-add-input" id="tagAddInput" hidden>
                <input
                  type="text"
                  id="tagCustom"
                  maxLength={255}
                  placeholder="Digite uma nova tag e pressione OK"
                />
                <button type="button" id="addTagBtn">
                  OK
                </button>
              </div>

              <input type="hidden" id="tags" name="tags" defaultValue="" />
            </div>
            <FieldErrors errors={state.errors} field="tags" />

            <label htmlFor="manchete">Manchete:</label>
            <textarea
              id="manchete"
              name="manchete"
              rows={2}
              maxLength={255}
              required
            />
            <FieldErrors errors={state.errors} field="manchete" />

            <RichTextEditor
              errors={<FieldErrors errors={state.errors} field="content" />}
            />

            <label htmlFor="file">Imagens</label>
            <div className="custom-file-upload">
              <input type="file" id="file" name="myfiles[]" multiple />
            </div>

            <label htmlFor="publish-date">Data de publicação:</label>
            <input type="date" id="publish-date" name="publish-date" required />
            <FieldErrors errors={state.errors} field="publish-date" />

            <button type="submit" disabled={pending}>
              {pending ? "Publicando..." : "Publicar"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
