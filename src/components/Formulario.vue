<template>
  <div>
    <nav class="navbar">
      <h1>Qahwa</h1>
    </nav>

    <div class="contenedor">
      <h2>Formulario de contacto</h2>
      <form @submit.prevent="enviarFormulario">
        <div>
          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="nombre" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" v-model="mensaje" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nombre = ref('')
const email = ref('')
const mensaje = ref('')
const router = useRouter()

function enviarFormulario() {
  router.push(`/bienvenida/${encodeURIComponent(nombre.value)}`)
}
</script>

<style scoped>
/* Navbar */
.navbar {
  width: 100%;
  background-color: #4e944f; /* verde tierra */
  color: white;
  padding: 1rem 0;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Contenedor del formulario */
.contenedor {
  max-width: 600px;
  margin: 100px auto 2rem;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.8s ease-out;
}

.contenedor h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #3e2c23;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

form > div {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #5e473b;
  font-size: 1rem;
}

input,
textarea {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #c7b6a4;
  border-radius: 10px;
  background-color: #fff;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.2);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  background-color: #8b5e3c; /* marrón café */
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background-color: #77472f;
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
@media (max-width: 600px) {
  .contenedor {
    margin: 90px 1rem;
    padding: 2rem;
  }

  .contenedor h2 {
    font-size: 1.6rem;
  }
}
</style>
