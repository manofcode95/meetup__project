import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import authGuard from './auth-guard';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/User/LogIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/User/SignUp.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      props: true,
      component: () => import('@/views/User/Profile.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/logout',
      name: 'logout',
      props: true,
      component: () => import('@/views/User/LogOut.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/meetup/:id',
      name: 'meetup',
      props: true,
      component: () => import('@/views/Meetup/SingleView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('@/views/Meetup/Meetups.vue'),
      beforeEnter: authGuard
    },


    {
      path: '/meetups/new',
      name: 'new',
      component: () => import('@/views/Meetup/Organize.vue'),
      beforeEnter: authGuard
    }
  ]
});
