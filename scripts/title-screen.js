// Created by Aidan Yip
// Copyright Aidan Yip. 2024.

// game variables
const start_button = document.querySelector(`#start_button`);
const main = document.querySelector(`main`);

// audio variables
let main_title = new Audio(`music/menu_loop.mp3`);

start_button.addEventListener(`click`, () => {
  // start game
  location.href = `game.html`;
});

main.addEventListener(`mouseover`, () => {
  // play audio
  main_title.play();
  main_title.loop = true;
});