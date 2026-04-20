
'use client';

import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBox from '../ui/SearchBox';

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    const handleSearch = (query: string) => {
        // TODO: Implementar busca
        console.log('Buscando por:', query);
    };

    return (
        <header>
            <div className="header-top">
                <Link href="/" className="logo-link">
                    <h1 className="DoppelTitle">DoppelNews</h1>
                </Link>
            </div>
            <nav aria-label="Busca">
                <SearchBox onSearch={handleSearch} />
            </nav>
            <nav aria-label="Navegação principal">
                <ul>
                    <li><Link href="/" className="custom-border">Início</Link></li>
                    <li><Link href="/noticias" className="custom-border">Notícias</Link></li>
                    <li><Link href="/categorias/games" className="custom-border">Games</Link></li>
                    <li><Link href="/contato" className="custom-border">Contato</Link></li>
                    <li><Link href="/sobre" className="custom-border">Sobre</Link></li>
                </ul>
            </nav>
            <nav>
                <ThemeToggle />
            </nav>
        </header>
    );
}