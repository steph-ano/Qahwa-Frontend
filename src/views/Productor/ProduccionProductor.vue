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
              class="nav-btn active"
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
              class="nav-btn"
              :class="{ active: $route.path === '/publicaciones' }"
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
          <h2>Producción</h2>
          <p class="content-subtitle">Aquí puedes visualizar de forma general las producciones de café que actualmente gestionas.</p>
        </div>

        <div class="toolbar">
          <div class="search-container-main">
            <input
                type="text"
                placeholder="Buscar producción..."
                class="buscar-prod"
            />
            <span class="search-icon-main">🔍</span>
          </div>
          <button class="filtro-btn">
            <span class="filter-icon">⚙️</span>
            Filtro
          </button>
        </div>

        <div class="producciones-container">
          <div
              v-for="(produccion, index) in producciones"
              :key="index"
              class="produccion-item"
          >
            <div class="produccion-content">
              <h4>{{ produccion.nombre }}</h4>
              <p>{{ produccion.descripcion }}</p>
            </div>
            <button class="detalles-btn">
              <span class="btn-icon">👁️</span>
              Detalles
            </button>
          </div>
        </div>

        <div class="action-section">
          <button class="registrar-btn" @click="$router.push('/registrar-produccion')">
            <span class="btn-icon">➕</span>
            Registrar nueva producción
          </button>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerProducciones } from '../../services/api.js'

const producciones = ref([])

onMounted(async () => {
  const usuarioId = localStorage.getItem('usuarioId')
  if (!usuarioId) return

  try {
    producciones.value = await obtenerProducciones(usuarioId)
  } catch (e) {
    console.error(e)
  }
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

.buscar-prod {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
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

.producciones-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.produccion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border: 2px solid rgba(142, 94, 60, 0.15);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.produccion-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  border-color: rgba(78, 148, 79, 0.3);
}

.produccion-content h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 0.5rem;
}

.produccion-content p {
  font-size: 1rem;
  color: #5e473b;
  margin: 0;
}

.detalles-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
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

.registrar-btn {
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

.registrar-btn:hover {
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

  .produccion-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .detalles-btn {
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

  .produccion-item {
    padding: 1rem;
  }

  .registrar-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>