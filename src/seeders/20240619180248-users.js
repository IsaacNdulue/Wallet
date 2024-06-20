module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'merchant',
        email: 'example@example.com',
        phoneNumber:'07063775404',
        password:'12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Mark',
        lastName: 'Doe',
        username: 'buyer',
        email: 'buyer@example.com',
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