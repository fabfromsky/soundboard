import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  provide: {
    staticResources: {
      sounds: {
        url: '/assets/sounds/'
      },
      imgs: {
        url: 'assets/imgs/'
      }
    }
  }
}).$mount('#app')
