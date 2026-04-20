document.addEventListener('DOMContentLoaded', function () {
    // Seletores principais do formulário
    var tagOptions = document.querySelectorAll('.tag-option');
    var selectedContainer = document.getElementById('selectedTags');
    var hiddenInput = document.getElementById('tags');
    var selectedTags = [];

    var categoryOptions = document.querySelectorAll('.category-option');
    var selectedCategoryContainer = document.getElementById('selectedCategory');
    var categoryInput = document.getElementById('category');
    var selectedCategory = null;

    // Controles para criação de categoria e tag
    var categoryCustomInput = document.getElementById('categoryCustom');
    var addCategoryBtn = document.getElementById('addCategoryBtn');
    var addCategoryChip = document.getElementById('addCategoryChip');
    var categoryAddInput = document.getElementById('categoryAddInput');

    var tagCustomInput = document.getElementById('tagCustom');
    var addTagBtn = document.getElementById('addTagBtn');
    var addTagChip = document.getElementById('addTagChip');
    var tagAddInput = document.getElementById('tagAddInput');

    // Rich Text Editor para o conteúdo da notícia
    var contentEditor = document.getElementById('contentEditor');
    var contentInput = document.getElementById('content');
    var quill = new Quill('#contentEditor', {
        theme: 'snow',
        placeholder: 'Escreva o conteúdo da notícia aqui...',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'blockquote', 'code-block'],
                ['clean']
            ]
        }
    });

    // Sincroniza o campo oculto de tags com as tags selecionadas
    function updateHiddenInput() {
        hiddenInput.value = selectedTags.join(',');
    }

    // Sincroniza o campo oculto de categoria com a categoria selecionada
    function updateCategoryInput() {
        categoryInput.value = selectedCategory || '';
    }

    // Renderiza as tags selecionadas como chips removíveis
    function renderSelectedTags() {
        selectedContainer.innerHTML = '';

        if (selectedTags.length === 0) {
            selectedContainer.textContent = 'Nenhuma tag selecionada';
            return;
        }

        selectedTags.forEach(function (tag) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'tag-chip selected-tag';
            chip.textContent = tag;
            chip.title = 'Clique para remover';
            chip.addEventListener('click', function () {
                removeTag(tag);
            });
            selectedContainer.appendChild(chip);
        });
    }

    // Renderiza a categoria selecionada como chip removível
    function renderSelectedCategory() {
        selectedCategoryContainer.innerHTML = '';

        if (!selectedCategory) {
            selectedCategoryContainer.textContent = 'Nenhuma categoria selecionada';
            return;
        }

        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'tag-chip selected-tag';
        chip.textContent = selectedCategory;
        chip.title = 'Clique para remover a categoria selecionada';
        chip.addEventListener('click', function () {
            removeCategory();
        });
        selectedCategoryContainer.appendChild(chip);
    }

    // Atualiza o estado dos botões de categoria para evitar escolher a mesma categoria duas vezes
    function updateCategoryButtons() {
        categoryOptions.forEach(function (button) {
            var category = button.dataset.category;
            if (selectedCategory === category) {
                button.classList.add('disabled');
                button.disabled = true;
            } else {
                button.classList.remove('disabled');
                button.disabled = false;
            }
        });
    }

    // Seleciona a categoria e atualiza o formulário
    function setCategory(category) {
        selectedCategory = category;
        updateCategoryInput();
        renderSelectedCategory();
        updateCategoryButtons();
        categoryAddInput.hidden = true;
    }

    // Remove a categoria selecionada do estado
    function removeCategory() {
        selectedCategory = null;
        updateCategoryInput();
        renderSelectedCategory();
        updateCategoryButtons();
    }

    // Atualiza o estado dos botões de tag para evitar marcações duplicadas
    function updateOptionButtons() {
        tagOptions.forEach(function (button) {
            var tag = button.dataset.tag;
            if (selectedTags.includes(tag)) {
                button.classList.add('disabled');
                button.disabled = true;
            } else {
                button.classList.remove('disabled');
                button.disabled = false;
            }
        });
    }

    // Adiciona uma tag nova ou existente ao conjunto de seleção
    function addTag(tag) {
        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
            updateHiddenInput();
            renderSelectedTags();
            updateOptionButtons();
            tagAddInput.hidden = true;
        }
    }

    // Remove uma tag da seleção
    function removeTag(tag) {
        selectedTags = selectedTags.filter(function (item) {
            return item !== tag;
        });
        updateHiddenInput();
        renderSelectedTags();
        updateOptionButtons();
    }

    // Eventos de seleção de tags pré-definidas
    tagOptions.forEach(function (button) {
        button.addEventListener('click', function () {
            addTag(button.dataset.tag);
        });
    });

    // Eventos de seleção de categorias pré-definidas
    categoryOptions.forEach(function (button) {
        button.addEventListener('click', function () {
            setCategory(button.dataset.category);
        });
    });

    // Exibe o campo de entrada para criar nova categoria
    addCategoryChip.addEventListener('click', function () {
        categoryAddInput.hidden = false;
        categoryCustomInput.focus();
    });

    // Cria nova categoria ao clicar em OK
    addCategoryBtn.addEventListener('click', function () {
        var categoryName = categoryCustomInput.value.trim();
        if (categoryName) {
            setCategory(categoryName);
            categoryCustomInput.value = '';
            categoryAddInput.hidden = true;
        }
    });

    // Permite enviar a nova categoria com Enter
    categoryCustomInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addCategoryBtn.click();
        }
    });

    // Exibe o campo de entrada para criar nova tag
    addTagChip.addEventListener('click', function () {
        tagAddInput.hidden = false;
        tagCustomInput.focus();
    });

    // Cria nova tag ao clicar em OK
    addTagBtn.addEventListener('click', function () {
        var tagName = tagCustomInput.value.trim();
        if (tagName) {
            addTag(tagName);
            tagCustomInput.value = '';
            tagAddInput.hidden = true;
        }
    });

    // Permite enviar a nova tag com Enter
    tagCustomInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTagBtn.click();
        }
    });

    // Inicializa a interface com valores padrões
    renderSelectedTags();
    updateOptionButtons();
    renderSelectedCategory();
    updateCategoryButtons();

    // Validação simples de envio: exige categoria selecionada
    var form = document.querySelector('.create-form form');
    form.addEventListener('submit', function (event) {
        // Sincroniza o conteúdo do editor com o campo oculto antes de enviar
        contentInput.value = quill.root.innerHTML.trim();

        var contentText = quill.getText().trim();
        if (!selectedCategory) {
            event.preventDefault();
            alert('Por favor, selecione ou crie uma categoria antes de publicar.');
            return;
        }

        if (!contentText) {
            event.preventDefault();
            alert('Por favor, escreva o conteúdo da notícia antes de publicar.');
            return;
        }
    });
});
