import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, Save, X, Image as ImageIcon, LayoutDashboard, Loader2, Sparkles } from 'lucide-react';
import { BlogPost, Category } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading khi lưu
  const [isEditing, setIsEditing] = useState(false); // Trạng thái mở form
  
  // Trạng thái AI
  const [brandInput, setBrandInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Lưu ID bài đang sửa (nếu null nghĩa là đang Tạo Mới)
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form dữ liệu (đơn giản hóa Content thành string để dễ sửa)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: Category.STRATEGY,
    image: '',
    content: '' // Lưu toàn bộ nội dung dưới dạng Markdown string
  });

  // --- 1. LẤY DANH SÁCH BÀI VIẾT ---
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://ai-marketing-blog.onrender.com/api/posts');
      const data = await response.json();
      
      // Map dữ liệu từ Server về Frontend
      const mappedPosts: BlogPost[] = data.map((post: any) => ({
        id: post.id.toString(),
        title: post.title,
        subtitle: post.content ? post.content.substring(0, 100) + "..." : "",
        category: post.category || Category.STRATEGY,
        image: post.image || "https://picsum.photos/800/600",
        date: new Date(post.createdAt).toLocaleDateString(),
        readTime: "5 min read",
        content: post.content // Giữ nguyên nội dung gốc
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error("Lỗi tải bài viết:", error);
    }
  };

  useEffect(() => {
    // Kiểm tra quyền Admin (Giữ nguyên logic cũ của bạn)
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || (storedUser.role && storedUser.role !== 'ADMIN')) {
      alert("Bạn không có quyền truy cập Admin!");
      navigate('/');
      return;
    }
    fetchPosts();
  }, [navigate]);

  // --- 2. TÍNH NĂNG AI AGENT ---
  const handleAIGenerate = async () => {
    if (!brandInput.trim()) return alert("Vui lòng nhập tên thương hiệu!");
    setIsGenerating(true);
    try {
      const res = await fetch('https://ai-marketing-blog.onrender.com/api/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName: brandInput })
      });
      const data = await res.json();
      
      // Điền dữ liệu AI vào Form
      setFormData(prev => ({
        ...prev,
        title: data.title,
        content: data.content, // AI trả về Markdown
        image: data.image,
        category: Category.CASE_STUDY
      }));
      alert("✅ AI đã viết xong!");
    } catch (error) {
      alert("Lỗi AI: " + error);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- 3. XỬ LÝ MỞ FORM (TẠO MỚI / SỬA) ---
  
  // Khi bấm "New Post"
  const handleCreateNew = () => {
    setEditingId(null); // Xóa ID -> Chế độ Tạo Mới
    setBrandInput('');
    setFormData({
      title: '',
      subtitle: '',
      category: Category.STRATEGY,
      image: 'https://picsum.photos/seed/new/800/600',
      content: ''
    });
    setIsEditing(true);
  };

  // Khi bấm nút "Sửa" (Edit)
  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id); // Lưu ID -> Chế độ Sửa
    setFormData({
      title: post.title,
      subtitle: post.subtitle,
      category: post.category,
      image: post.image,
      // Nếu content là object (từ mock data cũ) thì lấy intro, nếu string (từ DB) thì lấy trực tiếp
      content: typeof post.content === 'string' ? post.content : (post.content as any).intro 
    });
    setIsEditing(true);
  };

  // --- 4. LƯU BÀI VIẾT (QUAN TRỌNG NHẤT: FIX LỖI DUPLICATE) ---
  const handleSave = async () => {
    if (!formData.title || !formData.content) return alert("Thiếu tiêu đề hoặc nội dung!");
    setIsLoading(true);

    try {
      // 👇 LOGIC FIX LỖI: Kiểm tra xem đang Tạo hay Sửa?
      const isUpdate = !!editingId; 
      const method = isUpdate ? 'PUT' : 'POST';
      const url = isUpdate 
        ? `https://ai-marketing-blog.onrender.com/api/posts/${editingId}` // API Sửa
        : 'https://ai-marketing-blog.onrender.com/api/posts';             // API Tạo

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          image: formData.image,       
          category: formData.category  
        }),
      });

      if (response.ok) {
        alert(isUpdate ? 'Cập nhật thành công!' : 'Tạo mới thành công!');
        setIsEditing(false); // Đóng form
        fetchPosts();        // Load lại danh sách ngay lập tức
      } else {
        alert('Lỗi khi lưu bài viết');
      }
    } catch (error) {
      alert('Lỗi kết nối Server');
    } finally {
      setIsLoading(false);
    }
  };

  // --- 5. XÓA BÀI ---
  const handleDelete = async (postId: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài này?')) return;
    try {
      await fetch(`https://ai-marketing-blog.onrender.com/api/posts/${postId}`, { method: 'DELETE' });
      // Cập nhật giao diện ngay lập tức (xóa bài khỏi list hiện tại)
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      alert("Lỗi xóa bài");
    }
  };

  // --- GIAO DIỆN ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-8 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-serif font-bold text-black dark:text-white flex items-center gap-3">
               <LayoutDashboard /> Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-2">Quản lý bài viết & AI Content Generator</p>
          </div>
          {!isEditing && (
            <button onClick={handleCreateNew} className="flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase rounded-xl hover:scale-105 transition-all shadow-lg">
              <PlusCircle size={20} className="mr-2" /> New Post
            </button>
          )}
        </div>

        {/* EDITOR FORM */}
        {isEditing ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 animate-fade-in border border-slate-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24}/></button>
            </div>

            {/* AI Generator Section (Chỉ hiện khi tạo mới hoặc field trống) */}
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2 font-bold"><Sparkles size={18}/> AI Auto-Generate</div>
                <div className="flex gap-3">
                    <input 
                        value={brandInput} onChange={(e) => setBrandInput(e.target.value)}
                        placeholder="Nhập tên thương hiệu (VD: Tesla, VinFast)..."
                        className="flex-1 px-4 py-2 rounded-lg text-black outline-none"
                    />
                    <button onClick={handleAIGenerate} disabled={isGenerating} className="px-6 py-2 bg-black/20 hover:bg-black/40 rounded-lg font-bold backdrop-blur-sm transition">
                        {isGenerating ? <Loader2 className="animate-spin"/> : 'Generate'}
                    </button>
                </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Title</label>
                <input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border rounded-xl dark:bg-black dark:border-zinc-700 outline-none focus:ring-2 ring-black"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block font-bold mb-2">Category</label>
                    <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                        className="w-full p-3 border rounded-xl dark:bg-black dark:border-zinc-700 outline-none"
                    >
                        <option value={Category.STRATEGY}>Strategy</option>
                        <option value={Category.CASE_STUDY}>Case Study</option>
                        <option value={Category.GROWTH}>Growth</option>
                        <option value={Category.CONSUMER}>Consumer</option>
                    </select>
                 </div>
                 <div>
                    <label className="block font-bold mb-2">Image URL</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-3 text-slate-400" size={20}/>
                        <input 
                            value={formData.image} 
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full pl-10 p-3 border rounded-xl dark:bg-black dark:border-zinc-700 outline-none"
                        />
                    </div>
                 </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Content (Markdown)</label>
                <textarea 
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-4 border rounded-xl dark:bg-black dark:border-zinc-700 outline-none font-mono text-sm leading-relaxed"
                    placeholder="Nội dung bài viết..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={handleSave} disabled={isLoading} className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition shadow-lg flex justify-center items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin"/> : <Save size={20}/>}
                    {editingId ? 'Update Post' : 'Save Post'}
                 </button>
                 <button onClick={() => setIsEditing(false)} className="px-8 border-2 border-slate-300 rounded-xl font-bold uppercase hover:bg-slate-100 transition">
                    Cancel
                 </button>
              </div>
            </div>
          </div>
        ) : (
          /* POST LIST */
          <div className="grid gap-4">
            {posts.map((post) => (
               <div key={post.id} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 flex justify-between items-center hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                     <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-slate-100"/>
                     <div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <div className="flex gap-2 text-sm text-slate-500 mt-1">
                            <span className="bg-slate-100 dark:bg-zinc-800 px-2 rounded text-xs uppercase font-bold tracking-wider py-0.5">{post.category}</span>
                            <span>• {post.date}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => handleEdit(post)} className="p-2 hover:bg-slate-100 rounded-full text-blue-600"><Edit2 size={20}/></button>
                     <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-50 rounded-full text-red-500"><Trash2 size={20}/></button>
                  </div>
               </div>
            ))}
            {posts.length === 0 && (
                <div className="text-center py-20 text-slate-400">Chưa có bài viết nào. Hãy bấm "New Post" để tạo!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;