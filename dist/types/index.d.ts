export interface LoggerI {
    writeInfo: (...args: any) => void;
    writeError: (...args: any) => void;
    writeWarning: (...args: any) => void;
}
export declare class Logger implements LoggerI {
    moduleName: string;
    static packageName: string;
    constructor(moduleName: string);
    private log;
    writeInfo: (...args: any) => void;
    writeError: (...args: any) => void;
    writeWarning: (...args: any) => void;
    static addModules: (m: string[]) => void;
    static getModules: () => string[];
    private static packagePrefix;
}
//# sourceMappingURL=index.d.ts.map