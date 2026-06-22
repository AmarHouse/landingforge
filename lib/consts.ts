export const defaultHTML = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <title>LandingForge — Documentação do Sistema</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      :root { --bg-primary: #0a0a0f; --bg-card: #12121a; --bg-card-hover: #1a1a25; --border: #1e1e2e; --text-primary: #f0f0f5; --text-secondary: #8888a0; --accent: #6366f1; --accent-glow: rgba(99,102,241,0.15); --green: #22c55e; --amber: #f59e0b; --rose: #f43f5e; }
      * { box-sizing: border-box; }
      body { font-family: 'Inter', sans-serif; background: var(--bg-primary); color: var(--text-primary); margin: 0; }
      .doc-section { display: none; }
      .doc-section.open { display: block; }
      .doc-toggle { cursor: pointer; transition: all 0.2s ease; }
      .doc-toggle:hover { background: var(--bg-card-hover); }
      .doc-toggle .arrow { transition: transform 0.2s ease; }
      .doc-toggle.open .arrow { transform: rotate(90deg); }
      code, pre { font-family: 'JetBrains Mono', monospace; }
      .gradient-text { background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow { box-shadow: 0 0 40px rgba(99,102,241,0.08); }
      .industry-tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 500; border: 1px solid var(--border); background: var(--bg-card); transition: all 0.15s ease; }
      .industry-tag:hover { border-color: var(--accent); background: var(--accent-glow); }
      .copy-btn { opacity: 0; transition: opacity 0.15s ease; }
      .code-block:hover .copy-btn { opacity: 1; }
      .copy-btn:active { transform: scale(0.95); }
      .stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; }
      .feature-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; transition: all 0.2s ease; }
      .feature-card:hover { border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); transform: translateY(-2px); }
      .step-num { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, var(--accent), #a855f7); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; flex-shrink: 0; }
    </style>
  </head>
  <body class="min-h-screen overflow-x-hidden">
    <div class="max-w-5xl mx-auto px-6 py-12 space-y-16">

      <!-- HERO -->
      <header class="text-center space-y-6 py-8">
        <div class="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-500/20">
          Documentação Oficial
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          <span class="gradient-text">LandingForge</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Gerador de landing pages profissionais com Inteligência Artificial.
          Descreva sua ideia — o sistema gera uma página completa, otimizada e pronta para deploy.
        </p>
        <div class="flex justify-center gap-3 pt-2">
          <span class="industry-tag">BYOK (Bring Your Own Key)</span>
          <span class="industry-tag">13+ Indústrias</span>
          <span class="industry-tag">Design Intelligence</span>
          <span class="industry-tag">AIDA Framework</span>
        </div>
      </header>

      <!-- STATS -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat-card"><div class="text-2xl font-bold gradient-text">13+</div><div class="text-sm text-slate-400 mt-1">Perfis de Indústria</div></div>
        <div class="stat-card"><div class="text-2xl font-bold gradient-text">50+</div><div class="text-sm text-slate-400 mt-1">Regras de Design</div></div>
        <div class="stat-card"><div class="text-2xl font-bold gradient-text">11</div><div class="text-sm text-slate-400 mt-1">Seções Obrigatórias</div></div>
        <div class="stat-card"><div class="text-2xl font-bold gradient-text">5</div><div class="text-sm text-slate-400 mt-1">Modelos IA Suportados</div></div>
      </div>

      <!-- COMO FUNCIONA -->
      <section>
        <h2 class="text-2xl font-bold mb-6">Como Funciona</h2>
        <div class="space-y-4">
          <div class="feature-card flex items-start gap-4">
            <div class="step-num">1</div>
            <div><h3 class="font-semibold text-lg mb-1">Configure seu provedor IA</h3><p class="text-slate-400 text-sm leading-relaxed">Abra as Configurações e insira seu endpoint, modelo e API key. Funciona com OpenAI, Ollama (local), LM Studio, vLLM, Groq, Together AI, SambaNova, Nebius, Hyperbolic e qualquer provedor compatível com a API OpenAI. Suas credenciais ficam salvas apenas no seu navegador (localStorage).</p></div>
          </div>
          <div class="feature-card flex items-start gap-4">
            <div class="step-num">2</div>
            <div><h3 class="font-semibold text-lg mb-1">Descreva sua landing page</h3><p class="text-slate-400 text-sm leading-relaxed">Digite uma descrição do site que deseja. O sistema detecta automaticamente a indústria (hotel, restaurante, SaaS, e-commerce, etc.), extrai contexto do negócio (nome, localização, contato) e enriquece o prompt com best practices específicas da área — tudo antes de enviar para a IA.</p></div>
          </div>
          <div class="feature-card flex items-start gap-4">
            <div class="step-num">3</div>
            <div><h3 class="font-semibold text-lg mb-1">IA gera + Review automático</h3><p class="text-slate-400 text-sm leading-relaxed">A IA gera o HTML completo via streaming (você vê o código sendo escrito em tempo real). Após a geração, um sistema de Review automático corrige problemas: meta tags ausentes, contraste de cores, imagens quebradas, links nav inválidos, e CSS moderno (2025). Tudo via SEARCH/REPLACE eficiente em tokens.</p></div>
          </div>
          <div class="feature-card flex items-start gap-4">
            <div class="step-num">4</div>
            <div><h3 class="font-semibold text-lg mb-1">Edite inline ou继续 via chat</h3><p class="text-slate-400 text-sm leading-relaxed">Clique em qualquer elemento no preview para editá-lo diretamente — via prompt de IA, edição HTML manual, ou regeneração. Use o chat para follow-ups com SEARCH/REPLACE patches (não reescreve o HTML inteiro). O modo Diff-Patch atualiza apenas as partes que mudaram.</p></div>
          </div>
        </div>
      </section>

      <!-- DESIGN INTELLIGENCE -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Design Intelligence</h2>
        <p class="text-slate-400 mb-6 text-sm">O sistema detecta automaticamente a indústria do prompt e aplica um perfil de design completo — paleta de cores, tipografia, padrões de landing page, best practices e anti-padrões.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="industry-tag justify-center py-3">Hotel / Pousada</div>
          <div class="industry-tag justify-center py-3">Restaurante / Café</div>
          <div class="industry-tag justify-center py-3">SaaS / Tech</div>
          <div class="industry-tag justify-center py-3">E-commerce</div>
          <div class="industry-tag justify-center py-3">Saúde / Clínica</div>
          <div class="industry-tag justify-center py-3">Fitness / Academia</div>
          <div class="industry-tag justify-center py-3">Agência / Criativo</div>
          <div class="industry-tag justify-center py-3">Financeiro</div>
          <div class="industry-tag justify-center py-3">Educação</div>
          <div class="industry-tag justify-center py-3">Imobiliário</div>
          <div class="industry-tag justify-center py-3">Viagem / Turismo</div>
          <div class="industry-tag justify-center py-3">Gaming / Esports</div>
          <div class="industry-tag justify-center py-3">Beleza / Spa</div>
        </div>
        <div class="mt-6 space-y-3 text-sm text-slate-400">
          <p><strong class="text-slate-300">Detecção automática:</strong> Analisa palavras-chave no prompt (pousada, restaurante, clínica, loja, academia...) com regex otimizada para acentos PT-BR.</p>
          <p><strong class="text-slate-300">Perfil por indústria:</strong> Paleta de cores (primary, secondary, accent), tipografia recomendada (Playfair + Inter para luxo, Space Grotesk + DM Sans para tech), e padrão de landing page específico.</p>
          <p><strong class="text-slate-300">Best Practices:</strong> 8 recomendações específicas por indústria (ex: hotel → mostrar tipos de quartos com fotos e preço; restaurante → horário de funcionamento e reservas em destaque).</p>
          <p><strong class="text-slate-300">Anti-padrões:</strong> Lista de erros comuns para cada área (ex: hotel → nunca usar "Basic/Pro/Enterprise" nos planos; restaurante → nunca usar emojis como ícones).</p>
        </div>
      </section>

      <!-- SEÇÕES OBRIGATÓRIAS -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Seções Obrigatórias</h2>
        <p class="text-slate-400 mb-6 text-sm">Toda landing page gerada inclui estas 11 seções (mínimo 500 linhas de HTML, 8-10 seções com conteúdo real):</p>
        <div class="space-y-2">
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">01</span><span class="font-medium">Fixed Navigation</span><span class="text-slate-500 ml-auto text-xs">Logo + nav links + CTA + hamburger</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">02</span><span class="font-medium">Hero Section</span><span class="text-slate-500 ml-auto text-xs">Fundo Pexels + overlay + headline + CTAs</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">03</span><span class="font-medium">About / Story</span><span class="text-slate-500 ml-auto text-xs">2-3 parágrafos + imagem Pexels</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">04</span><span class="font-medium">Features / Services</span><span class="text-slate-500 ml-auto text-xs">Grid 4-6 cards com fotos reais</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">05</span><span class="font-medium">How It Works</span><span class="text-slate-500 ml-auto text-xs">3-5 passos numerados</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">06</span><span class="font-medium">Testimonials</span><span class="text-slate-500 ml-auto text-xs">3-4 cards com estrelas e fotos</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">07</span><span class="font-medium">Stats / Números</span><span class="text-slate-500 ml-auto text-xs">4 contadores animados</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">08</span><span class="font-medium">Pricing / CTA</span><span class="text-slate-500 ml-auto text-xs">3 tiers ou banner CTA</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">09</span><span class="font-medium">FAQ</span><span class="text-slate-500 ml-auto text-xs">5-6 perguntas com accordion</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">10</span><span class="font-medium">Newsletter / CTA</span><span class="text-slate-500 ml-auto text-xs">Email signup com gradiente</span>
          </div>
          <div class="code-block bg-slate-800/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 border border-slate-700/30">
            <span class="text-indigo-400 font-mono w-6 text-center">11</span><span class="font-medium">Footer</span><span class="text-slate-500 ml-auto text-xs">4 colunas + copyright + social</span>
          </div>
        </div>
      </section>

      <!-- CONCEITOS DE LANDING PAGE -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Conceitos Aplicados</h2>
        <p class="text-slate-400 mb-6 text-sm">O sistema aplica princípios de design comportamental e conversão em todas as gerações:</p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Framework AIDA</h3>
            <p class="text-slate-400 text-sm">Atenção (Hero) → Interesse (Features) → Desejo (Social Proof) → Ação (CTA). Cada seção aumenta a jornada psicológica do visitante.</p>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Design Centrado em Conversão</h3>
            <p class="text-slate-400 text-sm">Uma CTA principal por viewport (Hick's Law). O CTA é o maior elemento interativo da seção (Fitts's Law). Cada seção ganha o direito ao próximo scroll.</p>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Princípios Gestalt</h3>
            <p class="text-slate-400 text-sm">Proximidade (elementos relacionados juntos), Similaridade (cards idênticos), Figure-Ground (overlay escuro no hero), Continuidade (setas guiando o olhar).</p>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Design de Confiança (Cialdini)</h3>
            <p class="text-slate-400 text-sm">Autoridade (credenciais), Prova Social (depoimentos reais), Consenso ("10.000+ clientes"), Reciprocidade (valor antes de pedir), Consistência (design uniforme).</p>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Design Emocional (Don Norman)</h3>
            <p class="text-slate-400 text-sm">Visceral (beleza visual em 0.5s), Comportamental (facilidade de uso), Reflexivo (memória da marca). A página toca os 3 níveis.</p>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold text-indigo-400 mb-2">Motion Design (Disney)</h3>
            <p class="text-slate-400 text-sm">Ease-in-out em tudo. Staggered reveals (100-200ms entre elementos). Anticipation antes de seções grandes. Overshoot-and-settle sutil.</p>
          </div>
        </div>
      </section>

      <!-- SISTEMA DE PROMPTS -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Sistema de Prompts</h2>
        <p class="text-slate-400 mb-6 text-sm">Pipeline de 3 camadas que transforma o prompt do usuário em HTML profissional:</p>
        <div class="space-y-4">
          <div class="feature-card">
            <h3 class="font-semibold mb-2">1. Prompt Enhancer (determinístico, sem IA)</h3>
            <ul class="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>Limpa ruído e normaliza o texto (remove "por favor", "obrigado", etc.)</li>
              <li>Extrai contexto: nome do negócio, localização, telefone, email, WhatsApp</li>
              <li>Detecta idioma (PT/EN/ES) e instrui a IA a gerar conteúdo no idioma correto</li>
              <li>Injeta 8 best practices da indústria detectada</li>
              <li>Adiciona seções recomendadas que o usuário não mencionou (FAQ, pricing, etc.)</li>
            </ul>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold mb-2">2. System Prompt (50+ regras)</h3>
            <ul class="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>Modo Classic (direto) ou Enhanced (com planejamento prévio)</li>
              <li>Regras críticas: hamburger menu, contraste WCAG AA, opacity fallback, Tailwind loading</li>
              <li>Design Excellence: tipografia, espaçamento, cores, botões, cards — barra de qualidade profissional</li>
              <li>Injeção automática de referência de design da indústria + anti-slop</li>
            </ul>
          </div>
          <div class="feature-card">
            <h3 class="font-semibold mb-2">3. Review & Fix (pós-geração)</h3>
            <ul class="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>fixTruncatedHtml: fecha tags unclosed (script, body, html) — sem custo de API</li>
              <li>injectModernCSSFallback: CSS 2025 (scroll animations, reduced motion) — sem custo de API</li>
              <li>Validação inteligente: verifica meta tags, contraste, imagens, links nav, seções</li>
              <li>Review via SEARCH/REPLACE: corrige issues específicas sem reescrever o HTML inteiro</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- MODOS DE GERAÇÃO -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Modos de Geração</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="feature-card">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">CLASSIC</span>
            </div>
            <h3 class="font-semibold mb-2">Geração Direta</h3>
            <p class="text-slate-400 text-sm">Envia o prompt direto para a IA com o system prompt completo. Rápido e direto ao ponto. Melhor para prompts simples e descritivos.</p>
          </div>
          <div class="feature-card">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">ENHANCED</span>
            </div>
            <h3 class="font-semibold mb-2">Com Planejamento</h3>
            <p class="text-slate-400 text-sm">O system prompt instrui a IA a pensar estrategicamente antes de executar. Gera landing pages mais elaboradas com mais detalhes e seções ricas.</p>
          </div>
        </div>
        <div class="mt-4 feature-card">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">DIFF-PATCH</span>
          </div>
          <h3 class="font-semibold mb-2">Edição por SEARCH/REPLACE</h3>
          <p class="text-slate-400 text-sm">Para follow-ups e edits: a IA retorna apenas os blocos de código que mudaram (formato SEARCH/REPLACE), não o HTML inteiro. Muito mais eficiente em tokens. Ative o checkbox "Diff-Patch Update" no chat.</p>
        </div>
      </section>

      <!-- PROVEDORES IA -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Provedores IA Suportados</h2>
        <p class="text-slate-400 mb-4 text-sm">BYOK (Bring Your Own Key) — use seu próprio provedor e chave de API:</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="border-b border-slate-700/50 text-left">
                <th class="py-3 px-4 text-slate-300 font-semibold">Provedor</th>
                <th class="py-3 px-4 text-slate-300 font-semibold">Max Tokens</th>
                <th class="py-3 px-4 text-slate-300 font-semibold">Modelos</th>
              </tr>
            </thead>
            <tbody class="text-slate-400">
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">Fireworks AI</td><td class="py-3 px-4">131K</td><td class="py-3 px-4">DeepSeek V3, V3.1</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">Nebius AI Studio</td><td class="py-3 px-4">131K</td><td class="py-3 px-4">DeepSeek V3, R1</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">SambaNova</td><td class="py-3 px-4">32K</td><td class="py-3 px-4">DeepSeek V3, R1</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">NovitaAI</td><td class="py-3 px-4">16K-131K</td><td class="py-3 px-4">DeepSeek V3, R1, Qwen3 Coder</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">Hyperbolic</td><td class="py-3 px-4">131K</td><td class="py-3 px-4">DeepSeek V3, Qwen3 Coder</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">Together AI</td><td class="py-3 px-4">128K</td><td class="py-3 px-4">DeepSeek R1, Kimi K2</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">Groq</td><td class="py-3 px-4">16K</td><td class="py-3 px-4">Kimi K2</td></tr>
              <tr class="border-b border-slate-800/50"><td class="py-3 px-4">OpenAI</td><td class="py-3 px-4">128K</td><td class="py-3 px-4">GPT-4o, GPT-4.1</td></tr>
              <tr><td class="py-3 px-4">Ollama (local)</td><td class="py-3 px-4">Variável</td><td class="py-3 px-4">Llama3, DeepSeek, etc.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- REGRAS CRÍTICAS -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Regras Críticas (anti-bugs)</h2>
        <p class="text-slate-400 mb-6 text-sm">Regras injetadas em cada geração para prevenir os bugs mais comuns:</p>
        <div class="space-y-3">
          <details class="bg-slate-800/30 rounded-lg border border-slate-700/30 overflow-hidden" name="faq">
            <summary class="px-4 py-3 cursor-pointer text-sm font-medium hover:bg-slate-800/50 transition-colors">Bug do Hamburger Menu</summary>
            <div class="px-4 pb-3 text-sm text-slate-400 border-t border-slate-700/30 pt-3">Tailwind CDN deve ser carregado NO HEAD, antes dos style tags. O hamburger deve ser sibling direto do nav (não filho). CSS media query para mobile. Se carregar Tailwind via JS no final do body, o menu aparece abaixo do header.</div>
          </details>
          <details class="bg-slate-800/30 rounded-lg border border-slate-700/30 overflow-hidden" name="faq">
            <summary class="px-4 py-3 cursor-pointer text-sm font-medium hover:bg-slate-800/50 transition-colors">Conteúdo Invisível (opacity:0)</summary>
            <div class="px-4 pb-3 text-sm text-slate-400 border-t border-slate-700/30 pt-3">Nunca definir opacity:0 em todo o conteúdo via JS como estado inicial. Se JS falhar, o usuário vê nada. Usar CSS animation-timeline ou garantir fallback com opacity:1.</div>
          </details>
          <details class="bg-slate-800/30 rounded-lg border border-slate-700/30 overflow-hidden" name="faq">
            <summary class="px-4 py-3 cursor-pointer text-sm font-medium hover:bg-slate-800/50 transition-colors">Contraste de Cores (WCAG AA)</summary>
            <div class="px-4 pb-3 text-sm text-slate-400 border-t border-slate-700/30 pt-3">Texto deve ter contraste mínimo 4.5:1. Em fundos claros (branco, creme, pastel), usar texto escuro. Em fundos escuros, usar texto claro. Botões rosa/dourados com texto branco = FALHA.</div>
          </details>
          <details class="bg-slate-800/30 rounded-lg border border-slate-700/30 overflow-hidden" name="faq">
            <summary class="px-4 py-3 cursor-pointer text-sm font-medium hover:bg-slate-800/50 transition-colors">Header Transparente</summary>
            <div class="px-4 pb-3 text-sm text-slate-400 border-t border-slate-700/30 pt-3">O header NUNCA deve ter fundo transparente. Usar bg-white/95 backdrop-blur-md (light) ou bg-gray-900/90 (dark). Fundo transparente faz o texto da nav sobrepor o hero.</div>
          </details>
          <details class="bg-slate-800/30 rounded-lg border border-slate-700/30 overflow-hidden" name="faq">
            <summary class="px-4 py-3 cursor-pointer text-sm font-medium hover:bg-slate-800/50 transition-colors">Imagens placeholder</summary>
            <div class="px-4 pb-3 text-sm text-slate-400 border-t border-slate-700/30 pt-3">Nunca usar placehold.co. Sempre usar imagens reais do Pexels com URL no formato: https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w={WIDTH}&dpr=1</div>
          </details>
        </div>
      </section>

      <!-- INLINE EDITING -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Inline Editing</h2>
        <p class="text-slate-400 mb-4 text-sm">Clique em qualquer elemento no preview para editá-lo diretamente:</p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="feature-card text-center">
            <div class="text-2xl mb-2">Edit with AI</div>
            <p class="text-slate-400 text-sm">Envia um prompt de edição para a IA modificar apenas o elemento selecionado. Usa followUpEdit com SEARCH/REPLACE.</p>
          </div>
          <div class="feature-card text-center">
            <div class="text-2xl mb-2">Edit HTML</div>
            <p class="text-slate-400 text-sm">Abre um editor Monaco com o HTML do elemento. Edição manual direta — substitui o outerHTML no documento.</p>
          </div>
          <div class="feature-card text-center">
            <div class="text-2xl mb-2">Regenerate</div>
            <p class="text-slate-400 text-sm">Pede à IA uma nova variação do elemento, mantendo o propósito mas mudando estilo, conteúdo ou layout.</p>
          </div>
        </div>
      </section>

      <!-- ESTILOS -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Estilos de Design</h2>
        <p class="text-slate-400 mb-4 text-sm">Seletor de estilos integrado no chat — cada estilo injeta regras visuais específicas no prompt:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="industry-tag justify-center py-3">Default</div>
          <div class="industry-tag justify-center py-3">Minimalist</div>
          <div class="industry-tag justify-center py-3">Corporate</div>
          <div class="industry-tag justify-center py-3">Bold</div>
          <div class="industry-tag justify-center py-3">Elegant</div>
          <div class="industry-tag justify-center py-3">Playful</div>
          <div class="industry-tag justify-center py-3">Dark</div>
          <div class="industry-tag justify-center py-3">Gradient</div>
        </div>
      </section>

      <!-- DEPLOY -->
      <section>
        <h2 class="text-2xl font-bold mb-2">Deploy</h2>
        <p class="text-slate-400 mb-4 text-sm">O sistema faz deploy automaticamente via GitHub → Cloudflare Pages:</p>
        <div class="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
          <pre class="text-sm text-slate-300 overflow-x-auto"><code>git push origin main
  ↓ GitHub Actions
  ↓ npm ci && npm run build
  ↓ wrangler pages deploy
  ↓ Seu site está no ar!</code></pre>
        </div>
      </section>

      <!-- CTA -->
      <section class="text-center py-12 space-y-4">
        <h2 class="text-2xl font-bold">Pronto para criar?</h2>
        <p class="text-slate-400">Descreva sua ideia de landing page no chat à esquerda e veja a mágica acontecer.</p>
        <div class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer">
          Comece Digitando no Chat →
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="border-t border-slate-800/50 pt-8 pb-6 text-center">
        <p class="text-slate-500 text-sm">LandingForge — AI Landing Page Builder</p>
        <p class="text-slate-600 text-xs mt-2">Documentação do sistema • Design Intelligence • Prompt Enhancer • Inline Editing</p>
      </footer>

    </div>
  </body>
</html>
`;