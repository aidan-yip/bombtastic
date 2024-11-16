// Created by Aidan Yip
// Copyright Aidan Yip. 2024.

// ================
// variables
// ================

// game stat variables
let time = 45;
let score = 0;

// game timeout variables
let bomb_disable_repeat;
let bomb_enable_repeat;
let three_dot_repeat;

// game interval variables
let countdown_timer = time;
let countdown_timer_paused = false;

// ================
// audio variables
// ================

// music
let main_theme = new Audio(`music/game_sequence.mp3`);
let win_jingle = new Audio(`music/win_jingle.mp3`);

// sound fx
let explode_sound = new Audio(`audio/explode.wav`);
let game_pause_sound = new Audio(`audio/pause.mp3`);
let game_resume_sound = new Audio(`audio/resume.mp3`);

// ================
// audio functions
// ================

// ================
// music
// ================

// main theme audio functions
function play_main_theme() {
  main_theme.play();
};

function pause_main_theme() {
  main_theme.pause();
};

function stop_main_theme() {
  main_theme.currentTime = 0;
  main_theme.pause();
};

// win jingle audio functions
function play_win_jingle() {
  win_jingle.play();
};

// ================
// sound fx
// ================

// game resume sound
function play_game_pause_sound() {
  game_pause_sound.currentTime = 0;
  game_pause_sound.play();
};

function play_game_resume_sound() {
  game_resume_sound.currentTime = 0;
  game_resume_sound.play();
};

// explode sound
function play_explode_sound() {
  explode_sound.currentTime = 0;
  explode_sound.play();
};

function pause_explode_sound() {
  explode_sound.pause();
};

function stop_explode_sound() {
  explode_sound.currentTime = 0;
  explode_sound.pause();
};

// ================
// game objects
// ================

// game elements object list
const game_elements = {
  start_button: document.querySelector(`#start_button`),
  reset_button: document.querySelector(`#reset_button`),
  pause_button: document.querySelector(`#pause_button`),
  pause_button_icon: document.querySelector(`span.font_icon`),
  lose_popup_button: document.querySelector(`#lose_popup_button`),
  win_popup_button: document.querySelector(`#win_popup_button`),
  bomb_containers: document.querySelectorAll(`.bomb_container`),
  bombs: document.querySelectorAll(`.bomb`),
  lose_popup: document.querySelector(`#lose_popup`),
  win_popup: document.querySelector(`#win_popup`),
  sidebar: document.querySelector(`.sidebar`),
  game_window: document.querySelector(`#game_window`),
};

// game stats object list
const stats = {
  score_text: document.querySelector(`#score`),
  time_text: document.querySelector(`#time`),
  time_value: document.querySelector(`#time`),
};

// ================
// game functions
// ================
window.onload = () => {
  // disable bombs on game load
  disable_bombs();
  reset_button.setAttribute(`disabled`, true);
};

function disable_bombs() {
  game_elements.bomb_containers.forEach((bomb_container) => {
    // disable bombs
    bomb_container.setAttribute(`disabled`, true);
  });
  console.log(`Bombs Disabled`);
}

function enable_bombs() {
  game_elements.bomb_containers.forEach((bomb_container) => {
    // enable bombs
    bomb_container.removeAttribute(`disabled`);
  });
  console.log(`Bombs Enabled`);
}

// math random code snippet from https://www.tutorialspoint.com/how-to-select-a-random-element-from-array-in-javascript
function random_disabled_bomb() {
  const random_bomb = Math.floor(
    Math.random() * game_elements.bomb_containers.length
  );
  // insert random number in selector to select random bomb html node
  game_elements.bomb_containers[random_bomb].setAttribute(`disabled`, true);
  console.log(`Bomb Automation: ` + random_bomb);
}

function random_enabled_bomb() {
  const random_bomb = Math.floor(
    Math.random() * game_elements.bomb_containers.length
  );
  // insert random number in selector to select random bomb html node
  game_elements.bomb_containers[random_bomb].removeAttribute(`disabled`);
  console.log(`Bomb Automation: ` + random_bomb);
}

