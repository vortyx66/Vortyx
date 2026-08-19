import { FormEvent, type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  CircleAlert,
  Eye,
  EyeOff,
  Gauge,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import logoPath from '@assets/Designing_esports_logo_symbol_202608172208_1787112596876.jpeg';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [isDemo, setIsDemo] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const displayName = useMemo(() => {
    const localPart = email.split('@')[0]?.replace(/[._-]+/g, ' ').trim();
    if (!localPart) return 'Explorer';
    return localPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }, [email]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFormError('Escribe un email válido para continuar.');
      return;
    }
    if (password.trim().length < 4) {
      setFormError('Usa al menos 4 caracteres para la clave de prueba.');
      return;
    }
    setFormError('');
    setIsDemo(true);
  };

  const startDemo = () => {
    setEmail('explorer@vortyx.demo');
    setPassword('demo-access');
    setFormError('');
    setIsDemo(true);
  };

  const handleLogout = () => {
    setIsDemo(false);
    setPassword('');
  };

  return (
    <main className="vortex-app min-h-[100dvh] w-full">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
        <header className="vortex-reveal flex items-center justify-between border-b border-white/[.09] py-5 lg:py-6" data-testid="header-navigation">
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              alt="Símbolo VORTYX"
              className="h-10 w-10 rounded-[11px] border border-white/15 object-cover object-center"
              data-testid="img-vortyx-logo"
            />
            <div>
              <div className="vortex-display text-[19px] font-bold tracking-[-.07em] text-[#effaff]">VORTYX</div>
              <div className="vortex-mono text-[8px] uppercase tracking-[.24em] text-[#6d8491]">Binary intelligence</div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-2 sm:flex" data-testid="status-market-hours">
              <span className="h-1.5 w-1.5 rounded-full bg-[#66ddc2] shadow-[0_0_10px_rgba(102,221,194,.65)]" />
              <span className="vortex-mono text-[10px] uppercase text-[#91a9b3]">Market sample / active</span>
            </div>
            <div className="vortex-mono rounded-full border border-[#2b5362] bg-[#0c202b]/75 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-[#7fe1fa]" data-testid="status-demo-badge">
              {isDemo ? 'DEMO / SESSION' : 'LOCAL / DEMO'}
            </div>
          </div>
        </header>

        {!isDemo ? (
          <Landing
            email={email}
            password={password}
            showPassword={showPassword}
            formError={formError}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTogglePassword={() => setShowPassword((current) => !current)}
            onSubmit={handleSubmit}
            onStartDemo={startDemo}
          />
        ) : (
          <DemoSession displayName={displayName} email={email} onLogout={handleLogout} />
        )}

        <footer className="vortex-reveal vortex-reveal-delay-3 mt-auto flex flex-col gap-3 border-t border-white/[.09] py-5 text-[10px] text-[#71858e] sm:flex-row sm:items-center sm:justify-between" data-testid="footer-disclaimer">
          <div className="flex items-center gap-2">
            <CircleAlert className="h-3.5 w-3.5 text-[#e7b260]" />
            <span>La práctica no elimina el riesgo. Opera solo con capital que puedas permitirte perder.</span>
          </div>
          <span className="vortex-mono uppercase tracking-[.16em] text-[#536975]">VORTYX / 2025 — DEMO BUILD</span>
        </footer>
      </div>
    </main>
  );
}

type LandingProps = {
  email: string;
  password: string;
  showPassword: boolean;
  formError: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onStartDemo: () => void;
};

