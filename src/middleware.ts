import { getKeyCookie } from '@/lib/helpers/session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authKeyCookie = await getKeyCookie();
  const token = request.cookies.get(authKeyCookie)?.value;
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];

  // Kiểm tra xem request có đang truy cập route được bảo vệ không
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Nếu là route được bảo vệ và không có token, chuyển hướng đến /login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // (Tùy chọn) Lưu URL hiện tại để quay lại sau khi đăng nhập
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Nếu đã xác thực hoặc route không cần bảo vệ, tiếp tục request
  return NextResponse.next();
}

////// Cấu hình matcher để áp dụng middleware cho các route cụ thể
// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/profile/:path*',
//     '/settings/:path*'
//   ],
// };
