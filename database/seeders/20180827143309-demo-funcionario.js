'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Funcionarios', [
      {
        "email": "rb.mateus.araujo@gmail.com",
        "password": "123456",
        "name": "Mateus Araujo",
        "clinica": "Nome da clínica",
        "cpf": "021.170.943-33",
        "data_nascimento": "31/12/1993",
        "acesso_sistema": true,
        "cargos": [1]
      },
      {
        "email": "joao2@email.com",
        "password": "123456",
        "name": "joao2",
        "clinica": "Nome da clínica",
        "cpf": "012.273.940-99",
        "data_nascimento": "31/12/1993",
        "acesso_sistema": true,
        "cargos": [1]
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Funcionarios', null, {});
  }
};
