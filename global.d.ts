import type NodeCache from "node-cache";

declare global {
  var cacheInstance: NodeCache;
}

export {};
