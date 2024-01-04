
let id=new URLSearchParams(window.location.search).get("id")
let card = document.querySelector(".itm0")
function getCard(){
    fetch(`http://localhost:3000/all/${id}`)
    .then(res=>res.json())
    .then(data=>{
        card.innerHTML=`  <div class="item">
        <div class="img"><img src="${data.img}" alt=""></div>
        <div class="info">
         
            
            <p class="name">${data.name}</p>
            <h4>${data.head}</h4>
            <p class="info1">${data.info}</p>
          
        </div>
    </div>`
      
    })
    .catch(error => console.error('Error:', error));

}
getCard()