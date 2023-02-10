const projects_list = document.getElementById("projects_list");



const fetchProjects = () => {
    const {email ,  employee, token } = isAuthenticated();

    projects_list.innerHTML = '<tr><th>Name</th><th>Desription</th><th>Date</th></tr>';
    getProjects(employee._id , email, token).then((data) => {
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
            projects_list.append(tr);

        })
       }
        //
    })
}



const getProjects = (employee_id , email, token) => {
    return fetch(`${API}/employees/projects/${employee_id}/${email}`, {
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

