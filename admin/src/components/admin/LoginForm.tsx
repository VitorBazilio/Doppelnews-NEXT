export default function LoginForm() {
  return (
    <main className="container login-page">
      <div className="conteudo">
        <section className="login-section" aria-label="Formulário de Login">
          <h2>Login</h2>
          <form className="login-form">
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Entrar</button>
          </form>
        </section>
      </div>
    </main>
  );
}
