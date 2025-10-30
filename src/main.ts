import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.css'

import App from './App.vue'
import router from './router'
import elementIconPlugin from './plugins/elementIconPlugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementIconPlugin)

app.mount('#app')
