import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/General/Home.vue'
import Register from '../views/General/Register.vue'
import RegisterProducer from '../views/Productor/RegisterProducer.vue'
import RegisterDistributor from '../views/Productor/RegisterDistributor.vue'
import Validation from '../views/General/Validation.vue'
import TipoUsuario from '../views/General/TipoUsuario.vue'
import SesionProductor from '../views/General/SesionProductor.vue'
import SesionDistribuidor from '../views/General/SesionDistribuidor.vue'
import PerfilProductor from '../views/Productor/PerfilProductor.vue'
import PerfilDistribuidor from '../views/Productor/PerfilDistribuidor.vue'
import ProduccionProductor from '../views/Productor/ProduccionProductor.vue'
import RegistrarProduccion from '../views/Productor/RegistrarProduccion.vue'
import InventarioProductores from '../views/Productor/InventarioProductores.vue'
import AgregarInventario from '../views/Productor/AgregarInventario.vue'
import PublicacionesProductor from "../views/Productor/PublicacionesProductor.vue";
import AgregarPublicacion from "../views/Productor/AgregarPublicacion.vue";
import ProductoDetalle from "../views/Productor/ProductoDetalle.vue";
import PedidosProductor from "../views/Productor/PedidosProductor.vue";
import AgregarPedido from "../views/Productor/AgregarPedido.vue";
import PublicacionDetalles from "../views/Productor/PublicacionDetalles.vue";
import EditarPublicacion from "../views/Productor/EditarPublicacion.vue";

// Distribuidor
import Explorar from '../views/Distribuidor/Explorar.vue'
import Carrito from '../views/Distribuidor/Carrito.vue'
import HistorialCompras from '../views/Distribuidor/HistorialCompras.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/registro', component: Register },
    { path: '/registro-productor', component: RegisterProducer },
    { path: '/registro-distribuidor', component: RegisterDistributor },
    { path: '/validacion-registro', component: Validation },
    { path: '/tipo-usuario', name: 'TipoUsuario', component: TipoUsuario },
    { path: '/sesion-productor', name: 'SesionProductor', component: SesionProductor },
    { path: '/sesion-distribuidor', name: 'SesionDistribuidor', component: SesionDistribuidor },
    { path: '/perfil-productor', name: 'PerfilProductor', component: PerfilProductor },
    { path: '/perfil-distribuidor', name: 'PerfilDistribuidor', component: PerfilDistribuidor },
    { path: '/produccion', name: 'ProduccionProductor', component: ProduccionProductor },
    { path: '/registrar-produccion', name: 'RegistrarProduccion', component: RegistrarProduccion },
    { path: '/inventario', name: 'InventarioProductores', component: InventarioProductores },
    { path: '/agregar-inventario', name: 'AgregarInventario', component: AgregarInventario },
    { path: '/publicaciones', name: 'PublicacionesProductor', component: PublicacionesProductor },
    { path: '/agregar-publicacion', name: 'AgregarPublicacion', component: AgregarPublicacion },
    { path: '/producto/:id', name: 'ProductoDetalle', component: ProductoDetalle },
    { path: '/pedidos-productor', name: 'PedidosProductor', component: PedidosProductor },
    { path: '/agregar-pedido', name: 'AgregarPedido', component: AgregarPedido },
    { path: '/publicacion/:id', component: PublicacionDetalles },
    { path: '/editar-publicacion/:id', component: EditarPublicacion },
    { path: '/inventario/editar/:id', name: 'EditarProducto', component: () => import('../views/Productor/EditarProducto.vue') },
    { path: '/pedidos/:id', name: 'PedidoDetalle', component: () => import('../views/Productor/PedidoDetalle.vue') },

    // Distribuidor routes
    { path: '/explorar', name: 'Explorar', component: Explorar },
    { path: '/carrito', name: 'Carrito', component: Carrito },
    { path: '/historial-compras', name: 'HistorialCompras', component: HistorialCompras }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router