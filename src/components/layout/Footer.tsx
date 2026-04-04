export default function Footer() {
  return (
    <footer
      style={{
        padding: "16px 24px",
        textAlign: "center",
        borderTop: "0.5px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ fontSize: 12, color: "var(--text3)" }}>
        © {new Date().getFullYear()} Developed by{" "}
        <span style={{ color: "var(--text)", fontWeight: 500 }}>
          FrictionLab
        </span>
      </div>
    </footer>
  );
}
