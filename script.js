
//Here we need to access all buttons and reset button
let boxes = document.querySelectorAll(".box");//To access all buttons through it's class name
let resetbtn = document.querySelector("#reset-btn");//To access reset button through it's id
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO 
// if turnO true then come O otherwise X

let count=0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    count =0 ;
    enableBoxes();
    msgContainer.classList.add("hide");//hiding the msg container again at the time of reseting the game
}

boxes.forEach((box) =>{

    box.addEventListener("click",() =>{
        // console.log("box was clicked");
        if(turnO)
        {
            box.innerText="O";
            box.style.color="Yellow";
            turnO = false;
        }
        else{
            box.innerText="X";
            box.style.color="red";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let iswinner=checkWinner();

        if(count===9 && !iswinner)
        gameDraw();
    });
});

const gameDraw=()=>{

    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () =>{
/*After getting the 1st winner, it'll disabled rest of the unused 
boxes(button) so that no more winner occur or no more button can be used 
before reseting to New Game */
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    /*When a new game start,then all boxes will be enabled, 
    box.disabled=false means all boxes will be enabled */
        for(let box of boxes){
            box.disabled = false;
            box.innerText="";//at the starting ,reseting all the boxes by removing their text(X/O)
        }
    }

const showWinner = (winner) =>
{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");/*because at first it'll be hidde,
    to print the msg, we must remove the hideness*/
    disableBoxes();//calling the disable button function
}

const checkWinner = () =>{//it's a winner checking function 

    for(let i of winPatterns)
    {
        /*
        // console.log(pattern);//printing pattern array
        console.log(i[0],i[1],i[2]);//printing win pattern array each index
        console.log(
            boxes[i[0]].innerText,//printing the innerText of each button box
            boxes[i[1]].innerText,
            boxes[i[2]].innerText
        );*/
        let pos1Val=boxes[i[0]].innerText;//indicating each button box as position
        let pos2Val=boxes[i[1]].innerText;
        let pos3Val=boxes[i[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val != ""){
            
            if(pos1Val===pos2Val && pos2Val === pos3Val)
            {
                //  console.log("Winner!",pos1Val);
                 showWinner(pos1Val);
            }
           
            // else 
            // console.log("Looser!");
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);





