import Vue from 'vue'
import Router from 'vue-router'
import Sound from './pages/Sound.vue'
import Board from './pages/Board.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Board
    },
    {
      name: 'sound',
      path: '/sound/:soundId',
      component: Sound,
      props: true
    }
  ]
})
