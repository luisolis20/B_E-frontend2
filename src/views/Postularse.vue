<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Detalles de la Oferta</h1>
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
                                        <label for="Examplename" class="form-label text-dark">Empresa</label>
                                        <input type="text" v-model="empresa" class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Titulo de la Oferta</label>
                                        <input type="text" v-model="titulo" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Jefe de la Empresa</label>
                                        <input type="text" v-model="jefe" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Jornada</label>
                                        <input type="text" v-model="jornada" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tipo de contrato</label>
                                        <input type="text" v-model="tipo_contrato" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Modalidad</label>
                                        <input type="text" v-model="modalidad" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Categoría</label>
                                        <input type="text" v-model="categoria" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Requisitos</label>
                                        <textarea type="text" v-model="requisitos" class="form-control py-3 border-1 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripcion</label>
                                        <textarea name="text" v-model="descripcion" class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            ¿Deseas Postularte a esta oferta de empleo? 
                                        </div>
                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <button v-on:click="guardar" class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Si, Deseo Postularme</button>
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
import axios from 'axios';
import store from '@/store';
import {mostraralertas, enviarsolig, mostraralertas2} from '@/assets/scripts/scriptfunciones/funciones';

export default {
   data(){
        return{
            ide:0,
            idus:0,
            empresa:'',
            titulo:'',
            descripcion:'',
            requisitos:'',
            jornada:'',
            tipo_contrato:'',
            modalidad:'',
            categoria:'',
            jefe:'',
            urk32:'http://192.168.1.15/b_e/api/vin/consultaofert',
            apiBaseUrl: "http://cvubackendv2.test/api/v1",
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
            cargando: false,
            filteredDatosPersonales: [],
        }
    },
    mounted(){
        const ruta = useRoute();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;

        this.urk32 +=  '/'+this.idus;
        
        Promise.all([
                this.getUsuario_CVN(),
                this.getEmpresa(),
    
            ])
        
        
    },
    computed: {
    // Generar dinámicamente las URLs basadas en el ID del usuario actual
        generatedUrls() {
            return {
                formacion: `${this.apiBaseUrl}/formacion_academica/${this.ide}`,
                experiencia: `${this.apiBaseUrl}/experiencia_profesionale/${this.ide}`,
                declaracion: `${this.apiBaseUrl}/declaracion_personal/${this.ide}`,
                habilidades: `${this.apiBaseUrl}/habilidades_informatica/${this.ide}`,
                idiomas: `${this.apiBaseUrl}/idioma/${this.ide}`,
                contacto: `${this.apiBaseUrl}/informacion_contacto/${this.ide}`,
                cursos: `${this.apiBaseUrl}/cursoscapacitacion/${this.ide}`,
                investigacion: `${this.apiBaseUrl}/investigacion_publicacione/${this.ide}`,
                otrosDatos: `${this.apiBaseUrl}/otros_datos_relevante/${this.ide}`,
            };
        }
    },
    methods:{
        async fetchData(url) {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error al obtener datos desde ${url}:`, error);
                return [];
            }
        },
        async getUsuario_CVN() {
            const { formacion, experiencia, declaracion, habilidades, idiomas, contacto, cursos, investigacion, otrosDatos } = this.generatedUrls;

            try {
                // Ejecutar todas las solicitudes en paralelo
                const [
                    formacionData,
                    experienciaData,
                    declaracionData,
                    habilidadesData,
                    idiomasData,
                    contactoData,
                    cursosData,
                    investigacionData,
                    otrosDatosData
                ] = await Promise.all([
                    this.fetchData(formacion),
                    this.fetchData(experiencia),
                    this.fetchData(declaracion),
                    this.fetchData(habilidades),
                    this.fetchData(idiomas),
                    this.fetchData(contacto),
                    this.fetchData(cursos),
                    this.fetchData(investigacion),
                    this.fetchData(otrosDatos)
                ]);

                // Si el usuario tiene al menos un dato en cualquier tabla, cambiar si_cvn a true
                this.si_cvn = formacionData.length > 0 ||
                    experienciaData.length > 0 ||
                    declaracionData.length > 0 ||
                    habilidadesData.length > 0 ||
                    idiomasData.length > 0 ||
                    contactoData.length > 0 ||
                    cursosData.length > 0 ||
                    investigacionData.length > 0 ||
                    otrosDatosData.length > 0;

            } catch (error) {
                console.error('Error al verificar los datos del CVN:', error);
                this.si_cvn = false; // En caso de error, se asume que no está completo
            }
        },
        getEmpresa(){
           axios.get(this.urk32).then(
                res=>{
                    this.empresa=res.data.data[0].Empresa;
                    this.titulo=res.data.data[0].titulo;
                    this.descripcion=res.data.data[0].descripcion;
                    this.requisitos=res.data.data[0].Requisitos;
                    this.jornada=res.data.data[0].jornada;
                    this.tipo_contrato=res.data.data[0].tipo_contrato;
                    this.modalidad=res.data.data[0].modalidad;
                    this.categoria=res.data.data[0].categoria;
                    this.jefe=res.data.data[0].Jefe;
                }
            );
        },
        async guardar(event) {
            event.preventDefault();

            // Asegúrate de que getUsuario_CVN haya terminado antes de proceder
            await this.getUsuario_CVN();

            const parametros = {
                CIInfPer: this.ide,
                oferta_id: this.idus
            };

            if (this.si_cvn) {
                enviarsolig('POST', parametros, 'http://192.168.1.15/b_e/api/vin/postulacions', 'Postulado con Exito');
                this.$router.push('/principal/' + this.ide);
            } else {
                mostraralertas2("Por requisitos del sistema no puedes postularte hasta que tengas tu CVN. Ve a tu perfil y crea tu CVN", "warning");
            }
        },
        
        

    }
};
</script>