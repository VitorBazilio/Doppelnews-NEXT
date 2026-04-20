export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    articles: Article[];
}

export interface Article {
    id: number;
    title: string;
    content: string;
    publishedAt: Date;
    category: string;
    authorId: number;
    headline?: string;
    imageUrl?: string;
    author: User;
}

export interface NewsCardProps {
    id: number;
    title: string;
    headline?: string;
    category: string;
    publishedAt: Date;
    imageUrl?: string;
}

export interface NewsListProps {
    articles: NewsCardProps[];
    title?: string;
}

export interface SearchBoxProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}