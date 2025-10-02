import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "owl.carousel/dist/assets/owl.carousel.css"; 
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'waypoints/lib/jquery.waypoints.js';

import '@/assets/styles/bootstrap.min.css'
import '@/assets/lib/lightbox/css/lightbox.min.css'
import '@/assets/lib/owlcarousel/assets/owl.carousel.min.css'
import '@/assets/lib/easing/easing.min.js'
import '@/assets/lib/waypoints/waypoints.min.js'
import '@/assets/lib/lightbox/js/lightbox.min.js'
import '@/assets/lib/owlcarousel/owl.carousel.min.js'



createApp(App).use(store).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap'

import $ from 'jquery';
window.$ = $;
window.jQuery = $;
