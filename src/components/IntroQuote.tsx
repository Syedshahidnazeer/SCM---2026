export default function IntroQuote() {
  return (
    <section 
      className="intro-quote" 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem 6rem",
        background: "var(--sequence-bg)",
        textAlign: "center",
        position: "relative",
        zIndex: 2
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <p style={{
          color: "rgba(255, 255, 255, 0.8)",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          &ldquo;We didn&apos;t just assemble a cycle. We engineered a seamless extension of your daily journey.&rdquo;
        </p>
        <p style={{
          color: "var(--gold)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginTop: "1.5rem",
          fontWeight: 700
        }}>
          Discover the Mechanics
        </p>
      </div>
    </section>
  );
}
