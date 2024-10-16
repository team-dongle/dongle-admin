import ServiceLayout from "@/components/layout/ServiceLayout";
import GlobalStyle from "@/styles/globals";
import StyledComponentsRegistry from "@/styles/registry";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

export const viewport: Viewport = {
  width: 1024,
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "동글 관리자 페이지",
  description: "우리의 동아리, 우리의 동글",
};

const Pretendard = localFont({
  src: [
    {
      path: "../assets/fonts/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
      </head>
      <body className={Pretendard.className}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <ServiceLayout>{children}</ServiceLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
