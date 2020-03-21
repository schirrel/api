/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeSave', async userInstance => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    tokens() {
        return this.hasMany('App/Models/Token')
    }

    events() {
        return this.hasMany('App/Models/Event')
    }

    blogPosts() {
        return this.hasMany('App/Models/BlogPost')
    }
    
    static async getOneById(id) {
        const entity = await User.findOrFail(id)
        const copy = JSON.parse(JSON.stringify(entity));
        copy.password = null;
        return copy
    }
    static search(params) {

        return User.query().where(params).fetch()
    }
}

module.exports = User
