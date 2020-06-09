import React from 'react';

class NavBar extends React.Component {    

    render() {
        return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#"> RED CELLS</a>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                        <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                </div>
                </nav>
        )
    }
}


export default NavBar;