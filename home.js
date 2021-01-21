//Challenge 1: Your Age in Days

document.getElementById('ch-1-click').addEventListener('click', () => {
    let currYear = new Date().getFullYear();
    let birthYear = prompt('Whats your birthYear?');
    let result = (currYear - birthYear) * 365;
    document.getElementById('result-h').innerHTML = result + ' day(s) old';
});

function resetch1() {
    document.getElementById('result-h').innerHTML = '';
}

//Challenge 2:
function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat');
    image.src = "https://cdn2.thecatapi.com/images/2oo.gif";
    div.appendChild(image);
}

//Challenge 3:
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    let dict = {1: 'rock', 2: 'paper', 3: 'scissor'};
    humanChoice = yourChoice.id;
    botChoice = dict[getRndInteger(1,4)];
    let result = decidewinner(humanChoice, botChoice);
    let message = finalMessage(result);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function decidewinner(human, bot) {
    let result = null;

    if(human === bot) {
        result = [0,0];
    } else if ((human == 'rock' && bot == 'paper') || 
            (human == 'scissor' && bot == 'rock') ||
            (human == 'paper' && bot == 'scissor')) {
        result = [0,1];
    } else if ((human == 'rock' && bot == 'scissor') || 
            (human == 'paper' && bot == 'rock') ||
            (human == 'scissor' && bot == 'paper')) {
        result = [1,0];
    }

    return result;
}

function finalMessage(result) {
    let msg = '';
    let color = '';
    if (result[0] == 0 && result[1] == 0) {
        msg = 'Its Draw';
        color = 'gray';
    } else if (result[0] == 0 && result[1] == 1) {
        msg = 'Computer Won';
        color = 'red';
    } else if (result[0] == 1 && result[1] == 0) {
        msg = 'Human Won';
        color = 'green';
    }

    let obj = {
        msg,
        color
    }

    return obj;
}

function rpsFrontEnd(humanid, botid, msg) {
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    };
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humandiv = document.createElement('div');
    let botdiv = document.createElement('div');
    let msgdiv = document.createElement('div');
    let div = document.getElementById('flex-box-rps-div');

    humandiv.innerHTML = "<img src='" +imagesDatabase[humanid] +"'/>";
    botdiv.innerHTML = "<img src='" +imagesDatabase[botid] +"'/>";
    msgdiv.innerHTML = "<h2 style='color: "+msg.color +"; font-size:40px;padding: 30px;margin-top: 20px;'>" +msg.msg +"</h2>";

    div.appendChild(humandiv);
    div.appendChild(msgdiv);
    div.appendChild(botdiv);
}

//Challenge 4:
let all_buttons = document.getElementsByTagName('button');
let copybuttons = [];

for(let i = 0;i < all_buttons.length; i++) {
    copybuttons.push(all_buttons[i].classList[1]);
}

function ButtonChanged(buttonThing) {
    if (buttonThing.value === 'red') {
        buttonRed();
    } else if (buttonThing.value === 'green') {
        buttonGreen();
    } else if (buttonThing.value === 'reset') {
        buttonReset();
    } else if (buttonThing.value === 'random') {
        buttonRandom();
    }
}

function buttonRed() {
    for(let i = 0;i<all_buttons.length;i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for(let i = 0;i<all_buttons.length;i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for(let i = 0;i<all_buttons.length;i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copybuttons[i]);
    }
}

function buttonRandom() {
    let chocies = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(let i=0;i<all_buttons.length;i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(chocies[randomNumber]);
    }
}

//Challenge 5:
let blackjackGame = {
    'you': {
        'scoreSpan': '#your-result',
        'div': '#your-choice-id',
        'score': 0
    },
    'dealer': {
        'scoreSpan': '#your-bot',
        'div': '#bot-choice-id',
        'score': 0
    },
    'cards': ['2','3','4','5','6','7','8','9','10','A','J','Q','K'],
    'cardMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'J': 10,
        'Q': 10,
        'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const CARD = blackjackGame['cards'];
const CARDMAP = blackjackGame['cardMap'];

const hitSound = new Audio('./sounds/swish.m4a');
const winSound = new Audio('./sounds/cash.mp3');
const lossSound = new Audio('./sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', userlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function userlogic() {
    if (blackjackGame['isStand'] === false) {
        let card = Math.floor(Math.random() * 13);
        showCard(YOU, card);
        updateScore(CARD[card], YOU);
        showScore(YOU);
    }
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = './images/' +CARD[card] +'.png';
        cardImage.style.height = '100px';
        cardImage.style.margin = '10px';
        
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-choice-id').querySelectorAll('img');
    let dealerImages = document.querySelector('#bot-choice-id').querySelectorAll('img');
    
    for(let i = 0;i<yourImages.length;i++) {
        yourImages[i].remove();
    }

    for(let i = 0;i<dealerImages.length;i++) {
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-result').textContent = 0;
    document.querySelector('#your-result').style.color = 'white';
    document.querySelector('#your-bot').textContent = 0;
    document.querySelector('#your-bot').style.color = 'white';
    document.querySelector('#blackjack-result').textContent = 'Let\'s play';
    document.querySelector('#blackjack-result').style.color = 'black';
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + CARDMAP[card][1] <= 21) {
            activePlayer['score'] += CARDMAP[card][1];
        } else {
            activePlayer['score'] += CARDMAP[card][0];
        }
    } else {
        activePlayer['score'] += CARDMAP[card];
    }
    
     
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 17 && blackjackGame['isStand'] === true) {
        let card = Math.floor(Math.random() * 13);
        showCard(DEALER, card);
        updateScore(CARD[card], DEALER);
        showScore(DEALER);
        await sleep(1000);
    } 
    
    blackjackGame['isStand'] = false;
    let winner = computeWinner();
    showResult(winner);

}

//Calculate winner
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // more score than dealer
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    } else if (winner == DEALER) {
        document.querySelector('#loss').textContent = blackjackGame['losses'];
        message = 'You loss!';
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draw').textContent = blackjackGame['draws'];
        message = 'You drew!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}