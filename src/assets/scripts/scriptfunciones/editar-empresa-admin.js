import {mostraralertas,enviarsoliedit} from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';

export default {
   data(){
        return{
            id:0,
            nombre:'',
            apellido:'',
            email:'',
            password:'',
            rol:'',
            link:'',
            telf:'',
            direccion:'',
            imagen:'',
            url:'http://backendbolsaempleo.test/api/vin/users',
            cargando: false,
        }
    },
    mounted(){
        const ruta = useRoute();
        this.id = ruta.params.id;
        this.url +=  '/'+this.id;
        this.getUsuairo();
    },
    methods:{
        getUsuairo(){
            axios.get(this.url).then(
                res=>{
                    this.nombre=res.data.data.firts_name;
                    this.apellido=res.data.data.last_name;
                    this.email=res.data.data.email;
                    this.password=res.data.data.password;
                    this.rol=res.data.data.rol;
                    this.link=res.data.data.link;
                    this.telf=res.data.data.telefono;
                    this.direccion=res.data.data.direccion;
                    this.imagen=res.data.data.imagen;
                }
            );
        },
        async actualizar(event){
            event.preventDefault();
            var mifoto = document.getElementById('fotoimg');
            this.imagen = mifoto.src;
            if(this.nombre.trim()==''){
                mostraralertas('Ingrese Nombre de Usuario','warning','nombre');
            }
            else if(this.apellido.trim()==''){
                mostraralertas('Ingrese Apellido de Usuario','warning','apellido');
            }
            else if(this.email.trim()==''){
                mostraralertas('Ingrese Email de Usuario','warning','email');
            }
            
            else if(this.telf.trim()==''){
                mostraralertas('Ingrese Telf de Usuario','warning','telf');
            }
            else if(this.direccion.trim()==''){
                mostraralertas('Ingrese Direccion de Usuario','warning','direccion');
            }
            else{
                var parametros = {
                    firts_name:this.nombre.trim(),
                    last_name:this.apellido.trim(),
                    email:this.email.trim(),
                    password:this.password.trim(),
                    rol:this.rol.trim(),
                    link:this.link.trim(),
                    telefono:this.telf.trim(),
                    direccion:this.direccion.trim(),
                    imagen:this.imagen.trim()
                }
                var response = await enviarsoliedit('PUT',parametros,this.url,'Actualizado');
                store.commit('setemail', this.email);
                
                this.$router.push('/principal/'+store.state.idusu);
                
                
            }
        },
        cargarfoto(event){
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function(){
                var mifoto = document.getElementById('fotoimg');
                mifoto.src = reader.result;
                this.imagen = mifoto.src;
            }
        }

    }
};