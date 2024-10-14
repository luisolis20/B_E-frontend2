import {mostraralertas, enviarsolig} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
export default {
   data(){
        return{
            idus:0,
            nombre:'',
            ciudad:'',
            pais:'',
            telefono:'',
            direccion:'',
            tipo_empresa:'',
            mision:'',
            vision:'',
            descripcion:'',
            url:'http://192.168.1.15/b_e/api/vin/empresas',
            cargando: false,
        }
    },
    mounted(){
        const ruta = useRoute();
        this.idus = ruta.params.id;
        this.url +=  '/'+this.idus;
        
        
    },
    methods:{
       
        guardar(event){
            event.preventDefault();
            if(this.nombre.trim()==''){
                mostraralertas('Ingrese nombre de la empresa','warning','nombre');
            }
            else if(this.ciudad.trim()==''){
                mostraralertas('Ingrese ciudad','warning','ciudad');
            }
            else if(this.pais.trim()==''){
                mostraralertas('Ingrese pais','warning','pais');
            }
            
            else if(this.telefono.trim()==''){
                mostraralertas('Ingrese telf de la empresa','warning','telefono');
            }
            else if(this.direccion.trim()==''){
                mostraralertas('Ingrese dirección de la empresa','warning','direccion');
            }
            else if(this.tipo_empresa.trim()==''){
                mostraralertas('Ingrese tipo de empres','warning','tipo_empresa');
            }
            else if(this.mision.trim()==''){
                mostraralertas('Ingrese la misión de la empresa','warning','mision');
            }
            else if(this.vision.trim()==''){
                mostraralertas('Ingrese la visión de la empresa','warning','vision');
            }
            else if(this.descripcion.trim()==''){
                mostraralertas('Ingrese descripción de la Empresa','warning','descripcion');
            }
            else{
                var parametros = {
                    nombre:this.nombre.trim(),
                    ciudad:this.ciudad.trim(),
                    pais:this.pais.trim(),
                    telefono:this.telefono.trim(),
                    direccion:this.direccion.trim(),
                    tipo_empresa:this.tipo_empresa.trim(),
                    mision:this.mision.trim(),
                    vision:this.vision.trim(),
                    descripcion:this.descripcion.trim(),
                    usuario_id:this.idus

                }
               
                enviarsolig('POST',parametros,'http://192.168.1.15/b_e/api/vin/empresas','Empresa Creada');
                this.$router.push('/principal/'+this.idus);
            }
        },
        

    }
};