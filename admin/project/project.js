const project_name = document.getElementById("project_name");

const projecr_desc = document.getElementById("projecr_desc");


const employees_table = document.getElementById("employees_table");

const select_employee_id = document.getElementById("select_employee_id");

add_emplyee_form.addEventListener("submit", (event) => {
    event.preventDefault();



    const employee_id = select_employee_id.value;
    const projectId = location.search.split('projectId=')[1]
 

    const { user, token } = isAuthenticated();

    addEmployeeToProject(user._id, token,   employee_id , projectId ).then(
        (data) => {
            if (data.error || data.err) {
                add_emplyee_error.innerHTML = data.error || data.err;
            } else {
                add_emplyee_form.reset();
                add_emplyee_error.innerHTML = "";
                //fetchEmployees();
               window.location.reload()
            }
        }
    );

});



const addEmployeeToProject = (userId, token, employee_id , projectId) => {

    return fetch(`${API}/projects/employee/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({employee_id , projectId}),
    })
        .then((responce) => {
            return responce.json();
        })

        .catch((err) => {
            console.log(err);
        });
};


const FetchProject = () => {
    const { user, token } = isAuthenticated();

    employees_table.innerHTML = '<tr><th>Username</th><th>Date</th><th>blabla</th></tr>';

    const projectId = location.search.split('projectId=')[1]
 
    getProject(user._id, token , projectId).then((data) => {
       if(data.error || data.err){

       }else{
           project_name.innerText = data.name;
           projecr_desc.innerText = data.desc;
           

        data.employees.map(employee=>{
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            
            td1.innerHTML = `<a href="../employee/employee.html?employee_id=${employee._id}" >${employee.username}</a>` ;
            td2.innerText = employee.createdAt;
           
            tr.append(td1, td2);
            employees_table.append(tr);
          

        })
       }
        //
    })
}


const getEmployees = (userId, token) => {
    return fetch(`${API}/employees/${userId}`, {
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


const getProject = (userId, token , projectId) => {
    return fetch(`${API}/projects/project/${userId}/${projectId}`, {
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

const fetchEmployees = () => {
    const { user, token } = isAuthenticated();

    employees_table.innerHTML = '<tr><th>Username</th><th>Date</th><th>blabla</th></tr>';
    getEmployees(user._id, token).then((data) => {
       if(data.error || data.err){

       }else{

       
        data.map(employee=>{

            const option = document.createElement("option");
            option.value = employee._id;
            option.innerText = employee.username;

            select_employee_id.append(option);
          

        })
       }
        //
    })
}


fetchEmployees();
FetchProject()