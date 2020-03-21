/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments('id')
            table.string('username').notNullable()
            .unique()
            table.string('name').notNullable()
            table.string('email').notNullable().unique()
            table.string('password').notNullable()   
            table.string('bio')
            table.string('homepage')
            table.string('contactEmail')
            table
                .boolean('is_admin')
                .defaultTo(false)
                .notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
