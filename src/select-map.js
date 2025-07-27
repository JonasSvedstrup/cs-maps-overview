const select = document.createElement("select");

select.setAttribute("onChange", "window.location = this.value");

allMaps.forEach((map) => {
  const option = document.createElement("option");

  option.value = formatHref(map[1]);
  option.innerText = map[1];

  select.appendChild(option);

  document.querySelector("#select-map").append(select);
});
