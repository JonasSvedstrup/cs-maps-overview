const screenshotElements = ["start", "top", "tiles", "height", "resources", "wind", "fish"];
const imgsParagraphs = {
  tiles: "Show an overview of all 25 tiles.",
  start: "The start area, where the first tile is.",
  top: "A far top down view of the entire map.",
  height: "A height map that displays the height of the terrain.",
  resources: "Using the natural resource overlay.",
  wind: "The wind map.",
  fish: "The fish map.",
};
let gridTableOptions = {
  search: true,
  height: "500px",
};
let maps = [];

const Pages = {
  Overview: `overview`,
  Map: `map`,
  LetsPlay: `Let's play`,
};

const Connections = {
  Highway: `Highway`,
  Railway: `Railway`,
  Ship: `Ship`,
  Air: `Air`,
};

const Milestones = {
  LittleHamlet: "Little Hamlet",
  WorthyVillage: "Worthy Village",
  TinyTown: "Tiny Town",
  BoomTown: "Boom Town",
  BusyTown: "Busy Town",
  BigTown: "Big Town",
  SmallCity: "Small City",
  BigCity: "Big City",
  GrandCity: "Grand City",
  CapitalCity: "Capital City",
  ColossalCity: "Colossal City",
  Metropolis: "Metropolis",
  Megalopolis: "Megalopolis",
};

const qs = (target) => document.querySelector(target);
const formatMapName = (str) => str.replace("-", " ").replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
const formatHref = (str) => `map.html?map=${str.toLowerCase().replace(" ", "-")}`;
const formatNumer = (number) => (number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "");
const formatBooleanToText = (bool) => (bool ? "Yes" : "");

const getQueryString = (n) => {
  var half = location.search.split(n + "=")[1];
  return half !== undefined ? decodeURIComponent(half.split("&")[0]) : null;
};

const selectedMapElement = qs("#selected-map");
const selectedMap = getQueryString("map");

if (selectedMapElement) {
  selectedMapElement.innerHTML = formatMapName(selectedMap);
}

const initNav = () => {
  const ul = document.createElement("ul");

  const menuItems = [
    {
      name: "Overview",
      link: "index.html",
    },
    {
      name: "Map",
      link: "map.html?map=black-woods",
    },
    {
      name: "Let's Play",
      link: "lets-play.html",
    },
  ];

  menuItems.forEach((menuItem) => {
    const li = document.createElement("li");

    li.innerHTML = `<a href="${menuItem.link}">${menuItem.name}</a>`;

    qs("#main-nav").appendChild(li);
  });
};

const initFooter = () => {
  const disclaimerParagraph = document.createElement("p");
  disclaimerParagraph.innerText = "This site is not affiliated with Paradox Interactive";

  qs("#footer").appendChild(disclaimerParagraph);
};

const initStringDLCs = () => {
  const stringDlcElement = qs("#stringDLCs");

  if (stringDlcElement) {
    const paragraph = document.createElement("p");

    const dlcs = [...new Set(maps.map((map) => map[2]))].join(", ").replace("Vanilla, ", "");

    paragraph.innerText = `*${dlcs}`;

    stringDlcElement.appendChild(paragraph);
  }
};

const convertToGridJSDataOverview = (mapData) => {
  const gridJsArray = [];

  mapData.forEach((data) => {
    const { hasImages, name, dlc, buildableArea, theme, connections, milestones } = data;
    const { highway, railway, ship, air } = connections;
    const littleHamlet = formatNumer(milestones[0]);
    const megalopolis = formatNumer(milestones[milestones.length - 1]);

    gridJsArray.push([
      formatBooleanToText(hasImages),
      name,
      dlc,
      `${buildableArea}%`,
      theme,
      littleHamlet,
      megalopolis,
      formatBooleanToText(highway),
      formatBooleanToText(railway),
      formatBooleanToText(ship),
      formatBooleanToText(air),
    ]);
  });

  return gridJsArray;
};

const convertToGridJSDataPlaylists = (mapData, authorData) => {
  const gridJsArray = [];

  if (selectedMap) {
    mapData = mapData.filter((map) => map.name.toLocaleLowerCase().replaceAll(" ", "-") === selectedMap);
  }

  mapData.forEach((data) => {
    const { name, playlists } = data;

    playlists.forEach((playlist) => {
      const { author, title, videos, playlistUrl, year } = playlist;
      let authorProfileLink = "";

      if (authorData) {
        let filteredAuthor = authorData.filter((authorData) => authorData.name === author);
        authorProfileLink = filteredAuthor[0].profileLink;
      }

      gridJsArray.push([playlistUrl, authorProfileLink, name, author, title, videos, year]);
    });
  });

  return gridJsArray;
};

