# 🎨 Kairus Studio - Portfolio

Portfolio oficial da **Kairus Studio** - Design estratégico para SaaS que precisam crescer com intenção.

## 📱 Status: ATIVO ✅

Este é o projeto **ATIVO** da Kairus Studio. Para o projeto anterior (Michael Smith Portfolio), veja o repositório `Site`.

## 🌐 Acesso Online

**Site em produção:** https://whysoliv6.github.io/kairus-studio/

## 🛠️ Tecnologias Utilizadas

- **React 18** + TypeScript
- **Vite** (build tool rápida)
- **Tailwind CSS** (estilização utilitária)
- **Framer Motion** (animações de componentes)
- **GSAP** (scroll-driven animations e parallax)
- **HLS.js** (streaming de vídeos)
- **GitHub Pages** (hosting)

## 🚀 Como Rodar Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Servidor de desenvolvimento
```bash
npm run dev
```
Abra em seu navegador: `http://localhost:5173`

### 3. Build para produção
```bash
npm run build
npm run preview
```

## 📋 Estrutura do Site

- **Loading Screen** - Animação com counter 0→100
- **Navbar** - Navegação fixa com logo KS
- **Hero Section** - Vídeo de fundo com copy do Kairus
- **Seção Projetos** - Portfólio com Azo, Zello Auto, LTQ Educação, Quattrus
- **Bastidores** - Blog com insights de design
- **Explorations** - Galeria visual com parallax
- **Estatísticas** - Números do estúdio
- **Footer** - CTA e redes sociais

## 📝 Como Editar o Conteúdo

Abra `src/App.tsx` e procure pelas seções:

### Navbar
- Logo: "KS"
- Links: Início, Projetos, Método
- Botão: "Vamos conversar ↗"

### Hero Section
- Label: "Design estratégico para SaaS"
- Título: "Kairus Studio"
- Roles rotativas: Raiz, Prova, Estrutura, Validação
- Descrição e CTAs

### Projetos
```typescript
const projects = [
  { title: 'Azo', ... },
  { title: 'Zello Auto', ... },
  { title: 'LTQ Educação', ... },
  { title: 'Quattrus', ... },
]
```

### Blog (Bastidores)
```typescript
const entries = [
  { title: 'Por que toda marca de SaaS precisa de uma Raiz antes de um logo', ... },
  // ... mais posts
]
```

## 🎨 Cores e Design

Definidas em `tailwind.config.ts`:

```typescript
colors: {
  bg: 'hsl(0 0% 4%)',           // Fundo (#090504)
  surface: 'hsl(0 0% 8%)',      // Superfície
  'text-primary': 'hsl(0 0% 96%)', // Texto (#EAEAEA)
  muted: 'hsl(0 0% 53%)',       // Texto muted
  stroke: 'hsl(0 0% 12%)',      // Bordas
}
```

Gradient accent:
```css
background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%);
```

## 🔧 Customizações Rápidas

### Trocar vídeo de fundo
Procure em `HeroSection()`:
```typescript
hls.loadSource('https://seu-video.m3u8')
```

### Atualizar email de contato
No `ContactSection()`:
```typescript
href="mailto:seu-email@gmail.com"
```

### Adicionar/remover projetos
Na seção `SelectedWorksSection()`:
```typescript
const projects = [
  { title: 'Novo Projeto', image: 'url', span: 'md:col-span-7' },
]
```

## 📱 Responsividade

Breakpoints Tailwind:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## 🚢 Deploy

O site é deployado automaticamente via GitHub Actions para GitHub Pages.

**Como funciona:**
1. Push para `main` branch
2. GitHub Actions roda `npm run build`
3. Arquivos em `/dist` são deployados no GitHub Pages
4. Site atualizado em minutos

### Deploy manual
```bash
npm run build
# Arquivos prontos em /dist
```

## 📞 Contato e Links

📧 **Email:** kairusstudiouxd@gmail.com

🔗 **Redes Sociais:**
- [Instagram](https://instagram.com)
- [LinkedIn](https://linkedin.com)
- [TikTok](https://tiktok.com)
- [Behance](https://behance.com)

## 📦 Dependências principais

```json
{
  "react": "^18.2.0",
  "vite": "^5.0.8",
  "tailwindcss": "^3.4.0",
  "gsap": "^3.12.2",
  "framer-motion": "^10.16.4",
  "hls.js": "^1.4.10"
}
```

## 🔄 Deploy Automático

Este repositório usa **GitHub Actions** para deploy automático:

1. Arquivo: `.github/workflows/deploy-pages.yml`
2. Trigger: Push para `main`
3. Ação: Build + Deploy para GitHub Pages
4. URL: https://whysoliv6.github.io/kairus-studio/

---

**Status:** ✅ Ativo e mantido  
**Última atualização:** Junho 2026  
**Repositórios relacionados:** [whysoliv6/Site](https://github.com/whysoliv6/Site)
