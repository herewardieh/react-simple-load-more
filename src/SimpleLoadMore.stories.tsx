import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SimpleLoadMore from "./SimpleLoadMore.tsx";

const meta: Meta<typeof SimpleLoadMore> = {
  title: "Components/SimpleLoadMore",
  component: SimpleLoadMore,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    height: {
      control: { type: "text" },
      description: "Fixed height for the container",
    },
    threshold: {
      control: { type: "number" },
      description: "Distance in pixels from the bottom to trigger loading",
    },
    hasMore: {
      control: { type: "boolean" },
      description: "Whether there is more data to load",
    },
    loading: {
      control: { type: "boolean" },
      description: "External loading state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleLoadMore>;

const BasicExample = () => {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newItems = Array.from({ length: 10 }, (_, i) => items.length + i + 1);

    setItems((prev) => [...prev, ...newItems]);

    if (items.length + newItems.length >= 50) {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <SimpleLoadMore
      loadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      height={500}
      loader={
        <div style={{ padding: "20px", textAlign: "center" }}>
          Loading more items...
        </div>
      }
      endMessage={
        <div style={{ padding: "20px", textAlign: "center" }}>
          No more items to load
        </div>
      }
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            padding: "20px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          Item {item}
        </div>
      ))}
    </SimpleLoadMore>
  );
};

export const Basic: Story = {
  render: () => <BasicExample />,
};
