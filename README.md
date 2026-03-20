# Tryhard Grind — Frontend

Frontend da plataforma **Tryhard Grind**, um hub competitivo para grupos de amigos acompanharem rankings, partidas e evolução em jogos como League of Legends, Valorant e CS2.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Angular | 21 | Framework principal |
| Tailwind CSS | 3 | Estilização utilitária |
| Angular PWA | — | Service Worker |
| Space Grotesk | — | Tipografia (Arctic Command Design System) |
| Material Symbols Outlined | — | Ícones |

> **Design System:** Arctic Command — paleta verde primário `#4edea3`, superfícies escuras, tipografia Space Grotesk.

---

## Pré-requisitos

- Node.js 20+
- Angular CLI 21+
- Back-end Tryhard Grind rodando em `http://localhost:5000`

---

## Rodando localmente

```bash
npm install
ng serve
```

Acesse `http://localhost:4200`. O proxy redireciona `/api/*` para `http://localhost:5000` automaticamente.

---

## Estrutura do projeto

```
src/app/
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts        # Redireciona não-autenticados para /auth/login
│   │   └── guest.guard.ts       # Redireciona autenticados para /groups
│   ├── interceptors/
│   │   ├── auth.interceptor.ts  # Injeta Bearer token em todas as requisições
│   │   └── error.interceptor.ts # Redireciona para login em 401
│   ├── models/
│   │   └── auth.models.ts       # Interfaces: LoginRequest, AuthResponse, UserDto...
│   └── services/
│       ├── auth.service.ts      # Login, register, logout, refresh, /me no boot
│       └── storage.service.ts   # Wrapper de localStorage para tokens JWT
│
├── features/
│   ├── auth/
│   │   ├── login/               # Tela de login com animação no título TRYHARD
│   │   ├── register/            # Tela de cadastro com validação de senha
│   │   └── auth.routes.ts
│   └── groups/
│       ├── groups.ts            # Placeholder — será substituído pela home de grupos
│       └── groups.routes.ts
│
├── layouts/
│   └── app-layout/
│       └── app-layout.ts        # Shell das telas autenticadas (header + router-outlet)
│
└── shared/
    └── components/
        └── header/
            ├── header.ts        # Cabeçalho fixo compartilhado entre telas logadas
            └── header.html      # Logo, nav links, saudação com nick, avatar
```

---

## Rotas

| Rota | Componente | Guard |
|---|---|---|
| `/auth/login` | `LoginComponent` | `guestGuard` — redireciona logados |
| `/auth/register` | `RegisterComponent` | `guestGuard` — redireciona logados |
| `/groups` | `AppLayoutComponent` > `GroupsComponent` | `authGuard` — redireciona não-logados |

---

## Autenticação

O fluxo é baseado em **JWT + Refresh Token**:

1. Login/Register → API retorna `accessToken` + `refreshToken`
2. Tokens salvos no `localStorage` via `StorageService`
3. `AuthInterceptor` injeta `Authorization: Bearer <token>` automaticamente
4. `ErrorInterceptor` limpa tokens e redireciona para login em caso de 401
5. Ao recarregar a página, `AuthService` chama `GET /api/auth/me` para restaurar o `currentUser` signal

---

## Build para produção

```bash
ng build
```

Artefatos gerados em `dist/`. Configurar variável de ambiente `apiUrl` para apontar para a API em produção.

---

## Próximas telas (Fase 2)

- Menu lateral (sidebar)
- Home de grupos (`/groups`)
- Ranking do grupo (`/groups/:id/ranking`)
- Perfil do jogador
- Formulário de partida
- Configurações do grupo
- Link de convite
