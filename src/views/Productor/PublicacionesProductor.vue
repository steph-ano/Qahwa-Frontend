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
              class="nav-btn"
              :class="{ active: $route.path === '/inventario' }"
          >
            <span class="nav-icon">📦</span>
            Inventario
          </button>
          <button
              @click="$router.push('/publicaciones')"
              class="nav-btn active"
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
        <div class="content-header">
          <h2>Mis Publicaciones</h2>
          <p class="content-subtitle">Gestiona y visualiza todas tus publicaciones de café para atraer a más clientes.</p>
        </div>

        <div class="toolbar">
          <div class="search-container-main">
            <input
                type="text"
                v-model="busqueda"
                placeholder="Buscar publicación..."
                class="buscar-pub"
            />
            <span class="search-icon-main">🔍</span>
          </div>
          <button class="filtro-btn">
            <span class="filter-icon">⚙️</span>
            Filtro
          </button>
        </div>

        <div class="publicaciones-grid">
          <div
              v-for="(pub, index) in publicacionesFiltradas"
              :key="index"
              class="publicacion-card"
          >
            <div class="card-header">
              <h3>{{ pub.titulo }}</h3>
              <div class="card-actions">
                <button class="action-btn edit-btn" @click="editarPublicacion(pub.id)">
                  <span class="btn-icon">✏️</span>
                </button>
                <button class="action-btn delete-btn" @click="eliminar(pub.id)">
                  <span class="btn-icon">🗑️</span>
                </button>
              </div>
            </div>
            <p class="fecha">{{ pub.fecha }}</p>
            <div class="card-content">
              <p class="descripcion">{{ pub.datos || 'Sin descripción disponible' }}</p>
            </div>
            <div class="card-footer">
              <button class="detalles-btn" @click="verDetalles(pub.id)">
                <span class="btn-icon">👁️</span>
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        <div class="action-section">
          <button class="add-btn" @click="$router.push('/agregar-publicacion')">
            <span class="btn-icon">➕</span>
            Nueva publicación
          </button>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerPublicaciones, eliminarPublicacion } from '../../services/api.js'

const publicaciones = ref([])
const busqueda = ref('')
const router = useRouter()
const usuarioId = localStorage.getItem('usuarioId')

onMounted(async () => {
  if (usuarioId) {
    publicaciones.value = await obtenerPublicaciones(usuarioId)
  }
})

const publicacionesFiltradas = computed(() => {
  if (!busqueda.value) return publicaciones.value
  return publicaciones.value.filter((pub) =>
      pub.titulo.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

const verDetalles = (id) => {
  router.push(`/publicacion/${id}`)
}

const editarPublicacion = (id) => {
  router.push(`/editar-publicacion/${id}`)
}

const eliminar = async (id) => {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar esta publicación?')
  if (!confirmar) return

  try {
    await eliminarPublicacion(id)
    publicaciones.value = publicaciones.value.filter((pub) => pub.id !== id)
    alert('Publicación eliminada correctamente.')
  } catch (error) {
    console.error('Error al eliminar:', error)
    alert('Ocurrió un error al eliminar la publicación.')
  }
}
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

.content h2 {
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

.buscar-pub {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.buscar-pub:focus {
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

.publicaciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.publicacion-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border: 2px solid rgba(142, 94, 60, 0.15);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
}

.publicacion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  border-color: rgba(78, 148, 79, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3e2c23;
  margin: 0;
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(142, 94, 60, 0.2);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
}

.edit-btn:hover {
  border-color: #4e944f;
  box-shadow: 0 2px 8px rgba(78, 148, 79, 0.2);
}

.delete-btn:hover {
  border-color: #d32f2f;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.2);
}

.fecha {
  font-size: 0.9rem;
  color: #8b5e3c;
  margin-bottom: 1rem;
  font-weight: 500;
}

.card-content {
  margin-bottom: 1.5rem;
}

.descripcion {
  color: #5e473b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.detalles-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.detalles-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.action-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.add-btn {
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

.add-btn:hover {
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

  .publicaciones-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .publicacion-card {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
  }

  .card-actions {
    align-self: flex-end;
  }

  .add-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem;
    font-size: 1.2rem;
  }

  .content h2 {
    font-size: 2rem;
  }

  .content-subtitle {
    font-size: 1rem;
  }

  .publicacion-card {
    padding: 1rem;
  }

  .card-header h3 {
    font-size: 1.2rem;
  }
}
</style>