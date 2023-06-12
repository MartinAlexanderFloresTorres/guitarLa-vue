import { createApp } from 'vue'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'
import './style.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT
})
app.mount('#app')
