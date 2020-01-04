import { Router } from 'express';
import BuscarCepController from './app/controllers/BuscarCepController';
import CadastroController from './app/controllers/CadastroController';
import basicAuth from './app/helpers/basic-auth';

const routes = new Router();

routes.get('/', (req, res) => res.json('Running !'));

routes.use(basicAuth);

routes.get('/buscarcep/:cep', BuscarCepController.show);
routes.post('/cadastrar', CadastroController.store);

export default routes;
