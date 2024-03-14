import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: null,
    fullScore: 0,
    activeStep: 0,
    DoctorStatus: null,
    profile:null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setFullScore(state, fullScore) {
      state.fullScore = fullScore;
    },
    setActiveStep(state, activeStep) {
      state.activeStep = activeStep;
    },
    setDoctorStatus(state, DoctorStatus) {
      state.DoctorStatus = DoctorStatus;
    },
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
    getFullScore(state) {
      return state.fullScore;
    },
    getActiveStep(state) {
      return state.activeStep;
    },
    getDoctorStatus(state) {
      return state.DoctorStatus;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setFullScore({ commit }, fullScore) {
      commit('setFullScore', fullScore);
    },
    setActiveStep({ commit }, activeStep) {
      commit('setActiveStep', activeStep);
    },
    setDoctorStatus({ commit }, DoctorStatus) {
      commit('setDoctorStatus', DoctorStatus);
    },
    setProfile({ commit }, profile) {
      commit('setProfile', profile);
    }
  },
  modules: {
  }
})
