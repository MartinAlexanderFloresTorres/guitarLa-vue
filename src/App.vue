<script setup>
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Guitarra from './components/Guitarra.vue'
import { db } from './data/db'

// Variables reactivas
const guitarras = ref([])
const carrito = ref([])
const guitarra = ref({})
const toast = useToast()

// Guardar en localStorage
watch(carrito, (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}, {
  deep: true
})

// Cargar datos
onMounted(() => {
  guitarras.value = db
  guitarra.value = db[3]
  carrito.value = JSON.parse(localStorage.getItem('carrito')) || []
})

//  Funciones
const agregarCarrito = (guitarra) => {
  const index = carrito.value.findIndex((item) => item.id === guitarra.id)
  if (index === -1) {
    guitarra.cantidad = 1
    carrito.value.push(guitarra)
    toast.success('Producto agregado al carrito')
    return
  }

  if (guitarra.cantidad > 5) {
    toast.error('No puedes agregar más de 5 productos')
    return
  }

  carrito.value[index].cantidad++
  toast.info('Producto actualizado en el carrito')
}

const removerCarrito = (guitarra) => {
  carrito.value = carrito.value.filter((item) => item.id !== guitarra.id)
  toast.warning('Producto eliminado del carrito')
}

const editarCantidad = (guitarra, cantidad) => {
  const index = carrito.value.findIndex((item) => item.id === guitarra.id)
  if (cantidad === 0) {
    removerCarrito(guitarra)
    return
  }
  if (cantidad > 5) {
    toast.error('No puedes agregar más de 5 productos')
    return
  }
  carrito.value[index].cantidad = cantidad
}

const vaciarCarrito = () => {
  carrito.value = []
  toast.success('Carrito vaciado')
}
</script>

<template>
  <Header
    :carrito="carrito"
    :guitarra="guitarra"
    @editar-cantidad="editarCantidad"
    @remover-carrito="removerCarrito"
    @vaciar-carrito="vaciarCarrito"
    @agregar-carrito="agregarCarrito"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitarra
        v-for="guitarra in guitarras"
        :guitarra="guitarra"
        :key="guitarra.id"
        @agregar-carrito="agregarCarrito"
      />
    </div>
  </main>

  <Footer />
</template>
