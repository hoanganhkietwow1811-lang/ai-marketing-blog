import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/mockData'; // ✅ BẬT LẠI DỮ LIỆU MẪU
import PostCard from '../components/PostCard';
import { Mail, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  // Mặc định hiển thị Mock Data trước để không bị trống lúc đang tải
  const [posts, setPosts] = useState<any[]>(BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      console.log("📡 Đang lấy dữ liệu...");
      const timestamp = new Date().getTime();
      const response = await fetch(`http://localhost:4000/api/posts?t=${timestamp}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // 1. Xử lý dữ liệu thật từ Server
        const realPosts = data.map((post: any) => {
          // Fix ảnh lỗi
          let imageUrl = post.image;
          if (!imageUrl || imageUrl.includes("source.unsplash.com")) {
              imageUrl = `https://picsum.photos/seed/${post.id}/800/600`;
          }

          return {
            id: `real-${post.id}`, 
            originalId: post.id, 
            title: post.title, 
            subtitle: post.content ? post.content.substring(0, 150).replace(/[#*]/g, '') + "..." : "",
            category: post.category || "General",
            image: imageUrl, 
            author: "Tri Bui",
            date: new Date(post.createdAt).toLocaleDateString('en-US'),
            readTime: "5 min read",
            isFeatured: false
          };
        });

        // 2. Sắp xếp bài thật: Bài mới nhất (ID to nhất) lên đầu
        realPosts.sort((a: any, b: any) => b.originalId - a.originalId);

        // 3. 🔥 QUAN TRỌNG: GỘP DỮ LIỆU
        // [Bài Thật (Mới tạo)] + [Bài Mẫu (Cũ)]
        const combinedPosts = [...realPosts, ...BLOG_POSTS];

        console.log(`✅ Tổng cộng: ${combinedPosts.length} bài (${realPosts.length} thật + ${BLOG_POSTS.length} mẫu)`);
        
        setPosts(combinedPosts); 
      }
    } catch (error) {
      console.error("❌ Lỗi kết nối:", error);
      // Nếu lỗi thì vẫn giữ lại Mock Data để web không chết
      setPosts(BLOG_POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Logic chia vị trí hiển thị
  const activePosts = posts; 
  const featuredPost = activePosts[0];            // Bài Mới Nhất (Sẽ là bài bạn vừa tạo)
  const secondaryPosts = activePosts.slice(1, 3); // Bài số 2, 3
  const listPosts = activePosts.slice(3);         // Các bài còn lại (bao gồm cả bài mẫu)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <div className="animate-fade-in min-h-screen bg-white dark:bg-black">
      
      {/* Nút Refresh */}
      <div className="fixed bottom-5 right-5 z-50">
          <button onClick={fetchPosts} className="bg-black text-white p-3 rounded-full shadow-xl hover:scale-110 transition">
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-black dark:border-white pb-8">
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-black dark:text-white leading-none tracking-tighter animate-slide-in-left">
                Strategy <br/> <span className="text-slate-400 font-light italic gradient-text">meets</span> Story.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-sm mt-8 md:mt-0 font-light leading-relaxed text-right animate-slide-in-right">
                Marketing case studies, consumer behavior, and growth frameworks for the modern mind.
            </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
            {/* Cột Trái: Bài Featured (Mới nhất) */}
            <div className="lg:col-span-8 h-full relative group">
                {/* Chỉ hiện nhãn NEW nếu đây là bài thật từ Database */}
                {featuredPost && featuredPost.id.toString().startsWith('real-') && (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded shadow-lg uppercase tracking-widest animate-pulse">
                        Latest Post
                    </div>
                )}
                {featuredPost && <PostCard post={featuredPost} featured={true} />}
            </div>
            
            {/* Cột Phải: 2 Bài tiếp theo */}
            <div className="lg:col-span-4 flex flex-col gap-8 h-full">
                {secondaryPosts.map((post: any, index: number) => (
                    <div key={post.id} className="flex-1 glass shadow-premium p-6 rounded-sm flex flex-col justify-center hover-lift group cursor-pointer animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <Link to={`/post/${post.id}`} className="block h-full">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">{post.category}</span>
                            <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2 group-hover:underline">{post.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.subtitle}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Latest List (Danh sách bài cũ + Bài mẫu) */}
      <section className="py-16 bg-white dark:bg-black border-t border-slate-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold mb-12">More Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {listPosts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 gradient-bg">
        <div className="max-w-3xl mx-auto px-4 text-center">
            <Mail className="mx-auto h-8 w-8 text-black dark:text-white mb-6 float" />
            <h2 className="text-4xl font-serif font-bold text-black dark:text-white mb-6">Smart Marketing, Weekly.</h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow bg-white px-6 py-4 border-2 border-slate-300"/>
                <button type="submit" className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest">Join</button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default Home;