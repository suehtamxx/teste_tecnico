import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import { DateTime } from 'luxon'
import Gateway from './gateway.js'
import Product from './product.js'

export default class Transaction extends BaseModel {
    @column({ isPrimary: true})
    declare id: number
    
    @column()
    declare clientId: number
    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>

    @column()
    declare gatewayId: number
    @belongsTo(() => Gateway)
    declare gateway: BelongsTo<typeof Gateway>

    @column()
    declare externalId: string

    @column()
    declare status: string

    @column()
    declare amount: number

    @column()
    declare cardLastNumbers: string

    @manyToMany(() => Product, {
        pivotTable: 'transaction_products',
        pivotColumns: ['quantity']
    })
    declare products: ManyToMany<typeof Product>
    
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true})
    declare updatedAt: DateTime
}