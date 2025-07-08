<template>
  <!-- NAVBAR -->
  <nav class="navbar">
    <!-- Notificaciones a la IZQUIERDA -->
    <div class="nav-left">
      <!-- Ícono sencillo; cámbialo por un componente o icon-font si quieres -->
      <span class="notif-icon" title="Notificaciones">🔔</span>
    </div>

    <!-- Nombre Qahwa CENTRADO -->
    <div class="nav-center">Qahwa</div>
  </nav>

  <!-- CONTENIDO GENERAL (sidebar + área principal)-->
  <section class="layout">
    <!-- SIDEBAR pegado al lado izquierdo -->
    <aside class="sidebar">
      <input
          type="text"
          placeholder="Buscar…"
          class="search"
      />

      <!-- Navegación principal -->
      <button @click="$router.push('/')">Home</button>
      <button @click="$router.push('/produccion')">Producción</button>
      <button @click="$router.push('/inventario')">Inventario</button>
      <button @click="$router.push('/publicaciones')">Publicaciones</button>
      <button @click="$router.push('/pedidos')">Pedidos</button>
    </aside>

    <!-- ÁREA CENTRAL (lo que vaya mostrando cada sección) -->
    <main class="content">
      <h2>Bienvenido, Productor</h2>
      <p>Selecciona una opción en el panel de la izquierda para empezar.</p>
    </main>
  </section>
</template>

<script setup>
// Si quisieras traer datos del usuario logeado, podrías hacerlo aquí
import {createRouter as $router} from "vue-router";
</script>

<style scoped>
/* ===== NAVBAR ===== */
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;            /* centra “Qahwa” */
  background: #222;
  color: #fff;
  height: 60px;
  position: relative;                 /* para alinear el icono a la izquierda */
}

.nav-left {
  position: absolute;
  left: 20px;
}

.notif-icon {
  font-size: 1.25rem;
  cursor: pointer;
}

/* ===== LAYOUT GENERAL ===== */
.layout {
  display: flex;
  min-height: calc(100vh - 60px);     /* resto del alto menos la navbar */
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 20%;                         /* ≈ una quinta parte */
  min-width: 220px;                   /* evita que quede muy angosto */
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 6px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 12px;
}

.sidebar button {
  text-align: left;
  padding: 10px 14px;
  border: none;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: background .2s;
}

.sidebar button:hover {
  background: #e0e0e0;
}

/* ===== ÁREA PRINCIPAL ===== */
.content {
  flex: 1;                            /* ocupa todo lo que resta */
  padding: 30px;
}
</style>
