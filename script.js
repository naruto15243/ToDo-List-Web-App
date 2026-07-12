const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

window.onload = loadTasks;

function addTask(){

    const task = input.value.trim();

    if(task=="") return;

    createTask(task,false);

    input.value="";

    saveTasks();

    updateStats();
}

function createTask(text,done){

    let li=document.createElement("li");

    if(done)
        li.classList.add("completed");

    li.innerHTML=`
        <span>${text}</span>

        <div>

        <button class="complete">✓</button>

        <button class="delete">🗑</button>

        </div>
    `;

    li.querySelector(".complete").onclick=function(){

        li.classList.toggle("completed");

        saveTasks();

        updateStats();

    }

    li.querySelector(".delete").onclick=function(){

        li.remove();

        saveTasks();

        updateStats();

    }

    list.appendChild(li);

}

function saveTasks(){

    let tasks=[];

    document.querySelectorAll("#taskList li").forEach(li=>{

        tasks.push({

            text:li.querySelector("span").innerText,

            done:li.classList.contains("completed")

        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function loadTasks(){

    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

    tasks.forEach(t=>createTask(t.text,t.done));

    updateStats();

}

function updateStats(){

    let total=document.querySelectorAll("#taskList li").length;

    let completed=document.querySelectorAll(".completed").length;

    document.getElementById("total").innerText=total;

    document.getElementById("completed").innerText=completed;

    document.getElementById("pending").innerText=total-completed;

}

document.getElementById("searchInput").addEventListener("keyup",function(){

    let value=this.value.toLowerCase();

    document.querySelectorAll("#taskList li").forEach(li=>{

        li.style.display=li.innerText.toLowerCase().includes(value)
            ?"flex":"none";

    });

});

function deleteCompleted(){

    document.querySelectorAll(".completed").forEach(task=>task.remove());

    saveTasks();

    updateStats();

}

document.getElementById("themeBtn").onclick=function(){

    document.body.classList.toggle("dark");

};
