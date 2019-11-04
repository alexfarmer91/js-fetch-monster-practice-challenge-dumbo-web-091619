document.addEventListener('DOMContentLoaded', (event) => {

let monsterForm = document.getElementById('create-monster');
let monsterContainer = document.getElementById('monster-container');
let currentPage = 1
let pageTop = document.getElementsByTagName('h1')[0]
let pageDisplay = document.createElement('h3')
pageDisplay.innerText = `Page: ${currentPage}`
pageTop.appendChild(pageDisplay)

getMonsterPage()

//get monsters

function getMonsterPage(){
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
.then(r => r.json())
.then(monsterPage => {
    monsterContainer.innerHTML = ""; //clear monster container
    monsterPage.forEach(function(monster){
    //set up HTML elements
    let monsterDiv = document.createElement('div'),
    title = document.createElement('h2'),
    age = document.createElement('h4'),
    desc = document.createElement('p');
    //add values
    title.innerText = monster.name;
    age.innerText = monster.age;
    desc.innerText = monster.description;
    monsterDiv.appendChild(title);
    monsterDiv.appendChild(age);
    monsterDiv.appendChild(desc);
    monsterContainer.appendChild(monsterDiv);
})

})
}

//===============================================
//create monster form
    const a = document.createElement('form'),
        b = document.createElement('input'),
        c = document.createElement('input'),
        d = document.createElement('input'),
        e = document.createElement('button');
    a.id = 'monster-form';
    b.id = 'name';
    c.id = 'age';
    d.id = 'description';
    b.placeholder = 'name...';
    c.placeholder = 'age...';
    d.placeholder = 'description...';
    e.innerHTML = 'Create';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    a.appendChild(e);
    monsterForm.appendChild(a);
//==================================================
//add submit listern to monster form

    document.querySelector('#monster-form').addEventListener('submit', event => {
        event.preventDefault();
        postMonster(getFormData())
        clearForm()
    })
//=====================================================
//add page naviation
let totalMonsters = 0;
let totalPages = 0; // this is a float, not the true total page numbers

fetch('http://localhost:3000/monsters/')
.then(r => r.json())
.then(allMonsters => {
    totalMonsters = allMonsters.length
    totalPages = totalMonsters / 50
    console.log(totalPages)
})

let pageDown = document.querySelector('#back'),
    pageUp = document.querySelector('#forward');
    pageDown.disabled = true;

    pageUp.addEventListener('click', (e) => {
        if (totalPages > currentPage){
           currentPage++
           getMonsterPage()
           if (currentPage > totalPages){
            pageUp.disabled = true;
        }
           pageDown.disabled = false;
           pageDisplay.innerText = `Page: ${currentPage}`
        }
    })

    pageDown.addEventListener('click', (e) => {
      if (currentPage > 1){
          currentPage--
          getMonsterPage()
          if (currentPage === 1){
            pageDown.disabled = true;
        }
        pageUp.disabled = false;
        pageDisplay.innerText = `Page: ${currentPage}`
      }
    })

//=====================================================
//helper methods

function clearForm(){
    document.querySelector('#monster-form').reset()
}

function getFormData (){
    let nameInput = document.querySelector('#name'),
        ageInput = document.querySelector('#age'),
        descInput = document.querySelector('#description');
    return {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descInput.value
    }
}

function postMonster(monsterData){
    fetch("http://localhost:3000/monsters/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: monsterData.name,
    age: monsterData.age,
    description: monsterData.description
  })
});

}

//=====================================================

})