//variables del menu de volumen
const soundSettingsButton = document.querySelector('.settings');
const soundSettingsMenu = document.getElementById('sound-settings-menu');

const soundOnButton = document.getElementById('sound-on');
const soundOffButton = document.getElementById('sound-off');

const volumeControl = document.getElementById('volume-control');
const menuTheme = document.querySelector('#menuTheme');
menuTheme.playbackRate=1.08;

//botones de menu
const autos=document.querySelector('.autos');
const dificultad=document.querySelector('.dificultad');
const iniciar=document.querySelector('.iniciar');

//ventanas/cajas autos/dificultades
const modo=document.querySelector('.caja-dificultad');
const carros=document.querySelector('.carSelector');

//definir los botones next y prev
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Fondo del juego:
const road=document.querySelector("body");

/*Para mover las opciones de los carros*/
const cars = [
  "url(sources/car1.png) no-repeat center",
  "url(sources/car2.png) no-repeat center",
  "url(sources/car3.png) no-repeat center",
  "url(sources/car4.png) no-repeat center",
  "url(sources/car6.png) no-repeat center",
  "url(sources/car7.png) no-repeat center",
  "url(sources/car8.png) no-repeat center",
  "url(sources/car9.png) no-repeat center"
];

let car = 0;

//eventos de los botones next y prev
prevButton.addEventListener('click', ()=>{
  if (car==0){
    car=7;
  }else{
    car-=1;
  }
  let userCarSkin=document.querySelector(".carSkin");
  userCarSkin.style.background=cars[car];
  userCarSkin.style.backgroundSize="contain";
});
nextButton.addEventListener('click', ()=>{
  if (car==7){
    car=0;
  }else{
    car+=1;
  }
  let userCarSkin=document.querySelector(".carSkin");
  userCarSkin.style.background=cars[car];
  userCarSkin.style.backgroundSize="contain";
});

/*Aparecer el menu de carros*/
autos.addEventListener('click',function(){
  carros.style.display='flex';
  aceptar.style.display='flex';
});

//definir el boton aceptar
const aceptar = document.querySelector('.aceptar');

//Al darle click aceptar se almacena la url de la imagen
aceptar.addEventListener('click', () => {
    carros.style.display='none';
    aceptar.style.display='none';

    let userCar=document.querySelector(".userCar");
    userCar.style.background=cars[car];
    userCar.style.backgroundSize="contain";
});


/*Aparecer el Menu de dificultades*/
dificultad.addEventListener('click',function(){
  modo.style.display='flex';
  dificultad.style.display="none";
  iniciar.style.display="none";
  autos.style.display="none";
  soundSettingsButton.style.display="none";

})


//Ingresar al Juego
const menu=document.querySelector('.menu');
iniciar.addEventListener("click", () => {
    // Oculta el menú.
    menu.style.display='none';

    // Muestra el carro.
    const userCar=document.querySelector(".userCar");
    userCar.style.display="block";

    // Evalúa la dificultad seleccionada por el usuario.
    let difficultySelected=document.querySelector(".dificultadSeleccionada");
    if (difficultySelected.textContent=="F"){
        // Cambiando el tamaño del carro según la dificultad.
        userCar.style.height="90px";
        userCar.style.width="48px";
      }else if (difficultySelected.textContent=="M"){
        // Cambiando el tamaño del carro según la dificultad.
        userCar.style.height="105px";
        userCar.style.width="56px";
      }else if (difficultySelected.textContent=="D"){
        // Cambiando el tamaño del carro según la dificultad.
        userCar.style.height="150px";
        userCar.style.width="80px";
    }
    
    // Posiciona el carro del usuario.
    userCar.style.left="calc(50% - " + (parseFloat(window.getComputedStyle(userCar).width) / 2) + "px)";
    userCar.style.top="calc(100% - " + (parseFloat(window.getComputedStyle(userCar).height) + 30) + "px)";

    // Crea en enlace entre el archivo de JavaScript que contiene el código del juego con el HTML de la página.
    const game=document.querySelector("#game");
    game.setAttribute("type", "module");
    game.setAttribute("src", "javascript/scriptforgame.js");

    // Constantes de audio.
    const gameTheme=document.querySelector("#gameTheme");
    const gameOverSound=document.querySelector("#gameOver");
    const gameStartSound=document.querySelector("#gameStart");

    // Pone el volumen que esté en el control del volumen.
    gameOverSound.volume=volumeControl.value;
    gameStartSound.volume=volumeControl.value;
    gameTheme.volume=volumeControl.value;

    // Pone la pista del juego a velocidad normal.
    gameStartSound.currentTime=1;

    // Para el audio del menú y reproduce el audio para empezar el juego y el audio del juego.
    menuTheme.pause();
    gameStartSound.play()
  
    setTimeout(() => {
      gameTheme.play();
    }, 4500)
})


//elegir dificultad
const facil=document.querySelector('.facil')
const medio=document.querySelector('.medio')
const dificil=document.querySelector('.dificil')

//elegir dificultad
facil.addEventListener('click', () => {
  modo.style.display='none';
  dificultad.style.display="flex";
  iniciar.style.display="flex";
  autos.style.display="flex";
  soundSettingsButton.style.display="flex";

  road.style.background="url(sources/NIVELF-MASTER.png) center";
  road.style.backgroundSize="contain";

  const dificultadSeleccionada=document.querySelector(".dificultadSeleccionada");
  dificultadSeleccionada.textContent="F";
})

medio.addEventListener('click', () => {
  modo.style.display='none';
  dificultad.style.display="flex";
  iniciar.style.display="flex";
  autos.style.display="flex";
  soundSettingsButton.style.display="flex";

  road.style.background="url(sources/NIVELM-MASTER.png) center";
  road.style.backgroundSize="contain";

  const dificultadSeleccionada=document.querySelector(".dificultadSeleccionada");
  dificultadSeleccionada.textContent="M";
})

dificil.addEventListener('click', () =>{
  modo.style.display='none';
  dificultad.style.display="flex";
  iniciar.style.display="flex";
  autos.style.display="flex";
  soundSettingsButton.style.display="flex";

  road.style.background="url(sources/NIVELD-MASTER.png) center";
  road.style.backgroundSize="contain";

  const dificultadSeleccionada=document.querySelector(".dificultadSeleccionada");
  dificultadSeleccionada.textContent="D";
})

soundSettingsButton.addEventListener('click', () => {
    if (soundSettingsMenu.style.display == 'block') {
        soundSettingsMenu.style.display = 'none';
    } else {
        soundSettingsMenu.style.display = 'block';
    }
});

//para activar la musica
soundOnButton.addEventListener('click', () => {
  menuTheme.play();
});
//para pausar la musica
soundOffButton.addEventListener('click', () => {
  menuTheme.pause();
});
//manejar el volumen de la musica
volumeControl.addEventListener('input', () => {
  menuTheme.volume = volumeControl.value;
});

menuTheme.play();