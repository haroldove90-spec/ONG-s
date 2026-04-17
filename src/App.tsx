/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
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
  Plus
} from "lucide-react";
import { useState, useEffect } from "react";

const CAUSES = [
  {
    id: 1,
    title: "Cirugía de Corazón para Sofía",
    img: "https://picsum.photos/seed/child1/800/600",
    category: "Cirugía Infantil",
    desc: "Sofía necesita una intervención urgente para corregir una cardiopatía congénita.",
    raised: 12500,
    goal: 25000,
    daysLeft: 12,
  },
  {
    id: 2,
    title: "Equipamiento Oncológico Rural",
    img: "https://picsum.photos/seed/medical2/800/600",
    category: "Infraestructura",
    desc: "Dotación de equipos de quimioterapia para la clínica San Rafael en zonas remotas.",
    raised: 45000,
    goal: 50000,
    daysLeft: 5,
  },
  {
    id: 3,
    title: "Programa de Vacunación Global",
    img: "https://picsum.photos/seed/health3/800/600",
    category: "Prevención",
    desc: "Campaña masiva para distribuir vacunas esenciales en comunidades vulnerables.",
    raised: 8000,
    goal: 15000,
    daysLeft: 20,
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-soft">
      {/* Header */}
      <header className={`glass-header transition-all duration-300 ${scrolled ? 'py-4 shadow-sm' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              MedDonation<span className="text-primary">.</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {["Inicio", "Quienes Somos", "Casos", "Transparencia", "Contacto"].map((link) => (
              <a key={link} href="#" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/20 cursor-pointer">
              <Plus className="w-4 h-4" /> Donación Rápida
            </button>
            <button className="lg:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Tus gotas de esperanza <br />
                <span className="text-primary italic">salvan vidas</span> reales.
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl">
                Conectamos a donantes globales con casos médicos verificados. 
                Transparencia total en cada centavo para garantizar que tu ayuda 
                llegue exactamente donde se necesita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20 cursor-pointer">
                  Donar Ahora <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-full font-bold border border-slate-200 transition-all transform hover:-translate-y-1 cursor-pointer">
                  Ver Casos Médicos
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-0 w-1/2 h-full hidden lg:block">
           <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
           <img 
             src="https://picsum.photos/seed/medical-hero/1200/1000" 
             alt="Happy child" 
             className="w-full h-full object-cover rounded-bl-[150px] mix-blend-multiply opacity-80"
             referrerPolicy="no-referrer"
           />
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Casos Resueltos", val: "1,200+", icon: Users },
              { label: "Vidas Impactadas", val: "450k+ ", icon: TrendingUp },
              { label: "Donantes Activos", val: "85k+ ", icon: Heart },
              { label: "Certificación", val: "Verified", icon: ShieldCheck },
            ].map((stat) => ( stat &&
              <div key={stat.label} className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-800 tracking-tight">{stat.val}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Causas Urgentes</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Cambia una vida hoy</h3>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
            Ver todas las causas <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CAUSES.map((cause) => (
            <motion.div
              key={cause.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] overflow-hidden card-shadow group"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={cause.img} 
                  alt={cause.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                  {cause.category}
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-xl font-extrabold text-slate-800 mb-4 hover:text-primary transition-colors cursor-pointer">
                  {cause.title}
                </h4>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  {cause.desc}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Recaudado</span>
                      <div className="text-xl font-extrabold text-primary">${cause.raised.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase">Meta</span>
                      <div className="text-sm font-bold text-slate-800">${cause.goal.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(cause.raised/cause.goal)*100}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-primary" /> 
                      {Math.round((cause.raised/cause.goal)*100)}% Completado
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-secondary" /> 
                      {cause.daysLeft} Días restantes
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-50 pt-8">
                  <button className="w-full bg-bg-soft hover:bg-primary hover:text-white text-primary py-4 rounded-2xl font-bold transition-all cursor-pointer">
                    Realizar Donación
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-primary p-2 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MedDonation</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                Dedicados a salvar vidas a través de la transparencia y la tecnología aplicada a la caridad médica global.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-8 text-lg">Causas</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Cirugía Infantil</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Atención Oncológica</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Equipamiento de Emergencia</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Vacunación Masiva</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-lg">Institución</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Nuestro Proceso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Informes Anuales</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto Directo</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-lg">Newsletter</h5>
              <p className="text-slate-400 text-sm mb-6">Suscríbete para recibir actualizaciones de impacto real.</p>
              <div className="flex gap-2">
                <input className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm w-full outline-none focus:border-primary transition-colors" placeholder="Tu email" />
                <button className="bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors"><ArrowRight /></button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-slate-500 text-center md:text-left">
            <div>© 2026 MedDonation Foundation. Todos los derechos reservados.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
