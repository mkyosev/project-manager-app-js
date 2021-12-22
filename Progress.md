Creation plan


[x] - Backend API (express)
    [x] - Create Schema models - Mongo DB
        [x] - Project Schema
            [x] - name
            [x] - description
            [x] - createdAt
            [x] - author
            [x] - public (def: false)
            [x] - tab: Collection of project tabs (place to create tasks eg. ToDo) - Create 4 default ones for each project (To Do, In Progress, Testing, Done)
            [x] - groupMembers: Collection of Users able to CRUD cards in a project
        [x] - User Schema
            [x] - fullName
            [x] - email
            [x] - password
            [x] - collection of authored projects
            [x] - collection of projects you are member in
    [x] - Create routing
    [x] - CRUD services
    [x] - Guarding?
[x] - Frontend React
    [x] - Basic Design (Bootstrap)
        [x] - Basic Ui
        [X] - Drag and drop all components (tabs/cards) - react-trello
    [x] - Home/Login (email, pw)/Register (fullName, email, pw)/Logout handling
        [] - Static home page
        [x] - Public Projects can display all publicly created projects (User, Guest can see it)
        [x] - Guest can see public project details (tabs/cards)
    [x] - Create/Edit/Delete project
        [x] - Add/Remove user to project (only project author) (Updates Project and User schema***)
    [x] - Profile page with 2 categories of projects and basic user info (Authored, member in)