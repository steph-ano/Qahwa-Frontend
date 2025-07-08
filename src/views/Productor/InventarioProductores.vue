<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerInventarioProductor } from '../../services/api.js'

const router = useRouter()
const inventario = ref([])
const busqueda = ref('')

const cargarInventario = async () => {
  const usuarioId = localStorage.getItem('usuarioId')
  inventario.value = await obtenerInventarioProductor(usuarioId)
}

const inventarioFiltrado = computed(() => {
  if (!busqueda.value) return inventario.value
  return inventario.value.filter(producto =>
      producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

const irADetalles = (id) => {
  router.push(`/producto/${id}`)
}

const irAgregar = () => {
  router.push('/agregar-inventario')
}

onMounted(cargarInventario)
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-left">
        <div class="notification-badge">🔔</div>
      </div>
      <div class="nav-center">Qahwa</div>
      <div class="nav-right"></div>
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
              @click="router.push('/')"
              class="nav-btn"
              :class="{ active: $route.path === '/' }"
          >
            <span class="nav-icon">🏠</span>
            Home
          </button>
          <button
              @click="router.push('/produccion')"
              class="nav-btn"
              :class="{ active: $route.path === '/produccion' }"
          >
            <span class="nav-icon">☕</span>
            Producción
          </button>
          <button
              @click="router.push('/inventario')"
              class="nav-btn active"
          >
            <span class="nav-icon">📦</span>
            Inventario
          </button>
          <button
              @click="router.push('/publicaciones')"
              class="nav-btn"
              :class="{ active: $route.path === '/publicaciones' }"
          >
            <span class="nav-icon">📝</span>
            Publicaciones
          </button>
          <button
              @click="router.push('/pedidos-productor')"
              class="nav-btn"
              :class="{ active: $route.path === '/pedidos-productor' }"
          >
            <span class="nav-icon">📋</span>
            Pedidos
          </button>
        </nav>
      </aside>

      <main class="content">
        <div class="content-header">
          <h1>Inventario</h1>
          <p class="content-subtitle">Gestiona y supervisa tu inventario de productos de café</p>
        </div>

        <div class="toolbar">
          <div class="search-container-main">
            <input
                v-model="busqueda"
                type="text"
                placeholder="Buscar productos en inventario..."
                class="search-input-main"
            />
            <span class="search-icon-main">🔍</span>
          </div>
          <button class="filtro-btn">
            <span class="filter-icon">⚙️</span>
            Filtros
          </button>
        </div>

        <div class="table-container">
          <div class="table-wrapper">
            <table class="inventory-table">
              <thead>
              <tr>
                <th>
                  <div class="th-content">
                    <span class="th-icon">📦</span>
                    Producto
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span class="th-icon">📅</span>
                    Fecha
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span class="th-icon">🔄</span>
                    Estado
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span class="th-icon">📊</span>
                    Cantidad
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span class="th-icon">⚡</span>
                    Acciones
                  </div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="producto in inventarioFiltrado" :key="producto.id" class="table-row">
                <td class="product-cell">
                  <div class="product-info">
                    <span class="product-name">{{ producto.nombre }}</span>
                  </div>
                </td>
                <td class="date-cell">{{ producto.fecha }}</td>
                <td class="status-cell">
                    <span class="status-badge" :class="'status-' + producto.estado.toLowerCase()">
                      {{ producto.estado }}
                    </span>
                </td>
                <td class="quantity-cell">
                  <span class="quantity-badge">{{ producto.cantidad }}</span>
                </td>
                <td class="actions-cell">
                  <button @click="irADetalles(producto.id)" class="btn-ver">
                    <span class="btn-icon">👁️</span>
                    Ver
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="action-section">
          <button @click="irAgregar" class="btn-agregar">
            <span class="btn-icon">➕</span>
            Agregar nuevo producto
          </button>
        </div>
      </main>
    </section>
  </div>
</template>

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

.notification-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
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

.content-header {
  margin-bottom: 2.5rem;
}

.content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3e2c23;
  margin-bottom: 1rem;
}

.content-subtitle {
  font-size: 1.2rem;
  color: #5e473b;
  margin-bottom: 0;
}

.toolbar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: center;
}

.search-container-main {
  position: relative;
  flex: 1;
}

.search-input-main {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.search-input-main:focus {
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
}

.filtro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 94, 60, 0.4);
}

.filter-icon {
  font-size: 1.1rem;
}

.table-container {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(142, 94, 60, 0.15);
}

.table-wrapper {
  overflow-x: auto;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
}

.inventory-table thead {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
}

.inventory-table th {
  padding: 1.5rem 1.25rem;
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
  position: relative;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.th-icon {
  font-size: 1.1rem;
}

.table-row {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(142, 94, 60, 0.1);
}

.table-row:hover {
  background: rgba(78, 148, 79, 0.05);
  transform: translateX(2px);
}

.inventory-table td {
  padding: 1.25rem;
  font-size: 1rem;
  color: #3e2c23;
}

.product-cell {
  font-weight: 600;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-name {
  font-size: 1.1rem;
  color: #3e2c23;
}

.date-cell {
  color: #5e473b;
  font-weight: 500;
}

.status-cell {
  text-align: center;
}

.status-badge {
  padding: 6px 12px;
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

.quantity-cell {
  text-align: center;
}

.quantity-badge {
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
}

.actions-cell {
  text-align: center;
}

.btn-ver {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.btn-ver:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.action-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-agregar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(139, 94, 60, 0.3);
}

.btn-agregar:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 94, 60, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
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

  .toolbar {
    flex-direction: column;
    gap: 1rem;
  }

  .inventory-table {
    font-size: 0.9rem;
  }

  .inventory-table th,
  .inventory-table td {
    padding: 0.75rem 0.5rem;
  }

  .th-content {
    flex-direction: column;
    gap: 4px;
  }

  .th-icon {
    font-size: 1rem;
  }

  .btn-agregar {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem;
    font-size: 1.2rem;
  }

  .content h1 {
    font-size: 2rem;
  }

  .content-subtitle {
    font-size: 1rem;
  }

  .table-container {
    margin: 0 -1rem;
    border-radius: 0;
  }

  .inventory-table {
    font-size: 0.8rem;
  }

  .inventory-table th,
  .inventory-table td {
    padding: 0.5rem 0.3rem;
  }

  .status-badge,
  .quantity-badge {
    font-size: 0.8rem;
    padding: 4px 8px;
  }

  .btn-ver {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}
</style>