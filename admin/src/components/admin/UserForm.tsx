export default function UserForm() {
  return (
    <form className="create-form">
      <label htmlFor="user-name">Nome</label>
      <input id="user-name" name="name" type="text" required />
      <label htmlFor="user-email">Email</label>
      <input id="user-email" name="email" type="email" required />
      <button type="submit">Salvar usuario</button>
    </form>
  );
}
