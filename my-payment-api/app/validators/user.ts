import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const createUserValidator = vine.create({
  name: vine.string().trim().minLength(3),
  email: email().unique({ table: 'users', column: 'email'}),
  password: password(),
  role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'])

})
/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
