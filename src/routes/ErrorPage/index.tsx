import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header visivel={true} />
      <main className="flex-grow flex flex-col items-center justify-center p-6 bg-cc-cinza">
        <section className="flex flex-col items-center justify-center min-w-[300px] w-[80vw] max-w-[1400px] min-h-[50vh] bg-white rounded-lg mx-auto py-10 px-4 shadow-xl">
          <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Página Não Encontrada</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Que pena! Nenhuma página com esse endereço... Por favor, verifique se digitou o endereço corretamente.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleGoHome}
          >
            Ir para a Página Inicial
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;
