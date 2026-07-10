let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"


let btn = document.querySelector("#btn");
btn.addEventListener("click" , async () =>{
    let input = document.querySelector("input").value.trim();
    if (input === "") {
        document.querySelector("#para").innerText = "Please enter a word.";
        return;
    }
    if (input.includes(" ")) {
    document.querySelector("#para").innerText = "Please enter only one word.";
    return;
}
    let result = await get(input);
     if (result) {
        show(result);
    } else {
        document.querySelector("#para").innerText = "Word not found!";
    }
});

function show(result){
    let p = document.querySelector("#para");
    p.innerText = "";
    let definitions = result[0].meanings[0].definitions;
     for (let i = 0; i < definitions.length; i++) {
        p.innerText += `${i + 1}. ${definitions[i].definition}\n\n`;
    }   
}

async function get(word){
    try {
        let data = await axios.get(url+ word);
        return data.data;
    } catch (e) {
        console.log(e);
         return null;
    }
};

// Enter with the help of keyboard
let input = document.querySelector("input");
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        btn.click();
    }
});