const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

//clasess name
const CHECK="fa-check-circle";
const UNCHECK= "fa-circle-thin";
const LINE_THROUGH="lineThrough";

var LIST, idd=0;

var DATA= localStorage.getItem("todo");
if(DATA){
LIST=JSON.parse(DATA);
idd=LIST.length;
loadList(LIST);
}
else{
    LIST=[];
idd=0;
}
function loadList(array){
    array.forEach(element => {
        todo(element.todo,element.id,element.done,element.trash)
    });
}
//showsDate
const options={weekday : "long", month: "short" , day:"numeric"}

const today= new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options );


clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload()
})

function todo(content, id, done, trash){
if(trash){return;}

   const DONE= done ? CHECK : UNCHECK;
    const LINE= done ? LINE_THROUGH : "";
const itemm=` <li class="item">
<i class="fa ${DONE} co" job="complete" id="${id}"></i>
<p class="text ${LINE}">${content}</p>
<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li> `;
const position= "beforeend";
list.insertAdjacentHTML(position, itemm);
}

document.addEventListener('keyup', function(event){
if(event.key=='Enter'){
    var todoo=input.value;
if(todoo){
    todo(todoo,idd,false,false);
}
LIST.push({
    todo:todoo,
    id:idd,
    done:false,
    trash:false
});
console.log(LIST)
//add item to local storage (this code must be written where list is updated)
localStorage.setItem("todo",JSON.stringify(LIST));
idd++;
input.value=""
}
})

function completeTodo(element){
element.classList.toggle(CHECK);
element.classList.toggle(UNCHECK);
element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
LIST[element.id].done=LIST[element.id].done?false:true;
}

function deleteTodo(element){
element.parentNode.parentNode.removeChild(element.parentNode)
LIST[element.id].trash=LIST[element.id].trash?false:true;
console.log(LIST)
}

list.addEventListener('click', function(event){
var element=event.target;
const elementJob=element.attributes.job.value;
if(elementJob=="complete"){
    completeTodo(element);
}
else if(elementJob=="delete"){
    deleteTodo(element)
}
//add item to local storage (this code must be written where list is updated)
localStorage.setItem("todo",JSON.stringify(LIST));
})