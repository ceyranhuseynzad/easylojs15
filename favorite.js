
let card=document.querySelector(".itm0")
function getAll(){
    fetch("http://localhost:3000/favorite")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            card.innerHTML+=`  <div class="item">
            <div class="img"><img src="${element.img}" alt=""></div>
            <div class="info">
        
           
                <p class="name">${element.name}</p>
                <h4>${element.head}</h4>
                <p class="info1">${element.info}</p>
                <button onclick="deleteCart(${element.id})">Delete</button>
     
            </div>
        </div>`
        });
    })
}
getAll()
function deleteCart(id){
    axios.delete(`http://localhost:3000/favorite/${id}`)
    window.location.reload()
}