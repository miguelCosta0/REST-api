import User from '../models/User.js'

class UserController {
    async create(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err.errors.map(error => {
                return error.message;
            }));
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    }

    async show(req, res) {
        try {
            console.log('------->>', req.userId)
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'nome', 'email']
            });

            if (user) res.json(user);
            else res.json("Não existe nenhum usuário cadastrado com esse e-mail.");
        } catch (err) {
            console.error(err);
        }
    }

    async update(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if (user)
                await user.update(req.body);

            res.json(user);
        } catch (err) {
            console.error(err);
        }
    }

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if (user)
                await user.destroy();
            else {
                res.json(null);
                throw new Error('Usuário inexistente.');
            }

            if (user) {
                res.json(null);
                throw new Error('Não foi possivel deletar o usuario');
            } else 
                res.json('Usuário apagado');
        } catch (err) {
            console.error(err);
        }
    }
}

export default new UserController;