# react-simple-load-more

A simple and lightweight React component for implementing infinite scroll (load more) functionality using Intersection Observer API.

> **Note**: Please use React version 16.8 or higher which supports React Hooks, and ensure your browser supports the IntersectionObserver API.

## Installation

```sh
npm i react-simple-load-more --save
```

Recommend you use `pnpm`:

```sh
pnpm add react-simple-load-more
```

## Usage

### Basic Example

```javascript
import React, { useState } from "react";
import SimpleLoadMore from "react-simple-load-more";

const App = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newItems = Array.from({ length: 5 }, (_, i) => items.length + i + 1);

    setItems((prev) => [...prev, ...newItems]);

    // Stop loading more when reaching 50 items
    if (items.length + newItems.length >= 50) {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <SimpleLoadMore loadMore={loadMore} hasMore={hasMore} loading={loading}>
        {items.map((item) => (
          <div key={item} style={{ padding: "20px", border: "1px solid #ccc" }}>
            Item {item}
          </div>
        ))}
      </SimpleLoadMore>
    </div>
  );
};

export default App;
```

### With Fixed Height Container

```javascript
import React, { useState } from "react";
import SimpleLoadMore from "react-simple-load-more";

const App = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newItems = Array.from({ length: 5 }, (_, i) => items.length + i + 1);
    setItems((prev) => [...prev, ...newItems]);
    if (items.length + newItems.length >= 50) {
      setHasMore(false);
    }
  };

  return (
    <div className="App">
      <SimpleLoadMore
        loadMore={loadMore}
        hasMore={hasMore}
        height={500}
        loader={<div>Loading more items...</div>}
        endMessage={<div>No more items to load</div>}
      >
        {items.map((item) => (
          <div key={item} style={{ padding: "20px", border: "1px solid #ccc" }}>
            Item {item}
          </div>
        ))}
      </SimpleLoadMore>
    </div>
  );
};

export default App;
```

## Props

| Prop         | Type                          | Required | Default                   | Description                                                      |
| ------------ | ----------------------------- | -------- | ------------------------- | ---------------------------------------------------------------- |
| `children`   | `ReactNode`                   | Yes      | -                         | The list items to display                                        |
| `loadMore`   | `() => Promise<void> \| void` | Yes      | -                         | Function to load more data                                       |
| `hasMore`    | `boolean`                     | Yes      | -                         | Whether there is more data to load                               |
| `height`     | `string \| number`            | No       | -                         | Fixed height for the container (enables scrolling)               |
| `threshold`  | `number`                      | No       | `50`                      | Distance in pixels from the bottom to trigger loading            |
| `loader`     | `ReactNode`                   | No       | `<div>Loading...</div>`   | Custom loading indicator                                         |
| `endMessage` | `ReactNode`                   | No       | `<div>No more data</div>` | Message to show when no more data is available                   |
| `loading`    | `boolean`                     | No       | -                         | External loading state (if not provided, internal state is used) |

## Browser Support

This component requires the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to be supported by the browser. Most modern browsers support it, but if you need to support older browsers, consider using a polyfill like [intersection-observer](https://www.npmjs.com/package/intersection-observer).

## Requirements

- React 16.8 or higher (for Hooks support)
- Browser with IntersectionObserver API support
