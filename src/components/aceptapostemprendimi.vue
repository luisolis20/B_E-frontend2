<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Detalles de la postulación</h1>
            </div>
            <div class="row justify-content-center" v-if="estado === 'Aceptada'">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            ¡¡Felicidades el dueño del Emprendimiento ha aceptado tu postulación!!
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Emprendimiento</label>
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
                                        <label for="Examplename" class="form-label text-dark">Jefe/a del Emprendimiento</label>
                                        <input type="text" v-model="jefe" class="form-control py-3 border-1 text-dark"
                                            id="Examplename" disabled>
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
                                        <label for="Examplename" class="form-label text-dark">Categoría</label>
                                        <input type="text" v-model="categoria"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Telf</label>
                                        <input type="text" v-model="telefono"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Dirección</label>
                                        <textarea name="text" v-model="direccion"
                                            class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            ¡La UTLVTE y la Empresa se comunicarán contigo o puedes hacerlo
                                            directamente¡
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>



            </div>
            <div class="row justify-content-center" v-if="estado === 'En proceso'">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            ¡¡Tu postulación está en proceso de revisión por el dueño del Emprendimiento!!
                        </div>
                    </div>
                </div>

            </div>
            <div class="row justify-content-center" v-if="estado === 'Rechazada'">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Lo sentimos, el dueño del Emprendimiento ha rechazado tu postulación
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Emprendimiento</label>
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
                                        <label for="Examplename" class="form-label text-dark">Jefe/a del Emprendimiento</label>
                                        <input type="text" v-model="jefe" class="form-control py-3 border-1 text-dark"
                                            id="Examplename" disabled>
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
                                        <label for="Examplename" class="form-label text-dark">Categoría</label>
                                        <input type="text" v-model="categoria"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Telf</label>
                                        <input type="text" v-model="telefono"
                                            class="form-control py-3 border-1 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Dirección</label>
                                        <textarea name="text" v-model="direccion"
                                            class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Explicación del Rechazo
                                        </div>
                                        <label for="" class="text-dark">{{ Saludo }}: {{ ApellInfPer }} {{ ApellMatInfPer
                                            }} {{ NombInfPer }}. Le informamos que la empresa
                                            rechazó su postulación por lo siguiente:</label>
                                        <label for="" class="text-dark">{{ rechazo_detalle }}</label>
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
import API from '@/assets/scripts/services/axios';
import { mostraralertas, enviarsolig, mostraralertas2 } from '@/assets/scripts/scriptfunciones/funciones';
import customscript from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';

export default {
    data() {
        return {
            ide: 0,
            idus: 0,
            empresa: '',
            titulo: '',
            direccion: '',
            telefono: '',
            jornada: '',
            tipo_contrato: '',
            modalidad: '',
            categoria: '',
            jefe: '',
            urk32: `/b_e/vin/consultaofertempr2`,
            estado: '',
            ApellInfPer: '',
            ApellMatInfPer: '',
            NombInfPer: '',
            rechazo_detalle: '',
            Saludo: '',
            urlinformacionpersonal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacionpersonal",
            

            cargando: false,
        }
    },
   async mounted() {
        const ruta = useRoute();
         const usuario = await getMe();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;

        this.urk32 += '/' + this.idus;
        this.urlinformacionpersonal += '/' + customscript.computed.idUsuario();;
        

        Promise.all([
            this.getEmpresa(),
            this.getDatosPersonales()

        ])


    },
    computed: {

    },
    methods: {
        async fetchData(url) {
            try {
                const response = await API.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error al obtener datos desde ${url}:`, error);
                return [];
            }
        },
         async getDatosPersonales() {
            try {

                const response = await API.get(this.urlinformacionpersonal);
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
                        this.Saludo = "Estimado";
                    } else if (data.GeneroPer = "M") {
                        this.GeneroPer = "MUJER";
                        this.Saludo = "Estimada";
                    }
                    this.CiudadPer = data.CiudadPer;
                    this.DirecDomicilioPer = data.DirecDomicilioPer;
                    this.Telf1InfPer = data.Telf1InfPer;
                    this.mailPer = data.mailPer;
                    this.fotografia = data.fotografia;
                    this.previewFoto = 'data:image/jpeg;base64,' + data.fotografia;
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

        getEmpresa() {

            axios.get(this.urk32).then(
                res => {
                    this.empresa = res.data.data[0].Emprendimiento;
                    this.titulo = res.data.data[0].titulo;
                    this.direccion = res.data.data[0].direccion;
                    this.telefono = res.data.data[0].telefono_contacto;
                    this.jornada = res.data.data[0].jornada;
                    this.tipo_contrato = res.data.data[0].tipo_contrato;
                    this.modalidad = res.data.data[0].modalidad;
                    this.categoria = res.data.data[0].categoria;
                    this.rechazo_detalle = res.data.data[0].detalle_estado;
                    this.estado = res.data.data[0].estado;
                    this.jefe = res.data.data[0].NombInfPer + ' ' + res.data.data[0].ApellInfPer + ' ' + res.data.data[0].ApellMatInfPer;
                }
            );
        },




    },
    name: 'aceptapostemprendimi',
};
</script>