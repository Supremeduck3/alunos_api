import express from 'express';
import * as controller from '../controllers/alunosController.js';



const router = express.Router();

router.get('/', controller.relatorioTodos)
router.get('/:id', controller.buscarPorId);


export default router;
