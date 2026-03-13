import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  static async verifyCredentials(email: string, password: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('Credentials invalid')
    }

    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      throw new Error('Credentials invalid')
    }

    return user
  }
  
  @column({ isPrimary: true})
  declare id: number

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true})
  declare updatedAt: DateTime
  
}  
