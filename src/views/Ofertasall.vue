<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Ofertas de empleo de Empresas</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son todas las ofertas de Empleo</small>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row gx-4 gy-3 d-flex justify-content-center" v-if="mostrarOpciones3">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <input class="form-control py-3 border-1 text-dark" type="search"
                            placeholder="Buscar por RUC de la empresa" v-model="searchQuery" @input="filterResults"
                            @keypress="onlyNumbers">
                    </form>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;

            <div class="row gx-4 gy-3 d-flex">
                <div class="mb-3 col-sm-2 col-md-2 col-xl-2">
                    <label for="filtroEstado" class="form-label fw-bold text-dark">Filtrar por estado de la
                        oferta:</label>
                    <select v-model="filtroEstado" @change="filtrarOfertas" class="form-select text-dark"
                        id="filtroEstado">
                        <option value="todas">Todas</option>
                        <option value="vigente">Oferta Vigente</option>
                        <option value="caducada">Oferta Caducada</option>
                    </select>
                </div>
                <div class="mb-3 col-sm-6 col-md-6 col-xl-5 align-self-center">
                    <label for="categoriaSeleccionada" class="form-label fw-bold text-dark">Filtrar por
                        categoría:</label>
                    <select v-model="categoriaSeleccionada" @change="filtrarCaTegirias" class="form-select text-dark"
                        id="categoriaSeleccionada">
                        <option value="" selected>Categorías / Área</option>
                        <option value="Administración y RRHH">Administración y RRHH</option>
                        <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Comercial, Negocios y Atención al público">Comercial, Negocios y Atención al
                            público</option>
                        <option value="Educación y Docencia">Educación y Docencia</option>
                        <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y Turismo</option>
                        <option value="Ingenierías">Ingenierías</option>
                        <option value="Logística y Abastecimiento">Logística y Abastecimiento</option>
                        <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing, Publicidad, Comunicación
                            y Diseño</option>
                        <option value="Oficios">Oficios</option>
                        <option value="Producción y Operarios">Producción y Operarios</option>
                        <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina, Farmacia y Bioquímica
                        </option>
                        <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                        <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                        <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                        <option value="Textil">Textil</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
                <div class="mb-3 col-sm-2 col-md-2 col-xl-2" v-if="mostrarOpciones2">
                    <div>
                        <label for="filtroEstado" class="form-label fw-bold text-dark">Modo de visualización:</label>
                    </div>

                    <div class="form-check form-check-inline py-2">
                        <input class="form-check-input text-dark" type="radio" name="inlineRadioOptions"
                            id="inlineRadio1" value="option2" checked @click="tabla = false; carrousel = true;">
                        <label class="form-check-label text-dark" for="inlineRadio1">Carrousel</label>
                    </div>
                    <div class="form-check form-check-inline py-2">
                        <input class="form-check-input text-dark" type="radio" name="inlineRadioOptions"
                            id="inlineRadio1" value="option1" @click="tabla = true; carrousel = false;">
                        <label class="form-check-label text-dark" for="inlineRadio1">Tabla</label>
                    </div>

                </div>

            </div>
            <div class="table-container" v-if="tabla || mostrarOpciones3">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Título</th>
                            <th scope="col">Categorías</th>
                            <th scope="col" v-if="mostrarOpciones2">Modalidad</th>
                            <th scope="col">Tipo de Contrato</th>
                            <th scope="col">Jefe</th>
                            <th scope="col">Finalización de la Oferta</th>
                            <th scope="col">Publicado</th>
                            <th scope="col" v-if="mostrarOpciones3">Actualizado</th>
                            <th scope="col" v-if="mostrarOpciones3">Estado</th>
                            <th scope="col" v-if="mostrarOpciones3">Cant. Post</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="12">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="ofe,  in filteredofertas" :key="ofe.id">

                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.Empresa"></td>
                            <td v-text="ofe.titulo"></td>
                            <td v-text="ofe.categoria"></td>
                            <td v-text="ofe.modalidad" v-if="mostrarOpciones2"></td>
                            <td v-text="ofe.tipo_contrato"></td>
                            <td v-text="ofe.Jefe"></td>
                            <td>{{ new Date(ofe.fechaFinOferta).toLocaleDateString('es-EC', {
                                timeZone:
                                    'America/Guayaquil'
                            }) }}
                                <label v-if="new Date(ofe.fechaFinOferta) <= new Date()"
                                    class="text-danger fw-bold">(Oferta Caducada)</label>
                                <label v-else class="text-success fw-bold">(Oferta Vigente)</label>
                            </td>
                            <td v-text="formatFecha(ofe.created_at)"></td>
                            <td v-if="mostrarOpciones3" v-text="formatFecha(ofe.updated_at)"></td>
                            <td v-if="mostrarOpciones3">
                                <button v-if="ofe.estado_ofert == 1" class="btn btn-success fw-bold">
                                    Habilitado</button>
                                <button v-if="ofe.estado_ofert == 0" class="btn btn-danger fw-bold">
                                    Deshabilitado</button>
                            </td>
                            <td class="text-center" v-if="mostrarOpciones3">({{ ofe.total_postulados }})</td>
                            <td>
                                <router-link :to="{ path: '/postularse/' + this.idus + '/' + ofe.id }"
                                    v-if="mostrarOpciones2 && ofe.estado_ofert == 1" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <button v-if="mostrarOpciones3 && ofe.estado_ofert == 1 && ofe.total_postulados == 0"
                                    class="btn btn-danger" v-on:click="eliminar(ofe.id, ofe.titulo)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button
                                    v-if="mostrarOpciones3 && ofe.estado_ofert == 0 && new Date(ofe.fechaFinOferta) >= new Date()"
                                    class="btn btn-success" v-on:click="habilitar(ofe.id, ofe.titulo)">
                                    <i class="fas fa-redo"></i>
                                </button>



                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <br><br>
            <div class="owl-carousel vegetable-carousel justify-content-center" v-if="carrousel && mostrarOpciones2">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div v-for="ofe in filteredofertas" :key="ofe.id"
                    class="border border-primary rounded position-relative vesitable-item mx-2 my-3">

                    <div>
                        <div v-if="new Date(ofe.fechaFinOferta) <= new Date()"
                            class="text-white bg-danger px-3 py-1 rounded position-absolute"
                            style="top: 10px; right: 10px;">Ofertas Caducada</div>
                        <div v-else class="text-white bg-primary px-3 py-1 rounded position-absolute"
                            style="top: 10px; right: 10px;">Ofertas Recientes</div>

                    </div>
                    <div class="p-4 rounded-bottom">
                        <h4>{{ ofe.titulo }}</h4>
                        <h6>Fecha de publicación: {{ new Date(ofe.created_at).toLocaleDateString('es-ES') }}</h6>
                        <div v-if="new Date(ofe.fechaFinOferta) > new Date() && tiemposRestantes[ofe.id]">
                            <h6 class="text-success">
                                {{ calcularDiasRestantes(ofe.fechaFinOferta) }} - Tiempo restante:
                                <span :class="{
                                    'text-success': !tiemposRestantes[ofe.id].includes('Caducada'),
                                    'text-danger': tiemposRestantes[ofe.id].includes('Caducada')
                                }">
                                    {{ tiemposRestantes[ofe.id] }}
                                </span>
                            </h6>
                        </div>
                        <div v-else>
                            <h6 class="text-danger">La oferta ya caducó</h6>
                        </div>
                        <h6>Categoría / Área: {{ ofe.categoria }}</h6>
                        <p class="text-dark">Descripcion: {{ ofe.descripcion }}</p>
                        <div class="d-flex justify-content-between flex-lg-wrap">
                            <p class="text-dark fs-5 fw-bold mb-0">Nombre de la Empresa: {{ ofe.Empresa }}</p>
                            <router-link :to="{ path: '/postularse/' + idus + '/' + ofe.id }"
                                class="btn border border-secondary rounded-pill px-3 text-primary"><i
                                    class="fa-solid fa-eye me-2 icom"></i> Ver Detalle</router-link>
                        </div>
                    </div>

                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div v-if="filteredofertas.length === 0" class="text-center">
                <h3>No hay ofertas disponibles</h3>
            </div>
            <div class="d-flex justify-content-center mb-4">
                <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-primary text-white">
                    Anterior
                </button>&nbsp;
                <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
                <button @click="nextPage" :disabled="currentPage === lastPage" class="btn btn-primary text-white">
                    Siguiente
                </button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
                &nbsp;&nbsp;&nbsp;
                <button class="btn btn-primary text-white" @click="descargarCSV" v-if="mostrarOpciones3">Descargar en
                    formato CSV</button>
            </div>

        </div>
    </div>
    <div class="container mt-5" v-if="mostrarOpciones3">
        <h4 class="text-center mb-3">Estadísticas de ofertas por empresas</h4>
        <canvas id="graficoOfertas" height="100"></canvas>
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
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
    data() {
        return {
            idus: 0,
            url255: 'http://backendbolsaempleo.test/api/b_e/vin/consultanopostofert',
            url2552: 'http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos',

            ofertas: [],
            filteredofertas: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            filtroEstado: 'todas',
            categoriaSeleccionada: '',
            tiemposRestantes: {},
            tabla: false,
            carrousel: true,
            grafico: null,
            buscando: false,


        }
    },
    mounted() {
        const ruta = useRoute();
        this.idus = ruta.params.id;

        if (this.mostrarOpciones2) {

            this.getOFertas().then(() => {
                this.actualizarTiemposRestantes();
                setInterval(this.actualizarTiemposRestantes, 1000); // Actualiza cada segundo
            });
        } else {
            this.getOFertas2();
        }
    },


    methods: {
        async getOFertas() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url255}?all=true`, {
                    params: { user_id: this.idus }
                });
                const allData = response.data.data;

                this.ofertas = allData;
                this.lastPage = Math.ceil(this.ofertas.length / 10);
                this.updateFilteredData();
                //this.generarGrafico();
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
            }
        },
        async getOFertas2() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url2552}?all=true`);
                const allData = response.data.data;

                this.ofertas = allData;
                this.lastPage = Math.ceil(this.ofertas.length / 10);
                this.updateFilteredData();
                this.generarGrafico();
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
            }
        },
        descargarCSV() {
            const headers = ['ID', 'Empresa', 'Título', 'Categoría', 'Tipo de Contrato', 'Jefe', 'Fin de Oferta', 'Estado de Oferta', 'Publicada', 'Actualizada', 'Cant. Postulados', 'Estado'];
            const rows = this.ofertas.map(post => [
                post.id,
                //ruc de la empresa salga correctamente
                post.Empresa,
                post.titulo,
                post.categoria,
                post.tipo_contrato,
                post.Jefe,
                new Date(post.fechaFinOferta).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                (new Date(post.fechaFinOferta) <= new Date()) ? 'Oferta Caducada' : 'Oferta Vigente',
                new Date(post.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                new Date(post.updated_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
                post.total_postulados,
                (post.estado_ofert == 1) ? 'Habilitado' : 'Deshabilitado',
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
            csvContent += headers.join(';') + '\n';
            rows.forEach(row => {
                csvContent += row.join(';') + '\n';
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'Ofertas_Registradas.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        generarGrafico() {
            const conteoOfertas = {};
            const conteoPostulados = {};

            // Contamos ofertas y postulados por empresa
            this.ofertas.forEach(post => {
                if (!conteoOfertas[post.Empresa]) {
                    conteoOfertas[post.Empresa] = 0;
                    conteoPostulados[post.Empresa] = 0;
                }
                conteoOfertas[post.Empresa]++;
                conteoPostulados[post.Empresa] += post.total_postulados || 0;
            });

            const empresas = Object.keys(conteoOfertas);
            const datosOfertas = Object.values(conteoOfertas);
            const datosPostulados = Object.values(conteoPostulados);

            if (this.grafico) {
                this.grafico.destroy();
            }

            const ctx = document.getElementById('graficoOfertas');

            // Colores fijos para que coincidan con las etiquetas
            const colorOfertas = "hsl(120, 80%, 50%)";   // Verde
            const colorPostulados = "hsl(220, 80%, 50%)"; // Azul

            this.grafico = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: empresas,
                    datasets: [
                        {
                            label: 'Ofertas',
                            data: datosOfertas,
                            backgroundColor: colorOfertas,
                            borderColor: colorOfertas,
                            borderWidth: 1
                        },
                        {
                            label: 'Postulados',
                            data: datosPostulados,
                            backgroundColor: colorPostulados,
                            borderColor: colorPostulados,
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
                                    return `Empresa: ${context[0].label}`;
                                },
                                label: function (context) {
                                    return `${context.dataset.label}: ${context.raw}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                callback: function (value, index) {
                                    const empresa = this.getLabelForValue(value);
                                    return [
                                        `Empresa: ${empresa}`,
                                        `Ofertas: ${datosOfertas[index]}`,
                                        `Postulados: ${datosPostulados[index]}`
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
                    // 🔹 Plugin para colorear cada parte del tick
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
                            ctx.fillText(`Empresa: ${empresas[i]}`, x, y);

                            ctx.fillStyle = colorOfertas;
                            ctx.fillText(`Ofertas: ${datosOfertas[i]}`, x, y + 15);

                            ctx.fillStyle = colorPostulados;
                            ctx.fillText(`Postulados: ${datosPostulados[i]}`, x, y + 30);
                            ctx.restore();
                        });
                    }
                }]
            });
        },
        filterResults() {

            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredofertas = this.ofertas.filter(inves =>
                    inves.ruc.includes(query)
                );
            } else {
                this.buscando = false;
                this.actualizar();
            }
        },


        calcularDiasRestantes(fechaFin) {
            const hoy = new Date();
            const fin = new Date(fechaFin);

            // Limpiar hora para comparar solo fechas
            hoy.setHours(0, 0, 0, 0);
            fin.setHours(0, 0, 0, 0);

            const diferenciaMs = fin - hoy;
            const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

            if (diasRestantes === 0) return 'La oferta Caduca hoy';
            if (diasRestantes < 0) return 'Caducada';
            return `Faltan ${diasRestantes} día(s) para que la oferta caduque`;
        },

        actualizarTiemposRestantes() {
            const ahora = new Date();

            this.ofertas.forEach(ofe => {
                const fin = new Date(ofe.fechaFinOferta);
                const diferenciaMs = fin - ahora;

                if (diferenciaMs <= 0) {
                    // Oferta caducada
                    this.tiemposRestantes[ofe.id] = 'Caducada';
                } else {
                    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
                    const horas = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
                    const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

                    this.tiemposRestantes[ofe.id] =
                        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
                }
            });
        },
        updateFilteredData() {
            let filtradas = this.ofertas;

            if (this.filtroEstado === 'vigente') {
                filtradas = filtradas.filter(ofe => new Date(ofe.fechaFinOferta) > new Date());
            } else if (this.filtroEstado === 'caducada') {
                filtradas = filtradas.filter(ofe => new Date(ofe.fechaFinOferta) <= new Date());
            } else if (this.categoriaSeleccionada !== '') {
                filtradas = filtradas.filter(ofe => ofe.categoria === this.categoriaSeleccionada);
            }

            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredofertas = filtradas.slice(startIndex, endIndex);

            // Actualizar total de páginas (si quieres que se actualice también el número de páginas)
            this.lastPage = Math.ceil(filtradas.length / 10);
        },
        filtrarOfertas() {
            this.currentPage = 1; // Reinicia a la primera página
            this.updateFilteredData();
        },
        filtrarCaTegirias() {
            this.currentPage = 1; // Reinicia a la primera página
            this.updateFilteredData();
        },

        actualizar() {
            if (this.mostrarOpciones2) {

                this.cargando = true;
                this.filtroEstado = 'todas';
                this.categoriaSeleccionada = 'Categorías / Área';
                this.getOFertas()
                window.location.reload()
            } else {
                this.cargando = true;
                this.filtroEstado = 'todas';
                this.categoriaSeleccionada = 'Categorías / Área';
                this.getOFertas2()
                window.location.reload()
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
                confimar('http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos/',
                    id,
                    'Inhabilitar registro',
                    '¿Realmente desea inhabilitar la oferta ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar la oferta:", error);
                this.cargando = false;
            }

        },
        habilitar(id, nombre) {
            try {
                confimarhabi(
                    'http://backendbolsaempleo.test/api/b_e/vin/oferta__empleoshabi/',
                    id,
                    'Habilitar registro',
                    '¿Desea habilitar la oferta ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar la oferta:", error);
                this.cargando = false;
            }
        },


    },
    mixins: [script2],
}
</script>