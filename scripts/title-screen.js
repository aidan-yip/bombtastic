// Created by Aidan Yip
// Copyright Aidan Yip. 2024.

"use strict";

// game variables objects
const game_title_elements = {
  start_button: document.querySelector(`#start_button`),
  main: document.querySelector(`main`),
  artist_link: document.querySelector(`#artist_link`),
  game_title: document.querySelector(`h1`),
};

// audio variables
let main_title = new Audio(`music/menu_loop.mp3`);

game_title_elements.start_button.addEventListener(`click`, () => {
  // start game
  location.href = `game.html`;
});

game_title_elements.start_button.addEventListener(`mouseover`, () => {
  start_button.style.cursor = `pointer`;
});

game_title_elements.game_title.addEventListener(`mouseover`, () => {
  game_title_elements.game_title.style.color = `#ff1919`;
});

game_title_elements.game_title.addEventListener(`mouseleave`, () => {
  game_title_elements.game_title.style.color = `#ffffff`;
});

game_title_elements.artist_link.addEventListener(`mouseover`, () => {
  game_title_elements.artist_link.style.backgroundColor = `#ffffff`;
});

game_title_elements.artist_link.addEventListener(`mouseleave`, () => {
  game_title_elements.artist_link.style.backgroundColor = `transparent`;
});

game_title_elements.main.addEventListener(`mouseover`, () => {
  // play audio
  main_title.play();
  main_title.loop = true;
  console.log(`Main title music started.`);
});

// Offline Alert
window.addEventListener("offline", function () {
  alert("You're offline please reconnect to play Bombtastic.");
});
