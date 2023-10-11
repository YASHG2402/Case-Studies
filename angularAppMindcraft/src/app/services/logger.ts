// export class ConsoleLogger {
//     log() {
//         console.log("Using console logger");
//     }
// }

export class BaseLogger {
    log(){
    }
}

export class ConsoleLogger extends BaseLogger {
    override log() {
        console.log("Using console logger");
    }
}

export class FileLogger extends BaseLogger {
    override log(): void {
        console.log("Using File Logger")
    }
}

export class DBLogger extends BaseLogger {
    override log(): void {
        console.log("Using DB Logger");
    }
}