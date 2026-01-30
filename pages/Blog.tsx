import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard'; // Giữ nguyên component hiển thị
import { Category, BlogPost } from '../types';
import { Search, Filter, Loader2 } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State bài viết & trạng thái tải
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- THAY ĐỔI QUAN TRỌNG: LẤY DỮ LIỆU TỪ SERVER ---
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();

        // Mapping: Biến dữ liệu đơn giản từ DB thành dữ liệu đầy đủ cho Frontend
        const mappedPosts: BlogPost[] = data.map((dbPost: any) => ({
          id: dbPost.id.toString(),
          title: dbPost.title,
          // Vì DB chưa có cột subtitle, ta cắt ngắn nội dung làm subtitle
          subtitle: dbPost.content.substring(0, 100) + "...", 
          // DB chưa có category, tạm thời random hoặc để mặc định
          category: Category.STRATEGY, 
          // DB chưa có ảnh, dùng ảnh placeholder đẹp
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: "5 min read",
          tags: ["Marketing", "Database"], // Tag giả lập
          isFeatured: false,
          author: dbPost.author, // Lấy thông tin tác giả từ DB
          content: {
            intro: dbPost.content, // Đưa nội dung vào intro
            keyPoints: [],
            sections: [],
            takeaways: ""
          }
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Lỗi kết nối Server:", error);
        // Nếu lỗi, có thể để mảng rỗng hoặc fallback về mockData cũ tùy bạn
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  // ---------------------------------------------------

  const categories = ['All', ...Object.values(Category)];

  // Logic lọc bài viết (Giữ nguyên của bạn - rất tốt)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, posts]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">The Blog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Deep dives into marketing mechanics, growth loops, and brand storytelling.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-md dark:bg-white dark:text-black' // Sửa lại màu một chút cho hợp style brand
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition duration-150 ease-in-out sm:text-sm"
            />
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-slate-400" size={48} />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No posts found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;