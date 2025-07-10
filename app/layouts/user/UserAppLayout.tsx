import { Link, Outlet } from 'react-router';
import { ShoppingCart, Search, User, Heart, Menu, Facebook } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

export default function UserAppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                SodaStore
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center space-x-8 md:flex">
              <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">
                Sản phẩm
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">SodaStore</h3>
              <p className="text-sm text-gray-300">
                Cửa hàng thời trang hàng đầu Việt Nam với những sản phẩm chất lượng cao và giá cả
                hợp lý.
              </p>
              <div className="flex space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <Link to="https://www.facebook.com/profile.php?id=100000000000000" target="_blank">
                    <Facebook className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sản phẩm mới
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Khuyến mãi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Hỗ trợ khách hàng</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách đổi trả
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Vận chuyển & Giao hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Bảo hành
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Thông tin liên hệ</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 123 Đường ABC, Quận 1, TP.Hà Nội</p>
                <p>📞 1900-1234</p>
                <p>✉️ info@sodastore.vn</p>
                <p>🕒 8:00 - 22:00 (T2 - CN)</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
