import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header visivel={true} />
      <main className="flex items-center justify-center bg-cc-cinza p-4">
        <section className="w-full max-w-2xl rounded-lg bg-white p-6 text-center shadow-xl sm:p-10">
          <h1 className="mb-2 titul-1 text-6xl font-extrabold text-purple-800 md:text-8xl">404</h1>
          <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">Página Não Encontrada</h2>
          <p className="mb-8 text-base text-slate-600 md:text-lg">
            Que pena! Nenhuma página com esse endereço... Por favor, verifique se digitou o endereço corretamente.
          </p>
          <button
            className="botao-md"
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
