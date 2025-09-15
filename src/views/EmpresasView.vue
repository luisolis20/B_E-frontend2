<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Empresas creadas </h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son tus Empresas Creadas</small>

            <p class="text-dark text-center">En este apartado tendrás todos tus empresas creadas. Podrás buscar tu
                empresa por el Ruc</p>
            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <div class="input-with-icon col-sm-6">
                            <input class="form-control py-3 border-1 text-dark lg" type="search"
                                placeholder="Buscar ruc de la empresa..." v-model="searchQuery" @input="filterResults"
                                @keypress="onlyNumbers">
                            <!-- Botón de ayuda -->
                            <span class="help-icon" @mouseenter="showTooltipbuscar = true"
                                @mouseleave="hideOnLeave('buscar')" @click.stop="toggleTooltip('buscar')"
                                ref="tooltipIconbuscar">❓</span>

                            <!-- Tooltip -->
                            <div v-if="showTooltipbuscar" class="tooltip-box" ref="tooltipBoxbuscar"
                                @mouseenter="hoveringTooltipbuscar = true" @mouseleave="hideOnLeave('buscar')">
                                Escriba el ruc de la empresa que desea buscar.
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>
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
                                <router-link :to="{ path: '/editE/' + emp.idempresa }" class="btn btn-warning"
                                    title="Editar empresa" v-if="emp.estado_empr == 1">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.idempresa, emp.empresacorta)"
                                    v-if="emp.estado_empr == 1 && new Date(emp.fechafin) >= new Date() && emp.total_ofertas == 0"
                                    title="Inhabilitar empresa">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button class="btn btn-success" v-on:click="habilitar(emp.empresacorta)"
                                    v-if="emp.estado_empr == 0" title="Habilitar empresa">
                                    <i class="fas fa-redo"></i>
                                </button>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
        <div v-if="filteredempresas.length === 0" class="text-center">
            <h3>No tienes empresas creadas</h3>
            <div class="mt-5">
                <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> ¿Eres dueño o formas parte de
                    una empresa?</label>
                <router-link :to="{ path: '/empresascreate/' + idus }"
                    class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                    para añadirla</router-link>
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
                <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> ¿Eres dueño o formas parte de
                    una empresa? </label>
                <router-link :to="{ path: '/empresascreate/' + idus }"
                    class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                    para añadirla</router-link>
            </div>
            <br><br>

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
import { confimar, mostraralertas } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
export default {
    data() {
        return {
            idus: 0,
            url2: 'http://backendbolsaempleo.test/api/b_e/vin/empresas',
            empresasprac: [],
            filteredempresas: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
            showTooltipbuscar: false, hoveringTooltipbuscar: false,
        }
    },
    mounted() {
        const ruta = useRoute();
        this.idus = ruta.params.id;
        this.url2 += '/' + this.idus;
        this.getEmpresas();
    },
    methods: {
        async getEmpresas() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url2}?all=true`);
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
        eliminar(id, nombre) {
            try {
                confimar(
                    'http://backendbolsaempleo.test/api/b_e/vin/empresas/',
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
        habilitar(nombre) {
            try {
                mostraralertas('Para habilitar la empresa ' + nombre + ', debes comunicarte con el administrador del sistema', 'warning');
            } catch (error) {
                console.error("Error al habilitar la empresa:", error);
                this.cargando = false;
            }
        },

    },
    mixins: [script2],
}
</script>