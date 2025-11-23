import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Sugestao } from '../../types/tipoDashboard'
import type { ProgressoTrilha } from '../../types/tipoDashboard'
import type { Trilha } from '../../types/tipoTrilhas'
import type { Modulo } from '../../types/tipoTrilhas'

const BACKEND_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// ============================================
// COMPONENTE
// ============================================

export default function Home() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  
  // Estados
  const [trilha, setTrilha] = useState<Trilha | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [progresso, setProgresso] = useState<ProgressoTrilha | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (usuario) {
      carregarDashboard();
    }
  }, [usuario]);

  // ============================================
  // CARREGAR DASHBOARD
  // ============================================

  const carregarDashboard = async () => {
    if (!usuario) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      // ============================================
      // 1. CRIAR/BUSCAR SUGESTÃO (retorna idModulo)
      // ============================================
      const resSugestao = await fetch(
        `${BACKEND_API}/sugestoes/${usuario.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            area: usuario.area,
            acessibilidade: usuario.acessibilidade,
            modulos_concluidos: usuario.modulosConcluidos,
            tempo_plataforma_dias: usuario.tempoPlataformaDias
          })
        }
      );

      if (!resSugestao.ok) throw new Error('Erro ao criar sugestão');
      
      const dadosSugestao: Sugestao = await resSugestao.json();

      // ============================================
      // 2. BUSCAR MÓDULO SUGERIDO
      // ============================================
      const resModulo = await fetch(
        `${BACKEND_API}/modulos/${dadosSugestao.idModulo}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (!resModulo.ok) throw new Error('Módulo não encontrado');
      
      const moduloSugerido: Modulo = await resModulo.json();

      // ============================================
      // 3. BUSCAR TRILHA (usando idTrilha do módulo)
      // ============================================
      const resTrilha = await fetch(
        `${BACKEND_API}/trilhas/${moduloSugerido.idTrilha}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (!resTrilha.ok) throw new Error('Trilha não encontrada');
      
      const dadosTrilha: Trilha = await resTrilha.json();
      setTrilha(dadosTrilha);

      // ============================================
      // 4. BUSCAR TODOS MÓDULOS DA TRILHA
      // ============================================

      const resModulos = await fetch(
        `${BACKEND_API}/modulos?trilha=${moduloSugerido.idTrilha}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (!resModulos.ok) throw new Error('Erro ao buscar módulos');
      
      const todosModulos: Modulo[] = await resModulos.json();
      setModulos(todosModulos);

      // ============================================
      // 5. CALCULAR PROGRESSO
      // ============================================
      const resProgresso = await fetch(
        `${BACKEND_API}/progressos/trilha/${moduloSugerido.idTrilha}/usuario/${usuario.id}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (!resProgresso.ok) throw new Error('Erro ao calcular progresso');
      
      const dadosProgresso: ProgressoTrilha = await resProgresso.json();
      setProgresso(dadosProgresso);
      console.log('✅ Progresso:', `${dadosProgresso.percentual}%`);

      // ============================================
      // 6. CRIAR PREVISÃO (204 No Content)
      // ============================================
      
      console.log('🎯 Salvando previsão...');
      await fetch(
        `${BACKEND_API}/previsoes/${usuario.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            area: usuario.area,
            acessibilidade: usuario.acessibilidade,
            modulos_concluidos: usuario.modulosConcluidos,
            tempo_plataforma_dias: usuario.tempoPlataformaDias
          })
        }
      );

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      console.error('❌ Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FUNÇÕES AUXILIARES
  // ============================================

  const getTipoIcon = (tipo: string): string => {
    const icons: Record<string, string> = {
      'video': '🎥',
      'texto': '📄',
      'quiz': '❓',
      'pratica': '💻',
      'podcast': '🎙️',
    };
    return icons[tipo.toLowerCase()] || '📚';
  };

  const proximoModulo = modulos.find(
    m => !progresso?.idsModulosConcluidos.includes(m.id)
  ) || null;

  const modulosRecomendados = modulos
    .filter(m => !progresso?.idsModulosConcluidos.includes(m.id))
    .slice(0, 5);

  // ============================================
  // LOADING STATE
  // ============================================

  if (loading) {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Carregando seu dashboard personalizado...</p>
              <p className="text-gray-400 text-sm mt-2">Aguarde enquanto buscamos sua trilha ideal</p>
            </div>
          </div>
        </main>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================

  if (error) {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold text-red-800 mb-2">❌ Erro ao carregar dashboard</h2>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={carregarDashboard}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          </div>
        </main>
    );
  }

  // ============================================
  // DASHBOARD
  // ============================================

  if (usuario){
  return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">DASHBOARD</h1>
            <div className="flex flex-col items-end gap-1">
              <span className="text-gray-600">Olá! 👋</span>
              <span className="text-xl font-bold text-purple-600">{usuario.modulosConcluidos} módulos</span>
            </div>
          </div>

          {/* CARD TRILHA ATUAL */}
          {trilha && progresso && (
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-2xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden">
              {/* Background decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative z-10">
                <p className="text-sm uppercase tracking-wider opacity-90 mb-2">Continue de onde parou</p>
                <h2 className="text-4xl font-black mb-6 tracking-tight">
                  ETAPA {String(progresso.modulosConcluidos + 1).padStart(2, '0')}
                </h2>
                
                {/* Barra de Progresso */}
                <div className="w-full bg-white/20 rounded-full h-4 mb-6 overflow-hidden backdrop-blur-sm">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{ width: `${progresso.percentual}%` }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{trilha.titulo}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">{trilha.descricao}</p>
                
                {/* Estatísticas */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Progresso</p>
                    <p className="text-3xl font-black">{progresso.percentual}%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Restantes</p>
                    <p className="text-3xl font-black">{progresso.totalModulos - progresso.modulosConcluidos}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Total</p>
                    <p className="text-3xl font-black">{progresso.totalModulos}</p>
                  </div>
                </div>

                {/* Botão */}
                {proximoModulo ? (
                  <Link to = {`/trilhas/${proximoModulo.idTrilha}/${proximoModulo.titulo}`}
                    className="w-full bg-white text-purple-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition transform hover:scale-105 shadow-xl"
                  >
                    Continuar Trilha →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-white/20 text-white font-bold py-4 px-6 rounded-xl cursor-not-allowed"
                  >
                    ✅ Trilha Concluída!
                  </button>
                )}
              </div>
            </div>
          )}

          {/* RECOMENDADOS */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Recomendados para Você</h2>
            
            {modulosRecomendados.length > 0 ? (
              <div className="space-y-4">
                {modulosRecomendados.map((modulo, index) => (
                  <Link
                    key={index}
                    to={`/trilhas/${modulo.idTrilha}/${modulo.titulo}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex items-center gap-6 group block" 
                   >
                    {/* Ícone */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition">
                      {getTipoIcon(modulo.tipo)}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                        {modulo.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {modulo.descricao}
                      </p>
                      
                      {/* Badges */}
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                          {modulo.tipo}
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          +{modulo.xpRecompensa} XP
                        </span>
                        {modulo.adaptacaoNecessaria !== 'nenhuma' && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            ♿ {modulo.adaptacaoNecessaria}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Indicador */}
                    <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-xl group-hover:bg-purple-100 transition">
                      🔗
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">🎉 Parabéns! Você concluiu todos os módulos!</p>
                <button
                  onClick={() => navigate('/trilhas')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Explorar Novas Trilhas
                </button>
              </div>
            )}
          </section>

          {/* INFO CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Sua Área</p>
                <p className="text-lg font-bold text-gray-900">{usuario.area}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-4xl">♿</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Acessibilidade</p>
                <p className="text-lg font-bold text-gray-900">
                  {usuario.acessibilidade === 'nenhuma' ? 'Padrão' : usuario.acessibilidade}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-4xl">📊</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Dias na Plataforma</p>
                <p className="text-lg font-bold text-gray-900">{usuario.tempoPlataformaDias} dias</p>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
}