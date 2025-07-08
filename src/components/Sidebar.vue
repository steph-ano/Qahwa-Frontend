<!-- src/components/Sidebar.vue -->
<template>
  <aside class="sidebar">
    <h1 class="logo">Qahwa</h1>
    <nav class="nav-links">
      <router-link to="/produccion">Producción</router-link>
      <router-link to="/perfil">Perfil</router-link>
      <router-link to="/configuracion">Configuración</router-link>
      <router-link to="/logout">Cerrar sesión</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: #f5ebe0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3e2c23;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.nav-links a {
  text-decoration: none;
  color: #5e473b;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #4e944f;
}
</style>
