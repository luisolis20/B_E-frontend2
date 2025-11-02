import { mostraralertas } from "@/assets/scripts/scriptfunciones/funciones";
import { enviarsolilogin } from "@/assets/scripts/scriptfunciones/loginfuncion";
import store from "@/store";
import { getMe } from "@/store/auth";
export default {
  data() {
    return {
      usuariologin: "",
      clavelogin: "",
      url_login: `${__API_BOLSA__}/b_e/login2`,
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        var parametros = {
          CIInfPer: this.usuariologin.trim(),
          codigo_dactilar: this.clavelogin.trim(),
        };

        const response = await enviarsolilogin('POST',parametros,this.url_login,'Logueado');
        if (response.error) {
          mostraralertas(response.mensaje, "warning");
        }

        else if (response) {
          const usuario = await getMe();
          const role = response.role;
          const tok = response.token;
          if (role === "Administrador") {
            mostraralertas(
              "LE DAMOS LA BIENVENIDA ADMINISTRADOR " + (response.name || ""),
              "success"
            );
            this.$router.push("/principal/" + response.id);
          } else if (role === "Estudiante") {
            if (response.Graduado == 'Si') {
              mostraralertas(
                "LE DAMOS LA BIENVENIDA ESTUDIANTE " + response.ApellInfPer,
                "success"
              );
              this.$router.push("/principal/" + response.CIInfPer);
            } else {
              mostraralertas("ESTUDIANTE NO TITULADO ", "warning");
              localStorage.clear();

            }
            //this.$router.push("/principal/" + response.CIInfPer);
          } else if (role === "Empresa") {
            mostraralertas(
              "LE DAMOS LA BIENVENIDA EMPRESA " + (response.name || ""),
              "success"
            );
            this.$router.push("/principal/" + response.id);
          }
        } else {
          mostraralertas("Usuario y/o Contraseñas Incorrectos", "warning");
          console.error("Respuesta inesperada:", response);
        }

        
      } catch (error) {
        mostraralertas(error.response.data.mensaje, 'warning');
        //console.clear();
      }
    },
  },
};
