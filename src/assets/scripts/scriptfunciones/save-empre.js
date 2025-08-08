import {mostraralertas, enviarsolig} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
export default {
   data(){
        return{
            idus:0,
            ruc:'',
            nombre:'',
            ciudad:'',
            pais:'',
            telefono:'',
            direccion:'',
            emailempre:'',
            urlempre:'',
            titulorepre:'',
            nombrerepre:'',
            cargorepre:'',
            tipo_empre:'',
            mision:'',
            vision:'',
            url:'http://backendbolsaempleo.test/api/b_e/vin/empresas',
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
            if(this.ruc==''){
                mostraralertas('Ingrese ruc de la empresa','warning','ruc');
            }
            else if(this.nombre==''){
                mostraralertas('Ingrese nombre de la empresa','warning','nombre');
            }
            else if(this.ciudad==''){
                mostraralertas('Ingrese ciudad','warning','ciudad');
            }
            else if(this.pais==''){
                mostraralertas('Ingrese pais','warning','pais');
            }
            
            else if(this.telefono==''){
                mostraralertas('Ingrese telf de la empresa','warning','telefono');
            }
            else if(this.direccion==''){
                mostraralertas('Ingrese dirección de la empresa','warning','direccion');
            }
            else if(this.emailempre==''){
                mostraralertas('Ingrese e-mail de la empresa','warning','emailempre');
            }
            else if(this.urlempre==''){
                mostraralertas('Ingrese url de la empresa','warning','urlempre');
            }
            else if(this.titulorepre==''){
                mostraralertas('Ingrese titulo del representante de la empresa','warning','titulorepre');
            }
            else if(this.nombrerepre==''){
                mostraralertas('Ingrese nombre del representante de la empresa','warning','nombrerepre');
            }
            else if(this.cargorepre==''){
                mostraralertas('Ingrese cargo del representante de la empresa','warning','cargorepre');
            }
            else if(this.tipo_empresa==''){
                mostraralertas('Ingrese tipo de empres','warning','tipo_empresa');
            }
            else if(this.mision==''){
                mostraralertas('Ingrese la misión de la empresa','warning','mision');
            }
            else if(this.vision==''){
                mostraralertas('Ingrese la visión de la empresa','warning','vision');
            }
            
          
            else{
                var parametros = {
                    ruc:this.ruc,
                    empresacorta:this.nombre,
                    lugar:this.ciudad,
                    pais:this.pais,
                    telefono:this.telefono,
                    direccion:this.direccion,
                    email:this.emailempre,
                    url:this.urlempre,
                    titulo:this.titulorepre,
                    representante:this.nombrerepre,
                    cargo:this.cargorepre,
                    tipo:this.tipo_empre,
                    mision:this.mision,
                    vision:this.vision,
                    usuario_id:this.idus

                }
               
                enviarsolig('POST',parametros,'http://backendbolsaempleo.test/api/b_e/vin/empresas','Empresa Creada');
                this.$router.push('/principal/'+this.idus);
            }
        },
        

    }
};