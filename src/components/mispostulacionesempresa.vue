<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Tus Postulaciones a ofertas de empresas</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estos son tus Postulaciones</small>
            <br>
            <p class="text-dark">Aquí encontrarás todas tus postulaciones realizadas a ofertas de empleo en empresas, si
                el dueño de la
                empresa no ha revisado tu postulación te aparecerá en el <b>Estado de la postulación</b> en proceso, si
                te aceptaron o rechazaron te aparecerá

                en el estado y podrás ver el detalle dando clic en el ícono del ojo.</p>
            <p class="text-danger">Nota: Si el dueño de la empresa no ha revisado tu postulación y el estado está
                <b>en proceso</b>, te aparecerá un botón para eliminar tu postulación.
                Ya queda a tu disposición si deseas eliminarla, si la eliminas la empresa ya no verá tu postulación
            </p>

            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <div class="input-with-icon col-sm-6">
                            <input class="form-control py-3 border-1 text-dark" type="search"
                                placeholder="Buscar por ruc de la empresa" v-model="searchQuery"
                                @input="filterResults" @keypress="onlyNumbers">
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
            <div class="mb-3 col-sm-2 col-md-2 col-xl-2">
                <label for="filtroEstado" class="form-label fw-bold text-dark">Filtrar por estado de la
                    postulación:</label>
                <div class="input-with-icon col-sm-6">
                    <select v-model="filtroEstado" @change="filtrarOfertas" class="form-select text-dark"
                        id="filtroEstado">
                        <option value="todas">Todas</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rehcazada</option>
                        <option value="En proceso">En proceso</option>
                    </select>
                    <!-- Botón de ayuda -->
                    <span class="help-icon" @mouseenter="showTooltipfiltro = true"
                        @mouseleave="hideOnLeave('filtroEstado')" @click.stop="toggleTooltip('filtroEstado')"
                        ref="tooltipIconfiltrar">❓</span>
                    <!-- Tooltip -->
                    <div v-if="showTooltipfiltro" class="tooltip-box" ref="tooltipBoxfiltro"
                        @mouseenter="hoveringTooltipfiltro = true" @mouseleave="hideOnLeave('filtroEstado')">
                        Seleccione el estado de la postulación que desea filtrar.
                        <div class="tooltip-arrow"></div>
                    </div>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Ruc Empresa</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Estado de la Postulación</th>
                            <th scope="col">Fecha y hora de postulación</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="7">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="post,  in this.filteredpostulaciones" :key="post.id">

                            <td v-text="post.id"></td>
                            <td v-text="post.ruc"></td>
                            <td v-text="post.Empresa"></td>
                            <td v-text="post.Oferta"></td>
                            <td v-text="post.categoria"></td>
                            <td>
                                <label v-if="post.estado === 'En proceso'" class="text-warning fw-bold">En
                                    Proceso</label>
                                <button v-else-if="post.estado === 'Rechazada'"
                                    class="btn btn-danger fw-bold">Rechazada</button>
                                <button v-else-if="post.estado === 'Aceptada'"
                                    class="btn btn-success fw-bold">Aceptada</button>

                            </td>
                            <td>{{ formatFecha(post.fecha_postulacion) }}</td>
                            <td>


                                <button class="btn btn-danger" v-on:click="eliminar(post.id, post.Oferta)"
                                    v-if="post.estado === 'En proceso'">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                &nbsp;
                                <button class="btn btn-info" v-if="post.estado === 'Aceptada'"
                                    v-on:click="$router.push('/aceptacionview/' + post.idempresa + '/' + post.oferta_id)">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button class="btn btn-info" v-if="post.estado === 'Rechazada'"
                                    v-on:click="$router.push('/rechazoview/' + post.idempresa + '/' + post.oferta_id)">
                                    <i class="fa-solid fa-eye"></i>
                                </button>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <br><br></br>
            <div v-if="filteredpostulaciones.length === 0" class="text-center">
                <h3>No hay Postulaciones</h3>
            </div>
            <br><br></br>
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

        </div>

    </div>
    <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import axios from 'axios';
import API from '@/assets/scripts/services/axios';
import { useRoute } from 'vue-router';
import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
import { getMe } from '@/store/auth';
import script2 from '@/assets/scripts/custom.js';

export default {
    data() {
        return {
            idus: 0,
            url213: `/b_e/vin/consultapostuser`,
            postulacionespr: [],
            filteredpostulaciones: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
             showTooltipbuscar: false,
            hoveringTooltipbuscar: false,
            filtroEstado: 'todas',
            showTooltipfiltro: false,
            hoveringTooltipfiltro: false,
        }
    },
    async mounted() {
       const ruta = useRoute();
        this.idus = ruta.params.id;
        const usuario = await getMe();
        //this.idus = usuario.CIInfPer;
        this.url213 += '/' + this.idus;
        //console.log(this.url213);
        this.getPostulaciones();
    },
    methods: {
        async getPostulaciones() {
            this.cargando = true;
            try {
                const response = await API.get(`${this.url213}?all=true`);

                // Verifica si la respuesta tiene datos válidos
                const allData = response.data?.data || [];

                if (allData.length === 0) {
                    //console.warn("No se encontraron postulaciones.");
                }

                this.postulacionespr = allData;
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
            confimar(`/b_e/vin/consultapostuser/`, id, 'Eliminar registro', '¿Realmente desea eliminar la postulación de la oferta ' + nombre + '?');
            this.getPostulaciones();
            this.cargando = false;
            this.$router.push('/principal/' + this.idus);

        },
         toggleTooltip(field) {
            if (field === "buscar") this.showTooltipbuscar = !this.showTooltipbuscar;
            if (field === "filtroEstado") this.showTooltipfiltro = !this.showTooltipfiltro;
        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "buscar" && !this.hoveringTooltipbuscar) this.showTooltipbuscar = false;
                if (field === "filtroEstado" && !this.hoveringTooltipfiltro) this.showTooltipfiltro = false;
            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ["tooltipIconbuscar", "tooltipBoxbuscar", "showTooltipbuscar"],
                ["tooltipIconfiltrar", "tooltipBoxfiltro", "showTooltipfiltro"]
            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
        }
    },
    mixins: [script2],
    name: 'mispostulacionesempresa',
}
</script>