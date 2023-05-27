import EventEmitter from "events";

class T {
  constructor() {
    console.log("initT");
    process.nextTick(this.stuff);
  }
  ready = () => console.log("ready");
  stuff = () => console.log("stuff");
}

export const app_with_events = () => {
  console.log("start");

  setImmediate(() => console.log("imm 1"));
  setImmediate(() => console.log("imm 2"));
  process.nextTick(() => console.log("prc 1"));
  process.nextTick(() => console.log("prc 2"));

  console.log("ended");

  const t = new T();
  t.ready();

  const eventEmitter = new EventEmitter();
  console.log(eventEmitter);

  eventEmitter.on("update", (n) => console.log("updt", n));
  console.log(eventEmitter);

  console.log("start");
  eventEmitter.emit("update", 1);
  // eventEmitter.removeListener('update')
  eventEmitter.emit("update", 2);
  // eventEmitter.off('update');
  eventEmitter.emit("update", 3);
  // eventEmitter.removeAllListeners()
  eventEmitter.emit("update", 4);
  console.log("fired");
};
