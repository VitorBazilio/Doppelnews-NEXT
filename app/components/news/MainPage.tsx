import Image from "next/image";

export default function MainPage() {
    return (
        <main className="container">
            <div className="conteudo">
                {/* Destaque/Featured */}
                <section className="featured" aria-label="Notícia em destaque">
                    <div className="featured-media">
                        <Image src="https://picsum.photos/400/240" alt="Crimson Desert - Melhor jogo do ano" width={400} height={240} />
                    </div>
                    <div className="featured-categoria">RPG</div>
                    <div className="featured-text">
                        <span className="categoria-tag">Crimson Desert</span>
                        <p>Melhor jogo do ano, Crimson Desert é incrível</p>
                    </div>
                </section>

                {/* Notícias recentes */}
                <section className="recent" aria-label="Notícias recentes">
                    <h2>Recent News</h2>
                    <div className="news-list">
                        <article className="news-item">
                            <Image src="https://picsum.photos/200/120" alt="Setup Gamer" width={200} height={120} />
                            <div>
                                <h3>Novo Setup Gamer</h3>
                                <p>Veja os melhores setups</p>
                            </div>
                        </article>

                        <article className="news-item">
                            <Image src="https://picsum.photos/200/120" alt="Teclados RGB" width={200} height={120} />
                            <div>
                                <h3>Teclados RGB</h3>
                                <p>Os mais usados de 2026</p>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Grid de posts */}
                <section className="grid-posts" aria-label="Mais notícias">
                    <h2>Mais Notícias</h2>
                    <div className="grid">
                        <div className="card">
                            <Image src="https://picsum.photos/300/200" alt="Post 1" width={300} height={200} />
                            <p>Post 1</p>
                        </div>
                        <div className="card">
                            <Image src="https://picsum.photos/300/200" alt="Post 2" width={300} height={200} />
                            <p>Post 2</p>
                        </div>
                        <div className="card">
                            <Image src="https://picsum.photos/300/200" alt="Post 3" width={300} height={200} />
                            <p>Post 3</p>
                        </div>
                        <div className="card">
                            <Image src="https://picsum.photos/300/200" alt="Post 4" width={300} height={200} />
                            <p>Post 4</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sidebar */}
            <div className="sidebar-group">
                <aside className="sidebar" aria-label="Complementos e navegação lateral">
                    <h3>Popular Posts</h3>
                    <div className="popular">
                        <div className="pop-item">🎮 Games em alta</div>
                        <div className="pop-item">🕹️ Novos consoles</div>
                        <div className="pop-item">💻 Setup gamer</div>
                    </div>
                </aside>
                <aside className="sidebar">
                    <h3>Categorias</h3>
                    <div className="popular">
                        <div className="pop-item">🎮 Clássicos</div>
                        <div className="pop-item">🎮 Nintendo</div>
                        <div className="pop-item">🎮 Playstation</div>
                        <div className="pop-item">🎮 Xbox</div>
                    </div>
                </aside>
            </div>
        </main>
    );
}