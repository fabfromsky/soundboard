import { createRouter, createWebHistory } from 'vue-router'

import Sound from '../pages/Sound.vue'
import Board from '../pages/Board.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Board,
  },
  {
    name: 'sound',
    path: '/sound/:soundId',
    component: Sound,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
