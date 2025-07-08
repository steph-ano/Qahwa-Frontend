// src/services/api.js
import axios from 'axios'

const API = axios.create({ baseURL: 'https://dbjson-91de.onrender.com' })

/* ---------- LOGIN ---------- */
export const loginUsuario = async ({ email, password, tipo }) => {
    const { data } = await API.get('/usuarios', { params: { email, password, tipo } })
    if (data.length === 0) throw new Error('Credenciales incorrectas')
    return data[0]                    // ← usuario encontrado
}

/* ---------- PRODUCCIONES ---------- */
export const crearProduccion = async (produccion) => {
    const { data } = await API.post('/producciones', produccion)
    return data
}

export const obtenerProducciones = async (usuarioId) => {
    const { data } = await API.get('/producciones', { params: { usuarioId } })
    return data
}

export const registrarUsuario = async (usuario) => {
    const respuesta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

    if (!respuesta.ok) {
        throw new Error('Error al registrar usuario')
    }

    return await respuesta.json()
}

/* ---------- INVENTARIO ---------- */

export const obtenerInventarioProductor = async (usuarioId) => {
    const { data } = await API.get('/inventario', { params: { usuarioId } })
    return data
}

export const registrarInventario = async (nuevoProducto) => {
    const { data } = await API.post('/inventario', nuevoProducto)
    return data
}

/* ---------- PUBLICACIONES ---------- */

export const guardarPublicacion = async (publicacion) => {
    const { data } = await API.post('/publicaciones', publicacion)
    return data
}
export const obtenerPublicaciones = async (usuarioId) => {
    const { data } = await API.get('/publicaciones', { params: { usuarioId } })
    return data
}
export const obtenerPublicacionPorId = async (id) => {
    const { data } = await API.get(`/publicaciones/${id}`)
    return data
}

export const eliminarPublicacion = async (id) => {
    await API.delete(`/publicaciones/${id}`)
}
export const actualizarPublicacion = async (id, publicacionActualizada) => {
    const { data } = await API.put(`/publicaciones/${id}`, publicacionActualizada)
    return data
}

/* ---------- PEDIDOS ---------- */
export const obtenerPedidos = async () => {
    const { data } = await API.get('/pedidos')
    return data
}
export const guardarPedido = async (pedido) => {
    const { data } = await API.post('/pedidos', pedido)
    return data
}
export const obtenerPedidoPorId = async (id) => {
    const { data } = await API.get(`/pedidos/${id}`)
    return data
}

/* ---------- INVENTARIO (EDICIÓN y ELIMINACIÓN) ---------- */

export const obtenerProductoPorId = async (id) => {
    const { data } = await API.get(`/inventario/${id}`)
    return data
}

export const actualizarProducto = async (id, productoActualizado) => {
    const { data } = await API.put(`/inventario/${id}`, productoActualizado)
    return data
}

export const eliminarProductoPorId = async (id) => {
    await API.delete(`/inventario/${id}`)
}

/* ---------- DISTRIBUIDOR ---------- */

// Publicaciones disponibles
export const obtenerTodasPublicaciones = async () => {
    const { data } = await API.get('/publicaciones')
    return data
}

// Carrito
export const agregarAlCarrito = async (item) => {
    const { data } = await API.post('/carrito', item)
    return data
}
export const obtenerCarrito = async () => {
    const { data } = await API.get('/carrito')
    return data
}
export const eliminarDelCarrito = async (id) => {
    await API.delete(`/carrito/${id}`)
}

// Compras
export const obtenerHistorialCompras = async (usuarioId) => {
    const { data } = await API.get('/compras', { params: { usuarioId } })
    return data
}
export const realizarCompra = async (compra) => {
    const { data } = await API.post('/compras', compra)
    return data
}


