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

const formatHref = (str) => {
  return `map.html?map=${str.toLowerCase().replace(" ", "-")}`;
};

const getQueryString = (n) => {
  var half = location.search.split(n + "=")[1];
  return half !== undefined ? decodeURIComponent(half.split("&")[0]) : null;
};

const formatMapName = (str) => {
  return str.replace("-", " ").replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

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

    document.querySelector("#main-nav").appendChild(li);
  });
};

const initFooter = () => {
  const disclaimerParagraph = document.createElement("p");
  disclaimerParagraph.innerText = "This site is not affiliated with Paradox Interactive";

  document.querySelector("#footer").appendChild(disclaimerParagraph);
};

const initForAllPages = () => {
  initNav();
  initFooter();
};

const init = (page) => {
  switch (page) {
    case Pages.Overview:
      break;
    case Pages.Map:
      initMapDetails();
      initLetsPlayVideos();
      break;
    case Pages.LetsPlay:
      initLetsPlayVideos();
      break;
  }
};

const formatNumer = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
};

const formatBooleanToText = (bool) => (bool ? "Yes" : "");

const formatGridJsData = (maps) => {
  const mapsArray = [];

  maps.forEach((map) => {
    const { name, dlc, buildableArea, theme, milestones, connections, hasImages } = map;
    const { highway, railway, ship, air } = connections;

    const littleHamlet = formatNumer(milestones[0]);
    const megalopolis = formatNumer(milestones[milestones.length - 1]);

    mapsArray.push([
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

  return mapsArray;
};
