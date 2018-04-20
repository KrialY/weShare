import Vue from 'vue';
import Router from 'vue-router';
import Introduce from './../components/Introduce/Introduce.vue';
import Main from './../components/Main/Main.vue';
import Sort from './../components/Sort/Sort.vue';
import Login from './../components/Login/Login.vue';
import Upload from './../components/Upload/Upload.vue';
import PersonCenter from './../components/PersonCenter/PersonCenter.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/introduce',
      name: 'Introduce',
      component: Introduce
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/sort',
      name: 'Sort',
      component: Sort
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/personcenter',
      name: 'PersonCenter',
      component: PersonCenter
    },
    {
      path: '*',
      redirect: '/introduce'
    }
  ]
});
