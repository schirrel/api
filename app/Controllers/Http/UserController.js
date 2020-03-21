/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Config = use('Config')
const { errors } = Config.get('errors')

class UserController {
    async store({ params, request }) {
        const user = await User.findByOrFail('id',params.id)
        const userData = request.only(['email', 'username', 'name', 'password', 'bio', 'homepage', 'contactEmail'])
        if (userData.password == null) {
            userData.password = user.password;
        }
        Object.assign(user, userData);
        await user.save()
        return user
    }

    async get({ request, response }) {
        const { id } = request.params

        if (!id) {
            response.status(406).json({
                error: errors.defaults.NOT_DEFINED('id'),
            })
            return
        }

        const found = await User.getOneById(id)
        if (!found) {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('user'),
            })
            return
        }
        response.send(found)
    }
    async getByToken({ request, response }) {
        const { token } = request.params
        const found = await Token.query().where({token})
        if (!found) {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('user'),
            })
            return
        } 
        let id = found.user_id;
        const user = await User.getOneById(id)
        response.send(user)
    }
}

module.exports = UserController