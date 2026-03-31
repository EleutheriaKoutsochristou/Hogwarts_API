var items=[];

document.getElementById("spellForm").addEventListener("submit", addItem);

async function addItem(event){
    event.preventDefault();

    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var element = document.getElementById("element").value;
    var rarity = document.getElementById("rarity").value;
    var power = Number(document.getElementById("power").value);
    var desc = document.getElementById("desc").value;

    var status;
    if (type == "spell"){
        status = "Unlearned";
    }else if(type == "potion"){
        status = "Unbrewed";
    }
    var newItem = {
        name: name,
        type: type === "spell" ? "Spell" : "Potion",
        element: element,
        rarity: rarity,
        power: power,
        description: desc,
        status: status
    };

    try {
        await fetch("http://localhost:3000/api/v1/magic-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });
        fetchItems();
    } catch (error) {
        console.log(error);
    }
}

function displayItems(){
    var itemsList = document.getElementById("labContainer");
    itemsList.innerHTML = "";

    for(let i=0; i<items.length; i++){
        itemsList.innerHTML += `
        <div class="card glass mb-3 p-2 text-white">
            <h5>${items[i].name}</h5>
            <p> 
                Τύπος: ${items[i].type}, 
                Στοιχείο: ${items[i].element}, 
                Σπάνιότητα: ${items[i].rarity}, 
                Δύναμη: ${items[i].power}, 
                Κατάσταση: ${items[i].status}, 
                Περιγραφή: ${items[i].description}
            </p>
            <button onclick="changeStatus(${i})">Κατάσταση</button>
            <button onclick="upgradeItem(${i})">+5</button>
            <button onclick="deleteItem('${items[i]._id}')">Διαγραφή</button>
        </div>
        `;
    }
}

async function changeStatus(index){
    let item = items[index];
    let newStatus;
    if(items[index].type === "Spell"){
        if(items[index].status === "Unlearned"){
            newStatus = "Learned";
        }else{
            newStatus = "Unlearned";
        }
    }else if(items[index].type === "Potion"){
        if(items[index].status === "Unbrewed"){
            newStatus = "Brewed";
        }else{
            newStatus = "Unbrewed";
        }
    }
    await fetch(`http://localhost:3000/api/v1/magic-items/${item._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
    });
    fetchItems();
}

async function upgradeItem(index){
    let item = items[index];
    if(item.power<=95){
        item.power+=5;
    }
    await fetch(`http://localhost:3000/api/v1/magic-items/${item._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ power: item.power })
    });
    fetchItems();
}

async function deleteItem(id){
    try {
        await fetch(`http://localhost:3000/api/v1/magic-items/${id}`, {
            method: "DELETE"
        });
        fetchItems();
    } catch (error) {
        console.log(error);
    }
}

async function fetchItems() {
    try {
        const res = await fetch("http://localhost:3000/api/v1/magic-items");
        const data = await res.json();
        items = data;
        displayItems();
    } catch (error) {
        console.log(error);
    }
}

window.onload = fetchItems;