import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'

export default class GatewaysController {
    public async updateStatus({ params, response}: HttpContext) {
        const gateway = await Gateway.findOrFail(params.id)
        gateway.isActive = !gateway.isActive
        await gateway.save()

        return response.ok(gateway)
    }

    public async updatePriority({ params, response, request}: HttpContext) {
        const gateway = await Gateway.findOrFail(params.id)
        const new_priority = request.body()
        gateway.priority = new_priority.priority
        await gateway.save()

        return response.ok(gateway)
    }
}