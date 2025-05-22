<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Tus Postulaciones </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estos son tus Postulaciones</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Registrado</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="5"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="post,  in this.postulaciones" :key="post.id">
                            
                            <td v-text="post.id"></td>
                            <td v-text="post.Empresa"></td>
                            <td v-text="post.Oferta"></td>
                            <td v-text="post.categoria"></td>
                            <td v-text="new Date(post.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                
                                
                                <button class="btn btn-danger" v-on:click="eliminar(post.id,post.Empresa)">
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
                idus:0,
                url213:'http://backendbolsaempleo.test/api/b_e/vin/consultapostuser',
                postulaciones:null,
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.url213 +=  '/'+this.idus;
            //console.log(this.url213);
            this.getPostulaciones();
        },
        methods:{
            getPostulaciones(){
                this.cargando=true;
                console.log(axios.get(this.url213));
                axios.get(this.url213).then(
                    res =>{
                        this.postulaciones = res.data.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://backendbolsaempleo.test/api/b_e/vin/consultapostuser/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.getPostulaciones();
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>