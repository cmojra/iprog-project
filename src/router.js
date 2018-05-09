import welcome from './components/Welcome.vue'
import search from './components/Search.vue'
import destinations from './components/Destinations.vue'
import detailedview from './components/DetailedView.vue'
import { modelInstance } from "./components/Model";


export default [
    {
      path: '/',
      component: welcome
    },
    {
      path: '/destinations',
      components: {
        default: destinations,
        navbar: search,
        props: { model: modelInstance }
      }
    },
    {
      path: '/detailedview/:id',
      components:{
        default: detailedview,
        //navbar: sidebar, obs heter numera search inte sidebar
        props: { model: modelInstance }
      }
    },
]
