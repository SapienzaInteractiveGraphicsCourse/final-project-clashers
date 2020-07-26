# Interactive Graphics' Final Project - Super Mario
*Developed by Clashers group: Mauro Ficorella, Valentina Sisti, Martina Turbessi*

![Alt text](https://github.com/SapienzaInteractiveGraphicsCourse/final-project-clashers/blob/master/img/title.png)

Game based on the famous Super Mario platform game. More precisely, the project recreates Super Mario Bros’ first level.
The main goal of this game is to finish the level collecting as many coins as possible without losing life against enemies (goombas). 

![Alt text](https://github.com/SapienzaInteractiveGraphicsCourse/final-project-clashers/blob/master/img/previewGame.png)

## Launching the game

In order to try the game, you just need to click on the following [**LINK**](https://sapienzainteractivegraphicscourse.github.io/final-project-clashers/index.html).

If you want to launch the game locally on your pc, you need to run it on a local server (for example using IntelliJ, Visual Studio Code using Live Server extension, python command line).

If you cloned the repository, in order to play the game you need to open the "index.html" file on an internet browser (Chrome, Firefox...) with a background local server running as explained before.

## Controls

* **A:** move left
* **D:** move right
* **SPACE:** jump

## Built With

* [Three.js](https://threejs.org/)
* [Tween.js](https://github.com/tweenjs/tween.js) - Used for smooth animations
* [Physijs](https://chandlerprall.github.io/Physijs/) - Used to handle collisions

## Documentation

For more details about how the project has been developed please refers to the [report file](https://github.com/SapienzaInteractiveGraphicsCourse/final-project-clashers/blob/master/Documentation%20Final%20Project.pdf).

## Known Issues

* Sometimes it may happen that the collision with the top of an object will not be detected immediately when the character touches the object, causing the character accidentally fall down to the ground. Moreover, sometimes it may also happen that the character do not fall down from the stairs, remaining with its body floating in the air. However, these issues happens very rarely and do not prevent the game from continuing running correctly. 

* Audio doesn't work if the level page is simply refreshed; if the console outputs audio error, you need to go back to the start screen and reload the level.

## Authors

* **Mauro Ficorella** - [GitHub profile](https://github.com/mauroficorella)
* **Valentina Sisti** - [GitHub profile](https://github.com/ValeSisti)
* **Martina Turbessi** - [GitHub profile](https://github.com/martinaturbessi)

If you want to download this project or make any use, please ask first to:
* mauro.ficorella94@gmail.com
* valentina.sisti95@gmail.com
* martina.turbessi95@gmail.com

