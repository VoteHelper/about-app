/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const isProduction = process.env.NODE_ENV === "production";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
  dest: "public",
  disable: typeof window === "undefined" || !isProduction,
  sourcemap: !isProduction,
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseNextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "studyabout.herokuapp.com",
  //         },
  //       ],
  //       destination: "https://about-front.kro.kr/:path*",
  //       permanent: true,
  //     },
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "about-front.kro.kr",
  //         },
  //       ],
  //       destination: "/:path*",
  //       permanent: false, // 기존 요청 유지
  //     },
  //   ];
  // },

  env: {
    NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    NEXT_PUBLIC_KAKAO_JS: process.env.NEXT_PUBLIC_KAKAO_JS,
    NEXT_PUBLIC_PWA_KEY: process.env.NEXT_PUBLIC_PWA_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SERVER_URI: process.env.NEXT_PUBLIC_SERVER_URI,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
  // output: "standalone",
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
    domains: [
      "about-front.kro.kr",
      "studyabout.herokuapp.com",
      "localhost:3000",
      "studyabout.s3.ap-northeast-2.amazonaws.com",
      "p.kakaocdn.net",
      "k.kakaocdn.net",
      "user-images.githubusercontent.com",
      "img1.kakaocdn.net",
      "t1.kakaocdn.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "studyabout.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "localhost:3000",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "p.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "http",
        hostname: "p.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "/**", // 모든 경로 허용
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Set-Cookie",
            value: "cookieName=cookieValue; Path=/; HttpOnly; Secure; SameSite=None;",
          },
        ],
      },
    ];
  },
};

const nextConfig = withPWA(baseNextConfig);

module.exports = nextConfig;
