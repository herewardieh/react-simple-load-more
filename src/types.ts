export interface IScrollSpyProps {
  loading?: boolean;
  loader?: React.ReactNode;
  hasMore: boolean;
  endMessage?: React.ReactNode;
  loadMore: () => Promise<void> | void;
  threshold?: number;
}

export interface ISimpleLoadMoreProps extends IScrollSpyProps {
  children: React.ReactNode;
  height?: string | number;
}
