import Vue from 'vue';
import Router from 'vue-router';
// import Introduce from './../components/Introduce/Introduce.vue';
// import Main from './../components/Main/Main.vue';
// import Sort from './../components/Sort/Sort.vue';
// import Login from './../components/Login/Login.vue';
// import Upload from './../components/Upload/Upload.vue';
// import PersonCenter from './../components/PersonCenter/PersonCenter.vue';
// import UserCenter from './../components/UserCenter/UserCenter.vue';
// import FollowCenter from './../components/FollowCenter/FollowCenter.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/introduce',
      name: 'Introduce',
      component: () => import('./../components/Introduce/Introduce.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('./../components/Main/Main.vue')
    },
    {
      path: '/sort',
      name: 'Sort',
      component: () => import('./../components/Sort/Sort.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./../components/Login/Login.vue')
    },
    {
      path: '/upload',
      name: 'Upload',
      component: () => import('./../components/Upload/Upload.vue')
    },
    {
      path: '/personcenter',
      name: 'PersonCenter',
      component: () => import('./../components/PersonCenter/PersonCenter.vue')
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: () => import('./../components/UserCenter/UserCenter.vue')
    },
    {
      path: '/followcenter',
      name: 'FollowCenter',
      component: () => import('./../components/FollowCenter/FollowCenter.vue')
    },
    {
      path: '*',
      redirect: '/introduce'
    }
  ]
});
