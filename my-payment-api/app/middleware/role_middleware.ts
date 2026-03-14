import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  // Recebe a lista de cargos permitidos que colocamos lá na rota
  async handle({ auth, response }: HttpContext, next: NextFn, roles: string[]) {
    
    // Pega o usuário que está logado
    const user = auth.user

    // Se o usuário não existir, ou a 'role' dele não estiver na lista: Barra ele!
    if (!user || !roles.includes(user.role)) {
      return response.forbidden({ 
        message: 'Acesso Negado: Seu cargo não tem permissão para acessar este recurso.' 
      })
    }

    // Se tem a permissão, deixa a requisição passar
    await next()
  }
}