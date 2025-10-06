<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary" v-if="mostrarOpciones2">Postula a esta oferta</h1>
                <h1 class="display-2 text-primary" v-if="mostrarOpciones3 && estado_oferta == 1">Oferta Aprobada</h1>
                <h1 class="display-2 text-primary" v-if="mostrarOpciones3 && estado_oferta == 0">Oferta No Aprobada</h1>
                <p class="text-dark" v-if="mostrarOpciones2">Estos son los datos de la oferta. Te recordamos que si no
                    posees un CVN no vas a poder postular a la oferta, revisa
                    en tu perfil tu CVN antes de postular.</p>
                <p class="text-dark" v-if="mostrarOpciones3 && estado_oferta == 2">Estos son los datos de la oferta.
                    Antes
                    de aprobar la oferta, revisa que todos los datos sean correctos.</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Datos de la Oferta
                        </div>
                        <form>
                            <div class="testimonial-inner-img">
                                <img v-if="previewFotologo" :src="previewFotologo" class="img-fluid rounded-circle"
                                    alt="Image">
                                <img v-else-if="logo" :src="'data:image/png;base64,' + logo"
                                    class="img-fluid rounded-circle" alt="Image">
                                <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                    class="img-fluid rounded-circle" alt="Image">
                            </div>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Nombre del
                                            Emprendimiento</label>
                                        <input type="text" v-model="empresa"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Titulo de la
                                            Oferta</label>
                                        <input type="text" v-model="titulo" class="form-control py-3 border-1 text-dark"
                                            id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Dueño del
                                            emprendimiento</label>
                                        <input type="text" :value="Nombres + ' ' + Apellidos + ' ' + ApellidosM"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Jornada</label>
                                        <input type="text" v-model="jornada"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tipo de contrato</label>
                                        <input type="text" v-model="tipo_contrato"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Modalidad</label>
                                        <input type="text" v-model="modalidad"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Fecha de Vigencia de la
                                            oferta</label>
                                        <input type="date" v-model="Fechafinofer"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Categoría</label>
                                        <input type="text" v-model="categoria"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <textarea name="text" v-model="descripcion"
                                            class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>


                                <div class="col-lg-12  wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Requisitos</label>
                                        <textarea cols="30" rows="5" name="text" v-model="requisitos"
                                            class="form-control border-1 text-dark" id="exampletextarea"
                                            disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <img v-if="previewFoto" :src="previewFoto" id="fotoimg" width="100%"
                                            height="300" class="img-fluid" />
                                        <img v-else-if="fotografia" :src="'data:image/png;base64,' + fotografia"
                                            width="100%" height="300" class="img-fluid" />
                                        <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                            width="100%" height="300" class="img-fluid" />
                                    </div>
                                    <br><br>
                                </div>
                                <div class="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <img v-if="previewFoto2" :src="previewFoto2" id="fotoimg" width="100%"
                                            height="300" class="img-fluid" />
                                        <img v-else-if="fotografia2" :src="'data:image/png;base64,' + fotografia2"
                                            width="100%" class="img-fluid" />
                                        <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                            width="100%" class="img-fluid" />
                                    </div>
                                    <br><br>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s" v-if="mostrarOpciones2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            ¿Deseas Postularte a esta oferta de empleo?
                                        </div>

                                        <div class="mt-4" v-if="postulosii">

                                            <label for="" class="text-success">Usted {{ mi_cvn }}, puedes verlo en tu
                                                <router-link
                                                    :to="{ path: '/perfil/' + this.ide }">perfil</router-link></label>

                                            <div v-if="new Date(this.Fechafinofer) <= new Date()"
                                                class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-danger">La Oferta ya caducó, por ende no
                                                    puedes postular a ella</label>
                                            </div>
                                            <div v-else class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Al postularte a esta oferta, el dueño del
                                                    emprendimiento verá tu CVN y datos personales, sabiendo esto ¿Deseas
                                                    postularte?</p>
                                                <div>
                                                    <button v-on:click="guardar"
                                                        class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Si,
                                                        Deseo Postularme</button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <router-link :to="{ path: '/principal/' + this.ide }"
                                                        class="btn btn-danger btn-primary-outline-0 py-3 px-5 text-white">No,
                                                        No Deseo Postularme</router-link>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                        <div class="mt-4" v-else>
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-dark">!Valla parece que no posees un CVN
                                                    Institucional!, si no tienes tu CVN debes:</label>
                                                <p class="text-dark"><i class="fa fa-check text-primary me-3"></i>Ir a
                                                    la página oficial del CVN dando clic <a
                                                        href="http://vinculacionconlasociedad.utelvt.edu.ec/cvn/home"
                                                        target="_blank" rel="noopener noreferrer">aquí</a></p>
                                                <p class="text-dark"><i class="fa fa-check text-primary me-3"></i>Volver
                                                    a postular a la oferta</p>
                                                <label for="" class="text-danger">Si el problema persiste comunícate con
                                                    nosotros/as al siguente correo: vinculacion@utelvt.edu.ec</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="mostrarOpciones3 && estado_oferta == 2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            --------------------
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-success">Esta oferta de empelo fue enviada el
                                                {{ formatFecha(updated_at) }}</label>


                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Luego de revisar la oferta. ¿Deseas aceptarla?, al
                                                    aceptarla o rechazarla le llegará la notificación al correo </p>
                                                <div>
                                                    <button :disabled="botonesBloqueados"
                                                        @click.prevent="habilitar(idus, titulo)"
                                                        class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Si,
                                                        Aceptar la oferta</button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button :disabled="botonesBloqueados"
                                                        @click.prevent="eliminar(idus, titulo)"
                                                        class="btn btn-danger btn-primary-outline-0 py-3 px-5 text-white">No,
                                                        Rechazar la oferta</button>
                                                </div>
                                            </div>
                                            <br>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="mostrarOpciones3 && estado_oferta == 1 || estado_oferta == 0">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative"
                                        v-if="estado_oferta == 1">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Oferta de Emprenidimiento aprobada
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-success">Esta oferta de emprendimiento fue
                                                aprobada el: </label>

                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-dark">{{ formatFecha(updated_at) }}</label>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="text-center border border-secondary p-4 my-4 position-relative"
                                        v-if="estado_oferta == 0">
                                        <div class="fw-bold text-secondary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Oferta de Emprenidimiento no aprobada
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-danger">Esta oferta de emprendimiento fue
                                                rechazada el: </label>

                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-dark">{{ formatFecha(updated_at) }}</label>
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
    </div>
