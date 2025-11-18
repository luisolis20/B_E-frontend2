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
                            <td v-if="emp.CIInfPer === this.idus">Yo</td>

                            <td v-else v-text="emp.ApellInfPer + ' ' + emp.ApellMatInfPer + ' ' + emp.NombInfPer"></td>
                            <td>{{ formatFecha(emp.created_at) }}</td>
                            <td>{{ formatFecha(emp.updated_at) }}</td>
                            <td class="text-center">({{ emp.total_ofertas }})</td>
                            <td>
                                <button v-if="emp.estado_empren == 0" class="btn btn-danger fw-bold"> No
                                    Aprobado</button>
                                <button v-if="emp.estado_empren == 1" class="btn btn-success fw-bold">
                                    Aprobado</button>
                                <label v-if="emp.estado_empren == 2" class=" text-info fw-bold"> En revisión </label>
                            </td>
                            <td>
                                <router-link :to="{ path: '/viewEmp/' + emp.id }" class="btn btn-info"
                                    title="Ver emprendimiento"
                                    v-if="emp.estado_empren == 1 || emp.estado_empren == 2 || emp.estado_empren == 0">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{ path: '/editEmp/' + emp.id }" class="btn btn-warning"
                                    title="Editar emprendimiento" v-if="emp.estado_empren == 1 && mostrarOpciones2">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-success"
                                    v-on:click="habilitar(emp.id, emp.nombre_emprendimiento)"
                                    v-if="emp.estado_empren == 2">
                                    <i class="fas fa-check-double"></i>
                                </button>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.id, emp.nombre_emprendimiento)"
                                    v-if="emp.estado_empren == 2">
                                    <i class="fa-solid fa-trash"></i>
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
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import script2 from '@/assets/scripts/custom.js';
import axios from 'axios';
import API from '@/assets/scripts/services/axios';
import { useRoute } from 'vue-router';
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
    data() {
        return {
            idus: 0,
            url255: `/b_e/vin/emprendimientos_E`,
            urlinformacionpersonal: `${__API_CVN__}/cvn/v1/infromaciondata`,
            emprendimientoemp: [],
            filteredemprend: [],
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
                const response = await API.get(`${this.url255}?all=true`);
                const allData = response.data.data;
                //console.log(response);
                // console.log(allData);

                this.emprendimientoemp = allData;
                this.lastPage = Math.ceil(this.emprendimientoemp.length / 10);

                this.updateFilteredData();
                if (this.filtroAnio === '' || this.filtroMes === '') {
                    this.generarGrafico();
                    this.aniosDisponibles = [...new Set(
                        this.emprendimientoemp.map(o => new Date(o.created_at).getFullYear())
                    )].sort((a, b) => b - a);
                } else {
                    this.aniosDisponibles = [...new Set(
                        this.emprendimientoemp.map(o => new Date(o.created_at).getFullYear())
                    )].sort((a, b) => b - a);
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    //console.warn("El estudiante no posee emprendimientos.");
                } else {
                    console.error("Error inesperado:", error.message);
                }
            } finally {
                this.cargando = false;
            }
        },
        aplicarFiltros() {
            let filtradas = this.emprendimientoemp;

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
            this.filteredemprend = filtradas;

            this.lastPage = Math.ceil(this.filteredemprend.length / 10);
            this.currentPage = 1;
            this.filteredemprend = this.filteredemprend.slice(0, 10);

            this.generarGrafico(filtradas);
        },
        descargarCSV() {
            const headers = ['ID', 'Ruc', 'Nombre', 'Dueño', 'Fecha de Publicación', 'Fecha de Actualizacion', 'Total Ofertas', 'Estado'];
            const rows = this.filteredemprend.map(post => [
                post.id,
                //ruc de la empresa salga correctamente
                post.ruc,
                post.nombre_emprendimiento,
                post.ApellInfPer + ' ' + post.ApellMatInfPer + ' ' + post.NombInfPer,
                new Date(post.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                new Date(post.updated_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                post.total_ofertas,
                (post.estado_empren == 1) ? 'Aprobados' : 'No Aprobados',
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
            csvContent += headers.join(';') + '\n';
            rows.forEach(row => {
                csvContent += row.join(';') + '\n';
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'Emprendiminetos_Registrados.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        generarGrafico(emprendimientoempData = this.emprendimientoemp) {
            const conteoemprendimientoemp = {};
            const conteoPostulados = {};
            const conteoaprobados = {};
            const conteonoaprobados = {};
            const conteoenrevison = {};
            // console.log(emprendimientoempData);

            // Contamos emprendimientoemp y postulados por empresa
            emprendimientoempData.forEach(post => {
                const duenio = post.ApellInfPer + ' ' + post.ApellMatInfPer + ' ' + post.NombInfPer;

                if (!conteoemprendimientoemp[duenio]) {
                    conteoemprendimientoemp[duenio] = 0;
                    conteoPostulados[duenio] = 0;
                    conteoaprobados[duenio] = 0;
                    conteonoaprobados[duenio] = 0;
                    conteoenrevison[duenio] = 0;
                }

                // Total de emprendimientos
                conteoemprendimientoemp[duenio]++;

                // Total de ofertas
                conteoPostulados[duenio] += post.total_ofertas || 0;

                // ✅ Separamos aprobados y no aprobados según estado
                if (post.estado_empren === 1) {
                    conteoaprobados[duenio]++;
                }
                 else if (post.estado_empren === 2) {
                    conteoenrevison[duenio]++;
                }
                else {
                    conteonoaprobados[duenio]++;
                }
            });

            const empresas = Object.keys(conteoemprendimientoemp);
            const datosemprendimientoemp = Object.values(conteoemprendimientoemp);
            const datosOfertas = Object.values(conteoPostulados);
            const datosAprobados = Object.values(conteoaprobados);
            const datosNoAprobados = Object.values(conteonoaprobados);
            const datosEnRevision = Object.values(conteoenrevison);

            if (this.grafico) {
                this.grafico.data.labels = empresas;
                this.grafico.data.datasets[0].data = datosemprendimientoemp;
                this.grafico.data.datasets[1].data = datosOfertas;
                this.grafico.data.datasets[2].data = datosAprobados;
                this.grafico.data.datasets[3].data = datosNoAprobados;
                this.grafico.data.datasets[4].data = datosEnRevision;
                this.grafico.destroy();
            }

            const ctx = document.getElementById('graficoemprendimientoemp');

            const coloremprendimientoemp = "hsl(120, 80%, 50%)";   // Verde
            const colorPostulados = "hsl(220, 80%, 50%)"; // Azul
            const colorAprobados = "hsl(150, 70%, 40%)"; // Verde oscuro
            const colorNoAprobados = "hsl(0, 80%, 50%)"; // Rojo
            const colorEnRevision = "hsl(0, 30%, 50%)"; // Amarillo


            this.grafico = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: empresas,
                    datasets: [
                        {
                            label: 'Emprendimientos',
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
                        {
                            label: 'Empren. Aprobados',
                            data: datosAprobados,
                            backgroundColor: colorAprobados,
                            borderColor: colorAprobados,
                            borderWidth: 1
                        },
                        {
                            label: 'Empren. No Aprobados',
                            data: datosNoAprobados,
                            backgroundColor: colorNoAprobados,
                            borderColor: colorNoAprobados,
                            borderWidth: 1
                        },
                        {
                            label: 'Empren. En Revisón',
                            data: datosEnRevision,
                            backgroundColor: colorEnRevision,
                            borderColor: colorEnRevision,
                            borderWidth: 1 
                        }
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
                                        `#_Emprendimientos: ${datosemprendimientoemp[index]}`,
                                        `#_Ofertas: ${datosOfertas[index]}`,
                                        `#_Emprendimientos Aprobados: ${datosAprobados[index]}`,
                                        `#_Emprendimientos No Aprobados: ${datosNoAprobados[index]}`,
                                        `#_Emprendimientos En Revisón: ${datosEnRevision[index]}`
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
                            ctx.fillText(`Emprenidmientos: ${datosemprendimientoemp[i]}`, x, y + 15);

                            ctx.fillStyle = colorPostulados;
                            ctx.fillText(`Ofertas: ${datosOfertas[i]}`, x, y + 30);
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
        async eliminar(id, nombre) {
            try {
                const w = await confimar(
                    `/b_e/vin/consultaredirempelim/`,
                    id,
                    'No aprobar Emprendimiento',
                    '¿Realmente desea no aprobar el emprendimiento  ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
                if (w.mensaje === 'Inhabilitado con Éxito!!') {
                    this.urlinformacionpersonal += '/' + w.data.CIInfPer;
                    const response = await axios.get(this.urlinformacionpersonal);
                    const data = response.data.data[0];
                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await API.post(`/b_e/vin/enviar-rechazo-emprendimiento`, {

                        email: w.data.email_contacto,
                        firts_name: apellidos,
                        company_name: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento no aprobado', 'success');

                        this.actualizar();

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                    }
                }
            } catch (error) {
                console.error("Error al eliminar el emprendimiento:", error);
                this.cargando = false;
            }
        },
        async habilitar(id, nombre) {
            try {
                const w = await confimarhabi(
                    `/b_e/vin/consultaredirempelim2/`,
                    id,
                    'Aprobar Emprendimiento',
                    '¿Desea aprobar el emprendimiento ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );

                if (w.mensaje === 'Habilitado con Éxito!!') {
                    this.urlinformacionpersonal += '/' + w.data.CIInfPer;
                    const response = await axios.get(this.urlinformacionpersonal);
                    const data = response.data.data[0];
                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await API.post(`/b_e/vin/enviar-aprobacion-emprendimiento`, {

                        email: w.data.email_contacto,
                        firts_name: apellidos,
                        company_name: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento aprobado con éxito', 'success');

                        this.actualizar();

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                    }
                }

            } catch (error) {
                console.error("Error al aprobar el emprendimiento:", error);
                this.cargando = false;
            }
        },



    },
    mixins: [script2],
    name: 'allemprendimiento',
}
</script>