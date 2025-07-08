<template>
  <div class="detalle-container">
    <div class="detalle-card">
      <h1 class="titulo">{{ publicacion?.titulo }}</h1>
      <p class="fecha"><strong>Fecha:</strong> {{ publicacion?.fecha }}</p>
      <p class="privacidad"><strong>Privacidad:</strong> {{ publicacion?.privacidad }}</p>
      <p class="descripcion">{{ publicacion?.datos }}</p>
      <div class="volver">
        <router-link to="/publicaciones" class="volver-link">← Volver a publicaciones</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerPublicacionPorId } from '../../services/api.js'

const route = useRoute()
const publicacion = ref(null)

onMounted(async () => {
  const id = route.params.id
  publicacion.value = await obtenerPublicacionPorId(id)
})
</script>

<style scoped>
.detalle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background: #fefaf6;
  padding: 2rem;
}

.detalle-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border: 2px solid rgba(142, 94, 60, 0.15);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-width: 700px;
  width: 100%;
}

.titulo {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3e2c23;
  margin-bottom: 1.5rem;
}

.fecha,
.privacidad {
  font-size: 1.1rem;
  color: #8b5e3c;
  margin-bottom: 1rem;
  font-weight: 500;
}

.descripcion {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #5e473b;
  margin-bottom: 2rem;
}

.volver {
  text-align: right;
}

.volver-link {
  font-weight: 600;
  color: #4e944f;
  text-decoration: none;
  transition: color 0.3s ease;
}

.volver-link:hover {
  color: #3e7a3f;
  text-decoration: underline;
}
</style>
