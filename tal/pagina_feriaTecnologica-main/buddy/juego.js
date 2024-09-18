const body = document.querySelector("body");
const empezar = document.getElementById("empezar");
const selector = document.getElementById("selector");
const titulo = document.getElementById("titulo");
const fondo = document.getElementById("container");
const score = document.getElementById("score");
const volver = document.getElementById("volver");
const perdiste = document.getElementById("gameover");

const flechaiz = document.getElementById("flechaizquierda");
const flechade = document.getElementById("flechaderecha"); 

flechade.style.display = "none";
flechaiz.style.display = "none";

/*audio*/
const menu = document.getElementById("menuz");
const parte1 = document.getElementById("parte1");
const parte2 = document.getElementById("parte2");
const flecha = document.getElementById("flecha");
const scorez = document.getElementById("scorez");

menu.volume = 0.2;

parte1.volume = 0.3;
parte2.volume = 0.3;
scorez.volume = 0.1;

parte1.pause();
parte2.pause();


var obstaculo;
var dejar = true;
/*objetos*/
const personaje = document.getElementById("personaje");
const suelo = document.getElementById("suelo");

const nube1 = document.getElementById("nube");
const nube2 = document.getElementById("nube2");



/*Añadir color al fondo*/
fondo.style.background = "linear-gradient(to bottom, #87CEEB, #FFFFFF)";   

/*empezar*/
    
suelo.style.display = "flex";

