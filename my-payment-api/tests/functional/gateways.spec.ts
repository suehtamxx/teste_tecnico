import { test } from '@japa/runner'

test.group('Gateways', () => {
  test('deve bloquear acesso à listagem de gateways sem token de autenticação', async ({ client }) => {
    const response = await client.get('/api/v1/gateways')
    response.assertStatus(401)
  })
})