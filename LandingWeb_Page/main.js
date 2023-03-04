let colorLi = document.querySelectorAll(".colors-list li");
let toggleSetting = document.querySelector(".toggle-setting");
let gear = document.querySelector(".toggle-setting .fa-gear");
let settingBox = document.querySelector(".setting-box");
let mainColors = localStorage.getItem("color_option");
let randBackEl = document.querySelectorAll(".random-backgrounds span")
let backgroundItem = localStorage.getItem("random_background");

if (mainColors !== null){
  document.documentElement.style.setProperty("--main-color", mainColors);
  colorLi.forEach(element => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors){
      element.classList.add("active");
    }
  });
  // e.target.classList.add("active");
};



// funtction for toggleSetting
toggleSetting.onclick = function (){
  gear.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};
let backgroundOption = true;
let backgroundInterval;

colorLi.forEach(li => {
  li.addEventListener("click", (e) => {

    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    localStorage.setItem("color_option", e.target.dataset.color);
    
    handleActive(e);
  });
});

let imagesUrl = ["https://github.com/ElzeroWebSchool/SpecialDesign/blob/master/imgs/01.jpg?raw=true", "https://github.com/ElzeroWebSchool/SpecialDesign/blob/master/imgs/02.jpg?raw=true", "https://github.com/ElzeroWebSchool/SpecialDesign/blob/master/imgs/03.jpg?raw=true", "https://github.com/ElzeroWebSchool/SpecialDesign/blob/master/imgs/04.jpg?raw=true", "https://github.com/ElzeroWebSchool/SpecialDesign/blob/master/imgs/05.jpg?raw=true"];
let landingPage = document.querySelector(".landing-page");


function randomizeImags(){
  if(backgroundOption === true){
  backgroundInterval = setInterval(() => {
  
      let randomNumber = Math.floor(Math.random() * imagesUrl.length);
      
      landingPage.style.backgroundImage = `url("${imagesUrl[randomNumber]}")`;
      
      }, 9000);
  }
}


if (backgroundItem !== null){
  
  
  if(backgroundItem === 'true'){
    backgroundOption = true;
    
  }else{
    backgroundOption = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach(el => {
    el.classList.remove("active");
  });
  if (backgroundItem === 'true'){
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  }else{
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
  
};

// LOCAL STORAGE CHECKING FOR BULLETS OPTION
let bulletsItem = localStorage.getItem("bullets_option");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
if (bulletsItem !== null){
  
  if(bulletsItem === 'true'){
    bulletsContainer.style.display = "block";
  }else{
    bulletsContainer.style.display = "none";
    
  }
  document.querySelectorAll(".bullets-option span").forEach(el => {
    el.classList.remove("active");
  });
  if (bulletsItem === 'true'){
    document.querySelector(".bullets-option .yes").classList.add("active");
  }else{
    document.querySelector(".bullets-option .no").classList.add("active");
  }
  
};

randBackEl.forEach(span => {
  span.addEventListener("click",  (el) => {
    
      handleActive(el);

      if (el.target.dataset.background === "yes"){
        backgroundOption = true;
        randomizeImags();
        localStorage.setItem("random_background", true);
      }else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("random_background", false);
      }
    });
});
randomizeImags();

//select skills selectors

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 200) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });

  }
  if (windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight) - 390) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = 0;

    });

  }

};

 // create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery .container .images-box img");

ourGallery.forEach(img => {

  img.addEventListener("click", (e) => {
    // Create OverLay Element 

    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

    if (img.alt !== null){
      let imgHeading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imgHeading.appendChild(imgText);

      imgHeading.appendChild(imgText);

      popupBox.prepend(imgHeading);

    }

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// Event onclick on close Button
document.addEventListener("click", function(e) {
  if (e.target.className == "close-button"){
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

let allBullets = document.querySelectorAll(".nav-bullets .bullet");

let allLinks = document.querySelectorAll(".links a");
function scrollSec(elements){
  elements.forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
  
    });
  });
}

scrollSec(allBullets);
scrollSec(allLinks);

function handleActive(elev){
  elev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  elev.target.classList.add("active");
};


// TO HANDLE SHOW BULLETS OPTIOn

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.display === "show"){
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", true);

    }else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", false);
    }
  });
});

// TO RESET SETTING OF THE PAGE
document.querySelector(".reset-option").addEventListener("click", () => {
  // localStorage.clear(); Be Careful this option deletes every thing even data

localStorage.removeItem("color_option");
localStorage.removeItem("bullets_option");
localStorage.removeItem("random_background");

  window.location.reload();

});

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !==tLinks) {
    toggleBtn.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
  }
});

tLinks.onclick = function (el) {
  el.stopPropagation();
}