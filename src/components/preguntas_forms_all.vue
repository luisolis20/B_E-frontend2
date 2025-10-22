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
            <br><br>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Pregunta</th>
                            <th scope="col">Facultad</th>
                            <th scope="col">Tipo Pregunta</th>
                            <th scope="col">Opciones</th>
                            <th scope="col">Respuestas</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="9">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="emp,  in this.filtered_pregresp" :key="emp.id_pregunta">

                            <td v-text="emp.id_pregunta"></td>
                            <td v-text="emp.texto_pregunta"></td>
                            <td v-text="emp.facultad"></td>
                            <td v-text="emp.tipo"></td>
                            <td v-if="emp.idtiporespuesta === 0">
                                Respuesta Abierta
                            </td>
                            <td v-else>
                                {{ emp.opcion_respuesta }}
                            </td>

                            <td class="text-center">
                                ({{ emp.total_respuestas }})
                            </td>


                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filtered_pregresp.length === 0" class="text-center">
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
    <div class="container mt-5">
        <h4 class="text-center mb-3">Resultados por pregunta o por Facultad</h4>

        <!-- Selector de pregunta -->
        <div class="d-flex justify-content-center mb-4">
            <select class="form-select w-75 text-dark" v-model="preguntaSeleccionada" @change="actualizarGrafico">
                <option value="">Seleccione una pregunta</option>
                <option v-for="p in preguntasUnicas" :key="p" :value="p">{{ p }}</option>
            </select>
        </div>
        <div class="d-flex justify-content-center mb-4">
            <select class="form-select w-75 text-dark" v-model="facultadSeleccionada" @change="actualizarGrafico">
                <option value="">Todas las facultades</option>
                <option v-for="f in facultades" :key="f.idfacultad" :value="f.facultad">
                    {{ f.facultad }}
                </option>
            </select>
        </div>

        <!-- Gráfico -->
        <div v-if="preguntaSeleccionada">
            <canvas id="graficoPreguntas" height="120"></canvas>
        </div>
        <div v-else class="text-center text-muted">
            <p>Seleccione una pregunta para ver su gráfico</p>
        </div>
    </div>

    <div v-if="this.mostrarpreguntasabrietas" class="mt-5">
        <h5 class="text-center text-primary mb-3">
            Respuestas abiertas de la pregunta seleccionada
        </h5>
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID Pregunta</th>
                        <th>Usuario (Cédula)</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>
                <tbody id="contenido">
                    <tr v-for="(r, index) in respuestasAbiertas" :key="index">
                        <td>{{ r.id_pregunta }}</td>
                        <td>{{ r.usuario }}</td>
                        <td>{{ r.respuesta }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


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
import { get } from 'jquery';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);
export default {
    data() {
        return {
            idus: 0,
            url2: 'http://backendbolsaempleo.test/api/b_e/vin/ver_rep',
            url2a: 'http://backendbolsaempleo.test/api/b_e/vin/ver_respuestas_abiertas',
            urlBackend: 'http://backendbolsaempleo.test/api/b_e/vin/facultad',
            formularioemp: [],
            filtered_pregresp: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            interval: null,
            buscando: false,
            showTooltipbuscar: false, hoveringTooltipbuscar: false,
            graficoPreguntas: null,
            filtroMes: '',
            filtroAnio: '',
            aniosDisponibles: [],
            respuestasAbiertas: [],
            facultadSeleccionada: '',
            facultades: [],
            mostrarpreguntasabrietas: false,
            meses: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            preguntaSeleccionada: '',
        }
    },
    computed: {
        preguntasUnicas() {
            const set = new Set(this.formularioemp.map(p => p.texto_pregunta));
            return Array.from(set);
        },

    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.idus = ruta.params.id;
        this.url2 += '/' + this.idus;
        this.getPregresp();
        this.getFacultades();
        /*this.interval = setInterval(() => {
             this.getFormulario();
         }, 10000);*/
    },
    /*beforeUnmount() {
        clearInterval(this.interval);
    },*/
    methods: {
        async getFacultades() {
            try {
                const response = await axios.get(`${this.urlBackend}`);
                //console.log(response);
                this.facultades = response.data.data;
                //console.log(this.facultades);
            } catch (error) {
                console.error("Error al obtener las facultades:", error);
            }
        },
        async getPregresp() {
            this.cargando = true;
            try {
                const response = await axios.get(this.url2);
                const allData = response.data.data;
                //console.log(allData);

                this.formularioemp = allData;
                this.lastPage = Math.ceil(this.formularioemp.length / 10);
                this.updateFilteredData();
                //this.generarGrafico();
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

        async actualizarGrafico() {
            if (!this.preguntaSeleccionada) return;

            // Filtrar todas las respuestas de la pregunta seleccionada
            let datosPregunta = this.formularioemp.filter(
                p => p.texto_pregunta === this.preguntaSeleccionada
            );

            // Si selecciona una facultad, filtrar por coincidencia parcial (porque vienen concatenadas)
            if (this.facultadSeleccionada) {
                datosPregunta = datosPregunta.filter(
                    p => p.facultad === this.facultadSeleccionada
                );
            }

            if (datosPregunta.length && datosPregunta[0].idtiporespuesta === 0) {
                this.graficoPreguntas?.destroy?.(); // eliminar gráfico anterior 
                this.respuestasAbiertas = [];
                try {
                    this.mostrarpreguntasabrietas = true;
                    const idPregunta = datosPregunta[0].id_pregunta;
                    this.getRespuestasAbiertas(idPregunta);
                    //this.respuestasAbiertas = response.data.data; 

                } catch (error) {
                    console.warn("No hay respuestas abiertas para esta pregunta");
                } 
            }else{
                this.mostrarpreguntasabrietas = false;
            }

            // Limpiar respuestas abiertas si la pregunta no es abierta
            this.respuestasAbiertas = [];
            //this.mostrarpreguntasabrietas = false;

            // Agrupar y sumar totales por opción
            const conteo = {};
            datosPregunta.forEach(p => {
                const opcion = p.opcion_respuesta || "Sin opción";
                if (!conteo[opcion]) conteo[opcion] = 0;
                conteo[opcion] += Number(p.total_respuestas) || 0;
            });

            const etiquetas = Object.keys(conteo);
            const valores = Object.values(conteo);

            // Generar colores únicos
            const colores = etiquetas.map((_, i) => `hsl(${(i * 45) % 360}, 70%, 50%)`);

            // Destruir gráfico anterior si existe
            if (this.graficoPreguntas) {
                this.graficoPreguntas.destroy();
            }

            const ctx = document.getElementById("graficoPreguntas");
            this.graficoPreguntas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Cantidad de respuestas",
                            data: valores,
                            backgroundColor: colores,
                            borderColor: colores.map(c => c.replace("50%", "40%")),
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text:
                                this.facultadSeleccionada
                                    ? `${this.preguntaSeleccionada} — Facultad: ${this.facultadSeleccionada}`
                                    : this.preguntaSeleccionada,
                            font: { size: 18, weight: 'bold' },
                            padding: { bottom: 20 },
                        },
                        tooltip: {
                            callbacks: {
                                title: (ctx) => `Opción: ${ctx[0].label}`,
                                label: (ctx) => `Respuestas: ${ctx.parsed.y}`,
                            },
                        },
                        datalabels: {
                            anchor: "center",
                            align: "center",
                            color: "#fff",
                            font: { weight: "bold", size: 16 },
                            formatter: (value) => value,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 },
                            title: { display: true, text: "Número de respuestas" },
                        },
                        x: {
                            title: { display: true, text: "Opciones de respuesta" },
                        },
                    },
                },
            });
        }

        ,
        async getRespuestasAbiertas(idpregunta) {
            try {
                //this.url2a += `/${idpregunta}`;
                const response = await axios.get(`${this.url2a}/${idpregunta}`);
                this.respuestasAbiertas = response.data.data;
            } catch (error) {
                console.error("Error al obtener respuestas abiertas:", error);
            }
        },
        updateFilteredData() {
            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filtered_pregresp = this.formularioemp.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getFormulario()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filtered_pregresp = this.formularioemp.filter(inves =>
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
    name: 'preguntas_forms_all',
}
</script>