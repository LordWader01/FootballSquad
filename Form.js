let inputs = document.querySelectorAll('input');
let selekt = document.querySelector('select');
let editt = document.getElementById('editt');
let save = document.getElementById('savee');
let players = document.querySelectorAll('.player');

//return boolen var if element is active or not
let isActive = function(element){
    return document.activeElement === element;
}

// alert(players.length);

//add id to any div with class=player
for (let counter = 0; counter < players.length; counter++) {
    players[counter].id = `player${counter}`;
}

//checks if object is iterable and the object is iterable if he has iterator() method
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }


//save choice of user when he clicks enter key
let saveChoice = function(elmts){
    if(isIterable(elmts)){    
        for (const inpt of elmts) {
            inpt.addEventListener('keypress', function (e) {
                    var key = e.which || e.keyCode;
                    if (key === 13) { // 13 is enter, check if user clicked enter 
                            if (isActive(inpt) && elmts.name != "userName") {
                                let inptVal = inpt.value;
                                inpt.style.display = "none";
                                inpt.parentElement.innerHTML = `<p>${inptVal}</p>`;
                            
                        }
                    }
            });
        }
    }
    else{
        elmts.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter, check if user clicked enter                  
                    if (isActive(elmts)) {
                        let inptVal = elmts.value;
                        elmts.style.display = "none";
                        elmts.parentElement.innerHTML = `<p>${inptVal}</p>`;
                    
                }
            }
        });
    }
};


let changeTac = function (...param) {
    let newPlayers = [];
    let leng = 0;

    param.forEach(el => {
        newPlayers[leng] = `player${el}`;
        leng+=1;
    });

    for (let indx = 0; indx < players.length; indx++) {
        if (newPlayers.indexOf(players[indx].id)!==-1) {
            players[indx].style.visibility = "hidden"
        }
    }         
}

// set disabled befor choice a tactic
document.addEventListener("DOMContentLoaded", function() {
    [].forEach.call(inputs, element => {
        element.disabled = true;
    });
});

//edit players
editt.addEventListener('click', function(){
    [].forEach.call(players, player =>{
        if(player.children[0].localName === "p"){
            let editWhat = player.children[0].innerText;
            let p = player.querySelector('p');                  
            player.removeChild(p);      //remove element        

            const eleInp = document.createElement("input");

            eleInp.type = "text";
            eleInp.name = "name";
            eleInp.id = "name";
            eleInp.value = "";
            eleInp.placeholder = editWhat;

            player.appendChild(eleInp);

            saveChoice(eleInp);
            // eleInp.addEventListener('keypress', function (e) {
            //     var key = e.which || e.keyCode;
            //     if (key === 13) { // 13 is enter, check if user clicked enter                  
            //             if (isActive(eleInp)) {
            //                 let inptVal = eleInp.value;
            //                 eleInp.style.display = "none";
            //                 eleInp.parentElement.innerHTML = `<p>${inptVal}</p>`;
                         
            //         }
            //     }
            // });
            // player.innerHTML = `<label for="name"></label>
            //                     <input type="text" name="name" id="name" value="" placeholder="${editWhat}" />`;
        }
    })

});

savee.addEventListener('click', function(){
    [].forEach.call(players, player =>{
        if(player.firstChild.nodeName === "#text"){
            let placeHold = player.querySelector('input').placeholder;
            let input = player.querySelector('input');                  
            player.removeChild(input);      //remove element        

            const eleInp = document.createElement("p");

            eleInp.innerText = placeHold;
            player.appendChild(eleInp);

            // player.innerHTML = `<label for="name"></label>
            //                     <input type="text" name="name" id="name" value="" placeholder="${editWhat}" />`;
        }
    })
});

//select changes tactic
selekt.addEventListener('change',function(){
    for (const playr of players) {
        playr.style.visibility = "visible";
    }
    //after choice a tactic switch off disabled
    [].forEach.call(inputs, element => {
        element.disabled = false;
    });

    switch (this.value) {
        case "442":
            changeTac(2, 5, 6, 7, 8, 9, 12, 15, 16, 17, 18, 19, 20, 22, 24);
            break;
        case "41212":
            changeTac(2, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 22, 24);
            break;
        case "433":
            changeTac(2, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 24);
            break;
        case "451":
            changeTac(2, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 23, 24);
            break;
        case "352":
            changeTac(0, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 22, 24);
        default:
            console.log('Nie wiem ile równa się numer');
    }
});

saveChoice(inputs);
