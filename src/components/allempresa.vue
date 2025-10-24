<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todas las Empresas</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son todas las Empresas registradas</small>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <input class="form-control py-3 border-1 text-dark" type="search" placeholder="Buscar por RUC"
                            v-model="searchQuery" @input="filterResults" @keypress="onlyNumbers">
                    </form>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Ruc</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Representante</th>
                            <th scope="col">Creada</th>
                            <th scope="col">Actualizada</th>
                            <th scope="col">Fin de Convenio</th>
                            <th scope="col">Cant. Ofer</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="8">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="emp,  in this.filteredempresas" :key="emp.id">

                            <td v-text="emp.idempresa"></td>
                            <td v-text="emp.ruc"></td>
                            <td v-text="emp.empresacorta"></td>
                            <td v-text="emp.representante"></td>
                            <td>{{ formatFecha(emp.created_at) }}</td>
                            <td>{{ formatFecha(emp.updated_at) }}</td>
                            <td>{{ formatFecha(emp.fechafin) }}
                                <label v-if="new Date(emp.fechafin) <= new Date()" class="text-danger fw-bold">(Convenio
                                    Caducado)</label>
                                <label v-else class="text-success fw-bold">(Convenio Vigente)</label>
                            </td>
                            <td class="text-center">({{ emp.total_ofertas }})</td>
                            <td>
                                <button v-if="emp.estado_empr == 1" class="btn btn-success fw-bold">
                                    Habilitada</button>
                                <button v-if="emp.estado_empr == 0" class="btn btn-danger fw-bold">
                                    Deshabilitada</button>
                            </td>
                            <td>
                                <router-link :to="{ path: '/viewE/' + emp.idempresa }" class="btn btn-info"
                                    title="Ver empresa"
                                    v-if="emp.estado_empr == 1 && new Date(emp.fechafin) >= new Date()">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                               
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.idempresa, emp.empresacorta)"
                                    v-if="emp.estado_empr == 1 && new Date(emp.fechafin) <= new Date() && emp.total_ofertas == 0"
                                    title="Inhabilitar empresa">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button class="btn btn-success" v-on:click="habilitar(emp.idempresa, emp.empresacorta)"
                                    v-if="emp.estado_empr == 0" title="Habilitar empresa">
                                    <i class="fas fa-redo"></i>
                                </button>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
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


        </div>
    </div>
    <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import script2 from '@/assets/scripts/custom.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { confimar,confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
    data() {
        return {
            idus: 0,
            url255: `${__API_BOLSA__}/b_e/vin/empresas`,
            empresasprac: [],
            filteredempresas: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
        }
    },
    mounted() {
        const ruta = useRoute();
        this.idus = ruta.params.id;
        this.getEmpresas();
    },

    methods: {
        async getEmpresas() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url255}?all=true`);
                const allData = response.data.data;

                this.empresasprac = allData;
                this.lastPage = Math.ceil(this.empresasprac.length / 10);
                this.updateFilteredData();
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
            }

        },
        updateFilteredData() {
            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredempresas = this.empresasprac.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getEmpresas()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredempresas = this.empresasprac.filter(inves =>
                    inves.ruc.includes(query)
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
            try {
                confimar(
                    `${__API_BOLSA__}/b_e/vin/empresas/`,
                    id,
                    'Inhabilitar registro',
                    '¿Realmente desea inhabilitar la empresa  ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al inhabilitar la empresa:", error);
                this.cargando = false;
            }
        },
        habilitar(id, nombre) {
            try {
                confimarhabi(
                    `${__API_BOLSA__}/b_e/vin/empresashabi/`,
                    id,
                    'Habilitar registro',
                    '¿Desea habilitar la empresa ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar la oferta:", error);
                this.cargando = false;
            }
        },
        descargarCSV() {
            const headers = ['ID', 'Ruc', 'Empresa', 'Representante', 'Creada', 'Actualizada', 'Fin de Convenio', 'Estado de Convenio', 'Cant. Ofer', 'Estado'];
            const rows = this.empresasprac.map(post => [
                post.idempresa,
                //ruc de la empresa salga correctamente
                post.ruc,
                post.empresacorta,
                post.representante,
                new Date(post.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                new Date(post.updated_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                new Date(post.fechafin).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                (new Date(post.fechafin) <= new Date()) ? 'Convenio Caducado' : 'Convenio Vigente',
                post.total_ofertas,
                (post.estado_empr == 1) ? 'Habilitado' : 'Deshabilitado',
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
            csvContent += headers.join(';') + '\n';
            rows.forEach(row => {
                csvContent += row.join(';') + '\n';
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'Empresas_Registradas.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

    },
    mixins: [script2],
    name: 'allempresa',
}
</script>