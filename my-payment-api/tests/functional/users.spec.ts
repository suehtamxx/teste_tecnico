import { test } from '@japa/runner'

test.group('Users', () => {
  test('deve retornar erro 401 ao tentar listar usuarios sem token', async ({ client }) => {
    // o client tenta fazer um get na rota protegida
    const response = await client.get('api/v1/users')

    // assert informando que o sistema DEVE barrar e devolver o status 401
    response.assertStatus(401)
  })
})