function iniciar(){
    menu.pause();
    menu.currentTime = 0;
    parte1.play()
    /*deshabilita los botones*/
    empezar.style.display = "none";
    selector.style.display = "none";
    titulo.style.display = "none";

    nube1.style.display = "none";
    nube2.style.display = "none";
    



    score.style.display = "flex";

    /*Habilitar las cosas*/

    personaje.style.display = "flex";
    
    
    suelo.style.display = "flex";
    suelo.style.position = "absolute";

    flechade.style.display = "none";
    flechaiz.style.display = "none";


    personaje.classList.add("correr");

    /*Logica del juego*/

    var time = new Date();
    var deltatime = 0;

    if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(Init,1);
    } else {
        document.addEventListener("DOMContentLoaded",Init);
    }

    function Init(){
        time = new Date();
        Loop();
    }

    function Loop(){
        deltatime = (new Date() - time)/1000;
        time = new Date();

        update();
        requestAnimationFrame(Loop);
    }

    
    var velY = 0;
    var impulso = 1000;
    var gravedad = 2500;

    var personajeY = 80;
    var personajex = 0;

    var sueloX = 0;
    var escenariovel = 1200/3;
    var gamevel = 1;
    var puntos = 0;

    var parado = false;
    var saltando = false;

    var tiempohastaobstaculo = 2;
    var tiempoobstaculomin = 0.8;
    var tiempoobstaculomax = 2;
   
    var obstaculos = [];


    var tiempoHastaNube = 0.5;
    var tiempoNubeMin = 0.7;
    var tiempoNubeMax = 4.7;
    var maxNubeY = 470;
    var minNubeY = 300;
    var nubes = [];
    var nube;
    var velNube = 0.5;


    dejar = true;


    /*tecla presionada*/
    document.addEventListener("keydown",teclapresionada);

    /*Salto*/
    function teclapresionada(tecla){
        if(tecla.keyCode == 32 ){
            saltar();
        }
    }

    function saltar(){
        if(saltando == false){
            saltando = true;
            velY = impulso;
            personaje.classList.remove("correr");
            personaje.classList.add("saltar");
        }
    }

    /*mueve el suelo de posicion en cada frame*/
    function update(){
        if(parado){
            dejar === false;
            
            obstaculos.forEach(function(obstaculo) {
                if (obstaculo && obstaculo.parentNode) {
                    obstaculo.parentNode.removeChild(obstaculo);
                }
            });
            nube.style.display = "none";
            nubes.forEach(function(nube) {
                if (nube && nube.parentNode) {
                    nube.parentNode.removeChild(nube);
                }
            });


            return;
        }
        else{
            
        }
        moverSuel();
        moverpersonaje();
        detectarcol();

        if (dejar === true) {
            decidircrearobs();
            moverobstaculo();
            decidircrearnube();
            movernube();
        } else {
            obstaculo.style.display = "none";
            obstaculos.forEach(function(obstaculo) {
                if (obstaculo && obstaculo.parentNode) {
                    obstaculo.parentNode.removeChild(obstaculo);
                }
            });

            nube.style.display = "none";
            nubes.forEach(function(nube) {
                if (nube && nube.parentNode) {
                    nube.parentNode.removeChild(nube);
                }
            });
        }
        
        velY  -= gravedad * deltatime;
    }
    
    /*calcula la posicion del suelo para poder actualizarla */
    function moverSuel(){
        sueloX += Calculodelta();
        suelo.style.left = -(sueloX  % container.clientWidth) + "px";
    }

    /*el delta para que funcione en cualquier dispositivo independientemente de los fps que tenga*/
    function Calculodelta(){
        return escenariovel * deltatime * gamevel;
    }

    function moverpersonaje(){
        personajeY += velY * deltatime;
        if(personajeY < 80){
            tocarsuelo();
        }
        personaje.style.bottom = personajeY + "px";
    }

    function tocarsuelo(){
        personajeY = 80;
        velY = 0;
        if(saltando){
            personaje.classList.add("correr");
            personaje.classList.remove("saltar");
        }
        saltando = false;
    }


    /*Comprueba el tiempo para ir viendo cada cuanto spawnea un obstaculo*/
    function decidircrearobs(){
        tiempohastaobstaculo -= deltatime;
        if(tiempohastaobstaculo <= 0  && dejar === true){
            crearobstaculo();
        }
    }    


    function decidircrearnube() {
        tiempoHastaNube -= deltatime;
        if(tiempoHastaNube <= 0) {
            CrearNube();
        }
    }

    function crearobstaculo(){
        if(dejar && puntos <3){
            obstaculo = document.createElement("div");
            
            
            obstaculo.classList.add("arbol");
            
            container.appendChild(obstaculo);
            
           
            

            obstaculo.posX = container.clientWidth;
            obstaculo.style.left = container.clientWidth;
    
            obstaculos.push(obstaculo);
            tiempohastaobstaculo = tiempoobstaculomin + Math.random() * (tiempoobstaculomax-tiempoobstaculomin) / gamevel;
        }
        else{
            crearobstaculo2();
        }
    }

    function crearobstaculo2(){
        if(dejar && puntos >3 && puntos < 10){
            obstaculo = document.createElement("div");
            
            
            obstaculo.classList.add("sombra");
            
            container.appendChild(obstaculo);
            
           
            

            obstaculo.posX = container.clientWidth;
            obstaculo.style.left = container.clientWidth;
    
            obstaculos.push(obstaculo);
            tiempohastaobstaculo = tiempoobstaculomin + Math.random() * (tiempoobstaculomax-tiempoobstaculomin) / gamevel;
        }
        else{
            crearobstaculo3();
        }
        
        
    }

    function crearobstaculo3(){
        if(dejar && puntos >10 && puntos < 20){
            obstaculo = document.createElement("div");
            
            
            obstaculo.classList.add("arbolconcara");
            
            container.appendChild(obstaculo);
            
           
            

            obstaculo.posX = container.clientWidth;
            obstaculo.style.left = container.clientWidth;
    
            obstaculos.push(obstaculo);
            tiempohastaobstaculo = tiempoobstaculomin + Math.random() * (tiempoobstaculomax-tiempoobstaculomin) / gamevel;
        }
        else{
            crearobstaculo4();
        }
    }

    function crearobstaculo4(){
        if(dejar && puntos >= 20){
            obstaculo = document.createElement("div");
            
            
            obstaculo.classList.add("arbolconcaramorado");
            
            container.appendChild(obstaculo);
            
           
            

            obstaculo.posX = container.clientWidth;
            obstaculo.style.left = container.clientWidth;
    
            obstaculos.push(obstaculo);
            tiempohastaobstaculo = tiempoobstaculomin + Math.random() * (tiempoobstaculomax-tiempoobstaculomin) / gamevel;
        }
    }

    function CrearNube(){
        if(dejar && puntos < 20){
            nube = document.createElement("div");
            container.appendChild(nube);
            nube.classList.add("nube");
            nube.posX = container.clientWidth;
            nube.style.left = container.clientWidth+"px";
            nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
            
            nubes.push(nube);
            tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gamevel;
        }
        else{
            crearnube2();
        }

    }

    function crearnube2(){
        if(dejar && puntos >= 20){
            nube = document.createElement("div");
            container.appendChild(nube);
            nube.classList.add("nubecolormorada");
            nube.posX = container.clientWidth;
            nube.style.left = container.clientWidth+"px";
            nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
            
            nubes.push(nube);
            tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gamevel;
        }
    }

    function moverobstaculo(){
        for(var x = obstaculos.length -1 ; x >= 0; x--){
            if(obstaculos[x].posX < -obstaculos[x].clientWidth){
                obstaculos[x].parentNode.removeChild(obstaculos[x]);
                obstaculos.splice(x,1);
                Ganarscore();
            } else {
                obstaculos[x].posX -= Calculodelta();
                obstaculos[x].style.left = obstaculos[x].posX + "px";
            }
        }
    }


    function movernube(){
        for (var x = nubes.length - 1; x >= 0; x--) {
            if(nubes[x].posX < -nubes[x].clientWidth) {
                nubes[x].parentNode.removeChild(nubes[x]);
                nubes.splice(x, 1);
            }else{
                nubes[x].posX -= Calculodelta() * velNube;
                nubes[x].style.left = nubes[x].posX+"px";
            }
        }
    }
    function Ganarscore(){
        puntos++
        score.textContent = puntos;
        scorez.play();

        /*Comprueba cuanto score hay*/
        if(puntos >= 10 && puntos < 20){
            gamevel = 1.5;
            fondo.style.background = "linear-gradient(to bottom, #ff7f00, #ffff00)";
        }
        if(puntos >= 20){
            parte1.pause();
            parte1.currentTime = 0;
            parte2.play();
            gamevel = 2.0;
            
            fondo.style.background = "linear-gradient(to bottom, #4b0082, #b19cd9)";
        }
        if(puntos >=3 && puntos < 10 ){
            gamevel = 1.2;
        }
    }

    /*Detecta la colision*/
    function detectarcol(){
        for(var x = 0; x<obstaculos.length; x++){
            if(obstaculos[x].posX > personajex + personaje.clientWidth){
                break;
            } else {
                if(iscollision(personaje,obstaculos[x],10,30,15,20)){
                    muerto();
                }
            }
        }
    }

    
    /*Funcion para ajustar de una mejor manera la colision talvez por algun diseño raro*/
    function iscollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();
    
        return !(
            ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
            (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
            (aRect.left + paddingLeft > (bRect.left + bRect.width))
        );
    }

    function muerto(){
        perdiste.style.display = "flex";
        gameover();
    }

    function gameover(){
        personaje.classList.remove("correr");
        parado = true;
    }

   

  
}

