let inputs = document.querySelectorAll('input');
let isActive = function(element){
    return document.activeElement === element;
}

inputs.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter, check if user clicked enter
        // code for enter
            for (const inpt of this) {
                if (isActive(inpt)) {
                    let inptVal = inpt.value;
                    inpt.style.display = "none";
                    inpt.parentElement.innerHTML = inptVal;
                }
            }
        }
});
