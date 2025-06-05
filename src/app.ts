import express from "express";
import { CatalogoController } from "./controller/CatalogoController";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";

const usuarioController = new UsuarioController();
const livroController = new LivroController();
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

//Catalogos
app.get("/library/catalogos/categorias-usuario", catalogoController.listarCategoriasUsuario.bind(catalogoController));
app.get("/library/catalogos/categorias-livro", catalogoController.listarCategoriasLivro.bind(catalogoController));
app.get("/library/catalogos/cursos", catalogoController.listarCursos.bind(catalogoController));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));