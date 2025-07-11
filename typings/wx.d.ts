import type { EmitterEvents } from "../src/utils/emitter";

declare global {
  interface IAppOption {
    globalData: {
      emitter?: EmitterEvents;
    };
  }
}

export {};
