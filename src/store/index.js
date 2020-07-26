import Vue from 'vue';
import Vuex from 'vuex';
import state from './datas';
import actions from './action';
import getters from './getters';
import mutations from './mutatins';

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
