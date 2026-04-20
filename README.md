# DoppelNews 📰

Um site de notícias geek focado em jogos, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Prisma.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Next.js Image** - Otimização de imagens

## 📁 Estrutura do Projeto

```
app/
├── components/
│   ├── layout/          # Componentes de layout (Header, Footer)
│   ├── news/           # Componentes relacionados a notícias
│   │   ├── NewsCard.tsx
│   │   ├── NewsList.tsx
│   │   └── MainPage.tsx
│   └── ui/             # Componentes de interface (SearchBox, ThemeToggle)
├── lib/               # Utilitários e constantes
├── styles/            # Arquivos CSS
├── types/             # Definições TypeScript
├── categorias/[categoria]/  # Páginas de categoria
├── criar-noticia/     # Página de criação de notícia
├── login/            # Página de login
├── noticias/         # Lista de notícias
│   └── [id]/         # Página individual de notícia
└── page.tsx          # Página inicial
```

## 🎨 Funcionalidades

- ✅ **Sistema de Notícias**: CRUD completo de artigos
- ✅ **Categorização**: Organização por gêneros de jogos
- ✅ **Tema Dark/Light**: Alternância de tema com persistência
- ✅ **Design Responsivo**: Otimizado para mobile e desktop
- ✅ **Busca**: Funcionalidade de pesquisa de notícias
- ✅ **SEO Otimizado**: Meta tags e estrutura semântica

## 🛠️ Instalação e Uso

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd doppelnews
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   # Configure o arquivo .env com suas credenciais do PostgreSQL
   cp .env.example .env
   ```

4. **Execute as migrações do Prisma**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse [http://localhost:3000](http://localhost:3000)**

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🎯 Estrutura de Dados

### Article (Notícia)
- `id`: Identificador único
- `title`: Título da notícia
- `content`: Conteúdo completo (HTML)
- `headline`: Resumo/chamada
- `category`: Categoria (RPG, Ação, etc.)
- `publishedAt`: Data de publicação
- `imageUrl`: URL da imagem principal
- `authorId`: ID do autor

### User (Usuário)
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email único
- `password`: Senha criptografada
- `createdAt`: Data de criação

## 🎨 Design System

### Cores Principais
- **Primária**: Laranja (#FF7A1A)
- **Secundária**: Azul (#0EBEFF)
- **Terciária**: Roxo (#8B5AF6)

### Fontes
- **Títulos**: Pixel (fonte pixelada customizada)
- **Corpo**: Inter (sans-serif moderna)
- **UI**: Segoe UI (fallback do sistema)

### Componentes
- **NewsCard**: Card de preview de notícia
- **NewsList**: Grid de notícias
- **SearchBox**: Campo de busca
- **ThemeToggle**: Alternador de tema

## 🚀 Deploy

O projeto está configurado para deploy no Vercel:

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. O deploy será automático

## 📄 Licença

Este projeto está sob a licença MIT.
