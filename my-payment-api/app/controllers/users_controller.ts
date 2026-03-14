import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
    public async index({ response }: HttpContext) {
        const users = await User.all()

        return response.ok(users)
    }

    public async store({ request, response }: HttpContext) {
        const dados = request.only(['name', 'email', 'password', 'role'])
        
        const user = await User.create(dados)
        
        return response.created(user)
    }

    public async update({ params, request, response}: HttpContext) {
        const user = await User.findOrFail(params.id)

        const dados = request.only(['name', 'email', 'password', 'role'])

        user.merge(dados)

        await user.save()

        return response.ok(user)
    }

    public async destroy({ params, response}: HttpContext) {
        const user = await User.findOrFail(params.id)

        await user.delete()

        return response.ok({message: 'Usuario deletado com sucesso'})
    }
}