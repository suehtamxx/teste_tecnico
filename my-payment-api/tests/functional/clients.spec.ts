import { test } from '@japa/runner'

test.group('Clients', () => {
  test('deve retornar erro 401 ao tentar listar clientes de forma anônima', async ({ client }) => {
    const response = await client.get('/api/v1/clients')
    response.assertStatus(401)
  })
})