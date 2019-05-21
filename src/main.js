import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from '@/router/index';
import store from './store';
import Vuelidate from 'vuelidate';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import trim from "@/filters/trim"
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.filter('trim', trim)
Vue.component('app-loading', Loading);
Vue.component('app-alert', Alert);
new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    let user = localStorage.getItem('user');
    if (user) {
      this.$store.commit('setUser', user);
      this.$store.dispatch('getMeetupsData');
    }
  }
}).$mount('#app');
