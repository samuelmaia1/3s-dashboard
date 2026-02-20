import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access-token")?.value;
  const refreshToken = req.cookies.get("refresh-token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!accessToken) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const validateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (validateResponse.ok) {
      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (validateResponse.status === 403 && refreshToken) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken = data.accessToken;

        const response = NextResponse.next();

        response.cookies.set("access-token", newAccessToken, {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        return response;
      }
    }

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};