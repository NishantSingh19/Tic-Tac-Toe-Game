const gridItem = document.querySelectorAll(".grid-item");
const newGameButton = document.querySelector(".newGame");
let para = document.querySelector(".para");
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];
let turn = true;

function playGame() {
    gridItem.forEach((grid) => {
        grid.addEventListener("click", () => {
            // console.log(grid.id);
               if (turn) {
                grid.innerHTML = "X";
                grid.style.color = "Red";
                grid.style.filter = "drop-shadow(2px 2px 4px)";
                grid.disabled = true;
            } else {
                grid.innerHTML = "O";
                grid.style.color = "Blue";
                grid.style.filter = "drop-shadow(2px 2px 4px)";
                grid.disabled = true;
            }
            turn = !turn;
            para.innerHTML = `Previous turn is : ' ${grid.innerHTML} '`;
            checkWinner();
            gameSound("game.mp3");
        });
    });
}
playGame();

newGameButton.addEventListener("click", () => {
    location.reload();
    clearBoard();
});

function checkWinner(){
    for (const winner of winPatterns) {
        // console.log(winner[0],winner[1],winner[2]);
                
        // console.log(gridItem[winner[0]].innerHTML,gridItem[winner[1]].innerHTML,gridItem[winner[2]].innerHTML);

        let position1 = gridItem[winner[0]].innerHTML;
        let position2 = gridItem[winner[1]].innerHTML;
        let position3 = gridItem[winner[2]].innerHTML;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                para.innerHTML = `🎉🎉 Congratulation 🥳, Player : '${position1}' Win`;
                winSound("win.m4a");
                para.style.color = "#4e4";
                disableButton();
            }
        }
    }
}

function disableButton(){
    for (const grid of gridItem) {
        grid.disabled = true;
    }
}

function winSound(audioName){
    let winAudio = new Audio(audioName);
    winAudio.play();
}
// winSound("win.m4a");

function gameSound(audioName){
    let winAudio = new Audio(audioName);
    winAudio.play();
}
// gameSound("game.mp3");

let n = 0;
gridItem.forEach((grid) => {
    grid.addEventListener("click", () => {
        n += 1;
        // console.log(n);
        if (n < 9) {
            checkWinner();
        } else if(n = 9){
            para.innerHTML = "Match Draw";
        }
    })
})