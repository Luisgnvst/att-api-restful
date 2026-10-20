# Livraria API - Segurança

API de livros e autores com senha em BCrypt, login com JWT e rotas de ADMIN protegidas por middleware.

## Rodar
```
npm install
cp .env.example .env   (e trocar o JWT_SECRET)
npm start
```

## Usuários de teste
- admin@livraria.com / admin123 (ADMIN)
- leitor@gmail.com / leitor123 (USER)

## Permissões
| Rota | Acesso |
|---|---|
| GET /api/v1/livros e /livros/:id | Público |
| POST /api/v1/auth/register e /auth/login | Público |
| POST /api/v1/livros/:id/comentarios | USER ou ADMIN (401 sem token) |
| POST /api/v1/autores | ADMIN (401 sem token, 403 se for USER) |
| POST /api/v1/livros | ADMIN (401 sem token, 403 se for USER) |

O register sempre cria usuário com role USER. O ADMIN só existe no seed.

## Documentação (OpenAPI / Swagger)
Com a API rodando:
- Interface interativa: http://localhost:3000/docs
- JSON bruto da especificação: http://localhost:3000/docs/api.json

Para testar rota protegida: faça login em `POST /api/v1/auth/login`, copie o `token`, clique em **Authorize** e cole o token (sem escrever "Bearer").

As anotações ficam nos arquivos de `routes/` e a configuração geral (schemas, segurança) em `config/swagger.js`.
