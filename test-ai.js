import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key của bạn
const genAI = new GoogleGenerativeAI("AIzaSyB9rHzGLN-NdbIS-lt2Bd-CNE1FHUvG5XA");

async function listModels() {
  console.log("📡 Đang kết nối thử nghiệm...");

  // Danh sách các model có thể dùng được hiện nay
  const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-pro",
    "gemini-1.0-pro"
  ];

  for (const modelName of candidates) {
    try {
      console.log(`\n👉 Đang thử model: "${modelName}"...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Thử gửi một câu đơn giản
      const result = await model.generateContent("Hello, are you working?");
      const response = await result.response;
      const text = response.text();
      
      if (text) {
        console.log(`✅ THÀNH CÔNG! Model hoạt động là: "${modelName}"`);
        console.log(`📝 Hãy quay lại server.js và sửa dòng model thành: "${modelName}"`);
        return; // Tìm thấy thì dừng luôn
      }
    } catch (error) {
      console.log(`❌ "${modelName}" thất bại (Lỗi: ${error.status || error.message})`);
    }
  }

  console.log("\n⚠️ Tất cả các model đều lỗi. Vui lòng kiểm tra lại API Key.");
}

listModels();