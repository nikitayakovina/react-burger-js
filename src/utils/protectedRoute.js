import { useLocation } from 'react-router-dom';

export const Protected = ({ onlyAuth = false, component }) => {
  const location = useLocation();
  console.log(onlyAuth);
  console.log(location);
  console.log(component);
};
