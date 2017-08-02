import React from 'react';
import MenuToolbar from '../common/MenuToolbar';
import { Link } from 'react-router-dom';

const PatientsMenu = ({ match, routingManager }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    <MenuToolbar routingManager={routingManager} />
    <br />
    <h2>Patients</h2>
    <br />
    <Link to="/patients/1">Patient 1</Link>
    <br />
    <Link to="/patients/2">Patient 2</Link>
    <br />
    <Link to="/patients/3">Patient 3</Link>
  </div>
);

export default PatientsMenu;
