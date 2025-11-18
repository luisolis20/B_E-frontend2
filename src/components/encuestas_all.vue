<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Encuestas Seguimiento a Graduados </h1>
            <p class="text-dark text-center">En este apartado tendrás todas las encuestas que se han realizado en el
                seguimiento a graduados</p>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estos son tus Formularios Creados</small>


            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <div class="input-with-icon col-sm-6">
                            <input class="form-control py-3 border-1 text-dark lg" type="search"
                                placeholder="Buscar formulario..." v-model="searchQuery"
                                @input="filterResults">
                            <!-- Botón de ayuda -->
                            <span class="help-icon" @mouseenter="showTooltipbuscar = true"
                                @mouseleave="hideOnLeave('buscar')" @click.stop="toggleTooltip('buscar')"
                                ref="tooltipIconbuscar">❓</span>

                            <!-- Tooltip -->
                            <div v-if="showTooltipbuscar" class="tooltip-box" ref="tooltipBoxbuscar"
                                @mouseenter="hoveringTooltipbuscar = true" @mouseleave="hideOnLeave('buscar')">
                                Escriba el nombre del formulario  que desea buscar.
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre Formulario</th>
                            <th scope="col">Usuario Creador</th>
                            <th scope="col">Fecha Creada</th>
                            <th scope="col">Cant. Preguntas</th>
                            <th scope="col">Cant. Respuestas</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="9">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="emp,  in this.filteredformulario" :key="emp.ID">

                            <td v-text="emp.ID"></td>
                            <td v-text="emp.NOMBRE"></td>
                            <td v-text="emp.UP"></td>
                            <td v-text="emp.FINS"></td>
                            <td class="text-center">({{ emp.total_preguntas }})</td>
                            <td class="text-center">({{ emp.total_encuestas }})</td>
                            <td>
                                <button v-if="emp.ACTIVO == 1" class="btn btn-success fw-bold">
                                    Habilitado</button>
                                <button v-if="emp.ACTIVO == 0" class="btn btn-danger fw-bold"> 
                                    Deshabilitado</button>
                            </td>
                            <td>
                                <router-link :to="{ path: '/created_questions/' + emp.ID }" class="btn btn-info" v-if="emp.ACTIVO == 1"
                                    title="Crear Preguntas">
                                    <i class="fas fa-pen-alt"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{ path: '/edit_forms/' + emp.ID}" class="btn btn-warning"
                                    title="Editar formulario">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{ path: '/detalle_encuestas_from/' + emp.ID}" class="btn btn-success"
                                    title="Editar formulario">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;





                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filteredformulario.length === 0" class="text-center">
                <h3>No hay formularios creados</h3>
                <div class="mt-5">
                    <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> Para Crear más formularios</label>
                    <router-link :to="{ path: '/created_froms/' + idus }"
                        class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                        </router-link>
                </div>
            </div>
            <div v-else>
                <br><br><br>

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
                </div>
                <div class="mt-5">
                    <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> Para Crear más formularios</label>
                    <router-link :to="{ path: '/created_froms/' + idus }"
                        class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                        </router-link>
                </div>
                <br><br>
                
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
import store from '@/store';
import { useRoute } from 'vue-router';
import API from '@/assets/scripts/services/axios';
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
export default {
    data() {
        return {
            idus: 0,
            url2: `/b_e/vin/seguiformulario`,
            urlhabilitar: `/b_e/vin/seguiformulariohabi/`,
            urlinhabilitar: `/b_e/vin/seguiformularioelim/`,
            formularioemp: [],
            filteredformulario: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            interval: null,
            buscando: false,
            showTooltipbuscar: false, hoveringTooltipbuscar: false,
        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.idus = ruta.params.id;
        this.getFormulario();
       /*this.interval = setInterval(() => {
            this.getFormulario();
        }, 10000);*/
    },
    /*beforeUnmount() {
        clearInterval(this.interval);
    },*/
    methods: {
        async getFormulario() {
            this.cargando = true;
            try {
                const response = await API.get(`${this.url2}?all=true`);
                const allData = response.data.data;
                //console.log(allData);

                this.formularioemp = allData;
                this.lastPage = Math.ceil(this.formularioemp.length / 10);
                this.updateFilteredData();
            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    //console.warn("No hay formularios creados");
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
            this.filteredformulario = this.formularioemp.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getFormulario()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredformulario = this.formularioemp.filter(inves =>
                    inves.NOMBRE.includes(query)
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
                    this.urlinhabilitar,
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
                    this.urlhabilitar,
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


        toggleTooltip(field) {
            if (field === "buscar") this.showTooltipbuscar = !this.showTooltipbuscar;
        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "buscar" && !this.hoveringTooltipbuscar) this.showTooltipbuscar = false;
            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ["tooltipIconbuscar", "tooltipBoxbuscar", "showTooltipbuscar"]
            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
        },
    },
    mixins: [script2],
    name:'encuestas_all',
}
</script>