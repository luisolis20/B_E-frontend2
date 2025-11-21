<template>
  <div class="container-fluid py-5">
    <div class="container-fluid py-5">
      <h1 class="display-5 mb-4" style="text-align: center;"> Todas los Administrativos </h1>
      <small
        class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
        Administrativos</small>

      &nbsp;&nbsp;&nbsp;&nbsp;
      <div class="row gx-4 gy-3 d-flex justify-content-center">

        <div class="col-lg-6">
          <form class="d-none d-md-flex ms-4">
            <input class="form-control py-3 border-1 text-dark" type="search" placeholder="Buscar" v-model="searchQuery"
              @input="filterResults" @keypress="onlyNumbers">
          </form>
        </div>

      </div>

      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">Cedula</th>
              <th scope="col">Datos Personales</th>
              <th scope="col">Correo</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody id="contenido">
            <tr v-if="this.cargando">
              <td colspan="9">
                <h3>Cargando....</h3>
              </td>
            </tr>
            <tr v-else v-for="post,  in this.filteredpostulaciones" :key="post.id">

              <td>
                <img :src="getFotoUrl(post.CIInfPer)" alt="Foto de perfil" width="100" height="100"
                  style="border-radius: 10px; object-fit: cover;"
                  @error.once="$event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png'" />

              </td>
              <td v-text="post.CIInfPer"></td>
              <td v-text="post.NombInfPer + ' ' + post.ApellInfPer + ' ' + post.ApellMatInfPer"></td>
              <td v-text="post.mailPer"></td>
              <td>
                <label v-if="post.TipoInfPer === 'D'" class="text-warning fw-bold">Docente</label>
                <label v-else-if="post.TipoInfPer === 'A'" class="text-warning fw-bold">Administrativo</label>
                <label v-else-if="post.TipoInfPer === 'T'" class="text-warning fw-bold">Trabajador</label>
              </td>

              <!-- Cédula
                            -->

              <td>

                <router-link :to="{ path: '/perfilpostulados/' + post.id + '/' + post.CIInfPer + '/' + post.estado_id }"
                  class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <button @click="descargarFoto(post)" class="btn btn-success">
                  <i class="fa-solid fa-download"></i>
                </button>

              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div v-if="filteredpostulaciones.length === 0" class="text-center">
        <h3>No hay Postulaciones</h3>
      </div>
      <br><br>
      <div class="d-flex justify-content-center mb-4">
        <button @click="previousPage" :disabled="currentPage === 1 || buscando" class="btn btn-primary text-white">
          Anterior
        </button>&nbsp;
        <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
        <button @click="nextPage" :disabled="currentPage === lastPage || buscando" class="btn btn-primary text-white">
          Siguiente
        </button>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div class="d-flex justify-content-center mb-4">
        <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
        &nbsp;&nbsp;&nbsp;
        <button class="btn btn-primary text-white" @click="descargarDatos">Descargar en formato ZIP</button>
      </div>

    </div>
    <br><br>


  </div>
  <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
