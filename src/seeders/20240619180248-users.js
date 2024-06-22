module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Isaac',
        lastName: 'Ndulue',
        username: 'merchant',
        email: 'isaacndulue@gmail.com',
        phoneNumber:'07063775404',
        password:'12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Mark',
        lastName: 'ikubor',
        username: 'buyer',
        email: 'buyer@gmail.com',
        phoneNumber:'07063775405',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};