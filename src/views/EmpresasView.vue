<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Empresas creadas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son tus Empresas Creadas</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">País</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">tipo_empresa</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="8"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="emp,  in this.empresas" :key="emp.id">
                            
                            <td v-text="emp.id"></td>
                            <td v-text="emp.nombre"></td>
                            <td v-text="emp.ciudad"></td>
                            <td v-text="emp.pais"></td>
                            <td v-text="emp.telefono"></td>
                            <td v-text="emp.tipo_empresa"></td>
                            <td v-text="new Date(emp.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                <router-link :to="{path:'/viewE/'+emp.id}" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{path:'/editE/'+emp.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.id,emp.Empresa)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </td>
                       </tr>
                        
                    </tbody>
                </table>
            </div>
            <div class="mt-5">
                <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark" placeholder="Crea Tu Empresa" disabled>
                <router-link  :to="{path:'/empresascreate/'+idus}" class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí</router-link>
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
                url2:'http://backendbolsaempleo.test/api/b_e/vin/empresas',
                empresas:null,
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.url2 +=  '/'+this.idus;
            this.getEmpresas();
        },
        methods:{
            getEmpresas(){
                this.cargando=true;
                axios.get(this.url2).then(
                    res =>{
                        this.empresas = res.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://backendbolsaempleo.test/api/b_e/vin/empresas/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>