const screenshotElements = ['top', 'tiles', 'start', 'height', 'resources', 'wind', 'fish', 'transport'];
const imgsParagraphs = {
  tiles: 'Show an overview of all 25 tiles.',
  start: 'The start area, where the first tile is.',
  top: 'A far top down view of the entire map.',
  height: 'A height map that displays the height of the terrain.',
  resources: 'Using the natural resource overlay.',
  wind: 'The wind map.',
  fish: 'The fish map.',
  transport: 'The transport map',
};
let gridTableOptions = {
  search: true,
  height: '500px',
};
let isSearching = false;

let mapsData = [];
let letsPlayData = [];
let authorsData = [];

const mapsCompareWithDefault = 'top';
let mapsCompareWith = mapsCompareWithDefault;

let grid = null;

const Pages = {
  Overview: `Overview`,
  Map: `Map`,
  LetsPlay: `Let's Play`,
  Compare: 'Compare',
};

const DLCs = [
  'Vanilla',
  'Snowfall',
  'Natural Disasters',
  'Mass Transit',
  'Green Cities',
  'Parklife',
  'Industries',
  'Campus',
  'Sunset Harbor',
  'Airports',
  'Plazas and Promenades',
  'Financial Districts',
  'Hotels & Retreats',
  'Map Pack 1',
  'Map Pack 2',
  'Map Pack 3',
];

const initNav = (page) => {
  const mainNavEl = qs('#main-nav');
  mainNavEl.innerHTML = '';
  const ul = document.createElement('ul');

  const menuItems = [
    {
      name: 'Overview',
      link: 'index.html',
    },
    {
      name: 'Map',
      link: 'map.html?map=roslyn-peninsula',
    },
    {
      name: "Let's Play",
      link: 'lets-play.html',
    },
    {
      name: 'Compare',
      link: 'compare.html',
    },
  ];

  menuItems.forEach((menuItem) => {
    const li = document.createElement('li');
    const active = menuItem.name == page ? 'active' : '';

    li.innerHTML = `<a href="${menuItem.link}" class="${active}">${menuItem.name}</a>`;

    mainNavEl.appendChild(li);
  });
};

const initFooter = () => {
  const disclaimerParagraph = document.createElement('p');
  disclaimerParagraph.innerText = 'This site is not affiliated with Paradox Interactive';

  qs('#footer').appendChild(disclaimerParagraph);
};

const initStringDLCs = () => {
  const stringDlcElement = qs('#stringDLCs');

  if (stringDlcElement) {
    const paragraph = document.createElement('p');

    const dlcs = [...new Set(mapsData.map((map) => map.dlc))].join(', ').replace('Vanilla, ', '');

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
    mapData = mapData.filter((map) => map.name.toLocaleLowerCase().replaceAll(' ', '-') === selectedMap);
  }

  mapData.forEach((data) => {
    const { name, playlists } = data;

    playlists.forEach((playlist) => {
      const { author, title, videos, playlistUrl, year } = playlist;
      let authorProfileLink = '';

      if (authorData) {
        let filteredAuthor = authorData.filter((authorData) => authorData.name === author);
        authorProfileLink = filteredAuthor[0].profileLink;
      }

      gridJsArray.push([playlistUrl, authorProfileLink, name, author, title, videos, year]);
    });
  });

  return gridJsArray;
};

const initSelectedMap = () => {
  const selectedMapElement = qs('#selected-map');

  if (selectedMapElement) {
    selectedMapElement.innerHTML = formatMapName(selectedMap);
  }
};

const initMapSelector = () => {
  const selectMapElement = qs('#select-map');

  if (selectMapElement) {
    selectMapElement.innerHTML = '';

    const select = document.createElement('select');
    select.setAttribute('onChange', 'window.location = this.value');

    mapsData.forEach((map) => {
      const option = document.createElement('option');

      option.value = formatHref(map.name);
      option.innerText = map.name;
      if (map.name === formatMapName(selectedMap)) {
        option.selected = 'selected';
      }

      select.appendChild(option);

      selectMapElement.append(select);
    });
  }
};

