'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cargos', [
      {
        nome: 'Vigia noturno',
        salario: 954.90,
        descricao: 'Descrição de vigia noturno'
      },
      {
        nome: 'Dentista',
        salario: 954.90,
        descricao: 'Descrição de dentista'
      },
      {
        nome: 'Administrador',
        salario: 954.90,
        descricao: 'Descrição de administrador'
      },
      {
        nome: 'Serviços gerais',
        salario: 954.90,
        descricao: 'Descrição de serviços gerais'
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cargos', null, {});
  }
}
