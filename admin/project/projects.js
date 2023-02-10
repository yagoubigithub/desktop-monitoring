


const add_project_form = document.getElementById("add_project_form");

const add_project_description = document.getElementById("add_project_description");

const add_project_error = document.getElementById("add_project_error");

const add_project_name = document.getElementById("add_project_name");

const employees_table = document.getElementById("employees_table");


add_project_form.addEventListener("submit", (event) => {
    event.preventDefault();



    const desc = add_project_description.value;
    const name = add_project_name.value;



    const { user, token } = isAuthenticated();

    addProject(user._id, token, { name, desc }).then(
        (data) => {
            if (data.error || data.err) {
                add_project_error.innerHTML = data.error || data.err;
            } else {
                add_project_form.reset();
                add_project_error.innerHTML = "";
                fetchProjects();
            }
        }
    );

});



const addProject = (userId, token, project) => {
    return fetch(`${API}/projects/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
    })
        .then((responce) => {
            return responce.json();
        })

        .catch((err) => {
            console.log(err);
        });
};


const fetchProjects = () => {
    const { user, token } = isAuthenticated();

    projects_table.innerHTML = '<tr><th>Name</th><th>Desription</th><th>Date</th></tr>';
    getProjects(user._id, token).then((data) => {
       if(data.error || data.err){

       }else{

        data.map(project=>{

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            

            td1.innerHTML = `<a href="./project.html?projectId=${project._id}" >${project.name}</a>` ;
            td2.innerText = project.desc;
            td3.innerText = project.createdAt.split("T")[0];
           
            tr.append(td1, td2 , td3);
            projects_table.append(tr);

        })
       }
        //
    })
}



const getProjects = (userId, token) => {
    return fetch(`${API}/projects/${userId}`, {
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


fetchProjects();