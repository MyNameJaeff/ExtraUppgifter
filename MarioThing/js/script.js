const moveMario = () => {
    let id = null;
    let div = document.getElementById("container");
    let mario = document.getElementById("mario");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame(){
        if(pos == ((div.offsetWidth - mario.offsetWidth)/2)){
            console.log("Hello");
            clearInterval(id);
        }else{
            console.log("Hello");
            pos++;
            mario.style.top = pos + 'px';
            mario.style.left = pos + 'px';
        }
    }
}