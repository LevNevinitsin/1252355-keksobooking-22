import { createAds } from './create-ads.js';
import { generateAdsMarkup } from './generate-ads-markup.js';
import './form.js';

const FROM_AD_COUNT = 0;
const TO_AD_COUNT = 1;

const ads = createAds().slice(FROM_AD_COUNT, TO_AD_COUNT);

generateAdsMarkup(ads);
