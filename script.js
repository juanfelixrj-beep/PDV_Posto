import { Product } from "./product.js"

const add_product = document.querySelector("#add")
const check = document.querySelector("#check")
const itens = document.querySelector(".itens")
const nameInput = document.querySelector("#product")
const priceInput = document.querySelector("#price")
const qntInput = document.querySelector("#qnt")

const popup_overlay = document.querySelector(".popup-overlay")
const cancel = document.querySelector("#cancel")
const total = document.querySelector("#totalValue")
const confirm = document.querySelector("#confirm")

let products = []

renderProducts()

add_product.addEventListener("click", ()=>{
    if(nameInput.value == "" || priceInput.value == "" || qntInput.value == ""){
        alert("Preencha todos os campos")
        return
    }

    products.push(new Product(
        nameInput.value,
        parseFloat(priceInput.value),
        parseInt(qntInput.value)
    ))

    alert("Produto salvo com sucesso")
    localStorage.setItem("key", JSON.stringify(products))
    renderProducts()
})

confirm.addEventListener("click", ()=>{
    alert("Pagamento concluido com sucesso!")
    products = []
    localStorage.setItem("key", JSON.stringify(products))
    renderProducts()
    popup_overlay.style.display = "none"
})

check.addEventListener("click", ()=>{
    if(products.length == 0){
        alert("Adicione produtos ao carrinho")
        return
    }
    let totalValue = 0

    products.forEach((t)=>{
        totalValue += t.price * t.qnt
    })

    total.textContent = `R$${totalValue.toFixed(2)}`
    popup_overlay.style.display = "flex"
})



cancel.addEventListener("click", ()=>{
    popup_overlay.style.display = "none"
})

function renderProducts() {
    itens.innerHTML = ""

    const raw = localStorage.getItem("key")
    products = raw ? JSON.parse(raw) : []
    products.map(o => new Product(o.name, o.price, o.qnt))

    products.forEach((element)=>{
        const header = document.createElement("div")
        header.classList.add("item-header")
    
        const fieldset = document.createElement("fieldset")
        fieldset.classList.add("appear")

        const h3 = document.createElement("h3")
        h3.textContent = `${element.name.toUpperCase()} x ${element.qnt}`

        const totalValue = element.price * element.qnt
        const p = document.createElement("p")
        p.textContent = `R$${totalValue.toFixed(2)}`

        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>'
        deleteBtn.addEventListener("click", ()=>{
            products.splice(element._index, 1)
            localStorage.setItem("key", JSON.stringify(products))
            renderProducts()
        })

        header.appendChild(h3)
        header.appendChild(deleteBtn)

        fieldset.appendChild(header)
        fieldset.appendChild(p)

        itens.append(fieldset)
    })
}