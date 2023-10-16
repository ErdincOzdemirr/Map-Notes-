import { userIcon,setStorage,getStorage ,translate,icons} from "./helpers.js";

//!html'den gelenler
const form = document.querySelector("form");
const input = document.querySelector("form #title");
const cancelBtn = document.querySelector("form #cancel");
const noteList = document.querySelector("ul");
const expandBtn = document.querySelector("#checkbox");
const aside = document.querySelector(".wrapper");


//!ortan degişkenler
var map;
var coords = [];
var notes = getStorage("NOTES") || [];
var markerLayer = []

//kullanıcının konuma göre haritaya ekrana basma
function loadMap(coords) {
  //haritanın kurulumunu yapar
  map = L.map("map").setView(coords, 10);

  //haritanın nasıl gözükücegini belirler
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  //imleçleri tutacagımız ayrı bir katman  oluşturuldu
markerLayer = L.layerGroup().addTo(map)

  //kullanıcının buldugu konumu gösterme
  L.marker(coords, { icon: userIcon }).addTo(map).bindPopup("Buldugunuz konum");

//LOCALDEN GELEN notları ekrana bas
renderNoteList(notes);

  //haritada bir tıklanma olaylarını izler

  map.on("click", onMapClick);
}


//olay izleyicileri
cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
  clearForm();
});

// formun gönderilmesini izleme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //formun içindeki degerlere erişme
  const title = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  //notları dizisini bu elamanu ekle
  notes.unshift({
    id: new Date().getTime(),
    title,
    date,
    status,
    coords,
  });
  renderNoteList(notes);

   //gönderilen elemanları local gönderme
setStorage(notes)

  //formu kapat
  form.style.display = 'none'
  clearForm();
});

//imlec ekrana basar
function renderMarker(item){
  //imleç oluştur
L.marker(item.coords,{icon:icons[item.status]})
//imleçi katmana ekle
.addTo(markerLayer)
//popup ekle
.bindPopup(item.title)

}

//not listesini ekrana basar
function renderNoteList(items) {
    //eski elamanları temizleme
    noteList.innerHTML ='';
    //eski imleçleri temizle
    markerLayer.clearLayers()


  //her bir elaman için ekrana basma fonk. çalıştırı
  items.forEach((ele) => {
    // li elemanı oluştur
    const listEle = document.createElement("li");
//data-id ekleme
listEle.dataset.id = ele.id;

    //içerigi belirleme
    listEle.innerHTML = `
<div>
<p>${ele.title}</p>
<p><span>Tarih:</span>${ele.date}</p>
<p><span>Durum:</span>${translate[ele.status]}</p>
</div>
<i id="fly" class="bi bi-airplane-fill"></i>
<i id="delete" class="bi bi-trash3-fill"></i>
`;

//html deki listeye gönderme
noteList.appendChild(listEle)
//ekrana  imleç bas
renderMarker(ele)

  });

  //gönderilen elemanları local gönderme
}

//kulllanın konumu isteme
navigator.geolocation.getCurrentPosition(
  //kullanıcı izin verirse haritayı
  //onun buldıgı konumda açma
  (e) => loadMap([e.coords.latitude, e.coords.longitude]),
  //izin vermezse varsayılan konumda aç
  () => {
    loadMap([41.05914290307276, 28.884194060321487]);
  }
);

//haritaya tıklanınca çalışan fonk
const onMapClick = (e) => {
  //kordinatları ortak alana aktar
  coords = [e.latlng.lat, e.latlng.lng];
  //formu göster
  form.style.display = "flex";
  //input focuslanma
  input.focus();
};



//formu temizler
function clearForm(){
  form[0].value = '';
  form[1].value = '';
  form[2].value = 'goto';
}


//! Silme ve Uçuş
noteList.addEventListener('click', (e) => {
  const found_id = e.target.closest('li').dataset.id;

  if (
    e.target.id === 'delete' &&
    confirm('Silmek isrediğinizden emin misiniz ?')
  ) {
    // id'sini bildiğimi elemanı dizidem çıkarma
    notes = notes.filter((note) => note.id !== Number(found_id));

    // lokali güncelle
    setStorage(notes);

    // ekranı güncelle
    renderNoteList(notes);
  }

  if (e.target.id === 'fly') {
    // id'sini bildiğimiz elemanın kordinatlarına erişme
    const note = notes.find((note) => note.id === Number(found_id));

    // animasyonu çalıştır
    map.flyTo(note.coords, 15);

    // elemanın kordinatlarında geçici bir popup tanımlama
    var popup = L.popup()
      .setLatLng(note.coords)
      .setContent(note.title);

    // küçük ekranlarda uçurulduğunda menüyü kapat
    if (window.innerWidth < 769) {
      checkbox.checked = false;
      aside.classList.add('hide');
    }
    // popup'ı açma
    popup.openOn(map);
  }
});

//! Gizle / Göster
checkbox.addEventListener('input', (e) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    aside.classList.remove('hide');
  } else {
    aside.classList.add('hide');
  }
});