# Documentacao do DoppelNews

## Visao Geral

O DoppelNews agora esta organizado como monorepo com duas aplicacoes independentes. O site publico nao carrega rotas administrativas, e o painel nao depende da arvore de paginas publicas.

## Aplicacoes

### `site/`

Aplicacao publica do portal.

- `site/src/app/page.tsx`: home publica.
- `site/src/app/noticias/page.tsx`: listagem de noticias.
- `site/src/app/noticias/[slug]/page.tsx`: noticia individual.
- `site/src/app/categorias/[slug]/page.tsx`: noticias por categoria.
- `site/src/app/autores/[id]/page.tsx`: noticias por autor.
- `site/src/app/busca/page.tsx`: busca publica.
- `site/src/app/sobre/page.tsx`: pagina institucional.
- `site/src/components/public`: header, footer, cards e secoes publicas.
- `site/src/components/ui`: componentes pequenos de interface.
- `site/src/styles`: CSS do site publico.

### `admin/`

Aplicacao administrativa separada.

- `admin/src/app/page.tsx`: dashboard.
- `admin/src/app/login/page.tsx`: login visual.
- `admin/src/app/noticias`: listar, criar e editar noticias.
- `admin/src/app/categorias`: listar, criar e editar categorias.
- `admin/src/app/midias`: biblioteca e upload.
- `admin/src/app/usuarios`: listar, criar e editar usuarios.
- `admin/src/app/configuracoes/page.tsx`: configuracoes futuras.
- `admin/src/components/admin`: componentes do painel.
- `admin/src/components/ui`: componentes base do painel.
- `admin/src/proxy.ts`: Proxy do Next 16 para futura protecao do admin.

### `shared/`

Camada reutilizavel entre site e admin.

- `shared/lib`: Prisma, consultas de noticias, seguranca, slugs e imagens.
- `shared/prisma`: schema, migrations e seed.
- `shared/types`: tipos de dominio.
- `shared/constants`: rotas, categorias e roles.
- `shared/validators`: validadores reutilizaveis.
- `shared/interfaces`: contratos comuns de API.

## Prisma

- Schema: `shared/prisma/schema.prisma`.
- Seed: `shared/prisma/seed.ts`.
- Client gerado: `shared/generated/prisma`.

Comandos:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Rotas

Site:

- `/`
- `/noticias`
- `/noticias/[slug]`
- `/categorias/[slug]`
- `/autores/[id]`
- `/busca`
- `/sobre`

Admin:

- `/`
- `/login`
- `/noticias`
- `/noticias/criar`
- `/noticias/editar/[id]`
- `/categorias`
- `/midias`
- `/usuarios`
- `/configuracoes`

## Observacoes

- O Next 16 usa `proxy.ts`; `middleware.ts` foi renomeado/depreciado.
- `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_ADMIN_URL` podem ser usados para links entre dominios.
- O painel cria noticias e redireciona para a tela administrativa de edicao. A publicacao fica disponivel no site publico pelo slug.
