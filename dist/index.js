Object.defineProperty(exports, '__esModule', { value: true });

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
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
            console[level].apply(console, __spreadArray(["%c".concat(Logger.packagePrefix()).concat(_this.moduleName), "".concat(LEVEL_STYLES[level], " padding: 2px 6px;")], __read(args), false));
        }; };
        this.writeInfo = this.log("info");
        this.writeError = this.log("error");
        this.writeWarning = this.log("warn");
        this.moduleName = moduleName;
    }
    var _a;
    _a = Logger;
    Logger.packageName = "";
    Logger.addModules = function (m) { m.forEach(function (name) { return modules.add(name); }); };
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
