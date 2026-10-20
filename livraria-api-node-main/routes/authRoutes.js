const { Router } = require('express');
const controller = require('../controllers/AuthController');

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Autenticação]
 *     summary: Cadastra um novo usuário
 *     description: Cria um usuário com a senha guardada em hash BCrypt. O perfil (role) sempre é USER, não dá pra se cadastrar como ADMIN. Rota pública.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso (sem a senha na resposta).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '400':
 *         description: Falha de validação, campo obrigatório ausente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               erro: 'Campos obrigatórios ausentes: nome, email ou senha.'
 *       '409':
 *         description: E-mail já cadastrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               erro: 'E-mail já cadastrado no sistema.'
 */
router.post('/register', (req, res, next) => controller.register(req, res, next));

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login e retorna o token JWT
 *     description: Confere e-mail e senha. Se estiverem certos, devolve um token JWT válido por 1 hora. Use esse token no botão Authorize. Rota pública.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResposta'
 *       '400':
 *         description: Falha de validação, e-mail ou senha ausentes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               erro: 'E-mail e senha são obrigatórios.'
 *       '401':
 *         description: Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               erro: 'Credenciais inválidas.'
 */
router.post('/login', (req, res, next) => controller.login(req, res, next));

module.exports = router;
