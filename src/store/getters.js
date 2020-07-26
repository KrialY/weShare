export default {
  userId (state) {
    return state.userId;
  },
  recommend (state) {
    return state.walls.recommend;
  },
  shadowsRecommend (state) {
    return state.shadows.recommend;
  },
  sort (state) {
    return state.walls.sort;
  },
  shadowsSort: (state) => state.shadows.sort,
  personal: (state) => state.walls.personal,
  shadowsPersonal: (state) => state.shadows.personal
};
