<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Personas Postuladas </h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estos son tus Postulados</small>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <input class="form-control py-3 border-1 text-dark" type="search" placeholder="Buscar"
                            v-model="searchQuery" @input="filterResults" @keypress="onlyNumbers">
                    </form>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="mb-3 col-sm-2 col-md-2 col-xl-2">
                <label for="filtroEstado" class="form-label fw-bold text-dark">Filtrar por estado de la
                    postulación:</label>
                <select v-model="filtroEstado" @change="filtrarOfertas" class="form-select text-dark" id="filtroEstado">
                    <option value="todas">Todas</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Rechazada">Rechazada</option>
                    <option value="En proceso">En proceso</option>
                </select>
            </div>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Céd del Postulante</th>
                            <th scope="col">Apellidos del Postulante</th>
                            <th scope="col">Email</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Postulado</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="9">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="post,  in this.filteredpostulaciones" :key="post.id">

                            <td v-text="post.id"></td>
                            <td v-text="post.Empresa"></td>
                            <td v-text="post.Oferta"></td>
                            <td v-text="post.CIInfPer"></td>
                            <td v-text="post.NombInfPer + ' ' + post.ApellInfPer + ' ' + post.ApellMatInfPer"></td>
                            <td v-text="post.mailPer"></td>
                            <td>
                                <label v-if="post.estado === 'En proceso'" class="text-warning fw-bold">En
                                    Proceso</label>
                                <button v-else-if="post.estado === 'Rechazada'"
                                    class="btn btn-danger fw-bold">Rechazada</button>
                                <button v-else-if="post.estado === 'Aceptada'"
                                    class="btn btn-success fw-bold">Aceptada</button>

                            </td>
                            <!-- Cédula
                            <td>
                                <img v-if="post.imagen" style="width: 100px !important;" :src="post.imagen" class="img-thumbnail" >
                                <img v-else style="width: 100px !important;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png" class="img-thumbnail" >
                            </td>-->
                            <td>{{ formatFecha(post.created_at) }}</td>
                            <td>

                                <router-link
                                    :to="{ path: '/perfilpostulados/' + post.id + '/' + post.CIInfPer + '/' + post.estado_id }"
                                    class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filteredpostulaciones.length === 0" class="text-center">
                <h3>No hay Postulaciones</h3>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-flex justify-content-center mb-4">
                <button @click="previousPage" :disabled="currentPage === 1 || buscando"
                    class="btn btn-primary text-white">
                    Anterior
                </button>&nbsp;
                <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
                <button @click="nextPage" :disabled="currentPage === lastPage || buscando"
                    class="btn btn-primary text-white">
                    Siguiente
                </button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
                &nbsp;&nbsp;&nbsp;
                <button class="btn btn-primary text-white" @click="descargarCSV">Descargar en formato CSV</button>
            </div>
            <br><br>
            <div class="alert alert-info d-flex justify-content-around fw-bold text-dark">
                <div>Total de Postulaciones: {{ totalPost }}</div>
                <div>Postulaciones aceptadas: <span class="text-success">{{ postacepta }}</span></div>
                <div>Postulaciones rechazadas: <span class="text-danger">{{ postrechaza }}</span></div>
                <div>Postulaciones en proceso: <span class="text-warning">{{ postproce }}</span></div>
            </div>

        </div>
    </div>
    <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
    data() {
        return {
            idus: 0,
            url213: `${__API_BOLSA__}/b_e/vin/postulacions`,
            postulacionespr: [],
            filteredpostulaciones: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
            totalPost: 0,
            postacepta: 0,
            postrechaza: 0,
            postproce: 0,
            filtroEstado: 'todas',
        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.idus = ruta.params.id;
        this.url213 += '/' + this.idus;
        //console.log(this.url213);
        this.getPostulaciones();
    },
    methods: {
        async getPostulaciones() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url213}?all=true`);

                // Verifica si la respuesta tiene datos válidos
                const allData = response.data?.data || [];

                if (allData.length === 0) {
                    console.warn("No se encontraron postulaciones.");
                }

                this.postulacionespr = allData;
                this.contarOfertas();
                this.lastPage = Math.ceil(this.postulacionespr.length / 10);
                this.updateFilteredData();
            } catch (error) {
                console.error("Error al obtener postulaciones:", error);
                this.postulacionespr = []; // Asegura que no queden datos anteriores
                this.lastPage = 1;
                this.updateFilteredData();
            } finally {
                this.cargando = false;
            }
        },
        descargarCSV() {
            const headers = ['ID', 'Empresa', 'Oferta', 'Cédula', 'Apellidos', 'Email', 'Fecha de Postulación', 'Estado'];
            const rows = this.postulacionespr.map(post => [
                post.id,
                post.Empresa,
                post.Oferta,
                post.CIInfPer,
                post.NombInfPer + ' ' + post.ApellInfPer + ' ' + post.ApellMatInfPer,
                post.mailPer,
                new Date(post.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                post.estado
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
            csvContent += headers.join(';') + '\n';
            rows.forEach(row => {
                csvContent += row.join(';') + '\n';
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'EstudiantesPostulados.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        contarOfertas() {
            this.totalPost = this.postulacionespr.length;
            this.postacepta = this.postulacionespr.filter(ofe => ofe.estado == "Aceptada").length;
            this.postrechaza = this.postulacionespr.filter(ofe => ofe.estado == "Rechazada").length;
            this.postproce = this.postulacionespr.filter(ofe => ofe.estado == "En proceso").length;
        },
         filtrarOfertas() {
            this.currentPage = 1; // Reinicia a la primera página
            this.updateFilteredData();
        },

        updateFilteredData() {
            // Aplicar paginación local
            let filtradas = this.postulacionespr;

            if (this.filtroEstado === 'Aceptada') {
                filtradas = filtradas.filter(ofe => ofe.estado == "Aceptada");
            } else if (this.filtroEstado === 'Rechazada') {
                filtradas = filtradas.filter(ofe => ofe.estado == "Rechazada");
            } else if (this.filtroEstado === 'En proceso') {
                filtradas = filtradas.filter(ofe => ofe.estado == "En proceso");
            }

            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredpostulaciones = filtradas.slice(startIndex, endIndex);

            // Actualizar total de páginas (si quieres que se actualice también el número de páginas)
            this.lastPage = Math.ceil(filtradas.length / 10);
        },
        actualizar() {
            this.cargando = true;
            this.filtroEstado = 'todas';
            this.getPostulaciones()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredpostulaciones = this.postulacionespr.filter(inves =>
                    inves.CIInfPer.includes(query)
                );
            } else {
                this.buscando = false;
                this.actualizar();
            }
        },
        onlyNumbers(event) {
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
            }
        },
        nextPage() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                this.updateFilteredData();
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateFilteredData();
            }
        },
        eliminar(id, nombre) {
            confimar(`${__API_BOLSA__}/b_e/vin/postulacions/`, id, 'Eliminar registro', '¿Realmente desea eliminar a ' + nombre + '?');
            this.cargando = false;
            this.$router.push('/principal/' + this.idus);

        }
    },
    mixins: [script2],
    name: "postuladosempresa",
}
</script>