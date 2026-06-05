async function testForgotPassword() {
  console.log("⏳ Mengirim permintaan lupa password...\n");
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "sulthon@test.com" }),
      },
    );

    const data = await response.json();
    console.log("Balasan Server:", data);

    if (data.success) {
      console.log(
        "\n✅ BERHASIL! Silakan cek kotak masuk Mailtrap Anda sekarang.",
      );
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

testForgotPassword();
