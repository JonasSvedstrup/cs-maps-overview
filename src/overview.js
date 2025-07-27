const headersPart = ["DLC", "Buildable area", "Theme", "Little Hamlet", "Megalopolis", "Highway", "Railway", "Ship", "Air"];

let maps = [];

fetch("./src/data/maps.json")
  .then((response) => response.json())
  .then((json) => {
    maps = formatGridJsData(json);
    renderGridJsTable();
  });

const mapsOverviewEl = document.getElementById("maps-overview");

const renderGridJsTable = () => {
  if (mapsOverviewEl !== null) {
    new gridjs.Grid({
      columns: [
        "Images",
        {
          name: "Name",
          formatter: (cell) => gridjs.html(`<a href="${formatHref(cell)}">${cell}</b>`),
        },
        ...headersPart,
      ],
      data: maps,
      sort: true,
      search: true,
      fixedHeader: true,
      height: "500px",
    }).render(mapsOverviewEl);
  }
};
