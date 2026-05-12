export default function CategoryForm() {
  return (
    <form className="create-form">
      <label htmlFor="category-name">Nome da categoria</label>
      <input id="category-name" name="name" type="text" required />
      <button type="submit">Salvar categoria</button>
    </form>
  );
}
