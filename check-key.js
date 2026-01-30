// Thay API Key mới của bạn vào đây
const API_KEY = "AIzaSyB9rHzGLN-NdbIS-lt2Bd-CNE1FHUvG5XA"; 

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("📡 Đang hỏi Google xem Key này dùng được model nào...");

async function checkModels() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.log("❌ LỖI API KEY:", data.error.message);
    } else if (data.models) {
      console.log("✅ THÀNH CÔNG! Key của bạn được dùng các model sau:");
      // In ra danh sách các model
      data.models.forEach(m => {
        // Chỉ hiện các model tạo nội dung (generateContent)
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`   - ${m.name.replace("models/", "")}`);
        }
      });
      console.log("\n👉 Hãy chọn một cái tên trong danh sách trên để điền vào server.js");
    } else {
      console.log("⚠️ Key hợp lệ nhưng KHÔNG CÓ model nào được kích hoạt.");
    }
  } catch (error) {
    console.log("❌ Lỗi kết nối mạng:", error.message);
  }
}

checkModels();