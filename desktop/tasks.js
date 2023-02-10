const tasks_list = document.getElementById("tasks_list");

const fetchTasks = () => {
  const { email, employee, token } = isAuthenticated();

  tasks_list.innerHTML =
    "<tr><th>Name</th><th>Time spent</th><th>Date</th></tr>";

  const projectId = location.search.split("projectId=")[1];

  getTasks(employee._id, projectId, token).then((data) => {
    if (data.error || data.err) {
    } else {
      data.map((task) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const start_btn = document.createElement("button");
        start_btn.innerText = "start";

        td1.innerHTML = `<a href="#" >${task.name}</a>`;
        
        let timespent = task.times.reduce(
          (accumulator, current) => accumulator + current.spent,
          0
        );
        const timeArray = [3600, 60]
        .reduceRight(
          (p, b) => r => [Math.floor(r / b)].concat(p(r % b)),
          r => [r]
        )(timespent)
        .map(a => a)
    
        td2.innerText = `${formatTime(timeArray[0])}:${formatTime(timeArray[1])}:${formatTime(timeArray[2])}`;
        td3.append(start_btn);

        start_btn.addEventListener("click", (ev) => {
          if (start_btn.innerText === "start") {
            startRecording();
           
            let times = [];
            start_btn.innerText = "stop";
            let count = 0;
            window.electron.start(task, td2, (event, value) => {

                timespent++;
                const timeArray = [3600, 60]
                .reduceRight(
                  (p, b) => r => [Math.floor(r / b)].concat(p(r % b)),
                  r => [r]
                )(timespent)
                .map(a => a)
            
                td2.innerText = `${formatTime(timeArray[0])}:${formatTime(timeArray[1])}:${formatTime(timeArray[2])}`;
              if (times[0]) {
                if (times[0].filename === value.filename) {
                  if (count === 4) {
                    times[0].spent = times[0].spent + 1;
                    sendTimes(times, task.employee_id, task._id, token).then(
                      () => {
                        times = [];
                        count = 0;
                      }
                    );
                  } else {
                    times[0].spent = times[0].spent + 1;
                  }
                } else {
                  sendTimes(times, task.employee_id, task._id, token).then(
                    () => {
                      times = [];
                      times.unshift({
                        ...value,
                        spent: 1,
                        start: Math.floor(Date.now() / 1000),
                        nbClick: 0,
                        nbKeyPress: 0,
                      });
                      count = 0;
                    }
                  );
                }
              } else {
                times.unshift({
                  ...value,
                  spent: 1,
                  start: Math.floor(Date.now() / 1000),
                  nbClick: 0,
                  nbKeyPress: 0,
                });
              }

              count++;
            });

            window.electron.startRecordingMouse((event, value) => {
              console.log("click");

              if (times[0]) {
                times[0].nbClick = times[0].nbClick + 1;
              }
            });
            window.electron.startRecordingKeyboard((event, value) => {
              console.log("keypress");
              if (times[0]) {
                times[0].nbKeyPress = times[0].nbKeyPress + 1;
              }
            });
          } else {
            stopRecording();

            start_btn.innerText = "start";
            window.electron.stop(task, () => {});
          }
        });

        tr.append(td1, td2, td3);
        tasks_list.append(tr);
      });
    }
    //
  });
};

const getTasks = (employee_id, projectId, token) => {
  return fetch(`${API}/tasks/${employee_id}/${projectId}`, {
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

const sendTimes = (times, employee_id, task_id, token) => {
  return fetch(`${API}/times/${employee_id}/${task_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ times }),
  })
    .then((responce) => {
      return responce.json();
    })

    .catch((err) => {
      console.log(err);
    });
};

const startRecording = () => {};

const stopRecording = () => {};

const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  

fetchTasks();
