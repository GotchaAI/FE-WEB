import React, { Suspense } from "react";

// 공통 Suspense 래퍼 함수
const SuspenseWrapper = (LazyComponent, fallback = <div>로딩 중...</div>) => {
  return function WrappedComponent(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default SuspenseWrapper;
