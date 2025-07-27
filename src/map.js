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
      const mapData = json.filter((map) => map.name === formatMapName(selectedMap))[0];
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

function showScreenshot(evt, type) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(type).style.display = "block";

  if (typeof evt !== "undefined") {
    evt.currentTarget.className += " active";
  }
}
