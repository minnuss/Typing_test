const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const word = document.getElementById('word')
const textInput = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endGameEl = document.getElementById('end-game-container')

// INIT SCORE
let score = 0

// INIT TIME
let time = 10

// RANDOM WORD
let randomWord

// SET DIFFICULTY TO VALUE IN LOCAL STORAGE OR DEFAULT MEDIUM
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// SET DIFFICULTY SELECT VALUE
// difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'
difficultySelect.value = difficulty

// FOCUS ON INPUT TEXT
textInput.focus()

// FETCH RANDOM WORD FROM API
async function getRandomWord() {
    const res = await fetch('https://random-words-api.vercel.app/word')
    const data = await res.json()

    // console.log(data[0].word.toLowerCase())
    randomWord = data[0].word.toLowerCase()
    // console.log(randomWord)
    addWordToDOM(randomWord)
}
getRandomWord()

// ADD WORD TO DOM
function addWordToDOM(randomWord) {
    // console.log(randomWord)
    if (randomWord === undefined) {
        randomWord = '...'
    } else {
        word.innerHTML = randomWord
    }
}

// UPDATE SCORE
function updateScore() {
    score++
    scoreEl.innerHTML = score
}

// UPDATE TIME
function updateTime() {
    // console.log(123)
    time--
    timeEl.innerHTML = time + 's'

    if (time === 0) {
        clearInterval(timeInterval)

        // end game
        gameOver()
    }
}

// GAME OVER
function gameOver() {
    endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your finale score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `
    endGameEl.style.display = 'flex'
}

// CHANGE SCORE BONUS VALUE
function changeSecondsDifficulty() {
    if (difficulty === 'easy') {
        time += 5
    } else if (difficulty === "medium") {
        time += 3
    } else if (difficulty === 'hard') {
        time += 2
    }
}
changeSecondsDifficulty()

// START TIMER
const timeInterval = setInterval(updateTime, 1000)

// EVENT LISTENER ON INPUT
textInput.addEventListener('input', (e) => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        // reset input
        textInput.value = ''
        // get random word
        getRandomWord()
        // update score
        updateScore()
        // change seconds bonus difficulty on change
        changeSecondsDifficulty()
    }
})

// EVENT ON DIFFICULTY SELECT
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})

// HIDE SETTINGS BAR ON BUTTON CLICK
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})