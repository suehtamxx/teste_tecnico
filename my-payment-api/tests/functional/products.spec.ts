import { test } from '@japa/runner'

test.group('Products', () => {
  test('deve impedir a criação de um produto sem estar autenticado', async ({ client }) => {
    const response = await client.post('/api/v1/products').json({
      name: 'Teclado Gamer',
      amount: 250
    })
    response.assertStatus(401) 
  })
})