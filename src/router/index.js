import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Principal from '../views/Principal.vue'
import Perfil from '../views/Perfil.vue'
import Mispostulaciones from '../views/Mispostulaciones.vue'
import MispostulacionesEstado from '../views/MispostulacionesEstado.vue'
import EmpresasView from '../views/EmpresasView.vue'
import EmpresaNew from '../views/EmpresaNew.vue'
import EmpresaEdit from '../views/EmpresaEdit.vue'
import OfertasEdit from '../views/OfertasEdit.vue'
import CrearOferta from '../views/CrearOferta.vue'
import OfertasNew from '../views/OfertasNew.vue'
import OfertasView from '../views/OfertasView.vue'
import Postulados from '../views/Postulados.vue'
import Postuladosall from '../views/Postuladosall.vue'
import Estadopostulacionall from '../views/Estadopostulacionall.vue'
import Perfilpostulado from '../views/Perfilpostulado.vue'
import Ofertasall from '../views/Ofertasall.vue'
import Postularse from '../views/Postularse.vue'
import AceptacionView from '../views/AceptacionView.vue'
import RechazoView from '../views/RechazoView.vue'
import Userall from '../views/Userall.vue'
import AdminEdit from '../views/AdminEdit.vue'
import Empresall from '../views/Empresall.vue'

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
    props: true
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
    path: '/editE/:id',
    name: 'editE',
    component: EmpresaEdit
  },
  {
    path: '/ofertasedit/:id/:secondId',
    name: 'ofertasedit',
    component: OfertasEdit
  },
  {
    path: '/viewE/:id',
    name: 'viewE',
    component: CrearOferta
  },
  {
    path: '/ofertanew/:id',
    name: 'ofertanew',
    component: OfertasNew
  },
  {
    path: '/ofertas/:id',
    name: 'ofertas',
    component: OfertasView
  },
  {
    path: '/postulados/:id',
    name: 'postulados',
    component: Postulados
  },
  {
    path: '/postuladosall/:id',
    name: 'postuladosall',
    component: Postuladosall
  },
  {
    path: '/estadopostulacionall/:id',
    name: 'estadopostulacionall',
    component: Estadopostulacionall
  },
  {
    path: '/perfilpostulados/:id/:secondId',
    name: 'perfilpostulados',
    component: Perfilpostulado
  },
  {
    path: '/ofertasall/:id',
    name: 'ofertasall',
    component: Ofertasall
  },
  {
    path: '/postularse/:id/:secondId',
    name: 'postularse',
    component: Postularse
  },
  {
    path: '/aceptacionview/:id/:secondId',
    name: 'aceptacionview',
    component: AceptacionView
  },
  {
    path: '/rechazoview/:id/:secondId',
    name: 'rechazoview',
    component: RechazoView
  },
  {
    path: '/mispostulaciones/:id',
    name: 'mispostulaciones',
    component: Mispostulaciones
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
    path: '/empresall/:id',
    name: 'empresall',
    component: Empresall
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
