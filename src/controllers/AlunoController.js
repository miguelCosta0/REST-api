import Aluno from '../models/Aluno.js'
import Photo from '../models/Photo.js';

class AlunoController {
    async index(req, res) {
        try {
            const alunos = await Aluno.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
                include: [{
                    model: Photo,
                    attributes: ['file_name', 'url']
                }]
            });

            return res.json(alunos);
        } catch (err) {
            console.error(err);
        }
    }

    async store(req, res) {
        try {
            if (!req.body)
                return res.status(400).json('missing information');
            
            const novoAluno = await Aluno.create(req.body);
            return res.json(novoAluno);
        } catch (err) {
            return res.status(400).json('error');
        }
    }

    async show(req, res) {
        try {
            const aluno = await Aluno.findByPk(req.params.id, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
                include: [{
                    model: Photo,
                    attributes: ['file_name', 'url']
                }]
            });

            if (!aluno)
                return res.status(400).json('student not found');

            return res.json(aluno);
        } catch (err) {
            console.error(err);
        }
    }

    async update(req, res) {
        try {
            const aluno = await Aluno.findByPk(req.params.id);

            if (!aluno)
                return res.status(400).json('student not found');

            const alunoUpdate = await aluno.update(req.body);
            
            return res.json(alunoUpdate);
        } catch (err) {
            console.error(err);
        }
    }

    async delete(req, res) {
        try {
            const deleteAluno = await Aluno.findByPk(req.params.id);
            
            if (!deleteAluno)
                return res.status(400).json('student not found');

            await deleteAluno.destroy();

            res.json('student deleted')
        } catch (err) {
            console.error(err);
        }
    }

}

export default new AlunoController;
