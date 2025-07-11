import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

import { SlideShow } from '~/components/common/SlideShow';
import Main from '~/layouts/user/Main';

export function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Áo điều hoà KENKO dài tay chất liệu vải bò(denim) phiên bản đặc biệt chống cháy nhẹ-SM24',
      price: 299000,
      originalPrice: 399000,
      image: 'https://kenkovn.com/wp-content/uploads/2024/05/pin-quat-kenko-28v-10-2-768x767.png',
      rating: 4.5,
      reviews: 128,
      isNew: true,
      discount: 25,
      description: 'Áo điều hòa Kenko có thể linh hoạt kết hợp với nhiều tùy chọn, bao gồm áo lẻ (không pin quạt) hoặc các combo như Áo + pin quạt ALPHA X5 22V, Áo + pin quạt ALPHA X6 28V, và Áo + pin quạt i3',
    },
    {
      id: 2,
      name: 'Áo điều hoà KENKO dài tay chất liệu vải taslan màu camo xanh hải quân trượt nước-SM24',
      price: 899000,
      originalPrice: 1299000,
      image: 'https://kenkovn.com/wp-content/uploads/2024/05/pin-quat-kenko-28v-7-1-768x767.png',
      rating: 4.8,
      reviews: 89,
      isNew: false,
      discount: 30,
      description: 'Áo điều hòa Kenko có thể linh hoạt kết hợp với nhiều tùy chọn, bao gồm áo lẻ (không pin quạt) hoặc các combo như Áo + pin quạt ALPHA X5 22V, Áo + pin quạt ALPHA X6 28V, và Áo + pin quạt i3',
    },
    {
      id: 3,
      name: 'Mặt Nạ Mắt Me Gu Ri Tum MegRhythm Xông Hơi Mắt 5 Miếng',
      price: 599000,
      originalPrice: 799000,
      image: 'https://mint07.com/wp-content/uploads/2019/09/mat-na-mat-me-gu-ri-tum-megrhythm-xong-hoi-mat-5-mieng2.jpg',
      rating: 4.3,
      reviews: 156,
      isNew: false,
      discount: 25,
      description: 'Mặt Nạ Mắt Me Gu Ri Tum MegRhythm Xông Hơi Mắt 5 Miếng giúp ngủ ngon, giảm sưng húp và quầng thâm mắt. Ngoài ra, khi bạn bị đau đầu hãy dùng mặt nạ thư giãn này, nó sẽ giúp xoa dịu cơn đau đầu nhanh chóng. Hơi nóng giúp thải độc tố ra bên ngoài tốt hơn, giúp cơ thể tỉnh táo, sảng khoái,…',
    },
    {
      id: 4,
      name: 'Kem Chống Nắng Make P:Rem Glow Beige Tone Up Sun Cream Spf50+ Pa++++ 50ml',
      price: 799000,
      originalPrice: 999000,
      image: 'https://mint07.com/wp-content/uploads/2025/05/479358630409.png',
      rating: 4.6,
      reviews: 203,
      isNew: true,
      discount: 20,
      description: 'Kem Chống Nắng Make P:Rem Glow Beige Tone Up Sun Cream Spf50+ Pa++++ 50ml là kem chống nắng vật lý giúp nâng tone tự nhiên tiệp màu da suốt 24h, hiệu chỉnh da xỉn màu, có vết đỏ trở nên đều màu mang lại lớp finish glowy nhẹ.',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const banners = [
    {
      src: "https://github.com/giang-soda/giang-soda.github.io/raw/refs/heads/images/home/banner/ao-dieu-hoa-banner1.webp",
      href: "#",
    },
    {
      src: "https://github.com/giang-soda/giang-soda.github.io/raw/refs/heads/images/home/banner/ao-dieu-hoa-banner2.webp",
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="">
        <SlideShow banners={banners} />
      </section>

      {/* Main Content Block */}
      <Main>
        {/* Featured product 1 */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-100 via-white to-yellow-50 rounded-xl shadow-lg p-6 mb-8 gap-6 animate-fade-in">
          <div className="flex-1 flex flex-col items-start md:items-start gap-3">
            <span className="inline-block bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 animate-bounce">Hot Hot Hot!</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 leading-tight drop-shadow">Áo điều hòa KENKO<br className="hidden md:block"/> Chính hãng Nhật Bản</h2>
            <p className="text-gray-700 text-base md:text-lg font-medium max-w-md">Chất liệu cao cấp, công nghệ Nhật Bản, làm mát vượt trội, bảo vệ sức khỏe mùa hè. <span className="font-semibold text-blue-700">Giảm giá sốc lên tới 40%!</span></p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xl md:text-2xl font-bold text-red-500 animate-pulse">450.000₫</span>
              <span className="text-base md:text-lg line-through text-gray-400">900.000₫</span>
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">-50%</span>
            </div>
            <div className="flex items-center gap-4">
            <Link
              to="#"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 animate-wiggle"
            >
              Mua ngay
            </Link>

            <Link
              to="#"
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              <span>Xem chi tiết</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="https://kenkovn.com/wp-content/uploads/2024/05/pin-quat-kenko-28v-9-1.png" 
              alt="Áo điều hòa Kenko" 
              className="w-60 h-60 md:w-80 md:h-80 object-contain rounded-xl shadow-lg border-4 border-white animate-float" />
          </div>
        </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
          <p className="mt-2 text-gray-600">Những sản phẩm được yêu thích nhất</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map(product => (
            <Card key={product.id} className="group flex flex-col h-full transition-shadow hover:shadow-lg py-0">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover object-top"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-500">Mới</Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col flex-1 justify-between p-4">
                  <div>
                    <h3
                      className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 line-clamp-3 cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3 min-h-[54px]">{product.description}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full" size="sm">
                  Chi tiết
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-red-500">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex h-full items-center justify-center text-center text-white">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Sale cuối tuần</h3>
              <p className="text-lg">Giảm đến 50% cho tất cả sản phẩm</p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-pink-500"
              >
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex h-full items-center justify-center text-center text-white">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Miễn phí vận chuyển</h3>
              <p className="text-lg">Cho đơn hàng từ 500k</p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-500"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </section>
      </Main>
    </div>
  );
}
