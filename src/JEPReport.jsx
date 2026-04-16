import { useState, useEffect, useRef } from "react";

function useOnScreen(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const t = { up: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", scale: "scale(0.93)" };
  return (
    <div ref={ref} style={{ ...style, opacity: visible ? 1 : 0, transform: visible ? "none" : t[direction], transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function AnimNum({ target, suffix = "" }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let n = 0; const step = target / 50;
    const iv = setInterval(() => { n += step; if (n >= target) { setVal(target); clearInterval(iv); } else setVal(Math.floor(n)); }, 20);
    return () => clearInterval(iv);
  }, [visible, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Accordion({ title, subtitle, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: BG2, borderRadius: 14, border: `1px solid ${open ? color + "33" : BD}`, overflow: "hidden", transition: "all 0.3s", marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 3, height: 24, borderRadius: 2, background: color }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
            {subtitle && <div style={{ fontFamily: MONO, fontSize: 10, color: TX3, marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", transform: open ? "rotate(180deg)" : "none" }}>
          <span style={{ fontSize: 12, color }}>▾</span>
        </div>
      </div>
      {open && <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${BD}`, paddingTop: 16 }}>{children}</div>}
    </div>
  );
}

const OR = "#F58634";
const OR2 = "#FBAB6A";
const CY = "#00AFEF";
const GR = "#00A859";
const CR = "#ED2F59";
const YL = "#FFCC29";
const BG = "#09090B";
const BG2 = "#111113";
const BG3 = "#18181B";
const TX = "#FAFAFA";
const TX2 = "#A1A1AA";
const TX3 = "#52525B";
const BD = "rgba(255,255,255,0.06)";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Sora', sans-serif";

export default function JEPReport() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);
  const ho = Math.min(scrollY / 200, 1);

  const spherePillars = [
    { n: "01", title: "El Gigante Industrial", concept: "Drone e indoor de la planta de Acopi — CNC, Láser, Inyección a gran escala.", goal: '"No somos un intermediario. Somos la fábrica."', color: OR },
    { n: "02", title: "Ingeniería del Bienestar", concept: "Experto explicando cómo la ergonomía JEP reduce el ausentismo y retiene talento.", goal: '"Son expertos en productividad, no solo en muebles."', color: CY },
    { n: "03", title: "El Espacio como Activo", concept: "Time-lapse de un espacio vacío a una oficina vibrante y funcional.", goal: '"Yo quiero que mi empresa se vea y funcione así."', color: GR },
    { n: "04", title: "La Promesa de 40 Años", concept: "Legado: de 1983 a hoy. Rostros de operarios expertos y clientes de larga data.", goal: '"Llevan 40 años cumpliendo. Son el aliado seguro."', color: YL },
  ];

  const webChange = [
    ["Arquitectura", "WordPress monolítico 2019", "Next.js + WordPress Headless"],
    ["Tienda online", "Subdominio separado, sin UX", "Integrada con checkout completo"],
    ["Idiomas", "Solo español", "Español + Inglés"],
    ["Pasarela de pagos", "Pago referenciado externo", "Wompi integrado en checkout"],
    ["Canal B2B", "Sin flujo definido", "Cotizador + showroom de proyectos"],
    ["Showroom de proyectos", "Inexistente", "12 proyectos reales publicados"],
    ["Catálogo e-commerce", "Sin estructura", "4 categorías · 14 referencias"],
  ];

  const rawContent = [
    { icon: "▶", title: "Tomas aéreas con drone", desc: "Planta de Acopi Yumbo — escala industrial real desde el aire." },
    { icon: "⚙", title: "Proceso productivo", desc: "Máquinas CNC, centro de mecanizado, Rover (madera), inyección." },
    { icon: "🏢", title: "Espacios implementados", desc: "Proyectos terminados en clientes reales: oficinas, universidades, HORECA." },
    { icon: "🎙", title: "Entrevistas y testimonios", desc: "Operarios expertos y equipo de JEP hablando del producto." },
  ];

  const bm = [
    { icon: "✓", title: "Auditoría completa del BM", desc: "Revisión del estado de cuentas publicitarias, píxeles, activos y conexiones." },
    { icon: "✓", title: "Reestructuración y limpieza", desc: "Una sola cuenta de negocio principal con cuentas publicitarias correctamente vinculadas." },
    { icon: "✓", title: "WhatsApp Business conectado", desc: "Integración oficial al BM — habilita campañas con destino directo a WhatsApp y API de Conversiones." },
    { icon: "✓", title: "Píxel + API de Conversiones", desc: "Instalado en la nueva web con trazabilidad precisa de compra, cotización y contacto." },
    { icon: "✓", title: "Dominio jep.com.co verificado", desc: "Protección de activos y cumplimiento de políticas de Meta." },
  ];

  const summaryNums = [
    { n: 100, s: "+", label: "GB contenido RAW", color: OR },
    { n: 12, s: "", label: "Proyectos en showroom", color: CY },
    { n: 14, s: "", label: "Referencias e-commerce", color: GR },
    { n: 4, s: "", label: "Pilares Sphere Funnel", color: YL },
  ];

  return (
    <div ref={ref} style={{ fontFamily: SANS, background: BG, color: TX, height: "100vh", overflow: "auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${OR}44;border-radius:3px;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,${BD},transparent);margin:64px 0;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
        .dot-live{animation:pulse 2s infinite;}
      `}</style>

      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: `rgba(9,9,11,${ho * 0.95})`, backdropFilter: ho > 0.3 ? "blur(20px)" : "none", borderBottom: `1px solid rgba(255,255,255,${ho * 0.06})`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${OR},${CR})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800 }}>S</span>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: TX2 }}>SYNCRA</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 10, color: TX3, letterSpacing: "0.06em" }}>JEP MOBILIARI · FEB–ABR 2026</span>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>

        {/* HERO */}
        <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${OR}33 1px,transparent 1px),linear-gradient(90deg,${OR}33 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${OR}0E,transparent 70%)`, pointerEvents: "none" }} />

          <Reveal delay={0.1}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", color: OR2, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <div className="dot-live" style={{ width: 6, height: 6, borderRadius: "50%", background: GR, boxShadow: `0 0 8px ${GR}` }} />
              REPORTE DE AVANCE — 2 MESES
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 6, background: `linear-gradient(135deg,${TX},${TX2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              JEP
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 32, background: `linear-gradient(135deg,${OR},${CR})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Mobiliari.
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: 16, color: TX2, lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
              De una web caída y un ecosistema digital inexistente, a una plataforma de alto rendimiento, más de <span style={{ color: TX, fontWeight: 600 }}>100 GB de contenido grabado</span>, un embudo de ventas activo y un BM de Meta blindado — todo en 60 días.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[{ l: "Cliente", v: "JEP Mobiliari" }, { l: "Período", v: "Feb – Abr 2026" }, { l: "Estado", v: "En progreso" }].map((t, i) => (
                <div key={i} style={{ padding: "10px 16px", background: BG2, borderRadius: 10, border: `1px solid ${BD}` }}>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.1em", marginBottom: 3 }}>{t.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.7}>
            <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 8, color: TX3 }}>
              <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom,${OR},transparent)` }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em" }}>SCROLL</span>
            </div>
          </Reveal>
        </section>

        {/* ===== 01: NUEVA PLATAFORMA ===== */}
        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: MONO, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${OR},${CR})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>01</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.12em" }}>ENTREGABLE</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: OR2 }}>Arquitectura · Desarrollo · Integración</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>Nueva Plataforma Digital — <span style={{ color: OR2 }}>De cero a producción</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 24 }}>
              El sitio anterior era un WordPress genérico de 2019, sin tienda integrada, sin UX y sin capacidad para comunicar los 40 años de trayectoria industrial de JEP. Se construyó una plataforma híbrida de nueva generación con <span style={{ color: TX, fontWeight: 600 }}>WordPress headless + Next.js (React)</span>, bilingüe desde el origen. El dominio definitivo <span style={{ color: OR2, fontWeight: 600 }}>jepmobiliari.com</span> ya apunta al nuevo sitio — el staging en Vercel es el entorno de producción activo mientras se finaliza el lanzamiento.
            </p>
          </Reveal>

          {/* Mockup vieja vs nueva */}
          <Reveal delay={0.2} direction="scale">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {/* Vieja */}
              <div style={{ background: BG2, borderRadius: 14, overflow: "hidden", border: `1px solid ${CR}22` }}>
                <div style={{ padding: "10px 14px", background: BG3, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#FF5F57","#FFBD2E","#28C840"].map((c,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:c}}/>)}
                  </div>
                  <div style={{ fontFamily: MONO, flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px", fontSize: 9, color: TX3, textAlign: "center" }}>jepmobiliari.com</div>
                </div>
                <div style={{ padding: "20px 16px" }}>
                  <div style={{ fontFamily: MONO, fontSize: 8, color: CR, letterSpacing: "0.1em", marginBottom: 8 }}>ANTES</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Siente el cambio</div>
                  <div style={{ fontSize: 10, color: TX3, marginBottom: 12 }}>Siéntate y Siéntete diferente</div>
                  {["Sin tienda integrada","Sin flujo B2B","Sin velocidad","Solo español"].map((t,i)=>(
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span style={{ color: CR, fontSize: 10 }}>✕</span>
                      <span style={{ fontSize: 11, color: TX3 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Nueva */}
              <div style={{ background: `linear-gradient(135deg,${OR}08,${CY}06)`, borderRadius: 14, overflow: "hidden", border: `1px solid ${OR}22` }}>
                <div style={{ padding: "10px 14px", background: BG3, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#FF5F57","#FFBD2E","#28C840"].map((c,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:c}}/>)}
                  </div>
                  <div style={{ fontFamily: MONO, flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px", fontSize: 9, color: TX3, textAlign: "center" }}>jep-ecommerce.vercel.app</div>
                </div>
                <div style={{ padding: "20px 16px" }}>
                  <div style={{ fontFamily: MONO, fontSize: 8, color: GR, letterSpacing: "0.1em", marginBottom: 8 }}>AHORA</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Ambientes Corporativos</div>
                  <div style={{ fontSize: 10, color: TX2, marginBottom: 12 }}>Ingeniería de precisión</div>
                  {["Checkout Wompi activo","Showroom B2B + cotizador","Next.js · velocidad máxima","ES / EN bilingüe"].map((t,i)=>(
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span style={{ color: GR, fontSize: 10 }}>✓</span>
                      <span style={{ fontSize: 11, color: TX2 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tabla de cambios */}
          <Reveal delay={0.3}>
            <Accordion title="Tabla de cambios completa" subtitle={`${webChange.length} aspectos transformados`} color={OR} defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {webChange.map(([asp, ant, aho], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 12px", background: `${BG}88`, borderRadius: 10, border: `1px solid ${BD}` }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: TX3 }}>{asp}</div>
                    <div style={{ fontSize: 11, color: CR, textDecoration: "line-through" }}>{ant}</div>
                    <div style={{ fontSize: 11, color: GR }}>{aho}</div>
                  </div>
                ))}
              </div>
            </Accordion>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={{ marginTop: 16, padding: "14px 18px", background: BG2, borderRadius: 12, border: `1px solid ${BD}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, color: TX3 }}>COMPLEJIDAD DEL ENTREGABLE</span>
                <span style={{ fontFamily: MONO, fontSize: 10, color: OR2 }}>Muy Alta</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "95%", borderRadius: 2, background: `linear-gradient(90deg,${OR},${CR})`, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s" }} />
              </div>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ===== 02: CONTENIDO RAW ===== */}
        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: MONO, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${CY},#0891B2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>02</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.12em" }}>ENTREGABLE</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: CY }}>Producción · Contenido · Material RAW</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>Más de 100 GB de <span style={{ color: CY }}>Contenido RAW</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 24 }}>
              El activo más importante generado en estos dos meses no es la web — es el banco de contenido audiovisual. JEP ahora tiene materia prima para responder la pregunta más importante de un cliente B2B en los primeros 5 segundos: <span style={{ color: TX, fontWeight: 600 }}>"¿Cómo sé que esto es serio?"</span>
            </p>
          </Reveal>

          {/* Número grande */}
          <Reveal delay={0.2} direction="scale">
            <div style={{ background: `linear-gradient(135deg,${CY}0A,${OR}06)`, borderRadius: 18, padding: "28px 32px", border: `1px solid ${CY}18`, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 72, fontWeight: 800, background: `linear-gradient(135deg,${CY},${OR})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                <AnimNum target={100} suffix="+" />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 12, color: TX3, letterSpacing: "0.1em", marginTop: 8 }}>GIGABYTES DE MATERIAL GRABADO EN FORMATO RAW</div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {rawContent.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", background: BG2, borderRadius: 12, border: `1px solid ${BD}`, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${CY}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: TX2, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={{ background: `${CY}0C`, borderRadius: 14, padding: "18px 20px", border: `1px solid ${CY}18` }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: CY, letterSpacing: "0.12em", marginBottom: 8, fontWeight: 600 }}>¿POR QUÉ IMPORTA?</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: TX2 }}>
                Este banco de contenido es la materia prima de <span style={{ color: TX, fontWeight: 600 }}>toda la estrategia de marketing digital para los próximos 12 meses</span>. Sin él, cualquier campaña dependería de imágenes genéricas que no diferencian a JEP de ningún competidor.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ===== 03: SPHERE FUNNEL ===== */}
        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: MONO, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${OR},${YL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#000" }}>03</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.12em" }}>ENTREGABLE</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: YL }}>Estrategia · Contenido · Embudo</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>Embudo <span style={{ color: YL }}>Sphere Funnel</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 24 }}>
              En lugar de un embudo lineal donde el cliente pasa por etapas secuenciales, el <span style={{ color: TX, fontWeight: 600 }}>Sphere Funnel</span> rodea al cliente ideal con 4 mensajes simultáneos que generan una percepción de omnipresencia. Los <span style={{ color: GR, fontWeight: 600 }}>4 videos ya están finalizados</span> y listos para activar en campañas.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {spherePillars.map((p, i) => (
                <div key={i} style={{ background: BG2, borderRadius: 14, padding: "18px 20px", border: `1px solid ${p.color}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{ fontFamily: MONO, width: 32, height: 32, borderRadius: 8, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: p.color }}>{p.n}</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</div>
                  </div>
                  <p style={{ fontSize: 13, color: TX2, lineHeight: 1.6, marginBottom: 8 }}>{p.concept}</p>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: p.color, background: `${p.color}10`, borderRadius: 8, padding: "8px 12px", lineHeight: 1.5 }}>{p.goal}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ marginTop: 16, padding: "14px 18px", background: BG2, borderRadius: 12, border: `1px solid ${BD}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, color: TX3 }}>COMPLEJIDAD DEL ENTREGABLE</span>
                <span style={{ fontFamily: MONO, fontSize: 10, color: YL }}>Alta</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "88%", borderRadius: 2, background: `linear-gradient(90deg,${OR},${YL})` }} />
              </div>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ===== 04: ESTRATEGIA EDUCATIVO ===== */}
        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: MONO, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${GR},#047857)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>04</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.12em" }}>ENTREGABLE</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: GR }}>Estrategia de segmento · B2B Educación</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>Estrategia <span style={{ color: GR }}>Sector Educativo</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 24 }}>
              El sector educativo es uno de los segmentos de mayor potencial para JEP dado su historial con universidades y colegios. Se diseñó una estrategia de captación específica para este perfil de decisor.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Perfil del decisor", content: "Rector, Director Administrativo o Coordinador de Infraestructura. Su prioridad: durabilidad, cumplimiento normativo y precio por volumen.", color: GR },
                { label: "Propuesta diferenciada", content: "JEP no vende pupitres — diseña ambientes pedagógicos que se adaptan a los nuevos modelos de enseñanza activa y colaborativa.", color: CY },
                { label: "Caso ancla", content: "Universidad Santiago de Cali (USC) como proyecto de referencia con galería de alta resolución publicada en el showroom de la web.", color: OR },
                { label: "Activos de contenido", content: "Material del sector educativo incluido dentro del banco de 100+ GB para activar campañas específicas al segmento.", color: YL },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", background: BG2, borderRadius: 12, border: `1px solid ${item.color}18`, alignItems: "flex-start" }}>
                  <div style={{ width: 3, height: "100%", minHeight: 20, borderRadius: 2, background: item.color, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: item.color, letterSpacing: "0.1em", marginBottom: 5 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: TX2, lineHeight: 1.6 }}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ===== 05: BM META ===== */}
        <section>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: MONO, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${CR},#9F1239)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>05</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.12em" }}>ENTREGABLE</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: CR }}>Meta Ads · BM · WhatsApp · Píxel</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>Ecosistema Meta — <span style={{ color: CR }}>Reestructuración completa</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 24 }}>
              Antes de intervenir, el Business Manager tenía problemas críticos que impedían escalar cualquier inversión de forma segura. Sin este trabajo, <span style={{ color: TX, fontWeight: 600 }}>cada peso invertido en pauta hubiera ido a un sistema roto</span>.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {bm.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", background: BG2, borderRadius: 12, border: `1px solid ${BD}` }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${GR}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 11, color: GR }}>✓</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: TX2, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={{ background: `${CR}0C`, borderRadius: 14, padding: "18px 20px", border: `1px solid ${CR}18` }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: CR, letterSpacing: "0.12em", marginBottom: 8, fontWeight: 600 }}>RESULTADO</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: TX2 }}>
                El ecosistema está <span style={{ color: TX, fontWeight: 600 }}>blindado y listo para escalar inversión de forma segura</span>. Datos precisos, atribución correcta, cero riesgo de bloqueo de cuentas.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ANTES VS AHORA */}
        <section>
          <Reveal>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em", textAlign: "center" }}>Antes <span style={{ color: TX3 }}>vs</span> Ahora</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Reveal delay={0.1} direction="left">
              <div style={{ background: BG2, borderRadius: 16, padding: 24, border: `1px solid ${CR}15`, height: "100%" }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: CR, marginBottom: 16, fontWeight: 600 }}>ANTES</div>
                {["Web caída sin e-commerce","Sin canal digital activo","BM de Meta sin estructura","Sin píxel ni trazabilidad","Sin contenido audiovisual","Operación 100% presencial"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: CR, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: 13, color: TX2, lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="right">
              <div style={{ background: `linear-gradient(135deg,${OR}08,${CY}05)`, borderRadius: 16, padding: 24, border: `1px solid ${OR}20`, height: "100%" }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: GR, marginBottom: 16, fontWeight: 600 }}>AHORA</div>
                {["Plataforma headless de alto rendimiento","E-commerce + showroom B2B activos","BM reestructurado y blindado","Píxel + API Conversiones activos","100+ GB de contenido RAW listo","Sphere Funnel con 4 pilares diseñados"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: GR, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="divider" />

        {/* RESUMEN NUMÉRICO */}
        <section>
          <Reveal>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em", textAlign: "center" }}>En <span style={{ color: OR2 }}>números</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BD, borderRadius: 16, overflow: "hidden", marginBottom: 1 }}>
              {summaryNums.map((s, i) => (
                <div key={i} style={{ background: BG2, padding: "24px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: MONO, fontSize: 36, fontWeight: 700, color: s.color }}><AnimNum target={s.n} suffix={s.s} /></div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.06em", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: BD, borderRadius: 0, overflow: "hidden", borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
              {[
                { n: 2, s: "", label: "Idiomas (ES/EN)", color: CY },
                { n: 5, s: "", label: "Canales BM activos", color: CR },
                { n: 40, s: " años", label: "Trayectoria comunicada", color: OR },
              ].map((s, i) => (
                <div key={i} style={{ background: BG2, padding: "20px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: s.color }}><AnimNum target={s.n} suffix={s.s} /></div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.04em", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* PRÓXIMOS PASOS */}
        <section>
          <Reveal>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", color: OR2, marginBottom: 8 }}>LO QUE VIENE ESTA SEMANA</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>Próximos <span style={{ color: OR2 }}>pasos</span></h2>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.7, marginBottom: 20 }}>
              La infraestructura está construida. El contenido está listo. Los dos pasos que cierran esta etapa son:
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: `linear-gradient(135deg,${CR}0C,${OR}06)`, borderRadius: 16, padding: "24px 22px", border: `1px solid ${CR}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ fontFamily: MONO, width: 32, height: 32, borderRadius: 8, background: `${CR}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: CR }}>01</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Encender campañas — The Spark</div>
                </div>
                <p style={{ fontSize: 14, color: TX2, lineHeight: 1.7, paddingLeft: 44 }}>
                  Activación de <span style={{ color: TX, fontWeight: 600 }}>Google Ads</span> para captura de demanda caliente + <span style={{ color: TX, fontWeight: 600 }}>Meta Ads con el Sphere Funnel</span> ya producido. El BM está reestructurado, el píxel está activo, los 4 videos están listos. Todo apunta al encendido.
                </p>
              </div>
              <div style={{ background: `linear-gradient(135deg,${CY}0A,${GR}06)`, borderRadius: 16, padding: "24px 22px", border: `1px solid ${CY}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ fontFamily: MONO, width: 32, height: 32, borderRadius: 8, background: `${CY}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: CY }}>02</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Capacitación del equipo JEP</div>
                </div>
                <p style={{ fontSize: 14, color: TX2, lineHeight: 1.7, paddingLeft: 44 }}>
                  Sesión de entrenamiento con el equipo interno de JEP en el <span style={{ color: TX, fontWeight: 600 }}>admin de WordPress</span> — cómo subir y actualizar productos, gestionar el catálogo y manejar el contenido del sitio de forma autónoma.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* FOOTER */}
        <section style={{ paddingBottom: 80, textAlign: "center" }}>
          <Reveal>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg,${OR},${CR})`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20, fontWeight: 800 }}>S</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Syncra</div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: TX3, letterSpacing: "0.08em", marginBottom: 32 }}>FEB – ABR 2026 · JEP MOBILIARI</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ padding: "16px 24px", background: BG2, borderRadius: 14, border: `1px solid ${BD}`, display: "inline-block" }}>
              <div style={{ fontFamily: MONO, fontSize: 9, color: TX3, letterSpacing: "0.1em", marginBottom: 4 }}>CONFIDENCIAL</div>
              <div style={{ fontSize: 13, color: TX2 }}>Este informe fue preparado por Syncra exclusivamente para JEP Mobiliari.</div>
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}
