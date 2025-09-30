import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex justify-center min-h-screen bg-white font-pretendard">
      {/* 480px 고정 컨테이너 */}
      <div className="container relative w-full min-h-screen bg-p-white shadow-primary">{children}</div>
    </div>
  );
}

export default MobileLayout;
