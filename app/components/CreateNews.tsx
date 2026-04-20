export default function CreateNews() {
    return (
        <main>
            {/* Formulário de criação de notícia */}
            <section className="create-form" aria-label="Formulário de Criação de Notícia">
                <h2>Criar Notícia</h2>

                <form action="#" method="post">
                    {/* Campo de título */}
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" name="title" required />

                    {/* Seletor de categoria */}
                    <label>Categoria:</label>
                    <div className="category-picker">
                        <div className="category-selected" id="selectedCategory">
                            Nenhuma categoria selecionada
                        </div>

                        <div className="category-options" id="categoryOptions">
                            <button type="button" className="tag-chip category-option" data-category="RPG">RPG</button>
                            <button type="button" className="tag-chip category-option" data-category="Ação">Ação</button>
                            <button type="button" className="tag-chip category-option"
                                data-category="Aventura">Aventura</button>
                            <button type="button" className="tag-chip category-option"
                                data-category="Estratégia">Estratégia</button>
                            <button type="button" className="tag-chip category-add-button" id="addCategoryChip">+</button>
                        </div>

                        {/* Campo para criar nova categoria */}
                        <div className="category-add-input" id="categoryAddInput" hidden>
                            <input type="text" id="categoryCustom" placeholder="Adicionar nova categoria" />
                            <button type="button" id="addCategoryBtn">OK</button>
                        </div>

                        {/* Campo oculto para envio da categoria no formulário */}
                        <input type="hidden" id="category" name="category" value="" />
                    </div>

                    {/* Seletor de tags */}
                    <label>Tags:</label>
                    <div className="tag-picker">
                        <div className="tag-selected" id="selectedTags">
                            Nenhuma tag selecionada
                        </div>

                        <div className="tag-options" id="tagOptions">
                            <button type="button" className="tag-chip tag-option" data-tag="RPG">RPG</button>
                            <button type="button" className="tag-chip tag-option" data-tag="Ação">Ação</button>
                            <button type="button" className="tag-chip tag-option" data-tag="Aventura">Aventura</button>
                            <button type="button" className="tag-chip tag-option" data-tag="Estratégia">Estratégia</button>
                            <button type="button" className="tag-chip tag-option" data-tag="Indie">Indie</button>
                            <button type="button" className="tag-chip tag-option" data-tag="Multiplayer">Multiplayer</button>
                            <button type="button" className="tag-chip tag-add-button" id="addTagChip">+</button>
                        </div>

                        {/* Campo para criar nova tag */}
                        <div className="tag-add-input" id="tagAddInput" hidden>
                            <input type="text" id="tagCustom" placeholder="Digite uma nova tag e pressione OK" />
                            <button type="button" id="addTagBtn">OK</button>
                        </div>

                        {/* Campo oculto para envio das tags no formulário */}
                        <input type="hidden" id="tags" name="tags" value="" />
                    </div>

                    {/* Campo da manchete */}
                    <label htmlFor="manchete">Manchete:</label>
                    <textarea id="manchete" name="manchete" rows={2} required></textarea>

                    {/* Campo do conteúdo com editor rich text */}
                    <label htmlFor="contentEditor">Conteúdo:</label>
                    <div id="contentEditor" className="rich-editor"></div>
                    <input type="hidden" id="content" name="content" value="" />

                    {/* Upload de imagens */}
                    <label htmlFor="file">Imagens</label>
                    <div className="custom-file-upload">
                        <input type="file" id="file" name="myfiles[]" multiple />
                    </div>

                    {/* Campo de data de publicação */}
                    <label htmlFor="publish-date">Data de Publicação:</label>
                    <input type="date" id="publish-date" name="publish-date" required />

                    {/* Botão de envio do formulário */}
                    <button type="submit">Publicar</button>
                </form>
            </section>
        </main>
    );
}
