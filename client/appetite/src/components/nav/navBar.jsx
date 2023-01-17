import React from 'react';
import {  NavLink } from 'react-router-dom';

const NavBar = ({navtype='', exitClear=f=>f}) => {
    return ( <nav className='navBar'>
        {navtype === ''?
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" 
            to="/home" end>
                <div>Home</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" 
            to="/search">
                <div>Search</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" 
            to="/wishList">
                <div>Wish List</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" onClick={exitClear}
            to="/" end>
                <div>Exit</div>
            </NavLink>
        </div>
        :
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" 
            to="/admin" end>
                <div>Restaurant List</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" 
            to="/addRes">
                <div>Add Restaurants</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link" onClick={exitClear}
            to="/" end>
                <div>Exit</div>
            </NavLink>
        </div>}
    </nav> );
}
 
export default NavBar;