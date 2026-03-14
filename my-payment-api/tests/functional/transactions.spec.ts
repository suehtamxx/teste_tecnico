import { test } from '@japa/runner'

test.group('Transactions', () => {
  test('deve impedir que usuários não logados solicitem reembolso', async ({ client }) => {
    const response = await client.post('/api/v1/transactions/1/refund')
    response.assertStatus(401)
  })
})