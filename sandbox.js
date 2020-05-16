const ul = document.querySelector('ul');
const form = document.querySelector('form');
const button=document.querySelector('button');
const deleteall = document.querySelector('.deleteall');
const delet = false;


const list = (item, id) => {
    const html =`
    
    <li data-id=${id} class="list-group-item"> ${item} <i class="fa fa-check-square" ></i><i class="fa fa-trash" ></i></li>
    `;

    ul.innerHTML += html;
}
const deliteTodo = (id) => {
    const todos = document.querySelectorAll('li');
    todos.forEach(todo => {
        if(todo.getAttribute("data-id")=== id)
        {
            todo.remove();
        }
    })
};

const unsub= db.collection('todos').onSnapshot(snapshot => 
{    
    snapshot.docChanges().forEach(change => {
        if(change.type==="added")
        {
            list(change.doc.data().item, change.doc.id);
        }else{
            deliteTodo(change.doc.id)
        }

    });

});

// add a new to do
form.addEventListener('submit', e => {

    e.preventDefault();

    const todo ={
        item : form.todo.value,
        done: false
    }
    db.collection('todos').add(todo)
    .then(()=>{console.log("to do added succely",todo)})
    .catch((err) => console.log(err));

    form.reset();
});

//delete on click on the trash
ul.addEventListener('click', e=> {
    e.preventDefault();
    
    if(e.target.tagName === "I" )
    {
        const toRemove=e.target.parentElement.getAttribute('data-id');
        if(e.target.classList.contains("fa-trash"))
        {
            //   db.collection('todos')
            db.collection('todos').doc(toRemove).delete()
            .then(()=>console.log("delete success"))
            .catch(err => console.log(err));
            
        }
         if(e.target.classList.contains("fa-check-square"))
        {
           e.target.parentElement.classList.toggle('checked');
        }
    
    }
});

//stop adding
button.addEventListener('click',e => {
    e.preventDefault();
    unsub();
    alert("good job for today, have a good night");
});



deleteall.addEventListener('click', e => {
e.preventDefault();

db.collection('todos').get().then(snapshot => 
    {    
        snapshot.docChanges().forEach(change => {
            db.collection('todos').doc(change.doc.id).delete()
            .then(()=>console.log("delete success"))
            .catch(err => console.log(err));
        });

        });


       
});