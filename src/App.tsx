import { useEffect, useState } from 'react'
import TarjetaTerremoto from './components/TarjetaTerremoto'
import { obtenerTerremotos } from './services/api'
import {
  calcularResumen,
  filtrarTerremotos,
  transformarTerremotos,
  type Terremoto,
} from './utils/terremotos'

function App() {
  const [terremotos, setTerremotos] = useState<Terremoto[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [magnitudMinima, setMagnitudMinima] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarTerremotos() {
      try {
        const eventosApi = await obtenerTerremotos()
        const terremotosPreparados = transformarTerremotos(eventosApi)
        setTerremotos(terremotosPreparados)
      } catch {
        setError(
          'No se pudieron cargar los terremotos. Comprueba tu conexión e inténtalo de nuevo.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarTerremotos()
  }, [])

  const terremotosFiltrados = filtrarTerremotos(
    terremotos,
    busqueda,
    magnitudMinima,
  )
  const resumen = calcularResumen(terremotosFiltrados)

  function limpiarFiltros() {
    setBusqueda('')
    setMagnitudMinima(0)
  }

  return (
    <>
      <header className="cabecera">
        <h1>SismoTrack</h1>
        <p>
          Terremotos registrados en todo el mundo durante las últimas 24 horas.
        </p>
      </header>

      <main>
        <section className="resumen" aria-labelledby="titulo-resumen">
          <h2 id="titulo-resumen">Resumen de resultados</h2>
          <div className="resumen-datos">
            <p>
              <strong>{resumen.cantidad}</strong>
              Terremotos encontrados
            </p>
            <p>
              <strong>{resumen.magnitudMedia.toFixed(1)}</strong>
              Magnitud media
            </p>
          </div>
        </section>

        <section className="filtros" aria-labelledby="titulo-filtros">
          <h2 id="titulo-filtros">Filtrar terremotos</h2>
          <form onSubmit={(evento) => evento.preventDefault()}>
            <div className="campo">
              <label htmlFor="busqueda">Buscar por lugar</label>
              <input
                id="busqueda"
                type="search"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Ej.: California"
              />
            </div>

            <div className="campo">
              <label htmlFor="magnitud">Magnitud mínima</label>
              <select
                id="magnitud"
                value={magnitudMinima}
                onChange={(evento) =>
                  setMagnitudMinima(Number(evento.target.value))
                }
              >
                <option value={0}>Todos</option>
                <option value={1}>Magnitud 1 o superior</option>
                <option value={2.5}>Magnitud 2.5 o superior</option>
                <option value={4.5}>Magnitud 4.5 o superior</option>
                <option value={6}>Magnitud 6 o superior</option>
              </select>
            </div>

            <button type="button" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </form>
        </section>

        <section className="resultados" aria-labelledby="titulo-resultados">
          <h2 id="titulo-resultados">Terremotos recientes</h2>

          {cargando && <p className="mensaje">Cargando terremotos...</p>}

          {error && (
            <p className="mensaje mensaje-error" role="alert">
              {error}
            </p>
          )}

          {!cargando && !error && terremotos.length === 0 && (
            <p className="mensaje">
              La API no ha devuelto terremotos en las últimas 24 horas.
            </p>
          )}

          {!cargando &&
            !error &&
            terremotos.length > 0 &&
            terremotosFiltrados.length === 0 && (
              <p className="mensaje">
                No hay terremotos que coincidan con los filtros.
              </p>
            )}

          {!cargando && !error && terremotosFiltrados.length > 0 && (
            <div className="lista-terremotos">
              {terremotosFiltrados.map((terremoto) => (
                <TarjetaTerremoto
                  key={terremoto.id}
                  terremoto={terremoto}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>SismoTrack · Datos proporcionados por USGS</p>
      </footer>
    </>
  )
}

export default App
