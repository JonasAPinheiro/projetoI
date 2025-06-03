import express from "express";
import { CatalogoController } from "./controller/CatalogoController";

const catalogoController = new CatalogoController()

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3090;

app.get("/library/catalogos/categorias-usuario", catalogoController.listarCategoriasUsuario.bind(catalogoController));

app.get("/library/catalogos/categorias-livro", catalogoController.listarCategoriasLivro.bind(catalogoController));

app.get("/library/catalogos/cursos", catalogoController.listarCursos.bind(catalogoController));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));