import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3f6c3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const list = document.getElementById("list-items");

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val());

    console.log(snapshot);

    clearList();
    
    itemsArray.forEach(element => {
        createItem(element[1]);
    });
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    //push(shoppingListInDB, inputValue)
    clearInput();
    createItem(inputValue);
})
const clearInput = () => {
    inputFieldEl.value = "";
}
const clearList = () => {
    list.innerHTML = "";
}
const createItem = (item) => {
    let listItem = document.createElement("li");
    listItem.textContent = item[1];
    listItem.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList${item[0]}`)
        remove(exactLocationOfItemInDB);
    })
    list.appendChild(listItem);
}