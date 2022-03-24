let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn") 
const ulEl = document.getElementById("ul-el") 
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 
const tabBtn = document.getElementById("tab-btn")

// Check if leadsFromLocalStorage is truthy 
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage 
    render(myLeads) 
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
        render(myLeads) 
    }) 
})

function render(leads){
    let listItems = "" 
    for(let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                ${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems 

}

// Listen for double clicks on the delete button 
// When clicked, clear localStorage, myLeads, and the DOM 
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads) 
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = "" 
    // Save the myLeads array to localStorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
    render(myLeads) 
})



// truthy 
// falsy 

// false
// 0
// ""
// null -> how you as a developer signalize emptiness
// undefined -> how JavaScript signalizes emptiness
// NaN 

