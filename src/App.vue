<template>

  <!-- Navbar start -->
  <div class="container-fluid sticky-top px-0">
    <div class="container-fluid topbar d-none d-lg-block" v-if="showNavbar">
      <div class="d-flex justify-content-between">
        <div class="top-info ps-2">
          <small class="me-3"><i class="fas fa-building me-2 text-white"></i> <a href="#" class="text-white">{{ role
          }}</a></small>
          <small class="me-3"><i class="fas fa-envelope me-2 text-white"></i><a href="#" class="text-white">{{ emaile
          }}</a></small>
          <small class="me-3"><i class="fas fa-user me-2 text-white"></i><a href="#" class="text-white">{{ idus
          }}</a></small>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="container-fluid px-0">
        <nav class="navbar navbar-light navbar-expand-xl" id="navBar">
          <router-link :to="{ path: '/principal/' + idus }" v-if="showNavbar" class="navbar-brand">
            <h4 class="text-primary display-6 fw-bold mb-0">Bolsa de Empleo<strong
                class="text-secondary">-</strong>UTLVTE</h4>
          </router-link>
          <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse">
            <span class="fa fa-bars text-primary"></span>
          </button>
          <div class="collapse navbar-collapse py-3" id="navbarCollapse" v-if="showNavbar">
            <div class="navbar-nav mx-auto border-top">
              <router-link to="/" class="nav-item nav-link" :class="{ 'active': $route.path === '/' }"
                v-if="mostrarOp">Home</router-link>
              <router-link :to="{ path: '/principal/' + idus }" class="nav-item nav-link"
                :class="{ 'active': $route.path === '/principal/' + idus }">Inicio</router-link>
              <router-link :to="{ path: '/empresas/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones"
                :class="{ 'active': $route.path === '/empresas/' + idus }">Mis Empresas</router-link>
              <router-link :to="{ path: '/ofertas/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones"
                :class="{ 'active': $route.path === '/ofertas/' + idus }">Mis Oferas</router-link>
              <router-link :to="{ path: '/postuladosall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones"
                :class="{ 'active': $route.path === '/postuladosall/' + idus }">Todos los Postulados</router-link>
              <router-link :to="{ path: '/mispostulaciones/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones2"
                :class="{ 'active': $route.path === '/mispostulaciones/' + idus }">Mis Postulaciones</router-link>
              <router-link :to="{ path: '/ofertasall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones2"
                :class="{ 'active': $route.path === '/ofertasall/' + idus }">Todas las Ofertas de Empleo</router-link>
              <router-link :to="{ path: '/ofertasall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/ofertasall/' + idus }">Ofertas de Empleo</router-link>
              <router-link :to="{ path: '/userall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/userall/' + idus }">Usuarios Registrados</router-link>
              <router-link :to="{ path: '/empresall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/empresall/' + idus }">Empresas Registradas</router-link>
              <a href="#" v-on:click="cerrarsesion" class="nav-item nav-link"
                :class="{ 'active': $route.path === '/' }">Cerrar
                Sesión</a>
            </div>
            <div class="user-items d-flex">

              <router-link :to="{ path: '/perfil/' + idus }" href="#" class="my-auto">
                <i class="fas fa-user fa-2x"></i>
              </router-link>
              <div v-if="mostrarOpciones">
                <li class="wishlist-dropdown dropdown pe-3">
                  <a href="" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <i class="fas fa-bell"></i>
                    <span class="fs-6 fw-light">({{ filtrarNoVistas().length }})</span>
                    <!-- Actualiza el número dinámicamente -->
                  </a>
                  <div class="dropdown-menu animate slide dropdown-menu-start dropdown-menu-lg-end p-3">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Postulados Recientemente</span>
                      <span class="badge bg-primary rounded-pill">{{ filtrarNoVistas().length }}</span>
                      <!-- Número dinámico -->
                    </h4>
                    <ul class="list-group mb-3">
                      <!-- Mostrar solo postulaciones no vistas -->
                      <li v-for="post in filtrarNoVistas().slice(0, 3)" :key="post.id"
                        class="list-group-item bg-transparent d-flex justify-content-between lh-sm">
                        <div>
                          <h5>
                            <a class="fw-bold"> <!-- Negrita solo para postulaciones no vistas -->
                              {{ post.ApellInfPer }} {{ post.NombInfPer }}
                            </a>
                          </h5>
                          <small>{{ post.Oferta }}</small>
                          <router-link :to="{ path: '/perfilpostulados/' + post.id + '/' + post.CIInfPer }"
                            class="d-block fw-medium text-capitalize mt-2" @click="marcarComoVista(post.id)">Ver detalle
                            completo</router-link>
                        </div>
                        <span class="text-primary">{{ formatearTiempo(post.created_at) }}</span>
                        <!-- Tiempo transcurrido -->
                      </li>
                    </ul>
                    <div class="d-flex flex-wrap justify-content-center">
                      <a href="" class="w-100 btn btn-primary text-white" type="submit">Ver todos los postulados</a>
                    </div>
                  </div>
                </li>

              </div>
              <div v-if="mostrarOpciones2">
                <li class="wishlist-dropdown dropdown pe-3">
                  <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <i class="fas fa-bell"></i>
                    <span class="fs-6 fw-light">({{ filtrarNoVistas2().length }})</span>
                  </a>
                  <div class="dropdown-menu animate slide dropdown-menu-start dropdown-menu-lg-end p-3">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Postulaciones Aceptadas</span>
                      <span class="badge bg-primary rounded-pill">{{ filtrarNoVistas2().length }}</span>
                    </h4>
                    <ul class="list-group mb-3">
                      <li v-for="est in filtrarNoVistas2().slice(0, 3)" :key="est.id"
                        class="list-group-item bg-transparent d-flex justify-content-between lh-sm">
                        <div>
                          <h5>
                            <a> {{ est.Empresa }}</a>
                          </h5>
                          <small>{{ est.Oferta }}</small>
                          <div v-if="est.estado == 'Aceptada'">
                            <router-link :to="{ path: '/aceptacionview/' + est.IDEmpresa + '/' + est.IDOferta }"
                              class="d-block fw-medium text-capitalize mt-2" @click="marcarComoVista(est.id)">Ver
                              detalle
                              completo</router-link>
                          </div>
                        </div>
                        <span class="text-primary">{{ est.estado }}</span>
                      </li>


                    </ul>
                    <div class="d-flex flex-wrap justify-content-center">
                      <router-link :to="{ path: '/mispostulacionesestado/' + idus }"
                        class="w-100 btn btn-primary text-white" type="submit">Ver estados de mis
                        postulaciones</router-link>
                    </div>
                  </div>
                </li>
              </div>
            </div>

          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- Navbar End -->

  <div>
    <router-view />
  </div>
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import customscript from '@/assets/scripts/custom.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import store from '@/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // Para el tiempo relativo

