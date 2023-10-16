//gönderilen veriler local'kaydeder
export const setStorage = (data) => {
  //gelen veriyi string'E cevirme
  const strData = JSON.stringify(data);

  //local'kaydetme
  localStorage.setItem("NOTES", strData);
};

//value'ları karşılık gelen içerikleri için
export const translate = {
    goto:'Ziyaret',
    home:'Ev',
    job:'İş',
    park:'Park Yeri',
}



//localden eleman alır 
//ve geri döndürü
export const getStorage = (key) =>{
    //localden string veri alma
  const strData = localStorage.getItem(key)
//veriyi js objesine cevirma
  return JSON.parse(strData)
}

export var userIcon = L.icon({
  iconUrl: "/images/person.png",
  iconSize: [50, 50],
  popupAnchor: [-0, -20],
  

});
 var homeIcon = L.icon({
    iconUrl: "/images/Home_8.png",
    iconSize: [50, 50],
    shadowUrl:'/images/my-icon-shadow.png',
    popupAnchor: [-0, -20],
    shadowSize:[68,95],
    shadowAnchor:[30,34],
  });
   var jobIcon = L.icon({
    iconUrl: "/images/Briefcase_8.png",
    iconSize: [50, 50],
    shadowUrl:'/images/my-icon-shadow.png',
    popupAnchor: [-0, -20],
    shadowSize:[68,95],
    shadowAnchor:[30,34],
    
  });
 var gotoIcon = L.icon({
    iconUrl: "/images/Aeroplane_8.png",
    iconSize: [50, 50],
    shadowUrl:'/images/my-icon-shadow.png',
    popupAnchor: [-0, -20],
    shadowSize:[68,95],
    shadowAnchor:[30,34],
  });
 var parkIcon = L.icon({
    iconUrl: "/images/Parking_8.png",
    iconSize: [50, 50],
    shadowUrl:'/images/my-icon-shadow.png',
    popupAnchor: [-0, -20],
    shadowSize:[68,95],
    shadowAnchor:[30,34],
  });
  //value'ları karşılık gelen içerikleri için
export const icons = {
    goto:gotoIcon,
    home:homeIcon,
    job:jobIcon,
    park:parkIcon,
}

