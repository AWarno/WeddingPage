import data from './data.json';
import * as CryptoJS from 'crypto-js';
import swal from 'sweetalert';
const options = {
    title: 'Hello',
    text: 'Welcome to SweetAlert!',
    icon: 'success',
    buttons: {
        confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
        }
    }
};
swal(options);
const plaintext = 'secret message';
const passphrase = 'secret passphrase';
// Encrypt the message using AES
const ciphertext = CryptoJS.AES.encrypt(plaintext, passphrase).toString();
console.log('Ciphertext:', ciphertext);
// Decrypt the ciphertext using AES
const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
console.log('Decrypted message:', decryptedMessage);
const cardsContainer = document.getElementById("card-container");
const counter = document.getElementById("counter");
const arrow = document.getElementById("next-arrow");
const phrase = document.getElementById("dixit-phrase");
let page = 1;
let score = 0;
let selectedCard = null;
// Map to store the correct card number for each page
const correctCards = new Map();
correctCards.set(1, 3);
correctCards.set(2, 2);
correctCards.set(3, 4);
correctCards.set(4, 5);
correctCards.set(5, 1);
let maxPage = correctCards.size;
// Function to update the cards for a given page
const updateCards = (page) => {
    const correctCard = correctCards.get(page);
    if (!correctCard) {
        return;
    }
    if (cardsContainer) {
        // Clear the cards container
        while (cardsContainer.firstChild) {
            console.log("remove child");
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
        // Add cards
        for (let i = 1; i <= maxPage; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", `card${i}`);
            // card.style.backgroundImage = `url(images/cards.png)`;
            card.style.backgroundImage = `url(images/card${page}-${i}.jpg)`;
            card.addEventListener("click", handleCardClick);
            cardsContainer.appendChild(card);
        }
    }
};
const handleCardClick = (event) => {
    const clickedCard = event.target;
    if (selectedCard) {
        selectedCard.style.boxShadow = "";
    }
    if (clickedCard.dataset.correct) {
        clickedCard.style.boxShadow = "0px 0px 10px 2px rgba(0, 255, 0, 0.75)";
        score++;
    }
    else {
        clickedCard.style.boxShadow = "0px 0px 10px 2px rgba(255, 0, 0, 0.75)";
    }
    selectedCard = clickedCard;
    if (cardsContainer) {
        // Disable click events for all cards
        const cards = cardsContainer.children;
        for (let i = 0; i < cards.length; i++) {
            // Access each child element using the index i
            const card = cards[i];
            // Disable card
            card.classList.add("disabled");
        }
        if (page === maxPage) {
            endGame(score, maxPage);
        }
    }
    updateArrowButton(page, false);
};
const updateCounter = (page, maxPage) => {
    if (counter) {
        counter.innerText = `${page}/${maxPage}`;
    }
};
const updatePhrase = (page) => {
    if (phrase) {
        phrase.innerText = `"${data[page - 1]}" `;
    }
};
const updateArrowButton = (pageNumber, disabled) => {
    if (arrow && pageNumber === maxPage) {
        arrow.classList.add("disabled");
    }
    else if (arrow) {
        arrow.classList.toggle("disabled", disabled);
    }
};
const handleArrowClick = () => {
    page++;
    updateCards(page);
    updateCounter(page, maxPage);
    updatePhrase(page);
    updateArrowButton(page, true);
};
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
function endGame(score, maxPoints) {
    // Calculate the percentage of correct answers
    const percentCorrect = Math.round((score / maxPoints) * 100);
    // Create the message
    const message = `Your score: ${score}/${maxPoints} (${percentCorrect}%)`;
    alert(message);
}
arrow === null || arrow === void 0 ? void 0 : arrow.addEventListener("click", handleArrowClick);
// Disable arrow button
updateArrowButton(page, true);
updateCounter(page, maxPage);
updatePhrase(page);
// Update the cards for the initial page
updateCards(page);