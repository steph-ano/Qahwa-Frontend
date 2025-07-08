<template>
  <Navbar />
  <div>
    <div class="form-container">
      <div class="form-box">
        <h2>Crea tu cuenta</h2>
        <hr />
        <label for="name">Nombre completo</label>
        <input type="text" id="name" placeholder="Ingresa tu nombre completo" />

        <label for="user-type">¿Qué tipo de usuario eres?</label>
        <button @click="goToProducer">Productor</button>
        <button @click="goToDistributor">Distribuidor</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'

const router = useRouter()

const goToProducer = () => {
  router.push('/registro-productor')
}

const goToDistributor = () => {
  router.push('/registro-distribuidor')
}
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefaf6;
  padding: 1rem;
  min-height: calc(100vh - 100px); /* ← ajusta por navbar fijo */
  margin-top: 60px;
}


.form-box {
  max-width: 480px;
  width: 100%;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #3e2c23;
}

hr {
  margin: 1rem 0 2rem;
  border: none;
  border-top: 1px solid #ccc;
}

label {
  display: block;
  text-align: left;
  font-weight: 600;
  margin-top: 1rem;
  color: #5e473b;
}

input[type="text"] {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #c7b6a4;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.2);
}

button {
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background-color: #4e944f;
  transition: transform 0.2s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

button:last-of-type {
  background-color: #8b5e3c;
}

button:hover {
  transform: translateY(-2px);
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

/* Responsive */
@media (max-width: 480px) {
  .form-box {
    padding: 2rem 1.25rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.95rem;
  }
}

</style>
