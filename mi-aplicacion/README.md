# 💿 Share Your Song

Share Your Song es una aplicación web de compra venta de canciones que permite a los usuarios comprar canciones de otros usuarios y subir sus propias canciones para venderlas. La plataforma proporciona herramientas intuitivas para subir canciones y comprar.

## 📋 Tabla de Contenidos

1. [Características](#-características)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Instalación](#-instalación)
4. [Uso](#-uso)
5. [Endpoints](#-endpoints)
6. [Colaboradores](#-colaboradores)


## 🌟 Características

-   Registro y autenticación de usuarios.
-   Añadir, editar y eliminar canciones, usuarios, artistas.
-   Compra y venta de canciones.

## 🛠️ Tecnologías Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF5733?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![JSDoc](https://img.shields.io/badge/JSDoc-FFA500?style=for-the-badge&logo=javascript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)


## ⚙️ Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/kareaga95/venta_canciones

    ```

2. **Crear archivo '.env'**

    Utilizando el '.env.example' crea el archivo '.env' y añade las variables de entorno

    ```plaintext
        DB_HOST=db
        DB_PORT=3308
        APP_HOST=Venta_Canciones
        APP_PORT=3001
        DB_USER=usuario
        DB_PASSWORD=12345
        DB_NAME=venta_canciones
        SECRET=clave_secreta
        DB_DIALECT=mysql
        JWT_SECRET=secretoJWTMikel
        SESSION_SECRET=secretSessionMikel
    ```

3. **Inicia el contenedor de docker**:

    Entra en la carpeta del proyecto y usa este comando para crear el contenedor

    ```bash
    docker compose up --build
    ```

4. **Disfruta de la app :)**

## 🚀 Uso

1. **Inicio de Sesión o Registro**:
    - Ingresa con tu usuario y contraseña si ya tienes una cuenta.
    - Si no tienes cuenta, regístrate rápidamente con tus datos personales.

2. **Compra de Canciones**:
    - Accede a la ventana las canciones donde puedes:
        - Ver todas todas las canciones disponibles de la tienda.
        - Filtrar titulo.
    - Añade una nueva compra pulsando en boton "Comprar" de cada canción:

3. **Venta de Canciónes:**
    - Pulsando en el boton de "Soy artista" rellenaremos el formulario para poder acceder a nuestra cuenta como artista.
    - Una vez creada la cuenta como artista, podremos subir nuestras canciones rellenando el formulario con los siguientes campos:
        -Titulo
        -Genero
        -Precio
        -Fecha de estreno
        -Portada
        -Archivo de audio

## 📌 Endpoints

/auth/login

/auth/register

/songs/

/songs/artist

/songs/:id/download

/songs/new

/songs/:id/update

/songs/:id/delete

/songs/:id


/users/

/users/new

/users/:id/update

/users/status

/users/:id

/users/email/:email


/purchases/new

/purchases/user


/artists/

/artists/:id

/artists/new

/artists/update

/artists/status