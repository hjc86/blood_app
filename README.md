# Red Cells App
Final Futureproof project.

### Project Brief

### User Stories

### Developer Notes
#### Full install instructions
First, clone the repository onto your machine.
#### Backend install
Prerequisites: python3, pip3, virtualenv.
1. Navigate to the "\backend" directory.
2. Initialise virtualenv as venv (e.g. PowerShell - "python3 -m virtualenv venv").
3. Activate virtualenv (e.g. Powershell - ".\venv\Scripts\activate").
4. Pip install from requirements.txt (e.g. Powershell - "pip3 install -r requirements.txt").
5. Navigate to the "\backend\main_app\main_app" directory.
6. Add a .env file with the following format.
    ```
    export DATABASE_ENGINE=
    export DATABASE_NAME=
    export DATABASE_USER=
    export DATABASE_PASSWORD=
    export DATABASE_HOST=
    export DATABASE_PORT=
    ```
7. Fill in the template with values appropriate for your set-up.
8. Navigate to the "\backend\main_app" directory.
9. Run "manage.py runserver" using python.
#### Frontend install
Prerequisites: node.js, npm.
1. Navigate to the "\frontend" directory.
2. Npm install to the local directory  (e.g. PowerShell - "npm install --save").
3. Run the module using npm (e.g. PowerShell - "npm start").