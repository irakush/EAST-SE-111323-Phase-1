
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
.catch(() => console.error('Oops something goes wrong ...'))

function addFoodImageToRestaurantMenu(food){
  const imgElement = document.createElement('img')
  imgElement.addEventListener('click', test)
  imgElement.src = food.image
  restaurantMenu.appendChild(imgElement)
}

function showFoodDetails(food){
  const detailImage = document.getElementsByClassName('detail-image')[0]
  const detailName = document.getElementsByClassName('name')[0]
  const detailDescription = document.getElementsByClassName('description-display')[0]

  detailImage.src = food.image
  detailName.textContent = food.name
  detailDescription.textContent = food.description
}

function test(){
  
}