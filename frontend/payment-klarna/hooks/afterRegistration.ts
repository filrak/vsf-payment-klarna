import { TaskQueue } from '@vue-storefront/core/lib/sync'

export function afterRegistration({ Vue, isServer, config, store }) {
  if (!isServer && config.klarna.validate_order) {
    const url = config.klarna.validate_order
    Vue.prototype.$bus.$on('klarna-event-order_total_change', () => {
      const {orderId} = store.state.kco.checkout
      if (url && orderId) {
        TaskQueue.execute({ url,
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId
            })
          },
          silent: true
        })
      }
    })
  }
}
