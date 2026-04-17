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
  Loader2
} from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";

const CAUSES = [
  {
    id: 1,
    title: "Latidos de Esperanza: Cirugía para Mateo",
    img: "https://picsum.photos/seed/child_mateo/800/600",
    category: "Cirugía Cardiovascular",
    desc: "Mateo tiene 4 años y una cardiopatía congénita que requiere una cirugía correctiva inmediata para asegurar su desarrollo.",
    raised: 11250,
    goal: 15000,
    daysLeft: 8,
  },
  {
    id: 2,
    title: "Agua Limpia, Salud para Todos",
    img: "https://picsum.photos/seed/water_well/800/600",
    category: "Prevención Comunitaria",
    desc: "Llevamos sistemas de filtración y clínicas móviles a comunidades en Oaxaca para erradicar enfermedades gastrointestinales.",
    raised: 4200,
    goal: 12000,
    daysLeft: 25,
  },
  {
    id: 3,
    title: "Guerreros contra el Cáncer",
    img: "https://picsum.photos/seed/oncology_help/800/600",
    category: "Oncología",
    desc: "Apoyamos a pacientes de escasos recursos con el costo de sus sesiones de quimioterapia y medicamentos oncológicos esenciales.",
    raised: 28500,
    goal: 30000,
    daysLeft: 4,
  }
];

