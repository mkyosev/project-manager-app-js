import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


// import Board from 'react-trello'
import { Routes, Route } from "react-router-dom";

import NewProject from "./components/projects/NewProject.component";
import Login from "./components/user/Login.component";
import SignUp from "./components/user/Signup.component";
import Menu from "./components/Navbar.component";
import PublicProjects from "./components/projects/PublicProjects.component";
import Logout from "./components/user/Logout.component";
import ProjectDetails from "./components/projects/ProjectDetails.component";
import EditProject from "./components/projects/EditProject.component";
import ProjectTasks from "./components/projects/ProjectTasks.component";
import UserProfile from "./components/user/UserProfile.component";
import Footer from './components/Footer.component';
import HomePage from './components/HomePage.component';
// App.

function App() {
  // const data = {
  //   lanes: [
  //     {
  //       id: 'lane1',
  //       title: 'Planned Tasks',
  //       label: '2/2',
  //       cards: [
  //         { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', },
  //         { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
  //       ],
  //     },
  //     {
  //       id: 'lane2',
  //       title: 'Completed',
  //       label: '0/0',
  //       cards: [],
  //     }
  //   ],
  // }

  return (
    <div className="App">
      <Menu />
      <main>
        <div className="container-fluid">
          <NotificationContainer />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/register" element={<SignUp />} />
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/projects/create" element={<NewProject />} />
            <Route path="/projects/tasks/:id" element={<ProjectTasks />} />
            <Route path="/projects/public" element={<PublicProjects />} />
            <Route path="/projects/details/:id" element={<ProjectDetails />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