function Landing({
  email,
  password,
  showPassword,
  formError,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onStartDemo,
}: LandingProps) {
  return (
    <section className="grid flex-1 content-center gap-14 py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,.72fr)] lg:gap-20 lg:py-16 xl:gap-28">
      <div className="vortex-reveal vortex-reveal-delay-1 flex flex-col justify-center">
        <div className="mb-7 flex items-center gap-3">
          <span className="vortex-mono text-[10px] uppercase tracking-[.22em] text-[#62d9f6]">01 / Orientation</span>
          <span className="h-px w-14 bg-[#245365]" />
          <span className="vortex-mono text-[10px] uppercase tracking-[.16em] text-[#526d78]">Focused market practice</span>
        </div>
        <h1 className="vortex-display max-w-[720px] text-[clamp(3.5rem,8vw,7.75rem)] font-semibold leading-[.86] text-[#edfaff]" data-testid="text-hero-title">
          Trade the<br />
          <span className="text-[#63dafa]">moment.</span>
          <br />
          Understand<br className="hidden sm:block" /> the move.
        </h1>
        <p className="mt-8 max-w-[510px] text-[15px] leading-7 text-[#8ca4ae] sm:text-[17px]">
          Un espacio de simulación para estudiar el ritmo de los mercados, probar hipótesis y tomar decisiones con más contexto. Sin promesas. Solo práctica deliberada.
        </p>

        <div className="mt-11 grid max-w-[650px] grid-cols-1 border-y border-white/[.1] sm:grid-cols-3" data-testid="benefits-list">
          <Benefit icon={<Target />} index="01" title="Foco" copy="Menos ruido. Más señal." />
          <Benefit icon={<Gauge />} index="02" title="Ritmo" copy="Lecturas en tiempo real." />
          <Benefit icon={<ShieldCheck />} index="03" title="Contexto" copy="Riesgo siempre visible." />
        </div>

        <div className="mt-8 flex items-center gap-3 text-[11px] text-[#607b87]" data-testid="text-platform-note">
          <Sparkles className="h-3.5 w-3.5 text-[#e7b260]" />
          <span>Diseñado para quienes prefieren entender antes de acelerar.</span>
        </div>
      </div>

      <div className="vortex-reveal vortex-reveal-delay-2 flex items-center justify-center lg:justify-end">
        <LoginCard
          email={email}
          password={password}
          showPassword={showPassword}
          formError={formError}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onTogglePassword={onTogglePassword}
          onSubmit={onSubmit}
          onStartDemo={onStartDemo}
        />
      </div>
    </section>
  );
}

