
// write your code here
// Deliverable 1
// const promiseDataResponse = fetch('http://localhost:3000/foods')
// const promiseDataFoodToJson = promiseDataResponse.then(respones => respones.json)
// const promiseDataFoodObject = promiseDataFood.then(food => console.log(food))

const restaurantMenu = document.getElementById('restaurant-menu')

fetch('http://localhost:3000/foods')
.then(respones => respones.json())
.then(foods => {
  
  foods.forEach(food => {
    addFoodImageToRestaurantMenu(food)
  })

  showFoodDetails(foods[0])
})
.catch((err) => console.error('ERROR ... :', err))

function addFoodImageToRestaurantMenu(food){
  const imgElement = document.createElement('img')
  imgElement.src = food.image
  restaurantMenu.appendChild(imgElement)

  // Add event listener
  imgElement.addEventListener('click', () => {
    showFoodDetails(food)
  })
}

function showFoodDetails(food){
  const detailImage = document.getElementsByClassName('detail-image')[0]
  const detailName = document.getElementsByClassName('name')[0]
  const detailDescription = document.getElementById('description-display')

  detailImage.src = food.image
  detailName.textContent = food.name
  detailDescription.textContent = food.description
  
}

// function displayFoodDetails(food) {
//     const foodDetailImage = document.querySelector('.detail-image')
//     foodDetailImage.src = food.image
//     const foodName = document.querySelector('.name') 
//     foodName.textContent = food.name
//     const foodDescriptionDisplay = document.querySelector('#description-display')
//     foodDescriptionDisplay.textContent = food.description
// }