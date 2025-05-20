import { createStore } from 'vuex'

export default createStore({
  state: {
    rol: localStorage.getItem('Rol') || null,
    email: localStorage.getItem('email') || null,
    idusu: localStorage.getItem('id') || null,
    name: localStorage.getItem('name') || null,
    token: localStorage.getItem('token') || null,
    token_type: localStorage.getItem('token_type') || null,
  },
  getters: {
    getIdusu: state => state.idusu,
    isAuthenticated: state => !!state.token,
    getFullToken: state => `${state.token_type} ${state.token}`,

  },
  mutations: {
   setRol(state, nuevoRol) {
      state.rol = nuevoRol;
      localStorage.setItem('Rol', nuevoRol);
    },
    setemail(state, nuevoemail) {
      state.email = nuevoemail;
      localStorage.setItem('email', nuevoemail);
    },
    setid(state, nuevoid) {
      state.idusu = nuevoid;
      localStorage.setItem('id', nuevoid);
    },
    setname(state, nuevoname) {
      state.name = nuevoname;
      localStorage.setItem('name', nuevoname);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setTokenType(state, type) {
      state.token_type = type;
      localStorage.setItem('token_type', type);
    },
    logout(state) {
      // Limpia el state y localStorage al cerrar sesión
      state.rol = null;
      state.email = null;
      state.idusu = null;
      state.name = null;
      state.token = null;
      state.token_type = null;

      localStorage.removeItem('Rol');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      localStorage.removeItem('token_type');
      localStorage.removeItem('user');
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
