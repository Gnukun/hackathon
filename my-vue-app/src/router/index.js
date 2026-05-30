import { createRouter, createWebHistory } from 'vue-router'
import Sotugyou from '@/components/Sotugyou.vue'
import Nyuugaku from '@/components/Nyuugaku.vue'
import Taigaku from '@/components/Taigaku.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/nyuugakusiki',
        component: Nyuugaku
    },
    {
        path: '/sotugyousiki',
        component: Sotugyou
    },
    {
        path: '/taigaku',
        component: Taigaku
    }
  ]
})

export default router