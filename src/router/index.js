import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Principal from '../views/Principal.vue'
import Perfil from '../views/Perfil.vue'
import Mispostulaciones from '../views/Mispostulaciones.vue'
import MispostulacionesEmprendimient from '../views/MispostulacionesEmprendimient.vue'
import MispostulacionesEstado from '../views/MispostulacionesEstado.vue'
import EmpresasView from '../views/EmpresasView.vue'
import EmpresaNew from '../views/EmpresaNew.vue'
import EmprendimientoNew from '../views/EmprendimientoNew.vue'
import EmpresaEdit from '../views/EmpresaEdit.vue'
import EmprendimientoEdit from '../views/EmprendimientoEdit.vue'
import OfertasEdit from '../views/OfertasEdit.vue'
import OfertasEmprendimientoEdit from '../views/OfertasEmprendimientoEdit.vue'
import CrearOferta from '../views/CrearOferta.vue'
import CrearOfertaEmprendimiento from '../views/CrearOfertaEmprendimiento.vue'
import OfertasNew from '../views/OfertasNew.vue'
import OfertasView from '../views/OfertasView.vue'
import OfertasEmprendimientosView from '../views/OfertasEmprendimientosView.vue'
import OfertasEmprendimientoNew from '../views/OfertasEmprendimientoNew.vue'
import Postulados from '../views/Postulados.vue'
import PostuladosEmpren from '../views/PostuladosEmpren.vue'
import Postuladosall from '../views/Postuladosall.vue'
import PostuladosallEmprend from '../views/PostuladosallEmprend.vue'
import Estadopostulacionall from '../views/Estadopostulacionall.vue'
import Perfilpostulado from '../views/Perfilpostulado.vue'
import Perfilpostuladoempr from '../views/Perfilpostuladoempr.vue'
import Ofertasall from '../views/Ofertasall.vue'
import OfertasEmprendimientoall from '../views/OfertasEmprendimientoall.vue'
import Postularse from '../views/Postularse.vue'
import PostularseEmprendimiento from '../views/PostularseEmprendimiento.vue'
import AceptacionView from '../views/AceptacionView.vue'
import AceptacionViewEmp from '../views/AceptacionViewEmp.vue'
import RechazoView from '../views/RechazoView.vue'
import Userall from '../views/Userall.vue'
import AdminEdit from '../views/AdminEdit.vue'
import AdminCreatedUsers from '../views/AdminCreatedUsers.vue'
import Empresall from '../views/Empresall.vue'
import Emprendimientosall from '../views/Emprendimientosall.vue'
import MisEmprendimientos from '../views/MisEmprendimientos.vue'
import AboutView from '../views/AboutView.vue'
import EstudiantesAbout from '../views/EstudiantesAbout.vue'
import EncuestasSeguimientoView from '../views/EncuestasSeguimientoView.vue'
import CrearFormularioView from '../views/CrearFormularioView.vue'
import AddPreguntasView from '../views/AddPreguntasView.vue'
import EditarFormularioView from '../views/EditarFormularioView.vue'
import Detalle_Encuestas_fromView from '../views/Detalle_Encuestas_fromView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/principal/:id',
    name: 'principal',
    component: Principal,
    //props: true
  },
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: Perfil
  },
  {
    path: '/empresas/:id',
    name: 'empresas',
    component: EmpresasView
  },
  {
    path: '/empresascreate/:id',
    name: 'empresascreate',
    component: EmpresaNew
  },
  {
    path: '/emprendimientocreate/:id',
    name: 'emprendimientocreate',
    component: EmprendimientoNew
  },
  {
    path: '/editE/:id',
    name: 'editE',
    component: EmpresaEdit
  },
  {
    path: '/editEmp/:id',
    name: 'editEmp',
    component: EmprendimientoEdit
  },
  {
    path: '/ofertasedit/:id/:secondId',
    name: 'ofertasedit',
    component: OfertasEdit
  },
  {
    path: '/ofertaseditemp/:id/:secondId',
    name: 'ofertaseditemp',
    component: OfertasEmprendimientoEdit
  },
  {
    path: '/viewE/:id',
    name: 'viewE',
    component: CrearOferta
  },
  {
    path: '/viewEmp/:id',
    name: 'viewEmp',
    component: CrearOfertaEmprendimiento
  },
  {
    path: '/ofertanew/:id',
    name: 'ofertanew',
    component: OfertasNew
  },
  {
    path: '/ofertaempnew/:id',
    name: 'ofertaempnew',
    component: OfertasEmprendimientoNew
  },
  {
    path: '/ofertas/:id',
    name: 'ofertas',
    component: OfertasView
  },
  {
    path: '/emprendimientosofertview/:id',
    name: 'emprendimientosofertview',
    component: OfertasEmprendimientosView
  },
  {
    path: '/postulados/:id',
    name: 'postulados',
    component: Postulados
  },
  {
    path: '/postuladosempr/:id',
    name: 'postuladosempr',
    component: PostuladosEmpren
  },
  {
    path: '/postuladosall/:id',
    name: 'postuladosall',
    component: Postuladosall
  },
  {
    path: '/postuladosallemp/:id',
    name: 'postuladosallemp',
    component: PostuladosallEmprend
  },
  {
    path: '/estadopostulacionall/:id',
    name: 'estadopostulacionall',
    component: Estadopostulacionall
  },
  {
    path: '/perfilpostulados/:id/:secondId/:thirdId',
    name: 'perfilpostulados',
    component: Perfilpostulado
  },
  {
    path: '/perfilpostuladosemp/:id/:secondId/:thirdId',
    name: 'perfilpostuladosemp',
    component: Perfilpostuladoempr
  },
  {
    path: '/ofertasall/:id',
    name: 'ofertasall',
    component: Ofertasall
  },
  {
    path: '/ofertasallemp/:id',
    name: 'ofertasallemp',
    component: OfertasEmprendimientoall
  },
  {
    path: '/postularse/:id/:secondId',
    name: 'postularse',
    component: Postularse
  },
  {
    path: '/postularseempr/:id/:secondId',
    name: 'postularseempr',
    component: PostularseEmprendimiento
  },
  {
    path: '/aceptacionview/:id/:secondId',
    name: 'aceptacionview',
    component: AceptacionView
  },
  {
    path: '/aceptacionviewemp/:id/:secondId',
    name: 'aceptacionviewemp',
    component: AceptacionViewEmp
  },
  {
    path: '/rechazoview/:id/:secondId',
    name: 'rechazoview',
    component: RechazoView
  },
  {
    path: '/edit_forms/:id/',
    name: 'edit_forms',
    component: EditarFormularioView
  },
  {
    path: '/mispostulaciones/:id',
    name: 'mispostulaciones',
    component: Mispostulaciones
  },
  {
    path: '/mispostulacionesemp/:id',
    name: 'mispostulacionesemp',
    component: MispostulacionesEmprendimient
  },
  {
    path: '/misemprendimientos/:id',
    name: 'misemprendimientos',
    component: MisEmprendimientos
  },
  {
    path: '/mispostulacionesestado/:id',
    name: 'mispostulacionesestado',
    component: MispostulacionesEstado
  },
  {
    path: '/userall/:id',
    name: 'userall',
    component: Userall
  },
  {
    path: '/useredit/:id',
    name: 'useredit',
    component: AdminEdit
  },
  {
    path: '/usercreated/:id',
    name: 'usercreated',
    component: AdminCreatedUsers
  },
  {
    path: '/empresall/:id',
    name: 'empresall',
    component: Empresall
  },
  {
    path: '/emprendimientosall/:id',
    name: 'emprendimientosall',
    component: Emprendimientosall
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/estabout',
    name: 'estabout',
    component: EstudiantesAbout
  },
  {
    path: '/encuestas_all/:id',
    name: 'encuestas_all',
    component: EncuestasSeguimientoView 
  },
  {
    path: '/created_froms/:id',
    name: 'created_froms',
    component: CrearFormularioView 
  },
  {
    path: '/created_questions/:id',
    name: 'created_questions',
    component: AddPreguntasView 
  },
  {
    path: '/detalle_encuestas_from/:id',
    name: 'detalle_encuestas_from',
    component: Detalle_Encuestas_fromView 
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
