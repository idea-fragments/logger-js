interface LoggerI {
    writeInfo: (...args: any) => void;
    writeError: (...args: any) => void;
    writeWarning: (...args: any) => void;
}
declare type LogEntry = {
    args: any[];
    level: keyof typeof LEVEL_STYLES;
    moduleName: string;
    timestamp: string;
};
declare type LogTransport = (entry: LogEntry) => void;
declare const LEVEL_STYLES: {
    readonly info: "background: #499cc8; color: white;";
    readonly error: "background: #c14a4f; color: white;";
    readonly warn: "background: #e0a270; color: black;";
};
declare class Logger implements LoggerI {
    moduleName: string;
    static onLog: LogTransport | null;
    static packageName: string;
    constructor(moduleName: string);
    private log;
    writeInfo: (...args: any) => void;
    writeError: (...args: any) => void;
    writeWarning: (...args: any) => void;
    static addModules: (m: string[]) => void;
    static removeModules: (m: string[]) => void;
    static clearModules: () => void;
    static getModules: () => string[];
    private static packagePrefix;
}

export { LogEntry, LogTransport, Logger, LoggerI };
