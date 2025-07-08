<template>
  <div class="editar-container">
    <div class="editar-card">
      <h1>Editar Producto</h1>
      <form @submit.prevent="guardarCambios">
        <div class="campo">
          <label>Nombre</label>
          <input v-model="producto.nombre" type="text" required />
        </div>

        <div class="campo">
          <label>Categoría</label>
          <input v-model="producto.categoria" type="text" />
        </div>

        <div class="campo">
          <label>Origen</label>
          <input v-model="producto.origen" type="text" />
        </div>

        <div class="campo">
          <label>Cantidad (kg)</label>
          <input v-model.number="producto.cantidad" type="number" />
        </div>

        <div class="campo">
          <label>Precio por kg (S/)</label>
          <input v-model.number="producto.precio" type="number" step="0.01" />
        </div>

        <div class="campo">
          <label>Estado</label>
          <select v-model="producto.estado">
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>

        <div class="campo">
          <label>Descripción</label>
          <textarea v-model="producto.descripcion" rows="5"></textarea>
        </div>

        <div class="acciones">
          <router-link to="/inventario" class="cancelar">Cancelar</router-link>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerProductoPorId, actualizarProducto } from '../../services/api.js'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const producto = ref({})

onMounted(async () => {
  producto.value = await obtenerProductoPorId(id)
})

const guardarCambios = async () => {
  await actualizarProducto(id, producto.value)
  router.push('/inventario')
}
</script>

<style scoped>
.editar-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #fefaf6;
  min-height: calc(100vh - 80px);
}

.editar-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.campo {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.campo label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.campo input,
.campo select,
.campo textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancelar {
  color: #8b5e3c;
  text-decoration: none;
  font-weight: 600;
}

button {
  background-color: #4e944f;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3e7a3f;
}
</style>