</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>

import { useRoute } from 'vue-router';
import script2 from '@/assets/scripts/custom.js';
import axios from 'axios';
import store from '@/store';
import { mostraralertas, enviarsolig, mostraralertas2, enviarsolig23, confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
import dayjs from 'dayjs';
import { getMe } from '@/store/auth';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


export default {
    data() {
        return {
            ide: 0,
            idus: 0,
            empresa: '',
            titulo: '',
            descripcion: '',
            requisitos: '',
            jornada: '',
            tipo_contrato: '',
            modalidad: '',
            categoria: '',
            Fechafinofer: '',
            Apellidos: '',
            ApellidosM: '',
            Nombres: '',
            logo: '',
            fotografia2: '',
            previewFoto2: '',
            fotografia: '',
            previewFoto: '',
            previewFotologo: '',
            estado_oferta: 0,
            botonesBloqueados: false,
            updated_at: '',
            urlofeempre: 'http://backendbolsaempleo.test/api/b_e/vin/view-oferta_empleos_emprendimiento',
            urk32: 'http://backendbolsaempleo.test/api/b_e/vin/consultaofertempr',
            url255: 'http://backendbolsaempleo.test/api/b_e/vin/postulacionemprendi',
            apiBaseUrl: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1",
            urls: {

                formacion: '', // URL de formación académica
                experiencia: '', // URL de experiencia profesional
                declaracion: '', // URL de declaración personal
                habilidades: '', // URL de habilidades informáticas
                idiomas: '', // URL de idiomas
                contacto: '', // URL de información de contacto
                cursos: '', // URL de cursos y capacitaciones
                investigacion: '', // URL de investigación y publicaciones
                otrosDatos: '', // URL de otros datos relevantes
            },
            si_cvn: false,
            mi_cvn: '',

            postulosii: false,
            cargando: false,
            filteredDatosPersonales: [],
            filtereddeclaracion_personals2: [],
            filteredcursos2: [],
            experiencia_profesionales2: [],
            formacion_academicas2: [],
            habilidades_informaticas2: [],
            filteredidiomas2: [],
            filteredreferencias2: [],
            filteredpublicacion2: [],
            otros_datos_relevantes2: [],
            urlinformacionpersonal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacionpersonal",
            urlformacion_academica: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/formacion_academica",
            urlexperiencia_profesionale: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/experiencia_profesionale",
            urlinvestigacion_publicacione: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/investigacion_publicacione",
            urlidioma: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/idioma",
            urlhabilidades_informatica: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/habilidades_informatica",
            urlcursoscapacitacion: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/cursoscapacitacion",
            urlotros_datos_relevante: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/otros_datos_relevante",
            urlinformacion_contacto: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacion_contacto",
            urldeclaracion_personal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/declaracion_personal",

        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;

        this.urk32 += '/' + this.idus;
        this.urlinformacionpersonal += '/' + this.ide;
        this.urlformacion_academica += '/' + this.ide;
        this.urlexperiencia_profesionale += '/' + this.ide;
        this.urlinvestigacion_publicacione += '/' + this.ide;
        this.urlidioma += '/' + this.ide;
        this.urlhabilidades_informatica += '/' + this.ide;
        this.urlotros_datos_relevante += '/' + this.ide;
        this.urlinformacion_contacto += '/' + this.ide;
        this.urldeclaracion_personal += '/' + this.ide;
        this.urlcursoscapacitacion += '/' + this.ide;
        if (this.mostrarOpciones2) {
            Promise.all([
                this.getUsuario_CVN(),
                this.getEmpresa(),
                this.getDeclaracionPersonal(),
                this.getFormacionAcademica(),
                this.getExperienciasProfesionales(),
                this.getInvestigacionPublicaciones(),
                this.getIdiomas(),
                this.getHabilidadesInformaticas(),
                this.getCursosCapacitaciones(),
                this.getDatosRelevantes(),
                this.getInformacionContacto(),

            ])
        } else {
            this.getEmpresa();
        }



    },
    computed: {
        // Generar dinámicamente las URLs basadas en el ID del usuario actual
        generatedUrls() {
            return {
                formacion: `${this.apiBaseUrl}/formacion_academica/${this.id}`,
                experiencia: `${this.apiBaseUrl}/experiencia_profesionale/${this.id}`,
                declaracion: `${this.apiBaseUrl}/declaracion_personal/${this.id}`,
                habilidades: `${this.apiBaseUrl}/habilidades_informatica/${this.id}`,
                idiomas: `${this.apiBaseUrl}/idioma/${this.id}`,
                contacto: `${this.apiBaseUrl}/informacion_contacto/${this.id}`,
                cursos: `${this.apiBaseUrl}/cursoscapacitacion/${this.id}`,
                investigacion: `${this.apiBaseUrl}/investigacion_publicacione/${this.id}`,
                otrosDatos: `${this.apiBaseUrl}/otros_datos_relevante/${this.id}`,
            };
        }
    },
    methods: {
        async fetchData(url) {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                return [];
            }
        },
        async getUsuario_CVN() {


            try {
                const response = await axios.get(this.urlinformacionpersonal);
                const allData = response.data.data;
                //console.log(response);
                const sortedData = allData.map((person) => {
                    if (!person || !person.CIInfPer) return null;

                    const CIInfPer = person.CIInfPer;

                    const hasDataInAtLeastOneTable =
                        this.filteredcursos2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.experiencia_profesionales2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.formacion_academicas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.habilidades_informaticas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredidiomas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredreferencias2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.otros_datos_relevantes2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredpublicacion2.some((data) => data.CIInfPer === CIInfPer);

                    const hasDataInAllTables =
                        this.filteredcursos2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.experiencia_profesionales2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.formacion_academicas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.habilidades_informaticas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredidiomas2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredreferencias2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.otros_datos_relevantes2.some((data) => data.CIInfPer === CIInfPer) ||
                        this.filteredpublicacion2.some((data) => data.CIInfPer === CIInfPer);

                    // Asignar estado según los datos
                    if (hasDataInAllTables) {
                        this.mi_cvn = 'tiene CVN completo';
                        this.si_cvn = true;
                        this.postulosii = true;
                    } else if (hasDataInAtLeastOneTable) {
                        this.mi_cvn = 'tiene CVN incompleto';
                        this.postulosii = true;
                    } else {
                        this.mi_cvn = 'tiene CVN en proceso';
                        this.postulosii = true;
                    }

                    return person;
                }).filter(Boolean);


            } catch (error) {
                console.error('Error al verificar los datos del CVN:', error);
                this.si_cvn = false; // En caso de error, se asume que no está completo
            }
        },
        async getEmpresa() {
            try {
                const res = await axios.get(this.urk32);
                if (res.data.data) {
                    this.empresa = res.data.data[0].Empresa;
                    this.titulo = res.data.data[0].titulo;
                    this.descripcion = res.data.data[0].descripcion;
                    this.requisitos = res.data.data[0].Requisitos;
                    this.jornada = res.data.data[0].jornada;
                    this.tipo_contrato = res.data.data[0].tipo_contrato;
                    this.modalidad = res.data.data[0].modalidad;
                    this.categoria = res.data.data[0].categoria;
                    this.Fechafinofer = res.data.data[0].fechaFinOferta;
                    this.Apellidos = res.data.data[0].ApellInfPer;
                    this.ApellidosM = res.data.data[0].ApellMatInfPer;
                    this.Nombres = res.data.data[0].NombInfPer;
                    this.estado_oferta = res.data.data[0].estado_ofert_empr;
                    this.logo = res.data.data[0].logo;
                    this.fotografia2 = res.data.data[0].fotografia2;
                    this.fotografia = res.data.data[0].fotografia;
                    this.previewFotologo = 'data:image/png;base64,' + this.logo;
                    this.previewFoto2 = 'data:image/png;base64,' + this.fotografia2;
                    this.previewFoto = 'data:image/png;base64,' + this.fotografia;
                    this.updated_at = res.data.data[0].updated_at;

                }
            } catch (error) {
                console.error('Error fetching empresa data:', error);

            }

        },
        async guardar(event) {
            event.preventDefault();

            // Asegúrate de que getUsuario_CVN haya terminado antes de proceder
            await this.getUsuario_CVN();

            const parametros = {
                CIInfPer: this.ide,
                oferta_emp_id: this.idus
            };

            if (this.si_cvn) {
                const response = await enviarsolig23('POST', parametros, 'http://backendbolsaempleo.test/api/b_e/vin/postulacionemprendi', 'Postulado con éxito');

                const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DDTHH:mm:ss');
                const thisidpostu = response.data.id;
                //console.log(thisidpostu);
                const parametros2 = {
                    postulacion_empren_id: thisidpostu,
                    estado: "En proceso",
                    fecha: fechaEcuador,
                    detalle_estado: "Verificando Datos de postulación",
                };
                axios.post('http://backendbolsaempleo.test/api/b_e/vin/estadopostuserempr', parametros2)
                //enviarsolig('POST', parametros2, 'http://backendbolsaempleo.test/api/b_e/vin/estadopostuserempr', 'Postulación Aceptada');

                this.$router.push('/principal/' + this.ide);
            } else {
                mostraralertas2("Por requisitos del sistema no puedes postularte hasta que tengas tu CVN. Ve a tu perfil y crea tu CVN", "warning");
            }
        },
        //Datos Personales

        //Formacion Academica
        async getFormacionAcademica() {
            try {
                const response = await axios.get(this.urlformacion_academica);
                console.log(this.estudioactualmentefacultadcarreras);


                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.formacion_academicas2 = data;




                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado la formación académica y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener la formación académica:", error.message);
                }
                return null;


            }
        },
        //Experiencias Profesionales
        async getExperienciasProfesionales() {
            try {
                const response = await axios.get(this.urlexperiencia_profesionale);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.experiencia_profesionales2 = data;




                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado la experiencia profesional y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener la experiencia profesional:", error.message);
                }
                return null;

            }
        },
        //Investigacion y Publicaciones
        async getInvestigacionPublicaciones() {
            try {
                const response = await axios.get(this.urlinvestigacion_publicacione);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.filteredpublicacion2 = data;



                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado investigaciones/Publicaciones y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener investigaciones/Publicaciones:", error.message);
                }
                return null;

            }
        },
        //Idiomas
        async getIdiomas() {
            try {
                const response = await axios.get(this.urlidioma);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.filteredidiomas2 = data;


                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado Idiomas y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener Idiomas:", error.message);
                }
                return null;

            }
        },
        //Habilidades Informaticas
        async getHabilidadesInformaticas() {
            try {
                const response = await axios.get(this.urlhabilidades_informatica);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.habilidades_informaticas2 = data;



                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado Habilidades y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener Habilidades:", error.message);
                }
                return null;


            }
        },
        //Cursos Capacitaciones
        async getCursosCapacitaciones() {
            try {
                const response = await axios.get(this.urlcursoscapacitacion);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.filteredcursos2 = data;



                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado Cursos y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener Cursos:", error.message);
                }
                return null;


            }
        },
        //Otros Datos Relevantes
        async getDatosRelevantes() {
            try {
                const response = await axios.get(this.urlotros_datos_relevante);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.otros_datos_relevantes2 = data;



                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado Datos Relevantes y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener Datos Relevantes :", error.message);
                }
                return null;


            }
        },
        //Informacion de Contacto
        async getInformacionContacto() {
            try {
                const response = await axios.get(this.urlinformacion_contacto);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.filteredreferencias2 = data;




                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado Información de Contacto y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener Información de Contacto:", error.message);
                }
                return null;


            }
        },
        //Declaracion Personal
        async getDeclaracionPersonal() {
            try {
                const response = await axios.get(this.urldeclaracion_personal);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data[0];
                    this.filtereddeclaracion_personals2 = data;


                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no ha llenado la declaración personal y es su primera vez (404).");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener la declaración personal:", error.message);
                }
                return null;


            }
        },
        actualizar() {

        },
        async habilitar(id, nombre) {
            try {
                //console.log('funciona')
                const responsae = await confimarhabi(
                    'http://backendbolsaempleo.test/api/b_e/vin/oferta_empleos_emprendimientohabi/',
                    id,
                    'Aprobar oferta',
                    '¿Desea aprobar la oferta ' + nombre + '?',
                    () => {
                        this.botonesBloqueados = true; // ✅ Deshabilitar todos
                        this.actualizar();
                    }   // 👈 callback para refrescar la tabla al confirmar
                );
                //console.log(responsae);
                if (responsae.mensaje === 'Habilitado con Éxito!!') {
                    //console.log('funciona')
                    this.urlofeempre += '/' + id;
                    const response2 = await axios.get(this.urlofeempre);
                    //console.log(response2);
                    const data = response2.data.data[0];

                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/enviar-aprobacion-oferta-emprendimiento", {

                        email: data.email_contacto,
                        firts_name: apellidos,
                        nombreOferta: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento aprobado con éxito', 'success');

                        this.actualizar();
                        this.$router.push('/ofertasallemp/' + this.ide);

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                    }
                }
            } catch (error) {
                console.error("Error al habilitar la oferta:", error);
                //this.cargando = false;
            }
        },
        async eliminar(id, nombre) {
            try {
                const response = await confimar('http://backendbolsaempleo.test/api/b_e/vin/oferta_empleos_emprendimiento/',
                    id,
                    'Rechazar oferta',
                    '¿Realmente desea rechazar la oferta ' + nombre + '?',
                    () => {
                        this.botonesBloqueados = true; // ✅ Deshabilitar todos
                        this.actualizar();
                    }   // 👈 callback para refrescar la tabla al confirmar
                );
                //console.log(response);
                if (response.mensaje === 'Inhabilitado con Éxito!!') {

                    this.urlofeempre += '/' + id;
                    const response2 = await axios.get(this.urlofeempre);

                    const data = response2.data.data[0];

                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/enviar-oferta-rechazo-emprendimiento", {

                        email: data.email_contacto,
                        firts_name: apellidos,
                        nombreOferta: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento rechazado con éxito', 'success');

                        this.actualizar();
                        this.$router.push('/ofertasallemp/' + this.ide);

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                    }
                }
            } catch (error) {
                console.error("Error al eliminar la oferta:", error);
                //this.cargando = false;
            }

        },




    },
    mixins: [script2],
};
</script>