import * as types from './types';

export default {
  [types.FRESHUSERID] (state, userId) {
    state.userId = userId;
  },
  [types.FRESHRECOMMEND] (state, walls) {
    state.walls.recommend = walls;
  },
  [types.SENDSHADOW] (state, shadowData) {
    switch (shadowData.parent) {
      case 'recommend':
        state.shadows.recommend = shadowData;
        break;
      case 'sort':
        state.shadows.sort = shadowData;
        break;
      case 'personal':
        state.shadows.personal = shadowData;
        break;
    }
  },
  [types.FRESHWALLS] (state, {imgId, parent}) {
    let items = state.walls.recommend;
    let shadow = state.shadows.recommend;
    switch (parent) {
      case 'recommend':
        items = state.walls.recommend;
        shadow = state.shadows.recommend;
        break;
      case 'sort':
        items = state.walls.sort;
        shadow = state.shadows.sort;
        break;
      case 'personal':
        items = state.walls.personal;
        shadow = state.shadows.personal;
        break;
    }
    for (let i = 0; i < items.length; i++) {
      if (parseInt(items[i].ID) === parseInt(imgId)) {
        items[i].like = parseInt(shadow.likeType);
        items[i].collect = parseInt(shadow.collectType);
      }
    }
  },
  [types.FRESHSORT] (state, walls) {
    state.walls.sort = walls;
  },
  [types.CHANGEOWN] (state, {imgId, parent, like, collect}) {
    let items = state.walls.recommend;
    switch (parent) {
      case 'recommend':
        items = state.walls.recommend;
        break;
      case 'sort':
        items = state.walls.sort;
        break;
      case 'personal':
        items = state.walls.personal;
        break;
    }
    for (let i = 0; i < items.length; i++) {
      if (parseInt(items[i].ID) === parseInt(imgId)) {
        if (typeof (collect) !== 'undefined') {
          items[i].collect = collect;
        }
        if (typeof (like) !== 'undefined') {
          items[i].like = like;
        }
      }
    }
  },
  [types.FRESHPERSONAL] (state, walls) {
    state.walls.personal = walls;
  }
};
