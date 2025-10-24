<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Lo sentimos, la empresa rechazó tu postulación</h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Detalles de la Postulación Rechazada
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Empresa</label>
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
                                        <label for="Examplename" class="form-label text-dark">Jefe de la Empresa</label>
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
                                        <label for="" class="text-dark">Estimado/a: {{ ApellInfPer }} {{ ApellMatInfPer
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
import { mostraralertas, enviarsolig, mostraralertas2 } from '@/assets/scripts/scriptfunciones/funciones';
import { getMe } from '@/store/auth';
import customscript from '@/assets/scripts/custom.js';

export default {
    data() {
        return {
            ide: 0,
            idus: 0,
            idn: 0,
            empresa: '',
            titulo: '',
            direccion: '',
            rechazo_detalle: '',
            ApellInfPer: '',
            ApellMatInfPer: '',
            NombInfPer: '',
            telefono: '',
            jornada: '',
            tipo_contrato: '',
            modalidad: '',
            categoria: '',
            jefe: '',
            urk32: `${__API_BOLSA__}/b_e/vin/consultaofert`,
            url214: '',

            cargando: false,
        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;

        //this.idn = usuario.CIInfPer;
       


        this.urk32 += '/' + this.idus;
        this.url214 = `${__API_BOLSA__}/b_e/vin/estadopostuser/` + customscript.computed.idUsuario();
        Promise.all([
            this.getEmpresa(),
            this.getDetalle(),

        ])
        //console.log(this.rechazo_detalle);

    },
    computed: {

    },
    methods: {
        async fetchData(url) {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error al obtener datos desde ${url}:`, error);
                return [];
            }
        },

        getEmpresa() {
            axios.get(this.urk32).then(
                res => {
                    this.empresa = res.data.data[0].Empresa;
                    this.titulo = res.data.data[0].titulo;
                    this.direccion = res.data.data[0].direccion;
                    this.telefono = res.data.data[0].telefono;
                    this.jornada = res.data.data[0].jornada;
                    this.tipo_contrato = res.data.data[0].tipo_contrato;
                    this.modalidad = res.data.data[0].modalidad;
                    this.categoria = res.data.data[0].categoria;
                    this.jefe = res.data.data[0].Jefe;
                }
            );
        },
        getDetalle() {
            axios.get(this.url214).then(res => {
                const data = res.data.data;

                // Buscar el registro donde estado es 'Rechazada'
                const rechazo = data.find(post => post.estado === 'Rechazada');

                // Buscar nombre desde cualquier registro si existe
                if (data.length > 0) {
                    this.ApellInfPer = data[0].ApellInfPer;
                    this.ApellMatInfPer = data[0].ApellMatInfPer;
                    this.NombInfPer = data[0].NombInfPer;
                }

                // Asignar el detalle del rechazo si lo hay
                this.rechazo_detalle = rechazo?.detalle_estado || 'Sin detalles disponibles';
            }).catch(error => {
                console.error('Error al obtener detalle:', error);
                this.rechazo_detalle = 'Error al cargar el detalle';
            });
        },





    },
    name: 'rechazopostempresa',
};
</script>