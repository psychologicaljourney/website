

const out_area = document.getElementById('output');

const zero = "🍏";
const one = "🍎";

function convert(){
    var in_area = document.getElementById('input');
    const input_text = in_area.value;
    if(input_text.includes(one) || input_text.includes(zero)){
        apple_to_binary(input_text);
    }else{
        text_to_binary(input_text);
    }
}

function apple_to_binary(txt){
    var result = "";
    var chars = [...txt];

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if(char == ' ' && i != chars.length){
            result += ' ';
            continue;
        }

         if(char.includes(zero)){
            result += "0";
        }else if(char.includes(one)){
            result += "1";
        }else{
            result += char;
        }
    }

    binary_to_text(result);
}

/**
 * @param {String} binary 
 */
function binary_to_text(binary){
    out_area.value = binary.split(' ').filter(String).map(b => String.fromCharCode(parseInt(b, 2))).join('');
}



function text_to_binary(txt){
    var result = txt.split('').map(c => c.charCodeAt(0).toString(2)).join(' ');
    binary_to_apple(result);
}

function binary_to_apple(binary){
    const chars = [...binary];
    var result = "";

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if(char.includes("1")){
            result += one;
        }else if(char.includes("0")){
            result += zero;
        }else{
            result += char;
        }
    
    }

    out_area.value = result;
}

document.getElementById('convert-btn').addEventListener("click", convert);

addScrambledButton('convert-btn', "Convert")