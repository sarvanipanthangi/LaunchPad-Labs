# 🎨 LaunchPad Labs - UI/UX Design Guide

## Color System

### Primary Palette
```css
Background:     #050505  /* Pure black */
Foreground:     #f8f9fa  /* White */
Neon Purple:    #9d4edd  /* Primary brand */
Neon Cyan:      #00f5d4  /* AI active / success */
Neon Pink:      #ff4d6d  /* Warnings / gaps */
Neon Yellow:    #ffd60a  /* Highlights */
Neon Green:     #39ff14  /* Completion */
Muted:          #8d99ae  /* Secondary text */
```

### Usage Guidelines
- **Backgrounds**: Pure black (#050505) with gradient overlays
- **Skill Strength**: Red (weak) → Yellow (medium) → Green (strong)
- **AI Thinking**: Cyan pulse animation
- **Warnings**: Pink
- **Success**: Neon green

---

## Typography

### Font Stack
1. **Source Serif 4** - Headlines, narrative text
2. **Inter** - Body text, buttons, UI
3. **JetBrains Mono** - Code, data, metrics

### Hierarchy
```
H1: 5xl-7xl, font-serif, bold
H2: 4xl-6xl, font-serif, bold
H3: 2xl-3xl, font-serif, bold
Body: base-lg, font-sans
Code: sm-base, font-mono
Labels: xs, font-mono, uppercase, tracking-widest
```

---

## Component Patterns

### Cards
```tsx
<div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md hover:border-neon-cyan/50 transition-all">
  {/* Content */}
</div>
```

### Buttons (Primary)
```tsx
<button className="px-12 py-6 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
  Action
</button>
```

### Buttons (Secondary)
```tsx
<button className="px-8 py-4 rounded-full border border-white/20 hover:border-white/60 text-white hover:bg-white/5 backdrop-blur-md transition-all">
  Action
</button>
```

### Badges
```tsx
<div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-mono tracking-widest uppercase">
  <Icon className="w-3 h-3" />
  Label
</div>
```

---

## Animation Patterns

### Page Transitions
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### Stagger Children
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

### Hover Effects
```tsx
<div className="group">
  <div className="group-hover:scale-110 transition-transform">
    {/* Content */}
  </div>
</div>
```

---

## Micro-Interactions

### Pulse Animation
```tsx
<div className="animate-pulse-slow">
  {/* Glowing element */}
</div>
```

### Shimmer Effect
```tsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
</div>
```

### Glow on Hover
```tsx
<div className="shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_40px_rgba(0,245,212,0.4)] transition-shadow">
  {/* Content */}
</div>
```

---

## Layout Patterns

### Centered Hero
```tsx
<section className="relative w-full h-screen flex flex-col items-center justify-center">
  <div className="z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Content Container
```tsx
<div className="max-w-6xl mx-auto space-y-16 relative z-10 p-6">
  {/* Content */}
</div>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Cards */}
</div>
```

---

## Accessibility

### Focus States
All interactive elements have visible focus states:
```css
focus:ring-2 focus:ring-neon-cyan focus:outline-none
```

### Semantic HTML
- Use `<button>` for actions
- Use `<Link>` for navigation
- Use proper heading hierarchy (h1 → h2 → h3)

### ARIA Labels
```tsx
<button aria-label="Analyze profile">
  <Icon />
</button>
```

---

## Responsive Design

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Mobile-First Approach
```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl">
  Heading
</h1>
```

---

## Performance Tips

1. **Lazy load WebGL scenes** - Use `strategy="lazyOnload"` for Unicorn Studio
2. **Optimize images** - Use Next.js Image component
3. **Debounce slider inputs** - Prevent excessive API calls
4. **Use CSS transforms** - Better performance than position changes
5. **Minimize re-renders** - Use React.memo for heavy components

---

## Design Principles

1. **Clarity over Complexity** - Every element has a purpose
2. **Feedback is Immediate** - Users always know what's happening
3. **Delight in Details** - Micro-animations enhance experience
4. **Dark Mode First** - Optimized for low-light environments
5. **Data is Beautiful** - Visualizations tell stories

---

## Common Patterns

### Loading State
```tsx
{loading ? (
  <div className="flex items-center gap-3 font-mono text-neon-cyan animate-pulse">
    <Loader2 className="w-6 h-6 animate-spin" />
    <span>Processing...</span>
  </div>
) : (
  <Content />
)}
```

### Empty State
```tsx
<div className="text-center py-20 text-muted">
  <Icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
  <p className="font-mono">No data available</p>
</div>
```

### Error State
```tsx
<div className="p-6 rounded-2xl border border-neon-pink/30 bg-neon-pink/10">
  <AlertCircle className="w-6 h-6 text-neon-pink mb-2" />
  <p className="text-sm text-white">Error message</p>
</div>
```

---

## Inspiration Sources

- **Vercel** - Clean, modern SaaS design
- **Linear** - Smooth animations, dark mode
- **Stripe** - Premium feel, gradient accents
- **Framer** - Motion design excellence
- **Raycast** - Command palette UX

---

**Remember:** Every pixel should feel intentional. Every animation should have purpose. Every color should communicate meaning.
