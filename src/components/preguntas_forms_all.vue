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
                                placeholder="Buscar usuario..." v-model="searchQuery" @input="filterResults"
                                @keypress="onlyNumbers">
                            <!-- Botón de ayuda -->
                            <span class="help-icon" @mouseenter="showTooltipbuscar = true"
                                @mouseleave="hideOnLeave('buscar')" @click.stop="toggleTooltip('buscar')"
                                ref="tooltipIconbuscar">❓</span>

                            <!-- Tooltip -->
                            <div v-if="showTooltipbuscar" class="tooltip-box" ref="tooltipBoxbuscar"
                                @mouseenter="hoveringTooltipbuscar = true" @mouseleave="hideOnLeave('buscar')">
                                Escriba el nombre del usuario creador del formulario que desea buscar.
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <br><br>
            <div class="text-center">
                <h3 class="text-dark">Preguntas Creadas</h3>

            </div>
            <br><br>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Pregunta</th>
                            <th scope="col">Nombre Formulario</th>
                            <th scope="col">Usuario Creador</th>
                            <th scope="col">Fecha Creada</th>
                            <th scope="col">Cant. Opciones</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="9">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="emp,  in this.filteredpreguntas" :key="emp.ID">

                            <td v-text="emp.ID"></td>
                            <td v-text="emp.PREGUNTA"></td>
                            <td v-text="emp.NOMBRE"></td>
                            <td v-text="emp.UP"></td>
                            <td v-text="emp.FINS"></td>
                            <td class="text-center">({{ emp.total_tipos_respuesta }})</td>

                            <td>
                                <button class="btn btn-info" title="Añadir Opciones de Respuesta"
                                    @click="Addoptions(emp)">
                                    <i class="fas fa-pen-alt"></i>
                                </button>
                                &nbsp;
                                <button class="btn btn-warning" title="Editar pregunta" @click="editarPregunta(emp)">
                                    <i class="fa-solid fa-edit"></i>
                                </button>
                                &nbsp;





                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filteredpreguntas.length === 0" class="text-center">
                <h3>No hay preguntas creadas</h3>

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
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
export default {
    data() {
        return {
            idus: 0,
            url2: 'http://backendbolsaempleo.test/api/b_e/vin/seguiformulario',
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
                const response = await axios.get(`${this.url2}?all=true`);
                const allData = response.data.data;
                //console.log(allData);

                this.formularioemp = allData;
                this.lastPage = Math.ceil(this.formularioemp.length / 10);
                this.updateFilteredData();
            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("No hay formularios creados");
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
    name: 'encuestas_all',
}
</script>