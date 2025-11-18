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
          <small class="me-3"><i class="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#Comentario"
              class="text-white">Universidad Técnica "Luis Vargas Torres" de Esmeraldas, Nuevos Horizontes, Esmeraldas,
              Ecuador</a></small>
          <small class="me-3"><i class="fas fa-envelope me-2 text-secondary"></i><a href="#Comentario"
              class="text-white">example@utelvt.edu.ec</a></small>
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
              <div class="nav-item dropdown" v-if="mostrarOpciones">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownPostulaciones" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/empresas/') || $route.path.startsWith('/ofertas/') || $route.path.startsWith('/aceptacionview/') || $route.path.startsWith('/rechazoview/') }">
                  Ver
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownPostulaciones">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/empresas/' + idus }"
                      :class="{ 'active': $route.path === '/empresas/' + idus }">
                      Mis Empresas
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/ofertas/' + idus }"
                      :class="{ 'active': $route.path === '/ofertas/' + idus }">
                      Mis Oferas
                    </router-link>
                  </li>
                </ul>
              </div>
              <router-link :to="{ path: '/postuladosall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones"
                :class="{ 'active': $route.path === '/postuladosall/' + idus }">Todos los Postulados</router-link>


              <!-- 🔽 DROPDOWN para Mis Postulaciones -->
              <div class="nav-item dropdown" v-if="mostrarOpciones2">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownPostulaciones" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/mispostulaciones/') || $route.path.startsWith('/mispostulacionesemp/') || $route.path.startsWith('/aceptacionview/') || $route.path.startsWith('/rechazoview/') }">
                  Postulaciones
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownPostulaciones">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/mispostulaciones/' + idus }"
                      :class="{ 'active': $route.path === '/mispostulaciones/' + idus }">
                      Mis Postulaciones a Ofertas de Empresas
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/mispostulacionesemp/' + idus }"
                      :class="{ 'active': $route.path === '/mispostulacionesemp/' + idus }">
                      Mis Postulaciones a OFertas de Emprendimientos
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- 🔽 DROPDOWN para Mis Emprendimientos -->
              <div class="nav-item dropdown" v-if="mostrarOpciones2">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownEmprendimientos" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/misemprendimientos/') || $route.path.startsWith('/emprendimientosofertview/') || $route.path.startsWith('/postuladosallemp/') }">
                  Emprendimientos
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownEmprendimientos">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/misemprendimientos/' + idus }"
                      :class="{ 'active': $route.path === '/misemprendimientos/' + idus }">
                      Ver Mis Emprendimientos
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/emprendimientosofertview/' + idus }"
                      :class="{ 'active': $route.path === '/emprendimientosofertview/' + idus }">
                      Mis Ofertas de Emprendimientos
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/postuladosallemp/' + idus }"
                      :class="{ 'active': $route.path === '/postuladosallemp/' + idus }">
                      Postulados a mis Emprendimientos
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- 🔼 
              <router-link :to="{ path: '/mispostulacionesestado/' + idus }" class="nav-item nav-link"
                v-if="mostrarOpciones2" :class="{ 'active': $route.path === '/mispostulacionesestado/' + idus }">Mis postulaciones</router-link>-->
              <!-- 🔽 DROPDOWN para Mis Emprendimientos -->
              <div class="nav-item dropdown" v-if="mostrarOpciones2">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownOfertas" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/ofertasall/') || $route.path.startsWith('/ofertasallemp/') }">
                  Ofertas de Empleo
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownOfertas">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/ofertasall/' + idus }"
                      :class="{ 'active': $route.path === '/ofertasall/' + idus }">
                      Ofertas de Empleo en Empresas
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/ofertasallemp/' + idus }"
                      :class="{ 'active': $route.path === '/ofertasallemp/' + idus }">
                      Ofertas de Emprendimientos
                    </router-link>
                  </li>

                </ul>
              </div>
              <!-- 🔼 -->

              <!-- 🔽 DROPDOWN para Mis Emprendimientos -->
              <div class="nav-item dropdown" v-if="mostrarOpciones3">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownOfertas" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/empresall/') || $route.path.startsWith('/emprendimientosall/') }">
                  Registros
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownOfertas">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/empresall/' + idus }"
                      :class="{ 'active': $route.path === '/empresall/' + idus }">
                      Empresas
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/emprendimientosall/' + idus }"
                      :class="{ 'active': $route.path === '/emprendimientosall/' + idus }">
                      Emprendimientos
                    </router-link>
                  </li>

                </ul>
              </div>


              <!-- 🔽 DROPDOWN para Mis Ofertas -->
              <div class="nav-item dropdown" v-if="mostrarOpciones3">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownOfertas" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/ofertasall/') || $route.path.startsWith('/ofertasallemp/') }">
                  Ofertas
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownOfertas">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/ofertasall/' + idus }"
                      :class="{ 'active': $route.path === '/ofertasall/' + idus }">
                      Ofertas de Empleo en Empresas
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/ofertasallemp/' + idus }"
                      :class="{ 'active': $route.path === '/ofertasallemp/' + idus }">
                      Ofertras de Emprendimientos
                    </router-link>
                  </li>

                </ul>
              </div>
              <router-link :to="{ path: '/estadopostulacionall/' + idus }" class="nav-item nav-link"
                v-if="mostrarOpciones3" :class="{ 'active': $route.path === '/estadopostulacionall/' + idus }">Estado de
                Postulaciones</router-link>

              <!--<router-link :to="{ path: '/about/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/about/' + idus }">Nuevo</router-link>
              <router-link :to="{ path: '/estabout/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/estabout/' + idus }">NuevoE</router-link>

              <router-link :to="{ path: '/userall/' + idus }" class="nav-item nav-link" v-if="mostrarOpciones3"
                :class="{ 'active': $route.path === '/userall/' + idus }">Usuarios Registrados</router-link>-->

              <!-- 🔽 DROPDOWN para Mis Ofertas -->
              <div class="nav-item dropdown" v-if="mostrarOpciones3">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownOfertas" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :class="{ 'active': $route.path.startsWith('/userall/') || $route.path.startsWith('/encuestas_all/') }">
                  Admin
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0"
                  aria-labelledby="dropdownOfertas">
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/userall/' + idus }"
                      :class="{ 'active': $route.path === '/userall/' + idus }">
                      Usuarios Registrados
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ path: '/encuestas_all/' + idus }"
                      :class="{ 'active': $route.path === '/encuestas_all/' + idus }">
                      Encuesta Seguimiento a Graduados
                    </router-link>
                  </li>

                </ul>
              </div>

              <a href="#" v-on:click="cerrarsesion" class="nav-item nav-link">Cerrar
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
                    <span class="fs-6 fw-light">({{ vistos }})</span>
                    <!-- Actualiza el número dinámicamente -->
                  </a>
                  <div class="dropdown-menu animate slide dropdown-menu-start dropdown-menu-lg-end p-3"
                    style="min-width: 400px;">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Postulados Recientemente</span>
                      <span class="badge bg-primary rounded-pill"> {{ vistos }}</span>
                      <!-- Número dinámico -->
                    </h4>
                    <ul class="list-group mb-3">
                      <!-- Mostrar solo postulaciones no vistas -->
                      <li v-for="post in filtrarNoVistas().slice(0, 3)" :key="post.id"
                        class="list-group-item bg-transparent d-flex justify-content-between lh-sm">
                        <div class="row">
                          <div class="col-lg-6">
                            <h5>
                              <a class="fw-bold"> <!-- Negrita solo para postulaciones no vistas -->
                                {{ post.ApellInfPer }} {{ post.NombInfPer }}
                              </a>
                            </h5>
                            <small>{{ post.Oferta }}</small>

                          </div>
                          <div class="col-lg-6">

                            <div class="text-end">
                              <small class="text-muted">
                                {{ formatearTiempoPersonalizado(post.created_at, 'postulado') }}
                              </small>
                            </div>

                          </div>
                          <div class="col-lg-12 d-flex flex-wrap justify-content-center">
                            <router-link :to="{ path: '/perfilpostulados/' + post.id + '/' + post.CIInfPer }"
                              class="d-block fw-medium text-capitalize mt-2" @click="marcarComoVista(post.id)">Ver
                              detalle
                              completo</router-link>
                          </div>
                        </div>



                        <!-- Tiempo transcurrido -->
                      </li>
                    </ul>
                    <div class="d-flex flex-wrap justify-content-center">
                      <router-link :to="{ path: '/postuladosall/' + idus }" class="w-100 btn btn-primary text-white"
                        type="submit">Ver todos los postulados</router-link>
                    </div>
                  </div>
                </li>

              </div>
              <div v-if="mostrarOpciones2">
                <li class="wishlist-dropdown dropdown pe-3">
                  <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <i class="fas fa-bell"></i>
                    <span class="fs-6 fw-light">({{ vistos2 }})</span>
                  </a>
                  <div class="dropdown-menu animate slide dropdown-menu-start dropdown-menu-lg-end p-3"
                    style="min-width: 400px;">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Notificaciones</span>
                      <span class="badge bg-primary rounded-pill">{{ vistos2 }}</span>
                    </h4>
                    <ul class="list-group mb-3">
                      <li v-for="est in filtrarNoVistas2().slice(0, 3)" :key="est.id"
                        class="list-group-item bg-transparent d-flex justify-content-between lh-sm">
                        <div class="row">
                          <div class="col-lg-6">
                            <h5>
                              <a> {{ est.Empresa }}</a>
                            </h5>


                          </div>


                          <div class="col-lg-6">


                            <small class="text-primary" v-if="est.estado == 'Aceptada'">
                              {{ formatearTiempoPersonalizado(est.created_at, 'aceptada') }}
                            </small>
                            <small v-else class="text-danger" v-if="est.estado == 'Rechazada'">
                              {{ formatearTiempoPersonalizado(est.created_at, 'rechazada') }}
                            </small>

                          </div>
                          <div class="col-lg-12 d-flex flex-wrap justify-content-center">

                            <small>Título de la Oferta: {{ est.Oferta }}</small>

                          </div>
                          <div class="col-lg-12 d-flex flex-wrap justify-content-center"
                            v-if="est.estado == 'Aceptada'">
                            <router-link :to="{ path: '/aceptacionview/' + est.IDEmpresa + '/' + est.IDOferta }"
                              class="d-block fw-medium text-capitalize mt-2" @click="marcarComoVista(est.id)">Ver
                              detalle
                              completo</router-link>
                          </div>
                          <div v-else class="col-lg-12 d-flex flex-wrap justify-content-center">
                            <router-link :to="{ path: '/rechazoview/' + est.IDEmpresa + '/' + est.IDOferta }"
                              class="d-block fw-medium text-capitalize mt-2" @click="marcarComoVista(est.id)">Ver
                              detalle
                              completo</router-link>
                          </div>
                        </div>
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
import API from '@/assets/scripts/services/axios';
import axios from 'axios';
import { useRoute } from 'vue-router';
import store from '@/store';
import dayjs from 'dayjs';
import { getMe } from '@/store/auth';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default {
  data() {
    return {
      idus2: 0,
      url213: `/b_e/vin/postulacions2`,
      url214: `/b_e/vin/estadopostuser`,
      url215: `/b_e/vin/estadopostuser2`,
      postulaciones: [], // Lista de postulaciones
      postulacionesacepta: [], // Lista de postulaciones
      vistos: 0,
      vistos2: 0,
      cargando: false,
      actualizador: null,

    }
  },
  watch: {

    '$route'() {
      
      this.obtener();
    }
  },
  async mounted() {

    
    this.obtener();


  },

  methods: {
    cerrarsesion() {
      console.clear();
      this.$store.commit('logout');
      //localStorage.clear();
      window.location.replace('/b_e');
    },
    
    async obtener() {
      const ruta = useRoute();
      this.idus2 = ruta.params.id;
      this.getPostulaciones();
      this.vistos = JSON.parse(this.$store.state.postulacionesVistas || '[]');
      this.vistos2 = JSON.parse(this.$store.state.postulacionesVistasacept || '[]');

      if (customscript.computed.rolUsuario() == 'Estudiante') {
        const usuario = await getMe();
        this.idus2 = usuario.CIInfPer;

        if (this.idus2) {
          this.url214 = `/b_e/vin/estadopostuser/` + customscript.computed.idUsuario();


          this.getPostulacionesAcept();
        }
      } else {
        this.getPostulaciones();
      }
    },
    async getPostulaciones() {
      this.cargando = true;
      const params = `user_id=${this.idus2}&all=true`;
      try {
        const [postulacionesRes, excluidasRes] = await Promise.all([
          API.get(`${this.url213}?${params}`), 
          API.get(`${this.url215}?all=true`)
        ]);
        console.log(postulacionesRes);
        const todasPostulaciones = postulacionesRes.data?.data || [];
        const excluidas = excluidasRes.data?.data || [];

        // Obtener lista de IDs de postulaciones que se deben excluir
        const idsExcluidos = excluidas.map(post => post.IDPostulacion);

        let filtradas = [];

        // Si hay postulaciones excluidas, filtramos
        if (idsExcluidos.length > 0) {
          filtradas = todasPostulaciones.filter(post => !idsExcluidos.includes(post.id));
        } else {
          filtradas = todasPostulaciones;
        }

        // Ordenar por fecha
        this.postulaciones = filtradas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        this.vistos = this.postulaciones.length;

      } catch (error) {
        console.warn("Error al obtener postulaciones:", error);
        this.postulaciones = [];
        this.vistos = 0;
      } finally {
        this.cargando = false;
      }
    },
    getPostulacionesAcept() {
      this.cargando = true;
      API.get(`${this.url214}?all=true`).then(
        res => {
          // Verificamos que res.data y res.data.data existan antes de intentar ordenar
          if (res.data && Array.isArray(res.data.data)) {
            this.postulacionesacepta = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          } else {
            console.warn('Datos inesperados en la respuesta:', res.data);
          }
          this.cargando = false;
        }
      ).catch(error => {
        console.warn('Error al obtener postulaciones aceptadas:', error);
        this.cargando = false;
      });
    },
    // Marcar como vista y guardar en Store y LocalStorage
    marcarComoVista(postId) {
      /*if (!this.vistos.includes(postId)) {
        this.vistos.push(postId);
        this.$store.commit('setTokenPostulacionesVistas', this.vistos);
      }*/
    },
    marcarComoVista2(postId) {
      /*if (!this.vistos2.includes(postId)) {
        this.vistos2.push(postId);
        this.$store.commit('setTokenPostulacionesNoVistas', this.vistos2);
      }*/
    },

    // Método para calcular el tiempo transcurrido
    formatearTiempo(fecha) {
      return dayjs(fecha).fromNow(); // "Hace x minutos", "Hace x horas", etc.
    },
    formatearTiempoPersonalizado(fecha, tipo) {
      const ahora = dayjs().tz("America/Guayaquil");
      const fechaPost = dayjs(fecha).tz("America/Guayaquil");

      const diffMin = ahora.diff(fechaPost, 'minute');
      const diffHoras = ahora.diff(fechaPost, 'hour');
      const diffDias = ahora.diff(fechaPost, 'day');

      if (diffMin < 60) {
        if (tipo === 'postulado') return `Postulado hace ${diffMin} minuto(s)`;
        if (tipo === 'aceptada') return `Postulación aceptada hace ${diffMin} minuto(s)`;
        if (tipo === 'rechazada') return `Postulación rechazada hace ${diffMin} minuto(s)`;
      } else if (diffHoras < 24) {
        if (tipo === 'postulado') return `Postulado hace ${diffHoras} hora(s)`;
        if (tipo === 'aceptada') return `Postulación aceptada hace ${diffHoras} hora(s)`;
        if (tipo === 'rechazada') return `Postulación rechazada hace ${diffHoras} hora(s)`;
      } else if (diffDias < 7) {
        if (tipo === 'postulado') return `Postulado hace ${diffDias} día(s)`;
        if (tipo === 'aceptada') return `Postulación aceptada hace ${diffDias} día(s)`;
        if (tipo === 'rechazada') return `Postulación rechazada hace ${diffDias} día(s)`;
      } else {
        return `El ${fechaPost.format('D [de] MMMM [de] YYYY a las] HH:mm')}`;
      }
    },

    formatoFechaHora(fecha) {
      return dayjs(fecha).tz("America/Guayaquil").format('D [de] MMMM [de] YYYY, HH:mm');
    },
    async Obtnenernotifi(cedula) {

    },
    // Filtrar postulaciones no vistas
    filtrarNoVistas() {
      return this.postulaciones;
    },
    filtrarNoVistas2() {


      const noVistas = this.postulacionesacepta.filter(post => post.estado == 'Aceptada' || post.estado == 'Rechazada');
      this.vistos2 = noVistas.length;
      return noVistas;
    }
  },
  mixins: [customscript],
}
</script>
