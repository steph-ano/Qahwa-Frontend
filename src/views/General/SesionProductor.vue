<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUsuario } from '../../services/api.js'
import Navbar from "../../components/Navbar.vue";

const email = ref('')
const password = ref('')
const router = useRouter()

async function ingresar () {
  try {
    const user = await loginUsuario({ email: email.value, password: password.value, tipo: 'productor' })
    localStorage.setItem('usuarioId', user.id)           // ← AQUÍ
    router.push('/produccion')
  } catch (e) {
    alert('Correo o contraseña incorrectos')
  }
}
</script>

<template>
  <Navbar />
  <div class="wrapper">
    <div class="formulario">
      <h2>Productor, inicia sesión en tu cuenta</h2>
      <hr />
      <label>Correo electrónico:</label>
      <input type="email" v-model="email" />
      <label>Contraseña:</label>
      <input type="password" v-model="password" />
      <div><input type="checkbox" /> Recordarme</div>
      <button @click="ingresar">Ingresar</button>
    </div>
  </div>
</template>


<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fefaf6;
  padding: 1rem;
}

.formulario {
  max-width: 420px;
  margin: 10vh auto;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #3e2c23;
  margin-bottom: 1rem;
}

hr {
  margin: 1rem 0 2rem;
  border: none;
  border-top: 1px solid #ccc;
}

label {
  display: block;
  font-weight: 600;
  margin-top: 1rem;
  color: #5e473b;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #c7b6a4;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.2);
}

input[type="checkbox"] {
  margin-right: 0.5rem;
  accent-color: #4e944f;
}

.formulario > div {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #3e2c23;
  display: flex;
  align-items: center;
}

button {
  width: 100%;
  margin-top: 2rem;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: #4e944f;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #3c7c3e;
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
  .formulario {
    margin: 8vh 1rem;
    padding: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
