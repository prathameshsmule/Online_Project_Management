import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/LoginPage/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AddProject from "./components/AddProjectsPage.jsx/AddProject";
import Layout from "./Layout";
import ProjectListing from "./components/ProjectListing/ProjectListing";
import { useMediaQuery } from 'react-responsive';

function App() {

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/addProject" element={<Layout><AddProject /></Layout>} />
                <Route path="/project-list" element={<Layout><ProjectListing /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
