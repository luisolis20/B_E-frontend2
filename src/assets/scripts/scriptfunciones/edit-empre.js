
import {mostraralertas,enviarsoliedit} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';

export default {
   data(){
        return{
            ide:0,
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
            usuario_id:'',
            ur3:'http://backendbolsaempleo.test/api/b_e/vin/consultaredir',
            cargando: false,
            
        }
    },
    mounted(){
        const ruta = useRoute();
        this.ide = ruta.params.id;
        this.ur3 +=  '/'+this.ide;
        this.getEmpresa();
        
    },
    methods:{
        getEmpresa(){
           axios.get(this.ur3).then(
                res=>{
                    this.ruc=res.data.data.ruc;
                    this.nombre=res.data.data.empresacorta;
                    this.ciudad=res.data.data.lugar;
                    this.pais=res.data.data.pais;
                    this.telefono=res.data.data.telefono;
                    this.direccion=res.data.data.direccion;
                    this.emailempre=res.data.data.email;
                    this.urlempre=res.data.data.url;
                    this.titulorepre=res.data.data.titulo;
                    this.nombrerepre=res.data.data.representante;
                    this.cargorepre=res.data.data.cargo;
                    this.tipo_empre=res.data.data.tipo;
                    this.mision=res.data.data.mision;
                    this.vision=res.data.data.vision;
                    this.usuario_id=res.data.data.usuario_id;
                }
            );
        },
        async actualizar(event){
            
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
                    usuario_id:this.usuario_id
                }
                var response = await enviarsoliedit('PUT',parametros,this.ur3,'Actualizado');
                //store.commit('setemail', this.email);
                
                this.$router.push('/principal/'+store.state.idusu);
                
                
            }
        },
        

    }
};