import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthStateType, fetchMe } from 'src/reducers/auth';

import { Paths, Routes } from './routes';
import { ModalProvider, Modals } from './components/Modals';

function App() {
  const { user } = useSelector<any>((state) => state.auth) as AuthStateType;

  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedUser = async () => {
      const { data } = await fetchMe();

      if (data.user) {
        return;
      }

      navigate(Paths.Main, { replace: true });
    };

    if (!user) {
      getLoggedUser();
    }
  }, [user, navigate]);

  return (
    <>
      <ModalProvider>
        <Routes />
        <Modals />
      </ModalProvider>
    </>
  );
}

export default App;
