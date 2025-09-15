<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todas las Personas Postuladas </h1>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estos son todos los Postulados a Tus Ofertas</small>

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
                            <th scope="col">Céd del Postulante</th>
                            <th scope="col">Apellidos del Postulante</th>
                            <th scope="col">Email</th>
                            <th scope="col">Fecha que Postuló</th>
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
            <div class="d-flex justify-content-center mb-4">
                <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
                &nbsp;&nbsp;&nbsp;
                <button class="btn btn-primary text-white" @click="descargarCSV">Descargar en formato CSV</button>
            </div>
            
        </div>
        <div class="container mt-5">
            <h4 class="text-center mb-3">Estadísticas de Postulaciones por Oferta</h4>
            <canvas id="graficoPostulaciones" height="100"></canvas>
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
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    
    export default{
        data(){
            return{
                idus:0,
                url213:'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/vin/postulacions2',
                postulacionespr: [],
                filteredpostulaciones: [],
                searchQuery: '',
                cargando:false,
                currentPage: 1,
                lastPage: 1,
                buscando: false,
                grafico: null,
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.getPostulaciones();
            
        },
        methods:{
            async getPostulaciones(){
                this.cargando=true;
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
                    this.generarGrafico();
                } catch (error) {
                    console.error("Error al obtener postulaciones:", error);
                    this.postulacionespr = []; // Asegura que no queden datos anteriores
                    this.lastPage = 1;
                    this.updateFilteredData();
                    this.generarGrafico();
                } finally {
                    this.cargando = false;
                }
            },
            generarGrafico() {
                const conteo = {};

                this.postulacionespr.forEach(post => {
                    if (!conteo[post.Oferta]) {
                    conteo[post.Oferta] = 0;
                    }
                    conteo[post.Oferta]++;
                });

                const etiquetas = Object.keys(conteo);
                const datos = Object.values(conteo);

                if (this.grafico) {
                    this.grafico.destroy(); // Si ya existe, destrúyelo antes de crear otro
                }

                const ctx = document.getElementById('graficoPostulaciones');
                const colores = etiquetas.map(() => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
                this.grafico = new Chart(ctx, {
                    type: 'bar', // También puedes probar con 'pie', 'doughnut', 'radar', etc.
                    data: {
                    labels: etiquetas,
                    datasets: [{
                        label: 'Cantidad de Postulaciones',
                        data: datos,
                        backgroundColor: colores,
                        borderColor: colores,
                        borderWidth: 1
                    }]
                    },
                    options: {
                    responsive: true,
                    scales: {
                        y: {
                        beginAtZero: true,
                        stepSize: 1
                        }
                    }
                    }
                });
            },

            descargarCSV() {
                const headers = ['ID', 'Empresa', 'Oferta', 'Cédula', 'Apellidos', 'Email', 'Fecha de Postulación'];
                const rows = this.postulacionespr.map(post => [
                    post.id,
                    post.Empresa,
                    post.Oferta,
                    post.CIInfPer,
                    post.ApellInfPer,
                    post.mailPer,
                    new Date(post.created_at).toLocaleDateString('es-EC')
                ]);

                let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
                csvContent += headers.join(';') + '\n';
                rows.forEach(row => {
                    csvContent += row.join(';') + '\n';
                });

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'EstudiantesPostulados.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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