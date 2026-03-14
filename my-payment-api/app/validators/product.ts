import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  // Name (required), string, minimum 2 letters.
  name: vine.string().trim().minLength(2),
  
  // Required value, number, and prevents negative values.
  amount: vine.number().positive() 
})