<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-left">
        <button @click="$router.go(-1)" class="back-btn">
          <span class="back-icon">←</span>
          Volver
        </button>
      </div>
      <div class="nav-center">Qahwa</div>
      <div class="nav-right">
        <div class="notification-badge">🔔</div>
      </div>
    </nav>

    <section class="layout">
      <aside class="sidebar">
        <div class="search-container">
          <input
              type="text"
              placeholder="Buscar…"
              class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <nav class="sidebar-nav">
          <button
              @click="$router.push('/')"
              class="nav-btn"
              :class="{ active: $route.path === '/' }"
          >
            <span class="nav-icon">🏠</span>
            Home
          </button>
          <button
              @click="$router.push('/produccion')"
              class="nav-btn"
              :class="{ active: $route.path === '/produccion' }"
          >
            <span class="nav-icon">☕</span>
            Producción
          </button>
          <button
              @click="$router.push('/inventario')"
              class="nav-btn active"
          >
            <span class="nav-icon">📦</span>
            Inventario
          </button>
          <button
              @click="$router.push('/publicaciones-productor')"
              class="nav-btn"
              :class="{ active: $route.path === '/publicaciones-productor' }"
          >
            <span class="nav-icon">📝</span>
            Publicaciones
          </button>
          <button
              @click="$router.push('/pedidos-productor')"
              class="nav-btn"
              :class="{ active: $route.path === '/pedidos-productor' }"
          >
            <span class="nav-icon">📋</span>
            Pedidos
          </button>
        </nav>
      </aside>

      <main class="content">
        <div class="breadcrumb">
          <span class="breadcrumb-item">Inventario</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">Detalle del Producto</span>
        </div>

        <div class="product-header">
          <div class="product-icon">📦</div>
          <div class="product-title">
            <h1>{{ producto.nombre || 'Cargando...' }}</h1>
            <p class="product-id">ID: {{ id }}</p>
          </div>
          <div class="product-actions">
            <button class="btn-edit" @click="$router.push(`/inventario/editar/${id}`)">
              <span class="btn-icon">✏️</span>
              Editar
            </button>
            <button class="btn-delete" @click="eliminarProducto">
              <span class="btn-icon">🗑️</span>
              Eliminar
            </button>
          </div>
        </div>

        <div class="product-content">
          <div class="product-grid">
            <!-- Información principal -->
            <div class="info-card">
              <div class="card-header">
                <span class="card-icon">ℹ️</span>
                <h3>Información General</h3>
              </div>
              <div class="card-content">
                <div class="info-row">
                  <span class="info-label">Nombre:</span>
                  <span class="info-value">{{ producto.nombre || 'Café Premium' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Categoría:</span>
                  <span class="info-value">{{ producto.categoria || 'Café Arábica' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Origen:</span>
                  <span class="info-value">{{ producto.origen || 'Valle del Cauca' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Fecha de registro:</span>
                  <span class="info-value">{{ producto.fecha || '2024-01-15' }}</span>
                </div>
              </div>
            </div>

            <!-- Estado e inventario -->
            <div class="info-card">
              <div class="card-header">
                <span class="card-icon">📊</span>
                <h3>Estado e Inventario</h3>
              </div>
              <div class="card-content">
                <div class="info-row">
                  <span class="info-label">Estado:</span>
                  <span class="status-badge" :class="'status-' + (producto.estado || 'disponible').toLowerCase()">
                    {{ producto.estado || 'Disponible' }}
                  </span>
                </div>
                <div class="info-row">
                  <span class="info-label">Cantidad:</span>
                  <span class="quantity-badge">{{ producto.cantidad || '250' }} kg</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Precio por kg:</span>
                  <span class="price-badge">S/ {{ producto.precio || '25.50' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Valor total:</span>
                  <span class="total-badge">S/ {{ calcularTotal() }}</span>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="info-card full-width">
              <div class="card-header">
                <span class="card-icon">📝</span>
                <h3>Descripción</h3>
              </div>
              <div class="card-content">
                <p class="description-text">
                  {{ producto.descripcion || 'Café de alta calidad cultivado en las montañas del Valle del Cauca. Proceso de tostado medio que resalta las notas frutales y el aroma característico de la región. Ideal para métodos de preparación como pour over, french press y espresso.' }}
                </p>
              </div>
            </div>

            <!-- Características -->
            <div class="info-card">
              <div class="card-header">
                <span class="card-icon">⭐</span>
                <h3>Características</h3>
              </div>
              <div class="card-content">
                <div class="characteristics-grid">
                  <div class="characteristic-item">
                    <span class="char-icon">🌱</span>
                    <span class="char-label">Variedad</span>
                    <span class="char-value">{{ producto.variedad || 'Caturra' }}</span>
                  </div>
                  <div class="characteristic-item">
                    <span class="char-icon">🔥</span>
                    <span class="char-label">Tostado</span>
                    <span class="char-value">{{ producto.tostado || 'Medio' }}</span>
                  </div>
                  <div class="characteristic-item">
                    <span class="char-icon">🌊</span>
                    <span class="char-label">Proceso</span>
                    <span class="char-value">{{ producto.proceso || 'Lavado' }}</span>
                  </div>
                  <div class="characteristic-item">
                    <span class="char-icon">⛰️</span>
                    <span class="char-label">Altitud</span>
                    <span class="char-value">{{ producto.altitud || '1800m' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Historial -->
            <div class="info-card">
              <div class="card-header">
                <span class="card-icon">📈</span>
                <h3>Historial Reciente</h3>
              </div>
              <div class="card-content">
                <div class="history-timeline">
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <span class="timeline-date">Hoy</span>
                      <span class="timeline-text">Producto consultado</span>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <span class="timeline-date">2 días</span>
                      <span class="timeline-text">Cantidad actualizada</span>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <span class="timeline-date">1 semana</span>
                      <span class="timeline-text">Producto agregado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { eliminarProductoPorId } from '../../services/api.js'

const eliminarProducto = async () => {
  const confirmar = confirm('¿Estás seguro de eliminar este producto?')
  if (confirmar) {
    await eliminarProductoPorId(id)
    router.push('/inventario')
  }
}
const route = useRoute()
const id = route.params.id

// Datos del producto (simulados)
const producto = ref({
  nombre: 'Café Premium Arábica',
  categoria: 'Café Arábica',
  origen: 'Valle del Cauca',
  fecha: '2024-01-15',
  estado: 'disponible',
  cantidad: 250,
  precio: 25.50,
  descripcion: 'Café de alta calidad cultivado en las montañas del Valle del Cauca. Proceso de tostado medio que resalta las notas frutales y el aroma característico de la región. Ideal para métodos de preparación como pour over, french press y espresso.',
  variedad: 'Caturra',
  tostado: 'Medio',
  proceso: 'Lavado',
  altitud: '1800m'
})

const calcularTotal = () => {
  return ((producto.value.cantidad || 250) * (producto.value.precio || 25.50)).toFixed(2)
}

// Simular carga de datos
onMounted(() => {
  // Aquí iría la llamada a la API para cargar los datos del producto
  console.log('Cargando producto con ID:', id)
})
</script>

<style scoped>
.app-layout {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fefaf6;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left, .nav-right {
  flex: 1;
}

.nav-center {
  text-align: center;
  letter-spacing: 1px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}

.back-icon {
  font-size: 1.2rem;
}

.notification-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  margin-left: auto;
}

.notification-badge:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.layout {
  display: flex;
  min-height: calc(100vh - 80px);
}

.sidebar {
  width: 280px;
  background: linear-gradient(to bottom, #fffdf9, #f5ebe0);
  border-right: 1px solid rgba(142, 94, 60, 0.15);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
}

.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 45px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5e3c;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  color: #3e2c23;
  text-align: left;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-btn.active {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border-color: #4e944f;
  box-shadow: 0 6px 18px rgba(78, 148, 79, 0.3);
}

.nav-icon {
  font-size: 1.2rem;
}

.content {
  flex: 1;
  padding: 2.5rem 3rem;
  background: linear-gradient(to bottom right, #fefaf6, #fffdf9);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.breadcrumb-item {
  color: #5e473b;
  cursor: pointer;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: #4e944f;
}

.breadcrumb-item.active {
  color: #3e2c23;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #8b5e3c;
  font-size: 1.2rem;
}

.product-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(142, 94, 60, 0.15);
}

.product-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.product-title {
  flex: 1;
}

.product-title h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3e2c23;
  margin-bottom: 0.5rem;
}

.product-id {
  font-size: 1.1rem;
  color: #5e473b;
  margin: 0;
  font-weight: 500;
}

.product-actions {
  display: flex;
  gap: 1rem;
}

.btn-edit, .btn-delete {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-edit {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.btn-delete {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(231, 76, 60, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
}

.product-content {
  margin-top: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(142, 94, 60, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.info-card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
}

.card-icon {
  font-size: 1.5rem;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.card-content {
  padding: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(142, 94, 60, 0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #3e2c23;
  font-size: 1.1rem;
}

.info-value {
  color: #5e473b;
  font-size: 1.1rem;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-disponible {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
}

.status-agotado {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.status-pendiente {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.quantity-badge, .price-badge, .total-badge {
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
}

.quantity-badge {
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
}

.price-badge {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
}

.total-badge {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #5e473b;
  margin: 0;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.characteristic-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(142, 94, 60, 0.1);
  transition: all 0.3s ease;
}

.characteristic-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.char-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.char-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #3e2c23;
  margin-bottom: 0.3rem;
}

.char-value {
  font-size: 1rem;
  color: #5e473b;
  font-weight: 500;
}

.history-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(78, 148, 79, 0.3);
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.timeline-date {
  font-size: 0.9rem;
  color: #8b5e3c;
  font-weight: 600;
}

.timeline-text {
  font-size: 1rem;
  color: #5e473b;
}

/* Responsive */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 1.5rem;
  }

  .sidebar-nav {
    flex-direction: row;
    gap: 0.5rem;
    overflow-x: auto;
  }

  .nav-btn {
    min-width: 120px;
    justify-content: center;
  }

  .content {
    padding: 2rem 1.5rem;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-header {
    flex-direction: column;
    text-align: center;
  }

  .product-actions {
    width: 100%;
    justify-content: center;
  }

  .characteristics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem;
    font-size: 1.2rem;
  }

  .product-title h1 {
    font-size: 2rem;
  }

  .product-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-edit, .btn-delete {
    width: 100%;
    justify-content: center;
  }

  .card-content {
    padding: 1.5rem;
  }

  .characteristics-grid {
    grid-template-columns: 1fr;
  }
}
</style>