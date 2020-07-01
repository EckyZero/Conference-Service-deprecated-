class Timer {
    constructor(opts) {

    }

    currentTime() {
        return process.hrtime();
    }

    getMillisecondsSinceTime(start) {
        const NS_PER_SEC = 1e9
        const NS_TO_MS = 1e6
        const diff = process.hrtime(start)

        return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Timer;