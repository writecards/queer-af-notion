
const itemEl = document.querySelector("#items")
const loadingEl = document.querySelector("#loading");

let loading = false;

const getItemsFromBackend = async ()=>{
    loading = true;
    const res = await fetch('http://localhost:5000/indexitems')
    const data = await res.json()
    loading = false
    return data
}


const addItemsToDom = async() =>{
    const items = await getItemsFromBackend();
     console.log(items)
    if(!loading){
        loadingEl.innerHTML = '';
    }
    items.forEach((item) =>{
        const div = document.createElement('div')
        div.className = "item"
        div.innerHTML = `
        <h3>${item.title}</h3>
        <ul>
        <li>data added: ${item.date}</li>
        <li>description: ${item.description}</li>
        </ul>
        <div class = "tags"> ${item.tags}</div>
        `
        itemEl.appendChild(div)
    })
}

addItemsToDom();