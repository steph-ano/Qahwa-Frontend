<template>
  <DistribuidorLayout titulo="Historial de Compras" subtitulo="Estas son las compras que has realizado">
    <div class="historial-container">
      <!-- Purchase History Items -->
      <div v-if="pedidos.length > 0" class="historial-content">
        <div class="historial-items">
          <div v-for="(pedido, index) in pedidos" :key="index" class="historial-item">
            <div class="item-icon">
              <div class="icon-placeholder">
                <span class="order-icon">📦</span>
              </div>
            </div>

            <div class="item-details">
              <div class="item-header">
                <h3 class="item-title">Pedido #{{ pedido.publicacionId }}</h3>
                <div class="status-badge">
                  <span class="status-icon">✅</span>
                  <span class="status-text">Completado</span>
                </div>
              </div>

              <div class="item-info">
                <div class="date-info">
                  <span class="date-icon">📅</span>
                  <span class="date-text">{{ formatDate(pedido.fecha) }}</span>
                </div>
                <div class="time-info">
                  <span class="time-icon">⏰</span>
                  <span class="time-text">{{ formatTime(pedido.fecha) }}</span>
                </div>
              </div>

              <div class="item-footer">
                <div class="quantity-info">
                  <span class="quantity-label">Cantidad:</span>
                  <span class="quantity-value">{{ pedido.cantidad || 1 }} kg</span>
                </div>

                <div class="price-section">
                  <span class="price-label">Precio unitario:</span>
                  <span class="unit-price">S/ {{ (pedido.precio || 25.00).toFixed(2) }}</span>
                  <span class="total-price">Total: S/ {{ calculateTotal(pedido) }}</span>
                </div>
              </div>

              <div class="item-actions">
                <button class="action-btn reorder-btn" @click="reorder(pedido)">
                  <span class="btn-icon">🔄</span>
                  Volver a pedir
                </button>
                <button class="action-btn details-btn" @click="viewDetails(pedido)">
                  <span class="btn-icon">👁️</span>
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty History -->
      <div v-else class="empty-history">
        <div class="empty-history-content">
          <div class="empty-icon">📋</div>
          <h3 class="empty-title">No tienes compras aún</h3>
          <p class="empty-subtitle">Comienza a explorar nuestros productos y realiza tu primera compra</p>
          <button class="explore-btn" @click="goToExplore">
            <span class="btn-icon">🔍</span>
            Explorar productos
          </button>
        </div>
      </div>
    </div>
  </DistribuidorLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPedidos } from '../../services/api'
import DistribuidorLayout from './LayoutDistribuidor.vue'

const pedidos = ref([])

onMounted(async () => {
  const usuarioId = localStorage.getItem('usuarioId')
  const todos = await obtenerPedidos()
  pedidos.value = todos.filter(p => p.distribuidorId == usuarioId)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateTotal = (pedido) => {
  const precio = pedido.precio || 25.00
  const cantidad = pedido.cantidad || 1
  return (precio * cantidad).toFixed(2)
}

const reorder = (pedido) => {
  // Add to cart logic
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []
  const newItem = {
    id: pedido.publicacionId,
    nombre: `Producto ${pedido.publicacionId}`,
    precio: pedido.precio || 25.00,
    quantity: pedido.cantidad || 1,
    descripcion: 'Producto fresco y orgánico',
    productor: 'Productor Local',
    ubicacion: 'Lima, Perú'
  }

  carrito.push(newItem)
  localStorage.setItem('carrito', JSON.stringify(carrito))
  showNotification('Producto agregado al carrito', 'success')
}

const viewDetails = (pedido) => {
  showNotification('Función de detalles en desarrollo', 'info')
}

const goToExplore = () => {
  window.location.href = '/explorar'
}

const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
</script>

<style scoped>
.historial-container {
  max-width: 1200px;
  margin: 0 auto;
}

.historial-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.historial-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.historial-item {
  display: flex;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 235, 224, 0.7));
  border: 2px solid rgba(142, 94, 60, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.historial-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: rgba(78, 148, 79, 0.2);
}

.item-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f5ebe0, #e8d5c4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-placeholder {
  text-align: center;
}

.order-icon {
  font-size: 2rem;
  color: #8b5e3c;
  opacity: 0.7;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #3e2c23;
  margin: 0;
  line-height: 1.3;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(78, 148, 79, 0.1);
  border: 1px solid rgba(78, 148, 79, 0.2);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #4e944f;
  font-weight: 600;
}

.status-icon {
  font-size: 1rem;
}

.item-info {
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
  color: #6b4a2f;
}

.date-info,
.time-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-icon,
.time-icon {
  font-size: 1rem;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid rgba(142, 94, 60, 0.1);
  border-bottom: 1px solid rgba(142, 94, 60, 0.1);
}

.quantity-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  padding: 0.5rem 1rem;
}

.quantity-label {
  font-size: 0.9rem;
  color: #8b5e3c;
  font-weight: 500;
}

.quantity-value {
  font-size: 1rem;
  font-weight: 600;
  color: #3e2c23;
}

.price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.price-label {
  font-size: 0.85rem;
  color: #6b4a2f;
}

.unit-price {
  font-size: 0.95rem;
  color: #8b5e3c;
  font-weight: 500;
}

.total-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4e944f;
}

.item-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reorder-btn {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.reorder-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(78, 148, 79, 0.4);
}

.details-btn {
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
}

.details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(139, 94, 60, 0.4);
}

.empty-history {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-history-content {
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 235, 224, 0.7));
  border: 2px solid rgba(142, 94, 60, 0.1);
  border-radius: 20px;
  padding: 4rem 3rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.empty-title {
  font-size: 2rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 1rem;
}

.empty-subtitle {
  font-size: 1.2rem;
  color: #5e473b;
  margin-bottom: 2rem;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(78, 148, 79, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.btn-icon {
  font-size: 1rem;
}

/* Notification styles */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
}

.notification.error {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.notification.info {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .historial-item {
    flex-direction: column;
    gap: 1rem;
  }

  .item-icon {
    width: 100%;
    height: 120px;
  }

  .item-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .price-section {
    align-items: center;
  }

  .item-actions {
    justify-content: center;
  }

  .item-info {
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .historial-container {
    padding: 0 1rem;
  }

  .historial-item {
    padding: 1rem;
  }

  .item-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .empty-history-content {
    padding: 3rem 2rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .empty-subtitle {
    font-size: 1rem;
  }
}
</style>