const times_table = document.getElementById("times_table");
const task_name = document.getElementById("task_name");

const task_description = document.getElementById("task_description");
const task_date = document.getElementById("task_date");
const FetchTask = () => {
    const { user, token } = isAuthenticated();

    times_table.innerHTML = '<tr><th></th><th>App name</th><th>file Title</th> <th>time spent</th> <th>Number of click</th><th>Number of keypress</th></tr>';

    const taskId = location.search.split('taskId=')[1]
 
    getTask(  taskId , token ).then((data) => {
        console.log(data);
          
       if(data.error || data.err){

        alert("somthing goes wrong ");
       }else{

        task_name.innerText = data.name;
        task_description.innerText = data.desc;
        task_date.innerText = data.createdAt.split("T")[0];

        for (let i = data.times.length - 1; i >= 0; i--) {
            const time = data.times[i];    const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");
            const icon = document.createElement("img");
            icon.src = "data:image/png;base64," + time.icon;
            td2.innerHTML = time.filename ;
            td3.innerHTML = time.title ;
            td4.innerText = new Date(time.spent * 1000).toISOString().slice(11, 19);
            td5.innerHTML = time.nbClick ;
            td6.innerHTML = time.nbKeyPress;

            td1.append(icon)
           
           
            tr.append( td1, td2  , td3 , td4 , td5 , td6);
            times_table.append(tr);
            
        }
        

       }
        //
    })
}


const getTask = (taskId, token) => {
    return fetch(`${API}/tasks/${taskId}`, {
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

FetchTask();