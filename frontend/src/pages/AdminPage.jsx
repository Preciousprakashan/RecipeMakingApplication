import React from 'react';
import RecipeTable from '../components/DbRecipeTable/RecipeTable';
import '../components/DbRecipeTable/RecipeTable.css';

const AdminPage = () => {

    const recipes = [
        { name: 'Salad', time: '10 min', likes: 60 },
        { name: 'Soup', time: '30 min', likes: 50 },
    ];

    return (
        <div className="manage-recipes">
            <aside className="sidebar">
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
                <header>
                    <h1>Recipe List</h1>
                    <button className="add-recipe-btn">Add New Recipe</button>
                </header>
                <div className='recipe-table'>
                    <RecipeTable />
                </div>



            </main>
        </div>
    );
};

export default AdminPage;
