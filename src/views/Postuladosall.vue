<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todas las Personas Postuladas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estos son todos los Postulados</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Céd del Postulante</th>
                            <th scope="col">Apellidos del Postulante</th>
                            <th scope="col">Email</th>
                            <th scope="col">Registrado</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="9"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="post,  in this.postulaciones" :key="post.id">
                            
                            <td v-text="post.id"></td>
                            <td v-text="post.Empresa"></td>
                            <td v-text="post.Oferta"></td>
                            <td v-text="post.CIInfPer"></td>
                            <td v-text="post.ApellInfPer"></td>
                            <td v-text="post.mailPer"></td>
                            <!-- Cédula
                            <td>
                                <img v-if="post.imagen" style="width: 100px !important;" :src="post.imagen" class="img-thumbnail" >
                                <img v-else style="width: 100px !important;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png" class="img-thumbnail" >
                            </td>-->
                            <td v-text="new Date(post.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                
                                <router-link :to="{path:'/perfilpostulados/'+post.id+'/'+post.CIInfPer}" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>

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
                url213:'http://192.168.1.15/b_e/api/vin/postulacions',
                postulaciones:null,
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.getPostulaciones();
        },
        methods:{
            getPostulaciones(){
                this.cargando=true;
                console.log(axios.get(this.url213));
                axios.get(this.url213).then(
                    res =>{
                        this.postulaciones = res.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://192.168.1.15/b_e/api/vin/postulacions/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>