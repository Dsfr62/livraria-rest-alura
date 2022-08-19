import livros from "../models/Livro.js";

class LivroController {
    
    static listarLivros = (req, res) => {
        livros.find().populate('autor').exec((err, livros) => {
            if(err) {
                res.status(500).send({message: `erro: ${err.message} - Falha ao listar livros.`})
            } else {
                res.status(200).json(livros); 
            };
        });
    };

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id).populate('autor', 'nome').exec((err, livros) => {
            if (err) {
                res.status(400).send({message: `erro: ${err.message} - Falha ao encontrar o livro.`});
            } else {
                res.status(200).send(livros);
            };
        });
    };

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `erro: ${err.message} - Falha ao cadastrar o livro.`});
            } else {
                res.status(201).send(livro.toJSON());
            };
        });
    };

    static atualizarLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            } else {
                res.status(500).send({message: `erro: ${err.message} - Falha ao atualizar o livro.`})
            };
        });
    };

    static excluirLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: "Livro removido com sucesso!"})
            } else {
                res.status(500).send({message: `erro: ${err.message} - Falha ao remover o livro.`})
            };
        });
    };

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;
        livros.find({"editora": editora}, {}, (err, livros) => {
            if (err) {
                res.status(500).send({message: `erro: ${err.message} - Falha ao listar os livros.`});
            } else {
                res.status(200).send(livros);
            };
        });
    };
};

export default LivroController;