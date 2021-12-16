import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    meta: { layout: 'auth' },
    component: () => import('../views/404')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { layout: 'auth' },
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Notes.vue')
  },
  {
    path: '/notes/:id',
    name: 'Note',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Note.vue')
  },
  {
    path: '/targets',
    name: 'Targets',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Targets.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requireAuth = to.matched.some(record => record.meta.auth)
  onAuthStateChanged(auth, (user) => {
    if (requireAuth && !user) {
      next('/login?message=login')
    } else if (to.path === '/') {
      next('/notes')
    } else {
      next()
    }
  })
})

export default router
