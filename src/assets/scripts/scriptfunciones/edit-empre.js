
import {mostraralertas,enviarsoliedit} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';

export default {
   data(){
        return{
            ide:0,
            nombre:'',
            ciudad:'',
            pais:'',
            telefono:'',
            direccion:'',
            tipo_empresa:'',
            mision:'',
            vision:'',
            descripcion:'',
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
                    this.nombre=res.data.data.nombre;
                    this.ciudad=res.data.data.ciudad;
                    this.pais=res.data.data.pais;
                    this.telefono=res.data.data.telefono;
                    this.direccion=res.data.data.direccion;
                    this.tipo_empresa=res.data.data.tipo_empresa;
                    this.mision=res.data.data.mision;
                    this.vision=res.data.data.vision;
                    this.descripcion=res.data.data.descripcion;
                    this.usuario_id=res.data.data.usuario_id;
                }
            );
        },
        async actualizar(event){
            
            event.preventDefault();
           
            if(this.nombre.trim()==''){
                mostraralertas('Ingrese Nombre de la Empresa','warning','nombre');
            }
            else if(this.ciudad.trim()==''){
                mostraralertas('Ingrese la ciudad de la Empres','warning','ciudad');
            }
            else if(this.pais.trim()==''){
                mostraralertas('Ingrese pais de Contacto de la Empresa','warning','pais');
            }
            
            else if(this.telefono.trim()==''){
                mostraralertas('Ingrese Telf de la Empresa','warning','telefono');
            }
            else if(this.direccion.trim()==''){
                mostraralertas('Ingrese Dirección de la Empresa','warning','direccion');
            }
            else if(this.tipo_empresa.trim()==''){
                mostraralertas('Ingrese tipo de empresa de la Empresa','warning','tipo_empresa');
            }
            else if(this.mision.trim()==''){
                mostraralertas('Ingrese misión de la Empresa','warning','mision');
            }
            else if(this.vision.trim()==''){
                mostraralertas('Ingrese visión de la Empresa','warning','vision');
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
                    usuario_id:this.usuario_id
                }
                var response = await enviarsoliedit('PUT',parametros,this.ur3,'Actualizado');
                //store.commit('setemail', this.email);
                
                this.$router.push('/principal/'+store.state.idusu);
                
                
            }
        },
        

    }
};