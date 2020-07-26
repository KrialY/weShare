import * as types from './types';

export default {
  freshUserid ({commit}, userId) { // 加载改变userid
    commit(types.FRESHUSERID, userId);
  },
  freshRecommendData ({commit}, walls) { // 加载改变main组件中的数据
    commit(types.FRESHRECOMMEND, walls);
  },
  sendShadowData ({commit}, shdowData) { // 点击小卡片中的喜欢与收藏加载改变弹出层大卡片的数据
    commit(types.SENDSHADOW, shdowData, parent);
  },
  freshWalls ({commit}, {imgId, parent}) { // 点击弹出层大卡片中的喜欢与收藏将datas中小卡片对应的数据改变
    commit(types.FRESHWALLS, arguments[1]);
  },
  freshSortData ({commit}, walls) { // 加载改变sort组件的数据
    commit(types.FRESHSORT, walls);
  },
  changeOwn ({commit}, imgId) { // 点击小卡片中的喜欢与收藏将datas中对应的小卡片数据改变
    commit(types.CHANGEOWN, imgId);
  },
  freshPersonalData: ({commit}, walls) => { // 加载改变PersonCenter组件中的数据
    commit(types.FRESHPERSONAL, walls);
  }
};
