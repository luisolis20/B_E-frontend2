<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todos los emprendimientos</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estos son todos los emprendimientos registrados</small>

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
                            <th scope="col">Emprendimiento</th>
                            <th scope="col">Dueño</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Actualizado</th>
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
                        <tr v-else v-for="emp,  in this.filteredemprend" :key="emp.id">

                            <td v-text="emp.id"></td>
                            <td v-text="emp.ruc"></td>
                            <td v-text="emp.nombre_emprendimiento"></td>
                            <td v-if="emp.CIInfPer===this.idus">Yo</td>

                            <td v-else v-text="emp.ApellInfPer + ' ' + emp.ApellMatInfPer + ' ' + emp.NombInfPer"></td>
                            <td>{{ formatFecha(emp.created_at) }}</td>
                            <td>{{ formatFecha(emp.updated_at) }}</td>
                            <td class="text-center">({{ emp.total_ofertas }})</td>
                            <td>
                                <button v-if="emp.estado_empren == 1" class="btn btn-success fw-bold">
                                    Vigente</button>
                                <button v-if="emp.estado_empren == 0" class="btn btn-danger fw-bold"> No Vigente</button>
                                <label v-if="emp.estado_empren == 2"class=" text-info fw-bold"> En revisión </label>
                            </td>
                            <td>
                                <router-link :to="{ path: '/viewEmp/' + emp.id }" class="btn btn-info" title="Ver emprendimiento" v-if="emp.estado_empren == 1">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{ path: '/editEmp/' + emp.id }" class="btn btn-warning" title="Editar emprendimiento" v-if="emp.estado_empren == 1 || emp.estado_empren == 2">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.id, emp.nombre_emprendimiento)" v-if="emp.estado_empren == 1 && emp.total_ofertas == 0">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button class="btn btn-success" v-on:click="habilitar(emp.id, emp.nombre_emprendimiento)" v-if="emp.estado_empren == 2">
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
            url255: 'http://backendbolsaempleo.test/api/b_e/vin/emprendimientos_E',
             emprendimientoemp: [],
            filteredemprend: [],
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
        this.getEmprendimiento();
    },

    methods: {
        async getEmprendimiento() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url255}?all=true`);
                const allData = response.data.data;
                //console.log(allData);
                
                this.emprendimientoemp = allData;
                this.lastPage = Math.ceil(this.emprendimientoemp.length / 10);
                this.updateFilteredData();
            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no posee emprendimientos.");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado:", error.message);
                }
            } finally {
                this.cargando = false;
            }
        },
        updateFilteredData() {
            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredemprend = this.emprendimientoemp.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getEmprendimiento()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredemprend = this.emprendimientoemp.filter(inves =>
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
                    'http://backendbolsaempleo.test/api/b_e/vin/consultaredirempelim/',
                    id,
                    'Inhabilitar registro',
                    '¿Realmente desea inhabilitar el emprenidmiento  ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar el emprendimiento:", error);
                this.cargando = false;
            }
        },
        habilitar(id, nombre) {
            try {
                confimarhabi(
                    'http://backendbolsaempleo.test/api/b_e/vin/consultaredirempelim2/',
                    id,
                    'Hbailitar registro',
                    '¿Desea habilitar el emprendimiento ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar el emprendimiento:", error);
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
}
</script>