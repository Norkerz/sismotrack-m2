# SismoTrack — Terremotos recientes

SismoTrack es una aplicación sencilla creada con Vite, React y TypeScript. Consulta los terremotos registrados en todo el mundo durante las últimas 24 horas y permite buscar y filtrar los resultados.

## Funcionalidades

- Descarga datos reales de una API pública.
- Muestra estados de carga, error y respuesta vacía.
- Permite buscar terremotos por el texto del lugar.
- Permite seleccionar una magnitud mínima.
- Limpia todos los filtros con un botón.
- Calcula la cantidad de resultados y su magnitud media.
- Clasifica visualmente cada terremoto como bajo, moderado, fuerte o muy fuerte.
- Muestra lugar, magnitud, fecha, profundidad y enlace oficial.
- Se adapta a pantallas de ordenador y móvil.

## API oficial del USGS

La aplicación utiliza el feed GeoJSON de todos los terremotos del último día publicado por el Servicio Geológico de Estados Unidos (USGS):

```text
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

No necesita clave, usuario ni registro. La propiedad `features` contiene la lista de eventos sísmicos.

## Tecnologías

- Vite
- React
- TypeScript
- HTML semántico
- CSS
- Fetch API

No se añadieron dependencias nuevas.

## Instalación

```bash
npm install
npm run dev
```

Para comprobar el proyecto:

```bash
npm run lint
npm run build
```

## Estructura

```text
src/
├── components/
│   └── TarjetaTerremoto.tsx
├── services/
│   └── api.ts
├── utils/
│   └── terremotos.ts
├── App.tsx
├── main.tsx
└── styles.css
```

- `main.tsx` inicia React.
- `App.tsx` contiene los cinco estados, carga los datos y organiza la interfaz.
- `api.ts` realiza la petición con `fetch` y comprueba la respuesta.
- `terremotos.ts` define los tipos y contiene las funciones con `map`, `filter` y `reduce`.
- `TarjetaTerremoto.tsx` recibe un terremoto mediante props y muestra sus datos.
- `styles.css` contiene el diseño y la adaptación a móvil.

## Decisiones técnicas

La petición se hace una sola vez al abrir la aplicación. Después, los filtros trabajan sobre los terremotos ya guardados en el estado, por lo que escribir en la búsqueda no genera nuevas peticiones.

La API, la transformación de datos y la presentación están separadas. Así cada archivo tiene una responsabilidad fácil de localizar y explicar.

## Uso de IA

El alumno eligió la temática de datos reales de terremotos mediante una conversación con IA. Codex generó y organizó una parte importante del código, los estilos y la documentación de SismoTrack.

Fragmento real del prompt utilizado:

> “Crear desde cero: SismoTrack — Terremotos registrados en las últimas 24 horas”.

No se afirma que el alumno haya escrito manualmente el código generado por Codex. Antes de la defensa, el alumno debe revisar, ejecutar y aprender el flujo completo hasta poder explicar cada archivo con sus propias palabras.

La verificación técnica indicada para el proyecto consiste en ejecutar `npm run lint` y `npm run build`. Las pruebas manuales de carga real, filtros, enlaces y estados de error deben realizarse también en el navegador antes de entregar.

## Autopsia

### 1. Feed de 24 horas frente a búsquedas históricas

Se eligió el feed de las últimas 24 horas porque solo necesita una petición fija y mantiene el proyecto sencillo. Una búsqueda histórica configurable habría necesitado campos de fecha, parámetros adicionales y más validaciones.

### 2. Tarjetas frente a un mapa interactivo

Se eligieron tarjetas porque permiten mostrar todos los datos obligatorios sin dependencias externas y son fáciles de defender. La alternativa era representar las coordenadas en un mapa interactivo, pero habría añadido una librería y conceptos que no ayudan a demostrar los requisitos principales de M2.
