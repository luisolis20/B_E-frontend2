<template>
    <div class="container-fluid py-5">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">

                    <img v-if="fotografia" :src="'data:image/jpeg;base64,' + fotografia" id="fotoimg" width="500"
                        height="500" style="border-radius: 10px;" alt="">
                    <img v-else
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png"
                        id="fotoimg" class="img-fluid rounded" alt="">
                </div>
                <div class="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
                    <small
                        class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                        Perfil del Postulado</small>
                    <h1 class="display-5 mb-4"> Datos del Postulante </h1>

                    <div class="row g-4 text-dark mb-5">
                        <div class="col-sm-12">
                            <i class="fas fa-share text-primary me-2"></i><b>Cédula: </b> {{ CIInfPer }}
                        </div>
                        <div class="col-sm-12">
                            <i class="fas fa-share text-primary me-2"></i><b>Nombres y apellidos: </b> {{ NombInfPer }}
                            {{ ApellInfPer
                            }}{{ ApellMatInfPer }}
                        </div>
                        <div class="col-sm-12">
                            <i class="fas fa-share text-primary me-2"></i><b>Email: </b> {{ mailPer }}
                        </div>
                        <div class="col-sm-6">
                            <i class="fas fa-share text-primary me-2"></i><b>Teléfono: </b>{{ Telf1InfPer }}
                        </div>
                        <div class="col-sm-6">
                            <i class="fas fa-share text-primary me-2"></i><b>Ciudad: </b>{{ CiudadPer }}
                        </div>
                        <div class="col-sm-12">
                            <i class="fas fa-share text-primary me-2"></i><b>Dirección: </b>{{ DirecDomicilioPer }}
                        </div>
                        <div class="col-sm-6">
                            <i class="fas fa-share text-primary me-2"></i><b>Hoja de Vida:</b>
                            <br><br><br>
                            <button v-on:click="visualizarCV" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Visualizar
                                hoja de Vida</button>
                        </div>

                    </div>
                    <div class="row g-5 align-items-center" v-if="si_postula">
                        <div class="col-12">
                            <label class="text-danger">Esta postulación ya ha sido {{ detalle_si }}</label>

                        </div>

                    </div>
                    <div class="row g-5 align-items-center" v-else>
                        <div class="col-6">
                            <a v-on:click="aceptarpost"
                                class="btn btn-primary py-3 px-5 rounded-pill text-white">Aceptar Postulación<i
                                    class="fas fa-arrow-right ps-2"></i></a>

                        </div>
                        <div class="col-6">
                            <a v-on:click="rechazarpost"
                                class="btn btn-primary py-3 px-5 rounded-pill text-white">Rechazar Postulación<i
                                    class="fas fa-arrow-right ps-2"></i></a>

                        </div>
                    </div>
                    <br><br>
                    <div class="col-12 wow fadeIn" data-wow-delay="0.1s" v-if="aceptado_post">
                        <div class="form-group">
                            <label for="exampletextarea" class="form-label text-dark">Detalle el motivo por el cual
                                aceptó la Postulación</label>
                            <textarea name="text" v-model="detalle_estadio" class="form-control border-1 text-dark"
                                id="detalle_estadio" cols="30" rows="5"></textarea>
                        </div>
                        <br><br>
                        <div class="col-6">
                            <a v-on:click="aceptarpost2"
                                class="btn btn-primary py-3 px-5 rounded-pill text-white">Enviar<i
                                    class="fas fa-paper-plane ps-2"></i></a>

                        </div>
                    </div>
                    <div class="col-12 wow fadeIn" data-wow-delay="0.1s" v-if="rechazado_post">
                        <div class="form-group">
                            <label for="exampletextarea" class="form-label text-dark">Detalle el motivo por el cual
                                rechazó la Postulación</label>
                            <textarea name="text" v-model="detalle_estadio" class="form-control border-1 text-dark"
                                id="detalle_estadio" cols="30" rows="5"></textarea>
                        </div>
                        <br><br>
                        <div class="col-6">
                            <a v-on:click="rechazarpost2"
                                class="btn btn-primary py-3 px-5 rounded-pill text-white">Enviar<i
                                    class="fas fa-paper-plane ps-2"></i></a>

                        </div>
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
import { mostraralertas, enviarsoliedit, enviarsolig, enviarsoli } from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import { getMe } from '@/store/auth';
import axios from 'axios';
import API from '@/assets/scripts/services/axios';
import store from '@/store';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    data() {
        return {
            id: 0,
            idus: 0,
            idusest: 0,
            aceptado_post: false,
            rechazado_post: false,
            detalle_estadio: "",
            si_cvn: false,
            no_cvn: false,
            cvincompleto: false,
            cvcompleto: false,
            urlinformacionpersonal: `${__API_CVN__}/cvn/v1/infromaciondata`,
            urlqr: `${__API_CVN__}/cvn/v1/validar`,
            urlstatuscvn: `${__API_CVN__}/cvn/v1/getCVNstatusInd`,
            iddatos_personales: 0,
            datos_personales: null,
            CIInfPer: "",
            ApellInfPer: "",
            ApellMatInfPer: "",
            NombInfPer: "",
            NacionalidadPer: "",
            LugarNacimientoPer: "",
            FechNacimPer: "",
            GeneroPer: "",
            CiudadPer: "",
            DirecDomicilioPer: "",
            Telf1InfPer: "",
            mailPer: "",
            edad: "",
            //Formacion Academica
            url2: "/cvn/v1/formacion_academica",
            url11: "/cvn/v1/fichasocioeconomica",
            urlti: "/cvn/v1/titulog",
            idformacion_academica: 0,
            idfichasocioeconomica: 0,
            formacion_academica: null,


            titulosUniversitarios: [],
            titulosPosgrado: [],
            titulosBachiller: [],
            estudioactualtitulosUniversitarios: [],
            //  título universitario
            nuevoTituloUniversitario: {
                titulo_universitario_obtenido: "",
                institucion_universitaria: "",
                fecha_graduacion: "",
                especialidad: "",
            },
            nuevoTituloUniversitarioUTLVTE: {
                titulo_universitario_obtenido: "",
                institucion_universitaria: "",
                fecha_graduacion: "",
                especialidad: "",
            },
            tituloUniversitarioEditIndex: null,
            // nuevo título de posgrado
            nuevoTituloPosgrado: {
                titulo_posgrado_obtenido: "",
                institucion_posgrado: "",
                fecha_graduacion_posgrado: "",
                especialidad_posgrado: ""
            },
            nuevoTituloPosgradoUTLVTE: {
                titulo_posgrado_obtenido: "",
                institucion_posgrado: "",
                fecha_graduacion_posgrado: "",
                especialidad_posgrado: ""
            },
            tituloPosgradoEditIndex: null,
            // nuevo título de Bachiller
            nuevoTituloBachiller: {
                titulo_bachiller_obtenido: "",
                institucion_bachiller: "",
                fecha_graduacion_bachiller: "",
                especialidad_bachiller: ""
            },


            estudios_universitarios_culminados: "",
            estudios_posgrado_culminados: "",
            estudios_bachiller_culminados: "",





            //Experiencias Profesionales
            url3: "/cvn/v1/experiencia_profesionale",
            idexperiencias_profesionales: 0,
            experiencias_profesionales: null,
            mostrarexperienciasprofesionales: true,

            //Estructura para las tablas
            cargosEmpresas: [],
            cargosPasantias: [],
            //  Empresas
            nuevocargosEmpresas: {
                empresa_institucion: "",
                fecha_inicio_empresa: "",
                fecha_fin_empresa: "",
                cargo_desempenado_empresa: "",
                descripcion_funciones_empresa: "",
                logros_resultados_empresa: "",
            },

            // Practicas
            nuevocargosPasantias: {
                empresa_institucion_practicas: "",
                fecha_inicio_practicas: "",
                fecha_fin_practicas: "",
                area_trabajo_practicas: "",
                descripcion_funciones_practicas: "",
            },

            cargos_desempenados: "",
            practicas_profesionales: "",
            fechacargos: "",
            fechaFinLabel: "",


            //fechas del curso
            fechacursos: "",
            fechaFinLabelCursos: "",




            //Investigacion y publicaciones
            url4: "/cvn/v1/investigacion_publicacione",
            idinvestigacion_publicaciones: 0,
            investigacion_publicaciones: null,



            publicaciones: "",
            publicacionesarray: [],
            //  Publicaciones
            nuevaspublicaciones: {
                publicacion_tipo: "",
                publicacion_titulo: "",
                link_publicación: "",
                congreso_evento: "",
            },



            //Idioma
            url5: "/cvn/v1/idioma",
            idlenguaje: 0,
            lenguaje: null,


            idiomasarray: [],
            //  Idiomas
            nuevosidiomas: {
                idioma: "",
                comprension_auditiva: "",
                comprension_lectura: "",
                interaccion_oral: "",
                expresion_oral: "",
                expresion_escrita: "",
                certificado: "",
            },




            //SW
            url6: "/cvn/v1/habilidades_informatica",
            idhabilidades_informaticas: 0,
            habilidades_informaticas: null,

            habilidades_comunicativas_array: [],
            habilidades_creativas_array: [],
            habilidades_liderazgo_array: [],
            habilidades_informaticas_array: [],
            oficios_subactividades_array: [],
            otro_habilidades_array: [],

            //  Habilidades Comunicativas
            nuevashabilidades_comunicativas: {
                habilidades_comunicativas: "",
                descripcion_habilidades_comunicativas: "",
            },

            //  Habilidades Creativas
            nuevashabilidades_creativas: {
                habilidades_creativas: "",
                descripcion_habilidades_creativas: "",
            },

            //  Habilidades Liderazgo
            nuevashabilidades_liderazgo: {
                habilidades_liderazgo: "",
                descripcion_habilidades_liderazgo: "",
            },

            //  Habilidades Infotm
            nuevashabilidades_informaticas_cv: {
                habilidades_informaticas_cv: "",
                descripcion_habilidades_informaticas_cv: "",
            },

            //  Habilidades Oficios
            nuevasoficios_subactividades: {
                oficios_subactividades: "",
                descripcion_oficios_subactividades: "",
            },

            //  Habilidades Oficios
            nuevasotro_habilidades: {
                otro_habilidades: "",
            },

            habi_comunicacion: "",
            habi_creacion: "",
            habi_liderazgo: "",
            habi_informaticos_cv: "",
            habi_oficios: "",
            habi_otros_habi: "",




            //Cursos Capacitaciones

            url10: "/cvn/v1/cursoscapacitacion",
            idcursoscapacitaciones: 0,
            curso_capacitacion: null,
            curso_capacitacionarray: [],
            //  curso_capacitacion
            nuevoscurso_capacitacion: {
                intitucion_curso: "",
                tipo_evento: "",
                area_estudios: "",
                nombre_evento: "",
                facilitador_curso: "",
                tipo_certificado: "",
                fecha_inicio_curso: "",
                fecha_fin_curso: "",
                dias_curso: "",
                horas_curso: "",
                certificado: "",
            },



            //Datos Relevantes
            url7: "/cvn/v1/otros_datos_relevante",
            idotros_datos_personales: 0,
            otros_datos_personales: null,


            otros_datos_personalesarray: [],
            //  otros_datos_personales
            nuevosotros_datos_personales: {
                tipo_logros: "",
                descripcion_logros: "",
                descripcion_fracasos: "",
            },



            //Informacion de Contacto
            url8: "/cvn/v1/informacion_contacto",
            idinformacion_contacto: 0,
            informacion_contacto: null,


            informacion_contactoarray: [],
            //  informacion_contacto
            nuevosinformacion_contacto: {
                referencia_nombres: "",
                referencia_apellidos: "",
                referencia_correo_electronico: "",
                referencia_telefono: "",
            },

            //Declaracion Personal
            url9: "/cvn/v1/declaracion_personal",
            iddeclaracion_personal: 0,
            declaracion_personal: null,
            urlqr: "/cvn/v1/validar",


            texto: "",
            titulosEncontrados: [],
            tituloActualIndex: 0,
            titulosEncontradosPosgrado: [],
            tituloActualIndexPosgrado: 0,
            allCVNData: [],
            url44: `/b_e/vin/consultapostuserestado2empr`,
            cargando: false,
            si_postula: false,
            postulacionespr: [],
            detalle_si: "",
            urlest: `/b_e/vin/estadopostuserempr`,

        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.id = ruta.params.id;
        //console.log(this.id);
        this.idus = ruta.params.secondId;
        this.idusest = ruta.params.thirdId;
        //console.log(this.idusest);
        this.url44 += '/' + this.id;
        this.urlest += '/' + this.idusest;
        this.urlstatuscvn += '/' + this.idus;
        this.urlinformacionpersonal += '/' + this.idus;

        Promise.all([
            this.getStatusIUserCVN(),
            this.getCvCompleto(),
            this.getPostulaciones(),

        ])
    },
    methods: {
        async getPostulaciones() {
            this.cargando = true;
            try {

                const response = await API.get(this.url44);
                // Verifica si la respuesta tiene datos válidos
                const allData = response.data?.data || [];
                //console.log(allData);
                if (allData.length > 0) {

                    const detalle_si2 = allData[0].estado;
                    if (detalle_si2 === "En proceso") {
                        this.si_postula = false;
                    } else {
                        this.si_postula = true;
                        this.detalle_si = detalle_si2;
                    }
                } else {
                    this.si_postula = false;
                    this.detalle_si = "";
                }

            }
            catch (error) {
                console.warn("No hay postulaciones para este usuario");
                this.postulacionespr = [];
                this.si_postula = false;
            }

        },
        getFotoUrl(ci) {
            if (!ci) {
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png';
            }
            // Obtenemos la URL base de Axios para asegurarnos de que el endpoint sea absoluto
            const baseURL = API.defaults.baseURL || '';

            // Generamos la URL completa que llama al nuevo método de streaming en Laravel
            return `${__API_CVN__}/cvn/v1/informacionpersonal/${ci}/foto`;
        },
        async getStatusIUserCVN() {


            try {
                // 1. Traer todos los datos de CVN iniciados + el conteo de omitidos
                const response = await API.get(`${this.urlstatuscvn}`);
                const allData = response.data.data;
                this.totalsincvn = response.data.omittedCount || 0;

                // 2. Guardar la data original (solo CVN iniciados)
                this.allCVNData = allData.ApellInfPer;
                this.CIInfPer = allData.CIInfPer;
                this.ApellInfPer = allData.ApellInfPer;
                this.ApellMatInfPer = allData.ApellMatInfPer;
                this.apellidos = this.ApellInfPer + ' ' + this.ApellMatInfPer;
                this.NombInfPer = allData.NombInfPer;
                //this.NacionalidadPer = data.NacionalidadPer;
                if (allData.NacionalidadPer = "EC") {
                    this.NacionalidadPer = "ECUADOR";
                } else {
                    this.NacionalidadPer = allData.NacionalidadPer;
                }
                // this.LugarNacimientoPer = data.LugarNacimientoPer;
                this.FechNacimPer = allData.FechNacimPer;
                //this.GeneroPer = data.GeneroPer;
                if (allData.GeneroPer = "H") {
                    this.GeneroPer = "HOMBRE";
                } else if (data.GeneroPer = "M") {
                    this.GeneroPer = "MUJER";
                }
                this.CiudadPer = allData.CiudadPer;
                this.DirecDomicilioPer = allData.DirecDomicilioPer;
                this.Telf1InfPer = allData.Telf1InfPer;
                this.mailPer = allData.mailPer;
                //console.log(response.data.completionStatus);
                if (response.data.completionStatus === "Completado") {
                    this.cvcompleto = true;
                    this.cvincompleto = false;
                } else if (response.data.completionStatus === "Incompleto") {
                    this.cvcompleto = false;
                    this.cvincompleto = true;
                } else {
                    this.cvcompleto = false;
                    this.cvincompleto = false;
                    this.no_cvn = true;
                }

            } catch (error) {
                console.error("Error al obtener datos:", error);
                this.totalsincvn = 0;
            } finally {
                this.cargando = false;
            }
        },
        async getCvCompleto() {
            try {
                const genhom = "HOMBRE";
                const genMuj = "MUJER";
                const response = await axios.get(`${__API_CVN__}/cvn/v1/cvcompleto/${this.idus}`);
                const data = response.data.data;

                this.datos_personales = data.informacion_personal;
                //console.log(this.datos_personales);
                this.CIInfPer = data.informacion_personal.CIInfPer;
                this.ApellInfPer = data.informacion_personal.ApellInfPer;
                this.ApellMatInfPer = data.informacion_personal.ApellMatInfPer;
                this.NombInfPer = data.informacion_personal.NombInfPer;
                //this.NacionalidadPer = data.NacionalidadPer;
                if (data.informacion_personal.NacionalidadPer == "EC") {
                    this.NacionalidadPer = "ECUADOR";
                } else {
                    this.NacionalidadPer = data.informacion_personal.NacionalidadPer;
                }
                // this.LugarNacimientoPer = data.LugarNacimientoPer;
                this.FechNacimPer = data.informacion_personal.FechNacimPer;
                //this.GeneroPer = data.GeneroPer;
                if (data.informacion_personal.GeneroPer == "M") {
                    this.GeneroPer = genMuj;
                } else {
                    this.GeneroPer = genhom;
                }
                //console.log(data.GeneroPer);
                //console.log(this.GeneroPer);
                this.CiudadPer = data.informacion_personal.CiudadPer.toUpperCase();
                this.DirecDomicilioPer = data.informacion_personal.DirecDomicilioPer;
                this.Telf1InfPer = data.informacion_personal.Telf1InfPer;
                this.mailPer = data.informacion_personal.mailPer;
                this.fotografia = data.informacion_personal.fotografia;
                this.previewFoto = 'data:image/jpeg;base64,' + data.informacion_personal.fotografia;
                const añoActual = new Date().getFullYear();
                const añoNacimiento = new Date(data.informacion_personal.FechNacimPer).getFullYear();
                this.edad = añoActual - añoNacimiento;

                this.formacion_academica = data.formacion_academica;
                //console.log(this.formacion_academica);

                data.formacion_academica.forEach(item => {
                    if (item.estudios_bachiller_culminados === 'Si' && item.titulo_bachiller_obtenido && item.institucion_bachiller) {
                        this.titulosBachiller.push({

                            idformacion_academica: item.id,
                            titulo_bachiller_obtenido: item.titulo_bachiller_obtenido || '',
                            institucion_bachiller: item.institucion_bachiller || '',
                            fecha_graduacion_bachiller: item.fecha_graduacion_bachiller || '',
                            especialidad_bachiller: item.especialidad_bachiller || ''
                        });

                    }
                    if (item.estudios_universitarios_culminados === 'Si' && item.titulo_universitario_obtenido && item.institucion_universitaria) {
                        this.titulosUniversitarios.push({

                            idformacion_academica: item.id,
                            titulo_universitario_obtenido: item.titulo_universitario_obtenido || '',
                            institucion_universitaria: item.institucion_universitaria || '',
                            fecha_graduacion: item.fecha_graduacion || '',
                            especialidad: item.especialidad || ''
                        });

                    }
                    if (item.estudios_universitarios_culminados === 'No' && item.titulo_universitario_obtenido && item.institucion_universitaria) {
                        this.estudioactualtitulosUniversitarios.push({

                            idformacion_academica: item.id,
                            facultades_universidad: item.titulo_universitario_obtenido || '',
                            titulo_carrera_universidad: item.institucion_universitaria || '',
                            fechaestudioactual: item.fecha_graduacion || '',
                            carrera_universidad: item.especialidad || ''
                        });
                    }

                    if (item.estudios_posgrado_culminados === 'Si' && item.titulo_posgrado_obtenido && item.institucion_posgrado) {
                        this.titulosPosgrado.push({

                            idformacion_academica: item.id,
                            titulo_posgrado_obtenido: item.titulo_posgrado_obtenido || '',
                            institucion_posgrado: item.institucion_posgrado || '',
                            fecha_graduacion_posgrado: item.fecha_graduacion_posgrado || '',
                            especialidad_posgrado: item.especialidad_posgrado || ''
                        });

                    }
                });
                this.experiencias_profesionales = data.experiencias_profesionales;
                data.experiencias_profesionales.forEach(item => {
                    if (item.cargos_desempenados === 'Si' && item.empresa_institucion && item.cargo_desempenado_empresa) {
                        this.cargosEmpresas.push({

                            idexperiencias_profesionales: item.id,
                            empresa_institucion: item.empresa_institucion || '',
                            fecha_inicio_empresa: item.fecha_inicio_empresa || '',
                            fecha_fin_empresa: item.fecha_fin_empresa || '',
                            cargo_desempenado_empresa: item.cargo_desempenado_empresa || '',
                            descripcion_funciones_empresa: item.descripcion_funciones_empresa || '',
                            logros_resultados_empresa: item.logros_resultados_empresa || ''
                        });
                        if (item.fecha_inicio_empresa) {
                            const añoInicio = new Date(item.fecha_inicio_empresa).getFullYear();
                            this.fecha_inicio_empresa2 = añoInicio;
                        }
                    }

                    if (item.practicas_profesionales === 'Si' && item.empresa_institucion_practicas && item.area_trabajo_practicas) {
                        this.cargosPasantias.push({

                            idexperiencias_profesionales: item.id,
                            empresa_institucion_practicas: item.empresa_institucion_practicas || '',
                            fecha_inicio_practicas: item.fecha_inicio_practicas || '',
                            fecha_fin_practicas: item.fecha_fin_practicas || '',
                            area_trabajo_practicas: item.area_trabajo_practicas || '',
                            descripcion_funciones_practicas: item.descripcion_funciones_practicas || ''
                        });
                        if (item.fecha_inicio_practicas) {
                            const añoInicio2 = new Date(item.fecha_inicio_practicas).getFullYear();
                            this.fecha_inicio_practicas2 = añoInicio2;
                        }
                    }


                });

                this.investigacion_publicaciones = data.investigacion_publicaciones;
                data.investigacion_publicaciones.forEach(item => {
                    if (item.publicaciones === 'Si' && item.publicacion_tipo && item.publicacion_titulo) {
                        this.publicacionesarray.push({

                            idinvestigacion_publicaciones: item.id,
                            publicacion_tipo: item.publicacion_tipo || '',
                            publicacion_titulo: item.publicacion_titulo || '',
                            link_publicacion: item.link_publicacion || '',
                            congreso_evento: item.congreso_evento || ''
                        });
                    }


                });
                this.idiomas = data.idiomas;
                data.idiomas.forEach(item => {

                    this.idiomasarray.push({

                        idlenguaje: item.id,
                        idioma: item.idioma || '',
                        comprension_auditiva: item.comprension_auditiva || '',
                        comprension_lectura: item.comprension_lectura || '',
                        interaccion_oral: item.interaccion_oral || '',
                        expresion_oral: item.expresion_oral || '',
                        expresion_escrita: item.expresion_escrita || '',
                        certificado: item.certificado || '',
                    });


                });

                this.habilidades_informaticas = data.habilidades_informaticas;
                data.habilidades_informaticas.forEach(item => {
                    if (item.habilidades_comunicativas || item.descripcion_habilidades_comunicativas) {
                        this.habilidades_comunicativas_array.push({

                            idhabilidades_informaticas: item.id,
                            habilidades_comunicativas: item.habilidades_comunicativas || '',
                            descripcion_habilidades_comunicativas: item.descripcion_habilidades_comunicativas || '',
                        });
                    }
                    if (item.habilidades_creativas || item.descripcion_habilidades_creativas) {
                        this.habilidades_creativas_array.push({

                            idhabilidades_informaticas: item.id,
                            habilidades_creativas: item.habilidades_creativas || '',
                            descripcion_habilidades_creativas: item.descripcion_habilidades_creativas || '',
                        });
                    }

                    if (item.habilidades_informaticas_cv || item.descripcion_habilidades_informaticas_cv) {
                        this.habilidades_informaticas_array.push({

                            idhabilidades_informaticas: item.id,
                            habilidades_informaticas_cv: item.habilidades_informaticas_cv || '',
                            descripcion_habilidades_informaticas_cv: item.descripcion_habilidades_informaticas_cv || '',
                        });
                    }
                    if (item.habilidades_liderazgo || item.descripcion_habilidades_liderazgo) {
                        this.habilidades_liderazgo_array.push({

                            idhabilidades_informaticas: item.id,
                            habilidades_liderazgo: item.habilidades_liderazgo || '',
                            descripcion_habilidades_liderazgo: item.descripcion_habilidades_liderazgo || '',
                        });
                    }
                    if (item.oficios_subactividades || item.descripcion_oficios_subactividades) {
                        this.oficios_subactividades_array.push({

                            idhabilidades_informaticas: item.id,
                            oficios_subactividades: item.oficios_subactividades || '',
                            descripcion_oficios_subactividades: item.descripcion_oficios_subactividades || '',
                        });
                    }
                    if (item.otro_habilidades) {
                        this.otro_habilidades_array.push({

                            idhabilidades_informaticas: item.id,
                            otro_habilidades: item.otro_habilidades || '',
                        });
                    }
                });
                this.cursos_capacitacion = data.cursos_capacitacion;
                data.cursos_capacitacion.forEach(item => {

                    this.curso_capacitacionarray.push({

                        idcursoscapacitaciones: item.id,
                        intitucion_curso: item.intitucion_curso || '',
                        tipo_evento: item.tipo_evento || '',
                        area_estudios: item.area_estudios || '',
                        nombre_evento: item.nombre_evento || '',
                        facilitador_curso: item.facilitador_curso || '',
                        tipo_certificado: item.tipo_certificado || '',
                        fecha_inicio_curso: item.fecha_inicio_curso || '',
                        fecha_fin_curso: item.fecha_fin_curso || '',
                        dias_curso: item.dias_curso || '',
                        horas_curso: item.horas_curso || '',

                    });



                });
                this.otros_datos_relevantes = data.otros_datos_relevantes;
                data.otros_datos_relevantes.forEach(item => {

                    this.otros_datos_personalesarray.push({

                        idotros_datos_personales: item.id,
                        tipo_logros: item.tipo_logros || '',
                        descripcion_logros: item.descripcion_logros || '',
                        descripcion_fracasos: item.descripcion_fracasos || '',

                    });



                });
                this.informacion_contacto = data.informacion_contacto;
                data.informacion_contacto.forEach(item => {

                    this.informacion_contactoarray.push({

                        idinformacion_contacto: item.id,
                        referencia_nombres: item.referencia_nombres || '',
                        referencia_apellidos: item.referencia_apellidos || '',
                        referencia_correo_electronico: item.referencia_correo_electronico || '',
                        referencia_telefono: item.referencia_telefono || '',

                    });



                });
                this.declaracion_personal = data.declaracion_personal;
                this.texto = data.declaracion_personal.texto;
                this.titulos_grado = data.titulos_grado;
                this.titulos_posgrado = data.titulos_posgrado;

            } catch (error) {
                console.error("Error al obtener el CV completo:", error);
            }
        },

        async visualizarCV() {
            const doc = new jsPDF('p', 'mm', 'a4');

            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();
            const headerHeight = 30;
            const footerHeight = 20;
            const marginTop = headerHeight + 10;
            const marginBottom = footerHeight + 10;
            const contentHeight = pageHeight - marginTop - marginBottom;
            const leftMargin = 75;
            const headerImageUrl = require('@/assets/img/portada.png');
            const footerImageUrl = require('@/assets/img/imagenfondo.png');

            const headerImg = await this.toDataURL(headerImageUrl);
            const footerImg = await this.toDataURL(footerImageUrl);
            // === Generar código único + fecha + QR ===
            const timestamp = new Date();
            const fechaFormateada = timestamp.toLocaleString('es-EC', { timeZone: 'America/Guayaquil' });
            const codigoUnico = uuidv4().split('-')[0].toUpperCase();


            // 🔗 URL de validación
            const urlVerificacion = `http://192.168.1.19/cvn/validacion_cvn`;
            // === Preparar formato de nombre completo ===
            const nombreCompleto = `${this.NombInfPer} ${this.ApellInfPer} ${this.ApellMatInfPer}`.trim();

            // Texto embebido dentro del QR
            const textoQR = `CVN generado por: ${nombreCompleto}\nFecha: ${fechaFormateada}\nCódigo: ${codigoUnico}\nVerificar en: ${urlVerificacion}`;

            // Generar QR
            const qrDataURL = await QRCode.toDataURL(textoQR, {
                width: 100,
                margin: 1,
                color: { dark: "#126E1B", light: "#FFFFFF" }
            });

            // Enviar registro de validación al backend
            try {
                await enviarsoligqr('POST', {
                    CIInfPer: this.CIInfPer,
                    nombres: this.NombInfPer,
                    apellidos: `${this.ApellInfPer} ${this.ApellMatInfPer}`,
                    codigo_unico: codigoUnico,
                }, this.urlqr);
            } catch (error) {
                console.error("Error guardando validación del CVN:", error);
            }


            const addHeaderAndFooter = (doc, isFirstPage = false) => {
                if (isFirstPage) {
                    doc.addImage(headerImg, 'JPEG', 0, 0, pageWidth, pageHeight);
                } else {
                    doc.addImage(footerImg, 'JPEG', 0, 0, pageWidth, pageHeight);
                }
            };

            const addVerticalLine = (doc, yStart, yEnd) => {
                doc.setDrawColor(0, 0, 0);
                doc.setLineWidth(0.5);
                doc.line(55, yStart, 55, yEnd);
            };

            const addSectionHeader = (text, x, y) => {
                doc.setFontSize(14);
                doc.setFont('Arial', 'bold');
                doc.text(text, x, y);
                doc.setDrawColor(0, 0, 0);
                doc.setLineWidth(0.5);
                doc.line(x, y + 2, pageWidth - 10, y + 2);
                doc.setFont('Arial', 'normal');
                return y + 14;
            };

            const addText = (text, x, y, justify = false) => {
                doc.setFontSize(11);
                const maxWidth = pageWidth - x - 10;
                const lines = doc.splitTextToSize(text, maxWidth);

                lines.forEach((line, i) => {
                    if (y > pageHeight - marginBottom) {
                        doc.addPage();
                        addHeaderAndFooter(doc);
                        addVerticalLine(doc, marginTop, pageHeight - marginBottom);
                        y = marginTop;
                    }

                    if (justify && i !== lines.length - 1) {
                        // 🔹 Justificar todas las líneas menos la última
                        const textWidth = doc.getTextWidth(line);
                        const spaces = line.split(" ").length - 1;
                        const extraSpace = (maxWidth - textWidth) / spaces;

                        let cursor = x;
                        line.split(" ").forEach(word => {
                            doc.text(word, cursor, y);
                            cursor += doc.getTextWidth(word + " ") + extraSpace;
                        });
                    } else {
                        doc.text(line, x, y);
                    }

                    y += 5;
                });
                return y;
            };

            const addBoldText = (text, x, y) => {
                doc.setFontSize(12);
                doc.setFont('Arial', 'bold');
                doc.text(text, x, y);
                doc.setFont('Arial', 'normal');
                return y + 5;
            };

            const addBoldText3 = (text, x, y) => {
                doc.setFontSize(12);
                doc.setFont('Arial', 'bold');
                doc.text(text, x, y);
                doc.setDrawColor(0, 0, 0);
                doc.setLineWidth(0.5);
                doc.line(x, y + 2, pageWidth - 10, y + 2);
                doc.setFont('Arial', 'normal');
                return y + 5;
            };

            const addBoldText2 = (text, x, y) => {
                doc.setFontSize(11);
                doc.setFont('Arial', 'bold');
                const lines = doc.splitTextToSize(text, pageWidth - x - 10);

                lines.forEach(line => {
                    if (y > pageHeight - marginBottom) {
                        doc.addPage();
                        addHeaderAndFooter(doc);
                        addVerticalLine(doc, marginTop, pageHeight - marginBottom);
                        y = marginTop;
                        doc.setFont('Arial', 'bold');
                    }
                    doc.text(line, x, y);
                });

                doc.setFont('Arial', 'normal');
                return y;
            };

            // Portada
            addHeaderAndFooter(doc, true);

            const currentFontSize = doc.internal.getFontSize();
            const currentFont = doc.internal.getFont();
            const currentTextColor = doc.getTextColor();

            // Agregar texto en la portada
            const date = new Date();
            const options = { month: 'numeric', day: 'numeric', year: 'numeric' };

            doc.setFontSize(15);
            doc.setTextColor(2, 107, 41);
            doc.setFont('Arial', 'bold');
            let nuevanacionalidad;
            let carrera;
            let titulacioncarr;
            if (this.NacionalidadPer = 'EC') {
                nuevanacionalidad = 'ECUADOR'
            } else {
                nuevanacionalidad = this.NacionalidadPer
            }





            // === Función para abreviar títulos universitarios ===
            const abreviarTitulo = (titulo, genero = "M") => {
                if (!titulo) return "";

                const t = titulo.toLowerCase();

                // Títulos de grado
                if (t.includes("ingeniero")) return genero === "F" ? "Ing." : "Ing.";
                if (t.includes("ingeniera")) return genero === "F" ? "Ing." : "Ing.";
                if (t.includes("licenciado")) return genero === "F" ? "Lic." : "Lic.";
                if (t.includes("licenciada")) return genero === "F" ? "Lcda." : "Lcda.";
                if (t.includes("arquitecto")) return genero === "F" ? "Arq" : "Arq.";
                if (t.includes("doctor") || t.includes("medicina")) return "Dr.";
                if (t.includes("abogado")) return genero === "F" ? "Abg.a" : "Abg.";
                if (t.includes("tecnólogo")) return genero === "F" ? "Tnlg.a" : "Tnlg.";
                if (t.includes("bachiller")) return genero === "F" ? "Bch.a" : "Bch.";

                // Títulos de posgrado
                if (t.includes("magister") || t.includes("maestría") || t.includes("maestria")) return "MSc.";
                if (t.includes("doctorado") || t.includes("phd")) return "PhD.";
                if (t.includes("especialista")) return "Esp.";
                if (t.includes("postgrado") || t.includes("posgrado")) return "Pg.";
                if (t.includes("master")) return "MSc.";

                return titulo; // Si no se detecta abreviación, dejar original
            };

            // === Detectar género ===
            let genero = "M"; // por defecto Hombre
            if (this.GeneroPer && this.GeneroPer.toUpperCase().startsWith("M")) {
                genero = "F";
            }

            // === Tomar los títulos más recientes ===
            let tituloUniv = "";
            let tituloPos = "";

            if (this.titulosUniversitarios.length > 0) {
                const masRecienteU = this.titulosUniversitarios.reduce((a, b) =>
                    new Date(b.fecha_graduacion) > new Date(a.fecha_graduacion) ? b : a
                );
                tituloUniv = abreviarTitulo(masRecienteU.titulo_universitario_obtenido, genero);
            }

            if (this.titulosPosgrado.length > 0) {
                const masRecienteP = this.titulosPosgrado.reduce((a, b) =>
                    new Date(b.fecha_graduacion_posgrado) > new Date(a.fecha_graduacion_posgrado) ? b : a
                );
                tituloPos = abreviarTitulo(masRecienteP.titulo_posgrado_obtenido, genero);
            }

            // === Si aún estudia, usar el título en curso ===
            /*if (!tituloUniv && this.estudioactualtitulosUniversitarios.length > 0) {
                const actual = this.estudioactualtitulosUniversitarios[0];
                tituloUniv = abreviarTitulo(actual.titulo_carrera_universidad, genero);
            }*/

            // === Armar la cadena final ===
            let lineaTitulo = "";

            if (tituloUniv && tituloPos) {
                lineaTitulo = `${tituloUniv} ${nombreCompleto}, ${tituloPos}`;
            } else if (tituloUniv) {
                lineaTitulo = `${tituloUniv} ${nombreCompleto}`;
            } else {
                lineaTitulo = `${nombreCompleto}`;
            }

            // === Mostrar texto más pequeño ===
            doc.setFontSize(13);
            doc.setTextColor(2, 107, 41);
            doc.setFont('Arial', 'bold');

            const text = `${lineaTitulo}\n${this.CiudadPer}-${nuevanacionalidad}\n${this.mailPer}`;
            const textWidth = doc.getStringUnitWidth(text) * 5 / doc.internal.scaleFactor;
            const x1 = pageWidth - textWidth - 85;
            const y1 = pageHeight - 70;

            doc.text(text, x1, y1);
            // === Añadir QR solo en portada ===
            const qrSize = 25;
            const qrX = pageWidth / 2 - qrSize / 2;
            const qrY = pageHeight - 45;
            doc.addImage(qrDataURL, 'PNG', qrX, qrY, qrSize, qrSize);

            doc.setFontSize(9);
            doc.setTextColor(60, 60, 60);
            doc.setFont('Arial', 'bold');
            doc.text(`Código de validación del CVN: ${codigoUnico}\nValida tu CVN aquí: ${urlVerificacion}`, qrX + qrSize / 2, qrY + qrSize + 5, { align: 'center' });
            // doc.text(`Valida tu CVN aquí: ${urlVerificacion}`);

            doc.setFontSize(currentFontSize);
            doc.setFont(currentFont.fontName, currentFont.fontStyle);
            doc.setTextColor(currentTextColor);
            // Nueva página con encabezado, pie de página y línea vertical
            doc.addPage();
            addHeaderAndFooter(doc);
            addVerticalLine(doc, marginTop, pageHeight - marginBottom);

            let y = marginTop;

            // === Cuadro + Foto tamaño carnet ===
            const fotoX = 10;
            const fotoY = y;
            const fotoAncho = 40;
            const fotoAlto = 50;

            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.rect(fotoX, fotoY, fotoAncho, fotoAlto); // recuadro

            // 🔹 Si hay foto, añadir dentro del recuadro
            if (this.fotografia) {
                try {
                    const fotoData = await this.toDataURL(`data:image/png;base64,${this.fotografia}`);
                    doc.addImage(fotoData, 'PNG', fotoX, fotoY, fotoAncho, fotoAlto);
                } catch (error) {
                    console.error("Error al cargar la foto:", error);
                }
            }

            y += 5;

            // Declaración Personal
            let x = 60;
            y = addSectionHeader('Descripción libre del curriculum', x, y);
            y = addText(`${this.texto}`, x, y, true);
            y = addBoldText('', x, y);

            // Datos personales
            y = addSectionHeader('1. Datos Personales', x, y);

            const personalData = [
                { label: 'Nombres y Apellidos:', value: `${this.NombInfPer} ${this.ApellInfPer} ${this.ApellMatInfPer}` },
                { label: 'Número de Identificación:', value: `${this.CIInfPer}` },
                { label: 'Nacionalidad:', value: `${nuevanacionalidad}` },
                { label: 'Fecha de Nacimiento:', value: `${this.FechNacimPer}` },
                //{ label: 'Lugar de Nacimiento:', value: `${this.LugarNacimientoPer}` },
                { label: 'Género:', value: `${this.GeneroPer}` },
                { label: 'Edad:', value: `${this.edad}` },
                { label: 'Dirección de Residencia:', value: `${this.DirecDomicilioPer}` },
                { label: 'Ciudad:', value: `${this.CiudadPer}` },
                { label: 'Teléfono:', value: `${this.Telf1InfPer}` },
                { label: 'Correo Electrónico:', value: `${this.mailPer}` }
            ];

            personalData.forEach(item => {
                y = addBoldText2(item.label, x, y);
                y = addText(item.value, x + 60, y);
            });
            y = addBoldText('', x, y);

            // Formación académica
            if (this.titulosBachiller.length > 0 || this.titulosUniversitarios.length > 0 || this.titulosPosgrado.length > 0) {
                y = addSectionHeader('1.1 Formación Académica', x, y);
            }
            if (this.titulosBachiller.length > 0) {



                y = addBoldText3('1.1.1 Formación Académica - Bachiller', x, y);

                this.titulosBachiller.forEach((bachiller, index) => {
                    y = addBoldText(``, x, y);
                    const formacionAcademicaData = [
                        { label: 'Título de Bachiller:', key: 'titulo_bachiller_obtenido' },
                        { label: 'Institución Educativa:', key: 'institucion_bachiller' },
                        { label: 'Año de Graduación:', key: 'fecha_graduacion_bachiller' },
                        { label: 'Especialidad:', key: 'especialidad_bachiller' }
                    ];

                    formacionAcademicaData.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${bachiller[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }

            if (this.titulosUniversitarios.length > 0) {


                y = addBoldText3('1.1.2 Formación Académica - Universitarios', x, y);

                this.titulosUniversitarios.forEach((universitario, index) => {
                    y = addBoldText(``, x, y);
                    const formacionAcademicaData2 = [
                        { label: 'Título Universitario:', key: 'titulo_universitario_obtenido' },
                        { label: 'Institución Educativa:', key: 'institucion_universitaria' },
                        { label: 'Año de Graduación:', key: 'fecha_graduacion' },
                        { label: 'Especialidad:', key: 'especialidad' }
                    ];

                    formacionAcademicaData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${universitario[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.estudioactualtitulosUniversitarios.length > 0) {
                //console.log(this.estudioactualtitulosUniversitarios);
                y = addBoldText3('Formación Académica - Estudios Universitarios Actuales UTLVTE', x, y);
                this.estudioactualtitulosUniversitarios.forEach((estudioactual, index) => {
                    y = addBoldText(``, x, y);
                    const formacionAcademicaData4 = [
                        { label: 'Facultad:', key: 'facultades_universidad' },
                        { label: 'Especialidad:', key: 'carrera_universidad' }
                    ];
                    formacionAcademicaData4.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${estudioactual[item.key]}`, x + 60, y);
                    });
                    y = addBoldText('', x, y);
                });
            }

            if (this.titulosPosgrado.length > 0) {


                y = addBoldText3('1.1.3 Formación Académica - Posgrados', x, y);

                this.titulosPosgrado.forEach((posgrado, index) => {
                    y = addBoldText(``, x, y);
                    const formacionAcademicaData3 = [
                        { label: 'Título Posgrado:', key: 'titulo_posgrado_obtenido' },
                        { label: 'Institución Educativa:', key: 'institucion_posgrado' },
                        { label: 'Año de Graduación:', key: 'fecha_graduacion_posgrado' },
                        { label: 'Especialidad:', key: 'especialidad_posgrado' }
                    ];

                    formacionAcademicaData3.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${posgrado[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }

            // Experiencias Profesionales
            if (this.cargosEmpresas.length > 0 || this.cargosPasantias.length > 0) {
                y = addSectionHeader('2. Experiencias Profesionales', x, y);
            }
            if (this.cargosEmpresas.length > 0) {

                y = addBoldText3('2.1 Experiencias Profesionales - Empresa', x, y);

                this.cargosEmpresas.forEach((empresa, index) => {
                    y = addBoldText(``, x, y);
                    const experienciaData = [
                        { label: 'Empresa / Institución:', key: 'empresa_institucion' },
                        { label: 'Cargos Desempeñados:', key: 'cargo_desempenado_empresa' },
                        { label: 'Descripción de Funciones:', key: 'descripcion_funciones_empresa' },
                        { label: 'Logros:', key: 'logros_resultados_empresa' }
                    ];

                    experienciaData.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${empresa[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });

                y = addBoldText('', x, y);
            }

            if (this.cargosPasantias.length > 0) {


                y = addBoldText3('2.2 Experiencias Profesionales - Prácticas', x, y);

                this.cargosPasantias.forEach((pasn, index) => {
                    y = addBoldText(``, x, y);
                    const experienciaData = [
                        { label: 'Empresa / Institución:', key: 'empresa_institucion_practicas' },
                        { label: 'Cargos Desempeñados:', key: 'area_trabajo_practicas' },
                        { label: 'Descripción de Funciones:', key: 'descripcion_funciones_practicas' }
                    ];

                    experienciaData.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${pasn[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });

                y = addBoldText('', x, y);
            }
            // Publicaciones
            if (this.publicacionesarray.length > 0) {
                y = addSectionHeader('3. Publicaciones', x, y);


                this.publicacionesarray.forEach((publi, index) => {
                    y = addBoldText3(`Publicación #${index + 1}`, x, y);
                    y = addBoldText(``, x, y);
                    const publicacionData2 = [
                        { label: 'Tipo de Publicación:', key: 'publicacion_tipo' },
                        { label: 'Título de la Publicación:', key: 'publicacion_titulo' },
                        { label: 'Likn de la Publicación:', key: 'link_publicacion' }
                    ];

                    publicacionData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${publi[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            // Idiomas
            if (this.idiomasarray.length > 0) {
                y = addSectionHeader('4. Idiomas', x, y);

                this.idiomasarray.forEach((idio, index) => {
                    y = addBoldText3(`Idioma #${index + 1}`, x, y);
                    y = addBoldText(``, x, y);
                    const idiomasData2 = [
                        { label: 'Idioma:', key: 'idioma' },
                        { label: 'Comprensión Auditiva:', key: 'comprension_auditiva' },
                        { label: 'Comprensión de Lectura:', key: 'comprension_lectura' },
                        { label: 'Interacción Oral:', key: 'interaccion_oral' },
                        { label: 'Expresión Oral:', key: 'expresion_oral' },
                        { label: 'Expresión Escrita:', key: 'expresion_escrita' },
                        { label: 'Certificado:', key: 'certificado' }
                    ];

                    idiomasData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${idio[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            // Habilidades
            if (this.habilidades_comunicativas_array.length > 0 || this.habilidades_creativas_array.length > 0 || this.habilidades_liderazgo_array.length > 0 || this.habilidades_informaticas_array.length > 0 || this.oficios_subactividades_array.length > 0 || this.otro_habilidades_array.length > 0) {
                y = addSectionHeader('5. Habilidades', x, y);
            }

            if (this.habilidades_comunicativas_array.length > 0) {

                y = addBoldText3('Habilidades Comunicativas', x, y);
                this.habilidades_comunicativas_array.forEach((habi, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData2 = [
                        { label: 'Habilidad:', key: 'habilidades_comunicativas' },
                        { label: 'Descripción:', key: 'descripcion_habilidades_comunicativas' }
                    ];

                    habilidadData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habi[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.habilidades_creativas_array.length > 0) {
                y = addBoldText3('Habilidades Creativas', x, y);
                this.habilidades_creativas_array.forEach((habic, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData3 = [
                        { label: 'Habilidad:', key: 'habilidades_creativas' },
                        { label: 'Descripción:', key: 'descripcion_habilidades_creativas' }
                    ];

                    habilidadData3.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habic[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.habilidades_liderazgo_array.length > 0) {
                y = addBoldText3('Habilidades de Liderazgo', x, y);
                this.habilidades_liderazgo_array.forEach((habic4, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData4 = [
                        { label: 'Habilidad:', key: 'habilidades_liderazgo' },
                        { label: 'Descripción:', key: 'descripcion_habilidades_liderazgo' }
                    ];

                    habilidadData4.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habic4[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.habilidades_informaticas_array.length > 0) {
                y = addBoldText3('Habilidades Informáticas', x, y);
                this.habilidades_informaticas_array.forEach((habic5, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData5 = [
                        { label: 'Habilidad:', key: 'habilidades_informaticas_cv' },
                        { label: 'Descripción:', key: 'descripcion_habilidades_informaticas_cv' }
                    ];

                    habilidadData5.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habic5[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.oficios_subactividades_array.length > 0) {
                y = addBoldText3('Oficios/Subactividades', x, y);
                this.oficios_subactividades_array.forEach((habic6, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData6 = [
                        { label: 'Oficio/Subactividad:', key: 'oficios_subactividades' },
                        { label: 'Descripción:', key: 'descripcion_oficios_subactividades' }
                    ];

                    habilidadData6.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habic6[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            if (this.otro_habilidades_array.length > 0) {
                y = addBoldText3('Otras Habilidades', x, y);
                this.otro_habilidades_array.forEach((habic7, index) => {

                    y = addBoldText(``, x, y);
                    const habilidadData7 = [
                        { label: 'Descripción:', key: 'otro_habilidades' }
                    ];

                    habilidadData7.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${habic7[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            // Cursos
            if (this.curso_capacitacionarray.length > 0) {
                y = addSectionHeader('6. Cursos', x, y);

                this.curso_capacitacionarray.forEach((cur, index) => {
                    y = addBoldText3(`Curso #${index + 1}`, x, y);
                    y = addBoldText(``, x, y);
                    const cursosData2 = [
                        { label: 'Nombre Evento:', key: 'nombre_evento' },
                        { label: 'Nombre del Facilitador:', key: 'facilitador_curso' },
                        { label: 'Institución:', key: 'intitucion_curso' },
                        { label: 'Tipo de Evento:', key: 'tipo_evento' },
                        { label: 'Area de Estudios:', key: 'area_estudios' },
                        { label: 'Tipó de Certificado:', key: 'tipo_certificado' },
                        { label: 'Dias:', key: 'dias_curso' },
                        { label: 'Horas:', key: 'horas_curso' }
                    ];

                    cursosData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${cur[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            // Logros
            if (this.otros_datos_personalesarray.length > 0) {
                y = addSectionHeader('7. Logros y Fracasos', x, y);

                this.otros_datos_personalesarray.forEach((logr, index) => {
                    y = addBoldText3(`Logro #${index + 1}`, x, y);
                    y = addBoldText(``, x, y);
                    const logrosData2 = [
                        { label: 'Tipo de Logro:', key: 'tipo_logros' },
                        { label: 'Descripción:', key: 'descripcion_logros' },
                        { label: 'Descripción de Fracasos:', key: 'descripcion_fracasos' }
                    ];

                    logrosData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${logr[item.key]}`, x + 60, y, true);
                    });

                    y = addBoldText('', x, y);
                });
                y = addBoldText('', x, y);
            }
            // Referencias
            if (this.informacion_contactoarray.length > 0) {
                y = addSectionHeader('8. Referencias Personales', x, y);

                this.informacion_contactoarray.forEach((info, index) => {
                    y = addBoldText3(`Referencia #${index + 1}`, x, y);
                    y = addBoldText(``, x, y);
                    const inforData2 = [
                        { label: 'Nombres:', key: 'referencia_nombres' },
                        { label: 'Apellidos:', key: 'referencia_apellidos' },
                        { label: 'Correo Electrónico:', key: 'referencia_correo_electronico' },
                        { label: 'Teléfono:', key: 'referencia_telefono' }
                    ];

                    inforData2.forEach(item => {
                        y = addBoldText2(item.label, x, y);
                        y = addText(`${info[item.key]}`, x + 60, y);
                    });

                    y = addBoldText('', x, y);
                });
            }

            // Visualizar el PDF
            const pdfUrl = doc.output('bloburl');  // Obtiene la URL temporal del PDF
            window.open(pdfUrl);
            console.clear();
            //doc.save(`CVN-${this.CIInfPer}-${this.NombInfPer} ${this.ApellInfPer} ${this.ApellMatInfPer}.pdf`);
        },


        toDataURL(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/jpeg');
                    resolve(dataURL);
                };
                img.onerror = () => {
                    reject(new Error('Error al cargar la imagen.'));
                };
                img.src = url;
            });
        },
        async aceptar() {


            try {
                // Enviar el correo electrónico
                const responseCorreo = await API.post(`/b_e/vin/enviar-aceptacion-postulacion`, {

                    email: this.email.trim(),
                    firts_name: this.nombre.trim(),
                });

                // Verificar si el correo se envió correctamente
                if (responseCorreo.status === 200) {
                    // Si el correo se envió correctamente, proceder a eliminar la postulación

                    const responseEliminar = await API.delete('/b_e/vin/postulacions/' + this.id);

                    // Verificar si la postulación se eliminó correctamente
                    if (responseEliminar.status === 200) {
                        // Mostrar mensaje de éxito al usuario
                        mostraralertas('Correo enviado y postulación eliminada con éxito', 'success');

                    } else {
                        // Si hubo un error al eliminar la postulación, mostrar mensaje de error
                        mostraralertas('Error al eliminar la postulación', 'error');
                    }
                } else {
                    // Si hubo un error al enviar el correo, mostrar mensaje de error
                    mostraralertas('Error al enviar el correo electrónico', 'error');
                }
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al realizar la acción.");
            }

            /*   try {
   
                   const responseCorreo = await axios.post("/b_e/vin/enviar-aceptacion-postulacion",
                       {
                           email: this.email.trim(),
                           firts_name:this.nombre.trim(),
                       }
                   );
                   console.log(response);
                   mostraralertas('Postulacion Aceptada', 'success');
                   this.$router.push('/principal/' + store.state.idusu);
   
               } catch (error) {
                   console.error(error);
                   alert("Ocurrió un error al enviar el correo electrónico.");
               }*/

        },
        aceptarpost() {
            this.aceptado_post = true;
            if (this.rechazado_post) {
                this.rechazado_post = false;
            }

        },
        async aceptarpost2() {
            const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DDTHH:mm:ss');

            const parametros = {
                postulacion_empren_id: this.id,
                estado: "Aceptada",
                fecha: fechaEcuador,
                detalle_estado: this.detalle_estadio,
            };
            await enviarsoliedit('PUT', parametros, this.urlest, 'Postulación Aceptada');
            this.$router.push('/postuladosallemp/' + this.id);

        },
        rechazarpost() {
            this.rechazado_post = true;
            if (this.aceptado_post) {
                this.aceptado_post = false;
            }


        },
        async rechazarpost2() {
            const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DDTHH:mm:ss');

            const parametros = {
                postulacion_empren_id: this.id,
                estado: "Rechazada",
                fecha: fechaEcuador,
                detalle_estado: this.detalle_estadio,
            };
            await enviarsoliedit('PUT', parametros, this.urlest, 'Postulación Rechazada');
            this.$router.push('/postuladosallemp/' + this.id);

        },

    },
    name: "perfilpostuladoemprendimiento",




};
</script>