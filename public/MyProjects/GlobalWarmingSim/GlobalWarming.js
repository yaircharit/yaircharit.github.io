(() => {
  "use strict";

  /** @type {{ init: any; update: any }} */
  const config = {
    init: {
      board_size: 51,
      water_border_size: 3,
      precs: {
        // initial spawn percentages
        city: 98,
        forest: 30,
        glacier: 90,
      },
    },
    update: {
      env: {
        temp: {
          // Temperatures for environment changes
          scorch: 100,
          descorch: 60,
          freeze: -10,
          unfreeze: -20,
          deforest: 65,
          forest: 45,
          city: 42,
        },
        pol: {
          // Pollution values for environment changes
          deforest: 25,
          forest: 1,
          city: 0.4,
        },
      },
      pol: {
        glacier: -1,
        water: -1,
        ground: -1,
        forest: 0.1,
        city: 25,
        scorched: -1,
      },
    },
  };

  const els = {
    gameboard: /** @type {HTMLDivElement} */ (document.getElementById("gameboard")),
    stopButton: /** @type {HTMLButtonElement} */ (document.getElementById("button-stop")),
    runButton: /** @type {HTMLButtonElement} */ (document.getElementById("button-run")),
    stepButton: /** @type {HTMLButtonElement} */ (document.getElementById("button-step")),
    timeLabel: /** @type {HTMLLabelElement} */ (document.getElementById("time-label")),
    vars: /** @type {HTMLDivElement} */ (document.getElementById("vars")),
    updateVars: /** @type {HTMLDivElement} */ (document.getElementById("update-vars")),
    helpButton: /** @type {HTMLButtonElement} */ (document.getElementById("button-help")),
    helpModal: /** @type {HTMLDivElement} */ (document.getElementById("help-modal")),
    helpClose: /** @type {HTMLButtonElement} */ (document.getElementById("help-close")),
  };

  const mod = (n, m) => (n + m) % m;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const rand = (num) => Math.round(Math.random() * num);

  class GameTileView {
    constructor() {
      this.panel = document.createElement("div");
      this.panel.classList.add("game-tile");

      this.tempLabel = document.createElement("label");
      this.panel.appendChild(this.tempLabel);

      this.polLabel = document.createElement("label");
      this.panel.appendChild(this.polLabel);

      this.windLabel = document.createElement("label");
      this.panel.appendChild(this.windLabel);

      this.cloudsLabel = document.createElement("label");
      this.panel.appendChild(this.cloudsLabel);
    }

    update(gameTile) {
      this.envColor(gameTile.env);
      this.tempLabel.textContent = `Temp: ${gameTile.temp.toFixed(2)}`;
      this.polLabel.textContent = `Pol: ${gameTile.polution.toFixed(2)}`;
      this.windLabel.textContent = `W: ${gameTile.wind_str}, ->${gameTile.wind_dir}`;
      this.cloudsLabel.textContent = `C: ${gameTile.clouds}, ${gameTile.rain}`;
    }

    envColor(env) {
      this.panel.style.backgroundColor = `var(--${env}-color)`;
    }
  }

  class GameTile {
    constructor(loc = [0, 0], env = "water", temp = -999, pol = -999, height = -999, tileView = undefined) {
      this.location = loc;
      this.env = env;
      this.temp = temp !== -999 ? temp : this.envTemp;
      this.polution =
        pol !== -999 ? pol : this.env === "city" ? 30 : this.env === "forest" ? 2 : 0;
      if (this.polution < 0) this.polution = 0;
      this.height = height !== -999 ? height : 0;
      this.wind_str = rand(4);
      this.wind_dir = this.wind_str > 0 ? rand(8) : -1;
      this.clouds = rand(3);
      this.rain = rand(this.clouds);
      this.tile = tileView !== undefined ? tileView : new GameTileView();
    }

    get envPolution() {
      return config.update.pol[this.env];
    }

    get envTemp() {
      switch (this.env) {
        case "water":
          return 20;
        case "glacier":
          return -40;
        case "ground":
        case "forest":
        case "city":
          return 25;
        default:
          return 25;
      }
    }

    clone() {
      return new GameTile(this.location, this.env, this.temp, this.polution, this.height, this.tile);
    }

    // Allocation-light version of get_next_gen():
    // - no neighborhood array allocation
    // - no filter() allocations
    get_next_gen_from_board(board, size, i0, j0) {
      const cpy = this.clone();
      let temp_sum = 0;
      let pol_sum = 0;
      let items_count = 0;
      let was_windy = false;
      let glacierCount = 0;
      let waterCount = 0;

      // Match the old getNeighborhood() push order for wind logic.
      let nIndex = 0;
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          const obj = board[mod(i0 + di, size)][mod(j0 + dj, size)];
          temp_sum += obj.temp;
          pol_sum += obj.polution;
          items_count++;
          if (obj.env === "glacier") glacierCount++;
          else if (obj.env === "water") waterCount++;

          if (obj.wind_str > 0 && 8 - obj.wind_dir === nIndex && cpy.wind_dir !== nIndex) {
            const windCarry = obj.wind_str * 0.1;
            items_count += windCarry;
            temp_sum += windCarry * obj.temp;
            pol_sum += windCarry * obj.polution;
            cpy.wind_str = Math.min(4, Math.max(obj.wind_str + rand(2) - 1, 0));
            cpy.wind_dir = rand(8);
            cpy.clouds = Math.min(3, Math.max(obj.clouds + rand(2) - 1, 0));
            cpy.rain = cpy.clouds > 0 ? Math.min(3, Math.max(obj.rain + rand(2) - 1, 0)) : 0;
            was_windy = true;
          }
          nIndex++;
        }
      }

      cpy.polution = pol_sum / items_count + cpy.envPolution;
      if (cpy.polution < 0) cpy.polution = 0;

      cpy.temp = temp_sum / items_count - (cpy.rain + cpy.wind_str + cpy.clouds) / 6 + cpy.polution / 6;

      if (glacierCount === 9) {
        cpy.temp += 10;
      } else if (waterCount === 9) {
        cpy.temp -= 10;
      }

      if (!was_windy) {
        cpy.wind_str = Math.min(4, Math.max(cpy.wind_str + rand(2) - 1, 0));
        cpy.clouds = Math.min(3, Math.max(cpy.clouds + rand(2) - 1, 0));
        if (cpy.clouds > 0) cpy.rain = Math.min(3, Math.max(cpy.rain + rand(2) - 1, 0));
        cpy.wind_dir = rand(8);
      }

      if (cpy.temp > config.update.env.temp.scorch) {
        cpy.env = "scorched";
      } else if (cpy.temp <= config.update.env.temp.freeze) {
        cpy.env = "glacier";
      } else if (cpy.env === "glacier" && cpy.temp >= config.update.env.temp.unfreeze) {
        cpy.env = "water";
      } else if (
        (cpy.env === "forest" &&
          (cpy.temp >= config.update.env.temp.deforest || cpy.polution >= config.update.env.pol.deforest)) ||
        (cpy.env === "scorched" && cpy.temp <= config.update.env.temp.descorch)
      ) {
        cpy.env = "ground";
      } else if (
        cpy.env === "ground" &&
        cpy.temp <= config.update.env.temp.forest &&
        cpy.polution < config.update.env.pol.forest
      ) {
        cpy.env = "forest";
      } else {
        let forestOkCount = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            const obj = board[mod(i0 + di, size)][mod(j0 + dj, size)];
            if (
              obj.env === "forest" &&
              obj.temp < config.update.env.temp.city &&
              obj.polution < config.update.env.pol.city
            ) {
              forestOkCount++;
            }
          }
        }
        if (forestOkCount === 9) cpy.env = "city";
      }

      cpy.tile.update(cpy);
      return cpy;
    }
  }

  class Gameboard {
    constructor(size = config.init.board_size) {
      this.size = size;
      this.running = false;
      this.time = 0;
      this.chartUpdateEvery = 5;
      this.chartMaxPoints = 400;
      this.time_label = els.timeLabel;

      this.board = new Array(size);

      let avgs = { temp: 0, pol: 0, cities: 0 };
      for (let i = 0; i < size; i++) {
        this.board[i] = new Array(size);
        for (let j = 0; j < size; j++) {
          const r = rand(100);
          // randomize starting environment (edges and center are water)
          const env =
            i > config.init.water_border_size - 1 &&
            i < size - config.init.water_border_size &&
            j > config.init.water_border_size - 1 &&
            j < size - config.init.water_border_size &&
            !(
              i < size / 2 + config.init.water_border_size &&
              i > size / 2 - config.init.water_border_size &&
              j < size / 2 + config.init.water_border_size &&
              j > size / 2 - config.init.water_border_size
            )
              ? r > config.init.precs.city
                ? "city"
                : r > config.init.precs.forest
                  ? "forest"
                  : "ground"
              : r > config.init.precs.glacier
                ? "glacier"
                : "water";

          this.board[i][j] = new GameTile([i, j], env);
          this.board[i][j].tile.update(this.board[i][j]);

          avgs.temp += this.board[i][j].temp;
          avgs.pol += this.board[i][j].polution;
          avgs.cities += this.board[i][j].env === "city";

          els.gameboard.appendChild(this.board[i][j].tile.panel);
        }
      }

      avgs.temp /= size ** 2;
      avgs.pol /= size ** 2;

      let std_div = { temp: 0, pol: 0 };
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          std_div.temp += (this.board[i][j].temp - avgs.temp) ** 2;
          std_div.pol += (this.board[i][j].polution - avgs.pol) ** 2;
        }
      }
      std_div.temp = Math.sqrt(std_div.temp / size ** 2);
      std_div.pol = Math.sqrt(std_div.pol / size ** 2);

      // Chart.js is loaded globally from CDN
      this.chart = new Chart("chart", {
        type: "line",
        data: {
          labels: [0],
          datasets: [
            { fill: false, lineTension: 0, borderColor: "red", data: [avgs.temp], label: "Temperature" },
            { fill: false, lineTension: 0, borderColor: "green", data: [avgs.pol], label: "Polution" },
            { fill: false, lineTension: 0, borderColor: "purple", data: [avgs.cities], label: "Cities" },
            {
              fill: false,
              lineTension: 0,
              borderColor: "pink",
              data: [std_div.temp],
              label: "Temperature Standard Diviation",
            },
            {
              fill: false,
              lineTension: 0,
              borderColor: "lightgreen",
              data: [std_div.pol],
              label: "Polution Standard Diviation",
            },
          ],
        },
        options: {
          legend: { position: "bottom", labels: { fontSize: 30 } },
          animation: { duration: 0 },
          responsiveAnimationDuration: 0,
          elements: { point: { radius: 0 } },
          scales: {
            xAxes: [{ ticks: { fontSize: 20 } }],
            yAxes: [{ ticks: { fontSize: 20 } }],
          },
          annotation: { annotations: [] },
        },
      });
    }

    update() {
      const res = new Array(this.size);
      let avgs = { temp: 0, pol: 0, cities: 0 };

      for (let i = 0; i < this.size; i++) {
        res[i] = new Array(this.size);
        for (let j = 0; j < this.size; j++) {
          res[i][j] = this.board[i][j].get_next_gen_from_board(this.board, this.size, i, j);
          avgs.temp += res[i][j].temp;
          avgs.pol += res[i][j].polution;
          avgs.cities += res[i][j].env === "city";
        }
      }

      avgs.temp /= this.size * this.size;
      avgs.pol /= this.size * this.size;

      let std_div = { temp: 0, pol: 0 };
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          std_div.temp += (this.board[i][j].temp - avgs.temp) ** 2;
          std_div.pol += (this.board[i][j].polution - avgs.pol) ** 2;
        }
      }
      std_div.temp = Math.sqrt(std_div.temp / this.size ** 2);
      std_div.pol = Math.sqrt(std_div.pol / this.size ** 2);

      this.board = res;
      this.time_label.textContent = `Time: ${++this.time}`;

      if (this.time % this.chartUpdateEvery === 0) {
        this.chart.data.datasets[0].data.push(avgs.temp);
        this.chart.data.datasets[1].data.push(avgs.pol);
        this.chart.data.datasets[2].data.push(avgs.cities);
        this.chart.data.datasets[3].data.push(std_div.temp);
        this.chart.data.datasets[4].data.push(std_div.pol);
        this.chart.data.labels.push(this.time);

        const maxPoints = this.chartMaxPoints;
        const labels = this.chart.data.labels;
        if (labels.length > maxPoints) {
          labels.splice(0, labels.length - maxPoints);
          for (let k = 0; k < this.chart.data.datasets.length; k++) {
            const arr = this.chart.data.datasets[k].data;
            arr.splice(0, arr.length - maxPoints);
          }
        }

        this.chart.update(0);
      }
    }

    async run() {
      if (this.running) return;
      this.running = true;

      while (this.running) {
        this.update();
        await sleep(250);
      }

      els.stopButton.style.backgroundColor = "maroon";
    }

    stop() {
      if (!this.running) return;
      this.running = false;
      els.stopButton.style.backgroundColor = "gray";
      els.runButton.style.backgroundColor = "rgb(66, 146, 66)";
    }
  }

  const buildPollutionControls = () => {
    els.vars.textContent = "";
    const keys = Object.keys(config.update.pol);
    for (const key of keys) {
      const wrapper = document.createElement("div");
      wrapper.className = "var-elements";

      const label = document.createElement("label");
      label.className = "vars-label";
      label.htmlFor = `${key}-pol-var`;
      label.textContent = `${key}:`;

      const input = document.createElement("input");
      input.id = `${key}-pol-var`;
      input.name = key;
      input.type = "number";
      input.value = String(config.update.pol[key]);
      input.addEventListener("change", () => {
        config.update.pol[key] = Number(input.value);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      els.vars.appendChild(wrapper);
    }
  };

  const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

  const buildUpdateControls = () => {
    els.updateVars.textContent = "";

    /**
     * @param {any} obj
     * @param {string[]} path
     * @param {HTMLDivElement} container
     */
    const walk = (obj, path, container) => {
      if (!isPlainObject(obj)) return;

      const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
      for (const key of keys) {
        const value = obj[key];
        const nextPath = [...path, key];
        const fullKey = nextPath.join(".");

        if (typeof value === "number" && Number.isFinite(value)) {
          const wrapper = document.createElement("div");
          wrapper.className = "var-elements";

          const label = document.createElement("label");
          label.className = "vars-label";
          const inputId = `upd-${nextPath.join("-")}`;
          label.htmlFor = inputId;
          // Show a compact label like "scorch:" under the env subgroup
          label.textContent = `${key}:`;

          const input = document.createElement("input");
          input.id = inputId;
          input.type = "number";
          input.value = String(value);
          input.addEventListener("change", () => {
            obj[key] = Number(input.value);
          });

          wrapper.appendChild(label);
          wrapper.appendChild(input);
          container.appendChild(wrapper);
          continue;
        }

        if (isPlainObject(value)) {
          // Flatten nested objects: we group only at the top level (env.temp / env.pol)
          walk(value, nextPath, container);
        }
      }
    };

    // Keep it "similar to pol edit" but focused on config.update variables
    // that actually change the rules (env thresholds), avoiding duplicating the pol edit UI.
    const env = config.update.env;
    const topKeys = Object.keys(env).sort((a, b) => a.localeCompare(b)); // pol, temp
    for (const topKey of topKeys) {
      const header = document.createElement("label");
      header.className = "vars-label";
      header.style.width = "fit-content";
      header.textContent = `env.${topKey}`;
      els.updateVars.appendChild(header);

      const groupWrapper = document.createElement("div");
      groupWrapper.style.display = "flex";
      groupWrapper.style.flexDirection = "column";
      els.updateVars.appendChild(groupWrapper);

      walk(env[topKey], ["env", topKey], groupWrapper);
    }
  };

  // Boot
  const gb = new Gameboard();
  buildPollutionControls();
  buildUpdateControls();

  els.stepButton.addEventListener("click", () => gb.update());
  els.runButton.addEventListener("click", () => {
    els.runButton.style.backgroundColor = "gray";
    gb.run();
  });
  els.stopButton.addEventListener("click", () => gb.stop());

  // Help modal
  const openHelp = () => {
    els.helpModal.classList.remove("is-hidden");
    els.helpModal.setAttribute("aria-hidden", "false");
    els.helpClose.focus();
  };
  const closeHelp = () => {
    els.helpModal.classList.add("is-hidden");
    els.helpModal.setAttribute("aria-hidden", "true");
    els.helpButton.focus();
  };

  els.helpButton.addEventListener("click", openHelp);
  els.helpClose.addEventListener("click", closeHelp);

  // click outside the dialog closes
  els.helpModal.addEventListener("click", (e) => {
    if (e.target === els.helpModal) closeHelp();
  });

  // Esc closes
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!els.helpModal.classList.contains("is-hidden")) closeHelp();
  });
})();

