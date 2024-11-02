import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from 'src/routes';
import { fetchLogout } from 'src/reducers/auth';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogout();

    navigate(Paths.Main, { replace: true });
  }, [navigate]);

  return <div className='text-main-white'>Sign Out</div>;
};

export default SignOut;
