
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Web15Student', cohort_id:1},
        {name: 'Web16Student', cohort_id:2},
        {name: 'Web17Student', cohort_id:3}
      ]);
    });
};
