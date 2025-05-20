<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Ofertas creadas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son tus Ofertas Creadas</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Jornada</th>
                            <th scope="col">Tipo de contrato</th>
                            <th scope="col">Modalidad</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="7"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="ofe,  in this.ofertas" :key="ofe.id">
                            
                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.titulo"></td>
                            <td v-text="ofe.jornada"></td>
                            <td v-text="ofe.tipo_contrato"></td>
                            <td v-text="ofe.modalidad"></td>
                            <td v-text="new Date(ofe.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                <router-link :to="{path:'/postulados/'+ofe.id}" class="btn btn-info">
                                   Ver postulados
                                </router-link>
                                &nbsp;
                                <router-link :to="{path:'/ofertasedit/'+ ofe.empresa_id + '/' + ofe.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(ofe.id,ofe.Empresa)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </td>
                       </tr>
                        
                    </tbody>
                </table>
            </div>
            
           
            
        </div>
    </div>
<!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');

</style>
<script>
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
    export default{
        data(){
            return{
                ide:0,
                idus:0,
                url21:'http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos',
                ofertas:null,
                cargando:false
            }
        },
        
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.url21 +=  '/'+this.idus;
            console.log(this.url21);
            this.getOFertas();
        },
        
        methods:{
             getOFertas() {
                this.cargando=true;
                axios.get(this.url21).then(
                    res =>{
                        this.ofertas = res.data.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://backendbolsaempleo.test/api/b_e/vin/oferta__empleos/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>