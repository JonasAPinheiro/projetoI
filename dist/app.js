"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CatalogoController_1 = require("./controller/CatalogoController");
const UsuarioController_1 = require("./controller/UsuarioController");
const LivroController_1 = require("./controller/LivroController");
const ExemplarController_1 = require("./controller/ExemplarController");
const usuarioController = new UsuarioController_1.UsuarioController();
const livroController = new LivroController_1.LivroController();
const exemplarController = new ExemplarController_1.ExemplarController();
const catalogoController = new CatalogoController_1.CatalogoController();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ?? 3090;
//Usuários
app.get("/library/usuarios", usuarioController.listarUsuarios.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.listarUsuarioPorCpf.bind(usuarioController));
app.post("/library/usuarios", usuarioController.cadastrarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));
//Livros
app.get("/library/livros", livroController.listarLivros.bind(livroController));
app.get("/library/livros/:isbn", livroController.listarLivroPorIsbn.bind(livroController));
app.post("/library/livros", livroController.cadastrarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));
//Estoque
app.get("/library/estoque", exemplarController.listarExemplares.bind(exemplarController));
app.get("/library/estoque/:codigo", exemplarController.listarExemplarPorCodigo.bind(exemplarController));
app.post("/library/estoque", exemplarController.cadastrarExemplar.bind(exemplarController));
app.put("/library/estoque/:codigo", exemplarController.atualizarExemplar.bind(exemplarController));
app.delete("/library/estoque/:codigo", exemplarController.removerExemplar.bind(exemplarController));
//Catalogos
app.get("/library/catalogos/categorias-usuario", catalogoController.listarCategoriasUsuario.bind(catalogoController));
app.get("/library/catalogos/categorias-livro", catalogoController.listarCategoriasLivro.bind(catalogoController));
app.get("/library/catalogos/cursos", catalogoController.listarCursos.bind(catalogoController));
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
