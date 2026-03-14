import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product' 
import { createProductValidator } from '#validators/product'

export default class ProductsController {

    public async index({ response }: HttpContext) {
        const products = await Product.all()
        return response.ok(products)
    }
    
    public async store({ response, request }: HttpContext) {
        const payload = await request.validateUsing(createProductValidator)

        const product = await Product.create(payload)

        return response.created(product)
    }

    public async update({ params, request, response }: HttpContext) {
        const product = await Product.findOrFail(params.id)

        const dados = request.body()
        
        product.merge(dados)

        await product.save()

        return response.ok(product)
    }

    public async destroy({ params, response }: HttpContext) {
        const product = await Product.findOrFail(params.id)

        await product.delete()

        return response.ok({message: 'Produto deletado com sucesso'})
    }
}