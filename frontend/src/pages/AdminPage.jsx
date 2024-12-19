import React, { useContext, useState } from 'react';
import RecipeTable from '../components/DbRecipeTable/RecipeTable';
import '../components/DbRecipeTable/RecipeTable.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/AdminPage.css';
import { UserContext } from '../context/UserProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const {  logout } = useContext(UserContext);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const navigate = useNavigate();
    const handleLogout = () => {
         localStorage.removeItem('accessToken');
         navigate('/login');
    }
    return (
        <div className={`manage-recipes ${isSidebarOpen ? '' : 'collapsed-sidebar'}`}>
            {/* Logout Button */}
            

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="profile">
                    <div className="avatar"></div>
                    {/* <h3>John</h3> */}
                    <p>Admin</p>
                </div>
                <nav>
                    <ul>
                        <li className="active">Manage recipes</li>
                        {/* <li>Settings</li> */}
                        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                <header className="header">
                    <div className="menu-toggle">
                        {isSidebarOpen ? (
                            <CloseIcon style={{color:"red"}}onClick={toggleSidebar} />
                        ) : (
                            <MenuIcon onClick={toggleSidebar} />
                        )}
                    </div>
                </header>
                <div className="recipe-actions">
                    <Button onClick={handleOpen} variant="contained" color="primary">
                        Add New Recipe
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box className="modal-box">
                        <iframe
                            src="/Add"
                            title="Add New Recipe"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                            }}
                        ></iframe>
                    </Box>
                </Modal>
                <div className="recipe-table">
                    <RecipeTable />
                </div>
            </main>
        </div>
    );
};

export default AdminPage;