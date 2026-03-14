/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import PurchasesController from '#controllers/purchases_controller'
import ClientsController from '#controllers/clients_controller'
import GatewaysController from '#controllers/gateways_controller'
import ProductsController from '#controllers/products_controller'
import UsersController from '#controllers/users_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')
      
      router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
    
    router.get('transactions', [PurchasesController, 'index']).use(middleware.auth())
    router.get('transactions/:id', [PurchasesController, 'show']).use(middleware.auth())
    router.get('clients', [ClientsController, 'index']).use(middleware.auth())
    router.get('clients/:id', [ClientsController, 'show']).use(middleware.auth())
    router.post('purchases', [PurchasesController, 'store'])
    router.patch('gateways/:id/status', [GatewaysController, 'updateStatus']).use(middleware.auth())
    router.patch('gateways/:id/priority', [GatewaysController, 'updatePriority']).use(middleware.auth())
    
    //Usuarios (somente admin)
    router.get('users', [UsersController, 'index'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN']))

    router.post('users', [UsersController, 'store'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN']))

    router.put('users/:id', [UsersController, 'update'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN']))

    router.delete('users/:id', [UsersController, 'destroy'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN']))

    //Produtos (admin e manager)
    router.get('products', [ProductsController, 'index'])
    .use(middleware.auth())

    router.put('products/:id', [ProductsController, 'update'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN', 'MANAGER']))
    
    router.delete('products/:id', [ProductsController, 'destroy'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN', 'MANAGER']))

    router.post('products', [ProductsController, 'store'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN', 'MANAGER']))
    
    //transacoes
    router.post('transactions/:id/refund', [PurchasesController, 'refund'])
    .use(middleware.auth())
    .use(middleware.role(['ADMIN', 'FINANCE'])) 
  })
  .prefix('/api/v1')
