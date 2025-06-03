"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
class CatalogoService {
    listarCategoriasUsuarios() {
        return CategoriaUsuarioRepository_1.categoriasUsuario;
    }
    listarCategoriasLivros() {
        return CategoriaLivroRepository_1.categoriasLivro;
    }
    listarCursos() {
        return CursoRepository_1.cursos;
    }
}
exports.CatalogoService = CatalogoService;
