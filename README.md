# 🎨 Equilibrium + Kairus Template

Um template React + Vite + Tailwind CSS reutilizável que combina o design **liquid glass** do Equilibrium com o conteúdo completo do **site da Kairus Studio**.

## 📋 O que está incluído

✅ **Header estilizado** com liquid-glass effect e navegação responsiva  
✅ **Hero section** com background video looping  
✅ **Seções do site**: Clientes, Método, Equipe, Projetos, Footer  
✅ **Componentes reutilizáveis** com Tailwind CSS  
✅ **Config centralizada** para fácil customização  
✅ **Mobile-first responsive design**  

## 🚀 Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Acessa: `http://localhost:5173`

### 3. Build para produção
```bash
npm run build
npm run preview
```

## 🎯 Customizar o template

Abra `src/App.tsx` e edite a seção **`SITE_CONFIG`** no topo:

```typescript
const SITE_CONFIG = {
  // Logo e branding
  logo: '✦ Kairus Studio',

  // Navegação
  navLinks: [
    { label: 'Método', href: '#metodo' },
    { label: 'Projetos', href: '#projetos' },
    // ... adicione mais links
  ],

  // Hero Section
  hero: {
    headline: 'Comece mais perto do resultado.',
    subheadline: 'Design estratégico para SaaS que precisam crescer com intenção — não com achismo.',
    primaryCTA: { text: 'Conhecer o Método', href: '#metodo' },
    secondaryCTA: { text: 'Saber Mais', href: '#sobre' },
  },

  // Cores (customize aqui)
  colors: {
    primary: '#F3390A',      // Cor principal
    secondary: '#FF5C33',    // Cor secundária
    dark: '#090504',         // Fundo
    light: '#EAEAEA',        // Texto claro
    support: '#9DABBC',      // Texto suporte
  },

  // Background video (qualquer URL)
  bgVideo: 'https://...',
}
```

## 📝 Estrutura de Seções

### Componentes disponíveis:
- `ClientsSection` - Lista de clientes
- `MethodSection` - Descrição do método
- `TeamSection` - Cards de equipe
- `ProjectsSection` - Grid de projetos
- `Footer` - Rodapé

Todos os dados (equipe, projetos, clientes) estão hardcoded nos componentes para facilitar edição.

## 🎨 Customização avançada

### Adicionar nova seção
```typescript
function NewSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* conteúdo */}
      </div>
    </section>
  )
}

// No retorno do App:
export default function App() {
  return (
    <div>
      {/* ... hero ... */}
      <ClientsSection />
      <NewSection /> {/* ← adicione aqui */}
      <Footer />
    </div>
  )
}
```

### Usar liquid-glass em outros elementos
```typescript
<div className="liquid-glass rounded-lg p-6">
  Conteúdo com efeito vidro
</div>
```

## 🔧 Variáveis CSS úteis

Definidas em `src/index.css`:

- `.liquid-glass` - Efeito vidro com blur e gradiente de borda
- Classes Tailwind padrão (`text-white`, `bg-opacity-50`, etc)

## 📱 Responsividade

Breakpoints do Tailwind:
- `sm:` - 640px
- `md:` - 768px (navbar tablet/desktop)
- `lg:` - 1024px

Exemplo:
```typescript
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

## 🎬 Trocar vídeo de fundo

No `SITE_CONFIG`:
```typescript
bgVideo: 'https://seu-video.mp4'
```

Qualquer URL de vídeo funciona. Certifique-se que:
- Está em formato MP4 ou WebM
- Tem autoplay habilitado
- É responsivo (usa `object-cover`)

## 💡 Dicas

1. **Cores**: Altere todas as cores num único lugar em `SITE_CONFIG.colors`
2. **Copy**: Todos os textos estão em variáveis/arrays - fácil de trocar
3. **Componentes**: Cada seção é um componente React independente
4. **Estilos**: Use classes Tailwind + inline styles com `SITE_CONFIG.colors`
5. **Deploy**: Build com `npm run build`, output em `/dist`

## 📦 Dependências

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (ícones)
- TypeScript

## 🚢 Deploy

```bash
# Build
npm run build

# Copiar /dist para seu servidor
# Ou fazer deploy direto com Vercel/Netlify
```

---

**Template pronto para usar. Customize livremente!** 🎨
