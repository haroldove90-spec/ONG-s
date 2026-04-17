/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Menu,
  X,
  Plus,
  ChevronDown,
  CheckCircle,
  Loader2,
  PieChart as PieIcon,
  BarChart3,
  Download,
  QrCode,
  Edit,
  Pause,
  Play,
  Settings,
  DollarSign
} from "lucide-react";
import { useState, useEffect, useMemo, type FormEvent } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import confetti from 'canvas-confetti';

// --- Global Types & Constants ---

interface Cause {
  id: number;
  title: string;
  img: string;
  category: string;
  desc: string;
  raised: number;
  goal: number;
  daysLeft: number;
  active: boolean;
}

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  causeId: number;
  date: string;
}

const INITIAL_CAUSES: Cause[] = [
  {
    id: 1,
    title: "Latidos de Esperanza: Sofía",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2JHGXHce5VD4MOkQVtYFL6bV5Htgo_Ez5g&s",
    category: "Cirugía Cardiovascular",
    desc: "Sofía requiere una cirugía correctiva inmediata para su cardiopatía congénita. Cada minuto cuenta para su recuperación.",
    raised: 11250,
    goal: 15000,
    daysLeft: 8,
    active: true,
  },
  {
    id: 2,
    title: "Equipamiento Oncológico Rural",
    img: "https://prensa.cba.gov.ar/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-04-at-10.36.16.jpeg",
    category: "Infraestructura",
    desc: "Dotación de equipos de quimioterapia para la clínica San Rafael, permitiendo tratamientos locales en zonas remotas.",
    raised: 4200,
    goal: 12000,
    daysLeft: 25,
    active: true,
  },
  {
    id: 3,
    title: "Vacunación Global 2026",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShz5Zgm39RZxaUINXRPY86zint1avZSSg8_Q&s",
    category: "Prevención",
    desc: "Campaña masiva de inmunización para niños en zonas de alto riesgo, protegiendo a las futuras generaciones.",
    raised: 28500,
    goal: 30000,
    daysLeft: 4,
    active: true,
  }
];

