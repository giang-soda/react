import { Link, Outlet } from 'react-router';
import { Facebook } from 'lucide-react';

export default function UserAppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="top-0 z-50 border-b-4 border-blue-300 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-400 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-3xl font-bold text-white drop-shadow-md tracking-wide">
                SODA
                <span className="block text-xs font-semibold text-blue-200">Hàng xịn chính hãng</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center space-x-8 md:flex">
              <Link to="/" className="font-bold text-yellow-400 hover:text-white transition-colors duration-150">
                Áo điều hòa
              </Link>
              <Link to="/" className="font-bold text-yellow-400 hover:text-white transition-colors duration-150">
                Khẩu trang
              </Link>
              <Link to="/" className="font-bold text-yellow-400 hover:text-white transition-colors duration-150">
                Hàng Nhật nội địa
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
      <footer className="bg-gray-900 text-white mt-10">
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
