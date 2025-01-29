const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let cards = [];
let flippedCards = [];
let score = 0;
let matchedPairs = 0;

// Card values
const cardValues = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createBoard() {
    cards = shuffle(cardValues);
    gameBoard.innerHTML = '';
    score = 0;
    matchedPairs = 0;
    scoreDisplay.innerText = 'Score: ' + score;

    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-value', value);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.getAttribute('data-value');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for a match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        score++;
        matchedPairs++;
        scoreDisplay.innerText = 'Score: ' + score;

        // Reset flipped cards
        flippedCards = [];

        // Check for win
        if (matchedPairs === cardValues.length / 2) {
            setTimeout(() => {
                alert('You win! Score: ' + score);
                createBoard();
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 1000);
    }
}

// Restart the game
restartButton.addEventListener('click', createBoard);

// Initialize the game
createBoard();