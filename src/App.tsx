/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Database, Shield, Globe, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";

export default function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      {/* Header */}
      <header className="px-6 md:px-16 py-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border">
        <div className="text-2xl font-extrabold tracking-tighter mb-6 md:mb-0">
          MEDLINK GLOBAL / 2026
        </div>
        <nav className="flex flex-wrap gap-8">
          {["Inicio", "Casos Clínicos", "Transparencia", "Donar Ahora"].map((item) => (
            <span key={item} className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-accent cursor-pointer transition-colors">
              {item}
            </span>
          ))}
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border min-h-[400px]">
          <div className="p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border bg-white lg:bg-transparent">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-extrabold leading-[0.85] tracking-[-0.04em] mb-8"
            >
              CONFIANZA <br /> RADICAL.
            </motion.h1>
            <p className="text-xl md:text-2xl text-muted max-w-md leading-relaxed">
              Fase 1: Arquitectura diseñada para la transparencia absoluta y la conversión masiva de donantes globales.
            </p>
          </div>
          <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="text-xs uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Stack de Alto Rendimiento
            </div>
            <div className="flex flex-wrap gap-3 mb-10">
              {["React 19", "Firebase/Firestore", "Node.js", "Stripe API", "Vite"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-ink text-white font-mono text-xs rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Globe className="w-4 h-4 text-accent" /> ESCALABILIDAD
                </div>
                <p className="text-xs text-muted leading-relaxed">Arquitectura serverless distribuida globalmente con latencia mínima.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Shield className="w-4 h-4 text-accent" /> INTEGRIDAD
                </div>
                <p className="text-xs text-muted leading-relaxed">Persistencia de datos ACID Garantizada para seguridad financiera total.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Database Schema Section */}
        <section className="p-8 md:p-16">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tighter mb-2">Esquema de Datos (Logical Schema)</h2>
            <p className="text-muted font-mono text-sm underline decoration-accent underline-offset-4">FIRESTORE DOCUMENT STRUCTURE</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border"
          >
            {[
              {
                title: "Usuarios",
                fields: [
                  { name: "id", type: "UUID" },
                  { name: "full_name", type: "STRING" },
                  { name: "email", type: "EMAIL" },
                  { name: "role", type: "ENUM" },
                  { name: "auth_provider", type: "STRING" }
                ]
              },
              {
                title: "Casos_Pacientes",
                fields: [
                  { name: "id", type: "UUID" },
                  { name: "financial_goal", type: "DECIMAL" },
                  { name: "current_amount", type: "DECIMAL" },
                  { name: "status", type: "ENUM" },
                  { name: "is_verified", type: "BOOL" }
                ]
              },
              {
                title: "Donaciones",
                fields: [
                  { name: "id", type: "UUID" },
                  { name: "case_id", type: "RELATION", active: true },
                  { name: "donor_id", type: "RELATION", active: true },
                  { name: "tx_hash", type: "STRING" },
                  { name: "amount", type: "DECIMAL" }
                ]
              },
              {
                title: "Documentación",
                fields: [
                  { name: "id", type: "UUID" },
                  { name: "case_id", type: "RELATION", active: true },
                  { name: "url_storage", type: "STRING" },
                  { name: "type", type: "ENUM" },
                  { name: "verifier_id", type: "RELATION" }
                ]
              }
            ].map((table) => (
              <motion.div key={table.title} variants={itemVariants} className="bg-white p-8 group hover:bg-bg transition-colors cursor-default">
                <div className="font-mono text-[10px] font-bold bg-[#F1F1F1] px-2 py-1 inline-block mb-6 uppercase tracking-wider group-hover:bg-accent group-hover:text-white transition-colors">
                  {table.title}
                </div>
                <ul className="space-y-4">
                  {table.fields.map((field) => (
                    <li key={field.name} className="flex justify-between items-center text-sm border-b border-border/30 pb-2">
                      <span className="font-medium">{field.name}</span>
                      {field.type === "RELATION" ? (
                        <ChevronRight className="w-3 h-3 text-accent font-bold" />
                      ) : (
                        <span className="font-mono text-[10px] text-muted uppercase tracking-tighter">{field.type}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Principles / Conversion Grid */}
        <section className="bg-ink text-white p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
            <CheckCircle2 size={400} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-extrabold tracking-tighter">01</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-accent">Transparencia</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cada donación es rastreable. Integración de pruebas médicas auditadas antes de activar cualquier caso.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-extrabold tracking-tighter">02</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-accent">Conversión</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Flujo de donación de un solo clic con Google Pay y Apple Pay integrados a través de Stripe.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-extrabold tracking-tighter">03</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-accent">Escala</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                CDN global y bases de datos en el edge para que un donante en Tokyo y uno en CDMX tengan la misma experiencia vibrante.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-6 border-t border-border flex flex-col md:flex-row justify-between items-center bg-white space-y-4 md:space-y-0">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          SYSTEM STATUS: OPTIMIZED FOR SCALE
        </div>
        <div className="text-[10px] text-muted uppercase tracking-widest font-semibold">
          © 2026 MEDLINK ARCHITECTURE BLUEPRINT - CIUDAD DE MÉXICO / GLOBAL
        </div>
      </footer>
    </div>
  );
}
