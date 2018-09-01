const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const AuthController = require('../app/controllers/AuthController')
const UserController = require('../app/controllers/UserController')
const CargoController = require('../app/controllers/CargoController')
const FuncionarioController = require('../app/controllers/FuncionarioController')

router.post('/auth/register', AuthController.create)
router.post('/auth/login', AuthController.login)
router.post('/auth/forgot_password', AuthController.forgotPassword)
router.post('/auth/reset_password', AuthController.resetPassword)

router.post('/cargos', CargoController.create)
router.get('/cargos', CargoController.index)
router.get('/cargos/:cargo_id', CargoController.show)
router.put('/cargos/:cargo_id', CargoController.update)
router.delete('/cargos/:cargo_id', CargoController.destroy)

router.post('/funcionarios', FuncionarioController.create)
router.get('/funcionarios', FuncionarioController.index)
router.get('/funcionarios/:funcionario_id', FuncionarioController.show)
router.put('/funcionarios/:funcionario_id', FuncionarioController.update)

router.get('/users', UserController.index)
router.get('/users/:user_id', UserController.show)
router.put('/users/:user_id', UserController.update)
router.put('/users', UserController.update)
router.delete('/users/:user_id', UserController.destroy)

module.exports = router
