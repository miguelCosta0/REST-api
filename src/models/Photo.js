import { Sequelize, Model, DataTypes } from "sequelize";
import appConfig from "../config/app.js";

export default class Photo extends Model {
    static init(sequelize) {
        super.init({
            original_name: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'O campo não poder estar vazio.'
                    }
                }
            },
            file_name: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'O campo não poder estar vazio.'
                    }
                }
            },
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${appConfig.url}/images/${this.getDataValue('file_name')}`
                }
            }
        }, {
            sequelize
        });
    }
}