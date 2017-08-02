import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';
import MenuToolbar from '../../common/MenuToolbar';

const activeAllergiesMenu = path => (
  ({ match, location, routingManager }) => (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuchsia' }}>
      <MenuToolbar routingManager={routingManager} />
      <br />
      <h2>Active Allergies</h2>
      <hr />
      <p>The ActiveAllergiesMenu uses location state to change the sort type. The URL does not change, and no new history entry is created.</p>
      <br />
      <p>This state is not persisted between navigations.</p>
      <hr />
      <Link
        replace
        to={{
          pathname: `${path}`,
          state: { sort: 'alpha' },
        }}
      >
        <Button text="Sort" isDisabled={location.state && location.state.sort === 'alpha'} />
      </Link>
      <Link
        replace
        to={{
          pathname: `${path}`,
          state: { sort: 'reverse_alpha' },
        }}
      >
        <Button text="Reverse Sort" isDisabled={location.state && location.state.sort === 'reverse_alpha'} />
      </Link>
    </div>
  )
);

// const ActiveAllergiesMenu = ({ match, location, routingManager }) => {
//   return (
//     <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuchsia' }}>
//       <MenuToolbar routingManager={routingManager} />
//       <hr />
//       <p>The ActiveAllergiesMenu uses location state to change the sort type. The URL does not change, and no new history entry is created.</p>
//       <br />
//       <p>This state is not persisted between navigations.</p>
//       <hr />
//       <Link
//         replace
//         to={{
//           pathname: '/allergies/active',
//           state: { sort: 'alpha' },
//         }}
//       >
//         <Button text="Sort" isDisabled={location.state && location.state.sort === 'alpha'} />
//       </Link>
//       <Link
//         replace
//         to={{
//           pathname: '/allergies/active',
//           state: { sort: 'reverse_alpha' },
//         }}
//       >
//         <Button text="Reverse Sort" isDisabled={location.state && location.state.sort === 'reverse_alpha'} />
//       </Link>
//     </div>
//   );
// };

export default activeAllergiesMenu('/allergies/active');
export { activeAllergiesMenu };
