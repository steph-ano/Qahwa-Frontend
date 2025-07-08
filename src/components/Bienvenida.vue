<template>
  <div>
    <h1>¡Bienvenido, {{ nombre }}!</h1>
    <p>Gracias por llenar el formulario.</p>
  </div>
</template>

<script setup>
defineProps(['nombre'])
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
