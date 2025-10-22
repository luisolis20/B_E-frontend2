<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Mis Emprendimientos </h1>
            <p class="text-dark text-center">En este apartado tendrás todos tus emprendimiento creados. Para que tus
                emprendimientos están vigentes deben ser aprobados por
                la Dirección de Vincualción con la Sociedad de la UTLVTE</p>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estos son tus Emprendimientos Creados</small>


            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <div class="input-with-icon col-sm-6">
                            <input class="form-control py-3 border-1 text-dark lg" type="search"
                                placeholder="Buscar ruc de emprendimiento..." v-model="searchQuery"
                                @input="filterResults" @keypress="onlyNumbers">
                            <!-- Botón de ayuda -->
                            <span class="help-icon" @mouseenter="showTooltipbuscar = true"
                                @mouseleave="hideOnLeave('buscar')" @click.stop="toggleTooltip('buscar')"
                                ref="tooltipIconbuscar">❓</span>

                            <!-- Tooltip -->
                            <div v-if="showTooltipbuscar" class="tooltip-box" ref="tooltipBoxbuscar"
                                @mouseenter="hoveringTooltipbuscar = true" @mouseleave="hideOnLeave('buscar')">
                                Escriba el ruc del emprendimiento que desea buscar.
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
                            <td colspan="9">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="emp,  in this.filteredemprend" :key="emp.id">

                            <td v-text="emp.id"></td>
                            <td v-text="emp.ruc"></td>
                            <td v-text="emp.nombre_emprendimiento"></td>
                            <td v-if="emp.CIInfPer === this.idus">Yo</td>

                            <td v-else v-text="emp.ApellInfPer + ' ' + emp.ApellMatInfPer + ' ' + emp.NombInfPer"></td>
                            <td>{{ formatFecha(emp.created_at) }}</td>
                            <td>{{ formatFecha(emp.updated_at) }}</td>
                            <td class="text-center">({{ emp.total_ofertas }})</td>
                            <td>
                                <button v-if="emp.estado_empren == 1" class="btn btn-success fw-bold">
                                    Aprobado</button>
                                <button v-if="emp.estado_empren == 0" class="btn btn-danger fw-bold"> No
                                    Aprobado</button>
                                <label v-if="emp.estado_empren == 2" class=" text-info fw-bold"> En revisión </label>
                            </td>
                            <td>
                                <router-link :to="{ path: '/viewEmp/' + emp.id }" class="btn btn-info"
                                    title="Ver emprendimiento"
                                    v-if="emp.estado_empren == 1 || emp.estado_empren == 0 || emp.estado_empren == 2">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{ path: '/editEmp/' + emp.id }" class="btn btn-warning"
                                    title="Editar emprendimiento"
                                    v-if="emp.estado_empren == 1 || emp.estado_empren == 0">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;





                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filteredemprend.length === 0" class="text-center">
                <h3>No hay emprendimientos creados</h3>
                <div class="mt-5">
                    <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> ¿Tienes un
                        Emprendimiento?</label>
                    <router-link :to="{ path: '/emprendimientocreate/' + idus }"
                        class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                        Para Añadirlo</router-link>
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
                    <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark"> ¿Tienes un más
                        Emprendimientos?</label>
                    <router-link :to="{ path: '/emprendimientocreate/' + idus }"
                        class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí
                        Para Añadirlos</router-link>
                </div>
                <br><br>
                <div class="d-flex justify-content-center">
                    <router-link :to="{ path: '/emprendimientosofertview/' + idus }"
                        class="btn btn-primary text-white"><i class="fa-solid fa-eye me-2 text-white"></i> Ver Mis
                        ofertas</router-link>
                </div>
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
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
export default {
    data() {
        return {
            idus: 0,
            url2: 'http://backendbolsaempleo.test/api/b_e/vin/emprendimientos_E',
            emprendimientoemp: [],
            filteredemprend: [],
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
        this.url2 += '/' + this.idus;

        this.getEmprendimiento();
       /*this.interval = setInterval(() => {
            this.getEmprendimiento();
        }, 10000);*/
    },
    /*beforeUnmount() {
        clearInterval(this.interval);
    },*/
    methods: {
        async getEmprendimiento() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url2}?all=true`);
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
    name: 'misemprendimientos',
}
</script>