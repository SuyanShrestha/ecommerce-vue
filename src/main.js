import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// gets all required icons
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import store from './store'

const app = createApp(App)

// fontawesome
library.add(faHeartSolid, faHeartRegular)
app.component('fa', FontAwesomeIcon)

app.use(store)
app.use(router)

app.mount('#app')
