'use client';

import { useState } from 'react';

interface SearchBoxProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export default function SearchBox({ onSearch, placeholder = "Buscar notícias..." }: SearchBoxProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Buscar">
                🔍
            </button>
        </form>
    );
}