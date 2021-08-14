const log = {
  info(msg) {
    const time = (new Date()).toISOString();
    console.log(`[${ time }] INFO -- ${ msg }`);
  },
  error(msg) {
    const time = (new Date()).toISOString();
    console.error(`[${ time }] ERROR -- ${ msg }`);
  },
  warn(msg) {
    const time = (new Date()).toISOString();
    console.warn(`[${ time }] WARN -- ${ msg }`);
  },
  trace(msg) {
    const time = (new Date()).toISOString();
    console.trace(`[${ time }] ERROR -- ${ msg }`);
  }
}
module.exports = log;