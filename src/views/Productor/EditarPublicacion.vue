<template>
  <div class="editar-container">
    <div class="editar-card">
      <h1 class="titulo">Editar Publicación</h1>

      <form @submit.prevent="editar">
        <div class="campo">
          <label class="etiqueta">Título</label>
          <input v-model="titulo" type="text" class="input" required />
        </div>

        <div class="campo">
          <label class="etiqueta">Datos</label>
          <textarea v-model="datos" class="textarea" rows="4"></textarea>
        </div>

        <div class="campo">
          <label class="etiqueta">Privacidad</label>
          <select v-model="privacidad" class="select">
            <option value="publica">Pública</option>
            <option value="privada">Privada</option>
          </select>
        </div>

        <div class="acciones">
          <router-link to="/publicaciones" class="cancelar">Cancelar</router-link>
          <button type="submit" class="guardar">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerPublicacionPorId, actualizarPublicacion } from '../../services/api.js'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const titulo = ref('')
const datos = ref('')
const privacidad = ref('publica')

onMounted(async () => {
  const pub = await obtenerPublicacionPorId(id)
  titulo.value = pub.titulo
  datos.value = pub.datos
  privacidad.value = pub.privacidad
})

const editar = async () => {
  try {
    await actualizarPublicacion(id, {
      titulo: titulo.value,
      datos: datos.value,
      privacidad: privacidad.value
    })
    router.push('/publicaciones')
  } catch (e) {
    alert('Error al guardar los cambios')
    console.error(e)
  }
}
</script>

<style scoped>
.editar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  min-height: calc(100vh - 80px);
  background: #fefaf6;
}

.editar-card {
  background: linear-gradient(135deg, #ffffff, #f5ebe0);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  width: 100%;
  border: 2px solid rgba(142, 94, 60, 0.15);
  backdrop-filter: blur(5px);
}

.titulo {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #3e2c23;
}

.campo {
  margin-bottom: 1.5rem;
}

.etiqueta {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5e473b;
}

.input,
.textarea,
.select {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  background: #fffdf9;
  font-size: 1rem;
  color: #3e2c23;
  transition: border-color 0.3s ease;
}

.input:focus,
.textarea:focus,
.select:focus {
  border-color: #4e944f;
  outline: none;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
}

.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancelar {
  color: #8b5e3c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.cancelar:hover {
  color: #6d4a2f;
  text-decoration: underline;
}

.guardar {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.guardar:hover {
  box-shadow: 0 8px 18px rgba(78, 148, 79, 0.4);
  transform: translateY(-2px);
}
</style>
