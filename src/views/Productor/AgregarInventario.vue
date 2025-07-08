<template>
  <div>
    <nav class="navbar">
      <div class="nav-left">🔔</div>
      <div class="nav-center">Qahwa</div>
      <div class="nav-right"></div>
    </nav>

    <section class="layout-centered">
      <div class="card">
        <button class="back-button" @click="router.push('/inventario')">← Regresar</button>
        <h2>Agregar nuevo producto al inventario:</h2>
        <hr />

        <form @submit.prevent="guardarInventario">
          <div>
            <label>Producto:</label>
            <input v-model="producto" required />
          </div>

          <div>
            <label>Fecha:</label>
            <input type="date" v-model="fecha" required />
          </div>

          <div>
            <label>Estado:</label>
            <select v-model="estado" required>
              <option value="Buen Estado">Buen Estado</option>
              <option value="Regular Estado">Regular Estado</option>
              <option value="Mal Estado">Mal Estado</option>
            </select>
          </div>

          <div>
            <label>Cantidad:</label>
            <input type="number" v-model="cantidad" required />
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registrarInventario } from '../../services/api.js'
import { useRouter } from 'vue-router'

const producto = ref('')
const fecha = ref('')
const estado = ref('Buen Estado')
const cantidad = ref(0)
const router = useRouter()

const guardarInventario = async () => {
  const usuarioId = localStorage.getItem('usuarioId')

  if (!usuarioId) {
    alert('Usuario no identificado')
    return
  }

  const nuevoProducto = {
    usuarioId: Number(usuarioId),
    producto: producto.value,
    fecha: fecha.value,
    estado: estado.value,
    cantidad: Number(cantidad.value)
  }

  try {
    await registrarInventario(nuevoProducto)
    alert('Producto agregado correctamente')
    router.push('/inventario')
  } catch (error) {
    console.error(error)
    alert('Error al guardar el producto')
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-left,
.nav-center,
.nav-right {
  flex: 1;
}

.nav-center {
  text-align: center;
}

.layout-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: #fefaf6;
  padding: 2rem;
}

.card {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.card h2 {
  font-size: 1.75rem;
  color: #3e2c23;
  margin-bottom: 1rem;
}

.back-button {
  background: none;
  color: #4e944f;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #3e7a3f;
  text-decoration: underline;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  font-weight: 600;
  color: #4e944f;
  margin-bottom: 0.3rem;
}

form input,
form select {
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  font-size: 1rem;
  background: #fefefe;
  transition: border 0.3s ease;
}

form input:focus,
form select:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 2px rgba(78, 148, 79, 0.2);
}

button[type='submit'] {
  align-self: flex-start;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  font-weight: bold;
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

button[type='submit']:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}
</style>
