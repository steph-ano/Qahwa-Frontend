<template>
  <DistribuidorLayout titulo="Carrito" subtitulo="Estos son los productos que has añadido a tu carrito">
    <div class="carrito-container">
      <!-- Cart Items -->
      <div v-if="carrito.length > 0" class="cart-content">
        <div class="cart-items">
          <div v-for="(item, index) in carrito" :key="index" class="cart-item">
            <div class="item-image">
              <div class="image-placeholder">
                <span class="image-icon">🌱</span>
              </div>
            </div>

            <div class="item-details">
              <div class="item-header">
                <h3 class="item-name">{{ item.nombre }}</h3>
                <button class="remove-btn" @click="eliminar(index)">
                  <span class="remove-icon">✕</span>
                </button>
              </div>

              <p class="item-description">{{ item.descripcion }}</p>

              <div class="item-info">
                <div class="producer-info">
                  <span class="producer-icon">👨‍🌾</span>
                  <span class="producer-name">{{ item.productor || 'Productor Local' }}</span>
                </div>
                <div class="location-info">
                  <span class="location-icon">📍</span>
                  <span class="location-text">{{ item.ubicacion || 'Lima, Perú' }}</span>
                </div>
              </div>

              <div class="item-footer">
                <div class="quantity-controls">
                  <button class="quantity-btn" @click="decrementQuantity(index)">−</button>
                  <span class="quantity">{{ item.quantity || 1 }}</span>
                  <button class="quantity-btn" @click="incrementQuantity(index)">+</button>
                  <span class="unit-text">kg</span>
                </div>

                <div class="price-section">
                  <span class="unit-price">S/ {{ item.precio || '25.00' }} / kg</span>
                  <span class="total-price">S/ {{ calculateItemTotal(item) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h3 class="summary-title">Resumen del pedido</h3>

            <div class="summary-details">
              <div class="summary-row">
                <span>Subtotal ({{ getTotalItems() }} productos)</span>
                <span>S/ {{ getSubtotal() }}</span>
              </div>
              <div class="summary-row">
                <span>Costo de envío</span>
                <span>S/ 10.00</span>
              </div>
              <div class="summary-row">
                <span>Descuento</span>
                <span class="discount">- S/ 5.00</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row total-row">
                <span>Total</span>
                <span>S/ {{ getTotal() }}</span>
              </div>
            </div>

            <div class="checkout-section">
              <button class="checkout-btn" @click="comprarTodo">
                <span class="btn-icon">🛒</span>
                Proceder al pago
              </button>
              <button class="continue-shopping-btn" @click="continuarComprando">
                <span class="btn-icon">🔍</span>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="empty-cart">
        <div class="empty-cart-content">
          <div class="empty-icon">🛒</div>
          <h3 class="empty-title">Tu carrito está vacío</h3>
          <p class="empty-subtitle">Agrega algunos productos para comenzar tu compra</p>
          <button class="explore-btn" @click="$router.push('/explorar')">
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
import { guardarPedido } from '../../services/api'
import DistribuidorLayout from './LayoutDistribuidor.vue'

const carrito = ref([])

onMounted(() => {
  carrito.value = JSON.parse(localStorage.getItem('carrito')) || []
})

const eliminar = (index) => {
  carrito.value.splice(index, 1)
  updateLocalStorage()
  showNotification('Producto eliminado del carrito', 'info')
}

const incrementQuantity = (index) => {
  if (!carrito.value[index].quantity) {
    carrito.value[index].quantity = 1
  }
  carrito.value[index].quantity++
  updateLocalStorage()
}

const decrementQuantity = (index) => {
  if (carrito.value[index].quantity > 1) {
    carrito.value[index].quantity--
    updateLocalStorage()
  }
}

const updateLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

const calculateItemTotal = (item) => {
  const price = parseFloat(item.precio || 25.00)
  const quantity = item.quantity || 1
  return (price * quantity).toFixed(2)
}

const getTotalItems = () => {
  return carrito.value.reduce((total, item) => total + (item.quantity || 1), 0)
}

const getSubtotal = () => {
  return carrito.value.reduce((total, item) => {
    const price = parseFloat(item.precio || 25.00)
    const quantity = item.quantity || 1
    return total + (price * quantity)
  }, 0).toFixed(2)
}

const getTotal = () => {
  const subtotal = parseFloat(getSubtotal())
  const shipping = 10.00
  const discount = 5.00
  return (subtotal + shipping - discount).toFixed(2)
}

const comprarTodo = async () => {
  try {
    for (const item of carrito.value) {
      await guardarPedido({
        publicacionId: item.id,
        fecha: new Date().toISOString(),
        distribuidorId: localStorage.getItem('usuarioId'),
        cantidad: item.quantity || 1,
        precio: parseFloat(item.precio || 25.00)
      })
    }

    // Clear cart after successful purchase
    carrito.value = []
    updateLocalStorage()

    showNotification('¡Compra realizada con éxito!', 'success')
  } catch (error) {
    showNotification('Error al procesar la compra', 'error')
  }
}

const continuarComprando = () => {
  // Navigate to explore page
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
.carrito-container {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
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

.cart-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: rgba(78, 148, 79, 0.2);
}

.item-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f5ebe0, #e8d5c4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  text-align: center;
}

.image-icon {
  font-size: 2.5rem;
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
  align-items: flex-start;
}

.item-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3e2c23;
  margin: 0;
  line-height: 1.3;
}

.remove-btn {
  background: rgba(231, 76, 60, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e74c60;
}

.remove-btn:hover {
  background: rgba(231, 76, 60, 0.2);
  transform: scale(1.1);
}

.remove-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.item-description {
  color: #5e473b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.item-info {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #6b4a2f;
}

.producer-info,
.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.producer-icon,
.location-icon {
  font-size: 1rem;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(142, 94, 60, 0.1);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  padding: 0.5rem;
}

.quantity-btn {
  background: #4e944f;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #3e7a3f;
  transform: scale(1.1);
}

.quantity {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3e2c23;
  min-width: 2rem;
  text-align: center;
}

.unit-text {
  font-size: 0.9rem;
  color: #8b5e3c;
  font-weight: 500;
}

.price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.unit-price {
  font-size: 0.9rem;
  color: #6b4a2f;
}

.total-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4e944f;
}

.cart-summary {
  position: sticky;
  top: 2rem;
}

.summary-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 235, 224, 0.7));
  border: 2px solid rgba(142, 94, 60, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 1.5rem;
}

.summary-details {
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #5e473b;
}

.summary-row.total-row {
  font-size: 1.2rem;
  font-weight: 700;
  color: #3e2c23;
}

.discount {
  color: #4e944f;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: rgba(142, 94, 60, 0.2);
  margin: 1rem 0;
}

.checkout-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
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

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.continue-shopping-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.continue-shopping-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(139, 94, 60, 0.4);
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-cart-content {
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
  font-size: 1.1rem;
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
  .cart-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cart-item {
    flex-direction: column;
    gap: 1rem;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .item-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .price-section {
    align-items: center;
  }

  .summary-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .carrito-container {
    padding: 0 1rem;
  }

  .cart-item {
    padding: 1rem;
  }

  .item-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .quantity-controls {
    justify-content: center;
  }

  .empty-cart-content {
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