import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const prisma = new PrismaClient();

// ================= AI CONFIG =================
const GEN_AI_KEY = "AIzaSyB9rHzGLN-NdbIS-lt2Bd-CNE1FHUvG5XA"; 
const genAI = new GoogleGenerativeAI(GEN_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

app.use(cors());
app.use(express.json());

// ================= API REGISTER =================
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const role = email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    const user = await prisma.user.create({
      data: { name, email, password, role: role } 
    });
    console.log(`✅ User mới: ${email} (${role})`);
    res.json({ message: "Đăng ký thành công", user });
  } catch (e) {
    res.status(500).json({ error: "Email đã tồn tại" }); 
  }
});

// ================= API LOGIN =================
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Sai thông tin" });
    }
    res.json({
      message: "Login OK",
      token: "fake-jwt-token",
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi Server" });
  }
});

// ================= API GENERATE AI (ĐÃ SỬA ẢNH) =================
app.post('/api/generate-ai', async (req, res) => {
  const { brandName } = req.body;
  // 👇 Đổi sang Picsum để ảnh luôn hiển thị ổn định (Unsplash cũ đã hỏng)
  const imageUrl = `https://picsum.photos/seed/${brandName}/800/600`;

  try {
    console.log(`🤖 AI đang viết về: ${brandName}...`);
    const prompt = `
      Bạn là chuyên gia Marketing. Hãy viết bài blog ngắn (300 từ) về chiến lược của "${brandName}".
      Yêu cầu: Markdown, tiêu đề phụ (##), giọng văn chuyên nghiệp.
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ title: `Chiến lược: ${brandName}`, content: text, image: imageUrl, category: "Case Study" });
  } catch (error) {
    console.error("❌ Lỗi AI:", error);
    res.status(500).json({ error: "Lỗi tạo bài viết" });
  }
});

// ================= API GET POSTS (LẤY DANH SÁCH) =================
app.get('/api/posts', async (req, res) => {
    // 👇 SỬA LẠI: Bắt buộc sắp xếp theo ID giảm dần
    // (Bài mới tạo sẽ có ID lớn nhất -> Luôn nằm đầu tiên)
    const posts = await prisma.post.findMany({ 
        orderBy: { id: 'desc' } 
    });
    res.json(posts);
});

// ================= API CREATE POST (LƯU BÀI) =================
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Thiếu nội dung" });

    const defaultUser = await prisma.user.findFirst();
    if (!defaultUser) return res.status(400).json({ error: "Chưa có user nào trong DB" });

    const newPost = await prisma.post.create({
      data: {
        title, content, category, image,
        authorId: defaultUser.id
      }
    });

    console.log("✅ Đã lưu bài mới:", title);
    res.json(newPost);
  } catch (error) {
    console.error("❌ Lỗi lưu bài:", error);
    res.status(500).json({ error: "Lỗi Server: " + error.message });
  }
});

// ================= 👇 API UPDATE (SỬA BÀI - MỚI THÊM) 👇 =================
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, category, image } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content, category, image }
        });
        console.log(`✏️ Đã cập nhật bài ID: ${id}`);
        res.json(updatedPost);
    } catch (error) {
        console.error("❌ Lỗi cập nhật:", error);
        res.status(500).json({ error: "Không thể cập nhật bài viết" });
    }
});

// ================= API DELETE POST (XÓA BÀI) =================
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    console.log(`🗑️ Đã xóa bài viết ID: ${id}`);
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xóa bài" });
  }
});

// ================= SERVER START =================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});