
import { mostraralertas, enviarsoli } from '@/assets/scripts/scriptfunciones/funciones'
import axios from 'axios';
import store from '@/store';
export default {
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      rol: '',
      url: 'http://backendbolsaempleo.test/api/b_e/vin/users',

      // Verificación de correo
      mostrarModal: false,
      codigov: "",
      codigoVerificacion: "",
      intentosRestantes: 3,

      // Control de flujo
      cargando: false,
      correoValidado: false,
    }
  },
  methods: {

    async guardar(event) {
      event.preventDefault();
      if (this.nombre.trim() === '') {
        return mostraralertas('Ingrese nombre de Usuario', 'warning', 'nombre');
      }
      if (this.password.trim() === '') {
        return mostraralertas('Ingrese password', 'warning', 'password');
      }
      if (this.email.trim() === '') {
        return mostraralertas('Ingrese email de Usuario', 'warning', 'email');
      }
      if (this.rol.trim() === '') {
        return mostraralertas('Ingrese rol de Usuario', 'warning', 'rol');
      }

      // 🔹 Validar correo según rol
      else if (this.rol === "Administrador" && !this.email.endsWith("@utelvt.edu.ec")) {
        mostraralertas('El correo de Administrador debe ser institucional (@utelvt.edu.ec)', 'error', 'email');
      } else if (this.rol === "Empresa" && !this.email.endsWith("@gmail.com")) {
        mostraralertas('El correo de Empresa debe ser de Gmail (@gmail.com)', 'error', 'email');
      }
      else {
        // Si es Administrador, verificar correo
        if (this.rol === "Administrador") {
          this.enviarCodigo();
        } else {
          // Si es Empresa, guardar directo
          this.procesarGuardar();
        }
      }

    },
    async enviarCodigo() {
      try {

        const response = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/enviar-correo",
          {
            email: this.email.trim(),
          }
        );
        this.mostrarModal = true; // Mostrar modal para ingresar el código
        this.intentosRestantes = 3; // Reiniciar intentos
        this.codigoVerificacion = response.data.data;

      } catch (error) {
        console.error(error);
        mostraralertas("Ocurrió un error al enviar el correo electrónico.", "error");
      }

    },
    // ✅ Validar el código ingresado
    verificarCodigo() {
      if (this.codigov === this.codigoVerificacion) {
        this.correoValidado = true;
        this.mostrarModal = false;
        this.procesarGuardar();
      } else {
        this.intentosRestantes--;
        if (this.intentosRestantes > 0) {
          mostraralertas(`Código incorrecto. Intentos restantes: ${this.intentosRestantes}`, "warning");
        } else {
          mostraralertas("Ha superado el número máximo de intentos.", "error");
          this.mostrarModal = false;
          this.$router.push('/principal/' + store.state.idusu); // 🔹 Redirige a página principal
        }
      }
    },

    // ✅ Guardar usuario en backend
    procesarGuardar() {
      const parametros = {
        name: this.nombre.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
        role: this.rol.trim(),
        estado: 1,
      };
      enviarsoli("POST", parametros, this.url, "Guardado");
      this.$router.push('/principal/' + store.state.idusu);
    },

    // ✅ Cerrar modal manualmente
    cerrarModal() {
      this.nombre = '';
      this.email = '';
      this.password = '';
      this.rol = '';
      this.mostrarModal = false;
      this.codigov = "";
      this.codigoVerificacion = "";
      this.intentosRestantes = 3;

      // Control de flujo
      this.cargando = false;
      this.correoValidado = false;

    }

  }
};