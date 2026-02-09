document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetbtn = document.querySelector("#reset-btn");
    const newgamebtn = document.querySelector("#newgame-btn");
    const winnerDisplay = document.querySelector(".w");

    let turn0 = true;
    const winn = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function checkWin() {
        for (let pattern of winn) {
            const [a,b,c] = pattern;
            if (
                boxes[a].innerText !== "" &&
                boxes[a].innerText === boxes[b].innerText &&
                boxes[a].innerText === boxes[c].innerText
            ) {
                winnerDisplay.innerText = boxes[a].innerText + " wins!";
                winnerDisplay.style.display = "block";
                return boxes[a].innerText;
            }
        }
        let draw = true;
        boxes.forEach(box => { if(box.innerText === "") draw = false });
        if(draw) {
            winnerDisplay.innerText = "It's a draw!";
            winnerDisplay.style.display = "block";
            return "Draw";
        }
        return null;
    }

    function disableBoxes() {
        boxes.forEach(box => box.disabled = true);
    }

    function resetGame() {
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        turn0 = true;
        winnerDisplay.style.display = "none";
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            box.disabled = true;
            let winner = checkWin();
            if(winner) disableBoxes();
        });
    });

    resetbtn.addEventListener("click", resetGame);
    newgamebtn.addEventListener("click", resetGame);
});
