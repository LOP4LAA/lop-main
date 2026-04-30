const logoutUser = () => {
  localStorage.removeItem("lop-token")
  localStorage.removeItem("profile")
  window.location.href = "/login"
}

export { logoutUser }
