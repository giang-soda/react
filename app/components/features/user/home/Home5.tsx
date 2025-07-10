import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">MyBrand</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:underline">Trang chủ</a>
          <a href="#products" className="hover:underline">Sản phẩm</a>
          <a href="#contact" className="hover:underline">Liên hệ</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50" id="products">
        <h2 className="text-3xl font-bold mb-6 text-center">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Product 1 */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <img
                src="https://via.placeholder.com/400x300?text=Bộ+Quần+Áo"
                alt="Bộ quần áo"
                className="rounded-md w-full mb-4"
              />
              <h3 className="text-xl font-semibold">Bộ Quần Áo Thời Trang</h3>
              <p className="text-sm text-gray-600 mb-4">\                Thiết kế hiện đại, chất liệu cao cấp phù hợp cho mọi hoàn cảnh.
              </p>
              <Button>Chi tiết</Button>
            </CardContent>
          </Card>

          {/* Product 2 */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <img
                src="https://via.placeholder.com/400x300?text=Khẩu+Trang"
                alt="Khẩu trang"
                className="rounded-md w-full mb-4"
              />
              <h3 className="text-xl font-semibold">Khẩu Trang Kháng Khuẩn</h3>
              <p className="text-sm text-gray-600 mb-4">
                Bảo vệ sức khỏe, thoáng khí, dễ chịu khi sử dụng hằng ngày.
              </p>
              <Button>Chi tiết</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-8" id="contact">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg font-semibold">Liên hệ</p>
          <p>Email: contact@mybrand.vn</p>
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
          <p>Điện thoại: 0123 456 789</p>
        </div>
      </footer>
    </div>
  )
}