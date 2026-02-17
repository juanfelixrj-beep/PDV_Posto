import { Product } from "./product.js"

const add_product = document.querySelector("#add")
const check = document.querySelector("#check")
const itens = document.querySelector(".itens")
const nameInput = document.querySelector("#product")
const priceLbl = document.querySelector("#price")
const qntInput = document.querySelector("#qnt")
const totalTexto = document.querySelector("#totalTexto")
const popup_overlay = document.querySelector(".popup-overlay")
const cancel = document.querySelector("#cancel")
const total = document.querySelector("#totalValue")
const confirm = document.querySelector("#confirm")

let products = []
let price = 0

renderProducts()


let totalValue = 0

products.forEach((t) => {
    totalValue += t.price * t.qnt
})

totalTexto.textContent = `Total: R$${totalValue.toFixed(2)}`


const fuel = nameInput.value
if (fuel == "Gasolina Aditivada") {
    price = 6.68
    priceLbl.textContent = `R$${price.toFixed(2)}/L`
}

add_product.addEventListener("click", () => {
    if (nameInput.value == "" || qntInput.value == "") {
        alert("Preencha todos os campos")
        return
    }

    products.push(new Product(
        nameInput.value,
        parseFloat(price),
        parseInt(qntInput.value)
    ))

    alert("Produto salvo com sucesso")
    localStorage.setItem("key", JSON.stringify(products))
    renderProducts()

    let totalValue = 0

    products.forEach((t) => {
        totalValue += t.price * t.qnt
    })

    totalTexto.textContent = `Total: R$${totalValue.toFixed(2)}`
})

nameInput.addEventListener("input", () => {
    const fuel = nameInput.value
    if (fuel == "Gasolina Aditivada") {
        price = 6.68
        priceLbl.textContent = `R$${price.toFixed(2)}/L`
    } else if (fuel == "Gasolina Comum") {
        price = 6.54
        priceLbl.textContent = `R$${price.toFixed(2)}/L`
    } else if (fuel == "Etanol") {
        price = 4.85
        priceLbl.textContent = `R$${price.toFixed(2)}/L`
    } else if (fuel == "Diesel") {
        price = 5.87
        priceLbl.textContent = `R$${price.toFixed(2)}/L`
    } else if (fuel == "DieselS10") {
        price = 5.93
        priceLbl.textContent = `R$${price.toFixed(2)}/L`
    } else if (fuel == "GNV") {
        price = 4.61
        priceLbl.textContent = `R$${price.toFixed(2)}/m³`
    }
})

confirm.addEventListener("click", () => {
    alert("Pagamento concluido com sucesso!")
    products = []
    localStorage.setItem("key", JSON.stringify(products))
    renderProducts()
    popup_overlay.style.display = "none"
})

check.addEventListener("click", () => {
    if (products.length == 0) {
        alert("Adicione produtos ao carrinho")
        return
    }
    let totalValue = 0

    products.forEach((t) => {
        totalValue += t.price * t.qnt
    })

    total.textContent = `R$${totalValue.toFixed(2)}`
    popup_overlay.style.display = "flex"
})



cancel.addEventListener("click", () => {
    popup_overlay.style.display = "none"
})

function renderProducts() {
    itens.innerHTML = ""

    const raw = localStorage.getItem("key")
    products = raw ? JSON.parse(raw) : []
    products.map(o => new Product(o.name, o.price, o.qnt))

    products.forEach((element) => {
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
        deleteBtn.addEventListener("click", () => {
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
    let totalValue = 0

    products.forEach((t) => {
        totalValue += t.price * t.qnt
    })

    totalTexto.textContent = `Total: R$${totalValue.toFixed(2)}`
}