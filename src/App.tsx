import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthStateType, fetchMe } from 'src/reducers/auth';

import { Paths, Routes } from './routes';
import { ModalProvider, Modals } from './components/Modals';

function App() {
  const auth = useSelector<any>((state) => state.auth) as AuthStateType;

  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedUser = async () => {
      const { data } = await fetchMe();

      if (data.user) {
        return;
      }

      navigate(Paths.Main, { replace: true });
    };

    if (!auth.user) {
      getLoggedUser();
    }
  }, [auth.user, navigate]);

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
