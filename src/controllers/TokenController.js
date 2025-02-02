import User from '../models/User.js'
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password)
      return res.status(400).json({
        errors: ['credenciais inválidas']
      });

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user)
      return res.status(400).json({
        errors: ['Usuário inexistente']
      });

    if (!user.passwordIsValid(password))
      return res.status(400).json({
        errors: ['Senha inválida']
      });

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });

    return res.json({ token, user: {name: user.nome, id, email} });
  }
}

export default new TokenController;