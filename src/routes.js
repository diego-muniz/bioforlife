import { Router } from 'express';
import BuscarCepController from './app/controllers/BuscarCepController';
import CadastroController from './app/controllers/CadastroController';
import TermosController from './app/controllers/TermosController';
import basicAuth from './app/helpers/basic-auth';

const routes = new Router();

routes.get('/', (req, res) => res.json('Running !'));

routes.use(basicAuth);

routes.get('/buscarcep/:cep', BuscarCepController.show);
routes.post('/cadastrar', CadastroController.store);
routes.post('/termo', TermosController.show);

export default routes;
