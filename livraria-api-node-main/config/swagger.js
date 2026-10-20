const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Livraria API',
      version: '1.0.0',
      description:
        'API REST de Livros e Autores com autenticação JWT e controle de acesso por perfil (USER / ADMIN).\n\n' +
        '**Como testar rotas protegidas:**\n' +
        '1. Faça login em `POST /api/v1/auth/login` (ex: admin@livraria.com / admin123).\n' +
        '2. Copie o valor do campo `token` da resposta.\n' +
        '3. Clique no botão **Authorize** aqui em cima, cole só o token (sem escrever "Bearer") e confirme.'
    },
    servers: [{ url: '/', description: 'Servidor atual' }],
    tags: [
      { name: 'Autenticação', description: 'Cadastro e login' },
      { name: 'Livros', description: 'Livros e comentários' },
      { name: 'Autores', description: 'Autores' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido no login. Enviado no header Authorization: Bearer <token>'
        }
      },
      schemas: {
        Erro: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'Mensagem explicando o erro.' }
          }
        },
        RegisterInput: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'Maria Souza' },
            email: { type: 'string', format: 'email', example: 'maria@gmail.com' },
            senha: { type: 'string', format: 'password', example: 'senha123' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@livraria.com' },
            senha: { type: 'string', format: 'password', example: 'admin123' }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1760900000000 },
            nome: { type: 'string', example: 'Maria Souza' },
            email: { type: 'string', example: 'maria@gmail.com' },
            role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'USER' }
          }
        },
        LoginResposta: {
          type: 'object',
          properties: {
            usuario: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Admin' },
                role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'ADMIN' }
              }
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkFkbWluIiwicm9sZSI6IkFETUlOIn0.assinatura'
            }
          }
        },
        Autor: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Machado de Assis' },
            nacionalidade: { type: 'string', example: 'Brasileiro' }
          }
        },
        AutorInput: {
          type: 'object',
          required: ['nome'],
          properties: {
            nome: { type: 'string', example: 'Clarice Lispector' },
            nacionalidade: { type: 'string', example: 'Brasileira' }
          }
        },
        Comentario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            autor_nome: { type: 'string', example: 'Leitor' },
            texto: { type: 'string', example: 'Clássico indispensável.' }
          }
        },
        ComentarioInput: {
          type: 'object',
          required: ['texto'],
          properties: {
            texto: { type: 'string', example: 'Li em dois dias, recomendo muito!' }
          }
        },
        Livro: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Dom Casmurro' },
            ano: { type: 'integer', example: 1899 },
            autor_id: { type: 'integer', example: 1 },
            autor_nome: { type: 'string', example: 'Machado de Assis' },
            comentarios: { type: 'array', items: { $ref: '#/components/schemas/Comentario' } }
          }
        },
        LivroInput: {
          type: 'object',
          required: ['titulo', 'autor_id'],
          properties: {
            titulo: { type: 'string', example: 'Memórias Póstumas de Brás Cubas' },
            ano: { type: 'integer', example: 1881, description: 'Se não enviado, usa o ano atual.' },
            autor_id: { type: 'integer', example: 1 }
          }
        }
      },
      responses: {
        NaoAutenticado: {
          description: 'Token ausente, inválido, expirado ou corrompido.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
              examples: {
                ausente: { summary: 'Sem token', value: { erro: 'Token de autenticação não fornecido.' } },
                invalido: { summary: 'Token inválido ou expirado', value: { erro: 'Token inválido ou expirado.' } }
              }
            }
          }
        },
        Proibido: {
          description: 'Usuário autenticado, mas sem perfil ADMIN.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
              example: { erro: 'Acesso proibido: privilégio de ADMIN exigido.' }
            }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, '../routes/*.js')]
};

module.exports = swaggerJsdoc(options);
