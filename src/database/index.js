import { Sequelize } from "sequelize";
import databaseConfig from '../config/database.js';
import Photo from "../models/Photo.js";
import Aluno from '../models/Aluno.js';
import User from "../models/User.js";


const models = [Photo, User, Aluno];

const sequelize = new Sequelize(databaseConfig); //creating new connection

models.forEach(model => {
    model.init(sequelize);
    if (model.associate) model.associate(sequelize.models);
});

export default sequelize;
