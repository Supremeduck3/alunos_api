import alunoModel from '../models/alunosModel.js';
import AlunosModels from '../models/alunosModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, estado, preco } = req.body;

        if (!nome) return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        if (preco === undefined || preco === null) return res.status(400).json({ error: 'O campo "preco" é obrigatório!' });

        const alunos = new AlunosModels({ nome, estado, preco: parseFloat(preco) });
        const data = await alunos.criar();

        res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await alunoModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const alunos = await AlunosModels.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        res.json({ data: alunos });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const alunos = await AlunosModels.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) alunos.nome = req.body.nome;
        if (req.body.estado !== undefined) alunos.estado = req.body.estado;
        if (req.body.preco !== undefined) alunos.preco = parseFloat(req.body.preco);

        const data = await alunos.atualizar();

        res.json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const alunos = await AlunosModels.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await alunos.deletar();

        res.json({ message: `O registro "${alunos.nome}" foi deletado com sucesso!`, deletado: alunos });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
