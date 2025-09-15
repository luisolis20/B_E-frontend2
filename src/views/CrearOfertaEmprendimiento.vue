<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Tu Emprendimiento</h1>
                <p class="text-dark">En este apartado visualizarás los datos de tu emprendimiento, no podrás editarlo. Aquí lo que harás es crear una oferta laboral para tu emprendimiento</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Estos son los datos de tu Emprendimiento
                            
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Ruc</label>
                                        <input type="text" v-model="ruc" class="form-control py-3 border-0 text-dark"
                                            id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Nombre del Emprendimiento</label>
                                        <input type="text" v-model="nombre_emprendimiento"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tiempo que tienen el Emprendimiento</label>
                                        <input type="text" v-model="tiempo_emprendimiento"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Horarios de Atención</label>
                                        <input type="text" v-model="horarios_atencion" class="form-control py-3 border-0 text-dark"
                                            id="Examplename" disabled>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Teléfono</label>
                                        <input type="text" v-model="telefono_contacto"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Email</label>
                                        <input type="text" v-model="email_contacto"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Sitio web</label>
                                        <input type="text" v-model="sitio_web"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Redes sociales</label>
                                        <input type="text" v-model="redes_sociales"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Estado actual del Emprendimiento</label>
                                        <input type="text" v-model="estado_empren"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Dirección</label>
                                        <textarea name="text" v-model="direccion"
                                            class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <textarea name="text" v-model="descripcion" class="form-control border-0 text-dark"
                                            id="exampletextarea" cols="30" rows="5" disabled></textarea>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"  v-if="est==1">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            ¿Deseas crear una oferta de empleo para este emprendimiento?
                                        </div>
                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <router-link :to="{ path: '/ofertaempnew/' + ide }"
                                                    class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Haz Clic
                                                    Aquí</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-12 wow fadeIn" data-wow-delay="0.1s"  v-if="est==0">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            El emprendimiento no está disponible para crear ofertas de empleo
                                        </div>
                                        
                                    </div>
                                </div>
                                 <div class="col-12 wow fadeIn" data-wow-delay="0.1s"  v-if="est==2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            El emprendimiento está en proceso de revisión, no está disponible para crear ofertas de empleo
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

export default {
    data() {
        return {
            ide: 0,
            est: 0,
            idususuario: 0,
            ruc: '',
            nombre_emprendimiento: '',
            descripcion: '',
            tiempo_emprendimiento: '',
            horarios_atencion: '',
            direccion: '',
            telefono_contacto: '',
            email_contacto: '',
            sitio_web: '',
            redes_sociales: '',
            estado_empren: '',
            urk3: 'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/consultarediremp',
            cargando: false,
        }
    },
    mounted() {
        const ruta = useRoute();
        this.ide = ruta.params.id;
        this.urk3 += '/' + this.ide;
        this.getEmprendiemi();

    },
    methods: {
         async getEmprendiemi() {
            try {
                const response = await axios.get(this.urk3);
                //console.log(response.data.data);


                if (response.data.data) { 
                    this.ruc = response.data.data[0].ruc;
                    this.nombre_emprendimiento = response.data.data[0].nombre_emprendimiento;
                    this.idususuario = response.data.data[0].CIInfPer;
                    this.descripcion = response.data.data[0].descripcion;
                    this.tiempo_emprendimiento = response.data.data[0].tiempo_emprendimiento;
                    this.horarios_atencion = response.data.data[0].horarios_atencion;
                    this.direccion = response.data.data[0].direccion;
                    this.telefono_contacto = response.data.data[0].telefono_contacto;
                    this.email_contacto = response.data.data[0].email_contacto;
                    this.sitio_web = response.data.data[0].sitio_web;
                    this.redes_sociales = response.data.data[0].redes_sociales;
                    this.est = response.data.data[0].estado_empren;
                    if(this.est==1){
                        this.estado_empren="Disponible"
                    }else if(this.est==2){
                        this.estado_empren="En Revisión"
                    }
                    else{
                        this.estado_empren="No Disponible"
                    }

                } 

            } catch (error) {
                console.error('Error fetching data:', error);

            }


        },



    }
};
</script>