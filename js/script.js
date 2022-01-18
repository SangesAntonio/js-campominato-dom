console.log('js ok')
/*L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle*/



// eleemnti  del DOM

const button=document.getElementById('bottone');
const difficulty=document.getElementById('difficult');
const grid=document.getElementById('grid-container');

const play = () =>{
    //cambio testo nel bottone
    button.innerText= 'Riprova';

    //elimino scritta pre-partita e aggiungo bordo
    grid.innerText = ' ';
    grid.classList.add('grid');
     
    //preparo le varie difficoltà
    const TOTAL_BOMBS= 16;
    let attempts = 0;

    let totalCells;
    let cellsPerRow;

    switch(difficulty.value){
        case '1':
            totalCells = 100;
            break;
        case '3':
            totalCells = 49;
            break;
        default:
            totalCells = 81;
            break;
    }

    cellsPerRow = Math.sqrt(totalCells);
    console.log(cellsPerRow);

    const maxAttempts = totalCells - TOTAL_BOMBS;

    
    //funzioni
    function getRandomNumber( min, max){
        return Math.floor(Math.random()  * (max - min +1) + min) ;
    }
    const generateCell = (numbers, cellsPerRow) =>{
        const cell=document.createElement('div');
        cell.className='cell';
        cell.id=numbers;
        cell.innerText= numbers
        const lenghtCell=`calc(100% / ${cellsPerRow})` ;
        cell.style.width=lenghtCell;
        cell.style.height=lenghtCell;
        return cell;
    }

    //vinto o perso
    const gameOver = (bombs, point, isVictory) =>{

    }
    //al click faccio cose
    const clickOnCell =(cell, bombs,number) =>{
        //impedisce altri click
        cell.removeEventListener('click', clickOnCell);

       
        //controllo se è una bomba
        if(bombs.includes(number)){
            cell.classList.add('bomb');
            //!hai perso. da fare
            gameOver (bombs, attempts, false)
        }else{
            cell.classList.add('safe');
            attempts++;
        }
        
        //verifico se ho vinto
        if(attempts === maxAttempts){
            //!hai vinto. da fare
            gameOver (bombs, attempts, false)
        }
    }

    //creo bombe
    const generateBomb=(totalBombs, totalNumber) => {
        const bombs=[];
        while(bombs.length < totalBombs){
            const bombsNumber=getRandomNumber(1,totalNumber);
            if(!bombs.includes(bombsNumber)) bombs.push(bombsNumber);
        }
        return bombs;
    }
    
    
    //!logiche di gioco
    //creo le bombe
    const bombs=generateBomb(TOTAL_BOMBS, totalCells);
    console.log(bombs)
    //creo le celle
    for(let i=1; i <= totalCells; i++){
        const cell = generateCell(i,cellsPerRow);
        cell.addEventListener('click', (event) => clickOnCell(event.target, bombs,i))

        grid.appendChild(cell)
    }
    
}


button.addEventListener('click', function (){
    play ();
})


























