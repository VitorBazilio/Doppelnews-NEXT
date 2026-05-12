"use client";

import type { ReactNode } from "react";
import { slugify } from "@doppelnews/shared/lib/slugs";

type QuillEditor = {
  root: HTMLElement;
  getText(): string;
};

type QuillConstructor = new (
  selector: string,
  options: {
    theme: string;
    placeholder: string;
    modules: {
      toolbar: unknown[];
    };
  },
) => QuillEditor;

declare const Quill: QuillConstructor;

type RichTextEditorProps = {
  errors?: ReactNode;
};

export default function RichTextEditor({ errors }: RichTextEditorProps) {
  return (
    <>
      {/* Quill renderiza o editor visual; o HTML final vai para o input hidden. */}
      <label htmlFor="contentEditor">Conteúdo:</label>
      <div id="contentEditor" className="rich-editor" />
      <input
        type="hidden"
        id="content"
        name="content"
        defaultValue=""
        className="ql-editor"
      />
      {errors}
    </>
  );
}

export function initializeCreateNews(): void {
  const tagOptions = document.querySelectorAll<HTMLButtonElement>(".tag-option");
  const selectedContainer = document.getElementById("selectedTags") as HTMLElement;
  const hiddenInput = document.getElementById("tags") as HTMLInputElement;

  const categoryOptions =
    document.querySelectorAll<HTMLButtonElement>(".category-option");
  const selectedCategoryContainer = document.getElementById(
    "selectedCategory",
  ) as HTMLElement;
  const categoryInput = document.getElementById("category") as HTMLInputElement;

  const categoryCustomInput = document.getElementById(
    "categoryCustom",
  ) as HTMLInputElement;
  const addCategoryBtn = document.getElementById(
    "addCategoryBtn",
  ) as HTMLButtonElement;
  const addCategoryChip = document.getElementById(
    "addCategoryChip",
  ) as HTMLButtonElement;
  const categoryAddInput = document.getElementById(
    "categoryAddInput",
  ) as HTMLElement;

  const tagCustomInput = document.getElementById("tagCustom") as HTMLInputElement;
  const addTagBtn = document.getElementById("addTagBtn") as HTMLButtonElement;
  const addTagChip = document.getElementById("addTagChip") as HTMLButtonElement;
  const tagAddInput = document.getElementById("tagAddInput") as HTMLElement;

  const contentInput = document.getElementById("content") as HTMLInputElement;
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const slugInput = document.getElementById("slug") as HTMLInputElement;
  const form = document.querySelector<HTMLFormElement>(".create-form form");

  if (!form || form.dataset.initialized === "true" || typeof Quill === "undefined") {
    return;
  }

  form.dataset.initialized = "true";

  let selectedTags: string[] = [];
  let selectedCategory: string | null = null;
  let slugEdited = false;

  // Quill controla o editor visual, mas o HTML final vai para um input hidden.
  const quill = new Quill("#contentEditor", {
    theme: "snow",
    placeholder: "Escreva o conteúdo da notícia aqui...",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "blockquote", "code-block"],
        ["clean"],
      ],
    },
  });

  function updateHiddenInput(): void {
    hiddenInput.value = selectedTags.join(",");
  }

  function updateCategoryInput(): void {
    categoryInput.value = selectedCategory ?? "";
  }

  function syncSlugFromTitle(): void {
    if (!slugEdited) {
      slugInput.value = slugify(titleInput.value);
    }
  }

  function renderSelectedTags(): void {
    selectedContainer.innerHTML = "";

    if (selectedTags.length === 0) {
      selectedContainer.textContent = "Nenhuma tag selecionada";
      return;
    }

    selectedTags.forEach((tag) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tag-chip selected-tag";
      chip.textContent = tag;
      chip.title = "Clique para remover";
      chip.addEventListener("click", () => removeTag(tag));
      selectedContainer.appendChild(chip);
    });
  }

  function renderSelectedCategory(): void {
    selectedCategoryContainer.innerHTML = "";

    if (!selectedCategory) {
      selectedCategoryContainer.textContent = "Nenhuma categoria selecionada";
      return;
    }

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "tag-chip selected-tag";
    chip.textContent = selectedCategory;
    chip.title = "Clique para remover a categoria selecionada";
    chip.addEventListener("click", removeCategory);
    selectedCategoryContainer.appendChild(chip);
  }

  function updateCategoryButtons(): void {
    categoryOptions.forEach((button) => {
      const category = button.dataset.category;

      button.disabled = selectedCategory === category;
      button.classList.toggle("disabled", selectedCategory === category);
    });
  }

  function setCategory(category: string): void {
    selectedCategory = category;
    updateCategoryInput();
    renderSelectedCategory();
    updateCategoryButtons();
    categoryAddInput.hidden = true;
  }

  function removeCategory(): void {
    selectedCategory = null;
    updateCategoryInput();
    renderSelectedCategory();
    updateCategoryButtons();
  }

  function updateOptionButtons(): void {
    tagOptions.forEach((button) => {
      const tag = button.dataset.tag;
      const isSelected = !!tag && selectedTags.includes(tag);

      button.disabled = isSelected;
      button.classList.toggle("disabled", isSelected);
    });
  }

  function addTag(tag: string): void {
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
      updateHiddenInput();
      renderSelectedTags();
      updateOptionButtons();
      tagAddInput.hidden = true;
    }
  }

  function removeTag(tag: string): void {
    selectedTags = selectedTags.filter((item) => item !== tag);
    updateHiddenInput();
    renderSelectedTags();
    updateOptionButtons();
  }

  tagOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;

      if (tag) {
        addTag(tag);
      }
    });
  });

  categoryOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      if (category) {
        setCategory(category);
      }
    });
  });

  addCategoryChip.addEventListener("click", () => {
    categoryAddInput.hidden = false;
    categoryCustomInput.focus();
  });

  addCategoryBtn.addEventListener("click", () => {
    const categoryName = categoryCustomInput.value.trim();

    if (categoryName) {
      setCategory(categoryName);
      categoryCustomInput.value = "";
      categoryAddInput.hidden = true;
    }
  });

  categoryCustomInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCategoryBtn.click();
    }
  });

  addTagChip.addEventListener("click", () => {
    tagAddInput.hidden = false;
    tagCustomInput.focus();
  });

  addTagBtn.addEventListener("click", () => {
    const tagName = tagCustomInput.value.trim();

    if (tagName) {
      addTag(tagName);
      tagCustomInput.value = "";
      tagAddInput.hidden = true;
    }
  });

  tagCustomInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTagBtn.click();
    }
  });

  renderSelectedTags();
  updateOptionButtons();
  renderSelectedCategory();
  updateCategoryButtons();

  titleInput.addEventListener("input", syncSlugFromTitle);

  slugInput.addEventListener("input", () => {
    slugEdited = slugInput.value.trim().length > 0;
  });

  slugInput.addEventListener("blur", () => {
    slugInput.value = slugify(slugInput.value);
    slugEdited = slugInput.value.length > 0;
  });

  form?.addEventListener("submit", (event) => {
    contentInput.value = quill.root.innerHTML.trim();
    slugInput.value = slugify(slugInput.value || titleInput.value);

    const contentText = quill.getText().trim();

    if (!selectedCategory) {
      event.preventDefault();
      alert("Por favor, selecione ou crie uma categoria antes de publicar.");
      return;
    }

    if (!contentText) {
      event.preventDefault();
      alert("Por favor, escreva o conteúdo da notícia antes de publicar.");
    }
  });
}
