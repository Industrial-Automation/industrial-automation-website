import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthStateType } from 'src/reducers/auth';

import { Paths, Routes } from './routes';
import { ModalProvider, Modals } from './components/Modals';

function App() {
  const auth = useSelector<any>((state) => state.auth) as AuthStateType;

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn) {
      navigate(Paths.Main);
    }
  }, [auth.loggedIn, navigate]);

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
