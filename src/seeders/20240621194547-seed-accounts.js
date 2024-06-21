'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('accounts', [
      {
        user_id: 1, 
        account_number: '7063775404',
        balance: 1000.28,
        accounttype: 'savings',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        account_number: '1234567890',
        balance: 2800.00,
        accounttype: 'current',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};