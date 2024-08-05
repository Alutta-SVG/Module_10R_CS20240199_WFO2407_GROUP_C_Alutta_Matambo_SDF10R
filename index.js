//necessary firebase functions from libraries 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref,push, onValue,remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const appSettings = {
    databaseURL:"https://shopping-35dd3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
//initialize firebase app with the provided settings 
const app = initializeApp(appSettings)
const database = getDatabase (app)
const shoppingListInDB = ref (database, "shoppingList")
//dom elements
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
//event listener for the 'add to cart' button
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
   push(shoppingListInDB, inputValue)

    clearInputFieldEl()



    console.log(`${inputValue} added to database `)
})  
//listen for changes in the 'shoppingList' node
onValue(shoppingListInDB, function(snapshot) {
      if (snapshot.exists()) { 
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl() //clear current shopping list
    
       for (let i =0; i < itemsArray.length; i++) {
        let currentItem = itemsArray [i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
    
            appendItemToShoppingListEl(currentItem)
    }
  
   } else {
    shoppingListEl.innerHTML = "No items here...yet"
   }

})
//fuction to clea the shopping list
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
//fuction to clear input field
 function clearInputFieldEl() {
    inputFieldEl.value = ""
 }
//fuction to append new item to the shopping list
 function appendItemToShoppingListEl(item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl=document.createElement("li")

    newEl.textContent= itemValue
//eventlisener for item removal
    newEl.addEventListener("click", function(){
       let exactlocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

       remove(exactlocationOfItemInDB)
    })

    shoppingListEl.append (newEl)

 }

