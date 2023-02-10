const employee_username = document.getElementById("employee_username");

const add_task_form = document.getElementById("add_task_form");

const add_task_description = document.getElementById("add_task_description");

const add_task_error = document.getElementById("add_task_error");

const add_task_name = document.getElementById("add_task_name");

const tasks_table = document.getElementById("tasks_table");


add_task_form.addEventListener("submit", (event) => {
    event.preventDefault();



    const desc = add_task_description.value;
    const name = add_task_name.value;



    const { user, token } = isAuthenticated();

    const employee_id = location.search.split('employee_id=')[1]

    addTask(employee_id, token, { name, desc }).then(
        (data) => {
            if (data.error || data.err) {
                add_task_error.innerHTML = data.error || data.err;
            } else {
                add_task_form.reset();
                add_task_error.innerHTML = "";
                fetchEmployee();
            }
        }
    );

});

const addTask = (employee_id, token, task) => {
    return fetch(`${API}/tasks/${employee_id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    })
        .then((responce) => {
            return responce.json();
        })

        .catch((err) => {
            console.log(err);
        });
};


const fetchEmployee = () => {
    const { user, token } = isAuthenticated();

    tasks_table.innerHTML = '<tr><th>Name</th><th>Desription</th><th>Date</th></tr>';


    const employee_id = location.search.split('employee_id=')[1]

    getEmployee(employee_id , token).then((data) => {
       if(data.error || data.err){

       }else{

        data.tasks.map(task=>{

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            

            td1.innerHTML = `<a href="../task/task.html?taskId=${task._id}" >${task.name}</a>` ;
            td2.innerText = task.desc;
            td3.innerText = task.createdAt.split("T")[0];
           
            tr.append(td1, td2 , td3);
            tasks_table.append(tr);

        })
       }
        //
    })
}



const getEmployee = (userId, token) => {
    return fetch(`${API}/employees/employee/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((responce) => {
            return responce.json();
        })


        .catch((err) => {
            console.log(err);
        });
};


fetchEmployee();