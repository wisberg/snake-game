import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');
let gameOver = false; 

function main(currentTime){
    if(gameOver) {
        confirm("You lose. Press enter to play again");
        window.location = '/';
        return; 
    }

    window.requestAnimationFrame(main);//ok browser, tell me when i can request that next frame
    const secondsSinceRender = (currentTime - lastRenderTime)/1000;
    
    if(secondsSinceRender < (1/SNAKE_SPEED)) return;
    
    lastRenderTime = currentTime;
    update();
    draw();
    checkDeath(); 
    
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
}

function draw(){
    gameBoard.innerHTML = ``;
    drawFood(gameBoard);
    drawSnake(gameBoard);

}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection(); 
}