# Desktop monitoring

## 1- Install and setup


### A  - Setup :
#### step 1:
 install mongodb
#### step 2: 
   install visual studio(any/2020) - need compiler and tools (Windows)
   macos need Xcode and xcode command line tools

#### step 3: install npm/node
 - npm i -g node-gyp - https://www.npmjs.com/package/node-gyp
 - npm i -g windows-build-tools(in windows must in powershell) - https://www.npmjs.com/package/windows-build-tools


## B  - Install  :
```
cd desktop
npm i
cd ..
cd backend
npm i
```


#  - Run  :

if you want to run the web app in the browser you have to run the backend :

```
cd backend
npm start
```
- after that go to ``admin/index.html`` and open this file using any browser 
now you can signup in the application.

- after you login to the dashboard  click "Employee" and add new Employee.
- go to project add new project
- after you add the project click the link of the name of the project in the table.
- assign a Employee to this project by choosing one and click add .
- after assign the  Employee to this project click the link of the name of the Employee in the table 
- Give the Employee  a task 
- now you finish from the admin dashboard you create a Employee you create a project you give this project to the employee  you give him a task now when he open the desktop app and sign in he will find the project and the task
-now you just give the Employee just your email and the username you created and the password.

#  - Run  :

if you want to run the desktop app  you have to run the desktop in new terminal :
```
cd desktop
npm start
```

- This will show the login page 
- the Employee will login using your email and his username and the passwod
- after that will find the list of the projects you created 
- if he click in any project names he will find the list of tasks 
- click start and the app will start monitoring 
- 
- 





