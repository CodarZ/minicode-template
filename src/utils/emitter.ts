import mitt from "mitt";

/** 各种事件需要在此写一下，做为类型提示和限制 */
export type EmitterEvents = {};

const emitter = mitt<EmitterEvents>();

export { emitter };
