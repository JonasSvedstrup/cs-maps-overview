function get(n) {
  var half = location.search.split(n + "=")[1];
  return half !== undefined ? decodeURIComponent(half.split("&")[0]) : null;
}

const selectedMap = get("map");

document.querySelector("#selected-map").innerHTML = selectedMap;

const imgs = ["tiles", "height", "resources", "fish"];

imgs.forEach((imgType) => {
  document.querySelector(`#map-${imgType}`).src = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
});
