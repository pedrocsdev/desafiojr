## Solução

Implementação completa do CRUD de clientes, cobrindo backend (NestJS) e frontend (Next.js).

### Backend
- Implementados os 5 métodos do `clients.service.ts`:
  - `create`: valida unicidade de email e documento antes de criar
  - `findAll`: delega filtros e paginação ao repository
  - `findOne`: retorna 404 se o cliente não existir
  - `update`: bloqueia edição de clientes inativos (403), valida unicidade de email/documento na alteração
  - `remove`: soft delete (altera status para INACTIVE, sem apagar o registro)

### Frontend
- 3 rotas implementadas: `/clients` (listagem), `/clients/new` (cadastro), `/clients/[id]/edit` (edição)
- Componentes: `AppHeader`, `StatusBadge`, `ClientFilters`, `ClientTable`, `ConfirmDeleteDialog`, `ClientForm`
- Hooks customizados: `useClients` (listagem, filtros, exclusão) e `useClientForm` (validação, criação/edição)
- Camada de API (`lib/api.ts`) com tratamento de erros retornados pelo backend

## Tecnologias

- **Backend:** NestJS, Prisma, PostgreSQL, TypeScript
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS

## Decisões técnicas

- **Arquitetura em camadas:** Controller → Service → Repository no backend; Página → Hook → API no frontend, separando responsabilidades e facilitando manutenção/testes.
- **Soft delete:** exclusão de cliente não remove o registro do banco, apenas altera o status para `INACTIVE`, preservando histórico.
- **Validação de duplicidade no update:** ao editar, a checagem de e-mail/documento único ignora o próprio registro (compara `id` do encontrado com o `id` sendo editado), evitando falso positivo quando o campo não é alterado.
- **Tratamento de erros:** o cliente HTTP do frontend captura as mensagens específicas retornadas pelo NestJS (`ConflictException`, `NotFoundException`, `ForbiddenException`) e as exibe na interface.

## Como executar

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env   # ajustar DATABASE_URL com as credenciais do seu PostgreSQL
npx prisma generate
npx prisma migrate dev
npm run start:dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
# criar .env.local com NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
\`\`\`

Acessar `http://localhost:3000/clients`.
