import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Content } from './components/Content';

export const Main = () => {
  return (
    <div className='flex h-screen flex-col justify-between bg-main-bg bg-cover bg-center bg-no-repeat px-10 py-3'>
      <Header />

      <Content />

      <Footer />
    </div>
  );
};

export default Main;
