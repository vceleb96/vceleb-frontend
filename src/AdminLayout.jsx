function AdminLayout({ children }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: "#222",
          color: "#fff",
          padding: 20
        }}
      >
        <h3>VCeleb Admin</h3>

        <div style={{ marginTop: 20 }}>
          <a href="/admin/celebs" style={linkStyle}>
            Celebrities
          </a>

          <a href="/admin/bookings" style={linkStyle}>
            Bookings
          </a>

          <button onClick={logout} style={logoutStyle}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 30 }}>{children}</div>
    </div>
  );
}

const linkStyle = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  marginBottom: 15
};

const logoutStyle = {
  marginTop: 20,
  width: "100%"
};

export default AdminLayout;
