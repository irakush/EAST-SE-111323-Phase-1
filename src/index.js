const restaurantMenu = document.getElementById('restaurant-menu')
const likesSpanElement = document.getElementById('likes')
let displayedFoodId
let foodArrayCopy = {}

fetch('http://localhost:3000/foods')
.then(response => response.json())
.then(foods => {
    foodArrayCopy = foods
    displayFoodDetails(foods[0])

    foodArrayCopy.forEach(food => {
        addFoodImageToRestaurantMenu(food)
    })
})

function addFoodImageToRestaurantMenu(food){
    const imgElement = document.createElement('img')
    imgElement.src = food.image
    imgElement.addEventListener('click', () => {
        displayFoodDetails(food)
    })
    restaurantMenu.appendChild(imgElement)
}

function displayFoodDetails(food){
    console.log(food)
    const foodDetailImageElement = document.getElementsByClassName('detail-image')[0]
    foodDetailImageElement.src = food.image
    const foodNameElement = document.getElementsByClassName('name')[0]
    foodNameElement.textContent = food.name
    const foodDescriptionDisplayElement = document.getElementById('description-display')
    foodDescriptionDisplayElement.textContent = food.description

    // const likesSpanElement = document.getElementById('likes')
    likesSpanElement.textContent = food.likes
    displayedFoodId = food.id
}

function addLike() {

}

const newFoodForm = document.getElementById('new-food')
newFoodForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newNameInputElement = document.getElementById('new-name')
    const newImageInputElement = document.getElementById('new-image')
    const newDescriptionInputElement = document.getElementById('new-description')

    const newFood = {
        name: newNameInputElement.value,
        image: newImageInputElement.value,
        description: newDescriptionInputElement.value
    }

    fetch('http://localhost:3000/foods', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFood)
    })
    .then(response => {
        if(response.ok === true){
            response.json().then(newFoodData => {
                addFoodImageToRestaurantMenu(newFoodData)
            })
        }
        else{
            alert("Error: Unable to add new food!")
        }
    })

    newFoodForm.reset()
})

const likesButtonElement = document.getElementById('likes-button')
likesButtonElement.addEventListener('click', () => {

    const likesSpanElement = document.getElementById('likes')
    likesSpanElement.textContent = Number(likesSpanElement.textContent) + 1

    console.log('id :', displayedFoodId)

    fetch(`http://localhost:3000/foods/${displayedFoodId}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            likes: Number.parseInt(likesSpanElement.textContent) + 1
        })
    })
    .then(res => res.json())
    .then(updatedFood => {
        likesSpanElement.textContent = updatedFood.likes

        foodArrayCopy = foodArrayCopy.map( food => {
            if (food.id === updatedFood.id) {
                return updatedFood
            } else {
                return food
            }
        })

        
    })
})