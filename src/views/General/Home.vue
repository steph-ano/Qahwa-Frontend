<template>
  <div class="home-page">
    <Navbar />

    <section class="hero">
      <div class="text">
        <h1>Desde el café hasta el saco, todo bajo control.</h1>
        <p>Qahwa: Tu mejor aliado en el proceso productivo de café</p>
        <div class="buttons">
          <button class="btn productor">Productor</button>
          <button class="btn distribuidor">Distribuidor</button>
        </div>
      </div>
      <div class="image">
        <img src="../../assets/home.jpg" alt="Café" />
      </div>
    </section>

    <section class="benefits">
      <div class="benefit">
        <h3>🌱 Trazabilidad completa</h3>
        <p>Desde la siembra hasta el empaque final.</p>
      </div>
      <div class="benefit">
        <h3>📊 Datos en tiempo real</h3>
        <p>Monitorea y toma decisiones en el momento.</p>
      </div>
      <div class="benefit">
        <h3>🌍 Producción sostenible</h3>
        <p>Optimiza tus recursos y cuida el medio ambiente.</p>
      </div>
    </section>

    <section class="testimonios">
      <h2>Lo que dicen nuestros usuarios</h2>
      <div class="testimonio">
        <p>"Gracias a Qahwa, tengo el control total de mi producción. Es fácil, rápido y confiable."</p>
        <span>– Juana Rojas, Productora en Cusco</span>
      </div>
      <div class="testimonio">
        <p>"Podemos coordinar mejor con los productores. Es una revolución para la distribución."</p>
        <span>– Carlos Díaz, Distribuidor en Lima</span>
      </div>
    </section>

    <section class="cta-secundario">
      <h2>¿Listo para llevar tu café al siguiente nivel?</h2>
      <button @click="$router.push('/registro')">Empieza ahora</button>
    </section>
  </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue'
</script>

<style scoped>
.home-page {
  font-family: 'Segoe UI', sans-serif;
  background-color: #fefaf6;
  color: #2d1b0d;
}

/* Hero */
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 8%;
  min-height: 90vh;
  gap: 2rem;
  background: linear-gradient(to right, #f5ebe0, #fffaf0);
}

.text {
  flex: 1;
  min-width: 300px;
  max-width: 50%;
  animation: fadeInUp 1s ease-out;
}

.text h1 {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #3e2c23;
}

.text p {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #5e473b;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.productor {
  background-color: #4e944f;
  color: #fff;
}

.distribuidor {
  background-color: #8b5e3c;
  color: #fff;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.image {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  animation: fadeIn 1s ease-out;
}

.image img {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
}

/* Beneficios */
.benefits {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3rem 8%;
  background-color: #fffaf0;
  text-align: center;
}

.benefit {
  max-width: 280px;
  margin: 1rem;
  animation: fadeInUp 1s ease-in-out;
}

.benefit h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #3e2c23;
  margin-bottom: 0.5rem;
}

.benefit p {
  color: #5e473b;
  font-size: 0.95rem;
}

/* Testimonios */
.testimonios {
  background: #f5ebe0;
  padding: 3rem 10%;
  text-align: center;
}

.testimonios h2 {
  font-size: 1.8rem;
  color: #3e2c23;
  margin-bottom: 2rem;
}

.testimonio {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 1.5rem auto;
  color: #5e473b;
}

.testimonio span {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  color: #3e2c23;
}

/* CTA final */
.cta-secundario {
  background: #4e944f;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  margin-top: 3rem;
}

.cta-secundario h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.cta-secundario button {
  padding: 0.75rem 1.5rem;
  background: #fff;
  color: #4e944f;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-secundario button:hover {
  background: #f0f0f0;
}

/* Responsivo */
@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    padding: 3rem 5%;
    text-align: center;
  }

  .text, .image {
    max-width: 100%;
  }

  .buttons {
    justify-content: center;
  }

  .benefits {
    flex-direction: column;
    align-items: center;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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
</style>
