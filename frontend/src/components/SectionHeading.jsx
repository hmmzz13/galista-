import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function SectionHeading({ kicker, title, intro, align = "left", dark = false }) {
  return (
    <div className={`${align === "center" ? "text-center flex flex-col items-center" : ""} max-w-3xl`}>
      <Reveal>
        <span className={`kicker ${align === "center" ? "kicker--center" : ""}`}>{kicker}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mt-5"
          style={dark ? { color: "var(--creme)" } : undefined}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-creme/70" : "text-cafemuted"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
