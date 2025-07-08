<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Empresas creadas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son tus Empresas Creadas</small>
             &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <input class="form-control py-3 border-1 text-dark" type="search" placeholder="Buscar"
                            v-model="searchQuery" @input="filterResults" @keypress="onlyNumbers">
                    </form>
                </div>
            </div>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                           <th scope="col">Id</th>
                            <th scope="col">Ruc</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Representante</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="8"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="emp,  in this.filteredempresas" :key="emp.id">
                            
                            <td v-text="emp.idempresa"></td>
                            <td v-text="emp.ruc"></td>
                            <td v-text="emp.empresacorta"></td>
                            <td v-text="emp.lugar"></td>
                            <td v-text="emp.representante"></td>
                            <td v-text="emp.telefono"></td>
                            <td v-text="new Date(emp.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                <router-link :to="{path:'/viewE/'+emp.idempresa}" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <router-link :to="{path:'/editE/'+emp.idempresa}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button class="btn btn-danger" v-on:click="eliminar(emp.idempresa,emp.empresacorta)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </td>
                       </tr>
                        
                    </tbody>
                </table>
            </div>
            <div v-if="filteredempresas.length === 0" class="text-center">
                <h3>No hay Empresas Creadas</h3>
            </div>
            <div class="mt-5">
                <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark" placeholder="Crea Tu Empresa" disabled>
                <router-link  :to="{path:'/empresascreate/'+idus}" class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click Aquí</router-link>
            </div>
            
        </div>
        <div class="d-flex justify-content-center mb-4">
                <button @click="previousPage" :disabled="currentPage === 1 || buscando" class="btn btn-primary text-white">
                    Anterior
                </button>&nbsp;
                <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
                <button @click="nextPage" :disabled="currentPage === lastPage || buscando" class="btn btn-primary text-white">
                    Siguiente
                </button>
        </div>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
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
                url2:'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/empresas',
                empresasprac: [],
                filteredempresas: [],
                searchQuery: '',
                cargando:false,
                currentPage: 1,
                lastPage: 1,
                buscando: false,
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.url2 +=  '/'+this.idus;
            this.getEmpresas();
        },
        methods:{
            async getEmpresas(){
                this.cargando=true;
                try {
                    const response = await axios.get(`${this.url2}?all=true`);
                    const allData = response.data.data;

                    this.empresasprac = allData;
                    this.lastPage = Math.ceil(this.empresasprac.length / 10);
                    this.updateFilteredData();
                } catch (error) {
                    console.error("Error al obtener datos:", error);
                } finally {
                    this.cargando = false;
                }
            },
             updateFilteredData() {
                 // Aplicar paginación local
                const startIndex = (this.currentPage - 1) * 10;
                const endIndex = startIndex + 10;
                this.filteredempresas = this.empresasprac.slice(startIndex, endIndex);
            },
            actualizar() {
                this.cargando = true;
                this.getEmpresas()
            },
            filterResults() {
                const query = this.searchQuery.trim();
                if (query) {
                    this.buscando = true;
                    this.filteredempresas = this.empresasprac.filter(inves =>
                        inves.ruc.includes(query)
                    );
                } else {
                    this.buscando = false;
                    this.actualizar();
                }
            },
            onlyNumbers(event) {
                const charCode = event.which ? event.which : event.keyCode;
                if (charCode < 48 || charCode > 57) {
                    event.preventDefault();
                }
            },
            nextPage() {
                if (this.currentPage < this.lastPage) {
                    this.currentPage++;
                    this.updateFilteredData();
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateFilteredData();
                }
            },
            eliminar(id,nombre){
                confimar('http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/empresas/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>