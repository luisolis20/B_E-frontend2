<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Detalles de la Oferta</h1>
                <p class="text-dark">Estos son los datos de la oferta. Te recordamos que si no posees un CVN no vas a
                    poder postular a la oferta, revisa
                    en tu perfil tu CVN antes de postular.</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Estos son los datos de la Oferta
                        </div>
                        <form>
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
                                        <label for="Examplename" class="form-label text-dark">Dueño de la
                                            empresa</label>
                                        <input type="text" :value="jefe"
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
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
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
                                                <p class="text-dark">Al postularte a esta oferta la empresa verá tu CVN
                                                    y datos personales, sabiendo esto ¿Deseas postularte?</p>
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
                                                    nosotros/as al correo: vinculacion@utelvt.edu.ec</label>
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
import { getMe } from '@/store/auth';
import API from '@/assets/scripts/services/axios';
import axios from 'axios';
import store from '@/store';
import { mostraralertas, enviarsolig, mostraralertas2, enviarsolig23 } from '@/assets/scripts/scriptfunciones/funciones';
import dayjs from 'dayjs';
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
            jefe: '',

            urk32: `/b_e/vin/consultaofert`,
            no_cvn: false,
            cvincompleto: false,
            cvcompleto: false,
            urlstatuscvn: `${__API_CVN__}/cvn/v1/getCVNstatusInd`,
            si_cvn: false,
            mi_cvn: '',
            Apellidos: '',
            ApellidosM: '',
            Nombres: '',

            postulosii: false,
            cargando: false,
            

        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;

        this.urk32 += '/' + this.idus;
        this.urlstatuscvn += '/' + this.ide;

        Promise.all([
            this.getEmpresa(),
            this.getStatusIUserCVN(),

        ])


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
        getEmpresa() {
            API.get(this.urk32).then(
                res => {
                    this.empresa = res.data.data[0].Empresa;
                    this.titulo = res.data.data[0].titulo;
                    this.descripcion = res.data.data[0].descripcion;
                    this.requisitos = res.data.data[0].Requisitos;
                    this.jornada = res.data.data[0].jornada;
                    this.tipo_contrato = res.data.data[0].tipo_contrato;
                    this.modalidad = res.data.data[0].modalidad;
                    this.categoria = res.data.data[0].categoria;
                    this.Fechafinofer = res.data.data[0].fechaFinOferta;
                    this.jefe = res.data.data[0].Jefe;
                }
            );
        },
        async getStatusIUserCVN() {


            try {
                // 1. Traer todos los datos de CVN iniciados + el conteo de omitidos
                const response = await API.get(`${this.urlstatuscvn}`);
                const allData = response.data.data;
                this.totalsincvn = response.data.omittedCount || 0;

               
                //console.log(response.data.completionStatus);
                if (response.data.completionStatus === "Completado") {
                    this.mi_cvn = 'tiene CVN completo';
                    this.cvcompleto = true;
                    this.cvincompleto = false;
                    this.si_cvn = true;
                    this.postulosii = true;
                } else if (response.data.completionStatus === "Incompleto") {
                    this.mi_cvn = 'tiene CVN incompleto';
                    this.cvcompleto = false;
                    this.cvincompleto = true;
                    this.si_cvn = true;
                    this.postulosii = true;
                } else {
                    
                    this.cvcompleto = false;
                    this.cvincompleto = false;
                    this.no_cvn = true;
                    this.si_cvn = false;
                    this.postulosii = false;
                }

            } catch (error) {
                console.error("Error al obtener datos:", error);
                this.totalsincvn = 0;
            } finally {
                this.cargando = false;
            }
        },
        async guardar(event) {
            event.preventDefault();

            // Asegúrate de que getUsuario_CVN haya terminado antes de proceder
            await this.getStatusIUserCVN();

            const parametros = {
                CIInfPer: this.ide,
                oferta_id: this.idus
            };

            if (this.si_cvn) {
                const response = await enviarsolig23('POST', parametros, `/b_e/vin/postulacions`, 'Postulado con éxito');
                const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DDTHH:mm:ss');
                const thisidpostu = response.data.id;
                //console.log(thisidpostu);
                const parametros2 = {
                    postulacion_id: thisidpostu,
                    estado: "En proceso",
                    fecha: fechaEcuador,
                    detalle_estado: "Verificando Datos de postulación",
                };
                API.post(`/b_e/vin/estadopostuser`, parametros2)
                this.$router.push('/principal/' + this.ide);
            } else {
                mostraralertas2("Por requisitos del sistema no puedes postularte hasta que tengas tu CVN. Ve a tu perfil y crea tu CVN", "warning");
            }
        },
        //Datos Personales

        



    },
    name: 'postularseempresa',
};
</script>