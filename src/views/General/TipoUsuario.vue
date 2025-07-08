<template>
  <Navbar />
  <div class="wrapper">
    <div class="container">
      <h1>Bienvenido de vuelta !</h1>
      <p>Para poder continuar indícanos qué tipo de usuario eres:</p>
      <button @click="$router.push('/sesion-productor')">Productor</button>
      <button @click="$router.push('/sesion-distribuidor')">Distribuidor</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";

export default {
  name: 'TipoUsuario',
  components: {Navbar}
};
</script>

<style scoped>
/* Envoltorio que centra la tarjeta */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fefaf6;
}

.container {
  width: 100%;
  max-width: 800px; /* antes 600px */

  padding: 4rem 3rem; /* más espacio interno */
  background: linear-gradient(to bottom right, #f5ebe0, #fffdf9);
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  text-align: center;
  animation: fadeInUp 0.6s ease-out;
}

.container h1 {
  font-size: 2.5rem; /* antes 2rem */
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #3e2c23;
}

.container p {
  font-size: 1.3rem; /* antes 1.125rem */
  color: #5e473b;
  margin-bottom: 2.5rem;
}

button {
  padding: 1rem 2rem; /* más grande */
  margin: 0 0.75rem;
  font-size: 1.125rem; /* más grande */
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.1);
}

button:first-of-type {
  background-color: #4e944f; /* verde natural */
}

button:last-of-type {
  background-color: #8b5e3c; /* marrón café */
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
  .container {
    padding: 2rem 1rem;
    margin: 1rem;
  }

  button {
    display: block;
    width: 100%;
    margin: 0.75rem 0;
  }
}
</style>