function Benefit({ icon, index, title, copy }: { icon: ReactNode; index: string; title: string; copy: string }) {
  return (
    <div className="group border-b border-white/[.1] px-1 py-5 first:pt-5 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0" data-testid={`benefit-${index}`}>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[#5f7c88] [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="vortex-mono text-[9px] text-[#46616c]">{index}</span>
      </div>
      <div className="text-[14px] font-semibold text-[#dbeff4]">{title}</div>
      <div className="mt-1 text-[11px] text-[#6f8993]">{copy}</div>
    </div>
  );
}

type LoginCardProps = LandingProps;

function LoginCard({
  email,
  password,
  showPassword,
  formError,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onStartDemo,
}: LoginCardProps) {
  return (
    <div className="vortex-glass relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#284553] p-6 sm:p-8" data-testid="card-login">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#62dcfb] via-[#62dcfb]/60 to-transparent" />
      <div className="vortex-scanline relative mb-8 flex items-start justify-between">
        <div>
          <div className="vortex-mono mb-3 text-[10px] uppercase tracking-[.2em] text-[#61dafa]">Terminal access</div>
          <h2 className="vortex-display text-[32px] font-semibold leading-none text-[#effaff]">Entra a tu<br />espacio de práctica.</h2>
        </div>
        <LockKeyhole className="mt-1 h-5 w-5 text-[#627e89]" />
      </div>
      <p className="mb-7 max-w-[340px] text-[12px] leading-5 text-[#7f99a3]">
        Acceso local de prueba. No creamos cuentas ni guardamos credenciales.
      </p>

      <form className="space-y-4" onSubmit={onSubmit} data-testid="form-demo-login">
        <label className="block">
          <span className="vortex-mono mb-2 block text-[9px] uppercase tracking-[.16em] text-[#76929d]">Email de explorador</span>
          <input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="tu@email.com"
              autoComplete="email"
            className="vortex-field h-12 w-full rounded-lg border border-[#2b4652] bg-[#0b1821] px-4 text-[13px] text-[#dff6fb] placeholder:text-[#49636f]"
            data-testid="input-email"
          />
        </label>
        <label className="block">
          <span className="vortex-mono mb-2 block text-[9px] uppercase tracking-[.16em] text-[#76929d]">Clave de sesión</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="mínimo 4 caracteres"
              autoComplete="current-password"
              className="vortex-field h-12 w-full rounded-lg border border-[#2b4652] bg-[#0b1821] px-4 pr-12 text-[13px] text-[#dff6fb] placeholder:text-[#49636f]"
              data-testid="input-password"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#66828d] transition-colors hover:text-[#a7eafa] focus:outline-none focus:ring-2 focus:ring-[#62dcfb]/40"
              aria-label={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
              data-testid="button-toggle-password"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>
        {formError && (
          <div className="flex items-center gap-2 rounded-lg border border-[#74414b] bg-[#351d25]/70 px-3 py-2.5 text-[11px] text-[#f3a6ad]" role="alert" data-testid="status-login-error">
            <CircleAlert className="h-3.5 w-3.5 shrink-0" />
            {formError}
          </div>
        )}
        <button
          type="submit"
          className="vortex-button flex h-12 w-full items-center justify-between rounded-lg bg-[#65dcfa] px-4 text-[12px] font-bold uppercase tracking-[.1em] text-[#071017] focus:outline-none focus:ring-2 focus:ring-[#a0edff] focus:ring-offset-2 focus:ring-offset-[#101d27]"
          data-testid="button-submit-login"
        >
          <span>Continuar en demo</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[.1]" />
        <span className="vortex-mono text-[9px] uppercase tracking-[.16em] text-[#536f7b]">o empieza ahora</span>
        <div className="h-px flex-1 bg-white/[.1]" />
      </div>
      <button
        type="button"
        onClick={onStartDemo}
        className="group flex w-full items-center justify-between rounded-lg border border-[#315363] bg-[#10212b]/70 px-4 py-3 text-left transition-all hover:border-[#5bbfd9] hover:bg-[#132b37] focus:outline-none focus:ring-2 focus:ring-[#62dcfb]/40"
        data-testid="button-start-demo"
      >
        <span>
          <span className="block text-[12px] font-semibold text-[#c4e5ec]">Usar acceso rápido</span>
          <span className="mt-0.5 block text-[10px] text-[#6c8792]">explorer@vortyx.demo / datos locales</span>
        </span>
        <ChevronRight className="h-4 w-4 text-[#64d9f6] transition-transform group-hover:translate-x-1" />
      </button>
      <div className="mt-6 flex gap-2 border-t border-white/[.08] pt-4 text-[10px] leading-4 text-[#718b95]">
        <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e8b96d]" />
        <span>Las opciones binarias implican riesgo. No existen ganancias garantizadas. Esto es una demostración educativa, no asesoría financiera.</span>
      </div>
    </div>
  );
}

function DemoSession({ displayName, email, onLogout }: { displayName: string; email: string; onLogout: () => void }) {
  return (
    <section className="grid flex-1 content-center gap-10 py-12 lg:grid-cols-[.94fr_1.06fr] lg:gap-20 lg:py-20">
      <div className="vortex-reveal vortex-reveal-delay-1">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#66ddc2] shadow-[0_0_12px_rgba(102,221,194,.6)]" />
          <span className="vortex-mono text-[10px] uppercase tracking-[.22em] text-[#66ddc2]" data-testid="status-session-active">Sesión demo activa</span>
        </div>
        <h1 className="vortex-display max-w-[620px] text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[.88] text-[#effaff]" data-testid="text-demo-welcome">
          Hola,<br /><span className="text-[#65dcfa]">{displayName}.</span>
        </h1>
        <p className="mt-8 max-w-[460px] text-[15px] leading-7 text-[#8ca4ae]">
          Tu espacio está listo. En esta primera versión puedes familiarizarte con la experiencia VORTYX; el panel de simulación llegará en la siguiente iteración.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onLogout}
            className="vortex-button inline-flex items-center gap-2 rounded-lg border border-[#365562] bg-[#10212b] px-4 py-3 text-[11px] font-semibold uppercase tracking-[.12em] text-[#c5e6ed] hover:border-[#65dcfa] focus:outline-none focus:ring-2 focus:ring-[#62dcfb]/40"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión demo
          </button>
          <span className="vortex-mono text-[10px] text-[#587581]" data-testid="text-demo-email">{email}</span>
        </div>
      </div>

      <div className="vortex-reveal vortex-reveal-delay-2">
        <div className="vortex-glass vortex-scanline relative overflow-hidden rounded-2xl border border-[#294754] p-5 sm:p-7" data-testid="card-demo-preview">
          <div className="mb-7 flex items-start justify-between">
            <div>
              <div className="vortex-mono text-[9px] uppercase tracking-[.2em] text-[#688894]">Preview / workspace</div>
              <h2 className="vortex-display mt-2 text-[25px] font-semibold text-[#e5f7fb]">Tu próxima lectura empieza aquí.</h2>
            </div>
            <Activity className="h-5 w-5 text-[#65dcfa]" />
          </div>
          <div className="rounded-xl border border-[#284753] bg-[#0a151e]/80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="vortex-mono text-[10px] text-[#71909c]">MARKET SAMPLE</div>
                <div className="mt-1 text-[15px] font-semibold text-[#dff7fa]">EUR / USD</div>
              </div>
              <div className="text-right">
                <div className="vortex-mono text-[12px] text-[#72dfc6]">1.0842</div>
                <div className="mt-1 text-[10px] text-[#6a8b91]">simulación educativa</div>
              </div>
            </div>
            <svg viewBox="0 0 560 150" className="h-auto w-full" role="img" aria-label="Gráfico ilustrativo de movimiento de mercado">
              <defs>
                <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#55d8f6" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#55d8f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 118 L42 112 L74 120 L113 87 L147 98 L181 71 L218 79 L254 54 L286 68 L320 38 L357 55 L392 44 L425 59 L460 25 L500 39 L560 13 L560 150 L0 150 Z" fill="url(#chart-fill)" />
              <path className="vortex-chart-line" d="M0 118 L42 112 L74 120 L113 87 L147 98 L181 71 L218 79 L254 54 L286 68 L320 38 L357 55 L392 44 L425 59 L460 25 L500 39 L560 13" fill="none" stroke="#61dcf7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="130" x2="560" y2="130" stroke="#294551" strokeWidth="1" />
            </svg>
            <div className="mt-3 flex justify-between vortex-mono text-[8px] uppercase tracking-[.1em] text-[#4e6c78]">
              <span>09:30</span><span>12:00</span><span>14:30</span><span>17:00</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <InfoTile icon={<TrendingUp />} label="Señales" value="Contextuales" />
            <InfoTile icon={<ShieldCheck />} label="Riesgo" value="Siempre visible" />
          </div>
          <div className="mt-5 flex items-center gap-2 text-[10px] text-[#718c96]">
            <Check className="h-3.5 w-3.5 text-[#72dfc6]" />
            Simulación sin dinero real, sin resultados prometidos.
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#284551] bg-[#0c1922] p-3" data-testid={`tile-${label.toLowerCase()}`}>
      <div className="mb-3 text-[#60d7f3] [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</div>
      <div className="vortex-mono text-[8px] uppercase tracking-[.15em] text-[#58747f]">{label}</div>
      <div className="mt-1 text-[11px] font-semibold text-[#c6e2e8]">{value}</div>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
