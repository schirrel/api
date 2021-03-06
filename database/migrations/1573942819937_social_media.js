/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

 class SocialMediaSchema extends Schema {
    up() {
        this.create('social_medias', table => {
            table.increments()
            table
                .integer('user_id')
                .references('id')
                .inTable('user')
            table.string('link')
            table.integer('type') // references constants
            // table.enu('type', Config.get('constants'))
            table.timestamps()
        })
    }

     down() {
        this.drop('social_medias')
    }
}

 module.exports = SocialMediaSchema