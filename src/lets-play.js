const authors = {
  Captain_Ahvious: {
    name: "Captain_Ahvious",
    profileLink: "https://www.youtube.com/@Captain_Ahvious",
  },
  "City Planner Plays": {
    name: "City Planner Plays",
    profileLink: "https://www.youtube.com/@CityPlannerPlays",
  },
  "OVERCHARGED EGG": {
    name: "OVERCHARGED EGG",
    profileLink: "https://www.youtube.com/@OVERCHARGEDEGG",
  },
  CityZilla: {
    name: "CityZilla",
    profileLink: "https://www.youtube.com/@CityZilla",
  },
  "Biffa Plays Indie Games": {
    name: "Biffa Plays Indie Games",
    profileLink: "https://www.youtube.com/@BiffaPlaysCitiesSkylines",
  },
  "Move The Mouse": {
    name: "Move The Mouse",
    profileLink: "https://www.youtube.com/@MoveTheMouse",
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
  {
    name: "Coastal Gem",
    playlists: [
      {
        author: authors["CityZilla"].name,
        profile: authors["CityZilla"].profileLink,
        title: "Cities Skylines Beginners Guide",
        playlist: "https://www.youtube.com/playlist?list=PLRNT0lBP5WIX2Ni6CBNaQVPh3daBqP5Si",
      },
    ],
  },
  {
    name: "Coastal Flatland",
    playlists: [
      {
        author: authors["Biffa Plays Indie Games"].name,
        profile: authors["Biffa Plays Indie Games"].profileLink,
        title: "Cities Skylines - Final City (Vanilla 2023)",
        playlist: "https://www.youtube.com/playlist?list=PLR5G_Kc9r-JDORqGVabBeOIWjlUhQgTzR",
      },
    ],
  },
  {
    name: "Diamond Coast",
    playlists: [
      {
        author: authors["Move The Mouse"].name,
        profile: authors["Move The Mouse"].profileLink,
        title: "Cities Skylines How To (Updated for 2020)",
        playlist: "https://www.youtube.com/playlist?list=PLyDZG2zaBHLbSX0vhiMg2FnxyIBsPFa2b",
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
