/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  purchases: {
    index: typeof routes['purchases.index']
    show: typeof routes['purchases.show']
    store: typeof routes['purchases.store']
    refund: typeof routes['purchases.refund']
  }
  clients: {
    index: typeof routes['clients.index']
    show: typeof routes['clients.show']
  }
  gateways: {
    updateStatus: typeof routes['gateways.update_status']
    updatePriority: typeof routes['gateways.update_priority']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  products: {
    index: typeof routes['products.index']
    update: typeof routes['products.update']
    destroy: typeof routes['products.destroy']
    store: typeof routes['products.store']
  }
}
