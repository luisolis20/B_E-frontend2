import { createStore } from 'vuex'

export default createStore({
  state: {
    rol: null,
    email: null,
    idusu: null,
    name: null,
  },
  getters: {
    getIdusu: state => state.idusu
  },
  mutations: {
    setRol(state, nuevoRol) {
      state.rol = nuevoRol;
    },
    setemail(state, nuevoemail) {
      state.email = nuevoemail;
    },
    setid(state, nuevoid) {
      state.idusu = nuevoid;
    },
    setname(state, nuevoname) {
      state.name = nuevoname;
    },
  },
  actions: {
    updateIdusu({ commit }, idusu) {
      commit('setid', idusu);
    }
  },
  modules: {
  }
})
