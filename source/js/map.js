/* global L:readonly */
import { generateAdMarkup } from './generate-ad-markup.js';
import { setAddress } from './form.js';

const CENTER_LAT = 35.681700;
const CENTER_LNG = 139.753882;
const ZOOM = 10;
const MAIN_MARKER_SIZE = 50;
const MARKER_SIZE = 40;

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon ({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
  iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
});

const mainMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const coordinates = [evt.target.getLatLng().lat, evt.target.getLatLng().lng]
  setAddress(coordinates);
});

const markerIcon = L.icon ({
  iconUrl: 'img/pin.svg',
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
});

const markers = [];

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: markerIcon,
    },
  )
  marker
    .addTo(map)
    .bindPopup(
      generateAdMarkup(ad),
      {
        keepInView: true,
      },
    );
  markers.push(marker);
}

const createMarkers = (ads) => {
  ads.forEach((ad) => {
    createMarker(ad);
  })
}

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

const reCreateMarkers = (ads) => {
  removeMarkers();
  createMarkers(ads);
}

export { CENTER_LAT, CENTER_LNG, ZOOM, map, mainMarker, createMarkers, reCreateMarkers };
