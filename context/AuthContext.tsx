import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Định nghĩa chính xác kiểu dữ liệu User
export interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Bắt buộc phải có dòng này để check Admin
}

// 2. Định nghĩa Context có những gì (Thêm loading vào đây)
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean; // <-- Đã thêm dòng này để khớp với Provider
}

// Khởi tạo Context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Thay <any> bằng <User | null> để code thông minh hơn
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        // Nếu dữ liệu rác thì xóa đi tránh lỗi
        console.error("Lỗi đọc user cũ:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); // Xóa sạch token và user
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Hàm useAuth an toàn (Tự động kiểm tra null)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};