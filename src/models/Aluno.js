import { Sequelize, Model, DataTypes } from "sequelize";

export default class Aluno extends Model {
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
            sobrenome:{
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'O campo sobrenome deve conter entre 3 e 255 caracteres.'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique: {
                    msg: 'E-mail já cadastrado.'
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido.'
                    }
                }
            },
            idade: {
                type: DataTypes.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'O campo idade deve ser um número inteiro.'
                    }
                }
            },
            peso: {
                type: DataTypes.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'O campo peso deve ser um número.'
                    }
                }
            },
            altura: {
                type: DataTypes.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'O campo altura deve ser um número.'
                    }
                }
            },

        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Photo, {foreignKey: 'aluno_id'});
    }
}