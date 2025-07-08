
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
            <span class="nav-icon">🌱</span>
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
            <span class="nav-icon">📢</span>
            Publicaciones
          </button>
          <button
              @click="$router.push('/pedidos-productor')"
              class="nav-btn active"
          >
            <span class="nav-icon">🛒</span>
            Pedidos
          </button>
        </nav>
      </aside>

      <main class="content">
        <div class="content-header">
          <h2>Pedidos</h2>
          <p class="content-subtitle">Aquí puedes visualizar y gestionar todos los pedidos recibidos de tus clientes.</p>
        </div>

        <div class="toolbar">
          <div class="search-container-main">
            <input
                type="text"
                placeholder="Buscar pedido..."
                class="buscar-prod"
            />
            <span class="search-icon-main">🔍</span>
          </div>
          <button class="filtro-btn">
            <span class="filter-icon">⚙️</span>
            Filtro
          </button>
        </div>

        <div class="table-container">
          <div class="table-wrapper">
            <table class="pedidos-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="pedido in pedidos" :key="pedido.id" class="pedido-row">
                <td class="pedido-id">{{ pedido.id }}</td>
                <td class="pedido-fecha">{{ pedido.fecha }}</td>
                <td class="pedido-cliente">{{ pedido.cliente }}</td>
                <td class="pedido-costo">S/ {{ pedido.costo }}</td>
                <td class="pedido-acciones">
                  <button class="detalles-btn" @click="$router.push(`/pedidos/${pedido.id}`)">
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
          <button class="registrar-btn" @click="$router.push('/agregar-pedido')">
            <span class="btn-icon">➕</span>
            Registrar nuevo pedido
          </button>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { obtenerPedidos } from "../../services/api.js";

export default {
  data() {
    return {
      pedidos: []
    }
  },
  mounted() {
    obtenerPedidos().then(data => {
      this.pedidos = data
    })
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

.table-container {
  margin-bottom: 3rem;
}

.table-wrapper {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 235, 224, 0.6));
  border: 2px solid rgba(142, 94, 60, 0.15);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.pedidos-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.pedidos-table thead {
  background: linear-gradient(135deg, #f5ebe0, #e8d5c4);
}

.pedidos-table th {
  padding: 1.5rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #3e2c23;
  text-align: left;
  border-bottom: 2px solid rgba(142, 94, 60, 0.2);
}

.pedido-row {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(142, 94, 60, 0.1);
}

.pedido-row:hover {
  background: rgba(78, 148, 79, 0.05);
  transform: translateX(5px);
}

.pedido-row:last-child {
  border-bottom: none;
}

.pedidos-table td {
  padding: 1.5rem 2rem;
  font-size: 1rem;
  color: #5e473b;
  vertical-align: middle;
}

.pedido-id {
  font-weight: 700;
  color: #3e2c23;
}

.pedido-fecha {
  color: #6b4a2f;
}

.pedido-cliente {
  font-weight: 600;
  color: #3e2c23;
}

.pedido-costo {
  font-weight: 700;
  color: #4e944f;
  font-size: 1.1rem;
}

.pedido-acciones {
  text-align: right;
}

.detalles-btn {
  display: inline-flex;
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

  .table-wrapper {
    overflow-x: auto;
  }

  .pedidos-table {
    min-width: 600px;
  }

  .pedidos-table th,
  .pedidos-table td {
    padding: 1rem;
  }

  .registrar-btn {
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

  .pedidos-table th,
  .pedidos-table td {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .detalles-btn {
    padding: 8px 12px;
    font-size: 0.8rem;
  }
}
</style>