dayjs.extend(relativeTime);
export default {
  data() {
    return {
      idus2: 0,
      url213: 'http://backendbolsaempleo.test/api/b_e/vin/postulacions',
      url214: 'http://backendbolsaempleo.test/api/b_e/vin/estadopostuser',
      postulaciones: [], // Lista de postulaciones
      postulacionesacepta: [], // Lista de postulaciones
      vistos: JSON.parse(localStorage.getItem('postulacionesVistas')) || [], // Recupera los vistos desde localStorage
      vistos2: JSON.parse(localStorage.getItem('postulacionesVistasacept')) || [], // Recupera los vistos desde localStorage
      cargando: false,
    }
  },
  watch: {

    '$route'() {
      if (customscript.computed.rolUsuario() == 'Estudiante') {

        this.idus2 = this.$route.params.id;

        if (this.idus2) {
          this.url214 = 'http://backendbolsaempleo.test/api/b_e/vin/estadopostuser/' + this.idus2;

          this.getPostulacionesAcept();
        }
      }
    }
  },
  mounted() {
    this.getPostulaciones();
    if (customscript.computed.rolUsuario() == 'Estudiante') {
      this.idus2 = this.$route.params.id;

      if (this.idus2) {
        this.url214 = 'http://backendbolsaempleo.test/api/b_e/vin/estadopostuser/' + this.idus2;


        this.getPostulacionesAcept();
      }
    } else {
      this.getPostulaciones();
    }


  },
  methods: {
    cerrarsesion() {
      console.clear();
      localStorage.clear();
      window.location.replace('/');
    },
    getPostulaciones() {
      this.cargando = true;
      axios.get(this.url213).then(
        res => {
          this.postulaciones = res.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          this.cargando = false;
        }
      );
    },
    getPostulacionesAcept() {
      this.cargando = true;
      axios.get(this.url214).then(
        res => {
          // Verificamos que res.data y res.data.data existan antes de intentar ordenar
          if (res.data && Array.isArray(res.data.data)) {
            this.postulacionesacepta = res.data.data
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          } else {
            console.error('Datos inesperados en la respuesta:', res.data);
          }
          this.cargando = false;
        }
      ).catch(error => {
        console.error('Error al obtener postulaciones aceptadas:', error);
        this.cargando = false;
      });
    },
    // Marcar como vista y guardar en localStorage
    marcarComoVista(postId) {
      if (!this.vistos.includes(postId)) {
        this.vistos.push(postId); // Añadir el id de la postulación a la lista de vistos
        localStorage.setItem('postulacionesVistas', JSON.stringify(this.vistos)); // Guardar en localStorage
      }
    },
    // Marcar como vista y guardar en localStorage
    marcarComoVista2(postId) {
      if (!this.vistos2.includes(postId)) {
        this.vistos2.push(postId); // Añadir el id de la postulación a la lista de vistos
        localStorage.setItem('postulacionesVistas', JSON.stringify(this.vistos2)); // Guardar en localStorage
      }
    },
    // Método para calcular el tiempo transcurrido
    formatearTiempo(fecha) {
      return dayjs(fecha).fromNow(); // "Hace x minutos", "Hace x horas", etc.
    },
    // Filtrar postulaciones no vistas
    filtrarNoVistas() {
      return this.postulaciones.filter(post => !this.vistos.includes(post.id));
    },
    filtrarNoVistas2() {
      return this.postulacionesacepta.filter(post => !this.vistos2.includes(post.id));
    }
  },
  mixins: [customscript],
}
</script>
