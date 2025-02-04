import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path'

import './src/database/index.js';

import tokenRoutes from './src/routes/tokenRoutes.js';
import photoRoutes from './src/routes/photoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import homeRoutes from './src/routes/homeRoutes.js';
import alunoRoutes from './src/routes/alunoRoutes.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json()); 
    this.app.use(express.static(path.resolve(import.meta.dirname, 'uploads')));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    })
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/photos', photoRoutes);
  }
}

export default new App().app;
