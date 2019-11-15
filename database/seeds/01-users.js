
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Viper', password: 'Rapper' },
        { username: 'Kendrick', password: 'Lamar' },
        { username: 'Aesop', password: 'Rock' }
      ]);
    });
};