empezar.addEventListener("click",iniciar);

perdiste.addEventListener("click",reiniciarJuego);


/*personaje*/
selector.addEventListener("click",function(){
    flecha.play();
    /*deshabilita los botones*/
    empezar.style.display = "none";
    selector.style.display = "none";
    titulo.textContent = "Selecciona tu personaje";

    personaje.style.display = "flex";
    personaje.style.top = "250px";
    personaje.style.left = "430px";

    flechade.style.display = "flex";
    flechaiz.style.display = "flex";

    flechade.style.position = "absolute";
    flechade.style.top = "250px";
    flechade.style.left = "580px";

    flechaiz.style.position = "absolute";
    flechaiz.style.top = "250px";
    flechaiz.style.left = "270px";

    volver.style.display = "flex";
    volver.style.top = "300px";
    volver.style.left = "300px";

})



function reiniciarJuego() {
    flecha.play();
    menu.play();
    parte1.pause();
    parte2.pause();
    parte1.currentTime = 0;
    parte2.currentTime = 0;

    empezar.style.display = "flex";
    selector.style.display = "flex";
    titulo.style.display = "flex";
    volver.style.display = "none";

    /* restaurar fondo */
    fondo.style.background = "linear-gradient(to bottom, #87CEEB, #FFFFFF)";

    /* ocultar elementos del juego */
    personaje.style.display = "none";
    suelo.style.display = "display";
    score.style.display = "none";
    perdiste.style.display = "none";

    nube1.style.display = "flex";
    nube2.style.display = "flex";

    /* reiniciar variables del juego */
    obstaculo = null;
    dejar = false;  // Detener la generación de obstáculos

    personaje.classList.remove("correr");
    personaje.classList.remove("saltar");

    /* reiniciar puntos */
    puntos = 0;
    score.textContent = puntos;

    /* reset del personaje */
    personaje.style.bottom = "80px";
    velY = 0;
    personajeY = 80;
    personajex = 0;

    /* reset del suelo */
    sueloX = 0;

    
    obstaculos = [];
    nubes = [];

    parado = false;
    saltando = false;
}


volver.addEventListener("click",function(e){
    flecha.play();
    empezar.style.display = "flex";
    selector.style.display = "flex";
    titulo.style.display = "flex";
    titulo.textContent = "BUDDY ADVENTURE";
    volver.style.display = "none";

    flechade.style.display = "none";
    flechaiz.style.display = "none";
    personaje.style.display = "none";
    personaje.style.position = "absolute";

    personaje.style.display = "none";
    personaje.style.top = "";
    personaje.style.left = "";
    personaje.style.bottom = "80px";
    
})

var skins = ["per1.png","per2.png","per3.png"];

// Definir índice inicial y obtener elementos del DOM
var indiceSkin = 0; // Índice inicial del skin


/*Evita que no aparezca una skin vacia*/
personaje.style.backgroundImage = `url(${skins[indiceSkin]})`;


flechaiz.addEventListener("click", function() {
    // Cambiar el estilo de fondo del personaje con el siguiente skin
    personaje.style.backgroundImage = `url(${skins[indiceSkin]})`;
    /*audio*/
    flecha.play();
    // Incrementar el índice para el siguiente skin
    indiceSkin++;
    
    //reiniciar indice
    if (indiceSkin >= skins.length) {
        indiceSkin = 0;
    }
});


/*lo mismo que la otra flecha*/
flechade.addEventListener("click", function() {
    flecha.play();
    personaje.style.backgroundImage = `url(${skins[indiceSkin]})`;
    
    
    indiceSkin++;
    
    
    if (indiceSkin >= skins.length) {
        indiceSkin = 0;
    }
});