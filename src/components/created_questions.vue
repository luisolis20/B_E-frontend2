<template>
    <div class="container-fluid RSVP-form py-5" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <div v-if="opcionesadd">
                    <h1 class="display-2 text-primary">Añadir Opciones de Respuesta</h1>
                    <p class="text-dark">Rellene los siguientes campos para añadir las opciones de respuesta</p>
                </div>
                <div v-else>
                    <h1 class="display-2 text-primary">Añadir Preguntas</h1>
                    <p class="text-dark">Rellene los siguientes campos para añadir preguntas</p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);"
                            v-if="opcionesadd">
                            Registra las opciones de respuesta de la pregunta
                        </div>
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);"
                            v-else>
                            Registra la preguntas del formulario: {{ nombre_forms }}
                        </div>
                        <form>
                            <div class="row gx-12 gy-3">
                                <div class="col-lg-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div v-if="modoEdicion" class="text-center">
                                        <p class="text-danger fw-bold text-center">
                                            🛠️ Modo edición activado (ID: {{ preguntaId }})
                                        </p>
                                        <a href=" " class="text-dark fw-bold" @click="Salirmodo">Salir del modo
                                            edición</a>

                                    </div>
                                    <div class="text-center" v-if="opcionesadd">

                                        <p class="text-dark fw-bold text-center">
                                            🛠️ Modo añadir opciones de respuesta activado (ID-Pregunta: {{ preguntaId}})
                                        </p>
                                        <a href=" " class="text-dark fw-bold" @click="Salirmodo">Salir del modo añadir
                                            opciones de respuesta</a>
                                    </div>
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Pregunta</label>
                                        <div class="input-with-icon">
                                            <input type="text" v-model="PREGUNTA"
                                                class="form-control py-3 border-1 text-dark" id="PREGUNTA"
                                                :disabled="opcionesadd">
                                            <!-- Icono PREGUNTA -->
                                            <span class="help-icon" @mouseenter="showTooltipPREGUNTA = true"
                                                @mouseleave="hideOnLeave('PREGUNTA')"
                                                @click.stop="toggleTooltip('PREGUNTA')" ref="tooltipIconPREGUNTA"
                                                v-if="!opcionesadd">❓</span>

                                            <!-- Tooltip PREGUNTA -->
                                            <div v-if="showTooltipPREGUNTA" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxPREGUNTA" @mouseenter="hoveringTooltipPREGUNTA = true"
                                                @mouseleave="hideOnLeave('PREGUNTA')">
                                                Ingrese la pregunta para su formulario, la pregunta debe ser clara y
                                                concisa.
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione el tipo de
                                            pregunta</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.tipo" class="form-control py-3 border-0 text-dark"
                                                id="tipo" :disabled="opcionesadd">
                                                <option value="" disabled selected>
                                                    Tipo de Pregunta
                                                </option>
                                                <option value="ABIERTA">ABIERTA</option>
                                                <option value="SELECCIÓN MÚLTIPLE">SELECCIÓN MÚLTIPLE</option>
                                                <option value="SELECCIÓN ÚNICA">SELECCIÓN ÚNICA</option>
                                            </select>

                                            <!-- Icono tipo -->
                                            <span class="help-icon" @mouseenter="showTooltiptipo = true"
                                                @mouseleave="hideOnLeave('tipo')" @click.stop="toggleTooltip('tipo')"
                                                ref="tooltipIcontipo" v-if="!opcionesadd">❓</span>
                                            <!-- Tooltip tipo -->
                                            <div v-if="showTooltiptipo" class="tooltip-box" ref="tooltipBoxtipo"
                                                @mouseenter="hoveringTooltiptipo = true"
                                                @mouseleave="hideOnLeave('tipo')">
                                                Seleccione el tipo de pregunta, por ejemplo: Abierta, Selección
                                                múltiple, Selección única.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 wow fadeIn" data-wow-delay="0.1s" v-if="opcionesadd">
                                    <div class="text-center" v-if="modoEdicion2">
                                    
                                        <p  class="text-danger fw-bold text-center">
                                            🛠️ Modo edición activado (ID: {{ opcionesId }})
                                        </p>
                                        <a href=" " class="text-dark fw-bold" @click="Salirmodo">Salir del modo edición</a>
                                    </div>
                                    <label class="form-label text-dark" v-if="warning">La pregunta es abierta, por ende
                                        no puede añadir opciones de respuesta</label>
                                    <div class="form-group" v-if="!warning">
                                        <label for="Examplename" class="form-label text-dark">Opcion de
                                            Respuesta</label>
                                        <div class="input-with-icon">
                                            <input type="text" v-model="TIPORESPUESTA"
                                                class="form-control py-3 border-1 text-dark" id="TIPORESPUESTA">
                                            <!-- Icono TIPORESPUESTA -->
                                            <span class="help-icon" @mouseenter="showTooltipTIPORESPUESTA = true"
                                                @mouseleave="hideOnLeave('TIPORESPUESTA')"
                                                @click.stop="toggleTooltip('TIPORESPUESTA')"
                                                ref="tooltipIconTIPORESPUESTA">❓</span>

                                            <!-- Tooltip TIPORESPUESTA -->
                                            <div v-if="showTooltipTIPORESPUESTA" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxTIPORESPUESTA"
                                                @mouseenter="hoveringTooltipTIPORESPUESTA = true"
                                                @mouseleave="hideOnLeave('TIPORESPUESTA')">
                                                Ingrese la opcion de respuesta de la pregunta.
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <br><br>
                                    <div class="text-center" v-if="!warning">

                                        <button v-on:click="guardarop"
                                            class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">
                                            {{ modoEdicion2 ? 'Editar Opcion' : 'Añadir Opcion' }}
                                        </button>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">

                                        <div class="mt-4" v-if="!opcionesadd">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Si ya llenó todos los campos de clic
                                                    en el botón de abajo</p>

                                                <button v-on:click="guardar"
                                                    class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">
                                                    {{ modoEdicion ? 'Editar Pregunta' : 'Añadir Pregunta' }}
                                                </button>
                                                <br><br>
                                                <p class="text-dark">Las preguntas que agregues se mostrarán en la tabla
                                                    de abajo</p>


                                            </div>
                                        </div>
                                        <div class="mt-4" v-else>
                                            <label for="" class="text-dark">Opciones Registradas</label>
                                            <div class="table-container">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Opcion</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contenido">
                                                        <tr v-if="this.cargando2">
                                                            <td colspan="9">
                                                                <h3>Cargando....</h3>
                                                            </td>
                                                        </tr>
                                                        <tr v-else v-for="emp1,  in this.filteredresp" :key="emp1.ID">
                                                            <td v-text="emp1.TIPORESPUESTA"></td>

                                                            <td>
                                                                &nbsp;
                                                                <button class="btn btn-warning" title="Editar pregunta"
                                                                    @click="editarOpciones(emp1)">
                                                                    <i class="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;





                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div v-if="filteredresp.length === 0" class="text-center">
                                                <h3>No hay opciones creadas</h3>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>



            </div>
        </div>
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
                            <button class="btn btn-info" title="Añadir Opciones de Respuesta" @click="Addoptions(emp)">
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
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import store from '@/store';
import axios from 'axios';
import { mostraralertas, enviarsoligp } from '@/assets/scripts/scriptfunciones/funciones';
import { getMe } from '@/store/auth';
import API from '@/assets/scripts/services/axios';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
export default {
    data() {
        return {
            idus: 0,
            idusop: 0,
            PREGUNTA: '',
            nombre_forms: 'Formulario',
            url: `/b_e/vin/seguipreguntas`,
            url2: `/b_e/vin/seguiformulario`,
            url23: `/b_e/vin/seguitiporespuesta`,
            tipo: '',
            cargando2: false,
            showTooltipPREGUNTA: false,
            hoveringTooltipPREGUNTA: false,
            showTooltiptipo: false,
            hoveringTooltiptipo: false,
            preguntaemp: [],
            opcionesrespemp: [],
            filteredpreguntas: [],
            filteredresp: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            currentPage2: 1,
            lastPage: 1,
            lastPage2: 1,
            modoEdicion: false,
            modoEdicion2: false,
            modoOpciones: false,
            preguntaId: null,
            opcionesId: null,
            opcionesadd: false,
            nombre_preg: '',
            TIPORESPUESTA: '',
            showTooltipTIPORESPUESTA: false,
            hoveringTooltipTIPORESPUESTA: false,
            warning: false,

        }
    },
    async mounted() {
        const ruta = useRoute();
        await Promise.all([
            getMe(),
            this.getFormulario(),
            this.getPreguntas()
        ])
        this.idus = ruta.params.id;

        this.url2 += '/' + this.idus;


    },
    methods: {
        async getFormulario() {
            try {
                const response = await API.get(this.url2);
                const allData = response.data.data;
                //console.log(allData);
                this.nombre_forms = allData[0].NOMBRE;
            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    //console.warn("El estudiante no posee emprendimientos.");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado:", error.message);
                }
            } finally {
                this.cargando = false;
            }
        },
        Salirmodo() {
            this.modoEdicion = false;
            this.modoEdicion2 = false;
            this.preguntaId = null;
            this.PREGUNTA = '';
            this.tipo = '';
            this.opcionesadd = false;
            this.opcionesrespemp = [];
            this.filtradas = [];
            this.lastPage = 1;
            this.opcionesId = null;
        },

        editarPregunta(emp) {
            this.modoEdicion = true;
            this.modoOpciones = false;
            this.preguntaId = emp.ID;
            this.PREGUNTA = emp.PREGUNTA;
            this.TIPORESPUESTA = '';
            //console.log(emp.tipo);
            this.tipo = emp.tipo || '';
            this.opcionesadd = false;
            this.opcionesrespemp = [];
            this.filteredresp = [];
            this.lastPage2 = 1;
        },
        editarOpciones(emp) {
            this.modoEdicion2 = true;

            this.opcionesId = emp.ID;
            this.TIPORESPUESTA = emp.TIPORESPUESTA;
            if (this.tipo == 'Abierta') {
                this.warning = true;
            } else {
                this.warning = false;
            }
            this.opcionesadd = true;
            this.getOpcionesResp();

        },
        async Addoptions(emp) {
            this.modoEdicion = false;
            this.modoOpciones = true;
            this.preguntaId = emp.ID;
            this.PREGUNTA = emp.PREGUNTA;
            this.tipo = emp.tipo || '';
            if (this.tipo == 'Abierta') {
                this.warning = true;
            } else {
                this.warning = false;
            }
            this.opcionesadd = true;
            this.opcionesrespemp = [];
            this.filteredresp = [];
            this.lastPage2 = 1;

            this.getOpcionesResp();

        },

        async getPreguntas() {
            this.cargando = true;
            try {
                const response = await API.get(`${this.url}?all=true`);
                const allData = response.data.data;
                //console.log(allData);

                this.preguntaemp = allData;
                this.lastPage = Math.ceil(this.preguntaemp.length / 10);
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
        async getOpcionesResp() {
            const newurl = this.url23 + '/' + this.preguntaId;
            this.cargando2 = true;
            try {
                const response = await API.get(newurl);
                if (response.data.data) {
                    const allData = response.data.data;

                    this.opcionesrespemp = allData;
                    this.lastPage2 = Math.ceil(this.opcionesrespemp.length / 10);
                    this.updateFilteredData2();
                } else {
                    this.opcionesrespemp = [];
                    this.filteredresp = [];
                    this.lastPage2 = 1;
                    this.updateFilteredData2();
                }

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
                this.cargando2 = false;
            }
        },
        updateFilteredData() {
            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredpreguntas = this.preguntaemp.slice(startIndex, endIndex);
        },
        updateFilteredData2() {
            // Aplicar paginación local
            const startIndex = (this.currentPage2 - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredresp = this.opcionesrespemp.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getFormulario()
        },
        actualizar2() {
            this.cargando = true;
            this.getOpcionesResp()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredpreguntas = this.preguntaemp.filter(inves =>
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
            if (field === "PREGUNTA") this.showTooltipPREGUNTA = !this.showTooltipPREGUNTA;
            if (field === "tipo") this.showTooltiptipo = !this.showTooltiptipo;
            if (field === "TIPORESPUESTA") this.showTooltipTIPORESPUESTA = !this.showTooltipTIPORESPUESTA;


        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "PREGUNTA" && !this.hoveringTooltipPREGUNTA) this.showTooltipPREGUNTA = false;
                if (field === "tipo" && !this.hoveringTooltiptipo) this.showTooltiptipo = false;
                if (field === "TIPORESPUESTA" && !this.hoveringTooltipTIPORESPUESTA) this.showTooltipTIPORESPUESTA = false;

            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ['tooltipIconPREGUNTA', 'tooltipBoxPREGUNTA', 'showTooltipPREGUNTA'],
                ['tooltipIcontipo', 'tooltipBoxtipo', 'showTooltiptipo'],
                ['tooltipIconTIPORESPUESTA', 'tooltipBoxTIPORESPUESTA', 'showTooltipTIPORESPUESTA'],

            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
        },

        guardar(event) {
            event.preventDefault();
            try {
                const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

                if (this.PREGUNTA.trim() == '') {
                    mostraralertas('Ingrese la pregunta', 'warning', 'PREGUNTA');
                }


                else if (this.tipo.trim() == '') {
                    mostraralertas('Seleccione el tipo de pregunta', 'warning', 'tipo');
                }


                else {
                    var parametros = {
                        PREGUNTA: this.PREGUNTA.trim(),
                        IDFORMULARIO: this.idus,
                        UP: store.state.name,
                        FINS: fechaEcuador,
                        UD: '',
                        FDEL: '',
                        tipo: this.tipo.trim(),


                    }
                    if (this.modoEdicion && this.preguntaId) {
                        // Editar
                        enviarsoligp('PUT', parametros, `${this.url}/${this.preguntaId}`, 'Pregunta actualizada');
                        this.modoEdicion = false;
                        this.preguntaId = null;
                        this.getPreguntas();
                    } else {
                        // Añadir
                        enviarsoligp('POST', parametros, this.url, 'Pregunta añadida');
                        this.getPreguntas();
                    }

                    this.PREGUNTA = '';
                    this.tipo = '';
                    this.getPreguntas();
                }


            } catch (error) {
                console.error('Error al guardar el formulario:', error);

            }

        },
        async guardarop(event) {
            event.preventDefault();
            const url234 = `/b_e/vin/seguitiporespuesta`;
            try {
                const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

                if (this.TIPORESPUESTA.trim() == '') {
                    mostraralertas('Ingrese la opcion para la pregunta pregunta', 'warning', 'TIPORESPUESTA');
                }


                else {
                    var parametros = {
                        TIPORESPUESTA: this.TIPORESPUESTA.trim(),
                        IDPREGUNTA: this.preguntaId,
                        UP: store.state.name,
                        FINS: fechaEcuador,
                        UD: '',
                        FDEL: '',
                        valor: 1,

                    }
                    if (this.modoEdicion2 && this.opcionesId) {
                        // Editar
                        enviarsoligp('PUT', parametros, `${url234}/${this.opcionesId}`, 'Opción actualizada');
                        this.modoEdicion2 = false;
                        this.opcionesId = null;

                        this.getOpcionesResp(),
                            this.getPreguntas()

                    } else {
                        // Añadir
                        enviarsoligp('POST', parametros, url234, 'Opción añadida');

                        this.getOpcionesResp(),
                            this.getPreguntas()

                    }

                    this.TIPORESPUESTA = '';

                    this.getOpcionesResp(),
                        this.getPreguntas()

                }


            } catch (error) {
                console.error('Error al guardar el formulario:', error);

            }

        },


    },
    name: 'created_questions',
};
</script>