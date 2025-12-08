import { useState, useEffect } from 'react';
import { RefreshCw, ShoppingBag, Gamepad2 } from 'lucide-react';
import GameCard from './components/GameCard';
import './App.css'; 

function App() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const carregarJogos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Não foi possível conectar ao servidor.');
      }
      const data = await response.json();
      
      // 2. MUDANÇA: O Pantry retorna um objeto { jogos: [...] }
      // Se a lista "jogos" não existir ainda, usamos um array vazio []
      const listaDeJogos = data.jogos || [];
      
      setJogos(listaDeJogos.reverse());
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao Pantry. Verifique sua internet ou a URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

  const deletarJogo = async (id) => {
    if (!confirm("Tem certeza que deseja remover este jogo da lista?")) return;

    try {
      // 3. MUDANÇA: No Pantry, não dá pra deletar por ID na URL.
      // A estratégia é: Criar a nova lista sem o item e salvar tudo de novo.
      
      const novaLista = jogos.filter(jogo => jogo.id !== id);

      // Atualizamos o visual imediatamente para ficar rápido
      setJogos(novaLista); 

      // Enviamos a nova lista completa para o Pantry
      await fetch(API_URL, {
        method: 'POST', // O Pantry usa POST para atualizar/mesclar dados
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jogos: novaLista // Enviamos o objeto com a chave "jogos" atualizada
        })
      });

    } catch (err) {
      alert("Erro ao sincronizar a deleção com o servidor.");
      // Se der erro, recarregamos a lista original para não ficar inconsistente
      carregarJogos();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-area">
          <div className="icon-box">
            <Gamepad2 size={32} color="#fff" />
          </div>
          <div>
            <h1>Caçador de Jogos</h1>
            <p>Monitorando preços de PS4/PS5</p>
          </div>
        </div>
        
        <button onClick={carregarJogos} className="btn-refresh" disabled={loading}>
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          {loading ? "Atualizando..." : "Atualizar Lista"}
        </button>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && jogos.length === 0 && (
        <div className="empty-state">
          <ShoppingBag size={64} style={{ opacity: 0.5 }} />
          <h3>Sua lista está vazia</h3>
          <p>Seus jogos salvos aparecerão aqui.</p>
        </div>
      )}

      <div className="games-grid">
        {jogos.map((jogo) => (
          <GameCard 
            key={jogo.id} 
            jogo={jogo} 
            onDelete={deletarJogo} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;