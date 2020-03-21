
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
    document.querySelector(".crear").addEventListener("mousedown",() =>{
        location.replace("./crearGifos.html")
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

//SEARCH


document.addEventListener("DOMContentLoaded",() =>{
    //BUSQUEDAS RECOMENDADAS 
    document.querySelector("#TWD").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "The Walking Dead"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })        
    })
    document.querySelector("#RM").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "Rick and Morty"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })
    })

    document.querySelector("#BH").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "Bojack Horseman"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })
    })
    
    let button = document.querySelector("#searchButton")
    button.disabled = true
    button.classList.add("searchButtonInactive")
    document.querySelector("#search").addEventListener("keypress",() =>{
        button.disabled = false
        button.classList.remove("searchButtonInactive")
        button.classList.add("searchButtonActive")
        let dropdown = document.querySelector(".busquedasSugeridas")
        dropdown.style.visibility = "visible"
        
    })
    
    document.querySelector("#search").addEventListener("keyup",() =>{
        let value = document.querySelector("#search").value
        if(!value.trim()){
            let dropdown = document.querySelector(".busquedasSugeridas")
            dropdown.style.visibility = "hidden"
            button.disabled = true
    button.classList.add("searchButtonInactive")
        }
        
        
    })

    document.querySelector("#search").addEventListener("blur",() =>{
        let dropdown = document.querySelector(".busquedasSugeridas")
        dropdown.style.visibility = "hidden"
    })
    
    document.querySelector("#searchButton").addEventListener("click",() =>{
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        document.querySelector(".resContainer").innerHTML = ""
        let input = document.querySelector("#search").value
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${input}`
        if(!input.trim()) return
        
        let finalInput = input.replace(/ /g,"")
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${finalInput.trim()}&rating=g&limit=20&rating=g`
        
        fetch(urlSearch)
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })
    })

    document.querySelector("#search").addEventListener("keydown",(e) =>{
        if(e.keyCode = 13){
            document.querySelector(".tendencias").style.display = "none"
            document.querySelector(".resultados").style.display = "block"
            
            document.querySelector(".resContainer").innerHTML = ""
      
            let input = document.querySelector("#search").value
            let pResultados = document.querySelector("#pResultados")
            pResultados.innerHTML = `${input}`            
            if(!input.trim()) return
            
            let finalInput = input.replace(/ /g,"")
            let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${finalInput.trim()}&rating=g&limit=20&rating=g`
            
            fetch(urlSearch)
            .then(response => response.json())
            .then(content =>{
                let gifs = content.data
                let container = document.querySelector(".resContainer")
                for (const gif of gifs) {
                    let gifContainer = document.createElement("div")
                    gifContainer.classList.add("res")
                    gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                    container.appendChild(gifContainer)
                    
                }
            })            
        }
        else{
            return
        }
    })
})




//CARGAR GIFS RANDOM

document.addEventListener("DOMContentLoaded",() =>{
    let urlDog = "http://api.giphy.com/v1/gifs/random?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&tag=puppy&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa"
    let urlCat =  "http://api.giphy.com/v1/gifs/random?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&tag=cat&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa"
    let urlHedgehog =   "http://api.giphy.com/v1/gifs/random?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&tag=bunny&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa"
    let urlOtter = "http://api.giphy.com/v1/gifs/random?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&tag=turtle&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa"

    fetch(urlCat)
        .then(res => res.json())
        .then(content => {
            let catGif = document.getElementById("gifCat")
            catGif.src = content.data.images.original.url
        })
        .catch(err =>{
            console.error(err)
        })


fetch(urlDog)
        .then(res => res.json())
        .then(content => {
            let dogGif = document.getElementById("gifDog")
            dogGif.src = content.data.images.original.url
        })
        .catch(err =>{
            console.error(err)
        })


fetch(urlOtter)
        .then(res => res.json())
        .then(content => {
            let otterGif = document.getElementById("gifOtter")
            otterGif.src = content.data.images.original.url
        })
        .catch(err =>{
            console.error(err)
        })

fetch(urlHedgehog)
        .then(res => res.json())
        .then(content => {
            let hedgehogGif = document.getElementById("gifHedgehog")
            hedgehogGif.src = content.data.images.original.url
        })
        .catch(err =>{
            console.error(err)
        })

    document.querySelector("#verMasKitten").addEventListener("mousedown", () =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "kittens"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })        
    })     
    
    document.querySelector("#verMasPuppy").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "puppy"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })        
    })

    document.querySelector("#verMasBunny").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "bunny"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })        
    })

    document.querySelector("#verMasTurtle").addEventListener("mousedown",() =>{
        document.querySelector(".resContainer").innerHTML = ""        
        document.querySelector(".tendencias").style.display = "none"
        document.querySelector(".resultados").style.display = "block"
        let searchValue = "turtle"
        document.querySelector("#search").value = searchValue
        let pResultados = document.querySelector("#pResultados")
        pResultados.innerHTML = `${searchValue}`
        console.log(searchValue)
        let urlSearch = `http://api.giphy.com/v1/gifs/search?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&q=${searchValue}&rating=g&limit=20`
        fetch(urlSearch)        
        .then(response => response.json())
        .then(content =>{
            let gifs = content.data
            let container = document.querySelector(".resContainer")
            for (const gif of gifs) {
                let gifContainer = document.createElement("div")
                gifContainer.classList.add("res")
                gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
                container.appendChild(gifContainer)
                
            }
        })        
    })
})


//TRENDING

document.addEventListener("DOMContentLoaded",() =>{
    let urlTrend = "http://api.giphy.com/v1/gifs/trending?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC&limit=20&rating=g"
    fetch(urlTrend)
    .then(res => res.json())
    .then(content => {
        let gifs = content.data
        let container = document.querySelector(".trendContainer")
        for (const gif of gifs) {
            let gifContainer = document.createElement("div")
            gifContainer.classList.add("trend")
            gifContainer.style.backgroundImage = `url("${gif.images.fixed_height.url}")`
            container.appendChild(gifContainer)
        }
    })
    .catch(err =>{
        console.log(err)
    })
    
})

    
