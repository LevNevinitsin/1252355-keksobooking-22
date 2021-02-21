import { ads } from './create-ads.js';
import { disableForm, enableForm, setAddress } from './form.js';
import { disableFilter, enableFilter } from './filter.js';
import { CENTER_LAT, CENTER_LNG, ZOOM, map, createMarkers } from './map.js';

disableForm();
disableFilter();

map
  .on('load', () => {
    enableFilter();
    enableForm();
    setAddress([CENTER_LAT, CENTER_LNG]);
  })
  .setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  }, ZOOM);

createMarkers(ads);
