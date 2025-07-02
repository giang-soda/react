import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

export function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Áo thun nam basic',
      price: 299000,
      originalPrice: 399000,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      rating: 4.5,
      reviews: 128,
      isNew: true,
      discount: 25
    },
    {
      id: 2,
      name: 'Váy đầm nữ dự tiệc',
      price: 899000,
      originalPrice: 1299000,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      rating: 4.8,
      reviews: 89,
      isNew: false,
      discount: 30
    },
    {
      id: 3,
      name: 'Quần jean nam slim fit',
      price: 599000,
      originalPrice: 799000,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      rating: 4.3,
      reviews: 156,
      isNew: false,
      discount: 25
    },
    {
      id: 4,
      name: 'Áo khoác denim nữ',
      price: 799000,
      originalPrice: 999000,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      rating: 4.6,
      reviews: 203,
      isNew: true,
      discount: 20
    }
  ];

  const categories = [
    { name: 'Nam', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', count: 156 },
    { name: 'Nữ', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=200&fit=crop', count: 234 },
    { name: 'Trẻ em', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop', count: 89 },
    { name: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop', count: 67 }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold">Bộ sưu tập mới 2024</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Khám phá những xu hướng thời trang mới nhất với chất liệu cao cấp và thiết kế độc đáo
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Mua ngay
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Xem bộ sưu tập
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Danh mục sản phẩm</h2>
          <p className="text-gray-600 mt-2">Chọn danh mục bạn quan tâm</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} sản phẩm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
          <p className="text-gray-600 mt-2">Những sản phẩm được yêu thích nhất</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-500">Mới</Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary" className="h-10 w-10">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-10 w-10">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-lg text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-64 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Sale cuối tuần</h3>
              <p className="text-lg">Giảm đến 50% cho tất cả sản phẩm</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-pink-500">
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="relative h-64 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Miễn phí vận chuyển</h3>
              <p className="text-lg">Cho đơn hàng từ 500k</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-500">
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký nhận tin</h2>
        <p className="text-gray-600 mb-6">
          Nhận thông báo về sản phẩm mới và khuyến mãi đặc biệt
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Nhập email của bạn"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button>Đăng ký</Button>
        </div>
      </section>
    </div>
  );
}
