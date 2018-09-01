'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Funcionarios', [
      {
        nome: 'Vigia noturno',
        cpf: 954.90,
        data_nascimento: 'Descrição de vigia noturno',
        usuario_id: 1,
        cargos: [
          { id: 1 },
          { id: 2 }
        ]
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Funcionarios', null, {});
  }
};
