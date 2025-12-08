// Função para pegar a data atual formatada
const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString('pt-BR');
};

// --- CONFIGURAÇÃO ---
// COLE AQUI A SUA URL DO PANTRY (A mesma do App.jsx)
// Exemplo: 'https://getpantry.cloud/apiv1/pantry/SEU_ID_AQUI/basket/favoritos'
const PANTRY_URL = 'https://getpantry.cloud/apiv1/pantry/eafd54ee-ea00-4501-8a1d-e6e2fc4a9e42/basket/favoritos'; 

function createFloatingButton() {
  const button = document.createElement("button");
  button.innerText = "💾 Salvar no Caçador";
  button.id = "btn-save-game-extension";
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    padding: 10px 20px;
    background-color: #7c3aed;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  `;
  button.addEventListener("click", handleSaveGame);
  document.body.appendChild(button);
}

async function handleSaveGame() {
  const btn = document.getElementById("btn-save-game-extension");
  btn.innerText = "⏳ Lendo...";
  btn.disabled = true;

  try {
    // --- 1. CAPTURA DOS DADOS (Mantive sua lógica original que está ótima) ---
    let price = "R$ 0,00";
    const priceContainer = document.getElementById("price-box-container");
    
    if (priceContainer) {
      const candidates = Array.from(priceContainer.querySelectorAll('span, h2'));
      const priceElement = candidates.find(el => {
        const text = el.innerText;
        const style = window.getComputedStyle(el);
        const isStruckThrough = style.textDecorationLine.includes('line-through');
        return text.includes("R$") && 
               !text.toLowerCase().includes("x") && 
               !text.toLowerCase().includes("juros") &&
               !isStruckThrough;
      });

      if (priceElement) {
        price = priceElement.innerText;
      } else {
        let maxFontSize = 0;
        candidates.forEach(el => {
            if(el.innerText.includes("R$")) {
                const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
                if (fontSize > maxFontSize) {
                    maxFontSize = fontSize;
                    price = el.innerText;
                }
            }
        });
      }
    }

    let title = "Título não encontrado";
    const metaTitle = document.querySelector('meta[property="og:title"]');
    const spanTitle = document.querySelector('span.typo-title-medium');
    const h1 = document.querySelector('h1');

    if (metaTitle && metaTitle.content) title = metaTitle.content;
    else if (spanTitle) title = spanTitle.innerText;
    else if (h1) title = h1.innerText;

    const image = document.querySelector('meta[property="og:image"]')?.content || "";
    const link = window.location.href;

    // Objeto do novo jogo
    const newGame = {
      id: Date.now().toString(),
      title: title.trim(),
      price: price.trim(),
      image: image,
      link: link,
      date: getTodayDate()
    };

    // --- 2. LÓGICA DO PANTRY (MUDOU AQUI) ---
    
    // Passo A: Baixar a lista atual do Pantry
    console.log("Baixando lista atual...");
    const getResponse = await fetch(PANTRY_URL);
    
    if (!getResponse.ok) throw new Error("Erro ao conectar no Pantry");
    
    const data = await getResponse.json();
    const currentList = data.jogos || []; // Se não tiver nada, cria array vazio

    // Passo B: Adicionar o novo jogo na lista
    const updatedList = [...currentList, newGame];

    // Passo C: Salvar a lista atualizada de volta
    console.log("Salvando nova lista...", updatedList);
    
    const saveResponse = await fetch(PANTRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jogos: updatedList // Sobrescreve a chave "jogos" com a nova lista
      })
    });

    if (saveResponse.ok) {
      btn.innerText = "✅ Salvo!";
      btn.style.backgroundColor = "#22c55e"; 
    } else {
      throw new Error("Erro ao salvar no Pantry");
    }

  } catch (error) {
    console.error(error);
    btn.innerText = "Erro!";
    btn.style.backgroundColor = "#ef4444";
    alert("Erro: Verifique se a URL do Pantry está correta no código da extensão.");
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "💾 Salvar no Caçador";
      btn.style.backgroundColor = "#7c3aed";
    }, 3000);
  }
}

// Pequeno delay para garantir que a página carregou
setTimeout(createFloatingButton, 1000);