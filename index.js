/* Identy the images to be used (6 matching and 1 for back of card) */
document.addEventListener("DOMContentLoaded", function() {

    const imageArray = [{
            name: 'pirate',
            img: "images/pirate-lego.jpeg"
        },
        {
            name: 'pirate',
            img: "images/pirate-lego.jpeg"
        },
        {
            name: 'goofy',
            img: "images/goofy-lego.jpeg"
        },
        {
            name: 'goofy',
            img: "images/goofy-lego.jpeg"
        },
        {
            name: 'motorcycle',
            img: "images/motorcycle-lego.jpeg"
        },
        {
            name: 'motorcycle',
            img: "images/motorcycle-lego.jpeg"
        },
        {
            name: 'r2d2',
            img: "images/r2d2-lego.jpeg"
        },
        {
            name: 'r2d2',
            img: "images/r2d2-lego.jpeg"
        },
        {
            name: 'sf',
            img: "images/sf-lego.jpeg"
        },
        {
            name: 'sf',
            img: "images/sf-lego.jpeg"
        },
        {
            name: 'shuttle',
            img: "images/shuttle-lego.jpeg"
        },
        {
            name: 'shuttle',
            img: "images/shuttle-lego.jpeg"
        }
    ]

    imageArray.sort(() => 0.5 - Math.random())

    const resetButton = document.getElementById('reset')
    const timerDOMElement = document.getElementById('timer')
    let isTimerRunning = false
    let timeInSeconds = 0
    let timeKeepingInterval
    timerDOMElement.innerHTML = prettyPrintTime()
    let isModalDisplayed = false
    const modal = document.getElementById('modal')

    modal.addEventListener('click', toggleModal)
    resetButton.addEventListener('click', onResetButtonClicked)
    const gameboard = document.getElementById("gameboard") // Identify the board area
    const scoreDisplay = document.getElementById("score")
    let cardsChosen = [] // an array of cards chosen
    let cardsChosenId = [] // an array for card IDs
    let cardsWon = []

    // create the board environment
    function createBoard() {
        for (let i = 0; i < imageArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', 'images/logo.png')
            card.setAttribute('data-id', i)
            gameboard.appendChild(card)
            card.addEventListener('click', flipCard)
        }
    }

    //reset button
    function onResetButtonClicked() {
        console.log("did my button click")
        cardsChosen = [] // reset to empty
        cardsChosenId = [] // reset to empty
        cardsWon = [] // reset to empty
        scoreDisplay.textContent = cardsWon.length
        gameboard.innerHTML = ''
        clearInterval(timeKeepingInterval)
        timeInSeconds = 0
        timerDOMElement.innerHTML = "00:00"
        isTimerRunning = false
        imageArray.sort(() => 0.5 - Math.random())
        if (isModalDisplayed) {
            toggleModal()
        }
        createBoard()
    }

    // make the time function look better
    function prettyPrintTime() {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds - (minutes * 60));

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    // timer functionality
    function startTimer() {
        isTimerRunning = true
        timeKeepingInterval = setInterval(() => {
            timeInSeconds += 1

            timerDOMElement.innerHTML = prettyPrintTime()
        }, 1000);


    }

    //Find matches

    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            // alert("You found a match!")
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/logo.png')
            cards[optionTwoId].setAttribute('src', 'images/logo.png')
                // alert("Sorry, try again!")
        }
        cardsChosen = []
        cardsChosenId = []
        scoreDisplay.textContent = cardsWon.length
        if (cardsWon.length === imageArray.length / 2) {
            toggleModal()
            clearInterval(timeKeepingInterval)
        }
    }

    // Toggle the modal at end of game
    function toggleModal() {
        if (isModalDisplayed) {
            // set as display None and update the variable
            modal.style.display = "none"
        } else {
            // set display to initial
            modal.style.display = "flex" //display modal
            const modalTimeElement = document.getElementById('timeAnchor')
            const modalScoreElement = document.getElementById('finalScore')

            modalTimeElement.innerHTML = prettyPrintTime()
            modalScoreElement.innerHTML = cardsWon.length
        }
        isModalDisplayed = !isModalDisplayed //update isModalDisplayed variable


    }

    //flip the cards

    function flipCard() {
        // check if timer is runnning, if not, then call startTimer
        if (!isTimerRunning) {
            startTimer()
        }
        let cardId = this.getAttribute("data-id")
        cardsChosen.push(imageArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', imageArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 700)
        }

    }

    createBoard()

})