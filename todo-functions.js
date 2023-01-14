//Fetch existiong todos from local storage
const getSavedtodos=function(){
    const todoJSON=localStorage.getItem('todo')
    if(todoJSON!=null){
        return JSON.parse(todoJSON)
    }else{
        return []
    }
}

//remove todo by id
const removeTodo = function(id){
    const todoIndex=todos.findIndex(function(todo){
        return todo.id===id
    })
    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }
}

//toggle todo value based on the checkbox input
const toggleTodo = function(id){
    const todo=todos.find(function(todo){
        return todo.id===id
    })
    if(todo!==undefined){
        todo.completed = !todo.completed
    }
}

//save todos to local storage
const savetodos = function(todos){
    localStorage.setItem('todo',JSON.stringify(todos))
}

//Get the DOM elements for an individual todo
const generatetodoDom = function(todo){
    const todo_el=document.createElement('div')
    const todo_check=document.createElement('input')
    todo_check.setAttribute('type','checkbox')
    todo_check.checked=todo.completed
    const todo_del=document.createElement('button')
    const todo_element=document.createElement('span')
    todo_el.appendChild(todo_check)
    todo_check.addEventListener('change',function(e){
        toggleTodo(todo.id)
        savetodos(todos)
        rendertodo(todos,filters)
    })


    if(todo.text!=null){
        todo_element.textContent=todo.text;
    }else{
        todo_element.textContent='unnamed'
    }
    todo_el.appendChild(todo_element)
    todo_del.textContent='x'
    todo_el.appendChild(todo_del)
    todo_del.addEventListener('click',function(){
        removeTodo(todo.id)
        savetodos(todos)
        rendertodo(todos,filters)
    })

    document.querySelector('#todothings').appendChild(todo_el)
}

//Render applicatioin todos based on filters
const rendertodo=function(todos,filters){
    let filtertodo=todos.filter(function(todo){
        if(todo.text!=null){
    return (todo.text.toLowerCase().includes(filters.searchtext.toLowerCase()))
}
})
// filtertodo=filtertodo.filter(function(todo){
// 	if(filters.hidecompleted){
// 		return !todo.completed
// 	}else{
// 		return true
// 	}
// })

document.querySelector('#todothings').innerHTML=''
filtertodo.forEach(function(todo){
    generatetodoDom(todo)
})
let todosLeft=0;
filtertodo.forEach(function(todo){
if(todo.completed===false){
    todosLeft++;
}
})
let newParagraph = document.createElement('h2');
newParagraph.textContent=`you have ${todosLeft} todos left`;
document.querySelector('#todothings').appendChild(newParagraph);
// todos.forEach(function(todo){
//  	let newParagraph=document.createElement('p');
//  	newParagraph.textContent=todo.text;
//  	document.querySelector('#todothings').appendChild(newParagraph);
//  })

}
