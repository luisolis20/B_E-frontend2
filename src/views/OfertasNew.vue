<template>
    <div class="container-fluid RSVP-form py-5" id="weddingRsvp">
        <div class="container py-5">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Crea Tu Oferta Laboral</h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Registra los Datos de tu oferta
                        </div>
                        <form>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Titulo de la oferta</label>
                                        <input type="text" v-model="titulo" class="form-control py-3 border-1 text-dark" id="Examplename" >
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Jornada</label>
                                        <input type="text" v-model="jornada" class="form-control py-3 border-1 text-dark" id="Examplename" >
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tipo de contrato</label>
                                        <input type="text" v-model="tipo_contrato" class="form-control py-3 border-1 text-dark" id="Examplename" >
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <select v-model="this.categoriaSeleccionada" class="form-control py-3 border-0 text-dark"
                                            id="inputPersonOne">
                                            <option value="" disabled selected>
                                                Categorías / Área
                                            </option>
                                            <option value="Administración y RRHH">Administración y RRHH</option>
                                            <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                                            <option value="Comercial">Comercial</option>
                                            <option value="Comercial, Negocios y Atención al público">Comercial, Negocios y Atención al público
                                            </option>
                                            <option value="Educación y Docencia">Educación y Docencia</option>
                                            <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y Turismo</option>
                                            <option value="Ingenierías">Ingenierías</option>
                                            <option value="Logística y Abastecimiento">Logística y Abastecimiento</option>
                                            <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing, Publicidad, Comunicación y Diseño
                                            </option>
                                            <option value="Oficios">Oficios</option>
                                            <option value="Producción y Operarios">Producción y Operarios</option>
                                            <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina, Farmacia y Bioquímica</option>
                                            <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                                            <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                                            <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                                            <option value="Textil">Textil</option>
                                            <option value="Ventas">Ventas</option>
                                            <option value="Otros">Otros</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Modalidad</label>
                                        <input type="text" v-model="modalidad" class="form-control py-3 border-1 text-dark" id="Examplename" >
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Requisitos</label>
                                        <textarea name="text" v-model="requisistos" class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" ></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <textarea name="text" v-model="descripcion" class="form-control border-1 text-dark" id="exampletextarea" cols="30"
                                            rows="5" ></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                       
                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <button v-on:click="guardar" class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Publicar Oferta</button>
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
import store from '@/store';
import {mostraralertas, enviarsolig} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
export default {
   data(){
        return{
            idus:0,
            titulo:'',
            descripcion:'',
            requisistos:'',
            jornada:'',
            tipo_contrato:'',
            modalidad:'',
            categoriaSeleccionada:'',
            empresa_id:'',
            cargando: false,
        }
    },
    mounted(){
        const ruta = useRoute();
        this.idus = ruta.params.id;
        
        
    },
    methods:{
       
        guardar(event){
            event.preventDefault();
            if(this.titulo.trim()==''){
                mostraralertas('Ingrese Titulo de la Oferta','warning','titulo');
            }
            else if(this.descripcion.trim()==''){
                mostraralertas('Ingrese Descripcion de la Oferta','warning','descripcion');
            }
            else if(this.requisistos.trim()==''){
                mostraralertas('Ingrese requisitos','warning','requisistos');
            }
            else if(this.jornada.trim()==''){
                mostraralertas('Ingrese jornada','warning','jornada');
            }
            else if(this.modalidad.trim()==''){
                mostraralertas('Ingrese modalidad','warning','modalidad');
            }
            
            
            else{
                var parametros = {
                    titulo:this.titulo.trim(),
                    descripcion:this.descripcion.trim(),
                    requisistos:this.requisistos.trim(),
                    jornada:this.jornada.trim(),
                    tipo_contrato:this.tipo_contrato.trim(),
                    categoria:this.categoriaSeleccionada,
                    modalidad:this.modalidad.trim(),
                    empresa_id:this.idus

                }
               
                enviarsolig('POST',parametros,'http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos','Oferta Creada');
                this.$router.push('/empresas/'+store.state.idusu);
            }
        },
        

    }
};
</script>