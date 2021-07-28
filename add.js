document.getElementById("result").addEventListener("click", function () { 
    submit() 
});

async function submit() {
    try {
        let name = document.getElementById('name').value;
        let last = document.getElementById('last').value;
        let resp = await fetch(`https://6100f2881d56e10017394c6f.mockapi.io/CreateUsers`, 
        { 
            method: 'POST',
            body: JSON.stringify({ name, last }), 
            headers: { "Content-Type": "application/json" } 
        })
        let getData = await resp.json();
        console.log("blah",getData);
        document.querySelector('form').reset();
        getTotalList();
    } catch (error) {
        console.log(error);
    }
}

function updateList(data) {
 let tbody = document.getElementById('tbody')
 data.length !== 0 ? tbody.innerHTML = '' : tbody.innerHTML = `No Data to display`;
    for(let i=0;i < data.length;i++){
        const ele = data[i];
       
        tbody.innerHTML += `<tr id='${ele.id}'>
        <td id='${ele.id}-name'>${ele.name}</td>
        <td id='${ele.id}-last'>${ele.last}</td>
        <td><button type="button" class="btn btn-primary" onclick="editName(${ele.id})">Edit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteName(${ele.id})">Delete</button></td></tr>`;
    }
}


async function getTotalList() {
    let tres = await fetch('https://6100f2881d56e10017394c6f.mockapi.io/CreateUsers');
    let data = await tres.json();
    console.log(data);
    updateList(data);
}

async function editName(id) {
    let tr = document.getElementById(id);
    let name = document.getElementById(`${id}-name`).innerText
    let last = document.getElementById(`${id}-last`).innerText
    tr.innerHTML = `<td>
    <input type="text" name="name" id="${id}-name" class="form-control" value="${name}" />
    </td>
    <td>
    <input type="text" name="last" id="${id}-last" class="form-control" value="${last}" />
    </td>
    <td>
    <button type="submit" class="btn btn-success" id="editName" onclick="editNameval(${id})">Done</button>
  </td>
  <td>
    <button type="submit" class="btn btn-danger" id="cancel" onclick="getTotalList()">Cancel</button>
  </td>`

}

async function editNameval(id) {
    try {
        let name = document.getElementById(`${id}-name`).value;
        let last = document.getElementById(`${id}-last`).value;
        let resp = await fetch(`https://6100f2881d56e10017394c6f.mockapi.io/CreateUsers/${id}`, 
        { 
            method: 'PUT',
            body: JSON.stringify({ name, last }), 
            headers: { "Content-Type": "application/json" } 
        })
        let getData = await resp.json();
        console.log("put",getData);
        
        getTotalList();
    } catch (error) {
        console.log(error);
    }
}

async function deleteName(id) {
    try {
        let resp = await fetch(`https://6100f2881d56e10017394c6f.mockapi.io/CreateUsers/${id}`, 
        { 
            method: 'DELETE',
            body: null, 
            headers: { "Content-Type": "application/json" } 
        })
        let data = await resp.json();
        console.log(data);
        getTotalList();  
    } catch (error) {
        console.log(error)
        
    }
}
getTotalList();