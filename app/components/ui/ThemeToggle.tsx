'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'black'>('light');

    useEffect(() => {
        const currentTheme =
            (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light';
        setTheme(currentTheme === 'black' ? 'black' : 'light');

        if (typeof window !== 'undefined') {
            document.body.classList.toggle('theme-black', currentTheme === 'black');
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        document.body.classList.toggle('theme-black', theme === 'black');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'black' : 'light'));
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-button"
            aria-label="Alternar tema"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
