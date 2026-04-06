const canvas = document.getElementById('bg-canvas');

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const chars = "0123456789!█▒░ABCDEF";
const font_size = 16;
const columns = canvas.width/font_size;
const hermesapi = 'https://hermesapi.netlify.app/.netlify/functions/main';

const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * 100);
}

function draw(){
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(0,0, canvas.width, canvas.height);

    context.fillStyle = '#4269b8';
    context.font = font_size + 'px PixelMPlus12';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        context.fillText(text, i*font_size, drops[i]*font_size);

        if(drops[i] * font_size > canvas.height && Math.random() > 0.975){
            drops[i] = 0;
        }
        
        drops[i] += 1;
    }

}

const id_starters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const num_id_len = 9;


function generateNumID(){
    let str = "";
    for (let i = 0; i < num_id_len; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
}

function getUserID(){
    let id = localStorage.getItem("userID");
    if(id && id.trim()) return id;
    id = id_starters.charAt(Math.floor(Math.random() * id_starters.length)) + generateNumID(); 
    localStorage.setItem("userID", id);
    return id;
}



async function getPrescript(){
    const date = new Date();
    const date_token = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`
    const id = getUserID();
    
    const last_date = localStorage.getItem("last_date");
    const last_prescript = localStorage.getItem("last_prescript");
    
    if(last_date && last_date.trim() && last_prescript && last_prescript.trim()){
        if(last_date == date_token){
            return last_prescript;
        }   
    }


    await fetch(hermesapi, {
        method: "POST",
        body: JSON.stringify({
            token: `${id}|${date_token}`
        }),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((prescript) =>{
        if(prescript.status != 200){
            console.error("Hermesapi Unreachable.");   
            return null; 
        }
        prescript.text().then((txt) => {
            localStorage.setItem("last_date", date_token);
            localStorage.setItem("last_prescript", txt);
            return txt;
        });
        
    }).catch((err) => {
        console.error(err);
    });

    return null;
}


async function showPrescript(){
    var prescript = await getPrescript();
    if(!prescript){
        document.getElementById("pre-title").textContent = "";
        document.getElementById('prescript-text').textContent = "";
    }

    document.getElementById('prescript-text').textContent = prescript;
}

setInterval(draw, 100);
showPrescript();