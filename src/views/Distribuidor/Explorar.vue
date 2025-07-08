<template>
  <DistribuidorLayout titulo="Explorar productos" subtitulo="Explora las publicaciones disponibles en la plataforma">
    <div class="content-wrapper">
      <!-- Search and Filter Bar -->
      <div class="toolbar">
        <div class="search-container-main">
          <input
              type="text"
              placeholder="Buscar productos..."
              class="buscar-prod"
              v-model="searchQuery"
          />
          <span class="search-icon-main">🔍</span>
        </div>
        <div class="filter-controls">
          <button class="filtro-btn">
            <span class="filter-icon">⚙️</span>
            Filtros
          </button>
          <select class="categoria-select">
            <option value="">Todas las categorías</option>
            <option value="frutas">Frutas</option>
            <option value="verduras">Verduras</option>
            <option value="granos">Granos</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        <div
            v-for="pub in filteredPublicaciones"
            :key="pub.id"
            class="product-card"
        >
          <div class="product-image">
            <div class="image-placeholder">
              <span class="image-icon">🌱</span>
            </div>
            <div class="product-badge">Disponible</div>
          </div>

          <div class="product-content">
            <h3 class="product-name">{{ pub.nombre }}</h3>
            <p class="product-description">{{ pub.descripcion }}</p>

            <div class="product-details">
              <div class="price-info">
                <span class="price">S/ {{ pub.precio || '25.00' }}</span>
                <span class="unit">por kg</span>
              </div>
              <div class="stock-info">
                <span class="stock-text">Stock: {{ pub.stock || '50' }}kg</span>
              </div>
            </div>

            <div class="product-meta">
              <div class="producer-info">
                <span class="producer-icon">👨‍🌾</span>
                <span class="producer-name">{{ pub.productor || 'Productor Local' }}</span>
              </div>
              <div class="location-info">
                <span class="location-icon">📍</span>
                <span class="location-text">{{ pub.ubicacion || 'Lima, Perú' }}</span>
              </div>
            </div>
          </div>

          <div class="product-actions">
            <button class="view-details-btn" @click="verDetalles(pub)">
              <span class="btn-icon">👁️</span>
              Ver detalles
            </button>
            <button class="add-to-cart-btn" @click="agregarACarrito(pub)">
              <span class="btn-icon">🛒</span>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPublicaciones.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar tus filtros de búsqueda</p>
      </div>

      <!-- Pagination -->
      <div class="pagination-section">
        <div class="pagination-info">
          Mostrando {{ filteredPublicaciones.length }} de {{ publicaciones.length }} productos
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" disabled>← Anterior</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <button class="pagination-btn">Siguiente →</button>
        </div>
      </div>
    </div>
  </DistribuidorLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { obtenerPublicaciones } from '../../services/api'
import DistribuidorLayout from './LayoutDistribuidor.vue'

const publicaciones = ref([])
const searchQuery = ref('')

onMounted(async () => {
  publicaciones.value = await obtenerPublicaciones()
})

const filteredPublicaciones = computed(() => {
  if (!searchQuery.value) return publicaciones.value
  return publicaciones.value.filter(pub =>
      pub.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pub.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const agregarACarrito = (pub) => {
  console.log('AGREGAR AL CARRITO:', pub)

  if (!pub.id) {
    console.warn('El producto no tiene ID:', pub)
    showNotification('Error: producto inválido', 'error')
    return
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || []
  const existingItem = carrito.find(item => item.id === pub.id)

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1
  } else {
    carrito.push({
      id: pub.id,
      nombre: pub.nombre,
      descripcion: pub.descripcion,
      precio: pub.precio,
      stock: pub.stock,
      productor: pub.productor || 'Productor Local',
      ubicacion: pub.ubicacion || 'Perú',
      quantity: 1
    })
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))
  console.log('Carrito actualizado:', carrito)
  showNotification('Producto agregado al carrito', 'success')
}


const verDetalles = (publicacion) => {
  // Navigate to product details
  console.log('Ver detalles:', publicacion)
}

const showNotification = (message, type = 'info') => {
  // Create a simple notification system
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
.content-wrapper {
  padding: 0;
}

.toolbar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-container-main {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.buscar-prod {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.buscar-prod:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
}

.search-icon-main {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5e3c;
  font-size: 1.2rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filtro-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.filtro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 94, 60, 0.4);
}

.categoria-select {
  padding: 14px 16px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #3e2c23;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.categoria-select:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 235, 224, 0.7));
  border: 2px solid rgba(142, 94, 60, 0.1);
  border-radius: 20px;
  padding: 0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  border-color: rgba(78, 148, 79, 0.3);
}

.product-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #f5ebe0, #e8d5c4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.image-placeholder {
  text-align: center;
}

.image-icon {
  font-size: 3rem;
  color: #8b5e3c;
  opacity: 0.7;
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(78, 148, 79, 0.3);
}

.product-content {
  padding: 0 1.5rem;
  margin-bottom: 1.5rem;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.product-description {
  color: #5e473b;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(142, 94, 60, 0.1);
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #4e944f;
}

.unit {
  font-size: 0.9rem;
  color: #8b5e3c;
}

.stock-info {
  text-align: right;
}

.stock-text {
  font-size: 0.9rem;
  color: #6b4a2f;
  font-weight: 500;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.producer-info,
.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b4a2f;
}

.producer-icon,
.location-icon {
  font-size: 1rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(245, 235, 224, 0.3);
  border-top: 1px solid rgba(142, 94, 60, 0.1);
}

.view-details-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(139, 94, 60, 0.4);
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(78, 148, 79, 0.4);
}

.btn-icon {
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #8b5e3c;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #3e2c23;
}

.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(142, 94, 60, 0.1);
}

.pagination-info {
  color: #6b4a2f;
  font-size: 1rem;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 8px 16px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  background: rgba(255, 255, 255, 0.8);
  color: #3e2c23;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif';
}

.pagination-btn:hover:not(:disabled) {
  background: #4e944f;
  color: white;
  border-color: #4e944f;
}

.pagination-btn.active {
  background: #4e944f;
  color: white;
  border-color: #4e944f;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .toolbar {
    flex-direction: column;
    gap: 1rem;
  }

  .search-container-main {
    min-width: 100%;
  }

  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-card {
    margin: 0 1rem;
  }

  .pagination-section {
    flex-direction: column;
    gap: 1rem;
  }

  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .product-card {
    margin: 0 0.5rem;
  }

  .product-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .product-details {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .product-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>