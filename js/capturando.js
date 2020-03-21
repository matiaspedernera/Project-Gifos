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




document.addEventListener("DOMContentLoaded",()=>{
    
    urlUpload ='https://upload.giphy.com/v1/gifs?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC'
    urlId = 'https://api.giphy.com/v1/gifs/'
    document.querySelector(".startButton").addEventListener("click",() =>{
        document.querySelector(".capturar").style.display = "none"
        document.querySelector(".capturando").style.display = "block"
        const video = document.querySelector(".myVideo")
        
        function getStreamAndRecord () {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    height: { max: 480 }
                }
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play()
                
            })
            .catch(err =>{
                console.log(err)
            })
        }
        getStreamAndRecord()
        
    })
    
    const localStorageSaving = (res) => {
        let gifId = res.data.id
        let gifsEnLS = JSON.parse(localStorage.getItem('gifsId')) || []
        let todosLosGifs = gifsEnLS.concat(gifId)
        localStorage.setItem('gifsId', JSON.stringify(todosLosGifs))
    }                   

    const localStorageGetGifs = () => {
        let gifsId = localStorage.getItem('gifsId')
        console.log(JSON.parse(gifsId))
        return JSON.parse(gifsId)
    }


    document.querySelector(".recordButton").addEventListener("click",() =>{
        let startButton = document.querySelector(".recordButton")
        let stopButton = document.querySelector(".stopButton")
        startButton.style.display = "none"
        stopButton.style.display = "block"
        let form = new FormData()
        const video = document.querySelector(".myVideo").srcObject
        let recorder = new RecordRTC(video, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started')
            },
        })
        recorder.startRecording()
        
        //LISTO
        document.querySelector(".stopButton").addEventListener("click",()=>{
            document.querySelector(".stopButton").style.display = "none"
            document.querySelector(".repeatRecord").style.display = "block"
            document.querySelector(".uploadGif").style.display = "block"
            
            recorder.stopRecording(function(){
                let blob = recorder.getBlob()
                blobUrl = URL.createObjectURL(blob)
                console.log(blobUrl)
                let gifContainer = document.querySelector(".myGif")
                gifContainer.src = blobUrl
                gifContainer.style.display = "block"
                let videoContainer = document.querySelector(".myVideo")
                videoContainer.pause()
                videoContainer.srcObject = null
                videoContainer.style.display = "none"  
            })              
        })
        //REPETIR
        document.querySelector(".repeatRecord").addEventListener("click",()=>{
            location.replace("./crearGifos.html")
    })
    //SUBIR GIF
        document.querySelector(".uploadGif").addEventListener("click",()=>{
            document.querySelector(".repeatRecord").style.display = "none"
            document.querySelector(".uploadGif").style.display = "none"
            document.querySelector(".myGif").style.display = "none"
            document.querySelector(".subiendoGifo").style.display = "block"
            let blob = recorder.getBlob()
            form.append('file',blob,'myGif.gif')
                fetch(urlUpload, {
                    method: 'POST',
                    mode: 'cors',
                    body: form
                  })
                  .then(res => res.json())
                  .then(content => {
                    const metaStatus = content.meta.status
                    const data = content.data
                    
                    let gifId = data.id
                    if (metaStatus == 200) {
                        document.querySelector("#pMisGuifos").style.display = "block"
                        }                         
                        document.querySelector(".subiendoGifo").style.display = "none"
                        
                        console.log("funca")
                        //GUARDAR GIF EN LOCAL STORAGE
                        localStorageSaving(content)
                        //APPEND GIF
                                            
                        //TRAER GIF GRABADO
                        fetch(`${urlId}${gifId}?api_key=QksuBlYKFsmpxeDx9DM6npUNNvtpVNtC`)
                            .then(res => res.json())
                            .then(content =>{
                                /* let gridGifContainer = document.createElement("div")
                                gridGifContainer.classList.add("myGifs")
                                gridGifContainer.style.backgroundImage = `url("${content.data.images.fixed_height.url}")`
                                document.querySelector(".myGifsContainer").appendChild(gridGifContainer)  */                           
                                let gifContainer = document.querySelector(".myGif")
                                gifContainer.src = content.data.images.fixed_height.url
                                gifContainer.style.display = "block"
                                document.querySelector(".copyLink").style.display = "block"
                                document.querySelector(".downloadGif").style.display = "block"
                                document.querySelector(".listo").style.display = "block"
                                let videoContainer = document.querySelector(".myVideo")
                                videoContainer.pause()
                                videoContainer.srcObject = null
                                videoContainer.style.display = "none"
                                const copyToClipboard = string => {
                                    const el = document.createElement('textarea');
                                    el.value = content.data.images.fixed_height.url;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(el);
                                };
                                document.querySelector(".copyLink").addEventListener("click",() =>{
                                    copyToClipboard()
                                    console.log("funca")
                                })
                            })
                            .catch(err =>{
                                console.log(err)
                            })
                    }) 
                })
                .catch(err =>{
                    console.error(err)
                })            
                document.querySelector(".downloadGif").addEventListener("click",() =>{
                    invokeSaveAsDialog(blob)
                })
                
            })
            document.querySelector(".listo").addEventListener("click",()=>{
                location.replace("./crearGifos.html")
            })
                                   
       
//TRAER GIFS LOCAL STORAGE
let idsFromLs = localStorageGetGifs()
if(Array.isArray(idsFromLs)){
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
})
