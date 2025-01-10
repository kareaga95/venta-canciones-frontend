## [1.0.0] - 2025-01-10

### ### Añadidos

- Implementación de navbar con autenticación de usuario, manejo de dropdown y manejo de sesión reactiva.

- Componente de footer estilizado con enlaces y redes sociales.

- Diseño de la página de inicio con estructura en grid para mostrar las tarjetas de canciones.

- Creación del componente UserPurchases con opción de descarga de canciones compradas.

- Funcionalidad de búsqueda implementada en el header.

- Manejo de errores de autorización con mensajes de advertencia y redirección automática al login.

## [0.0.9] - 2025-01-09

### Añadidos

- Controladores de Stripe para pagos y validación de transacciones.

- Implementación de componentes de confirmación de pago.

- Estilización del modal de baja de usuario.

### Arreglos

- Solucionado error 403 Forbidden en la descarga de canciones compradas.

- Ajuste de tokens de autenticación en headers.

## [0.0.8] - 2025-01-08

### Añadidos

- Manejo de errores global en los controladores de canción y compras.

- Función de recuperación automática de sesión al recargar la página.

## [0.0.7] - 2025-01-07

### Añadidos

- Componente SongCard estilizado con hover animado.

- Incorporación de botón de descarga con validación de compras.

### Arreglos

- Corrección de validación para que el usuario solo pueda descargar canciones que ha comprado.

## [0.0.6] - 2025-01-06

### Añadidos

- Página de listado de canciones del artista.

- Componente de subida de nuevas canciones.

## [0.0.5] - 2025-01-05

### Añadidos

- Controladores de login y register con validación de JWT.

- Middleware para autorización con rutas protegidas (isAuthenticated, isAdmin, songBelongsToUser).

## [0.0.4] - 2025-01-04

### Añadidos

- Dockerización del frontend y backend para simplificar el entorno de desarrollo.

## [0.0.3] - 2025-01-03

### Añadidos

- Conexión con la base de datos usando Sequelize para manejar artistas, canciones y compras.

## [0.0.2] - 2025-01-02

### Añadidos

- Configuración inicial del proyecto de frontend: estructura básica con componentes principales (Home, Login, Navbar, Footer).

## [0.0.1] - 2024-12-22

### Añadidos

- Creación del repositorio y primera versión del README.md.

- Definición de estructura de carpetas para el proyecto frontend.