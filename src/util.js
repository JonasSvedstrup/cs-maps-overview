const qs = (target) => document.querySelector(target);
const formatMapName = (str) => str.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
const formatMapNameShort = (str) => str.replace(' ', '-').toLowerCase();
const formatHref = (str) => `map.html?map=${str.toLowerCase().replace(' ', '-')}`;
const formatNumer = (number) => (number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '');
const formatBooleanToText = (bool) => (bool ? 'Yes' : '');
const getQueryString = (n) => {
  var half = location.search.split(n + '=')[1];
  return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
};

const debug = (message, level) => {
  // console.log('%c' + message, `color: ${level};`);
};

const selectedMap = getQueryString('map');

const showModal = () => {
  qs('#maps-compare-modal').style.display = 'block';
};

const hideModal = () => {
  qs('#maps-compare-modal').style.display = 'none';
};
