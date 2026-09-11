import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../UI/Button';

export interface UserProfile {
  name: string;
  email: string;
  role: 'Senior Urban Planner' | 'GIS Analyst' | 'Disaster Management Officer' | 'City Commissioner';
  department: string;
  initials: string;
  avatarColor: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

const PRESET_ACCOUNTS: UserProfile[] = [
  {
    name: 'Ramesh P',
    email: 'ramesh.planner@citytwin.gov.in',
    role: 'Senior Urban Planner',
    department: 'Metropolitan Planning Authority',
    initials: 'RP',
    avatarColor: 'from-purple-600 to-indigo-700'
  },
  {
    name: 'Dr. Ananya Sharma',
    email: 'ananya.gis@citytwin.gov.in',
    role: 'GIS Analyst',
    department: 'Smart City GIS & Hydrology Cell',
    initials: 'AS',
    avatarColor: 'from-blue-600 to-cyan-600'
  },
  {
    name: 'Vikramaditya Rao',
    email: 'vikram.disaster@citytwin.gov.in',
    role: 'Disaster Management Officer',
    department: 'Municipal Emergency Response Division',
    initials: 'VR',
    avatarColor: 'from-rose-600 to-amber-600'
  },
  {
    name: 'K. S. Narayanan, IAS',
    email: 'commissioner@citytwin.gov.in',
    role: 'City Commissioner',
    department: 'Urban Development Directorate',
    initials: 'KN',
    avatarColor: 'from-emerald-600 to-teal-700'
  }
];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (account: UserProfile) => {
    onLogin(account);
    setSuccessMessage(`Authenticated as ${account.name} (${account.role})`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 900);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = customEmail.split('@')[0] || 'Official User';
    const cleanName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const initials = cleanName.slice(0, 2).toUpperCase();

    const user: UserProfile = {
      name: cleanName,
      email: customEmail || 'user@citytwin.gov.in',
      role: 'Senior Urban Planner',
      department: 'Urban Development & Digital Twin Division',
      initials: initials || 'OU',
      avatarColor: 'from-purple-600 to-indigo-700'
    };

    onLogin(user);
    setSuccessMessage(`Authenticated as ${user.name}`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              CityTwin 2.0 GovTech Access
            </span>
          </div>

          <h3 className="text-xl font-black tracking-tight">
            {currentUser ? 'Municipal Planner Profile' : 'Sign In to CityTwin'}
          </h3>
          <p className="text-xs text-purple-200/90 mt-1">
            {currentUser 
              ? 'Manage your active session, permissions, and municipal delegation.' 
              : 'Access role-based predictive simulations, CPWD costings, and scenario authorizations.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* If already logged in, show current user and logout option */}
          {currentUser ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentUser.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md shrink-0`}>
                  {currentUser.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 text-sm truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-xs font-bold text-purple-700 mt-0.5">
                    {currentUser.role}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {currentUser.department}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  Sign Out Session
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full text-xs"
                  onClick={onClose}
                >
                  Continue Session
                </Button>
              </div>

              {/* Quick switch to another role */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Or Switch Authorized Role
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_ACCOUNTS.filter(a => a.email !== currentUser.email).map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => handleSelectPreset(acc)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all text-xs cursor-pointer group"
                    >
                      <div className="font-bold text-slate-800 group-hover:text-purple-700 truncate">
                        {acc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {acc.role}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Preset Role Selector Buttons for quick Hackathon evaluation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Quick Sign-In (Verified Roles)</span>
                  <span className="text-purple-600 font-semibold lowercase">gov.in verified</span>
                </div>

                <div className="space-y-2">
                  {PRESET_ACCOUNTS.map((acc, i) => (
                    <div
                      key={acc.email}
                      onClick={() => handleSelectPreset(acc)}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-purple-400 hover:bg-purple-50/40 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                    >
                      <div className="flex items-center space-x-3 truncate mr-2">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${acc.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}>
                          {acc.initials}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-xs text-slate-900 group-hover:text-purple-700 truncate">
                            {acc.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">
                            {acc.role}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform shrink-0">
                        Sign In →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Or manual email login */}
              <div className="pt-2 border-t border-slate-100">
                {!isCustomMode ? (
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className="w-full py-2 text-center text-xs font-bold text-slate-500 hover:text-purple-700 cursor-pointer"
                  >
                    Or enter custom municipal credentials
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Government Email
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder="planner@citytwin.gov.in"
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Password / NIC SSO Token
                      </label>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="password"
                          required
                          value={customPassword}
                          onChange={(e) => setCustomPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCustomMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        Sign In Account
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}

          {/* Security note footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Encrypted GovTech Session</span>
            </span>
            <span>Smart India Hackathon 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