const initMapSelector = () => {
  const selectMapElement = qs("#select-map");

  if (selectMapElement) {
    selectMapElement.innerHTML = "";

    const select = document.createElement("select");
    select.setAttribute("onChange", "window.location = this.value");

    maps.forEach((map) => {
      const option = document.createElement("option");

      option.value = formatHref(map[1]);
      option.innerText = map[1];
      if (map[1] === formatMapName(selectedMap)) {
        option.selected = "selected";
      }

      select.appendChild(option);

      selectMapElement.append(select);
    });
  }
};

const initMapsOverviewTable = async () => {
  const urlsToFetch = ["./src/data/maps.json"];
  const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
  Promise.all(fetchPromises)
    .then((responses) => {
      const responseData = responses.map((response) => response);

      const mapData = responseData[0];

      const columns = [
        {
          name: "Images",
        },
        {
          name: "Name",
          formatter: (cell) => gridjs.html(`<a href="${formatHref(cell)}">${cell}</b>`),
        },
        "DLC",
        "Buildable area",
        "Theme",
        "Little Hamlet",
        "Megalopolis",
        "Highway",
        "Railway",
        "Ship",
        "Air",
      ];

      const overview = convertToGridJSDataOverview(mapData);

      maps = overview;

      initMapSelector();
      initStringDLCs();

      renderDataToGridJsTable(columns, overview, "maps-overview");
    })
    .catch((error) => console.error("Error fetching data (initMapsOverviewTable):", error));
};

const initMapsPlaylistsTable = async () => {
  const urlsToFetch = ["./src/data/lets-play.json", "./src/data/authors.json"];
  const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
  Promise.all(fetchPromises)
    .then((responses) => {
      const responseData = responses.map((response) => response);

      const mapData = responseData[0];
      const authorData = responseData[1];

      const playlists = convertToGridJSDataPlaylists(mapData, authorData);

      const columns = [
        {
          name: "url",
          hidden: true,
        },
        {
          name: "profileLink",
          hidden: true,
        },
        {
          name: "Name",
          formatter: (cell) => gridjs.html(`<a href="${formatHref(cell)}">${cell}</b>`),
        },
        {
          name: "Author",
          formatter: (cell, row) => gridjs.html(`<a href="${row.cells[1].data}">${cell}</a>`),
        },
        {
          name: "Playlist title",
          formatter: (cell, row) => gridjs.html(`<a target="_blank" href="${row.cells[0].data}">${cell}</a>`),
        },
        "Videos",
        "Year",
      ];

      renderDataToGridJsTable(columns, playlists, "maps-playlists");
    })
    .catch((error) => console.error("Error fetching data (initMapsPlaylistsTable):", error));
};

const renderDataToGridJsTable = (columns, data, targetId) => {
  const tableElement = document.getElementById(targetId);
  if (tableElement !== null) {
    new gridjs.Grid({
      columns: columns,
      data: data,
      sort: true,
      search: gridTableOptions.search,
      fixedHeader: true,
      height: gridTableOptions.height,
      language: {
        search: {
          placeholder: "Search...",
        },
        noRecordsFound: "No playlists yet for this map.",
      },
    }).render(tableElement);
  }
};

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

      qs("#map-metadata").innerHTML = mapMetaData;
    });
};

const initScreenshotNav = () => {
  const navElement = qs("#screenshotNav");

  let htmlStr = "";

  screenshotElements.forEach((nav) => {
    htmlStr += `
      <button class="tablinks${nav === "start" ? " active" : ""}" onclick="showScreenshot(event, '${nav}')">${formatMapName(
      nav
    )}</button>
    `;
  });

  navElement.innerHTML = htmlStr;
};

const initScreenshots = () => {
  const screenshot = qs("#screenshots");

  let htmlStr = "";

  screenshotElements.forEach((type) => {
    let styleStr = type === "start" ? `` : `style="display: none"`;

    htmlStr += `
      <div id="${type}" class="tabcontent" ${styleStr}>
        <h4>${formatMapName(type)}</h4>
        <p>${imgsParagraphs[type]}</p>
        <a id="map-${type}-link">
          <img id="map-${type}-img" />
        </a>
      </div>
    `;
  });

  screenshot.innerHTML = htmlStr;

  screenshotElements.forEach((imgType) => {
    qs(`#map-${imgType}-img`).src = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
    qs(`#map-${imgType}-link`).href = `maps/${selectedMap}/${selectedMap}-${imgType}.png`;
  });
};

const showScreenshot = (evt, type) => {
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
};

const initForAllPages = () => {
  initNav();
  initFooter();
};

const init = (page) => {
  switch (page) {
    case Pages.Overview:
      initMapsOverviewTable();
      break;
    case Pages.Map:
      gridTableOptions.height = "auto";
      gridTableOptions.search = false;
      initMapsOverviewTable();
      initMapDetails();
      initMapsPlaylistsTable();
      initScreenshotNav();
      initScreenshots();
      break;
    case Pages.LetsPlay:
      initMapsPlaylistsTable();
      break;
  }
};
