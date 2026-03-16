import alunoModel from '../models/alunosModel';
import { gerarPdfTodos,gerarPdfAluno } from '../utils/pdfHelper';

export const relatorioTodos = async (req, res) => {
    try {
        const registros = await alunoModel.buscarTodos();

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        const pdf = await gerarPdfTodos(registros);
        return res.set({
            'content-type': 'aplication/pdf',
            'content-disposion': 'inline; filename="alunos.pdf'
        })

            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).json({ error: 'Erro ao gerar o relatorio.' });
    }
};
export const relatorioAlunos = async (req, res) => {
    try {
        const registros = await alunoModel.buscarTodos();

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        const pdf = await gerarPdfTodos(registros);
        return res.set({
            'content-type': 'aplication/pdf',
            'content-disposion': 'inline; filename="alunos.pdf'
        })

            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).json({ error: 'Erro ao gerar o relatorio.' });
    }
};
