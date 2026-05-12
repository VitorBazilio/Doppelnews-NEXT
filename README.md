# DoppelNews

Monorepo com duas aplicacoes Next.js:

- `site/`: site publico pensado para `doppelnews.com`.
- `admin/`: painel separado pensado para `admin.doppelnews.com`.
- `shared/`: tipos, constantes, validadores, Prisma e regras reutilizaveis.

## Como Rodar

Configure `DATABASE_URL` na raiz ou em cada app usando os arquivos `.env.example` como referencia.

```bash
npm install
npm run prisma:generate
npm run dev:site
npm run dev:admin
```

Por padrao:

- site: `http://localhost:3000`
- admin: `http://localhost:3001`

## Scripts

- `npm run dev:site`: inicia o site publico.
- `npm run dev:admin`: inicia o painel.
- `npm run build`: builda site e admin.
- `npm run lint`: executa lint nos dois apps.
- `npm run prisma:generate`: gera `shared/generated/prisma`.
- `npm run prisma:migrate`: aplica migrations em `shared/prisma`.
- `npm run prisma:seed`: popula o banco.

## Estrutura

```txt
site/
  src/app
  src/components
  src/styles
admin/
  src/app
  src/components
  src/styles
shared/
  lib
  prisma
  types
  constants
  validators
```

Veja mais detalhes em [DOCUMENTACAO.md](./DOCUMENTACAO.md).
