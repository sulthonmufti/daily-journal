async function runTest() {
  console.log("⏳ Memulai Simulasi...\n");

  try {
    //test fitur register
    console.log("--- 1. UJI COBA REGISTER ---");
    const registerResponse = await fetch(
      `${process.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "sulthontest",
          email: "sulthon@test.com",
          password: "rahasia-super",
        }),
      },
    );
    const registerData = await registerResponse.json();
    console.log("Hasil Register:", registerData, "\n");

    //test fitur login
    console.log("--- 2. UJI COBA LOGIN ---");
    const loginResponse = await fetch(
      `${process.env.VITE_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "sulthon@test.com",
          password: "rahasia-super",
        }),
      },
    );
    const loginData = await loginResponse.json();
    console.log("Hasil Login:", loginData);

    if (loginData.token) {
      console.log("\n✅ TIKET JWT BERHASIL DIBUAT!");
      console.log("Token JWT Anda:", loginData.token.substring(0, 40) + "...");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat simulasi:", error);
  }
}

runTest();
