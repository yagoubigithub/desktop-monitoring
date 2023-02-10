

//login
const add_emplyee_form = document.getElementById("add_emplyee_form");

const add_emplyee_psw = document.getElementById("add_emplyee_psw");

const add_emplyee_error = document.getElementById("add_emplyee_error");

const add_emplyee_uname = document.getElementById("add_emplyee_uname");

const employees_table = document.getElementById("employees_table");


add_emplyee_form.addEventListener("submit", (event) => {
    event.preventDefault();



    const password = add_emplyee_psw.value;
    const username = add_emplyee_uname.value;



    const { user, token } = isAuthenticated();

    addEmployee(user._id, token, { username, password }).then(
        (data) => {
            if (data.error || data.err) {
                add_emplyee_error.innerHTML = data.error || data.err;
            } else {
                add_emplyee_form.reset();
                add_emplyee_error.innerHTML = "";
                fetchEmployees();
            }
        }
    );

});



const addEmployee = (userId, token, employee) => {
    return fetch(`${API}/employees/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
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

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            
            td1.innerText = employee.username;
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


fetchEmployees();