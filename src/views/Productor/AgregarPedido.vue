<template>
  <div class="container">
    <div class="card">
      <h2>Nuevo Pedido</h2>
      <form @submit.prevent="guardarPedido">
        <div class="field">
          <label>Cliente</label>
          <input v-model="cliente" type="text" required />
        </div>
        <div class="field">
          <label>Costo (S/.)</label>
          <input v-model.number="costo" type="number" step="0.01" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary">Guardar pedido</button>
          <router-link to="/pedidos-productor" class="btn-secondary">← Volver a Pedidos</router-link>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { guardarPedido } from '../../services/api.js'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      cliente: '',
      costo: 0
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async guardarPedido() {
      try {
        const nuevoPedido = {
          cliente: this.cliente,
          costo: this.costo,
          fecha: new Date().toISOString().split('T')[0]
        }

        await guardarPedido(nuevoPedido)
        this.router.push('/pedidos-productor')
      } catch (error) {
        console.error('Error al guardar el pedido:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fffdf9, #fefaf6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 235, 224, 0.7));
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(142, 94, 60, 0.1);
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #3e2c23;
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  color: #5e473b;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(142, 94, 60, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  color: #3e2c23;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4e944f;
  box-shadow: 0 0 0 3px rgba(78, 148, 79, 0.1);
}

button[type="submit"] {
  width: 100%;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
  margin-top: 1rem;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  background: #3e7a3f;
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #4e944f, #3e7a3f);
  color: white;
  box-shadow: 0 4px 12px rgba(78, 148, 79, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 148, 79, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #8b5e3c, #6d4a2f);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 94, 60, 0.4);
}


</style>