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
        const listTable = document.createElement("table");
        const listTableTrHead = document.createElement("tr");
        listTableTrHead.innerHTML = `<th>Map name</th><th>Playlist title</th><th>Author</th>`;

        listTable.appendChild(listTableTrHead);

        videoList.forEach((playlists) => {
          playlists.playlists.forEach((playlist) => {
            const { playlistUrl, title, profile, author } = playlist;
            const filteredAuthor = authorData.filter((authorData) => authorData.name === author);

            const listTableTrBody = document.createElement("tr");
            listTableTrBody.innerHTML = `<td>${playlists.name}</td><td><a href="${playlistUrl}">${title}</a></td><td><a href="${filteredAuthor[0].profileLink}">${author}</a></td>`;
            listTable.appendChild(listTableTrBody);
          });
        });

        document.getElementById("lets-play").appendChild(listTable);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};
