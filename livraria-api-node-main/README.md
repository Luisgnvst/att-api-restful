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
