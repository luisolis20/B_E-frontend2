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
    <div class="container mt-5" v-if="mostrarOpciones3">
        <div class="row gx-4 gy-3 d-flex justify-content-center mt-3" v-if="mostrarOpciones3">
            <div class="mb-3 col-sm-2">
                <label class="form-label fw-bold text-dark">Filtrar por Año:</label>
                <select v-model="filtroAnio" @change="aplicarFiltros" class="form-select text-dark">
                    <option value="">Todos</option>
                    <option v-for="anio in aniosDisponibles" :key="anio" :value="anio">{{ anio }}</option>
                </select>
            </div>
            <div class="mb-3 col-sm-2">
                <label class="form-label fw-bold text-dark">Filtrar por Mes:</label>
                <select v-model="filtroMes" @change="aplicarFiltros" class="form-select text-dark">
                    <option value="">Todos</option>
                    <option v-for="(mes, index) in meses" :key="index" :value="index + 1">{{ mes }}</option>
                </select>
            </div>
        </div>
        <h4 class="text-center mb-3">Gráfico estadístico de emprendimientos</h4>
        <canvas id="graficoemprendimientoemp" height="100"></canvas>
    </div>
    <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import script2 from '@/assets/scripts/custom.js';
import API from '@/assets/scripts/services/axios';
import { useRoute } from 'vue-router';
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
    data() {
        return {
            idus: 0,
            url255: `/b_e/vin/empresas`,
            urlhabilitar: `/b_e/vin/empresashabi/`,
            empresasprac: [],
            filteredempresas: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
            grafico: null,
            filtroMes: '',
            filtroAnio: '',
            aniosDisponibles: [],
            meses: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            interval: null,
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
                const response = await API.get(`${this.url255}?all=true`);
                const allData = response.data.data;

                this.empresasprac = allData;
                this.lastPage = Math.ceil(this.empresasprac.length / 10);
                this.updateFilteredData();
                if (this.filtroAnio === '' || this.filtroMes === '') {
                    this.generarGrafico();
                    this.aniosDisponibles = [...new Set(
                        this.empresasprac.map(o => new Date(o.created_at).getFullYear())
                    )].sort((a, b) => b - a);
                } else {
                    this.aniosDisponibles = [...new Set(
                        this.empresasprac.map(o => new Date(o.created_at).getFullYear())
                    )].sort((a, b) => b - a);
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
            }

        },
        aplicarFiltros() {
            let filtradas = this.empresasprac;

            if (this.filtroAnio) {
                filtradas = filtradas.filter(ofe =>
                    new Date(ofe.created_at).getFullYear() == this.filtroAnio
                );
            }

            if (this.filtroMes) {
                filtradas = filtradas.filter(ofe =>
                    new Date(ofe.created_at).getMonth() + 1 == this.filtroMes
                );
            }

            // Tabla
            this.filteredempresas = filtradas;

            this.lastPage = Math.ceil(this.filteredempresas.length / 10);
            this.currentPage = 1;
            this.filteredempresas = this.filteredempresas.slice(0, 10);

            this.generarGrafico(filtradas);
        },
        generarGrafico(empresaData = this.empresasprac) {
            const conteoemprendimientoemp = {};
            const conteoPostulados = {};
            // console.log(emprendimientoempData);

            // Contamos emprendimientoemp y postulados por empresa
            empresaData.forEach(post => {
                const duenio = post.representante;

                if (!conteoemprendimientoemp[duenio]) {
                    conteoemprendimientoemp[duenio] = 0;
                    conteoPostulados[duenio] = 0;
                }

                // Total de emprendimientos
                conteoemprendimientoemp[duenio]++;

                // Total de ofertas
                conteoPostulados[duenio] += post.total_ofertas || 0;

                
            });

            const empresas = Object.keys(conteoemprendimientoemp);
            const datosemprendimientoemp = Object.values(conteoemprendimientoemp);
            const datosOfertas = Object.values(conteoPostulados);
            

            if (this.grafico) {
                this.grafico.data.labels = empresas;
                this.grafico.data.datasets[0].data = datosemprendimientoemp;
                this.grafico.data.datasets[1].data = datosOfertas;
                this.grafico.destroy();
            }

            const ctx = document.getElementById('graficoemprendimientoemp');

            const coloremprendimientoemp = "hsl(120, 80%, 50%)";   // Verde
            const colorPostulados = "hsl(220, 80%, 50%)"; // Azul


            this.grafico = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: empresas,
                    datasets: [
                        {
                            label: 'Empresas',
                            data: datosemprendimientoemp,
                            backgroundColor: coloremprendimientoemp,
                            borderColor: coloremprendimientoemp,
                            borderWidth: 1
                        },
                        {
                            label: 'Ofertas',
                            data: datosOfertas,
                            backgroundColor: colorPostulados,
                            borderColor: colorPostulados,
                            borderWidth: 1
                        },
                        
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function (context) {
                                    return `Dueño: ${context[0].label}`;
                                },
                                label: function (context) {
                                    return `${context.dataset.label}: ${context.raw}`;
                                }
                            }
                        },
                        datalabels: {
                            anchor: "center",
                            align: "center",
                            color: "#fff",
                            font: {
                                weight: "bold",
                                size: 15,
                            },
                            formatter: (value) => value,
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                callback: function (value, index) {
                                    const empresa = this.getLabelForValue(value);
                                    return [
                                        `Dueño: ${empresa}`,
                                        `#_Empresas: ${datosemprendimientoemp[index]}`,
                                       
                                    ];
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                },
                plugins: [{
                    id: 'customLabels',
                    afterDraw(chart) {
                        const ctx = chart.ctx;
                        chart.scales.x.ticks.forEach((tick, i) => {
                            const x = chart.scales.x.getPixelForTick(i);
                            const y = chart.scales.x.bottom + 10;

                            ctx.save();
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = '#000';
                            ctx.fillText(`Dueño: ${empresas[i]}`, x, y);

                            ctx.fillStyle = coloremprendimientoemp;
                            ctx.fillText(`Empresa: ${datosemprendimientoemp[i]}`, x, y + 15);

                            ctx.fillStyle = colorPostulados;
                            ctx.fillText(`Oferta: ${datosOfertas[i]}`, x, y + 30);
                            ctx.restore();
                        });
                    }
                }]
            });
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
                    `${this.url255}/`,
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
                    `${this.urlhabilitar}`,
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