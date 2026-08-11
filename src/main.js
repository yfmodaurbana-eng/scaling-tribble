import { aquariumConfig } from "./config/aquariumConfig.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="app">
    <header class="topbar">
      <div>
        <h1>Aquarium Studio</h1>
        <p>Configurador y simulador de acuarios</p>
      </div>

      <div class="project-status">
        Proyecto nuevo
      </div>
    </header>

    <section class="workspace">

      <aside class="panel panel-left">
        <div class="panel-section">
          <span class="eyebrow">Configurador</span>
          <h2>Crear acuario</h2>
          <p class="muted">
            Configura las dimensiones y estructura del acuario.
          </p>
        </div>

        <div class="panel-section">
          <h3>Dimensiones</h3>

          <div class="dimension-preview">
            <div>
              <span>Largo</span>
              <strong>${aquariumConfig.dimensions.length} cm</strong>
            </div>

            <div>
              <span>Ancho</span>
              <strong>${aquariumConfig.dimensions.width} cm</strong>
            </div>

            <div>
              <span>Alto</span>
              <strong>${aquariumConfig.dimensions.height} cm</strong>
            </div>
          </div>
        </div>

        <div class="panel-section">
          <h3>Estructura</h3>

          <div class="status-row">
            <span>Refuerzo</span>
            <strong>
              ${aquariumConfig.structure.reinforced ? "Sí" : "No"}
            </strong>
          </div>

          <div class="status-row">
            <span>Tirantes</span>
            <strong>${aquariumConfig.structure.braceCount}</strong>
          </div>
        </div>

        <div class="panel-section">
          <h3>Objetos</h3>

          <div class="object-list">
            <button>🌿 Plantas</button>
            <button>🪨 Rocas</button>
            <button>🪵 Troncos</button>
            <button>🐟 Peces</button>
          </div>
        </div>

        <div class="recommendation-box">
          <span class="eyebrow">Recomendación profesional</span>
          <p>
            Las recomendaciones técnicas aparecerán aquí según
            las características del acuario.
          </p>
        </div>
      </aside>

      <section class="viewer">
        <div class="viewer-toolbar">
          <span>SIMULADOR 3D</span>

          <div class="viewer-controls">
            <button title="Vista inicial">↻</button>
            <button title="Alejar">−</button>
            <button title="Acercar">+</button>
            <button title="Pantalla completa">⛶</button>
          </div>
        </div>

        <div class="aquarium-placeholder">
          <div class="water-glow"></div>

          <div class="aquarium-frame">
            <div class="aquarium-water">
              <div class="plant plant-one">🌿</div>
              <div class="plant plant-two">🌿</div>
              <div class="rock rock-one">🪨</div>
              <div class="rock rock-two">🪨</div>
              <div class="fish fish-one">🐟</div>
              <div class="fish fish-two">🐠</div>
            </div>
          </div>

          <p class="viewer-message">
            Motor 3D preparado para la siguiente fase
          </p>
        </div>
      </section>

      <aside class="panel panel-right">

        <div class="panel-section">
          <span class="eyebrow">Proyecto</span>
          <h2>Ficha técnica</h2>
        </div>

        <div class="technical-card">

          <div class="technical-row">
            <span>Largo</span>
            <strong>${aquariumConfig.dimensions.length} cm</strong>
          </div>

          <div class="technical-row">
            <span>Ancho</span>
            <strong>${aquariumConfig.dimensions.width} cm</strong>
          </div>

          <div class="technical-row">
            <span>Alto</span>
            <strong>${aquariumConfig.dimensions.height} cm</strong>
          </div>

          <div class="technical-row">
            <span>Refuerzo</span>
            <strong>
              ${aquariumConfig.structure.reinforced ? "Sí" : "No"}
            </strong>
          </div>

          <div class="technical-row">
            <span>Tirantes</span>
            <strong>${aquariumConfig.structure.braceCount}</strong>
          </div>

        </div>

        <div class="technical-actions">
          <button class="primary-button">
            Generar ficha técnica
          </button>

          <button class="secondary-button">
            Copiar ficha técnica
          </button>
        </div>

      </aside>

    </section>
  </main>
`
