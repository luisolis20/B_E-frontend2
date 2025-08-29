<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;">Ofertas de emprendimientos</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son todas las ofertas de Empleo</small>

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
                <div class="mb-3 col-sm-2 col-md-2 col-xl-2">
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
            <div class="table-container" v-if="tabla">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Título</th>
                            <th scope="col">Categorías</th>
                            <th scope="col">Modalidad</th>
                            <th scope="col">Tipo de Contrato</th>
                            <th scope="col">Jefe</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Finalización de la Oferta</th>
                            <th scope="col">Estado de la Oferta</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="8">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="ofe,  in filteredofertas" :key="ofe.id">

                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.Empresa"></td>
                            <td v-text="ofe.titulo"></td>
                            <td v-text="ofe.categoria"></td>
                            <td v-text="ofe.modalidad"></td>
                            <td v-text="ofe.tipo_contrato"></td>
                            <td v-text="ofe.Jefe"></td>
                            <td v-text="new Date(ofe.created_at).toLocaleDateString('en-US')"></td>
                            <td
                                v-text="new Date(ofe.fechaFinOferta).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil' })">
                            </td>
                            <td>
                                <button v-if="new Date(ofe.fechaFinOferta) <= new Date()"
                                    class="btn btn-danger fw-bold">Oferta Caducada</button>
                                <button v-else class="btn btn-success fw-bold">Oferta Vigente</button>
                            </td>
                            <td>
                                <router-link :to="{ path: '/postularse/' + this.idus + '/' + ofe.id }"
                                    v-if="mostrarOpciones2" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <button v-if="mostrarOpciones3" class="btn btn-danger"
                                    v-on:click="eliminar(ofe.id, ofe.Empresa)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>


                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <br><br>
            <div class="owl-carousel vegetable-carousel justify-content-center" v-if="carrousel">
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
                        <div class="row">
                            <div class="col-md-12 col-lg-3">
                                <div class="text-center">

                                    <img v-if="ofe.fotografia" :src="'data:image/jpeg;base64,' + ofe.fotografia"
                                        width="100%" height="300" style="border-radius: 10px; object-fit: cover;" />
                                    <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                        width="100%" height="300" style="border-radius: 10px; object-fit: cover;" />
                                </div>


                            </div>
                            <div class="col-md-12 col-lg-8">
                                <h4>{{ ofe.titulo }}</h4>
                                <h6>Fecha de publicación: {{ new Date(ofe.created_at).toLocaleDateString('es-ES') }}
                                </h6>
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
                                    <p class="text-dark fs-5 fw-bold mb-0">Nombre del Emprendimiento: {{ ofe.Empresa }}
                                    </p>
                                </div>
                                <div class="text-center">
                                    <br><br><br>
                                    <router-link :to="{ path: '/postularse/' + idus + '/' + ofe.id }"
                                        class="btn border border-secondary rounded-pill px-3 text-primary"><i
                                            class="fa-solid fa-eye me-2 icom"></i> Ver Detalle
                                        Completo</router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div v-if="filteredofertas.length === 0" class="text-center">
                <h3>No hay ofertas disponibles</h3>
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
            </div>

        </div>
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
import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
export default {
    data() {
        return {
            idus: 0,
            url255: 'http://backendbolsaempleo.test/api/b_e/vin/consultanopostempre',
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

        }
    },
    mounted() {
        const ruta = useRoute();
        this.idus = ruta.params.id;
        this.getOFertas().then(() => {
            this.actualizarTiemposRestantes();
            setInterval(this.actualizarTiemposRestantes, 1000); // Actualiza cada segundo
        })
    },


    methods: {
        async getOFertas() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url255}?all=true`, {
                    params: { CIInfPer: this.idus }
                });
                const allData = response.data.data;

                this.ofertas = allData;
                this.lastPage = Math.ceil(this.ofertas.length / 10);
                this.updateFilteredData();
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
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
            this.cargando = true;
            this.filtroEstado = 'todas';
            this.categoriaSeleccionada = 'Categorías / Área';
            this.getOFertas()
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
            confimar('http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos/', id, 'Eliminar registro', '¿Realmente desea eliminar a ' + nombre + '?');
            this.cargando = false;
            this.$router.push('/principal/' + this.idus);

        }

    },
    mixins: [script2],
}
</script>