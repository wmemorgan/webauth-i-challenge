
exports.up = async function(knex) {
  await knex.schema.createTable('Users', tbl => {
    tbl.increments()
    tbl
      .string('username', 128)
      .notNullable()
      .unique()
    tbl.string('password', 128).notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Users')
};
