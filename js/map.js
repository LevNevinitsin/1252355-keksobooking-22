/* global L:readonly */
import { activatePage } from './activity.js';
import { createAds } from './create-ads.js';
import { generateAdMarkup } from './generate-ad-markup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat:35.681700,
    lng: 139.753882,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainMarker = L.marker(
  {
    lat:35.681700,
    lng: 139.753882,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map)

const address = document.querySelector('#address');
mainMarker.on('move', (evt) => {
  address.value = `${evt.target.getLatLng()['lat']}, ${evt.target.getLatLng()['lng']}`
})

const markerIcon = L.icon ({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markers = [];

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location['x'],
      lng: ad.location['y'],
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

const ads = createAds();

createMarkers(ads);

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

export { ads, createMarkers, removeMarkers };
