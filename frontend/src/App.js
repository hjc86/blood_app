import React from 'react';

import NavBar from './components/navbar';
import Login from './components/login';
import Donor from './components/donor';
import Clinic from './components/clinic';

function App() {
    return (
      <div>
        < NavBar />
        < Login />
        < Donor />
        < Clinic />
      </div>
    );
}

export default App;
