import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';
import { ModalProvider, Modals } from './components/Modals';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ModalProvider>
          <Routes />
          <Modals />
        </ModalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
