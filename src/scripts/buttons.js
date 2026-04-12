

const chosen_chars = "0123456789!_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


const dotChar = '.';
const dotChance = 0.15;
const normal_fps = 18;

function randomChar(){
    return Math.random() < dotChance ? dotChar : chosen_chars[Math.floor(Math.random() * chosen_chars.length)];
}

function randomChars(len){
    let txt = "";
    for(let i = 0; i < len; i++){
        txt += randomChar();
    }
    return txt;
}

function scrambleAnim(original, final, text, fps){
    if(text.__timer){
        clearInterval(text.__timer);
        text.__timer = null;
    }
    let progress = 0;
    text.__timer = setInterval(()=> {
    
    const speed = 0.045;
    const len = Math.max(original.length, final.length);
    
    let out = "";

    progress += len * speed;

    for (let i = 0; i < len; i++) {
        const target = final[i] ?? "";
        const originalChar = original[i] ?? "";
        if(i < progress){
            out += target;
        }else{
            if(target === " " || originalChar === " ") out += " ";
            else out += randomChar();
        }
    }
    text.textContent = out;
    if(progress >= len){
        text.textContent = final;
        clearInterval(text.__timer)
        text.__timer = null;
    }
}, 1000 / fps);
   

}




function addScrambledButton(id, text){
    const btn = document.getElementById(id);
    btn.textContent = randomChars(text.length);

    btn.addEventListener("mouseenter", (e) => {scrambleAnim(btn.textContent, text, btn, normal_fps)});
    btn.addEventListener("mouseleave", (e) => {scrambleAnim(btn.textContent, randomChars(text.length), btn, normal_fps)});
}


