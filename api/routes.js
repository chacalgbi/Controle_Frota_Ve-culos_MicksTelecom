const { Router } = require("express");
const CondutorController = require('./Controllers/Condutor');
const CarroController = require('./Controllers/Carro');
const VistoriaController = require('./Controllers/Vistoria');
const LoginController = require('./Controllers/Login');

const routes = new Router();

//Condutores
routes.get('/listar_condutores', CondutorController.listar);
routes.post('/cadastrar_condutor', CondutorController.cadastrar);
routes.delete('/deletar_condutor/:id', CondutorController.deletar);

//Carros
routes.get('/listar_carros', CarroController.listar);
routes.get('/mostrar_carro/:id', CarroController.mostrar);
routes.post('/cadastrar_carro', CarroController.cadastrar);
routes.delete('/deletar_carro/:id', CarroController.deletar);
routes.put('/editar_carro', CarroController.atualizar);

//Vistorias
routes.get('/listar_vistorias', VistoriaController.listar);
routes.get('/mostrar_vistoria/:id', VistoriaController.mostrar);
routes.post('/cadastrar_vistoria', VistoriaController.cadastrar);
routes.delete('/deletar_vistoria/:id', VistoriaController.deletar);
routes.put('/editar_vistoria', VistoriaController.atualizar);

//Login
routes.post('/login', LoginController.login);

module.exports = routes;