const AuthService = require("../services/AuthService");

const registerUser = async (req, res) => {
  try {
    const userData = await AuthService.register(req.body);

    res.status(201).json({
      success: true,
      message: "Registrasi akun berhasil!",
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login berhasil!",
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout berhasil. Silakan hapus token di sisi client.",
  });
};

const forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, forgotPasswordUser };
