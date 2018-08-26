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
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cargos', null, {});
  }
}
