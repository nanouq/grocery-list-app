// =========== ELEMENTS =============

const itemListEl = document.getElementById('item-list')
const itemInputEl = document.getElementById('item-name-input')
const categorySelectEl = document.getElementById('category')
const addBtnEl = document.getElementById('add-item-btn')
const startPromptEl = document.getElementById('start-prompt')
const infoModalEl = document.getElementById('info-modal')
const infoBtn = document.getElementById('information')
const closeModalBtn = document.getElementById('close-modal')
const categoryInputEl = document.getElementById('custom-category')

// =========== GLOBAL VARIABLES =============

let bubbles = []
let customCategories = []

// =========== EVENT HANDLERS =============

categorySelectEl.addEventListener('change', () => {
    if (categorySelectEl.value === 'createCustomCategory') {
        categoryInputEl.style.display = 'block'
    }
    else {
        categoryInputEl.value = ""
        categoryInputEl.style.display = 'none'
    }
})

addBtnEl.addEventListener('click', (e) => {
    e.preventDefault()
    addItemToList()
})

itemListEl.addEventListener('click', e => {
    if (e.target.tagName === "LI"){
        const bubble = e.target;
        const index = bubble.dataset.index

        const clickedBubble = bubble[index]

        bubble.style.animation = 'pop 0.3s forwards'

        bubble.addEventListener('animationend', () => {
            bubble.remove();

            bubbles.splice(index, 1)
        });
    }
})

infoBtn.addEventListener('click', () => {
    infoModalEl.style.display = 'block'
})

closeModalBtn.addEventListener('click', () => {
    infoModalEl.style.display = 'none'
})

// =========== UTILITY FUNCTIONS =============

function addItemToList() {
    //if item name is not empty

    //if item is not empty and a category is selected

    //==== CUSTOM CATEGORY TESTS ====
    //check if custom category is selected

    //check if custom category has a valid value/not null

    //check if custom category already exists

    //==== MAIN TESTS ====
    //check if item name is valid/not null

    //check if category is selected

    //check if item name and category combo already exists

    if(itemInputEl.value && categorySelectEl.value){
        if (categorySelectEl.value === 'createCustomCategory' && !categoryInputEl.value){
            alert("Please enter item name and select a category!")
        }
        else{
            const newBubbleObj = { name: itemInputEl.value, category: categorySelectEl.value}
            bubbles.push(newBubbleObj)
            renderBubbles()
            resetForm()
        }
    }
    else {
        alert("Please enter item name and select a category!")
    }

    //add category to category list
}

function addCategoryToList() {

}

function resetForm() {
    itemInputEl.value = ""
    categorySelectEl.value = ""
    categoryInputEl.value = ""
    categoryInputEl.style.display = 'none'
}

function renderBubbles() {
    itemListEl.innerHTML = ""

    if (bubbles.length > 0){
        startPromptEl.style.display = 'none';
    }
    else {
        startPromptEl.style.display = 'block';
    }

    bubbles.forEach((bubble, index) => {
        const newItemLi = document.createElement('li')
        newItemLi.textContent = bubble.name
        newItemLi.setAttribute('data-index', index)
        newItemLi.classList.add('bubble')
        itemListEl.appendChild(newItemLi)
    })
}

// =========== FIRST RENDER =============

renderBubbles()
