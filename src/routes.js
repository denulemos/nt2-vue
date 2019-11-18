import Administrador from './components/administrador.vue'
import Home from './components/home.vue'
import Turnos from './components/turnos.vue'
import Pacientes from './components/pacientes.vue'


export const routes = [
    {path:'/',component:Home},
    {path: '/turnos' , component:Turnos},
    {path : '/pacientes' , component: Pacientes},
    {path : '/administrador' , component: Administrador}
    
]