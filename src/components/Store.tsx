import React, { useState } from "react";
import storeItems from "../data/items.json";
import StoreItem from "./item/StoreItem";
import InfiniteScroll from "react-infinite-scroll-component";

const Store = () => {
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(storeItems.slice(0, 5));
  const refreshData = () => {
    setItems(storeItems.slice(0, 5));
    setHasMore(true);
  };
  const fetchMoreData = () => {
    if (items.length >= storeItems.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems((currentItems) => [
        ...currentItems,
        ...storeItems.slice(currentItems.length, currentItems.length + 3),
      ]);
    }, 1000);
  };
  return (
    <div>
      <h1>Store</h1>
      <div className="d-flex flex-wrap" id="scrollableDiv">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>The End! You have seen it all</b>
            </p>
          }
          refreshFunction={refreshData}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {items.map((i) => (
            <div className="col-sm col-md-4 col-lg-4 mt-2" key={i.id}>
              <StoreItem {...i} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Store;
