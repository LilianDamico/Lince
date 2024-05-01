import { Router } from 'express';
import CreateAccount from './controllers/CreateAccount';

const routes = new Router();

routes.post('/create-account', CreateAccount.store);



export default routes;