<template>
  <nav>
    <router-link to="/" class="logo">Qahwa</router-link>
    <div class="links">
      <router-link to="/tipo-usuario">Iniciar sesión</router-link>
      <router-link to="/registro">Registro</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  background-color: white;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center; /* centra el logo */
  padding: 0 2rem;
  box-sizing: border-box;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: #3e2c23;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.8;
}

.links {
  position: absolute;
  right: 2rem; /* ahora los links están a la derecha */
  display: flex;
  gap: 1.5rem;
}

.links a {
  text-decoration: none;
  color: #4e944f;
  font-weight: 500;
  transition: color 0.2s ease;
}

.links a:hover {
  color: #3a753b;
}
</style>