const pickRandomMap = () => {
  const mapsSplice = mapsData.filter((map) => map.hasImages === true);

  const randomNumber = Math.floor(Math.random() * mapsSplice.length);

  location.href = `map.html?map=${formatMapNameShort(mapsSplice[randomNumber].name)}`;
};

const initPickRandomMap = async () => {
  const pickRandomMapElement = qs('#pick-random-map');

  if (pickRandomMapElement) {
    await prepareMapsData();
    pickRandomMapElement.addEventListener('click', pickRandomMap);
  }
};

const initMapsOverviewTable = async () => {
  const columns = [
    {
      name: 'Images',
    },
    {
      name: 'Name',
      formatter: (cell) => gridjs.html(`<a href="${formatHref(cell)}">${cell}</b>`),
    },
    'DLC',
    'Buildable area',
    'Theme',
    'Little Hamlet',
    'Megalopolis',
    'Highway',
    'Railway',
    'Ship',
    'Air',
  ];

  const gridData = convertToGridJSDataOverview(mapsData);

  renderDataToGridJsTable(columns, gridData, 'maps-overview');
};

const initMapsPlaylistsTable = async () => {
  const columns = [
    {
      name: 'url',
      hidden: true,
    },
    {
      name: 'profileLink',
      hidden: true,
    },
    {
      name: 'Name',
      formatter: (cell) => gridjs.html(`<a href="${formatHref(cell)}">${cell}</b>`),
    },
    {
      name: 'Author',
      formatter: (cell, row) => gridjs.html(`<a href="${row.cells[1].data}">${cell}</a>`),
    },
    {
      name: 'Playlist title',
      formatter: (cell, row) => gridjs.html(`<a target="_blank" href="${row.cells[0].data}">${cell}</a>`),
    },
    'Videos',
    'Year',
  ];

  const gridData = convertToGridJSDataPlaylists(letsPlayData, authorsData);

  renderDataToGridJsTable(columns, gridData, 'maps-playlists');
};

const isSearchActive = (e) => {
  if (e.srcElement.value.length > 0 && !isSearching) {
    isSearching = true;

    gridTableOptions.height = 'auto';

    setTimeout(() => {
      grid
        .updateConfig({
          height: gridTableOptions.height,
        })
        .forceRender();

      document.querySelector('input').focus();

      if (gridTableOptions.search) {
        document.querySelector('input').addEventListener('input', isSearchActive);
      }
    }, 2000);
  }

  if (isSearching && e.srcElement.value.length == 0) {
    gridTableOptions.height = '500px';

    grid
      .updateConfig({
        height: gridTableOptions.height,
      })
      .forceRender();

    if (gridTableOptions.search) {
      document.querySelector('input').addEventListener('input', isSearchActive);
    }

    isSearching = false;
  }
};

const renderDataToGridJsTable = (columns, data, targetId) => {
  const tableElement = document.getElementById(targetId);
  if (tableElement !== null) {
    grid = new gridjs.Grid({
      columns: columns,
      data: data,
      sort: true,
      search: gridTableOptions.search,
      fixedHeader: true,
      height: gridTableOptions.height,
      language: {
        search: {
          placeholder: 'Search...',
        },
        noRecordsFound: 'No playlists yet for this map.',
      },
    }).render(tableElement);

    if (gridTableOptions.search) {
      document.querySelector('input').addEventListener('input', isSearchActive);
    }
  }
};

const initMapDetails = () => {
  const singleMapData = mapsData.filter((map) => map.name === formatMapName(selectedMap))[0];

  const { name, theme, dlc, connections, buildableArea, milestones } = singleMapData;
  const { highway, railway, ship, air } = connections;

  const littleHamlet = formatNumer(milestones[0]);
  const megalopolis = formatNumer(milestones[milestones.length - 1]);

  const mapMetaData = `
    <h2>Details</h2>
    <p>
      Name: ${name}<br>
      Theme: ${theme}<br>
      DLC: ${dlc}<br>
      Buildable area: ${buildableArea}%<br>
      <br>
      Connections:
        ${highway ? Connections.Highway : ''},
        ${railway ? Connections.Railway : ''},
        ${ship ? Connections.Ship : ''},
        ${air ? Connections.Air : ''}<br>
      <br>
      Milestones:<br>
        ${Milestones.LittleHamlet}: ${littleHamlet}<br>
        ${Milestones.Megalopolis}: ${megalopolis}
    </p>
  `;

  qs('#map-metadata').innerHTML = mapMetaData;
};

