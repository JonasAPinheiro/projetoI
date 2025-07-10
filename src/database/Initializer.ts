import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { ExemplarRepository } from "../repository/ExemplarRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
const categoriaLivroRepository = CategoriaLivroRepository.getInstance();
const cursoRepository = CursoRepository.getInstance();
const usuarioRepository = UsuarioRepository.getInstance();
const livroRepository = LivroRepository.getInstance();
const exemplarRepository = ExemplarRepository.getInstance();
const emprestimoRepository = EmprestimoRepository.getInstance();

export async function inicializarTabelas(){
    await categoriaUsuarioRepository.init();
    await categoriaLivroRepository.init();
    await cursoRepository.init();
    await usuarioRepository.init();
    await livroRepository.init();
    await exemplarRepository.init();
    await emprestimoRepository.init();
}