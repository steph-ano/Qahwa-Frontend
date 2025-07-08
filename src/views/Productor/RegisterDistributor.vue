<template>
  <div>
    <Navbar />
    <div class="form-container">
      <div class="form-box">
        <h2 class="center-text">Distribuidor</h2>
        <h3 class="center-text">Crea tu cuenta</h3>
        <hr />

        <div class="form-group">
          <label for="name">Nombre completo:</label>
          <input type="text" id="name" placeholder="Ingresa tu nombre completo" v-model="name" />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" placeholder="Ingresa tu correo electrónico" v-model="email" />
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" v-model="password" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirmar contraseña:</label>
          <input type="password" id="confirm-password" placeholder="Confirma tu contraseña" v-model="confirmPassword" />
        </div>

        <button @click="register">Registrar</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import { registrarUsuario } from '../../services/api.js'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    await registrarUsuario({
      nombre: name.value,
      email: email.value,
      password: password.value,
      tipo: 'distribuidor'
    })
    router.push('/validacion-registro')
  } catch (error) {
    console.error('Error al registrar:', error)
    alert('Error al registrar usuario')
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefaf6;
  padding: 1rem;
  text-align: center;
  min-height: calc(100vh - 100px); /* ← ajusta por navbar fijo */
  margin-top: 60px;
}

.form-box {
  width: 100%;
  max-width: 540px;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
  font-family: 'Segoe UI', sans-serif;
}

h2, h3 {
  color: #3e2c23;
  margin-bottom: 0.25rem;
}

hr {
  margin: 1rem auto 2rem;
  border: none;
  border-top: 1px solid #ccc;
  width: 60%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5e473b;
  width: min(90%, 400px);
  margin: 0 auto 0.5rem; /* centra el label al igual que el input */
  text-align: left;

}


input {
  display: block;
  margin: 0 auto 1.5rem;
  padding: 0.75rem;
  border: 1px solid #c7b6a4;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  width: min(90%, 400px);
  transition: border-color 0.3s ease;
  background-color: #fff;
  text-align: center;
}

input:focus {
  outline: none;
  border-color: #8b5e3c;
  box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.2);
}

button {
  display: block;
  width: min(90%, 400px);
  margin: 1rem auto 0;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: #8b5e3c;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #77472f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

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
    padding: 2rem;
  }

  input, button {
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
