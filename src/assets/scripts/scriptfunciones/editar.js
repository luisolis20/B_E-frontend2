
import { mostraralertas, enviarsoliedit, mostraralertas2 } from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import customscript from '@/assets/scripts/custom.js';
import axios from 'axios';
import store from '@/store';
import jsPDF from 'jspdf';

export default {
    data() {
        return {
            id: 0,
            apellidos: "",
            filteredDatosPersonales: [],
            //Empresa
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: '',
            link: '',
            telf: '',
            direccion: '',
            imagen: '',
            url: 'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/users',

            si_cvn: false,
            no_cvn: true,
            cargando: false,
            //Datos Personales
            urlinformacionpersonal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacionpersonal",
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
            urlformacion_academica: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/formacion_academica",
            urlfichasocioeconomica: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/fichasocioeconomica",
            idformacion_academica: 0,
            idfichasocioeconomica: 0,
            formacion_academica: null,
            titulosUniversitarios: [],
            titulosPosgrado: [],
            titulosBachiller: [],
            //  título universitario
            nuevoTituloUniversitario: {
                titulo_universitario_obtenido: "",
                institucion_universitaria: "",
                fecha_graduacion: "",
                especialidad: ""
            },
            // nuevo título de posgrado
            nuevoTituloPosgrado: {
                titulo_posgrado_obtenido: "",
                institucion_posgrado: "",
                fecha_graduacion_posgrado: "",
                especialidad_posgrado: ""
            },
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
            urlexperiencia_profesionale: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/experiencia_profesionale",
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
            urlinvestigacion_publicacione: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/investigacion_publicacione",
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
            //Idiom
            urlidioma: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/idioma",
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
            urlhabilidades_informatica: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/habilidades_informatica",
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
            urlcursoscapacitacion: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/cursoscapacitacion",
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
            },
            //Datos Relevantes
            urlotros_datos_relevante: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/otros_datos_relevante",
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
            urlinformacion_contacto: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacion_contacto",
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
            urldeclaracion_personal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/declaracion_personal",
            urlDeclaracionPersonal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/sicvn",
            iddeclaracion_personal: 0,
            declaracion_personal: null,
            texto: "",
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
            filtereddeclaracion_personals2: [],
            filteredcursos2: [],
            experiencia_profesionales2: [],
            formacion_academicas2: [],
            habilidades_informaticas2: [],
            filteredidiomas2: [],
            filteredreferencias2: [],
            filteredpublicacion2: [],
            otros_datos_relevantes2: [],
        }
    },
    mounted() {
        const ruta = useRoute();
        this.id = ruta.params.id;
        if (customscript.computed.rolUsuario() == 'Estudiante') {


            this.urlinformacionpersonal += '/' + this.id;
            this.urlformacion_academica += '/' + this.id;
            this.urlexperiencia_profesionale += '/' + this.id;
            this.urlinvestigacion_publicacione += '/' + this.id;
            this.urlidioma += '/' + this.id;
            this.urlhabilidades_informatica += '/' + this.id;
            this.urlotros_datos_relevante += '/' + this.id;
            this.urlinformacion_contacto += '/' + this.id;
            this.urldeclaracion_personal += '/' + this.id;
            this.urlcursoscapacitacion += '/' + this.id;
            this.urlfichasocioeconomica += '/' + this.id;
            Promise.all([
                this.getUsuario_CVN(),
                this.getDatosPersonales(),
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
        } else if (customscript.computed.rolUsuario() == 'Empresa') {
            this.url += '/' + this.id;
            this.getUsuairoSS();
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
        //Datos Personales
        async getDatosPersonales() {
            try {

                const response = await axios.get(this.urlinformacionpersonal);
                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data[0];
                    this.CIInfPer = data.CIInfPer;
                    this.ApellInfPer = data.ApellInfPer;
                    this.ApellMatInfPer = data.ApellMatInfPer;
                    this.apellidos = this.ApellInfPer + ' ' + this.ApellMatInfPer;
                    this.NombInfPer = data.NombInfPer;
                    //this.NacionalidadPer = data.NacionalidadPer;
                    if (data.NacionalidadPer = "EC") {
                        this.NacionalidadPer = "ECUADOR";
                    } else {
                        this.NacionalidadPer = data.NacionalidadPer;
                    }
                    // this.LugarNacimientoPer = data.LugarNacimientoPer;
                    this.FechNacimPer = data.FechNacimPer;
                    //this.GeneroPer = data.GeneroPer;
                    if (data.GeneroPer = "H") {
                        this.GeneroPer = "HOMBRE";
                    } else if (data.GeneroPer = "M") {
                        this.GeneroPer = "MUJER";
                    }
                    this.CiudadPer = data.CiudadPer;
                    this.DirecDomicilioPer = data.DirecDomicilioPer;
                    this.Telf1InfPer = data.Telf1InfPer;
                    this.mailPer = data.mailPer;
                    this.imagen = data.fotografia;
                    const añoActual = new Date().getFullYear();
                    const añoNacimiento = new Date(data.FechNacimPer).getFullYear();
                    this.edad = añoActual - añoNacimiento;

                } else {
                    console.log("usuario sin Datos");
                }
                return response;

            } catch (error) {
                if (error.response?.status === 404) {
                    // ✅ Se controla el error y NO se imprime en consola como un error
                    // ⚠️ Importante: No lanzamos el error ni usamos console.error
                    console.warn("El estudiante no poseee información personal.");
                } else {
                    // ⚠️ Solo mostramos otros errores reales
                    console.error("Error inesperado al obtener la información personal:", error.message);
                }
                return null;

            }
        },
        //Formacion Academica
        async getFormacionAcademica() {
            try {
                const response = await axios.get(this.urlformacion_academica);
                console.log(this.estudioactualmentefacultadcarreras);
                

                if (response.data.data && response.data.data.length > 0) {
                    const data = response.data.data;
                    this.formacion_academicas2= data;

                    // Limpiamos los arreglos existentes
                    this.titulosBachiller = [];
                    this.titulosUniversitarios = [];
                    this.titulosPosgrado = [];
                    this.estudioactualtitulosUniversitarios = [];

                    // Recorremos los datos obtenidos para separar títulos universitarios y de posgrado
                    data.forEach(item => {
                        if (item.estudios_bachiller_culminados === 'Si' && item.titulo_bachiller_obtenido && item.institucion_bachiller) {
                            this.titulosBachiller.push({

                                idformacion_academica: item.id,
                                titulo_bachiller_obtenido: item.titulo_bachiller_obtenido || '',
                                institucion_bachiller: item.institucion_bachiller || '',
                                fecha_graduacion_bachiller: item.fecha_graduacion_bachiller || '',
                                especialidad_bachiller: item.especialidad_bachiller || ''
                            });
                            if (this.titulosBachiller.length > 0) {
                                this.sidatos = false;
                            } else {
                                this.sidatos = true;
                            }
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
                    this.experiencia_profesionales2= data;
                    this.cargosEmpresas = [];
                    this.cargosPasantias = [];

                    data.forEach(item => {
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
                    this.filteredpublicacion2=data;
                    this.publicacionesarray = [];

                    data.forEach(item => {
                        if (item.publicaciones === 'Si' && item.publicacion_tipo && item.publicacion_titulo) {
                            this.publicacionesarray.push({

                                idinvestigacion_publicaciones: item.id,
                                publicacion_tipo: item.publicacion_tipo || '',
                                publicacion_titulo: item.publicacion_titulo || '',
                                link_publicación: item.link_publicación || '',
                                congreso_evento: item.congreso_evento || ''
                            });
                        }


                    });


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
                    this.idiomasarray = [];

                    data.forEach(item => {

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
                    this.habilidades_informaticas2=data;
                    this.habilidades_comunicativas_array = [];
                    this.habilidades_creativas_array = [];
                    this.habilidades_informaticas_array = [];
                    this.habilidades_liderazgo_array = [];
                    this.oficios_subactividades_array = [];
                    this.otro_habilidades_array = [];

                    data.forEach(item => {
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
                    this.filteredcursos2=data;
                    this.curso_capacitacionarray = [];

                    data.forEach(item => {

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
                    this.otros_datos_relevantes2=data;
                    this.otros_datos_personalesarray = [];

                    data.forEach(item => {

                        this.otros_datos_personalesarray.push({

                            idotros_datos_personales: item.id,
                            tipo_logros: item.tipo_logros || '',
                            descripcion_logros: item.descripcion_logros || '',
                            descripcion_fracasos: item.descripcion_fracasos || '',

                        });



                    });


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
                    this.filteredreferencias2=data;
                    this.informacion_contactoarray = [];

                    data.forEach(item => {

                        this.informacion_contactoarray.push({

                            idinformacion_contacto: item.id,
                            referencia_nombres: item.referencia_nombres || '',
                            referencia_apellidos: item.referencia_apellidos || '',
                            referencia_correo_electronico: item.referencia_correo_electronico || '',
                            referencia_telefono: item.referencia_telefono || '',

                        });



                    });



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
                    this.filtereddeclaracion_personals2=data;
                    this.iddeclaracion_personal = data.id;
                    this.texto = data.texto;


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

            const addText = (text, x, y) => {
                doc.setFontSize(11);
                const lines = doc.splitTextToSize(text, pageWidth - x - 10);
                lines.forEach(line => {
                    if (y > pageHeight - marginBottom) {
                        doc.addPage();
                        addHeaderAndFooter(doc);
                        addVerticalLine(doc, marginTop, pageHeight - marginBottom);
                        y = marginTop;
                    }

                    doc.text(line, x, y);
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


            if (this.titulosUniversitarios.length > 0) {
                this.titulosUniversitarios.forEach((nuevouni2) => {

                    titulacioncarr = nuevouni2['titulo_universitario_obtenido'];
                    carrera = "";
                });
                //this.estudioactualtitulosUniversitarios=[];
            }
            else if (this.estudioactualtitulosUniversitarios.length > 0) {
                this.estudioactualtitulosUniversitarios.forEach((nuevouni) => {

                    carrera = nuevouni['carrera_universidad'];
                    titulacioncarr = nuevouni['titulo_carrera_universidad'];
                });
            }
            else {
                titulacioncarr = "Estudiante";
                carrera = "";
            }

            const text = `${this.NombInfPer}\n${this.ApellInfPer} ${this.ApellMatInfPer}\n${titulacioncarr} ${carrera}\n${this.CiudadPer}-${nuevanacionalidad}\n${this.mailPer} `;
            const textWidth = doc.getStringUnitWidth(text) * 5 / doc.internal.scaleFactor;
            const x1 = pageWidth - textWidth - 65;
            const y1 = pageHeight - 50;

            doc.text(text, x1, y1);

            doc.setFontSize(currentFontSize);
            doc.setFont(currentFont.fontName, currentFont.fontStyle);
            doc.setTextColor(currentTextColor);
            // Nueva página con encabezado, pie de página y línea vertical
            doc.addPage();
            addHeaderAndFooter(doc);
            addVerticalLine(doc, marginTop, pageHeight - marginBottom);

            let y = marginTop;

            // Cuadrado para foto tamaño carnet

            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.rect(10, y, 40, 50);

            y += 5;

            // Declaración Personal
            let x = 60;
            y = addSectionHeader('Descripción libre del curriculum', x, y);
            y = addText(`${this.texto}`, x, y);
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
                        y = addText(`${empresa[item.key]}`, x + 60, y);
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
                        y = addText(`${pasn[item.key]}`, x + 60, y);
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
                        { label: 'Likn de la Publicación:', key: 'link_publicación' }
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
                        { label: 'Expresión Escrita:', key: 'expresion_escrita' }
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
                        y = addText(`${habi[item.key]}`, x + 60, y);
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
                        y = addText(`${habic[item.key]}`, x + 60, y);
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
                        y = addText(`${habic4[item.key]}`, x + 60, y);
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
                        y = addText(`${habic5[item.key]}`, x + 60, y);
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
                        y = addText(`${habic6[item.key]}`, x + 60, y);
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
                        y = addText(`${habic7[item.key]}`, x + 60, y);
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
                        y = addText(`${logr[item.key]}`, x + 60, y);
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
                        console.log('Tiene CVN completo');
                        this.si_cvn = true;
                    } else if (hasDataInAtLeastOneTable) {
                        console.log('Tiene CVN incompleto');
                        this.si_cvn = true;
                    } else {
                        console.log('Tiene CVN en proceso');
                        this.si_cvn = true;
                    }

                    return person;
                }).filter(Boolean);


            } catch (error) {
                console.error('Error al verificar los datos del CVN:', error);
                this.si_cvn = false; // En caso de error, se asume que no está completo
            }
        },
        getUsuairoSS() {
            axios.get(this.url).then(
                res => {
                    this.nombre = res.data.data.name;
                    this.email = res.data.data.email;
                    this.password = res.data.data.password;
                    this.rol = res.data.data.role;
                    this.imagen = res.data.data.imagen;
                }
            );
        },
        async actualizar(event) {
            event.preventDefault();
            var mifoto = document.getElementById('fotoimg');
            this.imagen = mifoto.src;
            if (this.nombre.trim() == '') {
                mostraralertas('Ingrese Nombre de Usuario', 'warning', 'nombre');
            }
            else if (this.apellido.trim() == '') {
                mostraralertas('Ingrese Apellido de Usuario', 'warning', 'apellido');
            }
            else if (this.email.trim() == '') {
                mostraralertas('Ingrese Email de Usuario', 'warning', 'email');
            }

            else if (this.telf.trim() == '') {
                mostraralertas('Ingrese Telf de Usuario', 'warning', 'telf');
            }
            else if (this.direccion.trim() == '') {
                mostraralertas('Ingrese Direccion de Usuario', 'warning', 'direccion');
            }
            else {
                var parametros = {
                    firts_name: this.nombre.trim(),
                    last_name: this.apellido.trim(),
                    email: this.email.trim(),
                    password: this.password.trim(),
                    rol: this.rol.trim(),
                    link: this.link.trim(),
                    telefono: this.telf.trim(),
                    direccion: this.direccion.trim(),
                    imagen: this.imagen
                }
                var response = await enviarsoliedit('PUT', parametros, this.url, 'Actualizado');
                store.commit('setemail', this.email);

                this.$router.push('/principal/' + store.state.idusu);


            }
        },
        cargarfoto(event) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                var mifoto = document.getElementById('fotoimg');
                mifoto.src = reader.result;
                // Remover el prefijo data:image/ de la cadena base64
                this.imagen = reader.result.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, "");
            }.bind(this);  // Importante: Usa .bind(this) para acceder a `this.imagen`
        }

    },
    mixins: [customscript]
};