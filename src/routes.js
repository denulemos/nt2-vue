
import Home from './components/home.vue'
import Turnos from './components/turnos.vue'
import Medicos from './components/medico.vue'
import Pacientes from './components/pacientes.vue'


export const routes = [
    {path:'/',component:Home},
    {path: '/turnos' , component:Turnos},
    {path: '/medicos' , component:Medicos},
    {path : '/pacientes' , component: Pacientes}
    
]