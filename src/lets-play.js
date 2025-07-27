const initLetsPlayVideos = async () => {
  const urlsToFetch = ["./src/data/lets-play.json", "./src/data/authors.json"];
  const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
  Promise.all(fetchPromises)
    .then((responses) => {
      const responseData = responses.map((response) => response);

      const mapData = responseData[0];
      const authorData = responseData[1];

      let videoList = mapData;
      if (typeof selectedMap !== "undefined") {
        videoList = mapData.filter((videos) => videos.name.toLocaleLowerCase().replaceAll(" ", "-") === selectedMap);
      }

      if (videoList.length > 0) {
        const listUl = document.createElement("ul");
        const listEl = listUl;

        videoList.forEach((playlists) => {
          playlists.playlists.forEach((playlist) => {
            const { playlistUrl, title, profile, author } = playlist;

            const filteredAuthor = authorData.filter((authorData) => authorData.name === author);

            const listLi = document.createElement("li");
            listLi.innerHTML = `${playlists.name} - <a href="${playlistUrl}">${title}</a> - by <a href="${filteredAuthor[0].profileLink}">${author}</a>`;

            listEl.appendChild(listLi);

            document.getElementById("lets-play").appendChild(listEl);
          });
        });
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};
