import express from "express";
import { CatalogoController } from "./controller/CatalogoController";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { ExemplarController } from "./controller/ExemplarController";
import { EmprestimoController } from "./controller/EmprestimoController";

const usuarioController = new UsuarioController();
const livroController = new LivroController();
const exemplarController = new ExemplarController();
const emprestimosController = new EmprestimoController();
const catalogoController = new CatalogoController();

const app = express();
app.use(express.json());

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

//Empréstimos
app.get("/library/emprestimos", emprestimosController.listarEmprestimos.bind(emprestimosController));
app.post("/library/emprestimos", emprestimosController.cadastrarEmprestimo.bind(emprestimosController));
app.put("/library/emprestimos/:id/devolucao", emprestimosController.registrarDevolucao.bind(emprestimosController));

//Catalogos
app.get("/library/catalogos/categorias-usuario", catalogoController.listarCategoriasUsuario.bind(catalogoController));
app.get("/library/catalogos/categorias-livro", catalogoController.listarCategoriasLivro.bind(catalogoController));
app.get("/library/catalogos/cursos", catalogoController.listarCursos.bind(catalogoController));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));