<template>
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todas las Empresas</h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son todas las Empresas</small>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Registrado</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="8"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="emp,  in this.empresas" :key="emp.id">
                            
                            <td v-text="emp.id"></td>
                            <td v-text="emp.nombre"></td>
                            <td v-text="emp.descripcion"></td>
                            <td v-text="emp.contacto"></td>
                            <td v-text="emp.telefono"></td>
                            <td v-text="emp.direccion"></td>
                            <td v-text="new Date(emp.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                               
                                <button v-if="mostrarOpciones3" class="btn btn-danger" v-on:click="eliminar(emp.id,emp.nombre)">
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
                url255:'http://192.168.1.15/b_e/api/vin/empresas',
                empresas:null,
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.getEmpresas();
        },
       
        methods:{
            getEmpresas(){
                this.cargando=true;
                axios.get(this.url255).then(
                    res =>{
                        this.empresas = res.data;
                        this.cargando = false;
                    }
                   
                );
            },
            eliminar(id,nombre){
                confimar('http://192.168.1.15/b_e/api/vin/empresas/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
           
        },
        mixins: [script2],
    }
</script>