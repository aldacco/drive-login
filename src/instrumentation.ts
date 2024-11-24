import type NodeCache from "node-cache";

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const NodeCache = (await import("node-cache")).default;
    const config: NodeCache.Options = {
      stdTTL: 120,
    };

    global.cacheInstance = new NodeCache(config);

    if (global.cacheInstance) {
      console.log("Cache initialized successfully");
    } else {
      console.log("Cache initialization failed");
    }
  }
};
