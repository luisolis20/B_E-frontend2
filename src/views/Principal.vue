<template>
  <!-- Main Post Section Start-->
  <div class="container-fluid py-3">
    <div class="container-fluid py-3">
      <div class="row g-4">
        <div class="col-lg-7 col-xl-8 mt-0" v-if="publicacionPrincipal">
          <div class="position-relative overflow-hidden rounded" >
            
            <img :src="publicacionPrincipal.full_picture" class="img-fluid rounded img-zoomin w-100" alt="">
            <div class="d-flex justify-content-center px-4 position-absolute flex-wrap" style="bottom: 10px; left: 0;">
              <a href="#" class="text-white me-3 link-hover"><i class="fa fa-thumbs-up"></i> {{ estadisticas?.reacciones }} Reacciones</a>
              <a href="#" class="text-white me-3 link-hover"><i class="fa fa-eye"></i>{{ estadisticas?.vistas }} Vistas </a>
              <a href="#" class="text-white me-3 link-hover"><i class="fa fa-comment-dots"></i> {{ estadisticas?.comentarios }} Comentarios</a>
              <a href="#" class="text-white link-hover"><i class="fa fa-arrow-up"></i> {{ estadisticas?.compartidas }} Compartidas</a>
            </div>
          </div>
          <p class="text-muted mb-0">
            <i class="fa fa-calendar"></i> {{ formatearFechaInteligente(publicacionPrincipal.created_time) }}
          </p>

          <div class="border-bottom py-3">
            <a :href="publicacionPrincipal.permalink_url" target="_blank"
              class="display-4 text-dark mb-0 link-hover"> {{ estadisticas?.titulo || truncateText(publicacionPrincipal.message, 100) }}</a>
          </div>
          <p class="mt-3 mb-4 text-dark">{{ truncateText(publicacionPrincipal.message, 450) }}</p>
          <div class="bg-white p-4 rounded">
            <div class="news-2">
              <h3 class="mb-4">----</h3>
            </div>
            <div class="row g-4 align-items-center" v-if="publicacionsecundaria">
              <div class="col-md-6">
                <div class="rounded overflow-hidden">
                  <img :src="publicacionsecundaria.full_picture" class="img-fluid rounded img-zoomin w-100" alt="">
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex flex-column">
                  <a :href="publicacionsecundaria.permalink_url"
                   target="_blank" class="h3 link-hover">{{ truncateText(publicacionsecundaria.message, 150) }}</a>
                  <p class="text-muted mb-0">
                    <i class="fa fa-calendar"></i> {{ formatearFechaInteligente(publicacionsecundaria.created_time) }}
                  </p>
                </div>
              </div>
               
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-xl-4">
          <div class="bg-white rounded p-4 pt-0">
            <div class="row g-4">
              <div class="col-12" v-if="publicaciontercera">
                <div class="rounded overflow-hidden">
                  <img :src="publicaciontercera.full_picture" class="img-fluid rounded img-zoomin w-100" alt="">
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div class="col-12">
                  <div class="d-flex flex-column">
                    <p class="text-muted mb-0">
                      <i class="fa fa-calendar"></i> {{ formatearFechaInteligente(publicaciontercera.created_time) }}
                    </p>
                    <a :href="publicaciontercera.permalink_url"
                      target="_blank" class="h4 mb-2 link-hover">{{ truncateText(publicaciontercera.message, 150) }}</a>
                    
                  </div>
                </div>
                
              </div>
              
              <div class="col-12" v-for="post in publicaciones" :key="post.id">
                <div class="row g-4 align-items-center">
                  <div class="col-5">
                    <div class="overflow-hidden rounded">
                      <img :src="post.full_picture" class="img-zoomin img-fluid rounded w-100" alt="">
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="features-content d-flex flex-column">
                      <a :href="post.permalink_url"
                        target="_blank" class="h6 link-hover">{{ post.message.slice(0, 80) }}...</a>
                      
                    </div>
                    <p class="text-muted small">
                      <i class="fa fa-calendar"></i> {{ formatearFechaInteligente(post.created_time) }}
                    </p>
                  </div>
                </div>
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid vesitable py-5" id="ofertasrecientes">
    <div class="container-fluid py-5" v-if="mostrarOpciones2">
      <h1 class="mb-0 display-1">Ofertas Más Recientes</h1><br><br>

      <form class="container-fluid row g-1 mt-1">
        <div class="row">
          <div class="col-lg-12">
            <div class="col-sm-6 col-md-6 col-xl-5">
              <label class="text-dark" for="">Filtrar Ofertas Por:</label><br>
              
            </div>
            <div class="col-sm-6 col-md-6 col-xl-5">
              <div class="input-group-icon">
                <select v-model="categoriaSeleccionada" class="form-select form-voyage-select input-box text-dark"
                  id="inputPersonOne">
                  <option value="" selected>
                    Categorías / Área
                  </option>
                  <option value="Administración y RRHH">Administración y RRHH</option>
                  <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Comercial, Negocios y Atención al público">Comercial, Negocios y Atención al público
                  </option>
                  <option value="Educación y Docencia">Educación y Docencia</option>
                  <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y Turismo</option>
                  <option value="Ingenierías">Ingenierías</option>
                  <option value="Logística y Abastecimiento">Logística y Abastecimiento</option>
                  <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing, Publicidad, Comunicación y Diseño
                  </option>
                  <option value="Oficios">Oficios</option>
                  <option value="Producción y Operarios">Producción y Operarios</option>
                  <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina, Farmacia y Bioquímica</option>
                  <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                  <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                  <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                  <option value="Textil">Textil</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>
          </div>

        </div>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="owl-carousel vegetable-carousel justify-content-center">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div v-for="ofe in ofertasFiltradas.slice(0, 10)" :key="ofe.id" class="border border-primary rounded position-relative vesitable-item mx-2 my-3">

            <div>
              <div v-if="new Date(ofe.fechaFinOferta) <= new Date()" class="text-white bg-danger px-3 py-1 rounded position-absolute" style="top: 10px; right: 10px;">Ofertas Caducada</div>
              <div v-else class="text-white bg-primary px-3 py-1 rounded position-absolute" style="top: 10px; right: 10px;">Ofertas Recientes</div>
              
            </div>
            <div class="p-4 rounded-bottom">
              <h4>{{ ofe.titulo }}</h4>
              <h6>Fecha de publicación: {{ new Date(ofe.created_at).toLocaleDateString('es-ES') }}</h6>
              <div v-if="new Date(ofe.fechaFinOferta) > new Date() && tiemposRestantes[ofe.id]">
                <h6 class="text-success">
                  {{ calcularDiasRestantes(ofe.fechaFinOferta) }} - Tiempo restante: 
                   <span :class="{
                    'text-success': !tiemposRestantes[ofe.id].includes('Caducada'),
                    'text-danger': tiemposRestantes[ofe.id].includes('Caducada')
                  }">
                    {{ tiemposRestantes[ofe.id] }}
                  </span>
                </h6>
              </div>
              <div v-else>
                <h6 class="text-danger">La oferta ya caducó</h6>
              </div>
              <h6>Categoría / Área: {{ ofe.categoria }}</h6>
              <p class="text-dark">Descripcion: {{ofe.descripcion}}</p>
              <div class="d-flex justify-content-between flex-lg-wrap">
                <p class="text-dark fs-5 fw-bold mb-0">Nombre de la Empresa: {{ ofe.Empresa }}</p>
                <router-link :to="{path:'/postularse/'+idus+'/'+ofe.id}"
                  class="btn border border-secondary rounded-pill px-3 text-primary"><i
                    class="fa-solid fa-eye me-2 text-primary"></i> Ver Detalle</router-link>
              </div>
            </div>

          </div>
           &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </form>
       <div v-if="ofertas.length === 0" class="text-center">
            <h3>No hay Ofertas publicadas</h3>
        </div>
        <div v-else class="d-flex justify-content-center">
          <router-link :to="{path:'/ofertasall/'+idus}"
            class="btn btn-primary text-white"><i
            class="fa-solid fa-eye me-2 text-white"></i> Ver Todas las ofertas</router-link>
        </div>
      <br><br>
      
    </div>
  </div>

