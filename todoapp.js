const todos=getSavedtodos();
const filters={
	searchtext:'',
	hidecompleted:false
}
rendertodo(todos,filters)
let new_todo

document.querySelector('#todos').addEventListener('input',function(e){
	filters.searchtext=e.target.value;
	rendertodo(todos,filters);
})

document.querySelector('#create_todo').addEventListener('input',function(e){
	new_todo=e.target.value;
	
})

document.querySelector('#create').addEventListener('click',function(e){
	todos.push({
		id:uuidv4(),
		text:new_todo,
		completed:false
	})
	savetodos(todos)
	rendertodo(todos,filters)
})


// document.querySelector('#todo_form').addEventListener('submit',function(e){
// 	e.preventDefault()
// 	todos.push({
// 		text:e.target.elements.firstTodo.value,
// 		completed:false
// 	})
// 	e.target.elements.firstTodo.value=''
// 	rendertodo(todos,filters);
// })

document.querySelector('#for-fun').addEventListener('change',function(e){
	filters.hidecompleted=e.target.checked
	rendertodo(todos,filters)
})





