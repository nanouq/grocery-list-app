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
    const itemInputValue = itemInputEl.value.trim()
    const categorySelection = categorySelectEl.value
    const customCategoryInput = categoryInputEl.value.trim()

    //check if item name and category are filled out
    if(itemInputValue && categorySelection){
        //check if custom category is selected
        if (categorySelection === 'createCustomCategory'){
            //check if custom category has a valid value/not null
            if (customCategoryInput){
                //check if custom category already exists
                if(!customCategories.includes(customCategoryInput)){
                    addCategoryToList(customCategoryInput)
                    addBubbleToList(itemInputValue, customCategoryInput)
                    resetForm()
                }
                else{
                    alert("This category already exists!")
                }
            }
            else{
                alert("Please enter item name and category!")
            }
        } //check if item name and category combo already exists
        else if(!bubbles.find(bubble => bubble.name.toLowerCase() === itemInputValue.toLowerCase()
        && bubble.category.toLowerCase() === categorySelection.toLowerCase())){
            addBubbleToList(itemInputValue, categorySelection)
            resetForm()
        }
        else {
            alert("This bubble already exists!")
        }
    }
    else {
        alert("Please enter item name and select a category!")
    }
}

function addCategoryToList(categoryName) {
    alert("add category function called")
    const newCategory = document.createElement('option')
    newCategory.value = categoryName
    newCategory.textContent = categoryName
    categorySelectEl.appendChild(newCategory)
}

function addBubbleToList(name, category) {
    const newBubbleObj = { name: name, category: category}
    bubbles.push(newBubbleObj)
    renderBubbles()
}

function resetForm() {
    itemInputEl.value = ""
    categorySelectEl.value = ""
    categoryInputEl.value = ""
    categoryInputEl.style.display = 'none'
}

// function renderCategories() {

// }

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
