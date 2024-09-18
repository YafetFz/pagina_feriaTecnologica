// Creating the program constants.
    // Audio
    const gameTheme=document.querySelector("#gameTheme");
    const gameOver=document.querySelector("#gameOver");

    // Volume Control
    const volumeControl = document.querySelector('#volume-control');

    // Menu buttons.
    const ingameMenu=document.querySelector("#ingameMenu");
    const displaymenuButton=document.querySelector("#ingameMenu > li:nth-child(1)");
    const menuButton=document.querySelector("#ingameMenu > li:nth-child(2)");
    const pauseButton=document.querySelector("#pauseButton");

    // Score table info.
    const score=document.querySelector(".score");
    const fuel=document.querySelector(".fuel")

    // Message
    const messaggeTitle=document.querySelector(".message > header");
    const messaggeInfo=document.querySelector(".message > p");

    // Road.
    const road=document.querySelector("body");

    // User Car.
    const userCar=document.querySelector(".userCar");

    // Point Collector.
    const pointCollector=document.querySelector(".pointCollector");

    // Overlay
    const overlay=document.querySelector(".overlay");

    // Menu
    const menu=document.querySelector(".menu");

// Creating the program variables.
let gameInterval;

let menuClick=false;
let messageDisplay=false;
let pauseClick=false;

let timeInterval=0;
let carScale=1;
let spawnRate=60;

let immunity=false;

let hover_on = () => {displaymenuButton.style.background= "#9F7A00";};
let hover_off = () => {displaymenuButton.style.background= "#DFAB00";};

// Event to show/hide the menu.
displaymenuButton.addEventListener("click", ()=>{
    if (menuClick==false){
        // Resizing the menu.
        ingameMenu.style.width= "150px";

        // Changing the menu display button icon.
        displaymenuButton.textContent= "↩";
        // Adding Events for hover effect.
        displaymenuButton.addEventListener("mouseover", hover_on)
        displaymenuButton.addEventListener("mouseout", hover_off)

        // Showing the other menu options.
        menuButton.style.display= "flex";
        pauseButton.style.display= "flex";

        // Changing the click value for next use.
        menuClick=true;

    }else{
        // Resizing the menu.
        ingameMenu.style.width= "35px";

        // Changing the menu display button icon.
        displaymenuButton.textContent= "☰";
        // Removing Events for hover effect.
        displaymenuButton.removeEventListener("mouseover", hover_on);
        displaymenuButton.removeEventListener("mouseout", hover_off);
        // Changing the menu display button because it is a different color.
        displaymenuButton.style.background= "#DFAB00";

        // Hiding the other menu options.
        menuButton.style.display= "none";
        pauseButton.style.display= "none";

        //Changing the click value for next use.
        menuClick=false;

    }
});

