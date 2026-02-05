function AdminHeader() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}
    >
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminHeader;
