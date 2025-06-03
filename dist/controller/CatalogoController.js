"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoController = void 0;
const CatalogoService_1 = require("../service/CatalogoService");
class CatalogoController {
    catalogoService = new CatalogoService_1.CatalogoService();
    listarCategoriasUsuario(req, res) {
        try {
            const categorias = this.catalogoService.listarCategoriasUsuarios();
            res.status(200).json(categorias);
        }
        catch (error) {
            let message = "Não foi possivel listar as categorias de usuários!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
        this.catalogoService.listarCategoriasUsuarios();
    }
    listarCategoriasLivro(req, res) {
        try {
            const categorias = this.catalogoService.listarCategoriasLivros();
            res.status(200).json(categorias);
        }
        catch (error) {
            let message = "Não foi possível listar as categorias de livros!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    listarCursos(req, res) {
        try {
            const cursos = this.catalogoService.listarCursos();
            res.status(200).json(cursos);
        }
        catch (error) {
            let message = "Não foi possível listar os cursos!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
}
exports.CatalogoController = CatalogoController;
