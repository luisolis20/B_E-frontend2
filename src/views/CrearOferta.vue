<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Tu Empresa</h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Estos son los datos de tu Empresa
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Nombre</label>
                                        <input type="text" v-model="nombree" class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Ciudad</label>
                                        <input type="text" v-model="ciudade" class="form-control py-3 border-0 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">País</label>
                                        <input type="text" v-model="paise" class="form-control py-3 border-0 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tipo de Empresa</label>
                                        <input type="text" v-model="tipo_empresae" class="form-control py-3 border-0 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tipo de Empresa</label>
                                        <input type="text" v-model="tipo_empresae" class="form-control py-3 border-0 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                               
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Telefono</label>
                                        <input type="text" v-model="telefonoe" class="form-control py-3 border-0 text-dark" id="Examplename"
                                        disabled>
                                    </div>
                                </div>
                                
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Direccion</label>
                                        <textarea name="text" v-model="direccione" class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Misión</label>
                                        <textarea name="text" v-model="misione" class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Visión</label>
                                        <textarea name="text" v-model="visione" class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <textarea name="text" v-model="descripcione" class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Si deseas crear oferta de Empleo 
                                        </div>
                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <router-link :to="{path:'/ofertanew/'+ide}" class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Click Aquí</router-link>
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

export default {
   data(){
        return{
            ide:0,
            nombree:'',
            ciudade:'',
            paise:'',
            telefonoe:'',
            direccione:'',
            tipo_empresae:'',
            misione:'',
            visione:'',
            descripcione:'',
            usuario_id:'',
            urk3:'http://192.168.1.15/b_e/api/vin/consultaredir',
            cargando: false,
        }
    },
    mounted(){
        const ruta = useRoute();
        this.ide = ruta.params.id;
        this.urk3 +=  '/'+this.ide;
        this.getEmpresa();
        
    },
    methods:{
        getEmpresa(){
           axios.get(this.urk3).then(
                res=>{
                    this.nombree=res.data.data.nombre;
                    this.ciudade=res.data.data.ciudad;
                    this.paise=res.data.data.pais;
                    this.telefonoe=res.data.data.telefono;
                    this.direccione=res.data.data.direccion;
                    this.tipo_empresae=res.data.data.tipo_empresa;
                    this.misione=res.data.data.mision;
                    this.visione=res.data.data.vision;
                    this.descripcione=res.data.data.descripcion;
                    this.usuario_id=res.data.data.usuario_id;
                }
            );
        },
        
        

    }
};
</script>