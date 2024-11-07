import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function PrivateRoute({ children }) {
  const { user, profileStatus } = useSelector(state => state.auth);
  if (profileStatus === 'loading') {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to='/login' replace />;
}
