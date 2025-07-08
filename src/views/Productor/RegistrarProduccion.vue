<template>
  <div class="app-layout">
    <!-- NAVBAR -->
    <nav class="navbar">
      <!-- Notificaciones a la IZQUIERDA -->
      <div class="nav-left">
        <div class="notification-badge">🔔</div>
      </div>

      <!-- Nombre Qahwa CENTRADO -->
      <div class="nav-center">Qahwa</div>

      <div class="nav-right"></div>
    </nav>

    <!-- CONTENIDO GENERAL (sidebar + área principal)-->
    <section class="layout">
      <!-- SIDEBAR pegado al lado izquierdo -->
      <aside class="sidebar">
        <div class="search-container">
          <input
              type="text"
              placeholder="Buscar…"
              class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <!-- Navegación principal -->
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

      <!-- ÁREA CENTRAL (lo que vaya mostrando cada sección) -->
      <main class="content">
        <div class="content-header">
          <h2>Registrar Producción</h2>
          <p class="content-subtitle">Aquí puedes registrar una nueva producción de café que estés gestionando actualmente.</p>
        </div>

        <div class="form-container">
          <form class="registro-form" @submit.prevent="registrarProduccion">
            <div class="form-group">
              <label for="nombre">Nombre de la Producción</label>
              <input
                  id="nombre"
                  v-model="nombre"
                  type="text"
                  placeholder="Ej: Finca El Mirador - Lote A"
                  class="form-input"
                  required
              />
            </div>

            <div class="form-group">
              <label for="ubicacion">Ubicación</label>
              <input
                  id="ubicacion"
                  v-model="ubicacion"
                  type="text"
                  placeholder="Ej: Chanchamayo, Junín"
                  class="form-input"
                  required
              />
            </div>

            <div class="form-group">
              <label for="variedad">Variedad del Café</label>
              <input
                  id="variedad"
                  v-model="variedad"
                  type="text"
                  placeholder="Ej: Caturra, Typica, Bourbon"
                  class="form-input"
                  required
              />
            </div>

            <div class="form-group">
              <label for="etapa">Etapa Actual</label>
              <select
                  id="etapa"
                  v-model="etapa"
                  class="form-select"
                  required
              >
                <option disabled value="">Selecciona la etapa actual</option>
                <option value="floracion">Floración</option>
                <option value="maduracion">Maduración</option>
                <option value="cosecha">Cosecha</option>
                <option value="procesamiento">Procesamiento</option>
                <option value="secado">Secado</option>
              </select>
            </div>

            <div class="form-group">
              <label for="fecha">Fecha de Inicio</label>
              <input
                  id="fecha"
                  type="date"
                  v-model="fecha"
                  class="form-input"
                  required
              />
            </div>

            <div class="form-actions">
              <button
                  type="button"
                  @click="$router.push('/produccion')"
                  class="btn-secondary"
              >
                <span class="btn-icon">↩️</span>
                Volver
              </button>
              <button
                  type="submit"
                  class="btn-primary"
              >
                <span class="btn-icon">✅</span>
                Registrar Producción
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { crearProduccion } from '../../services/api.js'

const router = useRouter()
const nombre = ref('')
const ubicacion = ref('')
const variedad = ref('')
const etapa = ref('')
const fecha = ref('')

async function registrarProduccion () {
  const usuarioId = localStorage.getItem('usuarioId')
  if (!usuarioId) {
    alert('Usuario no identificado')
    return
  }

  const nuevaProduccion = {
    usuarioId,
    nombre: nombre.value,
    descripcion:
        `Ubicación: ${ubicacion.value}, Variedad: ${variedad.value}, ` +
        `Etapa: ${etapa.value}, Fecha: ${fecha.value}`
  }

  try {
    await crearProduccion(nuevaProduccion)
    router.push('/produccion')
  } catch (e) {
    console.error(e)
    alert('Error al registrar la producción')
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

.form-container {
  max-width: 600px;
  margin: -200px auto 0;
}

.registro-form {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border: 2px solid rgba(142, 94, 60, 0.15);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;

  font-weight: 600;
  color: #3e2c23;
  font-size: 1.1rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  color: #3e2c23;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.form-input::placeholder {
  color: #8b5e3c;
  opacity: 0.7;
}

.form-select {
  cursor: pointer;
}

.form-select option {
  background: #fefaf6;
  color: #3e2c23;
  padding: 8px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(142, 94, 60, 0.15);
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 94, 60, 0.4);
}

.btn-icon {
  font-size: 1rem;
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

  .registro-form {
    padding: 2rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
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

  .registro-form {
    padding: 1.5rem;
  }

  .form-container {
    max-width: 100%;
  }
}
</style>