//import axios from 'axios';
import API from '@/assets/scripts/services/axios';
import { useRoute } from 'vue-router';
import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      idus: 0,
      url213: "/b_e/vin/informacionpersonalD",
      url214: "/b_e/vin/getdocentes",
      postulacionespr: [],
      filteredpostulaciones: [],
      searchQuery: '',
      cargando: false,
      currentPage: 1,
      lastPage: 1,
      buscando: false,
      grafico: null,
    }
  },
  async mounted() {
    const ruta = useRoute();
    const usuario = await getMe();
    this.idus = ruta.params.id;
    this.getAdministrativosD();

  },
  methods: {
    async getAdministrativosD(page = 1) {
      this.cargando = true;
      try {
        const response = await API.get(`${this.url214}?page=${page}&withPhotos=true`);

        this.postulacionespr = response.data?.data || [];
        const pagination = response.data?.pagination || {};
        this.currentPage = pagination.current_page || 1;
        this.lastPage = pagination.last_page || 1;

        this.filteredpostulaciones = this.postulacionespr;
      } catch (error) {
        console.warn("⚠️ Error al obtener datos:", error?.response?.data || error);
        this.filteredpostulaciones = [];
      } finally {
        this.cargando = false;
      }
    },


    filtrarOfertas() {
      this.currentPage = 1; // Reinicia a la primera página
      this.updateFilteredData();
    },

    updateFilteredData() {
      // Aplicar paginación local
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      this.filteredpostulaciones = this.postulacionespr.slice(startIndex, endIndex);
    },
    actualizar() {
      this.cargando = true;
      this.getAdministrativosD()
    },
    async filterResults() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.filteredpostulaciones = this.postulacionespr;
        return;
      }

      this.filteredpostulaciones = this.postulacionespr.filter(inves =>
        inves.CIInfPer.toLowerCase().includes(query) ||
        (inves.NombInfPer && inves.NombInfPer.toLowerCase().includes(query)) ||
        (inves.ApellInfPer && inves.ApellInfPer.toLowerCase().includes(query)) ||
        (inves.ApellMatInfPer && inves.ApellMatInfPer.toLowerCase().includes(query))
      );
    },
    onlyNumbers(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.getAdministrativosD(this.currentPage + 1);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.getAdministrativosD(this.currentPage - 1);
      }
    },
    getFotoUrl(ci) {
      if (!ci) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png';
      }

      // Asumimos que `API.defaults.baseURL` es la base (ej. /api)
      const baseURL = API.defaults.baseURL || '';

      // Generamos la URL completa que llama al nuevo endpoint de streaming
      return `${baseURL}/b_e/vin/informacionpersonalD/${ci}/foto`; // Ajusta la ruta base si es necesario
    },

    async descargarFoto(post) {
      try {
        if (!post.fotografia || !post.fotografia.data) {
          alert("Este usuario no tiene fotografía disponible.");
          return;
        }

        // Extensión según el mime
        let extension = "jpg";
        if (post.fotografia.mime === "image/png") extension = "png";
        else if (["image/jpeg", "image/jpg"].includes(post.fotografia.mime)) extension = "jpeg";

        // Nombre del archivo
        const nombre = (post.NombInfPer || "sinNombre").replace(/\s+/g, " ");
        const apellido = (post.ApellInfPer || "sinApellido").replace(/\s+/g, " ");
        const apellido2 = (post.ApellMatInfPer || "sinApellido").replace(/\s+/g, " ");
        const cedula = post.CIInfPer || "sinCedula";
        const fileName = `${nombre} ${apellido} ${apellido2}_${cedula}.${extension}`;

        // Convertir Base64 → binario
        const byteCharacters = atob(post.fotografia.data);
        const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));

        // Descargar
        const blob = new Blob([byteArray], { type: post.fotografia.mime });
        saveAs(blob, fileName);

      } catch (error) {
        console.error("Error al descargar la foto:", error);
      }
    },
    async descargarDatos() {
      this.cargando = true;
      try {
        const zip = new JSZip();
        let currentPage = 1;
        let lastPage = 1;

        do {
          // ⚙️ Pedimos los datos con fotos
          const response = await API.get(`${this.url213}?page=${currentPage}&withPhotos=true`);

          const registros = response.data.data || [];
          const pagination = response.data.pagination || {};
          lastPage = pagination.last_page || 1;

          // 🖼️ Procesamos cada registro
          for (const post of registros) {
            if (!post.fotografia || !post.fotografia.data) continue;

            // 📁 Carpeta por tipo
            let folderName = "Otros";
            if (post.TipoInfPer === "D") folderName = "Docente";
            else if (post.TipoInfPer === "A") folderName = "Administrativo";
            else if (post.TipoInfPer === "T") folderName = "Trabajador";

            const folder = zip.folder(folderName);

            // 🧩 Determinar extensión según el tipo MIME
            let extension = "jpg";
            if (post.fotografia.mime === "image/png") extension = "png";
            else if (["image/jpeg", "image/jpg"].includes(post.fotografia.mime)) extension = "jpeg";

            // 📝 Nombre del archivo
            const nombre = (post.NombInfPer || "sinNombre").replace(/\s+/g, " ");
            const apellido = (post.ApellInfPer || "sinApellido").replace(/\s+/g, " ");
            const apellido2 = (post.ApellMatInfPer || "sinApellido").replace(/\s+/g, " ");
            const cedula = post.CIInfPer || "sinCedula";
            const fileName = `${nombre} ${apellido} ${apellido2}_${cedula}.${extension}`;

            // 🔄 Base64 → binario
            const byteCharacters = atob(post.fotografia.data);
            const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));

            // 📦 Agregamos la imagen al ZIP
            folder.file(fileName, byteArray, { binary: true });
          }

          currentPage++;
        } while (currentPage <= lastPage);

        // 💾 Generar y descargar ZIP
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "Personal_UTLVTE.zip");
      } catch (error) {
        console.error("Error al generar ZIP:", error);
        alert("Ocurrió un error al generar el archivo ZIP.");
      } finally {
        this.cargando = false;
      }
    }





  },
  mixins: [script2],
}
</script>