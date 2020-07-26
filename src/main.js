// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store/index';
import App from './App';
import router from './router';
import './common/stylus/index.styl';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'static/img/error.jpg',
  loading: 'static/img/bodybg.png',
  attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
