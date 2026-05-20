Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var LEVEL_STYLES = {
    info: "background: #499cc8; color: white;",
    error: "background: #c14a4f; color: white;",
    warn: "background: #e0a270; color: black;",
};
var LEVEL_CODES = {
    info: "I",
    error: "E",
    warn: "W",
};
var formatTimestamp = function () {
    var now = new Date();
    var pad2 = function (n) { return String(n).padStart(2, "0"); };
    var pad3 = function (n) { return String(n).padStart(3, "0"); };
    var date = "".concat(now.getFullYear(), "-").concat(pad2(now.getMonth() + 1), "-").concat(pad2(now.getDate()));
    var time = "".concat(pad2(now.getHours()), ":").concat(pad2(now.getMinutes()), ":").concat(pad2(now.getSeconds()), ".").concat(pad3(now.getMilliseconds()), "000");
    return "".concat(date, " ").concat(time);
};
var modules = new Set();
var Logger = /** @class */ (function () {
    function Logger(moduleName) {
        var _this = this;
        this.log = function (level) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!modules.has(_this.moduleName))
                return;
            var prefix = "".concat(formatTimestamp(), " ").concat(LEVEL_CODES[level], " ").concat(Logger.packagePrefix()).concat(_this.moduleName);
            console[level].apply(console, __spreadArray(["%c".concat(prefix), "".concat(LEVEL_STYLES[level], " padding: 2px 6px;")], __read(args), false));
            if (Logger.onLog) {
                try {
                    Logger.onLog({ args: args, level: level, moduleName: _this.moduleName, timestamp: new Date().toISOString() });
                }
                catch (_) { }
            }
        }; };
        this.writeInfo = this.log("info");
        this.writeError = this.log("error");
        this.writeWarning = this.log("warn");
        this.moduleName = moduleName;
    }
    var _a;
    _a = Logger;
    Logger.onLog = null;
    Logger.packageName = "";
    Logger.addModules = function (m) { m.forEach(function (name) { return modules.add(name); }); };
    Logger.removeModules = function (m) { m.forEach(function (name) { return modules.delete(name); }); };
    Logger.clearModules = function () { modules.clear(); };
    Logger.getModules = function () { return __spreadArray([], __read(modules), false); };
    Logger.packagePrefix = function () { return !!_a.packageName
        ? "".concat(_a.packageName, " : ")
        : ""; };
    return Logger;
}());
if (typeof window !== "undefined")
    window.Logger = Logger;

exports.Logger = Logger;
//# sourceMappingURL=index.js.map
