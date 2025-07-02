import { Outlet } from 'react-router';
import { ShoppingCart, Search, User, Heart, Menu } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

export default function UserAppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-2xl font-bold text-blue-600">
                FashionStore
              </Button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Nam</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Nữ</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Trẻ em</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Phụ kiện</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Sale</a>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">2</Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">3</Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">FashionStore</h3>
              <p className="text-gray-300 text-sm">
                Cửa hàng thời trang hàng đầu Việt Nam với những sản phẩm chất lượng cao và giá cả hợp lý.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">TW</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Sản phẩm mới</a></li>
                <li><a href="#" className="hover:text-white">Khuyến mãi</a></li>
                <li><a href="#" className="hover:text-white">Tin tức</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Hỗ trợ khách hàng</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-white">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-white">Vận chuyển & Giao hàng</a></li>
                <li><a href="#" className="hover:text-white">Bảo hành</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Thông tin liên hệ</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
                <p>📞 1900-1234</p>
                <p>✉️ info@fashionstore.vn</p>
                <p>🕒 8:00 - 22:00 (T2 - CN)</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 FashionStore. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Điều khoản sử dụng</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Chính sách bảo mật</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
