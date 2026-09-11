import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { 
  Building2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Mail,
  Layers,
  MapPin,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { setCurrentUser, setActiveView, showToast } = useCity();

  // Mode: 'login' | 'forgot-password'
  const [viewMode, setViewMode] = useState<'login' | 'forgot-password'>('login');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.trim()) {
      return 'Enter your work email.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) {
      return 'Enter your password.';
    }
    if (val.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) return;

    setIsLoading(true);

    // Simulate realistic enterprise authentication latency
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);

      const namePart = email.split('@')[0];
      const cleanName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const initials = cleanName.slice(0, 2).toUpperCase();

      const authenticatedUser = {
        name: cleanName === 'Ramesh.planner' ? 'Ramesh P' : cleanName,
        email: email,
        role: 'Senior Urban Planner',
        department: 'Metropolitan Planning Authority',
        initials: initials || 'RP',
        avatarColor: 'from-purple-600 to-indigo-700'
      };

      setCurrentUser(authenticatedUser);
      showToast(`Welcome back, ${authenticatedUser.name}`);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          setActiveView('dashboard');
        }
      }, 700);
    }, 900);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    setEmailError(eErr);
    if (eErr) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 800);
  };

  // Quick preset login helper for testing
  const handleQuickPreset = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('planner2026');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FD] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Container Box */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[620px]">
        
        {/* ======================================================= */}
        {/* LEFT SIDE: Subtle, Premium CityTwin Visual Identity     */}
        {/* ======================================================= */}
        <div className="w-full md:w-5/12 lg:w-1/2 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Map Grid & SVG Geometry Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Top Brand Block */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white shrink-0">
                <img 
                  src="/assets/brand/citytwin_logo.jpg" 
                  alt="CityTwin Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  CITYTWIN
                </span>
                <span className="ml-2 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  2.0
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                AI-Powered Urban Digital Twin
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                Simulate today.<br />Build smarter tomorrow.
              </h1>
            </div>
          </div>

          {/* Center Subtle Urban Data / Infrastructure Diagram */}
          <div className="relative z-10 my-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-md space-y-3.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-slate-200">Active Metropolitan Grid</span>
                </div>
                <span className="text-[11px] font-mono text-purple-300">MUMBAI & BENGALURU</span>
              </div>

              {/* Minimal SVG Arterial Flow Lines & Water Catchment */}
              <div className="relative h-28 w-full bg-slate-900/60 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                <svg viewBox="0 0 320 100" className="w-full h-full px-3" fill="none">
                  {/* Water catchment curve */}
                  <path d="M0,80 Q80,40 160,70 T320,50" stroke="#0284c7" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
                  
                  {/* Arterial Highway Polylines */}
                  <path d="M20,20 L120,45 L200,30 L300,75" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M60,90 L140,55 L240,65 L310,25" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                  
                  {/* Intersection Nodes */}
                  <circle cx="120" cy="45" r="4" fill="#a855f7" />
                  <circle cx="200" cy="30" r="4" fill="#a855f7" />
                  <circle cx="140" cy="55" r="4" fill="#10b981" />
                  <circle cx="240" cy="65" r="4" fill="#f59e0b" />
                  
                  {/* Flow label */}
                  <text x="125" y="40" fill="#e2e8f0" fontSize="8" fontWeight="bold">Central Corridor</text>
                  <text x="145" y="70" fill="#94a3b8" fontSize="7">BPR Equilibrium</text>
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-slate-300">
                <div className="bg-white/5 p-2 rounded-lg text-center">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">GIS Data</div>
                  <div className="font-bold text-white mt-0.5">OpenStreetMap</div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg text-center">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Flow Model</div>
                  <div className="font-bold text-emerald-400 mt-0.5">BPR Equilibrium</div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg text-center">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Analytics</div>
                  <div className="font-bold text-purple-300 mt-0.5">Explainable AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security / GovTech Compliance */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-200/70">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>GovTech Secure Workspace</span>
            </span>
            <span>SIH 2026</span>
          </div>
        </div>

        {/* ======================================================= */}
        {/* RIGHT SIDE: Clean, Professional Login Panel            */}
        {/* ======================================================= */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
          <div className="max-w-md mx-auto w-full">
            
            {/* Header copy */}
            {viewMode === 'login' ? (
              <div className="mb-7">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome back
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Sign in to continue to your CityTwin workspace.
                </p>
              </div>
            ) : (
              <div className="mb-7">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('login');
                    setResetSent(false);
                    setEmailError('');
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to sign in</span>
                </button>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Reset your password
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Enter your work email and we'll send instructions to reset your password.
                </p>
              </div>
            )}

            {/* Success Feedback Alert */}
            {loginSuccess && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authentication verified. Launching CityTwin workspace...</span>
              </div>
            )}

            {resetSent && (
              <div className="mb-5 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Password reset link sent to <strong>{email}</strong> if registered.</span>
              </div>
            )}

            {/* =================================================== */}
            {/* 1. LOGIN FORM                                       */}
            {/* =================================================== */}
            {viewMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email-input" 
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Work Email
                  </label>
                  <div className="relative">
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(validateEmail(e.target.value));
                      }}
                      placeholder="Enter your email"
                      className={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs text-slate-900 placeholder-slate-400 transition-all font-medium focus:outline-none focus:bg-white ${
                        emailError 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                          : 'border-slate-200/90 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="password-input" 
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('forgot-password');
                        setEmailError('');
                        setPasswordError('');
                      }}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(validatePassword(e.target.value));
                      }}
                      placeholder="Enter your password"
                      className={`w-full pl-3.5 pr-10 py-2.5 bg-slate-50/70 border rounded-xl text-xs text-slate-900 placeholder-slate-400 transition-all font-medium focus:outline-none focus:bg-white ${
                        passwordError 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                          : 'border-slate-200/90 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer select-none">
                    <div 
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        rememberMe ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-medium text-slate-700">Remember me</span>
                  </label>
                </div>

                {/* Primary Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || loginSuccess}
                    className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Authenticating...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* =================================================== */
              /* 2. FORGOT PASSWORD FORM                             */
              /* =================================================== */
              <form onSubmit={handleResetSubmit} className="space-y-4" noValidate>
                <div>
                  <label 
                    htmlFor="reset-email-input" 
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Work Email
                  </label>
                  <input
                    id="reset-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(validateEmail(e.target.value));
                    }}
                    placeholder="Enter your email"
                    className={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs text-slate-900 placeholder-slate-400 transition-all font-medium focus:outline-none focus:bg-white ${
                      emailError 
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                        : 'border-slate-200/90 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15'
                    }`}
                  />
                  {emailError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || resetSent}
                    className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <span>Sending reset instructions...</span>
                    ) : (
                      <span>Send reset link</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Quick Demo Credentials Assistant */}
            {viewMode === 'login' && (
              <div className="mt-7 pt-5 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Quick Evaluation Profiles</span>
                  <span className="text-emerald-700 font-bold">One-Click Fill</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickPreset('ramesh.planner@citytwin.gov.in')}
                    className="p-2 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all text-xs cursor-pointer group"
                  >
                    <div className="font-bold text-slate-800 group-hover:text-purple-700 truncate">
                      Ramesh P
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Senior Urban Planner
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickPreset('ananya.gis@citytwin.gov.in')}
                    className="p-2 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all text-xs cursor-pointer group"
                  >
                    <div className="font-bold text-slate-800 group-hover:text-purple-700 truncate">
                      Dr. Ananya Sharma
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      GIS & Hydrology Cell
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-[11px] text-slate-400 max-w-md mx-auto w-full">
            <span>© 2026 CityTwin Urban Intelligence</span>
            <span>Government of India Compliance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