// Event for spawn the cars in the road and add fuel and points to the score table.
let game = () => {

    gameInterval=setInterval( () =>{

        // Evaluating the difficulty of the game and defining the variables based on it
        let difficultySelected=document.querySelector(".dificultadSeleccionada");
        if (difficultySelected.textContent=="F"){
            // Changing the spawn rate based on the difficulty.
            spawnRate=40;

            // Changing the size of the car based on the difficulty.
            carScale=0.6;
        }else if (difficultySelected.textContent=="M"){
            // Changing the spawn rate based on the difficulty.
            spawnRate=40;

            // Changing the size of the car based on the difficulty.
            carScale=0.7;
        }else if (difficultySelected.textContent=="D"){
            // Changing the spawn rate based on the difficulty.
            spawnRate=60;

            // Changing the size of the car based on the difficulty.
            carScale=1;
        }

        // Adding 1 more for the time interval;
        timeInterval++;
    
        if ((timeInterval%spawnRate==0) && window.getComputedStyle(menu).display=="none"){
            // Creating the car that will enter the road against traffic.
            let notUserCar=document.createElement('div');
    
            // Granting the "notUserCar" class to automatically add styles to it.
            notUserCar.setAttribute("class", "notUserCar");
            
            // Giving the car a texture.
            switch ((Math.floor(Math.random()*(14-1+1)) + 1)){
                case 1:
                    notUserCar.style.background="url(sources/car1.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 2:
                    notUserCar.style.background="url(sources/car2.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 3:
                    notUserCar.style.background="url(sources/car3.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 4:
                    notUserCar.style.background="url(sources/car4.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 5:
                    notUserCar.style.background="url(sources/car5.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 6:
                    notUserCar.style.background="url(sources/car6.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 7:
                    notUserCar.style.background="url(sources/car7.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 8:
                    notUserCar.style.background="url(sources/car8.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 9:
                    notUserCar.style.background="url(sources/car9.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 10:
                    notUserCar.style.background="url(sources/car10.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 11:
                    notUserCar.style.background="url(sources/car11.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
                case 12:
                    notUserCar.style.background="url(sources/car12.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    notUserCar.style.height="250px"
                    notUserCar.style.width="85px"
                    break;
                case 13:
                    notUserCar.style.background="url(sources/car13.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    notUserCar.style.height="200px"
                    notUserCar.style.width="100px"
                    break;
                case 14:
                    notUserCar.style.background="url(sources/car14.png) no-repeat center";
                    notUserCar.style.backgroundSize="contain";
                    break;
            }
            
            // Adding the vehicle on the road
            road.appendChild(notUserCar);
    
            // Positioning the vehicle on some random side of the road.
            notUserCar.style.left=(Math.floor(Math.random()*((pointCollector.getBoundingClientRect().right - 108)-(pointCollector.getBoundingClientRect().left + 35)+1))+(pointCollector.getBoundingClientRect().left + 35))+"px";
            notUserCar.style.top="-"+ parseFloat(window.getComputedStyle(userCar).height) +"px";

            // Changing the size of the user's car based on the difficulty.
            notUserCar.style.scale=carScale;
        }
    
        // Selecting all cars that the user does not drive.
        let notUserCars=document.querySelectorAll('.notUserCar');
    
        // Sentence that allows us to work one by one each element with a common class.
        notUserCars.forEach(notUserCar => {
            // Line of code that allows the car to reach the point collector.
            notUserCar.style.top=(notUserCar.getBoundingClientRect().y+6)+'px';
    
            // Evaluating whether there is a collision.
            notUserCars.forEach(car => {
                if (
                    ((car.getBoundingClientRect().left < userCar.getBoundingClientRect().left && car.getBoundingClientRect().left < userCar.getBoundingClientRect().right) &&
                    (car.getBoundingClientRect().right < userCar.getBoundingClientRect().right && car.getBoundingClientRect().right > userCar.getBoundingClientRect().left) &&
                    (car.getBoundingClientRect().top < userCar.getBoundingClientRect().top && car.getBoundingClientRect().top < userCar.getBoundingClientRect().bottom) && 
                    (car.getBoundingClientRect().bottom < userCar.getBoundingClientRect().bottom && car.getBoundingClientRect().bottom > userCar.getBoundingClientRect().top) && 
                    (immunity==false))                    
                    || 
                    ((car.getBoundingClientRect().right > userCar.getBoundingClientRect().left && car.getBoundingClientRect().right > userCar.getBoundingClientRect().right) &&
                    (car.getBoundingClientRect().left < userCar.getBoundingClientRect().right && car.getBoundingClientRect().left > userCar.getBoundingClientRect().left) &&
                    (car.getBoundingClientRect().top < userCar.getBoundingClientRect().top && car.getBoundingClientRect().top < userCar.getBoundingClientRect().bottom) && 
                    (car.getBoundingClientRect().bottom < userCar.getBoundingClientRect().bottom && car.getBoundingClientRect().bottom > userCar.getBoundingClientRect().top &&
                    (immunity==false))
                    )
    
                ){
                    // Removing all the cars except the user one.
                    notUserCars.forEach(notUserCar => {notUserCar.remove()})
    
                    // Reseting the Crazy Points.
                    score.textContent="0 pts";

                    // Reseting the fuel
                    fuel.textContent=0 + " %";

                    // Stoping the loop game audio.
                    gameTheme.loop=false;
                    gameTheme.pause();

                    // Playing The Game Over Sound Effect.
                    gameOver.play();
                    gameTheme.playbackRate=1;
    
                    // Displaying the game over message.
                    messaggeTitle.innerHTML="¡Has Perdido!";
                    messaggeInfo.innerHTML="Presiona  <b> ESCAPE </b>  para volver a jugar.";
                    overlay.style.display="flex"

                    // Positioning the car again.
                    userCar.style.left="calc(50% - " + (parseFloat(window.getComputedStyle(userCar).width) / 2) + "px)";
                    userCar.style.top="calc(100% - " + (parseFloat(window.getComputedStyle(userCar).height)+ 30) + "px)";
                    
                    // Event for quit the game over screen.
                    overlay.addEventListener("keydown", (e) =>{
                        if (e.code == "Escape"){
                            overlay.style.display="none"
                        }
                    })
                    messaggeTitle.setAttribute("id", "gameOver");

                    // Running the function to evaluate whether the game continues or not.
                    pause();
                }
            })
    
            // Evaluating whether the car that is going against the user's path has already reached the point collector.
            if (notUserCar.getBoundingClientRect().top > pointCollector.getBoundingClientRect().bottom){
    
                // Changing the score.
                score.textContent=(parseInt(score.textContent)+1)+" pts";
    
                // Removing the car 'cause is useless,
                notUserCar.remove();
    
                // If the user reach another 5 points for his score the program will give him "fuel", the "fuel" give him immunity.
                if (parseInt(score.textContent)%5==0 && parseInt(fuel.textContent)<100){
                    fuel.textContent=(parseInt(fuel.textContent)+25)+" %";
                    gameTheme.playbackRate+=0.1
                }

                // Adding more spawn rate.
                if (parseInt(score.textContent)%5==0){
                    if (spawnRate>40){
                        spawnRate-=5
                    } 
                }
            }
        })
    },80);
}

