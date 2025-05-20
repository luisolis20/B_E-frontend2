<template>
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todos los Usuarios</h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son todos los Usuarios</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Registrado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="8"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="ofe,  in this.usuarios" :key="ofe.id">
                            
                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.firts_name"></td>
                            <td v-text="ofe.last_name"></td>
                            <td v-text="ofe.email"></td>
                            <td v-text="ofe.rol"></td>
                            <td v-text="ofe.telefono"></td>
                            <td v-text="ofe.direccion"></td>
                            <td>
                                <img v-if="ofe.imagen" style="width: 100px !important;" :src="ofe.imagen" class="img-thumbnail" >
                                <img v-else style="width: 100px !important;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png" class="img-thumbnail" >
                            </td>
                            <td v-text="new Date(ofe.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                <router-link :to="{path:'/useredit/'+ofe.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button v-if="mostrarOpciones3" class="btn btn-danger" v-on:click="eliminar(ofe.id,ofe.Empresa)">
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
    import script2 from '@/assets/scripts/custom.js';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
    export default{
        data(){
            return{
                idus:0,
                url255:'http://backendbolsaempleo.test/api/b_e/vin/users',
                usuarios:null,
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.getOFertas();
        },
       
        methods:{
            getOFertas(){
                this.cargando=true;
                axios.get(this.url255).then(
                    res =>{
                        this.usuarios = res.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://backendbolsaempleo.test/api/b_e/vin/users/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
           
        },
        mixins: [script2],
    }
</script>