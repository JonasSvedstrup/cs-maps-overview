const Pages = {
  Overview: `overview`,
  Map: `map`,
  LetsPlay: `Let's play`,
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

const initForAllPages = () => {
  initNav();
};

const init = (page) => {
  switch (page) {
    case Pages.Overview:
      break;
    case Pages.Map:
      break;
    case Pages.LetsPlay:
      break;
  }
};