const SEED_DONATIONS: Donation[] = [
  { id: '1', donorName: "Elena R.", donorEmail: "elena@test.com", amount: 250, causeId: 1, date: "2026-04-10" },
  { id: '2', donorName: "Marcos T.", donorEmail: "marcos@test.com", amount: 100, causeId: 3, date: "2026-04-11" },
  { id: '3', donorName: "Ana S.", donorEmail: "ana@test.com", amount: 50, causeId: 2, date: "2026-04-12" },
  { id: '4', donorName: "Empresa Solar", donorEmail: "corp@test.com", amount: 1200, causeId: 3, date: "2026-04-13" },
  { id: '5', donorName: "Luis G.", donorEmail: "luis@test.com", amount: 50, causeId: 1, date: "2026-04-13" },
  { id: '6', donorName: "Karla V.", donorEmail: "karla@test.com", amount: 75, causeId: 1, date: "2026-04-14" },
  { id: '7', donorName: "David P.", donorEmail: "david@test.com", amount: 300, causeId: 2, date: "2026-04-15" },
  { id: '8', donorName: "Sofía M.", donorEmail: "sofia@test.com", amount: 150, causeId: 3, date: "2026-04-15" },
  { id: '9', donorName: "Roberto N.", donorEmail: "roberto@test.com", amount: 200, causeId: 2, date: "2026-04-16" },
  { id: '10', donorName: "Marta K.", donorEmail: "marta@test.com", amount: 500, causeId: 1, date: "2026-04-16" },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

// --- Helper Components ---

const ProgressBar = ({ current, goal, color = "bg-primary" }: { current: number, goal: number, color?: string }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className={`h-full ${color} rounded-full relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [causes, setCauses] = useState<Cause[]>(INITIAL_CAUSES);
  const [donations, setDonations] = useState<Donation[]>(SEED_DONATIONS);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Donation State
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [donationStep, setDonationStep] = useState<'amount' | 'loading' | 'success'>('amount');
  const [donationAmount, setDonationAmount] = useState<string>("50");
  const [donorData, setDonorData] = useState({ name: "", email: "" });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonationSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDonationStep('loading');
    
    // Simulate API Call
    setTimeout(() => {
      const amount = parseFloat(donationAmount);
      if (selectedCause) {
        // Update Local State for Demo
        const newDonation: Donation = {
          id: Math.random().toString(36).substr(2, 9),
          donorName: donorData.name,
          donorEmail: donorData.email,
          amount: amount,
          causeId: selectedCause.id,
          date: new Date().toISOString().split('T')[0]
        };

        setDonations(prev => [newDonation, ...prev]);
        setCauses(prev => prev.map(c => 
          c.id === selectedCause.id ? { ...c, raised: c.raised + amount } : c
        ));

        setDonationStep('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#ffffff']
        });
      }
    }, 2000);
  };

  const closeModal = () => {
    setSelectedCause(null);
    setDonationStep('amount');
    setDonationAmount("50");
    setDonorData({ name: "", email: "" });
  };

  const toggleCauseStatus = (id: number) => {
    setCauses(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // --- Derived Metrics for Admin ---
  const stats = useMemo(() => {
    const total = donations.reduce((acc, d) => acc + d.amount, 0);
    const byCause = causes.map(c => ({
      name: c.title.split(":")[0],
      value: donations.filter(d => d.causeId === c.id).reduce((acc, d) => acc + d.amount, 0)
    }));
    return { total, byCause };
  }, [donations, causes]);

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-slate-900 p-2 rounded-xl text-white">
                <Settings className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter">MedLink <span className="text-primary">Admin</span></h1>
            </div>
            <button 
              onClick={() => setShowAdmin(false)}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full font-bold transition-all text-sm"
            >
              Cerrar Panel
            </button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg"><TrendingUp className="text-primary w-5 h-5" /></div>
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Recaudación Total</h3>
              </div>
              <p className="text-5xl font-black text-slate-900 tracking-tighter">${stats.total.toLocaleString()}</p>
              <p className="text-xs text-slate-400 font-bold mt-2 uppercase">Impacto global acumulado</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 lg:col-span-2">
              <h3 className="text-slate-900 font-black mb-6 flex items-center gap-2">
                <PieIcon className="text-primary w-5 h-5" /> Distribución por Caso
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.byCause}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.byCause.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Causes Management */}
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900">Gestor de Casos</h3>
                <button className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-xs">+ Nuevo</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <th className="px-8 py-4">Caso</th>
                      <th className="px-8 py-4">Progreso</th>
                      <th className="px-8 py-4 text-center">Estado</th>
                      <th className="px-8 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {causes.map(c => (
                      <tr key={c.id}>
                        <td className="px-8 py-4">
                          <div className="font-bold text-slate-800 text-sm">{c.title}</div>
                          <div className="text-[10px] text-slate-400">{c.category}</div>
                        </td>
                        <td className="px-8 py-4 min-w-[150px]">
                          <div className="text-[10px] font-bold text-slate-400 mb-1">${c.raised.toLocaleString()} / ${c.goal.toLocaleString()}</div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(c.raised/c.goal)*100}%` }} />
                          </div>
                        </td>
                        <td className="px-8 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${c.active ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {c.active ? 'Activo' : 'Pausado'}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => toggleCauseStatus(c.id)}
                              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
                            >
                              {c.active ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900">Historial de Donaciones</h3>
                <button 
                  onClick={() => window.print()}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
                >
                  <Download size={14} /> Reporte Mensual
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <th className="px-8 py-4">Donante</th>
                      <th className="px-8 py-4">Fecha</th>
                      <th className="px-8 py-4 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {donations.slice(0, 8).map(d => (
                      <tr key={d.id}>
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-800 text-sm">{d.donorName}</div>
                          <div className="text-[10px] text-slate-400">{d.donorEmail}</div>
                        </td>
                        <td className="px-8 py-6 text-slate-500 text-sm italic">{d.date}</td>
                        <td className="px-8 py-6 text-right font-black text-primary text-sm">${d.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary/20">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">MedLink<span className="text-primary">.</span></span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {["Inicio", "Quienes Somos", "Casos", "Transparencia", "Contacto"].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "-")}`} 
                className="text-sm font-bold text-slate-500 hover:text-primary transition-colors tracking-wide"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedCause(causes[0])}
              className="hidden md:block bg-primary hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Donar Ahora
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white overflow-hidden border-b border-slate-100"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {["Inicio", "Quienes Somos", "Casos", "Transparencia", "Contacto"].map(item => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(" ", "-")}`} 
                    className="text-lg font-bold text-slate-900"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById(item.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => { setIsMenuOpen(false); setSelectedCause(causes[0]); }}
                  className="w-full bg-primary text-white py-4 rounded-full font-black text-center"
                >
                  Donar Ahora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 lg:pt-48 pb-24 lg:pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100">
                <ShieldCheck size={14} /> Plataforma Medica Verificada
              </div>
              <h1 className="text-5xl lg:text-[86px] font-black text-slate-900 leading-[1] mb-8 tracking-tighter">
                Transformando la <span className="text-primary italic">compasión</span> en impacto médico real.
              </h1>
              <p className="text-lg lg:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Conectamos tu generosidad con casos médicos verificados alrededor del mundo. 
                Transparencia total, impacto directo.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-emerald-600 text-white px-12 py-5 rounded-full font-black text-lg shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3"
                >
                  Ver Casos Médicos <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[400px] lg:h-full opacity-10 lg:opacity-100 z-0">
          <img 
            src="https://efectodonacion.com/wp-content/uploads/2021/02/donacion.jpg" 
            alt="Main impact"
            className="w-full h-full object-cover lg:rounded-bl-[160px]"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { lb: "Recaudado", val: `$${stats.total.toLocaleString()}`, ic: TrendingUp },
              { lb: "Vidas Impactadas", val: "+5,000", ic: Heart },
              { lb: "Casos Activos", val: "32", ic: Users },
              { lb: "Transparencia", val: "100%", ic: ShieldCheck },
            ].map(s => (
              <div key={s.lb} className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-4"><s.ic className="text-primary" /></div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{s.val}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.lb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="quienes-somos" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute -top-10 -left-10 w-full h-full bg-primary/5 rounded-[60px] -z-10 group-hover:rotate-3 transition-transform" />
              <img 
                src="https://impulso06.com/wp-content/uploads/2023/10/El-Papel-de-las-ONGs-en-la-Intervencion-Social-para-la-Inmigracion-en-Espana.png"
                className="rounded-[60px] shadow-2xl w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-primary font-black uppercase text-sm tracking-widest mb-6">¿Quiénes Somos?</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">Nuestra misión es global, nuestro corazón local.</h3>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
                MedLink nace de la necesidad de democratizar el acceso a cirugías y tratamientos vitales. 
                Utilizamos tecnología blockchain y auditoría médica para asegurar que cada donación 
                llegue exactamente a quien lo necesita.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-primary font-bold text-3xl mb-1">90%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inversión Directa</div>
                </div>
                <div>
                  <div className="text-secondary font-bold text-3xl mb-1">+40</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Países Aliados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section id="casos" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-primary font-black uppercase text-sm tracking-widest mb-6 underline decoration-4 underline-offset-8">Casos Críticos</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">Cada segundo cuenta para ellos.</h3>
            </div>
            <button className="bg-white hover:bg-slate-900 hover:text-white px-8 py-4 rounded-full font-bold border-2 border-slate-100 transition-all cursor-pointer">
              Ver Todos los Casos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {causes.map(cause => (
              <motion.div 
                key={cause.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group h-full"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={cause.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-[10px] text-primary uppercase tracking-widest">
                    {cause.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{cause.title}</h4>
                  <p className="text-slate-400 font-medium mb-8 text-sm leading-relaxed">{cause.desc}</p>
                  
                  <div className="mt-auto space-y-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="text-slate-400">Recaudado: <span className="text-primary font-black">${cause.raised.toLocaleString()}</span></span>
                       <span className="text-slate-900">Meta: ${cause.goal.toLocaleString()}</span>
                    </div>
                    <ProgressBar current={cause.raised} goal={cause.goal} />
                    
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                      <div className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {cause.daysLeft} días restantes</div>
                      <div>{Math.round((cause.raised/cause.goal)*100)}% Completado</div>
                    </div>

                    <button 
                      onClick={() => setSelectedCause(cause)}
                      className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg ${cause.active ? 'bg-slate-900 hover:bg-primary text-white cursor-pointer active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                      disabled={!cause.active}
                    >
                      {cause.active ? 'Donar Ahora' : 'Causa Pausada'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparencia" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[80px] p-12 lg:p-24 overflow-hidden relative">
            <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-primary/20 blur-[120px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10 items-center">
              <div>
                <h2 className="text-primary font-black uppercase text-sm tracking-widest mb-10">Transparencia Radical</h2>
                <h3 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter">¿A dónde va exactamente tu dinero?</h3>
                <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-12">
                   Auditamos cada transacción en tiempo real. Eliminamos la burocracia para que la ayuda fluya directamente al paciente.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center flex-1">
                    <div className="text-5xl font-black text-white mb-2">90%</div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Causa Directa</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center flex-1">
                    <div className="text-5xl font-black text-white mb-2">10%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Administración</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col items-center text-center bg-white p-12 lg:p-20 rounded-[80px] shadow-2xl">
                 <QrCode size={180} className="text-slate-900 mb-10" />
                 <h4 className="text-2xl font-black mb-4">Verificación Verdadera</h4>
                 <p className="text-slate-400 font-medium mb-10">Escanea para ver nuestro historial de transferencias hospitalarias.</p>
                 <button className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3">
                    Bajar Informe de Auditoría <Download size={20} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-primary font-black uppercase text-sm tracking-widest mb-8">Contáctanos</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 mb-10 tracking-tighter">Hablemos de cómo cambiar el mundo.</h3>
              <div className="space-y-10">
                 <div className="flex gap-6 items-start">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100"><MapPin className="text-primary" /></div>
                    <div>
                       <h5 className="font-black text-xl mb-1">Oficina Central</h5>
                       <p className="text-slate-400 font-medium font-mono">Av. Insurgentes 1200, Ciudad de México</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100"><Heart className="text-secondary" /></div>
                    <div>
                       <h5 className="font-black text-xl mb-1">Correo Global</h5>
                       <p className="text-slate-400 font-medium font-mono">impacto@medlink-ngo.org</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="bg-white rounded-[60px] p-12 lg:p-16 shadow-2xl border border-slate-100">
               <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado (simulación)"); }}>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Nombre Completo</label>
                     <input required className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-3xl outline-none focus:border-primary font-medium" placeholder="Escribe tu nombre..." />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Email</label>
                     <input required type="email" className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-3xl outline-none focus:border-primary font-medium" placeholder="Escribe tu email..." />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Tu Mensaje</label>
                     <textarea required rows={4} className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-3xl outline-none focus:border-primary font-medium resize-none" placeholder="¿Cómo te gustaría colaborar?" />
                  </div>
                  <button className="w-full bg-primary hover:bg-emerald-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                     Enviar Mensaje Humanitario
                  </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
             <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                  <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tighter text-slate-800">MedLink</span>
                </div>
                <p className="text-slate-400 font-medium leading-relaxed mb-10">Cada donación es un puente hacia la sanidad global.</p>
                <div className="flex gap-4">
                  {['IG', 'TW', 'IN'].map(s => <div key={s} className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center font-bold text-xs hover:border-primary hover:text-primary transition-all cursor-pointer">{s}</div>)}
                </div>
             </div>
             <div>
                <h5 className="font-black mb-8 text-lg">Secciones</h5>
                <ul className="space-y-4 text-slate-400 font-bold text-sm">
                   <li><a href="#inicio" className="hover:text-primary">Inicio</a></li>
                   <li><a href="#quienes-somos" className="hover:text-primary">Misión</a></li>
                   <li><a href="#casos" className="hover:text-primary">Casos Médicos</a></li>
                   <li><a href="#transparencia" className="hover:text-primary">Auditoría</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black mb-8 text-lg">Legal</h5>
                <ul className="space-y-4 text-slate-400 font-bold text-sm">
                   <li><a href="#" className="hover:text-primary">Privacidad</a></li>
                   <li><a href="#" className="hover:text-primary">Términos de Uso</a></li>
                   <li><a href="#" className="hover:text-primary">Contacto NGO</a></li>
                   <li><a href="#" className="hover:text-primary">Cookies</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black mb-8 text-lg">Control</h5>
                <p className="text-xs text-slate-400 font-medium mb-6">Acceso exclusivo para auditores y directivos.</p>
                <button 
                  onClick={() => setShowAdmin(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                   <Settings size={18} /> Panel de Admin
                </button>
             </div>
          </div>
          <div className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
             © 2026 MedLink Global Association. Built for Good.
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      <AnimatePresence>
        {selectedCause && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-[60px] shadow-2xl w-full max-w-xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={closeModal} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 cursor-pointer z-10"><X size={32} /></button>
              
              <div className="p-12 lg:p-16">
                {donationStep === 'amount' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <div className="flex gap-4 items-center mb-10">
                        <img src={selectedCause.img} className="w-20 h-20 rounded-3xl object-cover shadow-lg border-4 border-slate-50" referrerPolicy="no-referrer" />
                        <div>
                           <h4 className="text-2xl font-black text-slate-900 leading-tight">Apoyar impacto en <br/> {selectedCause.title}</h4>
                           <div className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Causa Verificada</div>
                        </div>
                     </div>

                     <form onSubmit={handleDonationSubmit} className="space-y-8">
                        <div className="grid grid-cols-3 gap-4">
                           {["25", "100", "500"].map(amt => (
                             <button
                               key={amt} type="button"
                               onClick={() => setDonationAmount(amt)}
                               className={`py-8 rounded-[40px] font-black text-3xl transition-all border-4 ${donationAmount === amt ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30' : 'bg-slate-50 text-slate-700 border-slate-50 hover:border-primary/20'}`}
                             >
                               ${amt}
                             </button>
                           ))}
                        </div>
                        <div className="relative">
                           <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">$</span>
                           <input 
                             type="number" required
                             value={donationAmount}
                             onChange={(e) => setDonationAmount(e.target.value)}
                             className="w-full bg-slate-100 border-4 border-slate-50 px-16 py-8 rounded-[40px] text-3xl font-black outline-none focus:border-primary transition-all"
                             placeholder="Monto"
                           />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="space-y-3">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-4">Donante</label>
                              <input 
                                required className="w-full bg-slate-100 border-4 border-slate-50 px-8 py-5 rounded-3xl outline-none focus:border-primary font-bold" 
                                placeholder="Nombre" value={donorData.name} onChange={e => setDonorData({...donorData, name: e.target.value})}
                              />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-4">Email</label>
                              <input 
                                required type="email" className="w-full bg-slate-100 border-4 border-slate-50 px-8 py-5 rounded-3xl outline-none focus:border-primary font-bold" 
                                placeholder="Email" value={donorData.email} onChange={e => setDonorData({...donorData, email: e.target.value})}
                              />
                           </div>
                        </div>
                        
                        <div className="bg-emerald-50 p-6 rounded-[30px] flex gap-4 items-center">
                           <ShieldCheck size={28} className="text-emerald-500" />
                           <p className="text-[10px] text-emerald-600 font-bold leading-relaxed uppercase tracking-widest">
                              Encriptación de grado bancario (Visa/Mastercard) simulada para este prototipo.
                           </p>
                        </div>

                        <button className="w-full bg-slate-900 hover:bg-primary text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4">
                           Confirmar Donación Segura <ArrowRight size={28} />
                        </button>
                     </form>
                  </motion.div>
                )}

                {donationStep === 'loading' && (
                  <div className="py-24 flex flex-col items-center text-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mb-12">
                      <Heart size={80} className="text-primary animate-pulse" />
                    </motion.div>
                    <h4 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Procesando Generosidad...</h4>
                    <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Verificando pasarela de pago</p>
                  </div>
                )}

                {donationStep === 'success' && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-16 flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-10"><CheckCircle size={80} className="text-primary" /></div>
                    <h4 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">¡Impacto Logrado!</h4>
                    <p className="text-slate-400 font-bold text-lg max-w-sm mb-12">
                      Tu donación de <span className="text-slate-900 font-black">${donationAmount}</span> ya está viajando para transformar la vida de {selectedCause.title.split(":")[1] || "nuestros pacientes"}.
                    </p>
                    <div className="w-full border-2 border-dashed border-slate-100 p-8 rounded-[40px] mb-12">
                       <QrCode size={64} className="mx-auto text-slate-300 mb-4" />
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recibo Digital #ML-{Math.floor(Math.random()*1000000)}</div>
                    </div>
                    <button onClick={closeModal} className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-primary/30">Cerrar y Volver</button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
