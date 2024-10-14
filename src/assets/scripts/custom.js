import $ from 'jquery';
import store from '@/store';
export default {
  data() {
    return {
      idus: '',
      role: '',
      emaile: '',
    };
  },
  mounted() {
  
  },
  computed: { 
    cerrarsesion() {
      console.clear();
      var rol = '';
      var email = '';
      var id = '';
      var name = '';
      // Limpiar el estado de Vuex
      store.commit('setRol', null);
      store.commit('setemail', null);
      store.commit('setid', null);
      store.commit('setname', null);
      
      
      this.$router.replace('/');
    },
    showNavbar() {
      // Lógica para determinar si mostrar o no el navbar
      return this.$route.name !== 'home';
    },
    rolUsuario() {
      //console.log(store);
      return store.state.rol;
    },
    emailUsuario() {
      //console.log(store);
      return store.state.email;
    },
    idUsuario() {
      //console.log(store);
      return store.state.idusu;
    },
    mostrarOpciones() {
      //console.log(this.rolUsuario);
      this.role=this.rolUsuario;
      this.emaile=this.emailUsuario;
      this.idus=this.idUsuario;
      return this.rolUsuario === 'Empresa';
    },
    mostrarOpciones2() {
      //console.log(this.rolUsuario);
      this.role=this.rolUsuario;
      this.emaile=this.emailUsuario;
      this.idus=this.idUsuario;
      return this.rolUsuario === 'Estudiante';
    },
    mostrarOpciones3() {
      //console.log(this.rolUsuario);
      this.role=this.rolUsuario;
      this.emaile=this.emailUsuario;
      this.idus=this.idUsuario;
      return this.rolUsuario === 'Administrador';
    },
    mostrarOp() {
      
      return this.$route.name === 'home';
    },
   
  },
};