const initScreenshotNav = () => {
  const navElement = qs('#screenshotNav');

  let htmlStr = '';

  screenshotElements.forEach((nav) => {
    const tablinks = nav === mapsCompareWithDefault ? ' active' : '';

    htmlStr += `
      <button class="tablinks${tablinks}" onclick="showScreenshot(event, '${nav}')">${formatMapName(nav)}</button>
    `;
  });

  navElement.innerHTML = htmlStr;
};

const initScreenshots = () => {
  initScreenshotNav();
  const screenshot = qs('#screenshots');

  let htmlStr = '';

  screenshotElements.forEach((type) => {
    let styleStr = type === mapsCompareWithDefault ? `` : `style="display: none"`;

    htmlStr += `
      <div id="${type}" class="tabcontent" ${styleStr}>
        <p>${imgsParagraphs[type]}</p>
        <a id="map-${type}-link">
          <img id="map-${type}-img">
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

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(type).style.display = 'block';

  if (typeof evt !== 'undefined') {
    evt.currentTarget.className += ' active';
  }
};

const initCompareScreenshots = () => {
  updateCompareScreenshotsNav();
  updateCompareScreenshots();
};

const showCompareImg = (mapShort) => {
  showModal();

  qs('#modal-img').src = `maps/${mapShort}/${mapShort}-${mapsCompareWith}.png`;
};

const updateCompareScreenshotsNav = () => {
  const compareScreenshot = qs('#compare-screenshots-nav');
  let htmlStr = '<div class="tab">';

  screenshotElements.forEach((screenshot) => {
    let active = screenshot === mapsCompareWith ? ' active' : '';
    htmlStr += `
      <button class="tablinks ${screenshot}${active}" onclick="updateCompareScreenshots(this, '${screenshot}')">${screenshot}</button>
    `;
  });

  htmlStr += `</div>`;

  compareScreenshot.innerHTML = htmlStr;
};

const updateCompareScreenshots = (element, compare = mapsCompareWithDefault) => {
  const compareScreenshot = qs('#compare-screenshots');
  let htmlStr = '';

  if (element) {
    mapsCompareWith = element.className.replace('tablinks ', '');

    const tabs = document.getElementsByClassName('tablinks');
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(' active', '');
    }

    qs(`.${element.className.replace(' ', '.')}`).classList.add('active');
  }

  mapsData.forEach((map) => {
    const { name, hasImages } = map;
    const mapShort = formatMapNameShort(name);

    if (hasImages) {
      htmlStr += `
      <div class="compare-wrapper">
        <img onClick="showCompareImg('${mapShort}')" class="compare-img" src="maps/${mapShort}/${mapShort}-${compare}.png">
        <h2><a href="map.html?map=${mapShort}">${name}</a></h2>
      </div>
    `;
    }
  });

  compareScreenshot.innerHTML = htmlStr;
};

const initBackgroundImage = () => {
  qs('#page-map').style = `
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), #141e32),
    url('/cs-maps-overview/maps/${selectedMap}/${selectedMap}-top.png')
  `;
};

const initForAllPages = (page) => {
  initNav(page);
  initFooter();
};

const init = async (page) => {
  initForAllPages(page);

  switch (page) {
    case Pages.Overview:
      await prepareMapsData();

      initStringDLCs();
      initMapsOverviewTable();
      break;
    case Pages.Map:
      await prepareMapsData();
      await prepareLetsPlayData();
      await prepareAuthorsData();

      gridTableOptions.height = 'auto';
      gridTableOptions.search = false;

      initBackgroundImage();
      initSelectedMap();
      initMapSelector();
      initPickRandomMap();
      initMapDetails();
      initMapsPlaylistsTable();
      initScreenshots();

      break;
    case Pages.LetsPlay:
      await prepareLetsPlayData();
      await prepareAuthorsData();

      initMapsPlaylistsTable();
      break;
    case Pages.Compare:
      await prepareMapsData();

      initCompareScreenshots();
      break;
  }
};
