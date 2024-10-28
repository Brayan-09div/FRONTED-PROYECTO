import apprentices from '../views/Apprentices.vue'
import apprentice from '../views/Apprentice.vue'
import assignament from '../views/Assignament.vue'
import myAssignament from '../views/MyAssignament.vue'
import binnacles from '../views/Binnacles.vue'
import followup from '../views/Followup.vue'
import loguin from '../views/Loguin.vue'
import modality from '../views/Modality.vue'
import register from '../views/Register.vue'
import userEP from '../views/UserEP.vue'
import fiche from '../views/Fiche.vue'
import instructor from '../views/Instructor.vue'
import home from '../views/Home.vue'
import layouts from '../views/Layout.vue'
import informationFicheApprentice from '../views/InformationFicheApprentice.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import information from '../views/Information.vue'

const routes = [
    {path: '/layouts', component: layouts, children:[
        {path: '/home', component: home},
        {path: '/apprentices', component: apprentices},
        {path: '/assignament', component: assignament},
        {path: '/myAssignament', component:myAssignament},
        {path: '/fiche', component: fiche},
        {path: '/binnacles', component: binnacles},
        {path: '/followup', component: followup},
        {path: '/instructor', component: instructor},
        {path: '/modality', component: modality},
        {path: '/register', component: register},
        {path: '/userEP', component: userEP},
        {path: '/informationFicheApprentice', component: informationFicheApprentice},
        {path: '/information', component: information}
    ]},
    
    {path: '/', component: loguin},
    {path: '/apprentice', component: loguin},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})




