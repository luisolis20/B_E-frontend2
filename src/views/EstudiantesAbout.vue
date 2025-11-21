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
            <tr v-else v-for="post,  in this.filteredpostulaciones" :key="post.CIInfPer">

              <td>
                <img v-if="post.hasPhoto" :src="getPhotoUrl(post.CIInfPer)" @error="handleImageError"
                  alt="Foto de Estudiante" id="fotoimg" width="100" height="100"
                  style="border-radius: 10px; object-fit: cover;" />
                <img v-else style="width: 100px !important;"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
                  class="img-thumbnail" alt="Sin Foto">
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
        <button class="btn btn-primary text-white" @click="descargarDatosMasiva">Descargar en formato ZIP</button>
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
      baseUrl: "/b_e/vin", // Ajustado para usar la base
      postulacionespr: [],
      filteredpostulaciones: [],
      searchQuery: '',
      cargando: false,
      currentPage: 1,
      lastPage: 1,
      buscando: false, // Mantenido, pero no se usa en la lógica de paginación actual
      grafico: null, // Mantenido, pero no se usa aquí
      photoCache: {}, // 🆕 Cache para almacenar URLs de fotos si es necesario
    }
  },
  async mounted() {
    const ruta = useRoute();
    // const usuario = await getMe(); // Solo si es necesario para autenticación
    this.idus = ruta.params.id; // Asumiendo que `id` es relevante
    this.getAdministrativosD();
  },
  methods: {
    // 🆕 Genera la URL para cargar la foto directamente como imagen binaria
    getPhotoUrl(ci) {
      const baseURL2 = API.defaults.baseURL
      return `${baseURL2}/b_e/vin/fotografia/${ci}`;
    },

    // 🆕 Maneja el error de carga de imagen (ej: si el CI no tiene foto a pesar del filtro)
    handleImageError(event) {
      // Reemplaza la imagen con el ícono de usuario por defecto
      event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png";
      event.target.style.width = '100px';
      event.target.style.height = '100px';
    },

    async getAdministrativosD(page = 1) {
      this.cargando = true;
      try {
        // Petición para obtener METADATOS (sin datos binarios de foto)
        const response = await API.get(`${this.baseUrl}/estudiantesfoto?page=${page}`); // No es necesario el withPhotos=true/false
        // ya que el backend lo filtra y no envía la columna `fotografia`

        this.postulacionespr = response.data?.data || [];
        const pagination = response.data?.pagination || {};
        this.currentPage = pagination.current_page || 1;
        this.lastPage = pagination.last_page || 1;

        // Limpiar el filtro al cargar una nueva página
        this.searchQuery = '';
        this.filteredpostulaciones = this.postulacionespr;
      } catch (error) {
        console.warn("⚠️ Error al obtener datos:", error?.response?.data || error);
        this.filteredpostulaciones = [];
      } finally {
        this.cargando = false;
      }
    },

    // ⛔ Se elimina `updateFilteredData` y `filtrarOfertas` porque la paginación es del backend

    async filterResults() {
      // 📝 La búsqueda local se mantiene, solo se busca entre los datos de la página actual.
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
      // Permite solo números y las teclas de navegación (ej. Backspace) si es una cédula
      const charCode = event.which ? event.which : event.keyCode;
      // Permite números (48-57) y el guion (-) si es necesario, si no, solo números.
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },

    nextPage() {
      if (this.currentPage < this.lastPage && !this.cargando) {
        this.getAdministrativosD(this.currentPage + 1);
      }
    },

    previousPage() {
      if (this.currentPage > 1 && !this.cargando) {
        this.getAdministrativosD(this.currentPage - 1);
      }
    },

    actualizar() {
      // Simplemente recarga la página actual de datos
      this.getAdministrativosD(this.currentPage);
    },

    // 🆕 Descarga de una sola foto
    async descargarFoto(ci, nombre, apellido1, apellido2) {
      try {
        // Llama al endpoint que devuelve la foto binaria
        const response = await API.get(`${this.baseUrl}/fotografia/${ci}`, {
          responseType: 'blob' // Importante para manejar datos binarios
        });

        const contentType = response.headers['content-type'] || 'image/jpeg';

        // Determinar extensión y nombre de archivo
        let extension = "jpg";
        if (contentType.includes("png")) extension = "png";
        else if (contentType.includes("jpeg")) extension = "jpeg";

        const nombreLimpio = (nombre || "sinNombre").replace(/\s+/g, " ").trim();
        const apellido1Limpio = (apellido1 || "sinApellido1").replace(/\s+/g, " ").trim();
        const apellido2Limpio = (apellido2 || "sinApellido2").replace(/\s+/g, " ").trim();
        const fileName = `${nombreLimpio}_${apellido1Limpio}_${apellido2Limpio}_${ci}.${extension}`;

        // Crea un Blob y usa file-saver para la descarga
        const blob = new Blob([response.data], { type: contentType });
        saveAs(blob, fileName);

      } catch (error) {
        console.error("Error al descargar la foto:", error?.response?.data || error);
        alert("Ocurrió un error al descargar la foto. Es posible que el estudiante no tenga una fotografía.");
      }
    },

    // 🆕 Descarga Masiva (Similar al original, pero adaptado a la nueva API)
    async descargarDatosMasiva() {
      this.cargando = true;
      try {
        const zip = new JSZip();

        console.log("⏱️ Iniciando la obtención masiva de metadatos y fotos (una sola petición)... Esto puede tardar varios minutos.");

        // 1. PETICIÓN ÚNICA AL NUEVO ENDPOINT
        const response = await API.get(`${this.baseUrl}/descargarfotosmasiva`, {
          // Aumentar el timeout del cliente para esta petición masiva
          timeout: 600000 // 10 minutos (600,000 ms). Ajusta si es necesario.
        });

        const registros = response.data?.data || [];
        const totalRegistros = registros.length;

        if (totalRegistros === 0) {
          alert("No se encontraron estudiantes con foto para descargar.");
          return;
        }

        console.log(`✅ Datos recibidos. Procesando ${totalRegistros} registros para generar el ZIP.`);

        let contadorProcesado = 0;

        // 2. PROCESAR CADA REGISTRO (CON FOTO EN BASE64 INCLUIDA)
        for (const post of registros) {
          // Decodificar Base64 y preparar la descarga
          try {
            // Convertir la cadena Base64 a un ArrayBuffer o Blob
            const fotoBinariaBase64 = post.fotografia;

            // NOTA: Base64 en JSON no trae el prefijo 'data:image/jpeg;base64,...'
            // JSZip necesita el blob o arraybuffer directo.
            // Usamos atob para decodificar, y luego a ArrayBuffer para JSZip
            const byteCharacters = atob(fotoBinariaBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            // El mime type no es crucial para JSZip, pero se puede estimar 
            // o usar 'image/jpeg' por defecto si el backend no lo provee.

            const carreraNombre = post.NombCarr
              ? post.NombCarr.replace(/[\\/:*?"<>|]/g, "_").trim()
              : "Sin_Carrera";

            const folder = zip.folder(carreraNombre);

            // Determinar extensión (simplemente usamos .jpg si el backend no lo indica)
            let extension = "jpg";
            // Podrías intentar detectar el tipo de imagen leyendo los primeros bytes si fuera crucial,
            // pero por simplicidad, dado que la mayoría de fotos estudiantiles son JPG, lo dejamos así.

            // Generar nombre de archivo
            const nombre = (post.NombInfPer || "sinNombre").replace(/\s+/g, " ").trim();
            const apellido = (post.ApellInfPer || "sinApellido1").replace(/\s+/g, " ").trim();
            const apellido2 = (post.ApellMatInfPer || "sinApellido2").replace(/\s+/g, " ").trim();
            const cedula = post.CIInfPer || "sinCedula";
            const fileName = `${nombre}_${apellido}_${apellido2}_${cedula}.${extension}`;

            // Añadir la foto (ArrayBuffer) al ZIP
            folder.file(fileName, byteArray, { binary: true });

          } catch (processingError) {
            console.warn(`No se pudo procesar la foto para CI: ${post.CIInfPer}. Omitting.`, processingError);
          }

          contadorProcesado++;
          // Mostrar progreso en consola
          const progreso = ((contadorProcesado / totalRegistros) * 100).toFixed(2);
          console.log(`⏳ Procesado: ${contadorProcesado} / ${totalRegistros} (${progreso}%)`);
        }

        console.log("💾 Generando archivo ZIP final... (Puede tardar)");

        // 3. GENERAR Y DESCARGAR EL ZIP
        const content = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 9
          }
        });
        saveAs(content, "Estudiantes_con_Foto_por_Carrera.zip");
        alert("Descarga completada con éxito!");

      } catch (error) {
        console.error("❌ Error al generar ZIP:", error.response?.status, error);
        if (error.response?.status === 429) {
          alert("El servidor reportó 'Too Many Requests' (429). Por favor, inténtelo de nuevo en un momento.");
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          alert("La conexión expiró al intentar descargar todos los datos. El proceso es muy pesado. Inténtelo de nuevo o contacte a soporte.");
        } else {
          alert("Ocurrió un error general al descargar los datos. Revise la consola para más detalles.");
        }
      } finally {
        this.cargando = false;
      }
    }
  },
  mixins: [script2],
}
</script>