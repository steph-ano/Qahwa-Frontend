<template>
  <div>
    <Navbar />
    <div class="form-container">
      <div class="form-box">
        <h2>¡Gracias por registrarte!</h2>
        <p>Ahora eres parte de la comunidad <strong>Qahwa</strong>.</p>
        <router-link to="/tipo-usuario" class="btn">Iniciar sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue'
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 1rem;
  background-color: #fefaf6;
  margin-top: 60px;
}

.form-box {
  max-width: 500px;
  width: 100%;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInUp 0.6s ease-out;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #5e473b;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4e944f;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #3c7c3e;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Animación */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
