const state = {
  userId: -1,
  walls: {
    recommend: [],
    sort: [],
    personal: []
  },
  shadows: {
    recommend: {
      src: '',
      contributor: '',
      likeType: 0,
      collectType: 0,
      imgId: -1,
      loginUser: this.userId
    },
    sort: {
      src: '',
      contributor: '',
      likeType: 0,
      collectType: 0,
      imgId: -1,
      loginUser: this.userId
    },
    personal: {
      src: '',
      contributor: '',
      likeType: 0,
      collectType: 0,
      imgId: -1,
      loginUser: this.userId
    }
  }
};
export default state;
