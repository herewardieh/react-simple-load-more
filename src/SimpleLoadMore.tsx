import React from "react";
import ScrollSpy from "./ScrollSpy.tsx";
import type { ISimpleLoadMoreProps } from "./types.ts";

const SimpleLoadMore: React.FC<ISimpleLoadMoreProps> = ({
  children,
  height,
  loadMore,
  hasMore,
  threshold,
  loader,
  endMessage,
  loading,
}) => {
  const containerStyle: React.CSSProperties = height
    ? {
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "auto",
      }
    : {};

  const scrollSpyProps = {
    loadMore,
    hasMore,
    threshold: threshold ?? 50,
    loader: loader ?? <div>Loading...</div>,
    endMessage: endMessage ?? <div>No more data</div>,
    loading: loading ?? false,
  };

  return (
    <div style={containerStyle}>
      {children}
      <ScrollSpy {...scrollSpyProps} />
    </div>
  );
};

export default SimpleLoadMore;