// Function for evaluate if the game is in pause.
let pause = () => {
    if (window.getComputedStyle(overlay).display == "flex"){
        // If the game is in pause the interval that makes the game functional will be deleted.
        clearInterval(gameInterval);
    }else if(window.getComputedStyle(overlay).display == "none"){
        // If the game isn't in pause this function will creates enemies, manages points and fuel, etc.
        clearInterval(gameInterval);
        game();
    }

    if (messaggeTitle.getAttribute("id") == "pause"){
        gameTheme.loop=true;
    }
    else if(messaggeTitle.getAttribute("id") == "gameOver"){
        gameTheme.currentTime = 0;
        gameTheme.loop=false;
        gameTheme.pause();
    }else if(messaggeTitle.getAttribute("id") == null){
        gameTheme.loop=true;
    }
}

// Event for player car movement.
road.addEventListener("keydown", (e) => {
    if ((e.code == "ArrowLeft" || e.code == "KeyA") && userCar.getBoundingClientRect().x>=(pointCollector.getBoundingClientRect().left + 35)){ userCar.style.left = userCar.getBoundingClientRect().x - 6 + "px"; }
    if ((e.code == "ArrowRight" || e.code == "KeyD") && userCar.getBoundingClientRect().x<=(pointCollector.getBoundingClientRect().right - parseFloat(window.getComputedStyle(userCar).width)) - 30){ userCar.style.left = userCar.getBoundingClientRect().x + 6 + "px"; }
    if ((e.code == "ArrowDown" || e.code == "KeyS") && userCar.getBoundingClientRect().y<=(pointCollector.getBoundingClientRect().bottom - parseFloat(window.getComputedStyle(userCar).height)) - 20){ userCar.style.top = userCar.getBoundingClientRect().y + 6 + "px"; }
    if ((e.code == "ArrowUp" || e.code == "KeyW") && userCar.getBoundingClientRect().y>=50){ userCar.style.top = userCar.getBoundingClientRect().y - 6 + "px"; }

    if ((e.code == "KeyF") && parseInt(fuel.textContent) > 0){ 
        fuel.textContent=parseInt(fuel.textContent)-25 + " %";
        immunity=true;
        setTimeout(() => {immunity=false;}, 3000);
    }

    // Condition responsible for removing the overlay (Pause or Game Over) if it is there. 
    if (e.code == "Escape" && (messageDisplay == true || window.getComputedStyle(overlay).display == "flex")){
        overlay.style.display="none";
        messaggeTitle.removeAttribute("id");
        gameTheme.play();
        pause();

        messageDisplay=false;
    }
});

// Function for the pause button in the ingame menu
pauseButton.addEventListener("click", () => {
    if (messageDisplay == false){
        messaggeTitle.innerHTML="Juego En Pausa";
        messaggeTitle.setAttribute("id", "pause");
        messaggeInfo.innerHTML="Presiona  <b> ESCAPE </b>  para volver a jugar.";
        overlay.style.display="flex";
        pause();

        messageDisplay=true;
    }
})

// Function for show the menu.
setTimeout(() => {
    menuButton.addEventListener("click", () => {
        // Showing the menu.
        menu.style.display="block";

        // Pausing the theme and resetting to the 0 second.
        const gameStartSoundEffect=document.querySelector("#gameStart");
        gameStartSoundEffect.pause();
        gameStartSoundEffect.currentTime=0;
        gameTheme.pause();
        gameTheme.playbackRate=1;
        gameTheme.currentTime=0;

        // Hiding the user's car.
        userCar.style.display="none";

        // Deleting the other cars.
        const notUserCars=document.querySelectorAll(".notUserCar");
        notUserCars.forEach(notUserCar => {notUserCar.remove()})

        // Reseting the Crazy Points.
        score.textContent="0 pts";

        // Reseting the fuel
        fuel.textContent=0 + " %";
    })
},4500)

// Evaluating if the game is in pause or not
pause();