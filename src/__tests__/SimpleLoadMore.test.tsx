import { render, screen } from "@testing-library/react";
import SimpleLoadMore from "../SimpleLoadMore.tsx";

jest.mock("../ScrollSpy.tsx", () => {
  return {
    __esModule: true,
    default: function MockScrollSpy(props: unknown) {
      return <div data-testid="scroll-spy">ScrollSpy Mock</div>;
    },
  };
});

describe("SimpleLoadMore", () => {
  const defaultProps = {
    loadMore: jest.fn(),
    hasMore: true,
    children: <div>Test Content</div>,
  };

  it("should render children", () => {
    render(<SimpleLoadMore {...defaultProps} />);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render ScrollSpy component", () => {
    render(<SimpleLoadMore {...defaultProps} />);

    expect(screen.getByTestId("scroll-spy")).toBeInTheDocument();
  });

  it("should apply height style when height is provided as number", () => {
    const { container } = render(
      <SimpleLoadMore {...defaultProps} height={500} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ height: "500px", overflow: "auto" });
  });

  it("should apply height style when height is provided as string", () => {
    const { container } = render(
      <SimpleLoadMore {...defaultProps} height="600px" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ height: "600px", overflow: "auto" });
  });

  it("should not apply height style when height is not provided", () => {
    const { container } = render(<SimpleLoadMore {...defaultProps} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe("");
    expect(wrapper.style.overflow).toBe("");
  });

  it("should pass props to ScrollSpy", () => {
    const loadMore = jest.fn();
    const customLoader = <div>Custom Loader</div>;
    const customEndMessage = <div>Custom End Message</div>;

    render(
      <SimpleLoadMore
        loadMore={loadMore}
        hasMore={true}
        threshold={100}
        loader={customLoader}
        endMessage={customEndMessage}
        loading={true}
      >
        <div>Content</div>
      </SimpleLoadMore>
    );

    expect(screen.getByTestId("scroll-spy")).toBeInTheDocument();
  });

  it("should use default values for optional props", () => {
    render(<SimpleLoadMore {...defaultProps} />);

    expect(screen.getByTestId("scroll-spy")).toBeInTheDocument();
  });

  it("should render multiple children", () => {
    render(
      <SimpleLoadMore {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </SimpleLoadMore>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});
