<template>
  <div class="detalle-layout" v-if="pedido">
    <div class="detalle-container">
      <h2>📦 Detalle del Pedido</h2>
      <div class="info">
        <p><span>ID:</span> {{ pedido.id }}</p>
        <p><span>Fecha:</span> {{ pedido.fecha }}</p>
        <p><span>Cliente:</span> {{ pedido.cliente }}</p>
        <p><span>Costo:</span> S/ {{ pedido.costo }}</p>
      </div>

      <router-link to="/pedidos-productor" class="volver-btn">← Volver a pedidos</router-link>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerPedidoPorId } from '../../services/api.js'

const route = useRoute()
const pedido = ref(null)

onMounted(async () => {
  const id = route.params.id
  pedido.value = await obtenerPedidoPorId(id)
})
</script>

<style scoped>
.detalle-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: #fefaf6;
  padding: 2rem;
}

.detalle-container {
  max-width: 600px;
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;
  color: #3e2c23;
  width: 100%;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4e944f;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
}

.info p {
  font-size: 1.1rem;
  background: #f9f9f9;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border-left: 4px solid #4e944f;
  box-shadow: 0 2px 8px rgba(78, 148, 79, 0.05);
}

.info p span {
  font-weight: 600;
  color: #2e382e;
  margin-right: 0.5rem;
}

.volver-btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 10px 20px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.volver-btn:hover {
  background: #3e7a3f;
  transform: translateY(-2px);
}

</style>
