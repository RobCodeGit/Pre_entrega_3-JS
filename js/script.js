const fecha = document.querySelector('#fecha')
const input = document.querySelector('#input')
const lista = document.querySelector('#lista-tareas')
const enter = document.querySelector('#enter')
const check = 'fa-check-circle'
const nocheck = 'fa-circle'
const tachado = 'tachado'
let id
let almacenTareas




// Funcion que colocara la fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString({weekday:'long', month:'short', day:'numereric'})


// Funcion nueva tarea

function addTarea (tarea,id,realizada,eliminada){
    if(eliminada){return}

    const hecho = realizada ?check :nocheck
    const linea = realizada ?tachado:''

    const elemento =  `<li id='elemento'>
        <i class="far ${hecho}" data="realizada" id=${id} ></i>
        <p class="text ${linea}">${tarea}</p>
        <i class="fas fa-trash de" data="eliminada" id=${id}></i>
        </li>`

    lista.insertAdjacentHTML('beforeend',elemento)

}

// Funcion para las tareas hechas

function tareaHecha(accion){
    accion.classList.toggle(check)
    accion.classList.toggle(nocheck)

    //identifico los elemntos hijos del html
    accion.parentNode.querySelector('.text').classList.toggle(tachado)

    almacenTareas[accion.id].realizada = almacenTareas[accion.id].realizada ?false :true
}

// Funcion para las tareas borradas

function tareaBorrada(accion){
    accion.parentNode.parentNode.removeChild(accion.parentNode)
    almacenTareas[accion.id].eliminada = true
}




enter.addEventListener('click', ()=> {
    const tarea = input.value 
    if(tarea){
        addTarea(tarea,id,false,flase)
        almacenTareas.push({
            nombre: tarea,
            id: id,
            realizada: false,
            eliminada: false
        })
    }
    localStorage.setItem('Almacen', JSON.stringify(almacenTareas))
    
    input.value=''
    id++
    console.log(almacenTareas)
})

document.addEventListener('keyup',function(event){
    if(event.key == 'Enter'){
        const tarea = input.value 
        if(tarea){
            addTarea(tarea,id,false,false)
            almacenTareas.push({
                nombre: tarea,
                id: id,
                realizada: false,
                eliminada: false
            })
        }
        localStorage.setItem('Almacen', JSON.stringify(almacenTareas))
        input.value=''
        id++
        console.log(almacenTareas)
    }
})


lista.addEventListener('click',function(event){
    const accion = event.target
    const accionData = accion.attributes.data.value
     if(accionData == 'realizada'){
        tareaHecha(accion)
     }else if(accionData == 'eliminada'){
        tareaBorrada(accion)
     }
     localStorage.setItem('Almacen', JSON.stringify(almacenTareas))
})



// Manejo del Local storage

let data = localStorage.getItem('Almacen')
if(data){
    almacenTareas=JSON.parse(data)
    id = almacenTareas.length
    cargarAlmacen(almacenTareas)
}else{
    almacenTareas = []
    id = 0
}

function cargarAlmacen(DATA){
    DATA.forEach(function(i){
        addTarea(i.nombre,i.id,i.realizada,i.eliminada)

    })
}