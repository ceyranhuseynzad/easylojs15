let l=document.querySelector(".l")
let m=document.querySelector(".bi")
m.addEventListener("click",()=>{
    l.classList.toggle("show")
})
let nav = document.querySelector("nav")

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        nav.style.backgroundColor = "green"
    } else{
        nav.style.backgroundColor = "transparent"
    }
})
const tp=document.querySelector(".tp")
window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
        tp.classList.add("active")
    }else{
        tp.classList.remove("active")
    }
})
let card=document.querySelector(".itm0")
let page=1
function getAll(){
    fetch(`http://localhost:3000/all?_page=${page}&_limit=4`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        fetch(`http://localhost:3000/favorite`)
        .then(res=>res.json())
        .then(favs=>{
            data.forEach(element => {
                if(favs.find(f=>f.id===element.id)){
                    card.innerHTML+=`  <div class="item">
                    <div class="img"><img src="${element.img}" alt=""></div>
                    <div class="info">
                        <p class="favorite"><i class="bi bi-heart-fill" onclick="removeFavorite(${element.id})"></i>
                        </p>
                        <p class="name">${element.name}</p>
                        <h4>${element.head}</h4>
                        <p class="info1">${element.info}</p>
                        <button onclick="deleteCart(${element.id})">Delete</button>
                        <a href="add.html?id=${element.id}"><button>Update</button></a>
                        <a href="details.html?id=${element.id}"><button>View Details</button></a>
                    </div>
                </div>`
                }else{
                    card.innerHTML+=`  <div class="item">
                    <div class="img"><img src="${element.img}" alt=""></div>
                    <div class="info">
                        <p class="favorite"><i class="bi bi-heart" onclick="addFavorite(${element.id})"></i>
                        </p>
                        <p class="name">${element.name}</p>
                        <h4>${element.head}</h4>
                        <p class="info1">${element.info}</p>
                        <button onclick="deleteCart(${element.id})">Delete</button>
                        <a href="add.html?id=${element.id}"><button>Update</button></a>
                        <a href="details.html?id=${element.id}"><button>View Details</button></a>
                    </div>
                </div>`
                }
            });
        })
    })
}
let loadMore=document.querySelector(".loadmore")
loadMore.addEventListener("click",()=>{
    page++
    getAll()
    fetch("http://localhost:3000/all")
    .then(res=>res.json())
    .then(data=>{
        if (page * 4 >=data.length) {
            loadMore.style.display = "none";
        }
    })
})

function addFavorite(id){
    fetch(`http://localhost:3000/all/${id}`)
    .then(res=>res.json())
    .then(data=>{
        return fetch(`http://localhost:3000/favorite`,{
            method: "POST",
            headers: {
                "Content-Type": "data/json",
            },
            body: JSON.stringify(data)
        })
    })
    .then(res=>{
        if(res.status===500){
            throw new Error('ccccc')
        }
        return res.json()
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}
function removeFavorite(id){
    fetch(`http://localhost:3000/favorite/${id}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "data/json",
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
getAll()
function deleteCart(id){
    axios.delete(`http://localhost:3000/all/${id}`)
    window.location.reload()
}