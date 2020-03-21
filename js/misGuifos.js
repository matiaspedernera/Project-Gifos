//SUBMENU


window.onload = init;
function init(){
    document.querySelector(".btnmenu").addEventListener("mousedown",submenu);
    document.querySelector(".tema").addEventListener("mousedown",submenu);
    document.querySelector(".liContainer").style.display = "none"; 
}

function submenu(){
    var estado = document.querySelector(".liContainer").style.display;
    if (estado == "none"){
        document.querySelector(".liContainer").style.display = "block";
    }else{
        document.querySelector(".liContainer").style.display = "none";            
    };
    
}

//CAMBIAR TEMA

document.addEventListener("DOMContentLoaded",() =>{
    
    document.querySelector("#arrow").addEventListener("mousedown",()=>{
        location.replace("./index.html")
    })

    document.querySelector("#dark").addEventListener("mousedown",() =>{
        init() //inicializador
        console.log("funca")
        const link = document.querySelector("#style")
        link.removeAttribute("href") //PROBAR LINK.SRC = 
        link.setAttribute("href", "./styles/stylesDark.css")
        console.log(link.getAttribute("href"))
        //Agregar logo
        const logo = document.querySelector(".logoDark")
        logo.setAttribute("style","display: block;")
        const logoLight = document.querySelector(".logoLight")
        logoLight.setAttribute("style", "display: none;")
    })

    document.querySelector("#light").addEventListener("mousedown",() =>{
        init() //para que se inicialice cuando hago click
        console.log("funca")
        const link = document.querySelector("#style")
        link.removeAttribute("href")
        link.setAttribute("href", "./styles/styles.css")
        console.log(link.getAttribute("href"))
        //agregar logo
        const logo = document.querySelector(".logoLight")
        logo.setAttribute("style","display: block;")
        const logoDark = document.querySelector(".logoDark")
        logoDark.setAttribute("style", "display: none;")
    })
})

const localStorageGetGifs = () => {
    let gifsId = localStorage.getItem('gifsId')
    console.log(JSON.parse(gifsId))
    return JSON.parse(gifsId)
}

document.addEventListener("DOMContentLoaded", () =>{
    document.querySelector("#pMisGuifos").style.display = "block"
    urlId = 'https://api.giphy.com/v1/gifs/'
    let idsFromLs = localStorageGetGifs()
    if (Array.isArray(idsFromLs)) {
        
        let container = document.querySelector(".myGifsContainer")
        for (const id of idsFromLs) {
            fetch(`${urlId}${id}?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC`)
            .then(res => res.json())
            .then(content =>{
                let gifContainer = document.createElement("div")
                    gifContainer.classList.add("myGifs")
                    gifContainer.style.backgroundImage = `url("${content.data.images.fixed_height.url}")`
                    container.appendChild(gifContainer)
            })
        }
    }
    else{
        alert("No tienes Guifos propios. Ve a CREAR GUIFOS para comenzar a crear!")
    }
    })    
