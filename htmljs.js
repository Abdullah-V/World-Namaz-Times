var electron = require("electron")
var { ipcRenderer } = electron





// Start
 window.addEventListener("load",() => {
    appdiv = document.querySelector("#genel")
    nav = document.createElement("div")
    nav.classList.add("nav")
    appdiv.appendChild(nav)
    // homebtn = document.createElement("button")
    // homebtn.classList.add("homebtn")
    // homebtn.innerText = "X"
    // nav.appendChild(homebtn)
    allCountrys = document.createElement("div")
    allCountrys.classList.add("allCountrys")
    appdiv.appendChild(allCountrys)
    searchbox = document.createElement("input") 
    searchbox.setAttribute("placeholder","Search...")
    appdiv.appendChild(searchbox)



// Class



var applist = []

    class myapp{
        constructor(apiData){
            applist.push(this)
            this.apiData = apiData
            this.country = document.createElement("div")
            this.country.classList.add("country")
            allCountrys.appendChild(this.country)
            this.p = document.createElement("p")
            this.p.classList.add("cName")
            this.p.innerText = this.apiData["UlkeAdiEn"]
            this.country.appendChild(this.p)
            this.detailBtn = document.createElement("button")
            this.detailBtn.classList.add("detail")
            this.detailBtn.innerText = "Detail"
            this.t = "islemirrr"
            this.detailBtn.addEventListener("click",this.func.bind(null,this.apiData))
            this.country.appendChild(this.detailBtn)
        }


        // Send Data to Backend

        func(t){
            console.log(t["UlkeID"]);
            ipcRenderer.send("UlkeID",t)
        }
    }






// Get Api Data



var request = new XMLHttpRequest()
request.open("GET","https://ezanvakti.herokuapp.com/ulkeler",true)

request.onload = function () {
var data = JSON.parse(this.response)
for(var i = 0;i<data.length;i++){
    var myapp1 = new myapp(data[i])
}

searchbox.addEventListener("keyup",() => {
    console.log("isleyir");
    var inpvalue = searchbox.value
    for(var i = 0;i<applist.length;i++){
        var ara = applist[i].apiData["UlkeAdiEn"]
        inpvalue = inpvalue.toLowerCase()
        ara = ara.toLowerCase()
        if(ara.includes(inpvalue,0)){
            applist[i].country.style.display = "block"
        }
        else{
            applist[i].country.style.display = "none"
        }
    }

})


}

request.send()




})
