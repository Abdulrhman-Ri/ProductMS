let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let result;
let mode  = 'create';
let temp;

// console.log(title, price, taxes, ads, discount, total, count, categroy, submit);

//get total

function getTotal(){
    if(price.value != ''){
        result= (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#3ded97';
        total.style.color = '	#000000';
    } else {
        total.innerHTML = '';
        total.style.background = '#ff6347'
    }
}

// create Prodect

let datapro;
if (localStorage.Prodect != null){
    datapro = JSON.parse(localStorage.Prodect)
} else {
    datapro = [];
}

submit.onclick = function(){
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if(title.value != '' && price.value != '' && category.value != '' && count.value <= 100){
    if (mode === 'create'){
    if(newpro.count > 1){
        for(let i = 0; i < newpro.count; i++)
        {
            datapro.push(newpro);
        }
        } else {
            datapro.push(newpro);
        }
    } else {
        datapro[temp] = newpro;
        mode = 'create'
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
    clearData()
    }
    localStorage.setItem('Prodect', JSON.stringify(datapro))
    showData()
}

//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = '#ff6347'
    category.value = '';
    count.value = '';
}

// read
//showData()
function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < datapro.length; i++){
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0){
        btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All (${datapro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}


//delete

function deleteData(i){
    datapro.splice(i, 1);
    localStorage.Prodect = JSON.stringify(datapro);
    showData();
}

// DELETE ALL

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

//update

function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal()
    count.style.display = 'none';
    title.value = datapro[i].title;
    submit.innerHTML = 'update';
    mode = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

//search
let searchMode = 'title';

function getSearchMode(id){
    let search = document.getElementById('search');
    if (id == 'searchtitle'){
        searchMode = 'title';
    } else {
        searchMode = 'category';
    }
    search.placeholder = 'search by ' + searchMode;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
    let table = '';
    for(let i = 0; i < datapro.length; i++){
    if(searchMode == 'title')
    {
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
            }
    
    } else {
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
            }
    }
    }
    document.getElementById('tbody').innerHTML = table;
}

showData();
