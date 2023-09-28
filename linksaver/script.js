const inputBtn = document.getElementById("input-btn");
let savedLinks = [];
const inputEl = document.getElementById("input-el");
const unorderedList = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let linksFromLocalStorage = JSON.parse(localStorage.getItem("Links"));

const renderLeads = (leads) => {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li> <a target='_blank' href='${leads[i]}'>${leads[i]}</a> </li>`;
  }
  unorderedList.innerHTML = listItems;
};

if (linksFromLocalStorage) {
  savedLinks = linksFromLocalStorage;
  renderLeads(savedLinks);
}

inputBtn.addEventListener(
  "click",
  (savePressed = () => {
    savedLinks.push(inputEl.value);
    inputEl.value = "";
    renderLeads(savedLinks);
    localStorage.setItem("Links", JSON.stringify(savedLinks));
    console.log(localStorage.getItem("Links"));
  })
);

deleteBtn.addEventListener(
  "dblclick",
  (deletePressed = () => {
    localStorage.clear();
    savedLinks = [];
    renderLeads(savedLinks);
  })
);

tabBtn.addEventListener("click", (saveTab = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let activeTab = tabs[0];
    let activeTabId = activeTab.id;
  })
  savedLinks.push(tabs[0].url);
  localStorage.setItem("Links", JSON.stringify(savedLinks));
  renderLeads(savedLinks);
}));
