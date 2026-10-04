# 🍋🚀 Lemonspace · Layout LAB avanzado

Este repositorio contiene la resolución del laboratorio de layout avanzado, en el que se propone maquetar una plataforma de cine responsive. Para esta entrega he creado **Lemonspace**, una versión personalizada con mi logo y una selección de películas de ciencia ficción.

La maquetación está realizada con **HTML, CSS, SASS y VITE**, utilizando **Flexbox**, **media queries** y **container queries** para adaptar el contenido a distintos tamaños de pantalla. He utilizado plantillas **Nunjucks** para generar el catálogo desde un JSON local y **JavaScript** para la búsqueda y las fichas de las películas.

---

## 📁 Estructura del proyecto

```text
src/
├── commons/styles/          # Estilos comunes y reset
├── components/
│   ├── catalog/
│   │   ├── catalog.html     # Ranking, categorías y fichas de películas
│   │   └── _catalog.scss    # Estilos del catálogo y reglas responsive
│   ├── cards/               # Componentes conservados del laboratorio básico
│   ├── color-palette/
│   ├── menu/
│   └── theme-toggle/
├── data/
│   └── movies.json          # Películas y selección del catálogo
├── public/images/
│   └── lemonspace-logo.svg  # Logo y favicon
├── index.html               # Página principal y cabecera
├── main.js                  # Búsqueda, fichas y alternativa a imágenes fallidas
└── main.scss                # Entrada principal de estilos

vite.config.js               # Configuración de Vite y Nunjucks
```

---

## 🧪 Componentes

### 1️⃣ Cabecera y navegación

Cabecera fija que permanece visible al hacer scroll, con el logo y el enlace de inicio y el buscador integrado.

- Desde **1280 px**, se muestran el logo y el nombre de la plataforma.
- Por debajo de **1280 px**, se muestra únicamente el logo.
- Los enlaces incluyen estados de hover y foco para la navegación por teclado.

📂 `src/index.html`

---

### 2️⃣ Ranking de películas

Selección de películas destacadas con portadas verticales y números superpuestos, alineados en la parte inferior.

Los números tienen un contorno violeta y relleno transparente para mantener visible la imagen de la película.

- **Cinco películas** desde 1280 px.
- **Tres películas** por debajo de 1280 px.
- Base mínima de **225 px** por elemento.
- Distribución en una columna en móvil.

📂 `src/components/catalog/`

---

### 3️⃣ Categorías y tarjetas

Catálogo organizado en dos categorías:

- **Más allá de las estrellas**
- **Realidades que te vuelan la cabeza**

Las tarjetas utilizan imágenes horizontales, bordes redondeados y el título y el año superpuestos sobre un degradado. Incluyen un efecto de elevación suave al pasar el cursor.

La distribución se adapta mediante **Flexbox** y **container queries**, con una base mínima de **250 px** por tarjeta.

📂 `src/components/catalog/`

---

### 4️⃣ Búsqueda y fichas

El buscador de la cabecera filtra las películas de las categorías por su título en español u original, sin distinguir mayúsculas ni tildes.

Al pulsar una carátula se abre una ficha con:

- Sinopsis
- Año de estreno
- Duración
- Géneros
- Valoración

Las fichas se pueden cerrar con el botón, la tecla **Escape** o un clic fuera de la ventana.

📂 `src/main.js`

---

### 5️⃣ Datos y estilos comunes

He incluido una selección de **13 películas** con datos e imágenes obtenidos de TMDB. Los datos están guardados en un JSON local: la web es estática y no necesita consultar la API ni configurar credenciales.

El JSON contiene las películas, el orden del ranking y las categorías. Las imágenes verticales utilizan el campo `poster` y las horizontales, `backdrop`.

Los estilos están agrupados por componente con anidado de Sass, utilizando selectores como `&__list` y `&__number`. La portada utiliza también el reset de estilos comunes.

📂 `src/data/movies.json`  
📂 `src/components/catalog/_catalog.scss`  
📂 `src/commons/styles/_reset.scss`

---

## 🚀 Instalación y ejecución

Es necesario tener instalados **Node.js** y **npm**.

#### 1. Abre una terminal en la raíz del proyecto.

#### 2. Instala las dependencias:

```bash
npm install
```

#### 3. Levanta el entorno de desarrollo:

```bash
npm run dev
```

#### 4. Abre la URL que aparece en consola.

Normalmente será `http://localhost:5173`.

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

---

## 🛠️ Tecnologías usadas

- HTML5
- CSS3
- SCSS (Sass)
- JavaScript
- Vite
- Nunjucks
- Flexbox
- Media queries
- Container queries
- Responsive Design
- Prettier
