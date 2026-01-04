import React, { useEffect, useRef } from "react";
import type { IScrollSpyProps } from "./types.ts";

const ScrollSpy: React.FC<IScrollSpyProps> = ({
  loading,
  loader,
  endMessage,
  loadMore,
  hasMore,
  threshold = 50,
}) => {
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const spyTriggerElementRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading ?? false);

  useEffect(() => {
    loadingRef.current = loading ?? false;
  }, [loading]);

  useEffect(() => {
    const triggerElement = spyTriggerElementRef.current;
    if (!triggerElement) return;

    // when the trigger element is visible, load more data
    const onIntersectionChange = (
      entries: IntersectionObserverEntry[]
    ): void => {
      const firstEntry = entries[0];
      if (
        !firstEntry ||
        !firstEntry.isIntersecting ||
        !hasMore ||
        loadingRef.current
      ) {
        return;
      }

      Promise.resolve(loadMore());
    };

    // create a new intersection observer
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `${threshold}px`,
    };

    // create a new intersection observer and observe the trigger element
    intersectionObserver.current = new IntersectionObserver(
      onIntersectionChange,
      observerOptions
    );

    intersectionObserver.current.observe(triggerElement);

    return () => {
      // disconnect the intersection observer
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
        intersectionObserver.current = null;
      }
    };
  }, [hasMore, loadMore, threshold, loading]);

  const showLoader = loading ?? false;
  const showEndMessage = !hasMore && !showLoader;

  return (
    <>
      {/* the trigger element is hidden and only visible when the component is mounted */}
      <div
        ref={spyTriggerElementRef}
        style={{ height: "1px", width: "100%" }}
      />
      {/* show the loader when the loading state is true */}
      {showLoader && loader}
      {/* show the end message when the hasMore state is false and the loading state is false */}
      {showEndMessage && endMessage}
    </>
  );
};

export default ScrollSpy;
