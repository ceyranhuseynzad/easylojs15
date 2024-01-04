
let id = new URLSearchParams(window.location.search).get("id");
let pImg = document.querySelector(".pimg");
let plas = document.querySelector(".plas");
const fInput = document.querySelector('input[type="file"]');
const nInput = document.querySelector('.n');
const iInput = document.querySelector('.i');
let update = document.querySelector(".update");

if (id) {
    fetch(`http://localhost:3000/all/${id}`)
        .then(res => res.json())
        .then(data => {
            pImg.src = data.img
            nInput.value = data.name
            iInput.value = data.info
        })
} else {
    pImg.src = ""
    nInput.value = ""
    iInput.value = ""
}
plas.addEventListener("click", () => {
    fInput.click()
    fInput.addEventListener("input", (e) => {
        let file = e.target.files[0]
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                pImg.src = reader.result
            }
        }
    })
})
update.addEventListener("click", (event) => {
    event.preventDefault()
    if (id) {
        axios.put(`http://localhost:3000/all/${id}`, {
            img: pImg.src,
            name: nInput.value,
            info: iInput.value
        })
            .then(res => {
                window.location = "index.html"
            })
    } else {
        axios.post(`http://localhost:3000/all`, {
            img: pImg.src,
            name: nInput.value,
            info: iInput.value
        })
            .then(res => {
                window.location = "index.html"
            })
    }
})