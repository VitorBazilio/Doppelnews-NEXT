# Doppelnews

Portal de notícias focado em games, tecnologia, entretenimento e cultura geek, desenvolvido com arquitetura moderna utilizando Next.js, Prisma e PostgreSQL.

O projeto foi pensado para funcionar como uma plataforma profissional de publicação de notícias, com separação entre frontend público, painel administrativo e futura escalabilidade para APIs e automações.

---

# Objetivo do Projeto

O Doppelnews tem como foco:

- publicação de notícias
- SEO otimizado
- alta performance
- experiência moderna
- escalabilidade
- suporte a múltiplos redatores
- automação de conteúdo
- integração futura com redes sociais

A arquitetura foi inspirada em grandes portais de conteúdo e mídia gamer, utilizando um modelo desacoplado entre portal público e administração.

---

# Arquitetura do Projeto

```txt
Doppelnews/
├─ site/
├─ admin/
├─ api/
└─ shared/
```

---

# Domínios

```txt
doppelnews.com
```

Portal público acessado pelos usuários.

```txt
admin.doppelnews.com
```

Sistema administrativo interno utilizado por:
- administradores
- redatores
- editores
- moderadores

```txt
api.doppelnews.com
```

API central responsável por:
- autenticação
- gerenciamento de conteúdo
- uploads
- integrações
- automações

---

# Estrutura Completa do Projeto

```txt
Doppelnews/
├─ site/
│  ├─ public/
│  │  ├─ images/
│  │  ├─ icons/
│  │  └─ favicon.ico
│  │
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ loading.tsx
│  │  │  ├─ error.tsx
│  │  │  ├─ not-found.tsx
│  │  │  │
│  │  │  ├─ noticias/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]/
│  │  │  │     ├─ page.tsx
│  │  │  │     ├─ loading.tsx
│  │  │  │     └─ error.tsx
│  │  │  │
│  │  │  ├─ categorias/
│  │  │  ├─ autores/
│  │  │  ├─ busca/
│  │  │  └─ sobre/
│  │  │
│  │  ├─ components/
│  │  │  ├─ public/
│  │  │  └─ ui/
│  │  │
│  │  ├─ styles/
│  │  │  ├─ globals.css
│  │  │  ├─ variables.css
│  │  │  ├─ animations.css
│  │  │  └─ news.css
│  │  │
│  │  ├─ utils/
│  │  │  ├─ format-date.ts
│  │  │  ├─ generate-slug.ts
│  │  │  ├─ reading-time.ts
│  │  │  └─ seo.ts
│  │  │
│  │  ├─ lib/
│  │  └─ hooks/
│  │
│  ├─ package.json
│  └─ tsconfig.json
│
├─ admin/
│  ├─ public/
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ login/
│  │  │  ├─ noticias/
│  │  │  ├─ categorias/
│  │  │  ├─ usuarios/
│  │  │  ├─ midias/
│  │  │  ├─ configuracoes/
│  │  │  ├─ loading.tsx
│  │  │  ├─ error.tsx
│  │  │  └─ not-found.tsx
│  │  │
│  │  ├─ components/
│  │  │  ├─ admin/
│  │  │  └─ ui/
│  │  │
│  │  ├─ styles/
│  │  │  ├─ globals.css
│  │  │  ├─ admin.css
│  │  │  ├─ dashboard.css
│  │  │  └─ editor.css
│  │  │
│  │  ├─ utils/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  └─ middleware.ts
│  │
│  ├─ package.json
│  └─ tsconfig.json
│
├─ api/
│  ├─ src/
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  ├─ services/
│  │  ├─ middlewares/
│  │  ├─ lib/
│  │  └─ server.ts
│  │
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ migrations/
│  │
│  ├─ package.json
│  └─ tsconfig.json
│
├─ shared/
│  ├─ types/
│  ├─ constants/
│  ├─ validators/
│  └─ interfaces/
│
├─ package.json
├─ README.md
└─ .gitignore
```

---

# Aplicações

# /site

Frontend público.

Responsável por:
- homepage
- notícias
- categorias
- páginas SEO
- busca
- autores
- navegação pública

Tecnologias:
- Next.js App Router
- SSR
- Server Components
- SEO otimizado

---

# /admin

Painel administrativo privado.

Responsável por:
- criação de notícias
- edição de conteúdo
- gerenciamento de usuários
- categorias
- uploads
- dashboard
- workflow editorial

Tecnologias:
- Next.js
- Dashboard CMS
- Rich Text Editor
- autenticação protegida

---

# /api

Backend central da plataforma.

Responsável por:
- autenticação
- banco de dados
- regras de negócio
- uploads
- permissões
- integrações futuras

Tecnologias:
- Node.js
- Express/NestJS (futuramente opcional)
- Prisma
- PostgreSQL

---

# /shared

Código compartilhado entre aplicações.

Exemplos:
- types
- interfaces
- validators
- constantes
- schemas

---

# Tecnologias Utilizadas

## Frontend
- Next.js
- React
- TypeScript
- CSS Modules / Global CSS
- App Router

---

## Backend
- Node.js
- API Routes
- JWT
- Middleware
- REST API

---

## Banco de Dados
- PostgreSQL
- Prisma ORM

---

## Upload e Imagens

Planejamento para:
- Cloudinary
- AWS S3
- conversão automática para WebP
- compressão otimizada
- CDN

---

## Editor de Conteúdo

Planejamento para:
- EditorJS
ou
- Tiptap

Funcionalidades:
- rich text
- embeds
- imagens
- vídeos
- SEO
- markdown parcial
- blocos personalizados

---

# Sistema de Usuários

Tipos planejados:

| Cargo | Permissões |
|---|---|
| ADMIN | Controle total |
| EDITOR | Aprovação e edição |
| REDATOR | Criação de notícias |
| MODERADOR | Controle de comentários |

---

# Estrutura de Notícias

Cada notícia deverá possuir:

- título
- slug
- resumo
- banner
- conteúdo
- autor
- categoria
- tags
- SEO metadata
- data de publicação
- status

---

# Workflow Editorial

```txt
Rascunho
↓
Revisão
↓
Aprovado
↓
Publicado
```

---

# SEO

O projeto foi estruturado para priorizar SEO:

- SSR
- metadata dinâmica
- Open Graph
- sitemap
- robots.txt
- slugs amigáveis
- imagens otimizadas
- carregamento rápido

---

# Segurança

Planejamento:
- middleware de autenticação
- JWT
- proteção de rotas
- controle por permissões
- rate limit
- proteção de API
- painel separado do site público

---

# Automações Futuras

Planejamento de integração automática:

- Instagram
- Twitter/X
- Discord
- Telegram
- notificações push
- geração automática de posts
- agendamento de publicações

---

# Objetivo Visual

O portal busca uma identidade inspirada em:
- portais gamers modernos
- visual dark
- alta legibilidade
- foco em imagens
- performance
- experiência desktop e mobile

---

# Desenvolvimento Local

## Site

```bash
npm run dev
```

---

## Admin

```bash
npm run dev
```

---

## API

```bash
npm run dev
```

---

# Banco de Dados

Executar migrations:

```bash
npx prisma migrate dev
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

---

# Objetivos de Longo Prazo

- portal gamer profissional
- múltiplos redatores
- sistema editorial completo
- automações sociais
- aplicativo mobile
- API pública