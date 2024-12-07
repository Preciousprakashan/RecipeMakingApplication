import React, { useState } from 'react';
import RecipeTable from '../components/DbRecipeTable/RecipeTable';
import '../components/DbRecipeTable/RecipeTable.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`manage-recipes ${isSidebarOpen ? '' : 'collapsed-sidebar'}`}>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="profile">
                    <div className="avatar"></div>
                    <h3>John</h3>
                    <p>Admin</p>
                </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li className="active">Manage recipes</li>
                        <li>Settings</li>
                    </ul>
                </nav>
                <button className="logout">Logout</button>
            </aside>

            <main className="content">
                <header className="header">
                    <div className="menu-toggle">
                        {isSidebarOpen ? (
                            <CloseIcon onClick={toggleSidebar} />
                        ) : (
                            <MenuIcon onClick={toggleSidebar} />
                        )}
                    </div>
                    <h1>Recipe List</h1>
                    <Button onClick={handleOpen} variant="contained" color="primary">
                        Add New Recipe
                    </Button>
                </header>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box className="modal-box">
                        <iframe
                            src="/Add" // Replace with your URL
                            title="Add New Recipe"
                            style={{ width: '100%', height: '100%', border: 'none' }}
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