const FAQS = [
  {
    q: "¿Cómo se utilizan los fondos recaudados?",
    a: "El 95% de cada donación se destina directamente al tratamiento médico y suministros. El 5% restante cubre costos operativos y de plataforma."
  },
  {
    q: "¿Mi donación es fiscalmente deducible?",
    a: "Sí, emitimos certificados fiscales válidos internacionalmente. Podrás descargarlo desde tu buzón de correo tras confirmar la donación."
  },
  {
    q: "¿Cómo verifican los casos médicos?",
    a: "Nuestro equipo médico audita cada informe clínico y factura directamente con los hospitales colaboradores antes de publicar un caso."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCause, setSelectedCause] = useState<typeof CAUSES[0] | null>(null);
  const [donationStep, setDonationStep] = useState<'amount' | 'loading' | 'success'>('amount');
  const [donationAmount, setDonationAmount] = useState<string>("50");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonationSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDonationStep('loading');
    setTimeout(() => {
      setDonationStep('success');
    }, 2000);
  };

  const closeModal = () => {
    setSelectedCause(null);
    setDonationStep('amount');
    setDonationAmount("50");
  };

  return (
    <div className="min-h-screen bg-bg-soft">
      {/* Header */}
      <header className={`glass-header transition-all duration-300 ${scrolled ? 'py-4 shadow-md' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-800">
              MedLink<span className="text-primary">.</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {["Inicio", "Quienes Somos", "Casos", "Transparencia", "FAQ"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-bold text-slate-600 hover:text-primary transition-colors tracking-wide">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedCause(CAUSES[2])}
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-xl shadow-primary/30 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Donación Rápida
            </button>
            <button className="lg:hidden text-slate-600 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-16 pb-24 lg:pt-32 lg:pb-48 overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <Users className="w-4 h-4" /> Comunidad Solidaria Global
              </div>
              <h1 className="text-5xl lg:text-[80px] font-extrabold text-slate-900 leading-[1.05] mb-8 tracking-tighter">
                Dando una <span className="text-primary italic">segunda oportunidad</span> a corazones pequeños.
              </h1>
              <p className="text-lg lg:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl font-medium">
                Transforma la realidad de miles de personas. Conectamos tu generosidad 
                con casos médicos críticos verificados en tiempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => {
                    const el = document.getElementById('casos');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-full font-extrabold transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary/30 cursor-pointer"
                >
                  Donar Ahora <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-12 py-5 rounded-full font-extrabold border-2 border-slate-100 transition-all transform hover:-translate-y-1 cursor-pointer">
                  Nuestra Misión
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Image */}
        <div className="absolute top-0 right-0 -z-0 w-1/2 h-full hidden lg:block">
           <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-transparent" />
           <motion.img 
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ opacity: 0.8, scale: 1 }}
             transition={{ duration: 1.5 }}
             src="https://picsum.photos/seed/aasha_ngo/1200/1000" 
             alt="Happy clinical patient" 
             className="w-full h-full object-cover rounded-bl-[200px] mix-blend-multiply"
             referrerPolicy="no-referrer"
           />
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Casos Concluidos", val: "1,245", icon: Users },
              { label: "Impacto Humano", val: "+450k", icon: TrendingUp },
              { label: "Donantes Activos", val: "88,203", icon: Heart },
              { label: "Verificación Médica", val: "100%", icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center gap-5"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.val}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section id="casos" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-primary font-extrabold uppercase tracking-[0.25em] text-sm mb-4">Causas Altamente Críticas</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">Acceso médico universal: <br className="hidden md:block"/> Nuestra prioridad real.</h3>
            </div>
            <button className="bg-primary/5 hover:bg-primary transition-all text-primary hover:text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 cursor-pointer group">
              Explorar Todas <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {CAUSES.map((cause) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[40px] overflow-hidden border border-slate-100 card-shadow group h-full flex flex-col"
              >
                <div className="h-72 relative overflow-hidden">
                  <img 
                    src={cause.img} 
                    alt={cause.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">{cause.category}</span>
                  </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                  <h4 className="text-2xl font-extrabold text-slate-900 mb-5 leading-tight group-hover:text-primary transition-colors">
                    {cause.title}
                  </h4>
                  <p className="text-slate-500 text-base mb-10 leading-relaxed font-medium">
                    {cause.desc}
                  </p>

                  <div className="mt-auto space-y-5">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Recaudado</div>
                        <div className="text-2xl font-extrabold text-primary">${cause.raised.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Meta</div>
                        <div className="text-lg font-bold text-slate-800">${cause.goal.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(cause.raised/cause.goal)*100}%` }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
                        className="h-full bg-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                      </motion.div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em]">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        {Math.round((cause.raised/cause.goal)*100)}% Completado
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" /> 
                        {cause.daysLeft} Días Restantes
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedCause(cause)}
                      className="w-full mt-10 bg-slate-900 hover:bg-primary text-white py-5 rounded-2xl font-extrabold transition-all transform active:scale-95 cursor-pointer shadow-lg shadow-slate-200"
                    >
                      Donar Ahora
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-primary font-extrabold uppercase tracking-widest text-sm mb-6">Transparencia Total</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight">Preguntas Frecuentes</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Creemos que la confianza es la base de toda ayuda. Aquí resolvemos tus dudas sobre nuestro proceso operativo.
              </p>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all hover:bg-white/10 group"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="p-8 flex justify-between items-center">
                    <h5 className="font-bold text-white text-lg pr-4">{faq.q}</h5>
                    <div className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                      <ChevronDown className="text-primary text-xl" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-8 text-slate-400 leading-relaxed font-medium"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-extrabold tracking-tighter text-slate-800">MedLink</span>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium mb-10">
                Somos una plataforma dedicada a romper las barreras financieras 
                del acceso a la salud global mediante tecnología de impacto social.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
                {['fb', 'tw', 'ig', 'in'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                    <span className="text-[10px] font-bold uppercase">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-extrabold mb-10 text-xl tracking-tight">Especialidades</h5>
              <ul className="space-y-5 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Cirugía Cardíaca</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Oncología Infantil</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ayuda Humanitaria</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tratamientos Visuales</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-extrabold mb-10 text-xl tracking-tight">Plataforma</h5>
              <ul className="space-y-5 text-slate-500 font-bold text-sm">
                <li><a href="#inicio" className="hover:text-primary transition-colors">Inicio</a></li>
                <li><a href="#casos" className="hover:text-primary transition-colors">Ver Casos</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">Transparencia</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Portal Aliados</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-extrabold mb-10 text-xl tracking-tight">Contacto Directo</h5>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-slate-500 text-sm font-bold">Av. Insurgentes Sur 1200, <br /> CDMX, México</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-slate-500 text-sm font-bold">+52 (55) 4567 8910</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-10 text-xs font-extrabold text-slate-400 tracking-widest uppercase text-center md:text-left">
            <div>© 2026 MedLink Global NGO. Certificación ISO-9001 Salud Social.</div>
            <div className="flex gap-10 flex-wrap justify-center">
              <a href="#" className="hover:text-primary">Privacidad</a>
              <a href="#" className="hover:text-primary">Términos</a>
              <a href="#" className="hover:text-primary">Política de Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Donation Modal Simulator */}
      <AnimatePresence>
        {selectedCause && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden relative"
            >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X size={32} />
              </button>

              <div className="p-10 lg:p-14">
                {donationStep === 'amount' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tighter">Apoyar a {selectedCause.title.split(":")[1] || selectedCause.title}</h4>
                    <p className="text-slate-500 font-medium mb-10">Selecciona el monto de tu donación impacto.</p>
                    
                    <form onSubmit={handleDonationSubmit} className="space-y-8">
                      <div className="grid grid-cols-3 gap-4">
                        {["10", "50", "100"].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setDonationAmount(amt)}
                            className={`py-6 rounded-3xl font-extrabold text-2xl transition-all border-2 ${donationAmount === amt ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-700 border-slate-100 hover:border-primary'}`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                        <input 
                          type="number" 
                          placeholder="Otro monto"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-100 px-12 py-6 rounded-3xl text-2xl font-extrabold outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Nombre</label>
                          <input required className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-primary" placeholder="Juan Pérez" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Email</label>
                          <input required type="email" className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-primary" placeholder="juan@email.com" />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-3xl font-extrabold text-xl shadow-2xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                      >
                        Confirmar Donación de Muestra <ChevronDown className="rotate-[-90deg]" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {donationStep === 'loading' && (
                  <div className="py-24 flex flex-col items-center text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="mb-8"
                    >
                      <Loader2 size={64} className="text-primary" />
                    </motion.div>
                    <h4 className="text-3xl font-extrabold text-slate-900 mb-2">Procesando impacto...</h4>
                    <p className="text-slate-500 font-medium">Conectando con la red segura de MedLink.</p>
                  </div>
                )}

                {donationStep === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-10">
                      <CheckCircle size={56} className="text-primary" />
                    </div>
                    <h4 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter">¡Gracias por tu apoyo!</h4>
                    <p className="text-slate-500 font-medium mb-10 max-w-sm">
                      Tu generosidad de <span className="text-slate-900 font-bold">${donationAmount}</span> marcará una diferencia real para {selectedCause.title.split(":")[1] || "nuestros pacientes"}.
                    </p>
                    <p className="bg-slate-50 px-6 py-3 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
                      Esta es una simulación de éxito
                    </p>
                    <button 
                      onClick={closeModal}
                      className="bg-slate-900 hover:bg-primary text-white px-12 py-5 rounded-full font-extrabold transition-all cursor-pointer"
                    >
                      Cerrar Demo
                    </button>
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