</template>
<style>
@import url('@/assets/styles/styles.css');
</style>

<script>
import customscript from '@/assets/scripts/custom.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('es');

export default {
  data() {
    return {
      idus: 0,
      url255: 'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/consultanopostofert',
      ofertas: [],
      categoriaSeleccionada: '',
      cargando: false,
      currentPage: 1,
      lastPage: 1,
      tiemposRestantes: {},
      publicaciones: [],
      publicacionPrincipal: null,
      publicacionsecundaria: null,
      publicaciontercera: null,
      estadisticas: null,
      pageId: '708979342294904',
      accessToken: 'EAAUbvwr8S4UBOxxdDKzn7ZBlqvSBh6GDYHPCbsGGdUgk8BBiQGXAl84QKYFhUbfah1n0Dvqm8s5jpTM5cDiLccvdYo45r3QTubkb7KcROTumqMAdOD3hkmvchk3zt7a3SWa7WmmAfsv2rtVwHF0OxmfZAnff735ZBZCtxY9ChfzZAmqwKUUCsuWbLn3sFzzkWVk474485',
    }
  },
  async mounted() {
    const ruta = useRoute();
    this.idus = ruta.params.id;
    await this.cargarPublicacionesFacebook();
    this.getOFertas().then(() => {
      this.actualizarTiemposRestantes();
      setInterval(this.actualizarTiemposRestantes, 1000); // Actualiza cada segundo
    });
  },
  computed: {
    // Filtrar ofertas por categoría
    ofertasFiltradas() {
      let ofertasFiltradas = this.ofertas;

      // Filtro por categoría si se ha seleccionado alguna
      if (this.categoriaSeleccionada !== '') {
        ofertasFiltradas = ofertasFiltradas.filter(
          oferta => oferta.categoria === this.categoriaSeleccionada
        );
      }

      // Separar vigentes y caducadas
      const ahora = new Date();

      const vigentes = ofertasFiltradas
        .filter(oferta => new Date(oferta.fechaFinOferta) > ahora)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const caducadas = ofertasFiltradas
        .filter(oferta => new Date(oferta.fechaFinOferta) <= ahora)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Unirlas: primero vigentes, luego caducadas
      return [...vigentes, ...caducadas];
    }
  },
  methods: {
    async getOFertas() {
      this.cargando = true;
      return axios.get(`${this.url255}?all=true`, {
        params: { user_id: this.idus }
      }).then(res => {
        this.ofertas = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }).finally(() => {
        this.cargando = false;
      });
    },
    formatearFechaInteligente(fechaIso) {
      const fecha = dayjs(fechaIso);
      const ahora = dayjs();

      // Si fue hoy o ayer, usar 'hace 3 horas', 'hace 1 día', etc.
      if (ahora.diff(fecha, 'day') < 2) {
        return fecha.fromNow(); // ejemplo: "hace 3 horas"
      }

      // Si fue hace más de 1 día, mostrar fecha completa
      return fecha.format('D [de] MMMM [de] YYYY, HH:mm');
    },

    truncateText(texto, limite) {
      if (!texto) return '';
      return texto.length > limite ? texto.slice(0, limite) + '...' : texto;
    },
    async cargarPublicacionesFacebook() {
      try {
        const fields = 'message,created_time,full_picture,permalink_url';
        const url = `https://graph.facebook.com/${this.pageId}/posts?fields=${fields}&access_token=${this.accessToken}`;

        const response = await axios.get(url);
        const posts = response.data.data.filter(post => post.message && post.full_picture);

        if (posts.length > 0) {
          this.publicacionPrincipal = posts[0];
          this.publicacionsecundaria = posts[1];
          this.publicaciontercera = posts[2];
          this.publicaciones = posts.slice(3, 10); // las siguientes pequeñas
          await this.cargarEstadisticas(posts[0].id);
        }
      } catch (error) {
        console.error('Error al obtener publicaciones de Facebook:', error);
      }
    },
    async cargarEstadisticas(postId) {
      try {
        const url = `https://graph.facebook.com/${postId}?fields=comments.summary(true),shares,reactions.summary(true)&access_token=${this.accessToken}`;
        const res = await axios.get(url);
        this.estadisticas = {
          comentarios: res.data.comments?.summary?.total_count || 0,
          compartidas: res.data.shares?.count || 0,
          reacciones: res.data.reactions?.summary?.total_count || 0,
          vistas: res.data.insights?.data?.[0]?.values?.[0]?.value || 0,
          titulo: res.data.story || ''
        };
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    },

    calcularDiasRestantes(fechaFin) {
      const hoy = new Date();
      const fin = new Date(fechaFin);

      // Limpiar hora para comparar solo fechas
      hoy.setHours(0, 0, 0, 0);
      fin.setHours(0, 0, 0, 0);

      const diferenciaMs = fin - hoy;
      const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

      if (diasRestantes === 0) return 'La oferta Caduca hoy';
      if (diasRestantes < 0) return 'Caducada';
      return `Faltan ${diasRestantes} día(s) para que la oferta caduque`;
    },
    actualizarTiemposRestantes() {
      const ahora = new Date();

      this.ofertas.forEach(ofe => {
        const fin = new Date(ofe.fechaFinOferta);
        const diferenciaMs = fin - ahora;

        if (diferenciaMs <= 0) {
          // Oferta caducada
          this.tiemposRestantes[ofe.id] = 'Caducada';
        } else {
          const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
          const horas = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
          const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

          this.tiemposRestantes[ofe.id] =
            `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        }
      });
    },


  },
  mixins: [customscript],
}
</script>
