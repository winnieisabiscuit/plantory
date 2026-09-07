(() => {
  const els = {
    globe: document.querySelector("#globe3d"),
    globeWrap: document.querySelector("#canvasWrap"),
    globeLoading: document.querySelector("#globeLoading"),
    coordinate: document.querySelector("#coordinateChip"),
    queryStatus: document.querySelector("#queryStatus"),
    rotationToggle: document.querySelector("#rotationToggle"),
    archiveCount: document.querySelector("#archiveCount"),
    countryPills: document.querySelector("#countryPills"),
    countrySelect: document.querySelector("#countrySelect"),
    countryName: document.querySelector("#countryName"),
    regionType: document.querySelector("#regionType"),
    botanicalCard: document.querySelector("#botanicalCard"),
    botanicalIndex: document.querySelector("#botanicalIndex"),
    plantRole: document.querySelector("#plantRole"),
    plantName: document.querySelector("#plantName"),
    latinName: document.querySelector("#latinName"),
    plantPhoto: document.querySelector("#plantPhoto"),
    photoCredit: document.querySelector("#photoCredit"),
    speciesRow: document.querySelector("#speciesRow"),
    plantDetail: document.querySelector("#plantDetail"),
    plantHistory: document.querySelector("#plantHistory"),
    plantChange: document.querySelector("#plantChange"),
    detailTitle: document.querySelector("#detailTitle"),
    historyTitle: document.querySelector("#historyTitle"),
    changeTitle: document.querySelector("#changeTitle"),
    nativeRange: document.querySelector("#nativeRange"),
    timeScale: document.querySelector("#timeScale"),
    rangeLabel: document.querySelector("#rangeLabel"),
    scaleLabel: document.querySelector("#scaleLabel"),
    dataNote: document.querySelector("#dataNote"),
    toast: document.querySelector("#toast"),
  };

  const EARTH_IMAGE = "./vendor/earth-blue-marble-2k.jpg";
  const EARTH_BUMP = "./vendor/earth-topology-1k.jpg";
  const INITIAL_LOCATION = { lat: 31.23, lng: 121.47 };
  const SEARCH_RADII = [50, 150, 400];
  const INAT_BASE = "https://api.inaturalist.org/v1";
  const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";
  const accents = ["#c9f58f", "#7be0c3", "#84c6ff", "#f4b86f", "#e99ab7", "#b99cf4", "#93d47a", "#f08b6b", "#8ed7d8", "#d6d37c"];

  let globe;
  let countries = [];
  let selectedFeature = null;
  let selectedCountryKey = "China";
  let selectedCountryLabel = "China";
  let selectedCoords = { ...INITIAL_LOCATION };
  let selectedRadius = 50;
  let resultPlants = [];
  let selectedPlantIndex = 0;
  let currentLookup = 0;
  let lookupController = null;
  let autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let toastTimer;
  let lastLocationEvent = { at: 0, lat: null, lng: null };
  const speciesCache = new Map();
  const wikipediaCache = new Map();
  const curatedPhotoCache = new Map();

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rendererPixelRatio = () => Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1 : 1.25);

  function formatCoords({ lat, lng }) {
    const latitude = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}`;
    const longitude = `${Math.abs(lng).toFixed(2)}°${lng >= 0 ? "E" : "W"}`;
    return `${latitude} · ${longitude}`;
  }

  function ecoLabel(lat) {
    const absolute = Math.abs(lat);
    if (absolute <= 12) return "Tropical ecosystem";
    if (absolute <= 26) return "Subtropical ecosystem";
    if (absolute <= 52) return "Temperate ecosystem";
    if (absolute <= 67) return "Boreal ecosystem";
    return "Polar ecosystem";
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
  }

  function setQueryStatus(state, title, detail) {
    els.queryStatus.classList.toggle("loading", state === "loading");
    els.queryStatus.classList.toggle("error", state === "error");
    els.queryStatus.querySelector("strong").textContent = title;
    els.queryStatus.querySelector("small").textContent = detail;
  }

  function updateRotationButton() {
    const controls = globe?.controls?.();
    if (controls) controls.autoRotate = autoRotate;
    els.rotationToggle.setAttribute("aria-pressed", autoRotate ? "false" : "true");
    els.rotationToggle.querySelector(".pause-icon").textContent = autoRotate ? "Ⅱ" : "↻";
    els.rotationToggle.querySelector(".button-label").textContent = autoRotate ? "Pause rotation" : "Resume rotation";
  }

  function countryLabel(feature) {
    if (!feature) return "Ocean coordinates";
    return feature.properties?.name || "Unknown region";
  }

  function countryKey(feature) {
    return feature?.properties?.name || "Ocean";
  }

  function getOuterRings(geometry) {
    if (!geometry) return [];
    if (geometry.type === "Polygon") return [geometry.coordinates[0]];
    if (geometry.type === "MultiPolygon") return geometry.coordinates.map((polygon) => polygon[0]);
    return [];
  }

  function largestRing(feature) {
    return getOuterRings(feature.geometry).sort((a, b) => b.length - a.length)[0] || [];
  }

  function featureCenter(feature) {
    const key = countryKey(feature);
    if (profiles[key]?.coords) {
      return { lng: profiles[key].coords[0], lat: profiles[key].coords[1] };
    }
    const ring = largestRing(feature);
    if (!ring.length) return { lng: 0, lat: 0 };
    let x = 0;
    let y = 0;
    let z = 0;
    for (const [lng, lat] of ring) {
      const lambda = (lng * Math.PI) / 180;
      const phi = (lat * Math.PI) / 180;
      x += Math.cos(phi) * Math.cos(lambda);
      y += Math.cos(phi) * Math.sin(lambda);
      z += Math.sin(phi);
    }
    return {
      lng: (Math.atan2(y, x) * 180) / Math.PI,
      lat: (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI,
    };
  }

  function normalizeRing(ring, referenceLng) {
    return ring.map(([lng, lat]) => {
      let adjusted = lng;
      while (adjusted - referenceLng > 180) adjusted -= 360;
      while (adjusted - referenceLng < -180) adjusted += 360;
      return [adjusted, lat];
    });
  }

  function pointInRing([x, y], ring) {
    const normalized = normalizeRing(ring, x);
    let inside = false;
    for (let i = 0, j = normalized.length - 1; i < normalized.length; j = i++) {
      const [xi, yi] = normalized[i];
      const [xj, yj] = normalized[j];
      const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-9) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function pointInPolygon(point, polygon) {
    return pointInRing(point, polygon[0]) && !polygon.slice(1).some((hole) => pointInRing(point, hole));
  }

  function pointInFeature([lng, lat], feature) {
    const geometry = feature.geometry;
    if (!geometry) return false;
    if (geometry.type === "Polygon") return pointInPolygon([lng, lat], geometry.coordinates);
    if (geometry.type === "MultiPolygon") return geometry.coordinates.some((polygon) => pointInPolygon([lng, lat], polygon));
    return false;
  }

  function findCountry({ lng, lat }) {
    return countries.find((feature) => pointInFeature([lng, lat], feature)) || null;
  }

  function refreshCountryLayer() {
    if (!globe) return;
    // Keep country geometry available for hit-testing, but only render the
    // selected outline. Drawing all 241 polygons every frame makes dragging
    // noticeably expensive on high-DPI screens.
    const visibleCountry = selectedFeature ? [selectedFeature] : [];
    globe
      .polygonsData(visibleCountry)
      .polygonCapColor((feature) => feature === selectedFeature ? "rgba(203, 248, 145, 0.24)" : "rgba(255, 255, 255, 0.012)")
      .polygonSideColor((feature) => feature === selectedFeature ? "rgba(108, 213, 176, 0.18)" : "rgba(0, 0, 0, 0)")
      .polygonStrokeColor((feature) => feature === selectedFeature ? "rgba(222, 255, 181, 0.95)" : "rgba(223, 244, 235, 0.2)")
      .polygonAltitude((feature) => feature === selectedFeature ? 0.012 : 0.003);
  }

  function setLocationMarker(coords) {
    if (!globe) return;
    const marker = [{ lat: coords.lat, lng: coords.lng }];
    globe
      .pointsData(marker)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#d5ff9d")
      .pointRadius(0.2)
      .pointAltitude(0.045)
      .pointResolution(16)
      .ringsData(marker)
      .ringLat("lat")
      .ringLng("lng")
      .ringColor(() => (t) => `rgba(207, 250, 157, ${1 - t})`)
      .ringMaxRadius(3)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(1150);
  }

  function resizeGlobe() {
    if (!globe) return;
    const rect = els.globe.getBoundingClientRect();
    globe.width(Math.max(1, rect.width)).height(Math.max(1, rect.height));
    globe.renderer().setPixelRatio(rendererPixelRatio());
  }

  function initGlobe() {
    globe = new Globe(els.globe, { waitForGlobeReady: true, animateIn: true })
      .width(els.globe.clientWidth)
      .height(els.globe.clientHeight)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl(EARTH_IMAGE)
      .bumpImageUrl(EARTH_BUMP)
      .showAtmosphere(true)
      .atmosphereColor("#91dff0")
      .atmosphereAltitude(0.18)
      .showGraticules(false)
      .onGlobeReady(() => els.globeLoading.classList.add("hidden"))
      .onGlobeClick((coords) => chooseLocation({ lat: coords.lat, lng: coords.lng }, findCountry(coords)))
      .onPolygonClick((feature, event, coords) => chooseLocation({ lat: coords.lat, lng: coords.lng }, feature));

    const controls = globe.controls();
    globe.renderer().setPixelRatio(rendererPixelRatio());
    const earthMaterial = globe.globeMaterial();
    earthMaterial.bumpScale = 7;
    earthMaterial.shininess = 12;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.48;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.minDistance = 132;
    controls.maxDistance = 420;

    globe.pointOfView({ ...INITIAL_LOCATION, altitude: 1.72 }, 0);
    setLocationMarker(INITIAL_LOCATION);
    refreshCountryLayer();
    updateRotationButton();

    new ResizeObserver(resizeGlobe).observe(els.globeWrap);
    els.globe.addEventListener("pointerdown", () => {
      autoRotate = false;
      els.globeWrap.classList.add("is-dragging");
      updateRotationButton();
    });
    window.addEventListener("pointerup", () => els.globeWrap.classList.remove("is-dragging"));
    els.globe.addEventListener("mousemove", (event) => {
      const rect = els.globe.getBoundingClientRect();
      const coords = globe.toGlobeCoords(event.clientX - rect.left, event.clientY - rect.top);
      if (coords) els.coordinate.textContent = formatCoords(coords);
    });
  }

  function buildCountryControls() {
    els.countrySelect.replaceChildren();
    const sorted = [...countries].sort((a, b) => countryLabel(a).localeCompare(countryLabel(b), "en"));
    for (const feature of sorted) {
      const option = document.createElement("option");
      option.value = String(feature.id);
      option.textContent = countryLabel(feature);
      els.countrySelect.append(option);
    }
    const china = countries.find((feature) => countryKey(feature) === "China");
    if (china) els.countrySelect.value = String(china.id);

    const featuredKeys = ["China", "Japan", "Indonesia", "Singapore", "Brazil", "Australia", "South Africa"];
    els.countryPills.replaceChildren();
    for (const key of featuredKeys) {
      const feature = countries.find((item) => countryKey(item) === key);
      if (!feature) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "country-pill";
      button.dataset.country = key;
      button.textContent = profiles[key]?.label || countryLabel(feature);
      button.addEventListener("click", () => goToCountry(feature));
      els.countryPills.append(button);
    }

    els.archiveCount.textContent = `${countryNamesCount()} countries and regions · Live plant records`;
  }

  function countryNamesCount() {
    return countries.length;
  }

  function updateCountryControls() {
    if (selectedFeature) els.countrySelect.value = String(selectedFeature.id);
    els.countryPills.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.country === selectedCountryKey);
    });
  }

  function goToCountry(feature) {
    const coords = featureCenter(feature);
    autoRotate = false;
    updateRotationButton();
    globe.pointOfView({ ...coords, altitude: 1.68 }, 900);
    chooseLocation(coords, feature, true);
  }

  function chooseLocation(coords, feature, force = false) {
    const now = Date.now();
    const distance = lastLocationEvent.lat == null ? Infinity : Math.hypot(coords.lat - lastLocationEvent.lat, coords.lng - lastLocationEvent.lng);
    if (!force && now - lastLocationEvent.at < 180 && distance < 0.2) return;
    lastLocationEvent = { at: now, ...coords };
    selectedCoords = { lat: clamp(coords.lat, -89.5, 89.5), lng: coords.lng };
    selectedFeature = feature || findCountry(selectedCoords);
    selectedCountryKey = countryKey(selectedFeature);
    selectedCountryLabel = countryLabel(selectedFeature);
    els.coordinate.textContent = formatCoords(selectedCoords);
    updateCountryControls();
    refreshCountryLayer();
    setLocationMarker(selectedCoords);
    lookupPlants(selectedCoords, selectedFeature);
  }

  function renderLoading() {
    els.countryName.textContent = selectedCountryLabel;
    els.regionType.textContent = `${ecoLabel(selectedCoords.lat)} · Searching`;
    els.plantName.textContent = "Finding nearby plants";
    els.latinName.textContent = formatCoords(selectedCoords);
    els.plantRole.textContent = "Live search";
    els.botanicalIndex.textContent = "LIVE";
    els.plantPhoto.removeAttribute("src");
    els.plantPhoto.classList.remove("loaded");
    els.photoCredit.textContent = "";
    els.plantDetail.textContent = "Gathering plant observations near these coordinates.";
    els.plantHistory.textContent = "The search radius will expand automatically when records are sparse.";
    els.plantChange.textContent = "Plant distributions reflect season, elevation, urbanization, and observation effort.";
    els.speciesRow.replaceChildren();
    for (let i = 0; i < 6; i += 1) {
      const skeleton = document.createElement("span");
      skeleton.className = "species-skeleton";
      els.speciesRow.append(skeleton);
    }
    setQueryStatus("loading", selectedCountryLabel, "Searching within 50 km");
  }

  function iNatUrl(coords, radius) {
    const query = new URLSearchParams({
      lat: coords.lat.toFixed(5),
      lng: coords.lng.toFixed(5),
      radius: String(radius),
      iconic_taxa: "Plantae",
      quality_grade: "research",
      captive: "false",
      per_page: "10",
      locale: "en",
    });
    return `${INAT_BASE}/observations/species_counts?${query}`;
  }

  function speciesCacheKey(coords, radius) {
    return `${coords.lat.toFixed(2)}:${coords.lng.toFixed(2)}:${radius}`;
  }

  async function fetchSpecies(coords, radius, signal) {
    const cacheKey = speciesCacheKey(coords, radius);
    if (speciesCache.has(cacheKey)) return speciesCache.get(cacheKey);
    const response = await fetch(iNatUrl(coords, radius), { signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Plant data ${response.status}`);
    const payload = await response.json();
    const results = Array.isArray(payload.results) ? payload.results : [];
    speciesCache.set(cacheKey, results);
    return results;
  }

  function livePlantFromResult(entry, index, radius) {
    const taxon = entry.taxon || {};
    const photo = taxon.default_photo || {};
    const commonName = taxon.preferred_common_name || taxon.english_common_name || taxon.name || "Unnamed plant";
    return {
      mode: "live",
      id: taxon.id,
      name: commonName,
      latin: taxon.name || "Scientific name unavailable",
      role: "Nearby nature observation",
      accent: accents[index % accents.length],
      localCount: Number(entry.count || 0),
      globalCount: Number(taxon.observations_count || 0),
      radius,
      photoUrl: photo.medium_url || photo.square_url || photo.url || "",
      photoAttribution: photo.attribution || "",
      wikipediaUrl: taxon.wikipedia_url || "",
      sourceUrl: taxon.id ? `https://www.inaturalist.org/taxa/${taxon.id}` : "https://www.inaturalist.org",
    };
  }

  function curatedPlantFromEntry(entry, index) {
    return {
      mode: "curated",
      ...entry,
      id: `curated-${entry.latin}`,
      role: entry.role || "Representative plant",
      photoUrl: "",
      photoAttribution: "",
      sourceUrl: `https://www.inaturalist.org/search?q=${encodeURIComponent(entry.latin)}`,
      accent: entry.accent || accents[index % accents.length],
    };
  }

  function mergeCuratedPlants(liveItems) {
    const curated = profiles[selectedCountryKey]?.plants || [];
    const merged = liveItems.slice(0, 7);
    const scientificNames = new Set(merged.map((item) => item.latin.toLowerCase()));
    const additions = curated
      .filter((entry) => !scientificNames.has(entry.latin.toLowerCase()))
      .slice(0, Math.max(0, 10 - merged.length))
      .map((entry, index) => curatedPlantFromEntry(entry, merged.length + index));
    merged.push(...additions);

    if (merged.length < 3) {
      const ecological = fallbackProfiles[fallbackKey(selectedCoords.lat)]?.plants || [];
      for (const entry of ecological) {
        if (merged.length >= 3) break;
        if (scientificNames.has(entry.latin.toLowerCase())) continue;
        const supplement = curatedPlantFromEntry(entry, merged.length);
        supplement.role = "Ecosystem representative";
        merged.push(supplement);
        scientificNames.add(entry.latin.toLowerCase());
      }
    }
    return merged.slice(0, 10);
  }

  async function lookupPlants(coords, feature) {
    const lookupId = ++currentLookup;
    lookupController?.abort();
    lookupController = new AbortController();
    renderLoading();

    try {
      let results = [];
      let usedRadius = SEARCH_RADII[0];
      for (const radius of SEARCH_RADII) {
        setQueryStatus("loading", selectedCountryLabel, `Searching within ${radius} km`);
        results = await fetchSpecies(coords, radius, lookupController.signal);
        usedRadius = radius;
        if (results.length >= 3) break;
      }
      if (lookupId !== currentLookup) return;
      selectedRadius = usedRadius;
      if (!results.length) {
        renderFallback(feature, coords, "Not enough public plant observations were found nearby");
        return;
      }
      const liveItems = results.map((entry, index) => livePlantFromResult(entry, index, usedRadius));
      resultPlants = mergeCuratedPlants(liveItems);
      renderResults();
    } catch (error) {
      if (error.name === "AbortError") return;
      console.warn(error);
      renderFallback(feature, coords, "Live data is temporarily unavailable; showing the built-in botanical collection");
    }
  }

  function renderResults() {
    selectedPlantIndex = 0;
    els.countryName.textContent = selectedCountryLabel;
    els.regionType.textContent = `${ecoLabel(selectedCoords.lat)} · Plants near these coordinates`;
    els.speciesRow.replaceChildren();
    resultPlants.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "species-button";
      button.style.setProperty("--species-accent", item.accent);
      const title = document.createElement("span");
      title.textContent = item.name;
      const meta = document.createElement("small");
      meta.textContent = item.mode === "live" ? `${item.localCount.toLocaleString()} nearby records` : "Representative plant";
      button.append(title, meta);
      button.addEventListener("click", () => renderPlant(index));
      els.speciesRow.append(button);
    });
    setQueryStatus("ready", selectedCountryLabel, `${selectedRadius} km · ${resultPlants.length} plants`);
    renderPlant(0, false);
  }

  function fallbackKey(lat) {
    if (Math.abs(lat) <= 23.5) return "tropical";
    if (lat >= 52) return "boreal";
    if (lat >= 23.5) return "temperate";
    return "southern";
  }

  function renderFallback(feature, coords, reason) {
    const profile = profiles[countryKey(feature)] || fallbackProfiles[fallbackKey(coords.lat)];
    resultPlants = profile.plants.map((entry, index) => curatedPlantFromEntry(entry, index));
    selectedRadius = 400;
    selectedPlantIndex = 0;
    els.countryName.textContent = selectedCountryLabel;
    els.regionType.textContent = `${profile.label || ecoLabel(coords.lat)} · Curated plant collection`;
    els.speciesRow.replaceChildren();
    resultPlants.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "species-button";
      button.style.setProperty("--species-accent", item.accent);
      const title = document.createElement("span");
      title.textContent = item.name;
      const meta = document.createElement("small");
      meta.textContent = "Ecosystem representative";
      button.append(title, meta);
      button.addEventListener("click", () => renderPlant(index));
      els.speciesRow.append(button);
    });
    setQueryStatus("error", selectedCountryLabel, reason);
    showToast(reason);
    renderPlant(0, false);
  }

  function setPhoto(item, renderToken) {
    els.plantPhoto.classList.remove("loaded");
    els.plantPhoto.loading = "lazy";
    els.plantPhoto.alt = item.photoUrl ? `Observation photograph of ${item.name}` : "";
    els.photoCredit.textContent = item.photoAttribution ? `Photo: ${item.photoAttribution}` : "";
    if (!item.photoUrl) {
      els.plantPhoto.removeAttribute("src");
      if (item.mode === "curated") hydrateCuratedPhoto(item, renderToken);
      return;
    }
    els.plantPhoto.onload = () => {
      if (renderToken === `${selectedPlantIndex}-${item.id}`) els.plantPhoto.classList.add("loaded");
    };
    els.plantPhoto.onerror = () => els.plantPhoto.classList.remove("loaded");
    els.plantPhoto.referrerPolicy = "no-referrer";
    els.plantPhoto.src = item.photoUrl;
  }

  async function hydrateCuratedPhoto(item, renderToken) {
    const cacheKey = item.latin.toLowerCase();
    if (curatedPhotoCache.has(cacheKey)) {
      const cached = curatedPhotoCache.get(cacheKey);
      Object.assign(item, cached);
      if (renderToken === `${selectedPlantIndex}-${item.id}`) setPhoto(item, renderToken);
      return;
    }
    try {
      const query = new URLSearchParams({ q: item.latin, rank: "species", per_page: "1", locale: "en" });
      const response = await fetch(`${INAT_BASE}/taxa/autocomplete?${query}`);
      if (!response.ok) return;
      const payload = await response.json();
      const taxon = payload.results?.[0];
      const photo = taxon?.default_photo;
      if (!photo) {
        curatedPhotoCache.set(cacheKey, { photoUrl: "", photoAttribution: "", sourceUrl: item.sourceUrl });
        return;
      }
      item.photoUrl = photo.medium_url || photo.square_url || photo.url || "";
      item.photoAttribution = photo.attribution || "";
      item.sourceUrl = taxon.id ? `https://www.inaturalist.org/taxa/${taxon.id}` : item.sourceUrl;
      curatedPhotoCache.set(cacheKey, {
        photoUrl: item.photoUrl,
        photoAttribution: item.photoAttribution,
        sourceUrl: item.sourceUrl,
      });
      if (renderToken === `${selectedPlantIndex}-${item.id}`) setPhoto(item, renderToken);
    } catch (error) {
      console.warn(error);
    }
  }

  function renderPlant(index, animateCard = true) {
    selectedPlantIndex = index;
    const item = resultPlants[index];
    if (!item) return;
    const renderToken = `${index}-${item.id}`;
    els.botanicalIndex.textContent = item.mode === "live" ? `LOCAL ${String(index + 1).padStart(2, "0")}` : `STORY ${String(index + 1).padStart(2, "0")}`;
    els.plantRole.textContent = item.role;
    els.plantName.textContent = item.name;
    els.latinName.textContent = item.latin;
    els.botanicalCard.style.setProperty("--accent", item.accent);
    els.speciesRow.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-pressed", buttonIndex === index ? "true" : "false");
    });
    setPhoto(item, renderToken);

    if (item.mode === "curated") {
      els.detailTitle.textContent = "Plant profile";
      els.historyTitle.textContent = "A short history";
      els.changeTitle.textContent = "Range and change";
      els.plantDetail.textContent = item.detail;
      els.plantHistory.textContent = item.history;
      els.plantChange.textContent = item.change;
      els.rangeLabel.textContent = "Native range";
      els.scaleLabel.textContent = "Time scale";
      els.nativeRange.textContent = item.nativeRange;
      els.timeScale.textContent = item.timeScale;
    } else {
      els.detailTitle.textContent = "Plant profile";
      els.historyTitle.textContent = "Species history";
      els.changeTitle.textContent = "Local records and change";
      els.plantDetail.textContent = `${item.name} (${item.latin}) is among the plants most frequently observed near these coordinates. Additional reference material is loading…`;
      els.plantHistory.textContent = "Looking up an English-language species summary.";
      els.plantChange.textContent = `There are ${item.localCount.toLocaleString()} research-grade observations within ${item.radius} km of the selected point and ${item.globalCount.toLocaleString()} community observations worldwide. Observation totals vary with season and observer activity, so they do not directly measure population change.`;
      els.rangeLabel.textContent = "Search radius";
      els.scaleLabel.textContent = "Nearby records";
      els.nativeRange.textContent = `${item.radius} km · ${formatCoords(selectedCoords)}`;
      els.timeScale.textContent = `${item.localCount.toLocaleString()} records`;
      // Let the globe and plant photo settle before starting a second network
      // request for prose. Cached species cards remain instant on later visits.
      window.setTimeout(() => {
        if (renderToken === `${selectedPlantIndex}-${item.id}`) hydrateWikipedia(item, renderToken);
      }, 450);
    }

    els.dataNote.innerHTML = `Local plant results use <a href="https://www.inaturalist.org" target="_blank" rel="noreferrer">iNaturalist</a> community observations. An observation does not mean a species is native to that place. <a href="${item.sourceUrl}" target="_blank" rel="noreferrer">View source</a>`;
    if (animateCard) {
      els.botanicalCard.animate(
        [{ opacity: 0.7, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 280, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    }
  }

  function splitSummary(text) {
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (!cleaned) return ["", ""];
    const sentences = cleaned.match(/[^。！？.!?]+[。！？.!?]?/g) || [cleaned];
    let overview = "";
    let history = "";
    for (const sentence of sentences) {
      if ((overview + sentence).length <= 190 || !overview) overview += sentence;
      else if ((history + sentence).length <= 250) history += sentence;
    }
    if (!history) history = sentences.slice(1).join("").slice(0, 250);
    return [overview.slice(0, 230), history.slice(0, 270)];
  }

  async function hydrateWikipedia(item, renderToken) {
    const cacheKey = item.latin.toLowerCase();
    if (wikipediaCache.has(cacheKey)) {
      const cached = wikipediaCache.get(cacheKey);
      if (renderToken === `${selectedPlantIndex}-${item.id}`) {
        if (cached.overview) els.plantDetail.textContent = cached.overview;
        els.plantHistory.textContent = cached.history || `Public historical information is limited. The scientific name is ${item.latin}.`;
      }
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const query = new URLSearchParams({
        action: "query",
        prop: "extracts",
        exintro: "1",
        explaintext: "1",
        redirects: "1",
        titles: item.latin,
        origin: "*",
        format: "json",
        formatversion: "2",
      });
      const response = await fetch(`${WIKIPEDIA_API}?${query}`, { signal: controller.signal });
      if (!response.ok) return;
      const payload = await response.json();
      const extract = payload.query?.pages?.[0]?.extract || "";
      const [overview, history] = splitSummary(extract);
      wikipediaCache.set(cacheKey, { overview, history });
      if (renderToken !== `${selectedPlantIndex}-${item.id}`) return;
      if (overview) els.plantDetail.textContent = overview;
      els.plantHistory.textContent = history || `Public information is limited. The scientific name is ${item.latin}.`;
    } catch (error) {
      if (renderToken === `${selectedPlantIndex}-${item.id}`) {
        els.plantHistory.textContent = `Historical information for ${item.name} could not be loaded. You can still open the observation source below.`;
      }
    } finally {
      clearTimeout(timer);
    }
  }

  async function loadWorldData() {
    const topologyResponse = await fetch("./vendor/countries-50m.json");
    if (!topologyResponse.ok) throw new Error("World map data unavailable");
    const topology = await topologyResponse.json();
    countries = topojson.feature(topology, topology.objects.countries).features;
    selectedFeature = countries.find((feature) => countryKey(feature) === "China") || null;
    selectedCountryKey = countryKey(selectedFeature);
    selectedCountryLabel = countryLabel(selectedFeature);
  }

  els.rotationToggle.addEventListener("click", () => {
    autoRotate = !autoRotate;
    updateRotationButton();
  });

  els.countrySelect.addEventListener("change", () => {
    const feature = countries.find((item) => String(item.id) === els.countrySelect.value);
    if (feature) goToCountry(feature);
  });

  async function start() {
    try {
      await loadWorldData();
      buildCountryControls();
      initGlobe();
      refreshCountryLayer();
      lookupPlants(INITIAL_LOCATION, selectedFeature);
    } catch (error) {
      console.error(error);
      els.globeLoading.textContent = "Earth data could not be loaded";
      setQueryStatus("error", "Temporarily unavailable", "Please refresh the page later");
    }
  }

  start();
})();
