<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Personas Postuladas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estos son tus Postulados</small>
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
                            <th scope="col">Empresa</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Descripcion</th>
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
                       <tr v-else v-for="post,  in this.filteredpostulaciones" :key="post.id">
                            
                            <td v-text="post.id"></td>
                            <td v-text="post.Empresa"></td>
                            <td v-text="post.Oferta"></td>
                            <td v-text="post.descripcion"></td>
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
        <div v-if="filteredpostulaciones.length === 0" class="text-center">
            <h3>No hay Postulaciones</h3>
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
                url213:'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/postulacions',
                postulacionespr: [],
                filteredpostulaciones: [],
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
            this.url213 +=  '/'+this.idus;
            //console.log(this.url213);
            this.getPostulaciones();
        },
        methods:{
            async getPostulaciones() {
                this.cargando = true;
                try {
                    const response = await axios.get(`${this.url213}?all=true`);
                    
                    // Verifica si la respuesta tiene datos válidos
                    const allData = response.data?.data || [];

                    if (allData.length === 0) {
                        console.warn("No se encontraron postulaciones.");
                    }

                    this.postulacionespr = allData;
                    this.lastPage = Math.ceil(this.postulacionespr.length / 10);
                    this.updateFilteredData();
                } catch (error) {
                    console.error("Error al obtener postulaciones:", error);
                    this.postulacionespr = []; // Asegura que no queden datos anteriores
                    this.lastPage = 1;
                    this.updateFilteredData();
                } finally {
                    this.cargando = false;
                }
            },

            updateFilteredData() {
                 // Aplicar paginación local
                const startIndex = (this.currentPage - 1) * 10;
                const endIndex = startIndex + 10;
                this.filteredpostulaciones = this.postulacionespr.slice(startIndex, endIndex);
            },
            actualizar() {
                this.cargando = true;
                this.getPostulaciones()
            },
            filterResults() {
                const query = this.searchQuery.trim();
                if (query) {
                    this.buscando = true;
                    this.filteredpostulaciones = this.postulacionespr.filter(inves =>
                        inves.CIInfPer.includes(query)
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
                confimar('http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/postulacions/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
        }
    }
</script>