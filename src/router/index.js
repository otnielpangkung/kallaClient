import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Loginpage from "../views/Loginpage.vue"
import Dashboard from "../views/Dashboard.vue"
import Schedule from "../views/Schedule.vue"
import Realisasi from "../views/Realisasi.vue"
import Relasi from "../views/Relasi.vue"
import Items from "../views/Items.vue"
import Solar from "../views/Solar.vue"
import LaporanProduksi from "../views/LaporanProduksi.vue"


import AllSchedule from "../views/AllSchedule.vue"
import AllRealisasi from "../views/AllRealisasi.vue"
import AllRelasi from "../views/AllRelasi.vue"
import AllSolar from "../views/AllSolar.vue"
import AllUser from "../views/AllUser.vue"
import AllKendala from "../views/AllKendala.vue"
import AllLaporanProduksi from "../views/AllLaporanProduksi.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Loginpage',
    component: Loginpage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true }
  },
  {
    path: '/realisasi',
    name: 'Realisasi',
    component: Realisasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/produksi',
    name: 'LaporanProduksi',
    component: LaporanProduksi,
    meta: { requiresAuth: true }
  },
  {
    path: '/relasi',
    name: 'Relasi',
    component: Relasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/solar',
    name: 'Solar',
    component: Solar,
    meta: { requiresAuth: true }
  },
  {
    path: '/allschedule',
    name: 'AllSchedule',
    component: AllSchedule,
    meta: { requiresAuth: true }
  },
  {
    path: '/allrealisasi',
    name: 'AllRealisasi',
    component: AllRealisasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/allrelasi',
    name: 'AllRelasi',
    component: AllRelasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/allsolar',
    name: 'AllSolar',
    component: AllSolar,
    meta: { requiresAuth: true }
  },
  {
    path: '/alluser',
    name: 'AllUser',
    component: AllUser,
    meta: { requiresAuth: true }
  },
  {
    path: '/allkendala',
    name: 'AllKendala',
    component: AllKendala,
    meta: { requiresAuth: true }
  },
  {
    path: '/allproduksi',
    name: 'AllLaporanProduksi',
    component: AllLaporanProduksi,
    meta: { requiresAuth: true }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { // pengecekan meta required
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      alert("Anda Harus Login terlebih dahulu ya..!!")
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