// bomb click event
game_elements.bomb_containers.forEach((bombs) => {
  bombs.addEventListener(`click`, () => {
    if (!countdown_timer_paused) {
      score++;
      score_text.innerHTML = `Score: ${score}`;
      console.log(`score:` + score);
      if (score >= 45) {
        win();
        end_game();
      }
    }
  });
});

// cycle bomb change color to green function
function cycle_bomb_color() {
  const bomb_inner = game_elements.bombs;

  game_elements.bombs.forEach((bomb) => {
    bomb.style.transition = `background-color 0.3s`;
  });

  bomb_inner.forEach((bomb, length) => {
    setTimeout(() => {
      bomb.style.backgroundColor = `#0bff38`;
    }, 100 * length);
  });
  console.log(`Bomb Color Cycle initiated`);
}

function three_dot_animation() {
  // three dot animation
  start_button.innerHTML = `.`;
  setTimeout(() => {
    start_button.innerHTML = `..`;
  }, 200);
  setTimeout(() => {
    start_button.innerHTML = `...`;
  }, 400);
}

// game start on start button click
game_elements.start_button.addEventListener(`click`, () => {
  start_game();
});

// game start on start button click
game_elements.reset_button.addEventListener(`click`, () => {
  reset_game();
});

// game duration countdown
function countdown() {
  time--;
  time_text.innerHTML = `Time: ${time}`;
  console.log(time);
  // if time is 0, stop timer to end game
  if (time <= 0) {
    end_game();
    lose();
  }
}

// ====================
// start game functions
// ====================

function start_game() {
  // game start audio
  play_main_theme();
  // game start functions
  enable_bombs();
  explode_color_fade();
  start_button.setAttribute(`disabled`, true);
  reset_button.setAttribute(`disabled`, true);
  pause_button.style.display = `flex`;
  start_button.innerHTML = ``;
  three_dot_repeat = setInterval(three_dot_animation, 600);
  bomb_disable_repeat = setInterval(random_disabled_bomb, 150);
  bomb_enable_repeat = setInterval(random_enabled_bomb, 150);
  // game start countdown
  countdown_timer = setInterval(countdown, 1000);

  // bomb explode color fade on game start
  function explode_color_fade() {
    game_elements.bombs.forEach((bombs) => {
      bombs.style.transition = `background-color 30s ease`;
      bombs.style.backgroundColor = `#ff1919`;
    });
    console.log(`Bomb Color Fade initiated`);
  }
  console.log(`Game Started`);
}

// ====================
// pause/resume game state functions
// ====================

// pause game function
function pause_game() {
  play_game_pause_sound();
  disable_bombs();
  clearInterval(countdown_timer);
  clearInterval(bomb_disable_repeat);
  clearInterval(bomb_enable_repeat);
  time_text.innerHTML = `Paused`;
  game_elements.pause_button_icon.setAttribute("aria-label", "Game Paused");
  clearInterval(three_dot_repeat);
  game_elements.pause_button_icon.innerHTML = `play_arrow`;
  pause_main_theme();
  countdown_timer_paused = true;
  console.log(`Game Paused`);
}

function resume_game() {
  play_game_resume_sound();
  enable_bombs();
  countdown_timer = setInterval(countdown, 1000);
  bomb_disable_repeat = setInterval(random_disabled_bomb, 150);
  bomb_enable_repeat = setInterval(random_enabled_bomb, 150);
  time_text.innerHTML = `Time: ${time}`;
  game_elements.pause_button_icon.setAttribute("aria-label", "Game Resumed");
  three_dot_repeat = setInterval(three_dot_animation, 600);
  game_elements.pause_button_icon.innerHTML = `pause`;
  play_main_theme();
  countdown_timer_paused = false;
  console.log(`Game Resumed`);
}

game_elements.pause_button.addEventListener(`click`, () => {
  if (!countdown_timer_paused) {
    pause_game();
  } else if (countdown_timer_paused) {
    resume_game();
  }
});

// ====================
// game end functions
// ====================

