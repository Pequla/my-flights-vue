import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SavedView from '@/views/SavedView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About'
    },
    component: AboutView
  },
  {
    path: '/flight/:id',
    name: 'flight',
    meta: {
      title: 'Flight'
    },
    component: FlightView
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register'
    },
    component: RegisterView
  },
  {
    path: '/saved',
    name: 'saved',
    meta: {
      title: 'Saved'
    },
    component: SavedView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = `${to.meta.title} :: MyFlights`;
  next();
})

export default router
