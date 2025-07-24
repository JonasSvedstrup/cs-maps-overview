const authors = {
  "OVERCHARGED EGG": {
    name: "OVERCHARGED EGG",
    profileLink: "https://www.youtube.com/@OVERCHARGEDEGG",
  },
};

const allVideos = [
  {
    name: "Murky Coast",
    playlists: [
      {
        author: authors["OVERCHARGED EGG"].name,
        profile: authors["OVERCHARGED EGG"].profileLink,
        title: "Palaven - Cities Skylines Vanilla",
        playlist: "https://www.youtube.com/playlist?list=PLW9ZbMsZn0d7Vn13rcNFljDtaGktLNQSR",
      },
    ],
  },
  {
    name: "Bay of Rivers",
    playlists: [
      {
        author: authors["OVERCHARGED EGG"].name,
        profile: authors["OVERCHARGED EGG"].profileLink,
        title: "Orchid Bay | Cities Skylines Build Guide 2",
        playlist: "https://www.youtube.com/playlist?list=PLW9ZbMsZn0d6IuTPZkTaFdkykz2XXN26C",
      },
    ],
  },
];

const videoList = allVideos.filter((videos) => videos.name.toLocaleLowerCase().replaceAll(" ", "-") === selectedMap);

if (videoList.length > 0) {
  const listUl = document.createElement("ul");
  const listEl = listUl;

  videoList[0].playlists.forEach((playlist) => {
    const listLi = document.createElement("li");
    listLi.innerHTML = `<a href="${playlist.playlist}">${playlist.title}</a> - by <a href="${playlist.profile}">${playlist.author}</a>`;

    listEl.appendChild(listLi);

    document.getElementById("lets-play").appendChild(listEl);
  });
}
