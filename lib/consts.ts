export const defaultHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>LandingForge — AI Landing Page Builder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      :root { --bg: #09090b; --card: #18181b; --card-hover: #27272a; --border: #27272a; --accent: #6366f1; --accent2: #a855f7; --green: #22c55e; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: #fafafa; overflow-x: hidden; }
      .grad { background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow-line { height: 1px; background: linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent); }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 32px; transition: all 0.3s ease; }
      .card:hover { border-color: #6366f1; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(99,102,241,0.1); }
      .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 500; border: 1px solid rgba(99,102,241,0.2); background: rgba(99,102,241,0.08); color: #a5b4fc; }
      .step-num { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; color: white; flex-shrink: 0; }
      .btn-primary { background: linear-gradient(135deg, #6366f1, #7c3aed); color: white; padding: 16px 36px; border-radius: 12px; font-weight: 700; font-size: 16px; border: none; cursor: pointer; transition: all 0.2s ease; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.3); }
      .btn-secondary { background: transparent; color: #a5b4fc; padding: 16px 36px; border-radius: 12px; font-weight: 600; font-size: 16px; border: 1px solid rgba(99,102,241,0.3); cursor: pointer; transition: all 0.2s ease; }
      .btn-secondary:hover { border-color: #6366f1; background: rgba(99,102,241,0.08); }
      .industry-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500; border: 1px solid var(--border); background: var(--card); transition: all 0.2s ease; color: #a1a1aa; }
      .industry-pill:hover { border-color: var(--accent); color: #fafafa; }
      .feature-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .float { animation: float 4s ease-in-out infinite; }
      .hero-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%); top: -200px; left: 50%; transform: translateX(-50%); pointer-events: none; }
    </style>
  </head>
  <body>

    <!-- NAV -->
    <nav style="position:fixed;top:0;left:0;width:100%;z-index:50;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(39,39,42,0.5);">
      <div style="max-width:1100px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:white;">L</div>
          <span style="font-weight:800;font-size:18px;color:#fafafa;">LandingForge</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="color:#71717a;font-size:13px;">v1.3.0</span>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section style="position:relative;padding:160px 24px 100px;text-align:center;overflow:hidden;">
      <div class="hero-glow"></div>
      <div style="position:relative;max-width:800px;margin:0 auto;">
        <div class="badge" style="margin-bottom:24px;">
          <span style="width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;"></span>
          Powered by your favorite AI
        </div>
        <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;letter-spacing:-0.03em;line-height:1.08;margin-bottom:24px;">
          Describe it.<br><span class="grad">Get a landing page.</span>
        </h1>
        <p style="font-size:clamp(1rem,2vw,1.25rem);color:#a1a1aa;max-width:560px;margin:0 auto 40px;line-height:1.7;">
          LandingForge turns your words into stunning, professional landing pages — complete with real content, images, and perfect PageSpeed scores. No code required.
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn-primary" onclick="document.getElementById('how').scrollIntoView({behavior:'smooth'})">See How It Works</button>
          <button class="btn-secondary" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Explore Features</button>
        </div>
        <div style="margin-top:48px;display:flex;gap:24px;justify-content:center;flex-wrap:wrap;color:#71717a;font-size:14px;">
          <span>✦ BYOK — use your own AI</span>
          <span>✦ 13+ industries supported</span>
          <span>✦ Zero configuration</span>
        </div>
      </div>
    </section>

    <div class="glow-line" style="max-width:600px;margin:0 auto;"></div>

    <!-- HOW IT WORKS -->
    <section id="how" style="max-width:900px;margin:0 auto;padding:100px 24px;">
      <div style="text-align:center;margin-bottom:56px;">
        <h2 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;">Three steps. That's it.</h2>
        <p style="color:#a1a1aa;font-size:16px;">From idea to live landing page in under a minute.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div class="card" style="display:flex;align-items:flex-start;gap:24px;">
          <div class="step-num">1</div>
          <div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">Connect your AI</h3>
            <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Open Settings and add your API endpoint and key. Works with OpenAI, Ollama, LM Studio, Groq, Together AI, Fireworks, Nebius, SambaNova, and any OpenAI-compatible provider. Your keys stay in your browser — never sent to any server.</p>
          </div>
        </div>
        <div class="card" style="display:flex;align-items:flex-start;gap:24px;">
          <div class="step-num">2</div>
          <div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">Describe your page</h3>
            <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Type a description of the website you want — in any language. LandingForge automatically detects your industry, extracts business details (name, location, contact info), and enriches your prompt with industry-specific best practices before sending it to the AI.</p>
          </div>
        </div>
        <div class="card" style="display:flex;align-items:flex-start;gap:24px;">
          <div class="step-num">3</div>
          <div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">Watch it come to life</h3>
            <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">The AI generates a complete, production-ready landing page in real time. After generation, an automatic review pass fixes common issues — missing meta tags, color contrast, broken images, accessibility. Then click any element in the preview to edit it inline.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="glow-line" style="max-width:400px;margin:0 auto;"></div>

    <!-- FEATURES -->
    <section id="features" style="max-width:1100px;margin:0 auto;padding:100px 24px;">
      <div style="text-align:center;margin-bottom:56px;">
        <h2 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;">Built-in intelligence</h2>
        <p style="color:#a1a1aa;font-size:16px;max-width:500px;margin:0 auto;">Every page is crafted with design principles, conversion psychology, and accessibility baked in.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;">
        <div class="card">
          <div class="feature-icon" style="background:rgba(99,102,241,0.1);color:#818cf8;">🧠</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">Design Intelligence</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Automatically detects your industry — hotel, restaurant, SaaS, e-commerce, healthcare, and 8 more — and applies the right color palette, typography, layout patterns, and content strategy.</p>
        </div>
        <div class="card">
          <div class="feature-icon" style="background:rgba(168,85,247,0.1);color:#c084fc;">✍️</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">Smart Prompt Enhancement</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Your prompt is automatically enriched with 8 industry-specific best practices, recommended sections, and anti-patterns to avoid — before it even reaches the AI.</p>
        </div>
        <div class="card">
          <div class="feature-icon" style="background:rgba(34,197,94,0.1);color:#4ade80;">⚡</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">50+ Design Rules</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Typography, spacing, color restraint, button design, card layouts, and motion principles — all enforced automatically. Includes AIDA framework, Gestalt principles, and Cialdini's trust design.</p>
        </div>
        <div class="card">
          <div class="feature-icon" style="background:rgba(236,72,153,0.1);color:#f472b6;">🎯</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">11 Mandatory Sections</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Every page includes navigation, hero, about, features, process, testimonials, stats, pricing, FAQ, newsletter, and footer — all with real, persuasive content. No placeholders.</p>
        </div>
        <div class="card">
          <div class="feature-icon" style="background:rgba(251,191,36,0.1);color:#fbbf24;">🔧</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">Inline Editing</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Click any element in the preview to edit it with AI, modify the HTML directly, or regenerate a new variation. No need to rewrite the whole page for small tweaks.</p>
        </div>
        <div class="card">
          <div class="feature-icon" style="background:rgba(99,102,241,0.1);color:#818cf8;">📊</div>
          <h3 style="font-size:17px;font-weight:700;margin:16px 0 8px;">PageSpeed Optimized</h3>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;">Every page is built for performance: lazy-loaded images, fluid typography, minimal layout shift, semantic HTML, and modern CSS — targeting perfect Lighthouse scores.</p>
        </div>
      </div>
    </section>

    <div class="glow-line" style="max-width:400px;margin:0 auto;"></div>

    <!-- INDUSTRIES -->
    <section style="max-width:900px;margin:0 auto;padding:100px 24px;">
      <div style="text-align:center;margin-bottom:48px;">
        <h2 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;">13 industries. One tool.</h2>
        <p style="color:#a1a1aa;font-size:16px;">LandingForge knows what works in your field.</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
        <span class="industry-pill">🏨 Hotels & Resorts</span>
        <span class="industry-pill">🍽️ Restaurants & Cafés</span>
        <span class="industry-pill">💻 SaaS & Tech</span>
        <span class="industry-pill">🛍️ E-commerce</span>
        <span class="industry-pill">🏥 Healthcare</span>
        <span class="industry-pill">💪 Fitness & Gyms</span>
        <span class="industry-pill">🎨 Agencies & Creative</span>
        <span class="industry-pill">💰 Finance</span>
        <span class="industry-pill">🎓 Education</span>
        <span class="industry-pill">🏠 Real Estate</span>
        <span class="industry-pill">✈️ Travel & Tourism</span>
        <span class="industry-pill">🎮 Gaming & Esports</span>
        <span class="industry-pill">💅 Beauty & Spa</span>
      </div>
    </section>

    <div class="glow-line" style="max-width:400px;margin:0 auto;"></div>

    <!-- OUTPUT -->
    <section style="max-width:900px;margin:0 auto;padding:100px 24px;">
      <div style="text-align:center;margin-bottom:48px;">
        <h2 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;">What you get</h2>
        <p style="color:#a1a1aa;font-size:16px;">Every generated page is a complete, deployable website.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:28px;font-weight:800;" class="grad">500+</div>
          <div style="color:#a1a1aa;font-size:13px;margin-top:4px;">Lines of HTML</div>
        </div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:28px;font-weight:800;" class="grad">11</div>
          <div style="color:#a1a1aa;font-size:13px;margin-top:4px;">Content Sections</div>
        </div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:28px;font-weight:800;" class="grad">100%</div>
          <div style="color:#a1a1aa;font-size:13px;margin-top:4px;">Real Content</div>
        </div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:28px;font-weight:800;" class="grad">1</div>
          <div style="color:#a1a1aa;font-size:13px;margin-top:4px;">Single HTML File</div>
        </div>
      </div>
    </section>

    <div class="glow-line" style="max-width:400px;margin:0 auto;"></div>

    <!-- CTA -->
    <section style="max-width:700px;margin:0 auto;padding:100px 24px;text-align:center;">
      <h2 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:16px;">Ready to build?</h2>
      <p style="color:#a1a1aa;font-size:16px;margin-bottom:36px;max-width:480px;margin-left:auto;margin-right:auto;">Type your landing page idea in the chat on the left and watch it come to life. No setup required — just describe what you want.</p>
      <button class="btn-primary" style="font-size:18px;padding:18px 48px;" onclick="document.querySelector('[data-chat-input]')?.focus()">Start Typing →</button>
    </section>

    <!-- FOOTER -->
    <footer style="border-top:1px solid rgba(39,39,42,0.5);padding:32px 24px;text-align:center;">
      <p style="color:#52525b;font-size:13px;">LandingForge — AI Landing Page Builder</p>
      <p style="color:#3f3f46;font-size:11px;margin-top:8px;">Design Intelligence • Prompt Enhancement • Inline Editing • BYOK</p>
      <p style="color:#3f3f46;font-size:10px;margin-top:8px;font-family:monospace;">v1.3.0</p>
    </footer>

  </body>
</html>
`;