function end_game() {
  // game end audio
  stop_main_theme();
  // game end functions
  pause_button.style.display = `none`;
  start_button.innerHTML = `Game Over`;
  // stop three dot animation
  clearInterval(three_dot_repeat);
  // reset_button.style.display = `block`;
  // disable bombs on game end
  disable_bombs();
  // game end intervals for bomb disable and enable and countdown timer
  clearInterval(countdown_timer);
  clearInterval(bomb_disable_repeat);
  clearInterval(bomb_enable_repeat);
  console.log(`Game Ended`);
}

function reset_game() {
  score = 0;
  time = 45;
  score_text.innerHTML = `Score: ${score}`;
  time_text.innerHTML = `Time: ${time}`;
  start_button.removeAttribute(`disabled`);
  pause_button.style.display = `none`;
  start_button.innerHTML = `Start Game`;
  game_elements.bombs.forEach((bombs) => {
    bombs.style.transition = `none`;
    bombs.style.backgroundColor = `#ffffff`;
  });
  console.log(`Game Reset`);
}

function lose() {
  // play explode sound
  play_explode_sound();
  // blur game window and sidebar
  game_elements.sidebar.style.filter = `blur(5px)`;
  game_elements.game_window.style.filter = `blur(5px)`;
  // change time text to lose message
  time_text.innerHTML = `You Lose. Try Again!`;
  // scale lose popup down
  lose_popup.style.scale = `0`;
  // scale lose popup back up after 400ms
  setTimeout(() => {
    lose_popup.style.scale = `1.1`;
  }, 400);
  setTimeout(() => {
    lose_popup.style.scale = `1`;
  }, 900);
  // display lose popup
  lose_popup.style.display = `flex`;
  console.log(`Activate lose state`);
}

function win() {
  // play win jingle sound
  play_win_jingle();
  // cycle bomb color to green in left to right sequence
  cycle_bomb_color();
  // blur game window and sidebar
  game_elements.sidebar.style.filter = `blur(5px)`;
  game_elements.game_window.style.filter = `blur(5px)`;
  // change time text to win message
  time_text.innerHTML = `You Win!`;
  // scale win popup down
  win_popup.style.scale = `0`;
  // scale win popup back up after 400ms
  setTimeout(() => {
    win_popup.style.scale = `1.1`;
  }, 400);
  setTimeout(() => {
    win_popup.style.scale = `1`;
  }, 900);
  // display win popup
  win_popup.style.display = `flex`;
  console.log(`Activate win state`);
}

// win and lose popup button event listeners
lose_popup_button.addEventListener(`click`, () => {
  // remove blur on game window and sidebar
  game_elements.sidebar.style.filter = `blur(0px)`;
  game_elements.game_window.style.filter = `blur(0px)`;
  lose_popup.style.display = `none`;
  reset_button.removeAttribute(`disabled`);
});

win_popup_button.addEventListener(`click`, () => {
  // remove blur on game window and sidebar
  game_elements.sidebar.style.filter = `blur(0px)`;
  game_elements.game_window.style.filter = `blur(0px)`;
  win_popup.style.display = `none`;
  reset_button.removeAttribute(`disabled`);
});

// jQuery code to make popups draggable on mouse drag
$(function () {
  $(".draggable").draggable();
});

// remove transition when mouse is down on win popup
game_elements.lose_popup.addEventListener(`mousedown`, () => {
  game_elements.lose_popup.style.transition = `none`;
  game_elements.lose_popup.style.cursor = `grabbing`;
});

// remove transition when mouse is down on lose popup
game_elements.win_popup.addEventListener(`mousedown`, () => {
  game_elements.win_popup.style.transition = `none`;
  game_elements.win_popup.style.cursor = `grabbing`;
});

// add transition when mouse is up on win popup
game_elements.win_popup.addEventListener(`mouseup`, () => {
  game_elements.win_popup.style.transition = ` 0.4s`;
  game_elements.win_popup.style.cursor = `grab`;
});

// add transition when mouse is up on lose popup
game_elements.lose_popup.addEventListener(`mouseup`, () => {
  game_elements.lose_popup.style.transition = ` 0.4s`;
  game_elements.lose_popup.style.cursor = `grab`;
});
