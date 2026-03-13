import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '#models/client'
import Product from '#models/product'
import Gateway from '#models/gateway'

export default class extends BaseSeeder {
  async run() {
    await Client.create({
      name: 'Joao Silva',
      email: 'joao@gmail.com'
    })

    await Product.create({
      name: 'teclado',
      amount: 150.00
    })
    
    await Gateway.create({
      name: 'Gateway 1',
      priority: 1,
      isActive: true
    })

    await Gateway.create({
      name: 'Gateway 2',
      priority: 2,
      isActive: true
    })
  }
}