# att-api-restful

Atividade de API RESTful de livros e autores com segurança.

O código está na pasta `livraria-api-node-main`.

## O que foi feito
- Senha salva com hash BCrypt
- Login que gera um token JWT
- Middleware que valida o token (Authorization: Bearer token)
- Middleware que só deixa ADMIN acessar algumas rotas

## Como rodar
```
cd livraria-api-node-main
npm install
npm start
```
Antes de rodar, copiar o `.env.example` para `.env` e colocar um valor no JWT_SECRET.

## Usuários para testar
- admin@livraria.com / admin123 (ADMIN)
- leitor@gmail.com / leitor123 (USER)

## Rotas
| Rota | Quem acessa |
|---|---|
| GET /api/v1/livros | Todo mundo |
| GET /api/v1/livros/:id | Todo mundo |
| POST /api/v1/auth/register | Todo mundo |
| POST /api/v1/auth/login | Todo mundo |
| POST /api/v1/livros/:id/comentarios | Usuário logado (USER ou ADMIN) |
| POST /api/v1/autores | Só ADMIN |
| POST /api/v1/livros | Só ADMIN |

Sem token dá erro 401, e com token de USER nas rotas de ADMIN dá erro 403.

No register o usuário sempre é criado como USER, o ADMIN só existe nos dados iniciais.
