import type { Usuario,Trilha,Modulo,PrevisaoIA } from '../../types/tipoDashboard'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

// ============================================
// CONFIGURAÇÕES DE API
// ============================================

const BACKEND_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const FLASK_API = import.meta.env.VITE_FLASK_API || 'https://leme-ia.onrender.com';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Home() {
  const navigate = useNavigate();
  
  // Estados
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [trilhaAtual, setTrilhaAtual] = useState<Trilha | null>(null);
  const [modulosTrilha, setModulosTrilha] = useState<Modulo[]>([]);
  const [progressosConcluidos, setProgressosConcluidos] = useState<string[]>([]);
  const [previsao, setPrevisao] = useState<PrevisaoIA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flaskOnline, setFlaskOnline] = useState(false);

  // ============================================
  // CARREGAR DASHBOARD
  // ============================================

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. EXTRAIR USER ID DO JWT
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/entrar');
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub || payload.userId || payload.id;
      
      console.log('🔑 User ID extraído:', userId);

      // 2. BUSCAR DADOS DO USUÁRIO (Backend Java)
      console.log('📡 Buscando dados do usuário...');
      const resUsuario = await fetch(`${BACKEND_API}/usuario/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!resUsuario.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      
      const dadosUsuario: Usuario = await resUsuario.json();
      setUsuario(dadosUsuario);
      console.log('✅ Usuário carregado:', dadosUsuario.nome);

      // 3. CALCULAR DIAS NA PLATAFORMA
      const diasPlataforma = calcularDiasDesde(dadosUsuario.dataCadastro);
      console.log('📅 Dias na plataforma:', diasPlataforma);

      // 4. VERIFICAR SAÚDE DA API FLASK
      try {
        const healthRes = await fetch(`${FLASK_API}/health`);
        setFlaskOnline(healthRes.ok);
      } catch {
        setFlaskOnline(false);
      }

      // 5. BUSCAR SUGESTÃO DA IA (Flask Render)
      console.log('🤖 Buscando sugestão da IA...');
      const resSugestao = await fetch(`${FLASK_API}/suggest_trilha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: dadosUsuario.area,
          acessibilidade: dadosUsuario.acessibilidade,
          modulos_concluidos: dadosUsuario.modulosConcluidos,
          tempo_plataforma_dias: diasPlataforma
        })
      });

      if (!resSugestao.ok) {
        throw new Error('Erro ao buscar sugestão da IA');
      }
      
      const { id_trilha } = await resSugestao.json();
      console.log('✅ Trilha sugerida:', id_trilha);

      // 6. BUSCAR DETALHES DA TRILHA (Backend Java)
      console.log('📚 Buscando detalhes da trilha...');
      const resTrilha = await fetch(`${BACKEND_API}/trilhas/${id_trilha}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!resTrilha.ok) {
        throw new Error(`Trilha ${id_trilha} não encontrada no banco`);
      }
      
      const dadosTrilha: Trilha = await resTrilha.json();
      setTrilhaAtual(dadosTrilha);
      console.log('✅ Trilha carregada:', dadosTrilha.titulo);

      // 7. BUSCAR MÓDULOS DA TRILHA
      console.log('📝 Buscando módulos da trilha...');
      const resModulos = await fetch(`${BACKEND_API}/modulos?trilha=${id_trilha}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!resModulos.ok) {
        throw new Error('Erro ao buscar módulos');
      }
      
      const modulos: Modulo[] = await resModulos.json();
      setModulosTrilha(modulos);
      console.log('✅ Módulos carregados:', modulos.length);

      // 8. BUSCAR PROGRESSOS DO USUÁRIO
      console.log('⏱️ Buscando progressos...');
      const resProgressos = await fetch(`${BACKEND_API}/progressos?usuario=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!resProgressos.ok) {
        throw new Error('Erro ao buscar progressos');
      }
      
      const progressos = await resProgressos.json();
      const idsModulosConcluidos = progressos.map((p: any) => p.idModulo);
      setProgressosConcluidos(idsModulosConcluidos);
      console.log('✅ Progressos carregados:', idsModulosConcluidos.length);

      // 9. BUSCAR PREVISÃO DE SUCESSO (Flask Render)
      console.log('🎯 Buscando previsão de sucesso...');
      const resPrevisao = await fetch(`${FLASK_API}/predict_sucesso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: dadosUsuario.area,
          acessibilidade: dadosUsuario.acessibilidade,
          modulos_concluidos: dadosUsuario.modulosConcluidos,
          tempo_plataforma_dias: diasPlataforma
        })
      });

      if (!resPrevisao.ok) {
        throw new Error('Erro ao buscar previsão');
      }
      
      const dadosPrevisao: PrevisaoIA = await resPrevisao.json();
      setPrevisao(dadosPrevisao);
      console.log('✅ Previsão carregada:', dadosPrevisao.taxa_sucesso);

      console.log('🎉 Dashboard carregado com sucesso!');

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar dashboard';
      setError(message);
      console.error('❌ Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FUNÇÕES AUXILIARES
  // ============================================

  const calcularDiasDesde = (dataCadastro: string): number => {
    const hoje = new Date();
    const cadastro = new Date(dataCadastro);
    const diffTime = Math.abs(hoje.getTime() - cadastro.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calcularProgresso = (): number => {
    if (modulosTrilha.length === 0) return 0;
    return Math.round((progressosConcluidos.length / modulosTrilha.length) * 100);
  };

  const obterProximoModulo = (): Modulo | null => {
    return modulosTrilha.find(m => !progressosConcluidos.includes(m.id)) || null;
  };

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

  // ============================================
  // RENDERIZAÇÃO - LOADING
  // ============================================

  if (loading) {
    return (
      <>
        <Header visivel={false} />
        <main className="dashboard-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando seu dashboard personalizado...</p>
            {!flaskOnline && (
              <p className="loading-hint">
                ⏳ API de IA está inicializando (pode levar ~30s)
              </p>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ============================================
  // RENDERIZAÇÃO - ERRO
  // ============================================

  if (error) {
    return (
      <>
        <Header visivel={false} />
        <main className="dashboard-container">
          <div className="error-container">
            <h2>❌ Erro ao carregar dashboard</h2>
            <p>{error}</p>
            <button onClick={carregarDashboard} className="btn-retry">
              Tentar Novamente
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ============================================
  // RENDERIZAÇÃO - DASHBOARD
  // ============================================

  const progresso = calcularProgresso();
  const proximoModulo = obterProximoModulo();
  const modulosRestantes = modulosTrilha.length - progressosConcluidos.length;

  return (
    <>
      <Header visivel={false} />
      
      <main className="dashboard-container">
        <h1 className="dashboard-title">DASHBOARD</h1>

        {/* CARD DA TRILHA ATUAL */}
        {trilhaAtual && usuario && (
          <div className="trilha-card">
            <p className="trilha-subtitle">Continue de onde parou</p>
            <h2 className="trilha-etapa">
              ETAPA {String(progressosConcluidos.length + 1).padStart(2, '0')}
            </h2>
            
            {/* Barra de Progresso */}
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            
            <p className="trilha-nome">{trilhaAtual.titulo}</p>
            <p className="trilha-descricao">{trilhaAtual.descricao}</p>
            
            {/* Estatísticas */}
            <div className="trilha-stats">
              <div className="stat-item">
                <span className="stat-label">Progresso</span>
                <span className="stat-value">{progresso}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Módulos Restantes</span>
                <span className="stat-value">{modulosRestantes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">XP Total</span>
                <span className="stat-value">{usuario.xpTotal}</span>
              </div>
            </div>

            {/* Previsão de Sucesso da IA */}
            {previsao && (
              <div className="previsao-sucesso">
                <div className="previsao-badge">
                  <span className="previsao-label">Taxa de Sucesso Prevista (IA)</span>
                  <span className={`previsao-valor categoria-${previsao.categoria}`}>
                    {(previsao.taxa_sucesso * 100).toFixed(0)}%
                  </span>
                </div>
                <span className={`categoria-tag categoria-${previsao.categoria}`}>
                  {previsao.categoria.toUpperCase()}
                </span>
              </div>
            )}

            <button 
              className="btn-continuar" 
              onClick={() => proximoModulo && navigate(`/modulos/${proximoModulo.id}`)}
              disabled={!proximoModulo}
            >
              {proximoModulo ? 'Continuar Trilha →' : '✅ Trilha Concluída!'}
            </button>
          </div>
        )}

        {/* PRÓXIMO MÓDULO EM DESTAQUE */}
        {proximoModulo && (
          <section className="proximo-modulo-section">
            <h2 className="section-title">📚 Próximo Módulo</h2>
            <div className="modulo-card-destaque">
              <div className="modulo-icon">
                {getTipoIcon(proximoModulo.tipo)}
              </div>
              <div className="modulo-content">
                <h3>{proximoModulo.titulo}</h3>
                <p className="modulo-descricao">{proximoModulo.descricao}</p>
                <div className="modulo-meta">
                  <span className="modulo-tipo">{proximoModulo.tipo}</span>
                  <span className="modulo-xp">+{proximoModulo.xpRecompensa} XP</span>
                  {proximoModulo.adaptacaoNecessaria !== 'nenhuma' && (
                    <span className="modulo-adaptacao">
                      ♿ {proximoModulo.adaptacaoNecessaria}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="btn-iniciar"
                onClick={() => navigate(`/modulos/${proximoModulo.id}`)}
              >
                Iniciar
              </button>
            </div>
          </section>
        )}

        {/* SEÇÃO DE RECOMENDADOS */}
        <section className="recomendacoes-section">
          <h2 className="section-title">Recomendados</h2>
          <div className="recomendacoes-grid">
            {modulosTrilha
              .filter(m => !progressosConcluidos.includes(m.id))
              .slice(1, 4) // Pula o primeiro (já mostrado acima)
              .map((modulo) => (
                <div 
                  key={modulo.id} 
                  className="recomendacao-card"
                  onClick={() => navigate(`/modulos/${modulo.id}`)}
                >
                  <div className="recomendacao-icon">
                    {getTipoIcon(modulo.tipo)}
                  </div>
                  <div className="recomendacao-content">
                    <h3>{modulo.titulo}</h3>
                    <p className="recomendacao-tipo">{modulo.tipo}</p>
                    <span className="recomendacao-status">Não iniciado</span>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Mensagem se não houver recomendações */}
          {modulosTrilha.filter(m => !progressosConcluidos.includes(m.id)).length <= 1 && (
            <div className="recomendacoes-empty">
              <p>🎉 Parabéns! Você está quase concluindo esta trilha!</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}