const selectedMap = getQueryString("map");

document.querySelector("#selected-map").innerHTML = formatMapName(selectedMap);

const imgs = ["tiles", "start", "top", "height", "resources", "wind", "fish"];

imgs.forEach((imgType) => {
  document.querySelector(`#map-${imgType}-img`).src = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
  document.querySelector(`#map-${imgType}-link`).href = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
});

const initMapDetails = () => {
  fetch("./src/data/maps.json")
    .then((response) => response.json())
    .then((json) => {
      const mapData = json.filter((map) => map.name === "Foggy Hills")[0];
      const { name, theme, dlc, connections, buildableArea, milestones } = mapData;
      const { highway, railway, ship, air } = connections;

      const littleHamlet = formatNumer(milestones[0]);
      const megalopolis = formatNumer(milestones[milestones.length - 1]);

      const mapMetaData = `
        <p>
          Name: ${name}<br />
          Theme: ${theme}<br />
          DLC: ${dlc}<br />
          Buildable area: ${buildableArea}%<br />
          <br />
          Connections:
            ${highway ? Connections.Highway : ""},
            ${railway ? Connections.Railway : ""},
            ${ship ? Connections.Ship : ""},
            ${air ? Connections.Air : ""}<br />
          <br />
          Milestones:<br />
            ${Milestones.LittleHamlet}: ${littleHamlet}<br />
            ${Milestones.Megalopolis}: ${megalopolis}
        </p>
      `;

      document.querySelector("#map-metadata").innerHTML = mapMetaData;
    });
};
