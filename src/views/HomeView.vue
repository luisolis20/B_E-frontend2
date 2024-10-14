<template>
  
  <div class="containerlogin">
    <div class="forms-containerlogin">
      <div class="signin-signuplogin">
        <form action="#" class="sign-in-formlogin">
          <div class="image-container">
            <img src="@/assets/img/LOGOGRANDE.png" class="image-small" alt="Logo 2" />
          </div>
          <h2 class="titlelogin">Iniciar Sesión</h2>
          <div class="input-fieldlogin">
            <i class="fas fa-user"></i>
            <input v-model="usuariologin" id="usuariologin" type="text" placeholder="Usuario" />
          </div>
          <div class="input-fieldlogin">
            <i class="fas fa-lock"></i>
            <input v-model="clavelogin" id="clavelogin" type="password" placeholder="Password" />
            <span toggle="#clavelogin" class="fa fa-fw fa-eye field-icon toggle-password"></span>
          </div>
          <button v-on:click="login" class="btnlogin solid">  Login</button>
          <p class="social-text text-dark">Sigue nuestras redes sociales</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>

        </form>
        <form action="#" class="sign-up-formlogin">
          <div class="image-container">
            <img src="@/assets/img/LOGOGRANDE.png" class="image-small" alt="Logo 2" />
          </div>
          <h2 class="titlelogin">Enviar problemas</h2>
          <div class="input-fieldlogin">
            <i class="fas fa-user"></i>
            <input v-model="apellidonombre" type="text" placeholder="Nombres" />
          </div>
          <div class="input-fieldlogin">
            <i class="fas fa-envelope"></i>
            <input v-model="correoss" type="email" placeholder="Email" />
          </div>

          <button v-on:click="enviarComentario" class="btnlogin solid">Enviar</button>
          <p class="social-text text-dark">Sigue nuestras redes sociales</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>

        </form>
        <!-- 
        <div id="ball">
          <div class="ball">
            <div id="face">
              <div class="ball__eyes">
                <div class="eye_wrap"><span class="eye"></span></div>
                <div class="eye_wrap"><span class="eye"></span></div>
              </div>
              <div class="ball__mouth"></div>
            </div>
          </div>
        </div>
        <div class="ball__shadow"></div>
        -->
      </div>
    </div>

    <div class="panels-containerlogin">
      <div class="panel left-panel">
        <div class="contentlogin">
          
          <h3 class="text-white">¿Cómo inicio sesión?</h3>
          <p>
            Si eres estudiante graduado/a, tus credenciales de inicio de sesión son las mismas del sistema SIAD. Si eres
            empresa,
            tus credenciales son las que la Dirección de Vinculación con la Sociedad te proporcionó. <br>
            Si tienes porblemas con tus credenciales de inicio de sesión da clic en el siguiente botón:
          </p>
          <button class="btnlogin2 transparentlol text-white" id="sign-up-btn">
            Reportar problemas
          </button>
        </div>
        <img src="@/assets/img/Privacy policy-rafiki.png" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="contentlogin">
          <h3 class="text-white">Reportar inconvenientes</h3>
          <p>
            Si estás aquí significa que tuviste algún problema con tus credenciales de inicio de sesión. Llena los
            campos necesarios para reportar
            el inconveniente. Así se le proporcionará un usuario y clave <br><br> Si ya solucionaste tu inconveniente prueba a iniciar sesión nuevamente dando clic
            en el siguiente botón.
          </p>
          <button class="btnlogin2 transparentlol text-white" id="sign-in-btn">
            Iniciar sesión
          </button>
        </div>
        <img src="@/assets/img/Mobile login-rafiki.png" class="image" alt="" />
      </div>
    </div>

  </div>
</template>
<style>
@import url('@/assets/styles/style-login.css');
</style>
<script>
import { animaciones } from '@/assets/scripts/script-animacion.js';
import scriptlogin from '@/assets/scripts/scriptfunciones/login.js';
import $ from 'jquery';
import axios from 'axios';
import {mostraralertas2,enviarsoliedit} from '@/assets/scripts/scriptfunciones/funciones';

export default {
  data(){
    return {
      apellidonombre: "",
        correoss: "",
        mensaje: "Reseteo de clave SIAD",
    }
  },
  mounted() {
    animaciones();
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  },
  methods:{
    async enviarComentario() {
      const comentarioData = {
        nombre: this.apellidonombre,
        correo: this.correoss,
        mensaje: this.mensaje
      };

      await axios.post('http://192.168.1.15/b_e/api/vin/enviar-comentario', comentarioData)
        .then(response => {
          mostraralertas2('Comentario enviado con éxito','success');
          this.apellidonombre = '';
          this.correoss = '';
          this.mensaje = '';
          window.setTimeout(function(){
                window.location.href='/'
              },10000);
        })
        
        .catch(error => {
          mostraralertas2('Comentario enviado con éxito','warning' + error.message);
        });
    },
  },
  mixins: [scriptlogin],
};
</script>

