import axios from "axios";
import store from "@/store";
export async function enviarsolilogin(method, parametros, url, mensaje) {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: parametros,
    });
    //console.log(response.data.error)
    if (response.data && response.data.token) {
      
      if (response.data.error) {
        return {
          error: response.data.error,
          clave: response.data.clave,
          mensaje: response.data.mensaje,
        };
      }

      else if (response.data.Rol === "Estudiante") {
        //console.log(response.data);
        store.commit("setRol", response.data.Rol);
        store.commit("setemail", response.data.mailPer);
        store.commit("setid", response.data.CIInfPer);

        store.commit("setname", response.data.ApellInfPer);
        store.commit("setToken", response.data.token);
        store.commit("setTokenType", response.data.token_type || "Bearer");
        return {
          token: response.data.token,
          role: response.data.Rol,
          CIInfPer: response.data.CIInfPer,
          ApellInfPer: response.data.ApellInfPer,
          Graduado: response.data.Graduado,
          mailPer: response.data.mailPer,
        };
      } else if (response.data.Rol === "Administrador") {
        store.commit("setRol", response.data.Rol);
        store.commit("setemail", response.data.email);
        store.commit("setid", response.data.id);

        store.commit("setname", response.data.name);
        store.commit("setToken", response.data.token);
        store.commit("setTokenType", response.data.token_type || "Bearer");
        //console.log(response.data);
        return {
          token: response.data.token,
          role: response.data.Rol,
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
      } else if (response.data.Rol === "Empresa") {
        store.commit("setRol", response.data.Rol);
        store.commit("setemail", response.data.email);
        store.commit("setid", response.data.id);

        store.commit("setname", response.data.name);
        store.commit("setToken", response.data.token);
        store.commit("setTokenType", response.data.token_type || "Bearer");
        return {
          token: response.data.token,
          role: response.data.Rol,
          CIInfPer: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
      }
    } else {
      //console.error("Respuesta inesperada:", response);
      return {
          error: response.data.error,
          mensaje: response.data.mensaje,
          Graduado: response.data.Graduado,
        };
    }
    /*if (response.data) {
      //console.log(mensaje + ': ' + response.data.mensaje);
      if (response.data.error) {
        return {
          error: response.data.error,
          clave: response.data.clave,
          mensaje: response.data.mensaje,
        };
      } else if (response.data.rol == "Administrador") {
        store.commit("setRol", response.data.rol);
        store.commit("setemail", response.data.email);
        store.commit("setid", response.data.id);

        store.commit("setname", response.data.last_name);

        // Guardar en localStorage
        /*localStorage.setItem('role', response.data.role);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('idusu', response.data.id);
          localStorage.setItem('name', response.data.name);
          console.log(localStorage);*/
    /*return {
          token: response.data.token,
          email: response.data.email,
          id: response.data.id,
          rol: response.data.rol,
          last_name: response.data.last_name,
        };
      } else if (response.data.Rol == "Estudiante") {
        store.commit("setRol", "Estudiante");
        store.commit("setemail", response.data.mailPer);
        store.commit("setid", response.data.CIInfPer);

        store.commit("setname", response.data.ApellInfPer);
        //console.log(response.data.Rol);
        // Guardar en localStorage
        /* localStorage.setItem('role', response.data.Rol);
            localStorage.setItem('email', response.data.mailPer);
            localStorage.setItem('idusu', response.data.CIInfPer);
            localStorage.setItem('name', response.data.ApellInfPer);
            console.log(localStorage);*/
    /* return {
          mailPer: response.data.mailPer,
          CIInfPer: response.data.CIInfPer,
          Rol: response.data.Rol,
          Graduado: response.data.Graduado,
          ApellInfPer: response.data.ApellInfPer,
        };
      } else if (response.data.rol == "Empresa") {
        store.commit("setRol", response.data.rol);
        store.commit("setemail", response.data.email);
        store.commit("setid", response.data.id);

        store.commit("setname", response.data.last_name);
        //console.log(response.data.Rol);
        // Guardar en localStorage
        /*localStorage.setItem('role', response.data.Rol);
            localStorage.setItem('email', response.data.mailPer);
            localStorage.setItem('idusu', response.data.CIInfPer);
            localStorage.setItem('name', response.data.ApellInfPer);
            console.log(localStorage);*/
    /*return {
          token: response.data.token,
          email: response.data.email,
          id: response.data.id,
          rol: response.data.rol,
          last_name: response.data.last_name,
        };
      }
    } else {
      console.error("Respuesta inesperada:", response);
      return null;
    }*/
  } catch (error) {
    console.error("Error:", error.response.data);
    throw error;
  }
}
