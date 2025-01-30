import { Sequelize, Model, DataTypes } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'O campo nome deve conter entre 3 e 255 caracteres.'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido.'
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'A senha deve conter entre 6 e 50 caracteres'
                    }
                }
            },
        }, {
            sequelize
        });

        this.addHook('beforeCreate', user => {
            user.password_hash = bcryptjs.hashSync(user.password)
        })
    }

    passwordIsValid(password) {
        return bcryptjs.compareSync(password, this.password_hash);
    }
}