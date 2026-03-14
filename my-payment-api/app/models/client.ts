import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon' 
import Transaction from './transaction.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
    @hasMany(() => Transaction)
    declare transactions: HasMany<typeof Transaction>

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare email: string

    @column()
    declare name: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}