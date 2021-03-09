(()=>{"use strict";const e="js-red-border",t="js-animate-border",r=(e,t)=>{let r=e%100,o=r%10;return r>10&&r<20?t[2]:1===o?t[0]:o>1&&o<5?t[1]:o>6&&o<9&&t[3]?t[3]:40===r&&t[4]?t[4]:90!==r&&0!==r||!t[5]?t[2]:t[5]},o=e=>{e.forEach((e=>{e.disabled=!0}))},n=e=>{e.forEach((e=>{e.disabled=!1}))},a=r=>{r.classList.add(e),r.classList.add(t),r.addEventListener("animationend",(()=>{r.classList.remove(t)}),{once:!0})},c=t=>{t.classList.contains(e)&&t.classList.remove(e)},s={flat:{ruLabel:"Квартира",price:1e3},bungalow:{ruLabel:"Бунгало",price:0},house:{ruLabel:"Дом",price:5e3},palace:{ruLabel:"Дворец",price:1e4}},i=([e,t])=>`${e} ${r(e,["комната","комнаты","комнат"])} для ${t}-${r(t,["го","х","ти","ми","ка","та"])} ${r(t,["гостя","гостей","гостей"])}`,l=(e,t,r,o,n)=>{e?(o&&(r=o(n)),t.textContent=r):t.remove()},d=document.querySelector("#card").content.querySelector(".popup"),u="Выберите файл-изображение.",p=["символ","символа","символов"],m=document.querySelector(".ad-form"),y=m.querySelectorAll("fieldset"),h=m.querySelector("#avatar"),v=m.querySelector(".ad-form-header__preview img"),g=m.querySelector("#title"),S=m.querySelector("#address"),f=m.querySelector("#type"),q=m.querySelector("#price"),_=m.querySelector("#room_number"),E=m.querySelector("#capacity"),b=m.querySelector("#timein"),k=m.querySelector("#timeout"),w=m.querySelector("#images"),C=m.querySelector(".ad-form__photo");let V;const x=m.querySelector(".ad-form__submit"),$=m.querySelector(".ad-form__reset"),A=([e,t])=>{S.value=`${e.toFixed(5)}, ${t.toFixed(5)}`},T=()=>{const e=s[f.value].price;q.min=e,q.placeholder=e};T(),f.addEventListener("change",(()=>T()));const j=(e,t)=>{t.selectedIndex=e.selectedIndex};b.addEventListener("change",(e=>j(e.target,k))),k.addEventListener("change",(e=>j(e.target,b)));const D=e=>{e.setCustomValidity(""),c(e)},F=e=>`${e} ${r(e,p)}`;g.addEventListener("input",(()=>{const e=g.value.length;if(e<30){const t=30-e;g.setCustomValidity(`Добавьте ещё ${F(t)}.`)}else if(e>100){const t=e-100;g.setCustomValidity(`Уберите лишние ${F(t)}.`)}else D(g);g.reportValidity()})),q.addEventListener("input",(()=>{q.value>1e6?q.setCustomValidity("Цена должна быть меньше 1000000."):D(q),q.reportValidity()}));const I=()=>{const e=parseInt(_.value),t=parseInt(E.value);let r,o;100===e?(r=0===t,o='Для выбранного количества комнат доступен только вариант "не для гостей".'):(r=t<=e&&0!==t,o="Количество гостей должно быть не меньше одного и не должно превышать выбранного количества комнат."),r?D(E):E.setCustomValidity(o),E.reportValidity()};_.addEventListener("change",(()=>I())),E.addEventListener("change",(()=>I()));const B=e=>e.type.startsWith("image"),M=e=>{e.setCustomValidity(""),c(e.nextElementSibling)},z=(e,t,r,o)=>{M(e),((e,t,r)=>{if(e){const r=new FileReader;r.addEventListener("load",(()=>{t.src=r.result})),r.readAsDataURL(e)}else t.src=r})(t,r,o)},H=v.src,U=()=>C.contains(V),N=()=>{U()&&V.remove()},O=e=>{M(e),N()};h.addEventListener("change",(()=>{const e=h.files[0];!e||B(e)?z(h,e,v,H):(h.setCustomValidity(u),v.src!==H&&(v.src=H)),h.reportValidity()})),w.addEventListener("change",(()=>{const e=w.files[0];V||(V=document.createElement("img"),V.width=70,V.height=70,V.alt="Превью фотографии жилья"),e?B(e)?(z(w,e,V),U()||C.appendChild(V)):(w.setCustomValidity(u),N()):O(w),w.reportValidity()})),x.addEventListener("click",(()=>{m.querySelectorAll("input:invalid, select:invalid").forEach((e=>"file"===e.type?a(e.nextElementSibling):a(e)))}));const P=document.querySelector("main"),R=document.querySelector("#request-error").content.querySelector(".error"),W=document.querySelector("#success").content.querySelector(".success"),G=document.querySelector("#error").content.querySelector(".error"),J=G.querySelector(".error__button"),K=e=>{e.remove(),e.removeEventListener("click",X),window.removeEventListener("keydown",Y)},Q=()=>{K(G),J.removeEventListener("click",Q)};let X,Y;const Z=e=>{P.appendChild(e),e.addEventListener("click",X=(e=>()=>K(e))(e)),window.addEventListener("keydown",Y=(e=>t=>{"Escape"===t.code&&K(e)})(e)),e.contains(J)&&J.addEventListener("click",Q)},ee=35.6817,te=139.753882,re=L.map("map-canvas");L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(re);const oe=L.icon({iconUrl:"../img/main-pin.svg",iconSize:[50,50],iconAnchor:[25,50]}),ne=L.marker({lat:ee,lng:te},{draggable:!0,icon:oe});ne.addTo(re),ne.on("move",(e=>{const t=[e.target.getLatLng().lat,e.target.getLatLng().lng];A(t)}));const ae=L.icon({iconUrl:"../img/pin.svg",iconSize:[40,40],iconAnchor:[20,40]}),ce=[],se=e=>{e.forEach((e=>{(e=>{const t=L.marker({lat:e.location.lat,lng:e.location.lng},{icon:ae});t.addTo(re).bindPopup((e=>{const{author:{avatar:t},offer:{title:r,address:o,price:n,type:a,rooms:c,guests:u,checkin:p,checkout:m,features:y,description:h,photos:v}}=e,g=d.cloneNode(!0);g.querySelector(".popup__title").textContent=r,g.querySelector(".popup__text--address").textContent=o;const L=g.querySelector(".popup__text--price");L.textContent=`${n}`,L.insertAdjacentHTML("beforeend"," <span>₽/ночь</span>");const S=g.querySelector(".popup__type");l(a,S,s[a].ruLabel);const f=g.querySelector(".popup__text--capacity");let q=Boolean(c)&&Boolean(u);l(q,f,"",i,[c,u]);const _=g.querySelector(".popup__text--time"),E=`Заезд после ${p}, выезд до ${m}`;q=Boolean(p)&&Boolean(m),l(q,_,E);const b=g.querySelector(".popup__features");y.length?(b.innerHTML="",b.appendChild((e=>{const t=document.createDocumentFragment();return e.forEach((e=>{const r=document.createElement("li");r.classList.add("popup__feature");const o=`popup__feature--${e}`;r.classList.add(o),r.textContent=e,t.appendChild(r)})),t})(y))):b.remove();const k=g.querySelector(".popup__description");l(h,k,h);const w=g.querySelector(".popup__photos");if(v.length){const e=w.querySelector(".popup__photo");w.innerHTML="",w.appendChild(((e,t)=>{const r=document.createDocumentFragment();return e.forEach((e=>{const o=t.cloneNode(!0);o.src=e,r.appendChild(o)})),r})(v,e))}else w.remove();const C=g.querySelector(".popup__avatar");return t?C.src=t:C.remove(),g})(e),{keepInView:!0}),ce.push(t)})(e)}))},ie=e=>{ce.forEach((e=>{e.remove()})),se(e)},le={middle:e=>e>=1e4&&e<5e4,low:e=>e<1e4,high:e=>e>=5e4,any:()=>!0},de=document.querySelector(".map__filters"),ue=de.querySelectorAll("select"),pe=de.querySelectorAll("select, fieldset"),me=e=>{const t=Array.from(ue).every((t=>{const r=t.name.split("-")[1];return((e,t,r)=>{const o=e.value,n=r[t];return"price"===t?le[o](n):"any"===o||o===n.toString()})(t,r,e)})),r=Array.from(de.querySelectorAll("input:checked"));return t&&((e,t)=>e.every((e=>t.includes(e.value))))(r,e.features)},ye=e=>((t,r)=>{let o;return()=>{o&&window.clearTimeout(o),o=setTimeout((()=>(e=>{const t=(e=>{const t=[];let r;for(let o=0;o<e.length;o++)if(r=e[o],me(r.offer)&&t.push(r),10===t.length)return t;return t})(e);ie(t)})(e)),500)}})(),he=[ee,te];m.classList.add("ad-form--disabled"),o(y),de.classList.add(".map__filters--disabled"),o(pe);let ve=[];re.on("load",(()=>{var e,t;m.classList.remove("ad-form--disabled"),n(y),A(he),e=e=>{(e=>{de.addEventListener("change",ye(e))})(e),ve=e.slice(0,10),se(ve),de.classList.remove(".map__filters--disabled"),n(pe)},t=()=>{Z(R)},fetch("https://22.javascript.pages.academy/keksobooking/data").then((e=>e.ok?e.json():t())).then((t=>e(t))).catch((()=>t()))})).setView({lat:ee,lng:te},10);const ge=()=>{m.reset(),de.reset(),ie(ve),re.setView({lat:ee,lng:te},10),ne.setLatLng(he),A(he),q.setCustomValidity(""),T(),D(E),z(h,void 0,v,H),O(w),Array.from(m.elements).forEach((e=>{c(e)}))};m.addEventListener("submit",(e=>{var t,r,o;e.preventDefault(),t=()=>{Z(W),ge()},r=()=>{Z(G)},o=new FormData(e.target),fetch("https://22.javascript.pages.academy/keksobooking",{method:"POST",body:o}).then((e=>e.ok?t():r())).catch((()=>r()))})),$.addEventListener("click",(e=>{e.preventDefault(),ge()}))})();
//# sourceMappingURL=main.bundle.js.map