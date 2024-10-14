
import { mostraralertas } from '@/assets/scripts/scriptfunciones/funciones';
import { enviarsolilogin } from '@/assets/scripts/scriptfunciones/loginfuncion';
import store from '@/store';
export default {
  data() {
    return {
      usuariologin: '',
      clavelogin: '',
      url_login: 'http://192.168.1.15/b_e/api/vin/login',
    }; 
  },
  methods: {
    async login(event) {
        event.preventDefault();
        try {
            var parametros = {
              CIInfPer: this.usuariologin.trim(),
              codigo_dactilar: this.clavelogin.trim(),
            };
    
            var response = await enviarsolilogin('POST', parametros, this.url_login, 'Logueado');
            if(response.error){
              mostraralertas(response.mensaje, 'warning');
            }
            else if (response && response.token) {
                //console.log('Inicio de sesión exitoso');
                //console.log(store.commit('setRol', response.rol));
                //console.log(store.state.role=response.role);
                //console.log(response.rol);
                
                if(response.rol=='Administrador'){
                  mostraralertas('LE DAMOS LA BIENVENIDA ADMINISTRADOR '+response.last_name,'success');
                  this.$router.push('/principal/'+response.id);
                }
                else if(response.rol=='Empresa'){
                  mostraralertas('LE DAMOS LA BIENVENIDA EMPRESA '+response.last_name,'success');
                  this.$router.push('/principal/'+response.id);
                }
                
              
            }else if(response){
                //console.log('Inicio de sesión exitoso');
                //console.log(store.commit('setRol', response.rol));
                //console.log(store.state.role);
                //console.log(response.rol);
                //mostraralertas('Bienvenido','success');
                if(response.rol=='Administrador'){
                  mostraralertas('LE DAMOS LA BIENVENIDA ADMINISTRADOR '+response.last_name,'success');
                  this.$router.push('/principal/'+response.id);
                }
                else if(response.Rol=='Estudiante'){
                  if(response.Graduado=='Si'){
                    mostraralertas('LE DAMOS LA BIENVENIDA ESTUDIANTE '+response.ApellInfPer,'success');
                    this.$router.push('/principal/'+response.CIInfPer);
                  }else{
                    mostraralertas('ESTUDIANTE NO TITULADO ','warning');
                  }
                 

                }else if(response.rol=='Empresa'){
                  mostraralertas('LE DAMOS LA BIENVENIDA EMPRESA '+response.last_name,'success');
                  this.$router.push('/principal/'+response.id);
                }
            } /*else {
                mostraralertas('Usuario y/o Contraseñas Incorrectos','warning');
              console.error('Respuesta inesperada:', response);
            }*/
          } catch (error) {
            console.error('Error:', error.response.data);
            
          }
    }
  }
};
