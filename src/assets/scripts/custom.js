import $ from 'jquery';
import store from '@/store';

window.$ = $;
window.jQuery = $;

export default {
  data() {
    return {
      idus: '',
      role: '',
      emaile: '',
    };
  },
  mounted() {
    if ($.fn.owlCarousel) {
      $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          576: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      });


    } else {
      console.warn(
        "owlCarousel no está definido. Asegúrate de incluirlo correctamente."
      );
    }
  },
  computed: {
    cerrarsesion2() {
      console.clear();
      localStorage.clear();
      window.location.replace('/b_e');
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
      this.role = this.rolUsuario;
      this.emaile = this.emailUsuario;
      this.idus = this.idUsuario;
      return this.rolUsuario === 'Empresa';
    },
    mostrarOpciones2() {
      //console.log(this.rolUsuario);
      this.role = this.rolUsuario;
      this.emaile = this.emailUsuario;
      this.idus = this.idUsuario;
      return this.rolUsuario === 'Estudiante';
    },
    mostrarOpciones3() {
      //console.log(this.rolUsuario);
      this.role = this.rolUsuario;
      this.emaile = this.emailUsuario;
      this.idus = this.idUsuario;
      return this.rolUsuario === 'Administrador';
    },
    mostrarOp() {

      return this.$route.name === 'home';
    },

  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return '';
      // Convierte a objeto Date (JS entiende bien "YYYY-MM-DD HH:mm:ss" si es ISO)
      const normalizada = fecha.replace(' ', 'T');
      return new Date(normalizada + '-05:00').toLocaleString('es-EC', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  }
};