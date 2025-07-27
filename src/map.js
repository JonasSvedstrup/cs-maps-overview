const selectedMap = getQueryString("map");

document.querySelector("#selected-map").innerHTML = formatMapName(selectedMap);

const imgs = ["tiles", "start", "top", "height", "resources", "wind", "fish"];

imgs.forEach((imgType) => {
  document.querySelector(`#map-${imgType}-img`).src = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
  document.querySelector(`#map-${imgType}-link`).href = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
});
