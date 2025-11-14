<template>
  <div class="container-fluid py-5">
    <div class="container-fluid py-5">
      <h1 class="display-5 mb-4" style="text-align: center;"> Todas los Estudiantes </h1>
      <small
        class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
        Est</small>

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
              <th scope="col">Carrera</th>
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
                <img v-if="post.fotografia" :src="`data:${post.fotografia.mime};base64,${post.fotografia.data}`"
                  id="fotoimg" width="100" height="100" style="border-radius: 10px;" />
                <img v-else style="width: 100px !important;"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
                  class="img-thumbnail">
              </td>
              <td v-text="post.CIInfPer"></td>
              <td v-text="post.NombInfPer + ' ' + post.ApellInfPer + ' ' + post.ApellMatInfPer"></td>
              <td v-text="post.mailPer"></td>
              <td v-text="post.NombCarr"></td>


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
      url213: "/b_e/vin/estudiantesfoto",
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
        // En la vista principal, queremos las fotos
        const response = await API.get(`${this.url213}?page=${page}&withPhotos=true`, {
          timeout: 60000
        });

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

    // 🆕 Nueva función para obtener solo los metadatos paginados (sin fotos)
    async getStudentMetadata(page = 1) {
      const response = await API.get(`${this.url213}?page=${page}&withPhotos=false`, {
        timeout: 60000
      });
      return response.data;
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

        // 1. ITERAR SOBRE TODAS LAS PÁGINAS DEL API
        do {
          // ⏱ Petición para obtener la página actual de estudiantes con fotos (máx 60s)
          // Usamos la misma lógica que getAdministrativosD pero con un loop
          const response = await API.get(`${this.url213}?page=${currentPage}&withPhotos=true`, {
            timeout: 90000 // Aumentamos el timeout a 90s para el proceso de descarga masiva
          });

          const registros = response.data.data;
          const pagination = response.data.pagination || {};
          lastPage = pagination.last_page || 1;
          
          console.log(`Procesando página ${currentPage} de ${lastPage}...`);

          // 2. PROCESAR CADA REGISTRO Y AÑADIR AL ZIP
          for (const post of registros) {
            // Asegúrate de que la foto exista y tenga datos
            if (!post.fotografia || !post.fotografia.data) continue;

            const carreraNombre = post.NombCarr
              ? post.NombCarr.replace(/[\\/:*?"<>|]/g, "_")
              : "Sin_Carrera";
            
            // Creamos o accedemos a la carpeta de la carrera
            const folder = zip.folder(carreraNombre);

            // Determinar extensión
            let extension = "jpg";
            if (post.fotografia.mime === "image/png") extension = "png";
            else if (["image/jpeg", "image/jpg"].includes(post.fotografia.mime)) extension = "jpeg";

            // Generar nombre de archivo
            const nombre = (post.NombInfPer || "sinNombre").replace(/\s+/g, " ");
            const apellido = (post.ApellInfPer || "sinApellido").replace(/\s+/g, " ");
            const apellido2 = (post.ApellMatInfPer || "sinApellido").replace(/\s+/g, " ");
            const cedula = post.CIInfPer || "sinCedula";
            const fileName = `${nombre} ${apellido} ${apellido2}_${cedula}.${extension}`;

            // Convertir Base64 a binario y añadir al ZIP
            const byteCharacters = atob(post.fotografia.data);
            const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
            
            // Añadir al ZIP
            folder.file(fileName, byteArray, { binary: true });
          }

          currentPage++;
        } while (currentPage <= lastPage);
        
        console.log("Generando archivo ZIP...");
        
        // 3. GENERAR Y DESCARGAR EL ZIP
        const content = await zip.generateAsync({ 
          type: "blob", 
          compression: "DEFLATE", // Usar compresión para reducir el tamaño final
          compressionOptions: {
            level: 9 // Nivel máximo de compresión
          }
        });
        saveAs(content, "Estudiantes_por_Carrera.zip");
        alert("Descarga completada con éxito!");

      } catch (error) {
        console.error("Error al generar ZIP:", error);
        alert("Ocurrió un error al descargar los datos. Revise la consola para más detalles.");
      } finally {
        this.cargando = false;
      }
    }





  },
  mixins: [script2],
}
</script>