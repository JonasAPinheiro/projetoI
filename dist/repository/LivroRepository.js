"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livroList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    exibirLivros() {
        return this.livroList;
    }
    exibirLivroPorIsbn(isbn) {
        const index = this.findIndex(isbn);
        return this.livroList[index];
    }
    exibirLivroPorId(id) {
        const index = this.findIndex(id);
        return this.livroList[index];
    }
    insereLivro(livro) {
        this.livroList.push(livro);
    }
    atualizaLivro(isbn, novoLivro) {
        const index = this.findIndex(isbn);
        this.livroList[index] = novoLivro;
    }
    removeLivro(isbn) {
        const index = this.findIndex(isbn);
        this.livroList.splice(index, 1);
    }
    findIndex(busca) {
        if (typeof busca == "string") {
            const index = this.livroList.findIndex((l) => l.isbn == busca);
            if (index == -1) {
                throw new Error("O isbn do Livro não foi encontrado !!!");
            }
            return index;
        }
        else {
            const index = this.livroList.findIndex((l) => l.id == busca);
            if (index == -1) {
                throw new Error("O id do Livro não foi encontrado !!!");
            }
            return index;
        }
    }
}
exports.LivroRepository = LivroRepository;
