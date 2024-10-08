import layouts from '../layouts/Layout.vue'
import home from '../views/Home.vue'
import apprentice from '../views/Apprentice.vue'
import assignment from '../views/Assignament.vue'
import binnacles from '../views/Binnacles.vue'
import followup from '../views/Followup.vue'
import logs from '../views/Logs.vue'
import modality from '../views/Modality.vue'
import register from '../views/Register.vue'
import userEP from '../views/UserEP.vue'
import instructor from '../views/Instructor.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {path: '/layouts', component: layouts, children:[
        {path: '/', component: home},
        {path: '/apprentice', component: apprentice},
        {path: '/assignment', component: assignment},
        {path: '/binnacles', component: binnacles},
        {path: '/followup', component: followup},
        {path: '/instructor', component: instructor},
        {path: '/modality', component: modality},
        {path: '/register', component: register},
        {path: '/userEP', component: userEP},
    ]},
    
    {path: '/logs', component: logs},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})