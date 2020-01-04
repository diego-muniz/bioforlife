import { Router } from 'express';
import BuscarCepController from './app/controllers/BuscarCepController';
import CadastroController from './app/controllers/CadastroController';
import UFController from './app/controllers/UFController';

const routes = new Router();

routes.get('/', (req, res) => res.json('Running !'));
routes.get('/buscarcep/:cep', BuscarCepController.show);
routes.get('/ufs', UFController.index);
routes.post('/cadastrar', CadastroController.store);

export default routes;
