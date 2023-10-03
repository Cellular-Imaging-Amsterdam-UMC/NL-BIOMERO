var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function getAugmentedNamespace(e) {
  if (e.__esModule)
    return e;
  var i = e.default;
  if (typeof i == "function") {
    var o = function s() {
      if (this instanceof s) {
        var d = [null];
        d.push.apply(d, arguments);
        var h = Function.bind.apply(i, d);
        return new h();
      }
      return i.apply(this, arguments);
    };
    o.prototype = i.prototype;
  } else
    o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(e).forEach(function(s) {
    var d = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(o, s, d.get ? d : {
      enumerable: !0,
      get: function() {
        return e[s];
      }
    });
  }), o;
}
var jsxRuntimeExports = {}, jsxRuntime = {
  get exports() {
    return jsxRuntimeExports;
  },
  set exports(e) {
    jsxRuntimeExports = e;
  }
}, reactJsxRuntime_production_min = {}, reactExports = {}, react = {
  get exports() {
    return reactExports;
  },
  set exports(e) {
    reactExports = e;
  }
}, react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(e) {
  return e === null || typeof e != "object" ? null : (e = z$1 && e[z$1] || e["@@iterator"], typeof e == "function" ? e : null);
}
var B$1 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(e, i, o) {
  this.props = e, this.context = i, this.refs = D$1, this.updater = o || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(e, i) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, i, "setState");
};
E$1.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(e, i, o) {
  this.props = e, this.context = i, this.refs = D$1, this.updater = o || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = !0;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function M$1(e, i, o) {
  var s, d = {}, h = null, _ = null;
  if (i != null)
    for (s in i.ref !== void 0 && (_ = i.ref), i.key !== void 0 && (h = "" + i.key), i)
      J.call(i, s) && !L$1.hasOwnProperty(s) && (d[s] = i[s]);
  var b = arguments.length - 2;
  if (b === 1)
    d.children = o;
  else if (1 < b) {
    for (var _e = Array(b), et = 0; et < b; et++)
      _e[et] = arguments[et + 2];
    d.children = _e;
  }
  if (e && e.defaultProps)
    for (s in b = e.defaultProps, b)
      d[s] === void 0 && (d[s] = b[s]);
  return { $$typeof: l$1, type: e, key: h, ref: _, props: d, _owner: K$1.current };
}
function N$1(e, i) {
  return { $$typeof: l$1, type: e.type, key: i, ref: e.ref, props: e.props, _owner: e._owner };
}
function O$1(e) {
  return typeof e == "object" && e !== null && e.$$typeof === l$1;
}
function escape$1(e) {
  var i = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(o) {
    return i[o];
  });
}
var P$1 = /\/+/g;
function Q$1(e, i) {
  return typeof e == "object" && e !== null && e.key != null ? escape$1("" + e.key) : i.toString(36);
}
function R$1(e, i, o, s, d) {
  var h = typeof e;
  (h === "undefined" || h === "boolean") && (e = null);
  var _ = !1;
  if (e === null)
    _ = !0;
  else
    switch (h) {
      case "string":
      case "number":
        _ = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case l$1:
          case n$1:
            _ = !0;
        }
    }
  if (_)
    return _ = e, d = d(_), e = s === "" ? "." + Q$1(_, 0) : s, I$1(d) ? (o = "", e != null && (o = e.replace(P$1, "$&/") + "/"), R$1(d, i, o, "", function(et) {
      return et;
    })) : d != null && (O$1(d) && (d = N$1(d, o + (!d.key || _ && _.key === d.key ? "" : ("" + d.key).replace(P$1, "$&/") + "/") + e)), i.push(d)), 1;
  if (_ = 0, s = s === "" ? "." : s + ":", I$1(e))
    for (var b = 0; b < e.length; b++) {
      h = e[b];
      var _e = s + Q$1(h, b);
      _ += R$1(h, i, o, _e, d);
    }
  else if (_e = A$1(e), typeof _e == "function")
    for (e = _e.call(e), b = 0; !(h = e.next()).done; )
      h = h.value, _e = s + Q$1(h, b++), _ += R$1(h, i, o, _e, d);
  else if (h === "object")
    throw i = String(e), Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
  return _;
}
function S$1(e, i, o) {
  if (e == null)
    return e;
  var s = [], d = 0;
  return R$1(e, s, "", "", function(h) {
    return i.call(o, h, d++);
  }), s;
}
function T$1(e) {
  if (e._status === -1) {
    var i = e._result;
    i = i(), i.then(function(o) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = o);
    }, function(o) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = o);
    }), e._status === -1 && (e._status = 0, e._result = i);
  }
  if (e._status === 1)
    return e._result.default;
  throw e._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$1, forEach: function(e, i, o) {
  S$1(e, function() {
    i.apply(this, arguments);
  }, o);
}, count: function(e) {
  var i = 0;
  return S$1(e, function() {
    i++;
  }), i;
}, toArray: function(e) {
  return S$1(e, function(i) {
    return i;
  }) || [];
}, only: function(e) {
  if (!O$1(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.cloneElement = function(e, i, o) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = C$1({}, e.props), d = e.key, h = e.ref, _ = e._owner;
  if (i != null) {
    if (i.ref !== void 0 && (h = i.ref, _ = K$1.current), i.key !== void 0 && (d = "" + i.key), e.type && e.type.defaultProps)
      var b = e.type.defaultProps;
    for (_e in i)
      J.call(i, _e) && !L$1.hasOwnProperty(_e) && (s[_e] = i[_e] === void 0 && b !== void 0 ? b[_e] : i[_e]);
  }
  var _e = arguments.length - 2;
  if (_e === 1)
    s.children = o;
  else if (1 < _e) {
    b = Array(_e);
    for (var et = 0; et < _e; et++)
      b[et] = arguments[et + 2];
    s.children = b;
  }
  return { $$typeof: l$1, type: e.type, key: d, ref: h, props: s, _owner: _ };
};
react_production_min.createContext = function(e) {
  return e = { $$typeof: u, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: t, _context: e }, e.Consumer = e;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(e) {
  var i = M$1.bind(null, e);
  return i.type = e, i;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(e) {
  return { $$typeof: v$1, render: e };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(e) {
  return { $$typeof: y, _payload: { _status: -1, _result: e }, _init: T$1 };
};
react_production_min.memo = function(e, i) {
  return { $$typeof: x, type: e, compare: i === void 0 ? null : i };
};
react_production_min.startTransition = function(e) {
  var i = V$1.transition;
  V$1.transition = {};
  try {
    e();
  } finally {
    V$1.transition = i;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(e, i) {
  return U$1.current.useCallback(e, i);
};
react_production_min.useContext = function(e) {
  return U$1.current.useContext(e);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(e) {
  return U$1.current.useDeferredValue(e);
};
react_production_min.useEffect = function(e, i) {
  return U$1.current.useEffect(e, i);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(e, i, o) {
  return U$1.current.useImperativeHandle(e, i, o);
};
react_production_min.useInsertionEffect = function(e, i) {
  return U$1.current.useInsertionEffect(e, i);
};
react_production_min.useLayoutEffect = function(e, i) {
  return U$1.current.useLayoutEffect(e, i);
};
react_production_min.useMemo = function(e, i) {
  return U$1.current.useMemo(e, i);
};
react_production_min.useReducer = function(e, i, o) {
  return U$1.current.useReducer(e, i, o);
};
react_production_min.useRef = function(e) {
  return U$1.current.useRef(e);
};
react_production_min.useState = function(e) {
  return U$1.current.useState(e);
};
react_production_min.useSyncExternalStore = function(e, i, o) {
  return U$1.current.useSyncExternalStore(e, i, o);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.2.0";
(function(e) {
  e.exports = react_production_min;
})(react);
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function q(e, i, o) {
  var s, d = {}, h = null, _ = null;
  o !== void 0 && (h = "" + o), i.key !== void 0 && (h = "" + i.key), i.ref !== void 0 && (_ = i.ref);
  for (s in i)
    m.call(i, s) && !p$1.hasOwnProperty(s) && (d[s] = i[s]);
  if (e && e.defaultProps)
    for (s in i = e.defaultProps, i)
      d[s] === void 0 && (d[s] = i[s]);
  return { $$typeof: k, type: e, key: h, ref: _, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
(function(e) {
  e.exports = reactJsxRuntime_production_min;
})(jsxRuntime);
const jsx = jsxRuntimeExports.jsx, jsxs = jsxRuntimeExports.jsxs;
var reactDomExports = {}, reactDom = {
  get exports() {
    return reactDomExports;
  },
  set exports(e) {
    reactDomExports = e;
  }
}, reactDom_production_min = {}, schedulerExports = {}, scheduler = {
  get exports() {
    return schedulerExports;
  },
  set exports(e) {
    schedulerExports = e;
  }
}, scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function i(Ct, It) {
    var jt = Ct.length;
    Ct.push(It);
    e:
      for (; 0 < jt; ) {
        var Yt = jt - 1 >>> 1, Pt = Ct[Yt];
        if (0 < d(Pt, It))
          Ct[Yt] = It, Ct[jt] = Pt, jt = Yt;
        else
          break e;
      }
  }
  function o(Ct) {
    return Ct.length === 0 ? null : Ct[0];
  }
  function s(Ct) {
    if (Ct.length === 0)
      return null;
    var It = Ct[0], jt = Ct.pop();
    if (jt !== It) {
      Ct[0] = jt;
      e:
        for (var Yt = 0, Pt = Ct.length, Dt = Pt >>> 1; Yt < Dt; ) {
          var Xt = 2 * (Yt + 1) - 1, Jt = Ct[Xt], Wt = Xt + 1, rn = Ct[Wt];
          if (0 > d(Jt, jt))
            Wt < Pt && 0 > d(rn, Jt) ? (Ct[Yt] = rn, Ct[Wt] = jt, Yt = Wt) : (Ct[Yt] = Jt, Ct[Xt] = jt, Yt = Xt);
          else if (Wt < Pt && 0 > d(rn, jt))
            Ct[Yt] = rn, Ct[Wt] = jt, Yt = Wt;
          else
            break e;
        }
    }
    return It;
  }
  function d(Ct, It) {
    var jt = Ct.sortIndex - It.sortIndex;
    return jt !== 0 ? jt : Ct.id - It.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var h = performance;
    e.unstable_now = function() {
      return h.now();
    };
  } else {
    var _ = Date, b = _.now();
    e.unstable_now = function() {
      return _.now() - b;
    };
  }
  var _e = [], et = [], ut = 1, st = null, ct = 3, mt = !1, pt = !1, vt = !1, ht = typeof setTimeout == "function" ? setTimeout : null, nt = typeof clearTimeout == "function" ? clearTimeout : null, ot = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function it(Ct) {
    for (var It = o(et); It !== null; ) {
      if (It.callback === null)
        s(et);
      else if (It.startTime <= Ct)
        s(et), It.sortIndex = It.expirationTime, i(_e, It);
      else
        break;
      It = o(et);
    }
  }
  function at(Ct) {
    if (vt = !1, it(Ct), !pt)
      if (o(_e) !== null)
        pt = !0, Gt(St);
      else {
        var It = o(et);
        It !== null && Mt(at, It.startTime - Ct);
      }
  }
  function St(Ct, It) {
    pt = !1, vt && (vt = !1, nt(Tt), Tt = -1), mt = !0;
    var jt = ct;
    try {
      for (it(It), st = o(_e); st !== null && (!(st.expirationTime > It) || Ct && !Ft()); ) {
        var Yt = st.callback;
        if (typeof Yt == "function") {
          st.callback = null, ct = st.priorityLevel;
          var Pt = Yt(st.expirationTime <= It);
          It = e.unstable_now(), typeof Pt == "function" ? st.callback = Pt : st === o(_e) && s(_e), it(It);
        } else
          s(_e);
        st = o(_e);
      }
      if (st !== null)
        var Dt = !0;
      else {
        var Xt = o(et);
        Xt !== null && Mt(at, Xt.startTime - It), Dt = !1;
      }
      return Dt;
    } finally {
      st = null, ct = jt, mt = !1;
    }
  }
  var _t = !1, xt = null, Tt = -1, Lt = 5, $t = -1;
  function Ft() {
    return !(e.unstable_now() - $t < Lt);
  }
  function nn() {
    if (xt !== null) {
      var Ct = e.unstable_now();
      $t = Ct;
      var It = !0;
      try {
        It = xt(!0, Ct);
      } finally {
        It ? an() : (_t = !1, xt = null);
      }
    } else
      _t = !1;
  }
  var an;
  if (typeof ot == "function")
    an = function() {
      ot(nn);
    };
  else if (typeof MessageChannel < "u") {
    var pn = new MessageChannel(), wn = pn.port2;
    pn.port1.onmessage = nn, an = function() {
      wn.postMessage(null);
    };
  } else
    an = function() {
      ht(nn, 0);
    };
  function Gt(Ct) {
    xt = Ct, _t || (_t = !0, an());
  }
  function Mt(Ct, It) {
    Tt = ht(function() {
      Ct(e.unstable_now());
    }, It);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(Ct) {
    Ct.callback = null;
  }, e.unstable_continueExecution = function() {
    pt || mt || (pt = !0, Gt(St));
  }, e.unstable_forceFrameRate = function(Ct) {
    0 > Ct || 125 < Ct ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Lt = 0 < Ct ? Math.floor(1e3 / Ct) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return ct;
  }, e.unstable_getFirstCallbackNode = function() {
    return o(_e);
  }, e.unstable_next = function(Ct) {
    switch (ct) {
      case 1:
      case 2:
      case 3:
        var It = 3;
        break;
      default:
        It = ct;
    }
    var jt = ct;
    ct = It;
    try {
      return Ct();
    } finally {
      ct = jt;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(Ct, It) {
    switch (Ct) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        Ct = 3;
    }
    var jt = ct;
    ct = Ct;
    try {
      return It();
    } finally {
      ct = jt;
    }
  }, e.unstable_scheduleCallback = function(Ct, It, jt) {
    var Yt = e.unstable_now();
    switch (typeof jt == "object" && jt !== null ? (jt = jt.delay, jt = typeof jt == "number" && 0 < jt ? Yt + jt : Yt) : jt = Yt, Ct) {
      case 1:
        var Pt = -1;
        break;
      case 2:
        Pt = 250;
        break;
      case 5:
        Pt = 1073741823;
        break;
      case 4:
        Pt = 1e4;
        break;
      default:
        Pt = 5e3;
    }
    return Pt = jt + Pt, Ct = { id: ut++, callback: It, priorityLevel: Ct, startTime: jt, expirationTime: Pt, sortIndex: -1 }, jt > Yt ? (Ct.sortIndex = jt, i(et, Ct), o(_e) === null && Ct === o(et) && (vt ? (nt(Tt), Tt = -1) : vt = !0, Mt(at, jt - Yt))) : (Ct.sortIndex = Pt, i(_e, Ct), pt || mt || (pt = !0, Gt(St))), Ct;
  }, e.unstable_shouldYield = Ft, e.unstable_wrapCallback = function(Ct) {
    var It = ct;
    return function() {
      var jt = ct;
      ct = It;
      try {
        return Ct.apply(this, arguments);
      } finally {
        ct = jt;
      }
    };
  };
})(scheduler_production_min);
(function(e) {
  e.exports = scheduler_production_min;
})(scheduler);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(e) {
  for (var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 1; o < arguments.length; o++)
    i += "&args[]=" + encodeURIComponent(arguments[o]);
  return "Minified React error #" + e + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(e, i) {
  ha(e, i), ha(e + "Capture", i);
}
function ha(e, i) {
  for (ea[e] = i, e = 0; e < i.length; e++)
    da.add(i[e]);
}
var ia = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(e) {
  return ja.call(ma, e) ? !0 : ja.call(la, e) ? !1 : ka.test(e) ? ma[e] = !0 : (la[e] = !0, !1);
}
function pa(e, i, o, s) {
  if (o !== null && o.type === 0)
    return !1;
  switch (typeof i) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return s ? !1 : o !== null ? !o.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function qa(e, i, o, s) {
  if (i === null || typeof i > "u" || pa(e, i, o, s))
    return !0;
  if (s)
    return !1;
  if (o !== null)
    switch (o.type) {
      case 3:
        return !i;
      case 4:
        return i === !1;
      case 5:
        return isNaN(i);
      case 6:
        return isNaN(i) || 1 > i;
    }
  return !1;
}
function v(e, i, o, s, d, h, _) {
  this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = s, this.attributeNamespace = d, this.mustUseProperty = o, this.propertyName = e, this.type = i, this.sanitizeURL = h, this.removeEmptyString = _;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  z[e] = new v(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var i = e[0];
  z[i] = new v(i, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  z[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  z[e] = new v(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  z[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  z[e] = new v(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  z[e] = new v(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  z[e] = new v(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  z[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ra = /[\-:]([a-z])/g;
function sa(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var i = e.replace(
    ra,
    sa
  );
  z[i] = new v(i, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var i = e.replace(ra, sa);
  z[i] = new v(i, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var i = e.replace(ra, sa);
  z[i] = new v(i, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  z[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  z[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ta(e, i, o, s) {
  var d = z.hasOwnProperty(i) ? z[i] : null;
  (d !== null ? d.type !== 0 : s || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (qa(i, o, d, s) && (o = null), s || d === null ? oa(i) && (o === null ? e.removeAttribute(i) : e.setAttribute(i, "" + o)) : d.mustUseProperty ? e[d.propertyName] = o === null ? d.type === 3 ? !1 : "" : o : (i = d.attributeName, s = d.attributeNamespace, o === null ? e.removeAttribute(i) : (d = d.type, o = d === 3 || d === 4 && o === !0 ? "" : "" + o, s ? e.setAttributeNS(s, i, o) : e.setAttribute(i, o))));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy"), Ia = Symbol.for("react.offscreen"), Ja = Symbol.iterator;
function Ka(e) {
  return e === null || typeof e != "object" ? null : (e = Ja && e[Ja] || e["@@iterator"], typeof e == "function" ? e : null);
}
var A = Object.assign, La;
function Ma(e) {
  if (La === void 0)
    try {
      throw Error();
    } catch (o) {
      var i = o.stack.trim().match(/\n( *(at )?)/);
      La = i && i[1] || "";
    }
  return `
` + La + e;
}
var Na = !1;
function Oa(e, i) {
  if (!e || Na)
    return "";
  Na = !0;
  var o = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (i)
      if (i = function() {
        throw Error();
      }, Object.defineProperty(i.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(i, []);
        } catch (et) {
          var s = et;
        }
        Reflect.construct(e, [], i);
      } else {
        try {
          i.call();
        } catch (et) {
          s = et;
        }
        e.call(i.prototype);
      }
    else {
      try {
        throw Error();
      } catch (et) {
        s = et;
      }
      e();
    }
  } catch (et) {
    if (et && s && typeof et.stack == "string") {
      for (var d = et.stack.split(`
`), h = s.stack.split(`
`), _ = d.length - 1, b = h.length - 1; 1 <= _ && 0 <= b && d[_] !== h[b]; )
        b--;
      for (; 1 <= _ && 0 <= b; _--, b--)
        if (d[_] !== h[b]) {
          if (_ !== 1 || b !== 1)
            do
              if (_--, b--, 0 > b || d[_] !== h[b]) {
                var _e = `
` + d[_].replace(" at new ", " at ");
                return e.displayName && _e.includes("<anonymous>") && (_e = _e.replace("<anonymous>", e.displayName)), _e;
              }
            while (1 <= _ && 0 <= b);
          break;
        }
    }
  } finally {
    Na = !1, Error.prepareStackTrace = o;
  }
  return (e = e ? e.displayName || e.name : "") ? Ma(e) : "";
}
function Pa(e) {
  switch (e.tag) {
    case 5:
      return Ma(e.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Oa(e.type, !1), e;
    case 11:
      return e = Oa(e.type.render, !1), e;
    case 1:
      return e = Oa(e.type, !0), e;
    default:
      return "";
  }
}
function Qa(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ca:
        return (e.displayName || "Context") + ".Consumer";
      case Ba:
        return (e._context.displayName || "Context") + ".Provider";
      case Da:
        var i = e.render;
        return e = e.displayName, e || (e = i.displayName || i.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Ga:
        return i = e.displayName || null, i !== null ? i : Qa(e.type) || "Memo";
      case Ha:
        i = e._payload, e = e._init;
        try {
          return Qa(e(i));
        } catch {
        }
    }
  return null;
}
function Ra(e) {
  var i = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (i.displayName || "Context") + ".Consumer";
    case 10:
      return (i._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = i.render, e = e.displayName || e.name || "", i.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return i;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(i);
    case 8:
      return i === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
  }
  return null;
}
function Sa(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ta(e) {
  var i = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
}
function Ua(e) {
  var i = Ta(e) ? "checked" : "value", o = Object.getOwnPropertyDescriptor(e.constructor.prototype, i), s = "" + e[i];
  if (!e.hasOwnProperty(i) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
    var d = o.get, h = o.set;
    return Object.defineProperty(e, i, { configurable: !0, get: function() {
      return d.call(this);
    }, set: function(_) {
      s = "" + _, h.call(this, _);
    } }), Object.defineProperty(e, i, { enumerable: o.enumerable }), { getValue: function() {
      return s;
    }, setValue: function(_) {
      s = "" + _;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[i];
    } };
  }
}
function Va(e) {
  e._valueTracker || (e._valueTracker = Ua(e));
}
function Wa(e) {
  if (!e)
    return !1;
  var i = e._valueTracker;
  if (!i)
    return !0;
  var o = i.getValue(), s = "";
  return e && (s = Ta(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== o ? (i.setValue(e), !0) : !1;
}
function Xa(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ya(e, i) {
  var o = i.checked;
  return A({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: o ?? e._wrapperState.initialChecked });
}
function Za(e, i) {
  var o = i.defaultValue == null ? "" : i.defaultValue, s = i.checked != null ? i.checked : i.defaultChecked;
  o = Sa(i.value != null ? i.value : o), e._wrapperState = { initialChecked: s, initialValue: o, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
}
function ab(e, i) {
  i = i.checked, i != null && ta(e, "checked", i, !1);
}
function bb(e, i) {
  ab(e, i);
  var o = Sa(i.value), s = i.type;
  if (o != null)
    s === "number" ? (o === 0 && e.value === "" || e.value != o) && (e.value = "" + o) : e.value !== "" + o && (e.value = "" + o);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  i.hasOwnProperty("value") ? cb(e, i.type, o) : i.hasOwnProperty("defaultValue") && cb(e, i.type, Sa(i.defaultValue)), i.checked == null && i.defaultChecked != null && (e.defaultChecked = !!i.defaultChecked);
}
function db(e, i, o) {
  if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
    var s = i.type;
    if (!(s !== "submit" && s !== "reset" || i.value !== void 0 && i.value !== null))
      return;
    i = "" + e._wrapperState.initialValue, o || i === e.value || (e.value = i), e.defaultValue = i;
  }
  o = e.name, o !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, o !== "" && (e.name = o);
}
function cb(e, i, o) {
  (i !== "number" || Xa(e.ownerDocument) !== e) && (o == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + o && (e.defaultValue = "" + o));
}
var eb = Array.isArray;
function fb(e, i, o, s) {
  if (e = e.options, i) {
    i = {};
    for (var d = 0; d < o.length; d++)
      i["$" + o[d]] = !0;
    for (o = 0; o < e.length; o++)
      d = i.hasOwnProperty("$" + e[o].value), e[o].selected !== d && (e[o].selected = d), d && s && (e[o].defaultSelected = !0);
  } else {
    for (o = "" + Sa(o), i = null, d = 0; d < e.length; d++) {
      if (e[d].value === o) {
        e[d].selected = !0, s && (e[d].defaultSelected = !0);
        return;
      }
      i !== null || e[d].disabled || (i = e[d]);
    }
    i !== null && (i.selected = !0);
  }
}
function gb(e, i) {
  if (i.dangerouslySetInnerHTML != null)
    throw Error(p(91));
  return A({}, i, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function hb(e, i) {
  var o = i.value;
  if (o == null) {
    if (o = i.children, i = i.defaultValue, o != null) {
      if (i != null)
        throw Error(p(92));
      if (eb(o)) {
        if (1 < o.length)
          throw Error(p(93));
        o = o[0];
      }
      i = o;
    }
    i == null && (i = ""), o = i;
  }
  e._wrapperState = { initialValue: Sa(o) };
}
function ib(e, i) {
  var o = Sa(i.value), s = Sa(i.defaultValue);
  o != null && (o = "" + o, o !== e.value && (e.value = o), i.defaultValue == null && e.defaultValue !== o && (e.defaultValue = o)), s != null && (e.defaultValue = "" + s);
}
function jb(e) {
  var i = e.textContent;
  i === e._wrapperState.initialValue && i !== "" && i !== null && (e.value = i);
}
function kb(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(e, i) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? kb(i) : e === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var mb, nb = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, o, s, d) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(i, o, s, d);
    });
  } : e;
}(function(e, i) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = i;
  else {
    for (mb = mb || document.createElement("div"), mb.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = mb.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; i.firstChild; )
      e.appendChild(i.firstChild);
  }
});
function ob(e, i) {
  if (i) {
    var o = e.firstChild;
    if (o && o === e.lastChild && o.nodeType === 3) {
      o.nodeValue = i;
      return;
    }
  }
  e.textContent = i;
}
var pb = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(e) {
  qb.forEach(function(i) {
    i = i + e.charAt(0).toUpperCase() + e.substring(1), pb[i] = pb[e];
  });
});
function rb(e, i, o) {
  return i == null || typeof i == "boolean" || i === "" ? "" : o || typeof i != "number" || i === 0 || pb.hasOwnProperty(e) && pb[e] ? ("" + i).trim() : i + "px";
}
function sb(e, i) {
  e = e.style;
  for (var o in i)
    if (i.hasOwnProperty(o)) {
      var s = o.indexOf("--") === 0, d = rb(o, i[o], s);
      o === "float" && (o = "cssFloat"), s ? e.setProperty(o, d) : e[o] = d;
    }
}
var tb = A({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ub(e, i) {
  if (i) {
    if (tb[e] && (i.children != null || i.dangerouslySetInnerHTML != null))
      throw Error(p(137, e));
    if (i.dangerouslySetInnerHTML != null) {
      if (i.children != null)
        throw Error(p(60));
      if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML))
        throw Error(p(61));
    }
    if (i.style != null && typeof i.style != "object")
      throw Error(p(62));
  }
}
function vb(e, i) {
  if (e.indexOf("-") === -1)
    return typeof i.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var wb = null;
function xb(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var yb = null, zb = null, Ab = null;
function Bb(e) {
  if (e = Cb(e)) {
    if (typeof yb != "function")
      throw Error(p(280));
    var i = e.stateNode;
    i && (i = Db(i), yb(e.stateNode, e.type, i));
  }
}
function Eb(e) {
  zb ? Ab ? Ab.push(e) : Ab = [e] : zb = e;
}
function Fb() {
  if (zb) {
    var e = zb, i = Ab;
    if (Ab = zb = null, Bb(e), i)
      for (e = 0; e < i.length; e++)
        Bb(i[e]);
  }
}
function Gb(e, i) {
  return e(i);
}
function Hb() {
}
var Ib = !1;
function Jb(e, i, o) {
  if (Ib)
    return e(i, o);
  Ib = !0;
  try {
    return Gb(e, i, o);
  } finally {
    Ib = !1, (zb !== null || Ab !== null) && (Hb(), Fb());
  }
}
function Kb(e, i) {
  var o = e.stateNode;
  if (o === null)
    return null;
  var s = Db(o);
  if (s === null)
    return null;
  o = s[i];
  e:
    switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
        break e;
      default:
        e = !1;
    }
  if (e)
    return null;
  if (o && typeof o != "function")
    throw Error(p(231, i, typeof o));
  return o;
}
var Lb = !1;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = !0;
    } }), window.addEventListener("test", Mb, Mb), window.removeEventListener("test", Mb, Mb);
  } catch {
    Lb = !1;
  }
function Nb(e, i, o, s, d, h, _, b, _e) {
  var et = Array.prototype.slice.call(arguments, 3);
  try {
    i.apply(o, et);
  } catch (ut) {
    this.onError(ut);
  }
}
var Ob = !1, Pb = null, Qb = !1, Rb = null, Sb = { onError: function(e) {
  Ob = !0, Pb = e;
} };
function Tb(e, i, o, s, d, h, _, b, _e) {
  Ob = !1, Pb = null, Nb.apply(Sb, arguments);
}
function Ub(e, i, o, s, d, h, _, b, _e) {
  if (Tb.apply(this, arguments), Ob) {
    if (Ob) {
      var et = Pb;
      Ob = !1, Pb = null;
    } else
      throw Error(p(198));
    Qb || (Qb = !0, Rb = et);
  }
}
function Vb(e) {
  var i = e, o = e;
  if (e.alternate)
    for (; i.return; )
      i = i.return;
  else {
    e = i;
    do
      i = e, i.flags & 4098 && (o = i.return), e = i.return;
    while (e);
  }
  return i.tag === 3 ? o : null;
}
function Wb(e) {
  if (e.tag === 13) {
    var i = e.memoizedState;
    if (i === null && (e = e.alternate, e !== null && (i = e.memoizedState)), i !== null)
      return i.dehydrated;
  }
  return null;
}
function Xb(e) {
  if (Vb(e) !== e)
    throw Error(p(188));
}
function Yb(e) {
  var i = e.alternate;
  if (!i) {
    if (i = Vb(e), i === null)
      throw Error(p(188));
    return i !== e ? null : e;
  }
  for (var o = e, s = i; ; ) {
    var d = o.return;
    if (d === null)
      break;
    var h = d.alternate;
    if (h === null) {
      if (s = d.return, s !== null) {
        o = s;
        continue;
      }
      break;
    }
    if (d.child === h.child) {
      for (h = d.child; h; ) {
        if (h === o)
          return Xb(d), e;
        if (h === s)
          return Xb(d), i;
        h = h.sibling;
      }
      throw Error(p(188));
    }
    if (o.return !== s.return)
      o = d, s = h;
    else {
      for (var _ = !1, b = d.child; b; ) {
        if (b === o) {
          _ = !0, o = d, s = h;
          break;
        }
        if (b === s) {
          _ = !0, s = d, o = h;
          break;
        }
        b = b.sibling;
      }
      if (!_) {
        for (b = h.child; b; ) {
          if (b === o) {
            _ = !0, o = h, s = d;
            break;
          }
          if (b === s) {
            _ = !0, s = h, o = d;
            break;
          }
          b = b.sibling;
        }
        if (!_)
          throw Error(p(189));
      }
    }
    if (o.alternate !== s)
      throw Error(p(190));
  }
  if (o.tag !== 3)
    throw Error(p(188));
  return o.stateNode.current === o ? e : i;
}
function Zb(e) {
  return e = Yb(e), e !== null ? $b(e) : null;
}
function $b(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var i = $b(e);
    if (i !== null)
      return i;
    e = e.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(e) {
  if (lc && typeof lc.onCommitFiberRoot == "function")
    try {
      lc.onCommitFiberRoot(kc, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (pc(e) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function uc(e, i) {
  var o = e.pendingLanes;
  if (o === 0)
    return 0;
  var s = 0, d = e.suspendedLanes, h = e.pingedLanes, _ = o & 268435455;
  if (_ !== 0) {
    var b = _ & ~d;
    b !== 0 ? s = tc(b) : (h &= _, h !== 0 && (s = tc(h)));
  } else
    _ = o & ~d, _ !== 0 ? s = tc(_) : h !== 0 && (s = tc(h));
  if (s === 0)
    return 0;
  if (i !== 0 && i !== s && !(i & d) && (d = s & -s, h = i & -i, d >= h || d === 16 && (h & 4194240) !== 0))
    return i;
  if (s & 4 && (s |= o & 16), i = e.entangledLanes, i !== 0)
    for (e = e.entanglements, i &= s; 0 < i; )
      o = 31 - oc(i), d = 1 << o, s |= e[o], i &= ~d;
  return s;
}
function vc(e, i) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return i + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return i + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(e, i) {
  for (var o = e.suspendedLanes, s = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes; 0 < h; ) {
    var _ = 31 - oc(h), b = 1 << _, _e = d[_];
    _e === -1 ? (!(b & o) || b & s) && (d[_] = vc(b, i)) : _e <= i && (e.expiredLanes |= b), h &= ~b;
  }
}
function xc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var e = rc;
  return rc <<= 1, !(rc & 4194240) && (rc = 64), e;
}
function zc(e) {
  for (var i = [], o = 0; 31 > o; o++)
    i.push(e);
  return i;
}
function Ac(e, i, o) {
  e.pendingLanes |= i, i !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, i = 31 - oc(i), e[i] = o;
}
function Bc(e, i) {
  var o = e.pendingLanes & ~i;
  e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= i, e.mutableReadLanes &= i, e.entangledLanes &= i, i = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < o; ) {
    var d = 31 - oc(o), h = 1 << d;
    i[d] = 0, s[d] = -1, e[d] = -1, o &= ~h;
  }
}
function Cc(e, i) {
  var o = e.entangledLanes |= i;
  for (e = e.entanglements; o; ) {
    var s = 31 - oc(o), d = 1 << s;
    d & i | e[s] & i && (e[s] |= i), o &= ~d;
  }
}
var C = 0;
function Dc(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = !1, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(e, i) {
  switch (e) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(i.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(i.pointerId);
  }
}
function Tc(e, i, o, s, d, h) {
  return e === null || e.nativeEvent !== h ? (e = { blockedOn: i, domEventName: o, eventSystemFlags: s, nativeEvent: h, targetContainers: [d] }, i !== null && (i = Cb(i), i !== null && Fc(i)), e) : (e.eventSystemFlags |= s, i = e.targetContainers, d !== null && i.indexOf(d) === -1 && i.push(d), e);
}
function Uc(e, i, o, s, d) {
  switch (i) {
    case "focusin":
      return Lc = Tc(Lc, e, i, o, s, d), !0;
    case "dragenter":
      return Mc = Tc(Mc, e, i, o, s, d), !0;
    case "mouseover":
      return Nc = Tc(Nc, e, i, o, s, d), !0;
    case "pointerover":
      var h = d.pointerId;
      return Oc.set(h, Tc(Oc.get(h) || null, e, i, o, s, d)), !0;
    case "gotpointercapture":
      return h = d.pointerId, Pc.set(h, Tc(Pc.get(h) || null, e, i, o, s, d)), !0;
  }
  return !1;
}
function Vc(e) {
  var i = Wc(e.target);
  if (i !== null) {
    var o = Vb(i);
    if (o !== null) {
      if (i = o.tag, i === 13) {
        if (i = Wb(o), i !== null) {
          e.blockedOn = i, Ic(e.priority, function() {
            Gc(o);
          });
          return;
        }
      } else if (i === 3 && o.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Xc(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var i = e.targetContainers; 0 < i.length; ) {
    var o = Yc(e.domEventName, e.eventSystemFlags, i[0], e.nativeEvent);
    if (o === null) {
      o = e.nativeEvent;
      var s = new o.constructor(o.type, o);
      wb = s, o.target.dispatchEvent(s), wb = null;
    } else
      return i = Cb(o), i !== null && Fc(i), e.blockedOn = o, !1;
    i.shift();
  }
  return !0;
}
function Zc(e, i, o) {
  Xc(e) && o.delete(i);
}
function $c() {
  Jc = !1, Lc !== null && Xc(Lc) && (Lc = null), Mc !== null && Xc(Mc) && (Mc = null), Nc !== null && Xc(Nc) && (Nc = null), Oc.forEach(Zc), Pc.forEach(Zc);
}
function ad(e, i) {
  e.blockedOn === i && (e.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(e) {
  function i(d) {
    return ad(d, e);
  }
  if (0 < Kc.length) {
    ad(Kc[0], e);
    for (var o = 1; o < Kc.length; o++) {
      var s = Kc[o];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (Lc !== null && ad(Lc, e), Mc !== null && ad(Mc, e), Nc !== null && ad(Nc, e), Oc.forEach(i), Pc.forEach(i), o = 0; o < Qc.length; o++)
    s = Qc[o], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < Qc.length && (o = Qc[0], o.blockedOn === null); )
    Vc(o), o.blockedOn === null && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = !0;
function ed(e, i, o, s) {
  var d = C, h = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(e, i, o, s);
  } finally {
    C = d, cd.transition = h;
  }
}
function gd(e, i, o, s) {
  var d = C, h = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(e, i, o, s);
  } finally {
    C = d, cd.transition = h;
  }
}
function fd(e, i, o, s) {
  if (dd) {
    var d = Yc(e, i, o, s);
    if (d === null)
      hd(e, i, s, id, o), Sc(e, s);
    else if (Uc(d, e, i, o, s))
      s.stopPropagation();
    else if (Sc(e, s), i & 4 && -1 < Rc.indexOf(e)) {
      for (; d !== null; ) {
        var h = Cb(d);
        if (h !== null && Ec(h), h = Yc(e, i, o, s), h === null && hd(e, i, s, id, o), h === d)
          break;
        d = h;
      }
      d !== null && s.stopPropagation();
    } else
      hd(e, i, s, null, o);
  }
}
var id = null;
function Yc(e, i, o, s) {
  if (id = null, e = xb(s), e = Wc(e), e !== null)
    if (i = Vb(e), i === null)
      e = null;
    else if (o = i.tag, o === 13) {
      if (e = Wb(i), e !== null)
        return e;
      e = null;
    } else if (o === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated)
        return i.tag === 3 ? i.stateNode.containerInfo : null;
      e = null;
    } else
      i !== e && (e = null);
  return id = e, null;
}
function jd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var e, i = ld, o = i.length, s, d = "value" in kd ? kd.value : kd.textContent, h = d.length;
  for (e = 0; e < o && i[e] === d[e]; e++)
    ;
  var _ = o - e;
  for (s = 1; s <= _ && i[o - s] === d[h - s]; s++)
    ;
  return md = d.slice(e, 1 < s ? 1 - s : void 0);
}
function od(e) {
  var i = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && i === 13 && (e = 13)) : e = i, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function pd() {
  return !0;
}
function qd() {
  return !1;
}
function rd(e) {
  function i(o, s, d, h, _) {
    this._reactName = o, this._targetInst = d, this.type = s, this.nativeEvent = h, this.target = _, this.currentTarget = null;
    for (var b in e)
      e.hasOwnProperty(b) && (o = e[b], this[b] = o ? o(h) : h[b]);
    return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? pd : qd, this.isPropagationStopped = qd, this;
  }
  return A(i.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var o = this.nativeEvent;
    o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var o = this.nativeEvent;
    o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd }), i;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== yd && (yd && e.type === "mousemove" ? (wd = e.screenX - yd.screenX, xd = e.screenY - yd.screenY) : xd = wd = 0, yd = e), wd);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(e) {
  var i = this.nativeEvent;
  return i.getModifierState ? i.getModifierState(e) : (e = Od[e]) ? !!i[e] : !1;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(e) {
  if (e.key) {
    var i = Md[e.key] || e.key;
    if (i !== "Unidentified")
      return i;
  }
  return e.type === "keypress" ? (e = od(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(e) {
  return e.type === "keypress" ? od(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? od(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
function ge(e, i) {
  switch (e) {
    case "keyup":
      return $d.indexOf(i.keyCode) !== -1;
    case "keydown":
      return i.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function he(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var ie = !1;
function je(e, i) {
  switch (e) {
    case "compositionend":
      return he(i);
    case "keypress":
      return i.which !== 32 ? null : (fe = !0, ee);
    case "textInput":
      return e = i.data, e === ee && fe ? null : e;
    default:
      return null;
  }
}
function ke(e, i) {
  if (ie)
    return e === "compositionend" || !ae && ge(e, i) ? (e = nd(), md = ld = kd = null, ie = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
        if (i.char && 1 < i.char.length)
          return i.char;
        if (i.which)
          return String.fromCharCode(i.which);
      }
      return null;
    case "compositionend":
      return de && i.locale !== "ko" ? null : i.data;
    default:
      return null;
  }
}
var le = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function me(e) {
  var i = e && e.nodeName && e.nodeName.toLowerCase();
  return i === "input" ? !!le[e.type] : i === "textarea";
}
function ne(e, i, o, s) {
  Eb(s), i = oe(i, "onChange"), 0 < i.length && (o = new td("onChange", "change", null, o, s), e.push({ event: o, listeners: i }));
}
var pe = null, qe = null;
function re(e) {
  se(e, 0);
}
function te(e) {
  var i = ue(e);
  if (Wa(i))
    return e;
}
function ve(e, i) {
  if (e === "change")
    return i;
}
var we = !1;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;"), ye = typeof ze.oninput == "function";
    }
    xe = ye;
  } else
    xe = !1;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(e) {
  if (e.propertyName === "value" && te(qe)) {
    var i = [];
    ne(i, qe, e, xb(e)), Jb(re, i);
  }
}
function Ce(e, i, o) {
  e === "focusin" ? (Ae(), pe = i, qe = o, pe.attachEvent("onpropertychange", Be)) : e === "focusout" && Ae();
}
function De(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return te(qe);
}
function Ee(e, i) {
  if (e === "click")
    return te(i);
}
function Fe(e, i) {
  if (e === "input" || e === "change")
    return te(i);
}
function Ge(e, i) {
  return e === i && (e !== 0 || 1 / e === 1 / i) || e !== e && i !== i;
}
var He = typeof Object.is == "function" ? Object.is : Ge;
function Ie(e, i) {
  if (He(e, i))
    return !0;
  if (typeof e != "object" || e === null || typeof i != "object" || i === null)
    return !1;
  var o = Object.keys(e), s = Object.keys(i);
  if (o.length !== s.length)
    return !1;
  for (s = 0; s < o.length; s++) {
    var d = o[s];
    if (!ja.call(i, d) || !He(e[d], i[d]))
      return !1;
  }
  return !0;
}
function Je(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Ke(e, i) {
  var o = Je(e);
  e = 0;
  for (var s; o; ) {
    if (o.nodeType === 3) {
      if (s = e + o.textContent.length, e <= i && s >= i)
        return { node: o, offset: i - e };
      e = s;
    }
    e: {
      for (; o; ) {
        if (o.nextSibling) {
          o = o.nextSibling;
          break e;
        }
        o = o.parentNode;
      }
      o = void 0;
    }
    o = Je(o);
  }
}
function Le(e, i) {
  return e && i ? e === i ? !0 : e && e.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Le(e, i.parentNode) : "contains" in e ? e.contains(i) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(i) & 16) : !1 : !1;
}
function Me() {
  for (var e = window, i = Xa(); i instanceof e.HTMLIFrameElement; ) {
    try {
      var o = typeof i.contentWindow.location.href == "string";
    } catch {
      o = !1;
    }
    if (o)
      e = i.contentWindow;
    else
      break;
    i = Xa(e.document);
  }
  return i;
}
function Ne(e) {
  var i = e && e.nodeName && e.nodeName.toLowerCase();
  return i && (i === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || i === "textarea" || e.contentEditable === "true");
}
function Oe(e) {
  var i = Me(), o = e.focusedElem, s = e.selectionRange;
  if (i !== o && o && o.ownerDocument && Le(o.ownerDocument.documentElement, o)) {
    if (s !== null && Ne(o)) {
      if (i = s.start, e = s.end, e === void 0 && (e = i), "selectionStart" in o)
        o.selectionStart = i, o.selectionEnd = Math.min(e, o.value.length);
      else if (e = (i = o.ownerDocument || document) && i.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var d = o.textContent.length, h = Math.min(s.start, d);
        s = s.end === void 0 ? h : Math.min(s.end, d), !e.extend && h > s && (d = s, s = h, h = d), d = Ke(o, h);
        var _ = Ke(
          o,
          s
        );
        d && _ && (e.rangeCount !== 1 || e.anchorNode !== d.node || e.anchorOffset !== d.offset || e.focusNode !== _.node || e.focusOffset !== _.offset) && (i = i.createRange(), i.setStart(d.node, d.offset), e.removeAllRanges(), h > s ? (e.addRange(i), e.extend(_.node, _.offset)) : (i.setEnd(_.node, _.offset), e.addRange(i)));
      }
    }
    for (i = [], e = o; e = e.parentNode; )
      e.nodeType === 1 && i.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof o.focus == "function" && o.focus(), o = 0; o < i.length; o++)
      e = i[o], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
function Ue(e, i, o) {
  var s = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
  Te || Qe == null || Qe !== Xa(s) || (s = Qe, "selectionStart" in s && Ne(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Se && Ie(Se, s) || (Se = s, s = oe(Re, "onSelect"), 0 < s.length && (i = new td("onSelect", "select", null, i, o), e.push({ event: i, listeners: s }), i.target = Qe)));
}
function Ve(e, i) {
  var o = {};
  return o[e.toLowerCase()] = i.toLowerCase(), o["Webkit" + e] = "webkit" + i, o["Moz" + e] = "moz" + i, o;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(e) {
  if (Xe[e])
    return Xe[e];
  if (!We[e])
    return e;
  var i = We[e], o;
  for (o in i)
    if (i.hasOwnProperty(o) && o in Ye)
      return Xe[e] = i[o];
  return e;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(e, i) {
  df.set(e, i), fa(i, [e]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(e, i, o) {
  var s = e.type || "unknown-event";
  e.currentTarget = o, Ub(s, i, void 0, e), e.currentTarget = null;
}
function se(e, i) {
  i = (i & 4) !== 0;
  for (var o = 0; o < e.length; o++) {
    var s = e[o], d = s.event;
    s = s.listeners;
    e: {
      var h = void 0;
      if (i)
        for (var _ = s.length - 1; 0 <= _; _--) {
          var b = s[_], _e = b.instance, et = b.currentTarget;
          if (b = b.listener, _e !== h && d.isPropagationStopped())
            break e;
          nf(d, b, et), h = _e;
        }
      else
        for (_ = 0; _ < s.length; _++) {
          if (b = s[_], _e = b.instance, et = b.currentTarget, b = b.listener, _e !== h && d.isPropagationStopped())
            break e;
          nf(d, b, et), h = _e;
        }
    }
  }
  if (Qb)
    throw e = Rb, Qb = !1, Rb = null, e;
}
function D(e, i) {
  var o = i[of];
  o === void 0 && (o = i[of] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  o.has(s) || (pf(i, e, 2, !1), o.add(s));
}
function qf(e, i, o) {
  var s = 0;
  i && (s |= 4), pf(o, e, s, i);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(e) {
  if (!e[rf]) {
    e[rf] = !0, da.forEach(function(o) {
      o !== "selectionchange" && (mf.has(o) || qf(o, !1, e), qf(o, !0, e));
    });
    var i = e.nodeType === 9 ? e : e.ownerDocument;
    i === null || i[rf] || (i[rf] = !0, qf("selectionchange", !1, i));
  }
}
function pf(e, i, o, s) {
  switch (jd(i)) {
    case 1:
      var d = ed;
      break;
    case 4:
      d = gd;
      break;
    default:
      d = fd;
  }
  o = d.bind(null, i, o, e), d = void 0, !Lb || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (d = !0), s ? d !== void 0 ? e.addEventListener(i, o, { capture: !0, passive: d }) : e.addEventListener(i, o, !0) : d !== void 0 ? e.addEventListener(i, o, { passive: d }) : e.addEventListener(i, o, !1);
}
function hd(e, i, o, s, d) {
  var h = s;
  if (!(i & 1) && !(i & 2) && s !== null)
    e:
      for (; ; ) {
        if (s === null)
          return;
        var _ = s.tag;
        if (_ === 3 || _ === 4) {
          var b = s.stateNode.containerInfo;
          if (b === d || b.nodeType === 8 && b.parentNode === d)
            break;
          if (_ === 4)
            for (_ = s.return; _ !== null; ) {
              var _e = _.tag;
              if ((_e === 3 || _e === 4) && (_e = _.stateNode.containerInfo, _e === d || _e.nodeType === 8 && _e.parentNode === d))
                return;
              _ = _.return;
            }
          for (; b !== null; ) {
            if (_ = Wc(b), _ === null)
              return;
            if (_e = _.tag, _e === 5 || _e === 6) {
              s = h = _;
              continue e;
            }
            b = b.parentNode;
          }
        }
        s = s.return;
      }
  Jb(function() {
    var et = h, ut = xb(o), st = [];
    e: {
      var ct = df.get(e);
      if (ct !== void 0) {
        var mt = td, pt = e;
        switch (e) {
          case "keypress":
            if (od(o) === 0)
              break e;
          case "keydown":
          case "keyup":
            mt = Rd;
            break;
          case "focusin":
            pt = "focus", mt = Fd;
            break;
          case "focusout":
            pt = "blur", mt = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            mt = Fd;
            break;
          case "click":
            if (o.button === 2)
              break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            mt = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            mt = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            mt = Vd;
            break;
          case $e:
          case af:
          case bf:
            mt = Hd;
            break;
          case cf:
            mt = Xd;
            break;
          case "scroll":
            mt = vd;
            break;
          case "wheel":
            mt = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            mt = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            mt = Td;
        }
        var vt = (i & 4) !== 0, ht = !vt && e === "scroll", nt = vt ? ct !== null ? ct + "Capture" : null : ct;
        vt = [];
        for (var ot = et, it; ot !== null; ) {
          it = ot;
          var at = it.stateNode;
          if (it.tag === 5 && at !== null && (it = at, nt !== null && (at = Kb(ot, nt), at != null && vt.push(tf(ot, at, it)))), ht)
            break;
          ot = ot.return;
        }
        0 < vt.length && (ct = new mt(ct, pt, null, o, ut), st.push({ event: ct, listeners: vt }));
      }
    }
    if (!(i & 7)) {
      e: {
        if (ct = e === "mouseover" || e === "pointerover", mt = e === "mouseout" || e === "pointerout", ct && o !== wb && (pt = o.relatedTarget || o.fromElement) && (Wc(pt) || pt[uf]))
          break e;
        if ((mt || ct) && (ct = ut.window === ut ? ut : (ct = ut.ownerDocument) ? ct.defaultView || ct.parentWindow : window, mt ? (pt = o.relatedTarget || o.toElement, mt = et, pt = pt ? Wc(pt) : null, pt !== null && (ht = Vb(pt), pt !== ht || pt.tag !== 5 && pt.tag !== 6) && (pt = null)) : (mt = null, pt = et), mt !== pt)) {
          if (vt = Bd, at = "onMouseLeave", nt = "onMouseEnter", ot = "mouse", (e === "pointerout" || e === "pointerover") && (vt = Td, at = "onPointerLeave", nt = "onPointerEnter", ot = "pointer"), ht = mt == null ? ct : ue(mt), it = pt == null ? ct : ue(pt), ct = new vt(at, ot + "leave", mt, o, ut), ct.target = ht, ct.relatedTarget = it, at = null, Wc(ut) === et && (vt = new vt(nt, ot + "enter", pt, o, ut), vt.target = it, vt.relatedTarget = ht, at = vt), ht = at, mt && pt)
            t: {
              for (vt = mt, nt = pt, ot = 0, it = vt; it; it = vf(it))
                ot++;
              for (it = 0, at = nt; at; at = vf(at))
                it++;
              for (; 0 < ot - it; )
                vt = vf(vt), ot--;
              for (; 0 < it - ot; )
                nt = vf(nt), it--;
              for (; ot--; ) {
                if (vt === nt || nt !== null && vt === nt.alternate)
                  break t;
                vt = vf(vt), nt = vf(nt);
              }
              vt = null;
            }
          else
            vt = null;
          mt !== null && wf(st, ct, mt, vt, !1), pt !== null && ht !== null && wf(st, ht, pt, vt, !0);
        }
      }
      e: {
        if (ct = et ? ue(et) : window, mt = ct.nodeName && ct.nodeName.toLowerCase(), mt === "select" || mt === "input" && ct.type === "file")
          var St = ve;
        else if (me(ct))
          if (we)
            St = Fe;
          else {
            St = De;
            var _t = Ce;
          }
        else
          (mt = ct.nodeName) && mt.toLowerCase() === "input" && (ct.type === "checkbox" || ct.type === "radio") && (St = Ee);
        if (St && (St = St(e, et))) {
          ne(st, St, o, ut);
          break e;
        }
        _t && _t(e, ct, et), e === "focusout" && (_t = ct._wrapperState) && _t.controlled && ct.type === "number" && cb(ct, "number", ct.value);
      }
      switch (_t = et ? ue(et) : window, e) {
        case "focusin":
          (me(_t) || _t.contentEditable === "true") && (Qe = _t, Re = et, Se = null);
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = !1, Ue(st, o, ut);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(st, o, ut);
      }
      var xt;
      if (ae)
        e: {
          switch (e) {
            case "compositionstart":
              var Tt = "onCompositionStart";
              break e;
            case "compositionend":
              Tt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Tt = "onCompositionUpdate";
              break e;
          }
          Tt = void 0;
        }
      else
        ie ? ge(e, o) && (Tt = "onCompositionEnd") : e === "keydown" && o.keyCode === 229 && (Tt = "onCompositionStart");
      Tt && (de && o.locale !== "ko" && (ie || Tt !== "onCompositionStart" ? Tt === "onCompositionEnd" && ie && (xt = nd()) : (kd = ut, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), _t = oe(et, Tt), 0 < _t.length && (Tt = new Ld(Tt, e, null, o, ut), st.push({ event: Tt, listeners: _t }), xt ? Tt.data = xt : (xt = he(o), xt !== null && (Tt.data = xt)))), (xt = ce ? je(e, o) : ke(e, o)) && (et = oe(et, "onBeforeInput"), 0 < et.length && (ut = new Ld("onBeforeInput", "beforeinput", null, o, ut), st.push({ event: ut, listeners: et }), ut.data = xt));
    }
    se(st, i);
  });
}
function tf(e, i, o) {
  return { instance: e, listener: i, currentTarget: o };
}
function oe(e, i) {
  for (var o = i + "Capture", s = []; e !== null; ) {
    var d = e, h = d.stateNode;
    d.tag === 5 && h !== null && (d = h, h = Kb(e, o), h != null && s.unshift(tf(e, h, d)), h = Kb(e, i), h != null && s.push(tf(e, h, d))), e = e.return;
  }
  return s;
}
function vf(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function wf(e, i, o, s, d) {
  for (var h = i._reactName, _ = []; o !== null && o !== s; ) {
    var b = o, _e = b.alternate, et = b.stateNode;
    if (_e !== null && _e === s)
      break;
    b.tag === 5 && et !== null && (b = et, d ? (_e = Kb(o, h), _e != null && _.unshift(tf(o, _e, b))) : d || (_e = Kb(o, h), _e != null && _.push(tf(o, _e, b)))), o = o.return;
  }
  _.length !== 0 && e.push({ event: i, listeners: _ });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(e) {
  return (typeof e == "string" ? e : "" + e).replace(xf, `
`).replace(yf, "");
}
function Af(e, i, o) {
  if (i = zf(i), zf(e) !== i && o)
    throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(e, i) {
  return e === "textarea" || e === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
}
var Ff = typeof setTimeout == "function" ? setTimeout : void 0, Gf = typeof clearTimeout == "function" ? clearTimeout : void 0, Hf = typeof Promise == "function" ? Promise : void 0, Jf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hf < "u" ? function(e) {
  return Hf.resolve(null).then(e).catch(If);
} : Ff;
function If(e) {
  setTimeout(function() {
    throw e;
  });
}
function Kf(e, i) {
  var o = i, s = 0;
  do {
    var d = o.nextSibling;
    if (e.removeChild(o), d && d.nodeType === 8)
      if (o = d.data, o === "/$") {
        if (s === 0) {
          e.removeChild(d), bd(i);
          return;
        }
        s--;
      } else
        o !== "$" && o !== "$?" && o !== "$!" || s++;
    o = d;
  } while (o);
  bd(i);
}
function Lf(e) {
  for (; e != null; e = e.nextSibling) {
    var i = e.nodeType;
    if (i === 1 || i === 3)
      break;
    if (i === 8) {
      if (i = e.data, i === "$" || i === "$!" || i === "$?")
        break;
      if (i === "/$")
        return null;
    }
  }
  return e;
}
function Mf(e) {
  e = e.previousSibling;
  for (var i = 0; e; ) {
    if (e.nodeType === 8) {
      var o = e.data;
      if (o === "$" || o === "$!" || o === "$?") {
        if (i === 0)
          return e;
        i--;
      } else
        o === "/$" && i++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(e) {
  var i = e[Of];
  if (i)
    return i;
  for (var o = e.parentNode; o; ) {
    if (i = o[uf] || o[Of]) {
      if (o = i.alternate, i.child !== null || o !== null && o.child !== null)
        for (e = Mf(e); e !== null; ) {
          if (o = e[Of])
            return o;
          e = Mf(e);
        }
      return i;
    }
    e = o, o = e.parentNode;
  }
  return null;
}
function Cb(e) {
  return e = e[Of] || e[uf], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ue(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(p(33));
}
function Db(e) {
  return e[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(e) {
  return { current: e };
}
function E(e) {
  0 > Tf || (e.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(e, i) {
  Tf++, Sf[Tf] = e.current, e.current = i;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(!1), Xf = Vf;
function Yf(e, i) {
  var o = e.type.contextTypes;
  if (!o)
    return Vf;
  var s = e.stateNode;
  if (s && s.__reactInternalMemoizedUnmaskedChildContext === i)
    return s.__reactInternalMemoizedMaskedChildContext;
  var d = {}, h;
  for (h in o)
    d[h] = i[h];
  return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = d), d;
}
function Zf(e) {
  return e = e.childContextTypes, e != null;
}
function $f() {
  E(Wf), E(H);
}
function ag(e, i, o) {
  if (H.current !== Vf)
    throw Error(p(168));
  G(H, i), G(Wf, o);
}
function bg(e, i, o) {
  var s = e.stateNode;
  if (i = i.childContextTypes, typeof s.getChildContext != "function")
    return o;
  s = s.getChildContext();
  for (var d in s)
    if (!(d in i))
      throw Error(p(108, Ra(e) || "Unknown", d));
  return A({}, o, s);
}
function cg(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Vf, Xf = H.current, G(H, e), G(Wf, Wf.current), !0;
}
function dg(e, i, o) {
  var s = e.stateNode;
  if (!s)
    throw Error(p(169));
  o ? (e = bg(e, i, Xf), s.__reactInternalMemoizedMergedChildContext = e, E(Wf), E(H), G(H, e)) : E(Wf), G(Wf, o);
}
var eg = null, fg = !1, gg = !1;
function hg(e) {
  eg === null ? eg = [e] : eg.push(e);
}
function ig(e) {
  fg = !0, hg(e);
}
function jg() {
  if (!gg && eg !== null) {
    gg = !0;
    var e = 0, i = C;
    try {
      var o = eg;
      for (C = 1; e < o.length; e++) {
        var s = o[e];
        do
          s = s(!0);
        while (s !== null);
      }
      eg = null, fg = !1;
    } catch (d) {
      throw eg !== null && (eg = eg.slice(e + 1)), ac(fc, jg), d;
    } finally {
      C = i, gg = !1;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(e, i) {
  kg[lg++] = ng, kg[lg++] = mg, mg = e, ng = i;
}
function ug(e, i, o) {
  og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, qg = e;
  var s = rg;
  e = sg;
  var d = 32 - oc(s) - 1;
  s &= ~(1 << d), o += 1;
  var h = 32 - oc(i) + d;
  if (30 < h) {
    var _ = d - d % 5;
    h = (s & (1 << _) - 1).toString(32), s >>= _, d -= _, rg = 1 << 32 - oc(i) + d | o << d | s, sg = h + e;
  } else
    rg = 1 << h | o << d | s, sg = e;
}
function vg(e) {
  e.return !== null && (tg(e, 1), ug(e, 1, 0));
}
function wg(e) {
  for (; e === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; e === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = !1, zg = null;
function Ag(e, i) {
  var o = Bg(5, null, null, 0);
  o.elementType = "DELETED", o.stateNode = i, o.return = e, i = e.deletions, i === null ? (e.deletions = [o], e.flags |= 16) : i.push(o);
}
function Cg(e, i) {
  switch (e.tag) {
    case 5:
      var o = e.type;
      return i = i.nodeType !== 1 || o.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (e.stateNode = i, xg = e, yg = Lf(i.firstChild), !0) : !1;
    case 6:
      return i = e.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (e.stateNode = i, xg = e, yg = null, !0) : !1;
    case 13:
      return i = i.nodeType !== 8 ? null : i, i !== null ? (o = qg !== null ? { id: rg, overflow: sg } : null, e.memoizedState = { dehydrated: i, treeContext: o, retryLane: 1073741824 }, o = Bg(18, null, null, 0), o.stateNode = i, o.return = e, e.child = o, xg = e, yg = null, !0) : !1;
    default:
      return !1;
  }
}
function Dg(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Eg(e) {
  if (I) {
    var i = yg;
    if (i) {
      var o = i;
      if (!Cg(e, i)) {
        if (Dg(e))
          throw Error(p(418));
        i = Lf(o.nextSibling);
        var s = xg;
        i && Cg(e, i) ? Ag(s, o) : (e.flags = e.flags & -4097 | 2, I = !1, xg = e);
      }
    } else {
      if (Dg(e))
        throw Error(p(418));
      e.flags = e.flags & -4097 | 2, I = !1, xg = e;
    }
  }
}
function Fg(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  xg = e;
}
function Gg(e) {
  if (e !== xg)
    return !1;
  if (!I)
    return Fg(e), I = !0, !1;
  var i;
  if ((i = e.tag !== 3) && !(i = e.tag !== 5) && (i = e.type, i = i !== "head" && i !== "body" && !Ef(e.type, e.memoizedProps)), i && (i = yg)) {
    if (Dg(e))
      throw Hg(), Error(p(418));
    for (; i; )
      Ag(e, i), i = Lf(i.nextSibling);
  }
  if (Fg(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(p(317));
    e: {
      for (e = e.nextSibling, i = 0; e; ) {
        if (e.nodeType === 8) {
          var o = e.data;
          if (o === "/$") {
            if (i === 0) {
              yg = Lf(e.nextSibling);
              break e;
            }
            i--;
          } else
            o !== "$" && o !== "$!" && o !== "$?" || i++;
        }
        e = e.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(e.stateNode.nextSibling) : null;
  return !0;
}
function Hg() {
  for (var e = yg; e; )
    e = Lf(e.nextSibling);
}
function Ig() {
  yg = xg = null, I = !1;
}
function Jg(e) {
  zg === null ? zg = [e] : zg.push(e);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(e, i) {
  if (e && e.defaultProps) {
    i = A({}, i), e = e.defaultProps;
    for (var o in e)
      i[o] === void 0 && (i[o] = e[o]);
    return i;
  }
  return i;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(e) {
  var i = Mg.current;
  E(Mg), e._currentValue = i;
}
function Sg(e, i, o) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & i) !== i ? (e.childLanes |= i, s !== null && (s.childLanes |= i)) : s !== null && (s.childLanes & i) !== i && (s.childLanes |= i), e === o)
      break;
    e = e.return;
  }
}
function Tg(e, i) {
  Ng = e, Pg = Og = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & i && (Ug = !0), e.firstContext = null);
}
function Vg(e) {
  var i = e._currentValue;
  if (Pg !== e)
    if (e = { context: e, memoizedValue: i, next: null }, Og === null) {
      if (Ng === null)
        throw Error(p(308));
      Og = e, Ng.dependencies = { lanes: 0, firstContext: e };
    } else
      Og = Og.next = e;
  return i;
}
var Wg = null;
function Xg(e) {
  Wg === null ? Wg = [e] : Wg.push(e);
}
function Yg(e, i, o, s) {
  var d = i.interleaved;
  return d === null ? (o.next = o, Xg(i)) : (o.next = d.next, d.next = o), i.interleaved = o, Zg(e, s);
}
function Zg(e, i) {
  e.lanes |= i;
  var o = e.alternate;
  for (o !== null && (o.lanes |= i), o = e, e = e.return; e !== null; )
    e.childLanes |= i, o = e.alternate, o !== null && (o.childLanes |= i), o = e, e = e.return;
  return o.tag === 3 ? o.stateNode : null;
}
var $g = !1;
function ah(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(e, i) {
  e = e.updateQueue, i.updateQueue === e && (i.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function ch(e, i) {
  return { eventTime: e, lane: i, tag: 0, payload: null, callback: null, next: null };
}
function dh(e, i, o) {
  var s = e.updateQueue;
  if (s === null)
    return null;
  if (s = s.shared, K & 2) {
    var d = s.pending;
    return d === null ? i.next = i : (i.next = d.next, d.next = i), s.pending = i, Zg(e, o);
  }
  return d = s.interleaved, d === null ? (i.next = i, Xg(s)) : (i.next = d.next, d.next = i), s.interleaved = i, Zg(e, o);
}
function eh(e, i, o) {
  if (i = i.updateQueue, i !== null && (i = i.shared, (o & 4194240) !== 0)) {
    var s = i.lanes;
    s &= e.pendingLanes, o |= s, i.lanes = o, Cc(e, o);
  }
}
function fh(e, i) {
  var o = e.updateQueue, s = e.alternate;
  if (s !== null && (s = s.updateQueue, o === s)) {
    var d = null, h = null;
    if (o = o.firstBaseUpdate, o !== null) {
      do {
        var _ = { eventTime: o.eventTime, lane: o.lane, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
        h === null ? d = h = _ : h = h.next = _, o = o.next;
      } while (o !== null);
      h === null ? d = h = i : h = h.next = i;
    } else
      d = h = i;
    o = { baseState: s.baseState, firstBaseUpdate: d, lastBaseUpdate: h, shared: s.shared, effects: s.effects }, e.updateQueue = o;
    return;
  }
  e = o.lastBaseUpdate, e === null ? o.firstBaseUpdate = i : e.next = i, o.lastBaseUpdate = i;
}
function gh(e, i, o, s) {
  var d = e.updateQueue;
  $g = !1;
  var h = d.firstBaseUpdate, _ = d.lastBaseUpdate, b = d.shared.pending;
  if (b !== null) {
    d.shared.pending = null;
    var _e = b, et = _e.next;
    _e.next = null, _ === null ? h = et : _.next = et, _ = _e;
    var ut = e.alternate;
    ut !== null && (ut = ut.updateQueue, b = ut.lastBaseUpdate, b !== _ && (b === null ? ut.firstBaseUpdate = et : b.next = et, ut.lastBaseUpdate = _e));
  }
  if (h !== null) {
    var st = d.baseState;
    _ = 0, ut = et = _e = null, b = h;
    do {
      var ct = b.lane, mt = b.eventTime;
      if ((s & ct) === ct) {
        ut !== null && (ut = ut.next = {
          eventTime: mt,
          lane: 0,
          tag: b.tag,
          payload: b.payload,
          callback: b.callback,
          next: null
        });
        e: {
          var pt = e, vt = b;
          switch (ct = i, mt = o, vt.tag) {
            case 1:
              if (pt = vt.payload, typeof pt == "function") {
                st = pt.call(mt, st, ct);
                break e;
              }
              st = pt;
              break e;
            case 3:
              pt.flags = pt.flags & -65537 | 128;
            case 0:
              if (pt = vt.payload, ct = typeof pt == "function" ? pt.call(mt, st, ct) : pt, ct == null)
                break e;
              st = A({}, st, ct);
              break e;
            case 2:
              $g = !0;
          }
        }
        b.callback !== null && b.lane !== 0 && (e.flags |= 64, ct = d.effects, ct === null ? d.effects = [b] : ct.push(b));
      } else
        mt = { eventTime: mt, lane: ct, tag: b.tag, payload: b.payload, callback: b.callback, next: null }, ut === null ? (et = ut = mt, _e = st) : ut = ut.next = mt, _ |= ct;
      if (b = b.next, b === null) {
        if (b = d.shared.pending, b === null)
          break;
        ct = b, b = ct.next, ct.next = null, d.lastBaseUpdate = ct, d.shared.pending = null;
      }
    } while (1);
    if (ut === null && (_e = st), d.baseState = _e, d.firstBaseUpdate = et, d.lastBaseUpdate = ut, i = d.shared.interleaved, i !== null) {
      d = i;
      do
        _ |= d.lane, d = d.next;
      while (d !== i);
    } else
      h === null && (d.shared.lanes = 0);
    hh |= _, e.lanes = _, e.memoizedState = st;
  }
}
function ih(e, i, o) {
  if (e = i.effects, i.effects = null, e !== null)
    for (i = 0; i < e.length; i++) {
      var s = e[i], d = s.callback;
      if (d !== null) {
        if (s.callback = null, s = o, typeof d != "function")
          throw Error(p(191, d));
        d.call(s);
      }
    }
}
var jh = new aa.Component().refs;
function kh(e, i, o, s) {
  i = e.memoizedState, o = o(s, i), o = o == null ? i : A({}, i, o), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
}
var nh = { isMounted: function(e) {
  return (e = e._reactInternals) ? Vb(e) === e : !1;
}, enqueueSetState: function(e, i, o) {
  e = e._reactInternals;
  var s = L(), d = lh(e), h = ch(s, d);
  h.payload = i, o != null && (h.callback = o), i = dh(e, h, d), i !== null && (mh(i, e, d, s), eh(i, e, d));
}, enqueueReplaceState: function(e, i, o) {
  e = e._reactInternals;
  var s = L(), d = lh(e), h = ch(s, d);
  h.tag = 1, h.payload = i, o != null && (h.callback = o), i = dh(e, h, d), i !== null && (mh(i, e, d, s), eh(i, e, d));
}, enqueueForceUpdate: function(e, i) {
  e = e._reactInternals;
  var o = L(), s = lh(e), d = ch(o, s);
  d.tag = 2, i != null && (d.callback = i), i = dh(e, d, s), i !== null && (mh(i, e, s, o), eh(i, e, s));
} };
function oh(e, i, o, s, d, h, _) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, h, _) : i.prototype && i.prototype.isPureReactComponent ? !Ie(o, s) || !Ie(d, h) : !0;
}
function ph(e, i, o) {
  var s = !1, d = Vf, h = i.contextType;
  return typeof h == "object" && h !== null ? h = Vg(h) : (d = Zf(i) ? Xf : H.current, s = i.contextTypes, h = (s = s != null) ? Yf(e, d) : Vf), i = new i(o, h), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = nh, e.stateNode = i, i._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = d, e.__reactInternalMemoizedMaskedChildContext = h), i;
}
function qh(e, i, o, s) {
  e = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(o, s), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(o, s), i.state !== e && nh.enqueueReplaceState(i, i.state, null);
}
function rh(e, i, o, s) {
  var d = e.stateNode;
  d.props = o, d.state = e.memoizedState, d.refs = jh, ah(e);
  var h = i.contextType;
  typeof h == "object" && h !== null ? d.context = Vg(h) : (h = Zf(i) ? Xf : H.current, d.context = Yf(e, h)), d.state = e.memoizedState, h = i.getDerivedStateFromProps, typeof h == "function" && (kh(e, i, h, o), d.state = e.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (i = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), i !== d.state && nh.enqueueReplaceState(d, d.state, null), gh(e, o, d, s), d.state = e.memoizedState), typeof d.componentDidMount == "function" && (e.flags |= 4194308);
}
function sh(e, i, o) {
  if (e = o.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (o._owner) {
      if (o = o._owner, o) {
        if (o.tag !== 1)
          throw Error(p(309));
        var s = o.stateNode;
      }
      if (!s)
        throw Error(p(147, e));
      var d = s, h = "" + e;
      return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === h ? i.ref : (i = function(_) {
        var b = d.refs;
        b === jh && (b = d.refs = {}), _ === null ? delete b[h] : b[h] = _;
      }, i._stringRef = h, i);
    }
    if (typeof e != "string")
      throw Error(p(284));
    if (!o._owner)
      throw Error(p(290, e));
  }
  return e;
}
function th(e, i) {
  throw e = Object.prototype.toString.call(i), Error(p(31, e === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : e));
}
function uh(e) {
  var i = e._init;
  return i(e._payload);
}
function vh(e) {
  function i(nt, ot) {
    if (e) {
      var it = nt.deletions;
      it === null ? (nt.deletions = [ot], nt.flags |= 16) : it.push(ot);
    }
  }
  function o(nt, ot) {
    if (!e)
      return null;
    for (; ot !== null; )
      i(nt, ot), ot = ot.sibling;
    return null;
  }
  function s(nt, ot) {
    for (nt = /* @__PURE__ */ new Map(); ot !== null; )
      ot.key !== null ? nt.set(ot.key, ot) : nt.set(ot.index, ot), ot = ot.sibling;
    return nt;
  }
  function d(nt, ot) {
    return nt = wh(nt, ot), nt.index = 0, nt.sibling = null, nt;
  }
  function h(nt, ot, it) {
    return nt.index = it, e ? (it = nt.alternate, it !== null ? (it = it.index, it < ot ? (nt.flags |= 2, ot) : it) : (nt.flags |= 2, ot)) : (nt.flags |= 1048576, ot);
  }
  function _(nt) {
    return e && nt.alternate === null && (nt.flags |= 2), nt;
  }
  function b(nt, ot, it, at) {
    return ot === null || ot.tag !== 6 ? (ot = xh(it, nt.mode, at), ot.return = nt, ot) : (ot = d(ot, it), ot.return = nt, ot);
  }
  function _e(nt, ot, it, at) {
    var St = it.type;
    return St === ya ? ut(nt, ot, it.props.children, at, it.key) : ot !== null && (ot.elementType === St || typeof St == "object" && St !== null && St.$$typeof === Ha && uh(St) === ot.type) ? (at = d(ot, it.props), at.ref = sh(nt, ot, it), at.return = nt, at) : (at = yh(it.type, it.key, it.props, null, nt.mode, at), at.ref = sh(nt, ot, it), at.return = nt, at);
  }
  function et(nt, ot, it, at) {
    return ot === null || ot.tag !== 4 || ot.stateNode.containerInfo !== it.containerInfo || ot.stateNode.implementation !== it.implementation ? (ot = zh(it, nt.mode, at), ot.return = nt, ot) : (ot = d(ot, it.children || []), ot.return = nt, ot);
  }
  function ut(nt, ot, it, at, St) {
    return ot === null || ot.tag !== 7 ? (ot = Ah(it, nt.mode, at, St), ot.return = nt, ot) : (ot = d(ot, it), ot.return = nt, ot);
  }
  function st(nt, ot, it) {
    if (typeof ot == "string" && ot !== "" || typeof ot == "number")
      return ot = xh("" + ot, nt.mode, it), ot.return = nt, ot;
    if (typeof ot == "object" && ot !== null) {
      switch (ot.$$typeof) {
        case va:
          return it = yh(ot.type, ot.key, ot.props, null, nt.mode, it), it.ref = sh(nt, null, ot), it.return = nt, it;
        case wa:
          return ot = zh(ot, nt.mode, it), ot.return = nt, ot;
        case Ha:
          var at = ot._init;
          return st(nt, at(ot._payload), it);
      }
      if (eb(ot) || Ka(ot))
        return ot = Ah(ot, nt.mode, it, null), ot.return = nt, ot;
      th(nt, ot);
    }
    return null;
  }
  function ct(nt, ot, it, at) {
    var St = ot !== null ? ot.key : null;
    if (typeof it == "string" && it !== "" || typeof it == "number")
      return St !== null ? null : b(nt, ot, "" + it, at);
    if (typeof it == "object" && it !== null) {
      switch (it.$$typeof) {
        case va:
          return it.key === St ? _e(nt, ot, it, at) : null;
        case wa:
          return it.key === St ? et(nt, ot, it, at) : null;
        case Ha:
          return St = it._init, ct(
            nt,
            ot,
            St(it._payload),
            at
          );
      }
      if (eb(it) || Ka(it))
        return St !== null ? null : ut(nt, ot, it, at, null);
      th(nt, it);
    }
    return null;
  }
  function mt(nt, ot, it, at, St) {
    if (typeof at == "string" && at !== "" || typeof at == "number")
      return nt = nt.get(it) || null, b(ot, nt, "" + at, St);
    if (typeof at == "object" && at !== null) {
      switch (at.$$typeof) {
        case va:
          return nt = nt.get(at.key === null ? it : at.key) || null, _e(ot, nt, at, St);
        case wa:
          return nt = nt.get(at.key === null ? it : at.key) || null, et(ot, nt, at, St);
        case Ha:
          var _t = at._init;
          return mt(nt, ot, it, _t(at._payload), St);
      }
      if (eb(at) || Ka(at))
        return nt = nt.get(it) || null, ut(ot, nt, at, St, null);
      th(ot, at);
    }
    return null;
  }
  function pt(nt, ot, it, at) {
    for (var St = null, _t = null, xt = ot, Tt = ot = 0, Lt = null; xt !== null && Tt < it.length; Tt++) {
      xt.index > Tt ? (Lt = xt, xt = null) : Lt = xt.sibling;
      var $t = ct(nt, xt, it[Tt], at);
      if ($t === null) {
        xt === null && (xt = Lt);
        break;
      }
      e && xt && $t.alternate === null && i(nt, xt), ot = h($t, ot, Tt), _t === null ? St = $t : _t.sibling = $t, _t = $t, xt = Lt;
    }
    if (Tt === it.length)
      return o(nt, xt), I && tg(nt, Tt), St;
    if (xt === null) {
      for (; Tt < it.length; Tt++)
        xt = st(nt, it[Tt], at), xt !== null && (ot = h(xt, ot, Tt), _t === null ? St = xt : _t.sibling = xt, _t = xt);
      return I && tg(nt, Tt), St;
    }
    for (xt = s(nt, xt); Tt < it.length; Tt++)
      Lt = mt(xt, nt, Tt, it[Tt], at), Lt !== null && (e && Lt.alternate !== null && xt.delete(Lt.key === null ? Tt : Lt.key), ot = h(Lt, ot, Tt), _t === null ? St = Lt : _t.sibling = Lt, _t = Lt);
    return e && xt.forEach(function(Ft) {
      return i(nt, Ft);
    }), I && tg(nt, Tt), St;
  }
  function vt(nt, ot, it, at) {
    var St = Ka(it);
    if (typeof St != "function")
      throw Error(p(150));
    if (it = St.call(it), it == null)
      throw Error(p(151));
    for (var _t = St = null, xt = ot, Tt = ot = 0, Lt = null, $t = it.next(); xt !== null && !$t.done; Tt++, $t = it.next()) {
      xt.index > Tt ? (Lt = xt, xt = null) : Lt = xt.sibling;
      var Ft = ct(nt, xt, $t.value, at);
      if (Ft === null) {
        xt === null && (xt = Lt);
        break;
      }
      e && xt && Ft.alternate === null && i(nt, xt), ot = h(Ft, ot, Tt), _t === null ? St = Ft : _t.sibling = Ft, _t = Ft, xt = Lt;
    }
    if ($t.done)
      return o(
        nt,
        xt
      ), I && tg(nt, Tt), St;
    if (xt === null) {
      for (; !$t.done; Tt++, $t = it.next())
        $t = st(nt, $t.value, at), $t !== null && (ot = h($t, ot, Tt), _t === null ? St = $t : _t.sibling = $t, _t = $t);
      return I && tg(nt, Tt), St;
    }
    for (xt = s(nt, xt); !$t.done; Tt++, $t = it.next())
      $t = mt(xt, nt, Tt, $t.value, at), $t !== null && (e && $t.alternate !== null && xt.delete($t.key === null ? Tt : $t.key), ot = h($t, ot, Tt), _t === null ? St = $t : _t.sibling = $t, _t = $t);
    return e && xt.forEach(function(nn) {
      return i(nt, nn);
    }), I && tg(nt, Tt), St;
  }
  function ht(nt, ot, it, at) {
    if (typeof it == "object" && it !== null && it.type === ya && it.key === null && (it = it.props.children), typeof it == "object" && it !== null) {
      switch (it.$$typeof) {
        case va:
          e: {
            for (var St = it.key, _t = ot; _t !== null; ) {
              if (_t.key === St) {
                if (St = it.type, St === ya) {
                  if (_t.tag === 7) {
                    o(nt, _t.sibling), ot = d(_t, it.props.children), ot.return = nt, nt = ot;
                    break e;
                  }
                } else if (_t.elementType === St || typeof St == "object" && St !== null && St.$$typeof === Ha && uh(St) === _t.type) {
                  o(nt, _t.sibling), ot = d(_t, it.props), ot.ref = sh(nt, _t, it), ot.return = nt, nt = ot;
                  break e;
                }
                o(nt, _t);
                break;
              } else
                i(nt, _t);
              _t = _t.sibling;
            }
            it.type === ya ? (ot = Ah(it.props.children, nt.mode, at, it.key), ot.return = nt, nt = ot) : (at = yh(it.type, it.key, it.props, null, nt.mode, at), at.ref = sh(nt, ot, it), at.return = nt, nt = at);
          }
          return _(nt);
        case wa:
          e: {
            for (_t = it.key; ot !== null; ) {
              if (ot.key === _t)
                if (ot.tag === 4 && ot.stateNode.containerInfo === it.containerInfo && ot.stateNode.implementation === it.implementation) {
                  o(nt, ot.sibling), ot = d(ot, it.children || []), ot.return = nt, nt = ot;
                  break e;
                } else {
                  o(nt, ot);
                  break;
                }
              else
                i(nt, ot);
              ot = ot.sibling;
            }
            ot = zh(it, nt.mode, at), ot.return = nt, nt = ot;
          }
          return _(nt);
        case Ha:
          return _t = it._init, ht(nt, ot, _t(it._payload), at);
      }
      if (eb(it))
        return pt(nt, ot, it, at);
      if (Ka(it))
        return vt(nt, ot, it, at);
      th(nt, it);
    }
    return typeof it == "string" && it !== "" || typeof it == "number" ? (it = "" + it, ot !== null && ot.tag === 6 ? (o(nt, ot.sibling), ot = d(ot, it), ot.return = nt, nt = ot) : (o(nt, ot), ot = xh(it, nt.mode, at), ot.return = nt, nt = ot), _(nt)) : o(nt, ot);
  }
  return ht;
}
var Bh = vh(!0), Ch = vh(!1), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(e) {
  if (e === Dh)
    throw Error(p(174));
  return e;
}
function Ih(e, i) {
  switch (G(Gh, i), G(Fh, e), G(Eh, Dh), e = i.nodeType, e) {
    case 9:
    case 11:
      i = (i = i.documentElement) ? i.namespaceURI : lb(null, "");
      break;
    default:
      e = e === 8 ? i.parentNode : i, i = e.namespaceURI || null, e = e.tagName, i = lb(i, e);
  }
  E(Eh), G(Eh, i);
}
function Jh() {
  E(Eh), E(Fh), E(Gh);
}
function Kh(e) {
  Hh(Gh.current);
  var i = Hh(Eh.current), o = lb(i, e.type);
  i !== o && (G(Fh, e), G(Eh, o));
}
function Lh(e) {
  Fh.current === e && (E(Eh), E(Fh));
}
var M = Uf(0);
function Mh(e) {
  for (var i = e; i !== null; ) {
    if (i.tag === 13) {
      var o = i.memoizedState;
      if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || o.data === "$!"))
        return i;
    } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
      if (i.flags & 128)
        return i;
    } else if (i.child !== null) {
      i.child.return = i, i = i.child;
      continue;
    }
    if (i === e)
      break;
    for (; i.sibling === null; ) {
      if (i.return === null || i.return === e)
        return null;
      i = i.return;
    }
    i.sibling.return = i.return, i = i.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var e = 0; e < Nh.length; e++)
    Nh[e]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N = null, O = null, P = null, Sh = !1, Th = !1, Uh = 0, Vh = 0;
function Q() {
  throw Error(p(321));
}
function Wh(e, i) {
  if (i === null)
    return !1;
  for (var o = 0; o < i.length && o < e.length; o++)
    if (!He(e[o], i[o]))
      return !1;
  return !0;
}
function Xh(e, i, o, s, d, h) {
  if (Rh = h, N = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, Ph.current = e === null || e.memoizedState === null ? Yh : Zh, e = o(s, d), Th) {
    h = 0;
    do {
      if (Th = !1, Uh = 0, 25 <= h)
        throw Error(p(301));
      h += 1, P = O = null, i.updateQueue = null, Ph.current = $h, e = o(s, d);
    } while (Th);
  }
  if (Ph.current = ai, i = O !== null && O.next !== null, Rh = 0, P = O = N = null, Sh = !1, i)
    throw Error(p(300));
  return e;
}
function bi() {
  var e = Uh !== 0;
  return Uh = 0, e;
}
function ci() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return P === null ? N.memoizedState = P = e : P = P.next = e, P;
}
function di() {
  if (O === null) {
    var e = N.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = O.next;
  var i = P === null ? N.memoizedState : P.next;
  if (i !== null)
    P = i, O = e;
  else {
    if (e === null)
      throw Error(p(310));
    O = e, e = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null }, P === null ? N.memoizedState = P = e : P = P.next = e;
  }
  return P;
}
function ei(e, i) {
  return typeof i == "function" ? i(e) : i;
}
function fi(e) {
  var i = di(), o = i.queue;
  if (o === null)
    throw Error(p(311));
  o.lastRenderedReducer = e;
  var s = O, d = s.baseQueue, h = o.pending;
  if (h !== null) {
    if (d !== null) {
      var _ = d.next;
      d.next = h.next, h.next = _;
    }
    s.baseQueue = d = h, o.pending = null;
  }
  if (d !== null) {
    h = d.next, s = s.baseState;
    var b = _ = null, _e = null, et = h;
    do {
      var ut = et.lane;
      if ((Rh & ut) === ut)
        _e !== null && (_e = _e.next = { lane: 0, action: et.action, hasEagerState: et.hasEagerState, eagerState: et.eagerState, next: null }), s = et.hasEagerState ? et.eagerState : e(s, et.action);
      else {
        var st = {
          lane: ut,
          action: et.action,
          hasEagerState: et.hasEagerState,
          eagerState: et.eagerState,
          next: null
        };
        _e === null ? (b = _e = st, _ = s) : _e = _e.next = st, N.lanes |= ut, hh |= ut;
      }
      et = et.next;
    } while (et !== null && et !== h);
    _e === null ? _ = s : _e.next = b, He(s, i.memoizedState) || (Ug = !0), i.memoizedState = s, i.baseState = _, i.baseQueue = _e, o.lastRenderedState = s;
  }
  if (e = o.interleaved, e !== null) {
    d = e;
    do
      h = d.lane, N.lanes |= h, hh |= h, d = d.next;
    while (d !== e);
  } else
    d === null && (o.lanes = 0);
  return [i.memoizedState, o.dispatch];
}
function gi(e) {
  var i = di(), o = i.queue;
  if (o === null)
    throw Error(p(311));
  o.lastRenderedReducer = e;
  var s = o.dispatch, d = o.pending, h = i.memoizedState;
  if (d !== null) {
    o.pending = null;
    var _ = d = d.next;
    do
      h = e(h, _.action), _ = _.next;
    while (_ !== d);
    He(h, i.memoizedState) || (Ug = !0), i.memoizedState = h, i.baseQueue === null && (i.baseState = h), o.lastRenderedState = h;
  }
  return [h, s];
}
function hi() {
}
function ii(e, i) {
  var o = N, s = di(), d = i(), h = !He(s.memoizedState, d);
  if (h && (s.memoizedState = d, Ug = !0), s = s.queue, ji(ki.bind(null, o, s, e), [e]), s.getSnapshot !== i || h || P !== null && P.memoizedState.tag & 1) {
    if (o.flags |= 2048, li(9, mi.bind(null, o, s, d, i), void 0, null), R === null)
      throw Error(p(349));
    Rh & 30 || ni(o, i, d);
  }
  return d;
}
function ni(e, i, o) {
  e.flags |= 16384, e = { getSnapshot: i, value: o }, i = N.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, N.updateQueue = i, i.stores = [e]) : (o = i.stores, o === null ? i.stores = [e] : o.push(e));
}
function mi(e, i, o, s) {
  i.value = o, i.getSnapshot = s, oi(i) && pi(e);
}
function ki(e, i, o) {
  return o(function() {
    oi(i) && pi(e);
  });
}
function oi(e) {
  var i = e.getSnapshot;
  e = e.value;
  try {
    var o = i();
    return !He(e, o);
  } catch {
    return !0;
  }
}
function pi(e) {
  var i = Zg(e, 1);
  i !== null && mh(i, e, 1, -1);
}
function qi(e) {
  var i = ci();
  return typeof e == "function" && (e = e()), i.memoizedState = i.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: e }, i.queue = e, e = e.dispatch = ri.bind(null, N, e), [i.memoizedState, e];
}
function li(e, i, o, s) {
  return e = { tag: e, create: i, destroy: o, deps: s, next: null }, i = N.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, N.updateQueue = i, i.lastEffect = e.next = e) : (o = i.lastEffect, o === null ? i.lastEffect = e.next = e : (s = o.next, o.next = e, e.next = s, i.lastEffect = e)), e;
}
function si() {
  return di().memoizedState;
}
function ti(e, i, o, s) {
  var d = ci();
  N.flags |= e, d.memoizedState = li(1 | i, o, void 0, s === void 0 ? null : s);
}
function ui(e, i, o, s) {
  var d = di();
  s = s === void 0 ? null : s;
  var h = void 0;
  if (O !== null) {
    var _ = O.memoizedState;
    if (h = _.destroy, s !== null && Wh(s, _.deps)) {
      d.memoizedState = li(i, o, h, s);
      return;
    }
  }
  N.flags |= e, d.memoizedState = li(1 | i, o, h, s);
}
function vi(e, i) {
  return ti(8390656, 8, e, i);
}
function ji(e, i) {
  return ui(2048, 8, e, i);
}
function wi(e, i) {
  return ui(4, 2, e, i);
}
function xi(e, i) {
  return ui(4, 4, e, i);
}
function yi(e, i) {
  if (typeof i == "function")
    return e = e(), i(e), function() {
      i(null);
    };
  if (i != null)
    return e = e(), i.current = e, function() {
      i.current = null;
    };
}
function zi(e, i, o) {
  return o = o != null ? o.concat([e]) : null, ui(4, 4, yi.bind(null, i, e), o);
}
function Ai() {
}
function Bi(e, i) {
  var o = di();
  i = i === void 0 ? null : i;
  var s = o.memoizedState;
  return s !== null && i !== null && Wh(i, s[1]) ? s[0] : (o.memoizedState = [e, i], e);
}
function Ci(e, i) {
  var o = di();
  i = i === void 0 ? null : i;
  var s = o.memoizedState;
  return s !== null && i !== null && Wh(i, s[1]) ? s[0] : (e = e(), o.memoizedState = [e, i], e);
}
function Di(e, i, o) {
  return Rh & 21 ? (He(o, i) || (o = yc(), N.lanes |= o, hh |= o, e.baseState = !0), i) : (e.baseState && (e.baseState = !1, Ug = !0), e.memoizedState = o);
}
function Ei(e, i) {
  var o = C;
  C = o !== 0 && 4 > o ? o : 4, e(!0);
  var s = Qh.transition;
  Qh.transition = {};
  try {
    e(!1), i();
  } finally {
    C = o, Qh.transition = s;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(e, i, o) {
  var s = lh(e);
  if (o = { lane: s, action: o, hasEagerState: !1, eagerState: null, next: null }, Hi(e))
    Ii(i, o);
  else if (o = Yg(e, i, o, s), o !== null) {
    var d = L();
    mh(o, e, s, d), Ji(o, i, s);
  }
}
function ri(e, i, o) {
  var s = lh(e), d = { lane: s, action: o, hasEagerState: !1, eagerState: null, next: null };
  if (Hi(e))
    Ii(i, d);
  else {
    var h = e.alternate;
    if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = i.lastRenderedReducer, h !== null))
      try {
        var _ = i.lastRenderedState, b = h(_, o);
        if (d.hasEagerState = !0, d.eagerState = b, He(b, _)) {
          var _e = i.interleaved;
          _e === null ? (d.next = d, Xg(i)) : (d.next = _e.next, _e.next = d), i.interleaved = d;
          return;
        }
      } catch {
      } finally {
      }
    o = Yg(e, i, d, s), o !== null && (d = L(), mh(o, e, s, d), Ji(o, i, s));
  }
}
function Hi(e) {
  var i = e.alternate;
  return e === N || i !== null && i === N;
}
function Ii(e, i) {
  Th = Sh = !0;
  var o = e.pending;
  o === null ? i.next = i : (i.next = o.next, o.next = i), e.pending = i;
}
function Ji(e, i, o) {
  if (o & 4194240) {
    var s = i.lanes;
    s &= e.pendingLanes, o |= s, i.lanes = o, Cc(e, o);
  }
}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: !1 }, Yh = { readContext: Vg, useCallback: function(e, i) {
  return ci().memoizedState = [e, i === void 0 ? null : i], e;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(e, i, o) {
  return o = o != null ? o.concat([e]) : null, ti(
    4194308,
    4,
    yi.bind(null, i, e),
    o
  );
}, useLayoutEffect: function(e, i) {
  return ti(4194308, 4, e, i);
}, useInsertionEffect: function(e, i) {
  return ti(4, 2, e, i);
}, useMemo: function(e, i) {
  var o = ci();
  return i = i === void 0 ? null : i, e = e(), o.memoizedState = [e, i], e;
}, useReducer: function(e, i, o) {
  var s = ci();
  return i = o !== void 0 ? o(i) : i, s.memoizedState = s.baseState = i, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: i }, s.queue = e, e = e.dispatch = Gi.bind(null, N, e), [s.memoizedState, e];
}, useRef: function(e) {
  var i = ci();
  return e = { current: e }, i.memoizedState = e;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(e) {
  return ci().memoizedState = e;
}, useTransition: function() {
  var e = qi(!1), i = e[0];
  return e = Ei.bind(null, e[1]), ci().memoizedState = e, [i, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, i, o) {
  var s = N, d = ci();
  if (I) {
    if (o === void 0)
      throw Error(p(407));
    o = o();
  } else {
    if (o = i(), R === null)
      throw Error(p(349));
    Rh & 30 || ni(s, i, o);
  }
  d.memoizedState = o;
  var h = { value: o, getSnapshot: i };
  return d.queue = h, vi(ki.bind(
    null,
    s,
    h,
    e
  ), [e]), s.flags |= 2048, li(9, mi.bind(null, s, h, o, i), void 0, null), o;
}, useId: function() {
  var e = ci(), i = R.identifierPrefix;
  if (I) {
    var o = sg, s = rg;
    o = (s & ~(1 << 32 - oc(s) - 1)).toString(32) + o, i = ":" + i + "R" + o, o = Uh++, 0 < o && (i += "H" + o.toString(32)), i += ":";
  } else
    o = Vh++, i = ":" + i + "r" + o.toString(32) + ":";
  return e.memoizedState = i;
}, unstable_isNewReconciler: !1 }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(e) {
    var i = di();
    return Di(i, O.memoizedState, e);
  },
  useTransition: function() {
    var e = fi(ei)[0], i = di().memoizedState;
    return [e, i];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: !1
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(e) {
  var i = di();
  return O === null ? i.memoizedState = e : Di(i, O.memoizedState, e);
}, useTransition: function() {
  var e = gi(ei)[0], i = di().memoizedState;
  return [e, i];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: !1 };
function Ki(e, i) {
  try {
    var o = "", s = i;
    do
      o += Pa(s), s = s.return;
    while (s);
    var d = o;
  } catch (h) {
    d = `
Error generating stack: ` + h.message + `
` + h.stack;
  }
  return { value: e, source: i, stack: d, digest: null };
}
function Li(e, i, o) {
  return { value: e, source: null, stack: o ?? null, digest: i ?? null };
}
function Mi(e, i) {
  try {
    console.error(i.value);
  } catch (o) {
    setTimeout(function() {
      throw o;
    });
  }
}
var Ni = typeof WeakMap == "function" ? WeakMap : Map;
function Oi(e, i, o) {
  o = ch(-1, o), o.tag = 3, o.payload = { element: null };
  var s = i.value;
  return o.callback = function() {
    Pi || (Pi = !0, Qi = s), Mi(e, i);
  }, o;
}
function Ri(e, i, o) {
  o = ch(-1, o), o.tag = 3;
  var s = e.type.getDerivedStateFromError;
  if (typeof s == "function") {
    var d = i.value;
    o.payload = function() {
      return s(d);
    }, o.callback = function() {
      Mi(e, i);
    };
  }
  var h = e.stateNode;
  return h !== null && typeof h.componentDidCatch == "function" && (o.callback = function() {
    Mi(e, i), typeof s != "function" && (Si === null ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var _ = i.stack;
    this.componentDidCatch(i.value, { componentStack: _ !== null ? _ : "" });
  }), o;
}
function Ti(e, i, o) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new Ni();
    var d = /* @__PURE__ */ new Set();
    s.set(i, d);
  } else
    d = s.get(i), d === void 0 && (d = /* @__PURE__ */ new Set(), s.set(i, d));
  d.has(o) || (d.add(o), e = Ui.bind(null, e, i, o), i.then(e, e));
}
function Vi(e) {
  do {
    var i;
    if ((i = e.tag === 13) && (i = e.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Wi(e, i, o, s, d) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = d, e) : (e === i ? e.flags |= 65536 : (e.flags |= 128, o.flags |= 131072, o.flags &= -52805, o.tag === 1 && (o.alternate === null ? o.tag = 17 : (i = ch(-1, 1), i.tag = 2, dh(o, i, 1))), o.lanes |= 1), e);
}
var Xi = ua.ReactCurrentOwner, Ug = !1;
function Yi(e, i, o, s) {
  i.child = e === null ? Ch(i, null, o, s) : Bh(i, e.child, o, s);
}
function Zi(e, i, o, s, d) {
  o = o.render;
  var h = i.ref;
  return Tg(i, d), s = Xh(e, i, o, s, h, d), o = bi(), e !== null && !Ug ? (i.updateQueue = e.updateQueue, i.flags &= -2053, e.lanes &= ~d, $i(e, i, d)) : (I && o && vg(i), i.flags |= 1, Yi(e, i, s, d), i.child);
}
function aj(e, i, o, s, d) {
  if (e === null) {
    var h = o.type;
    return typeof h == "function" && !bj(h) && h.defaultProps === void 0 && o.compare === null && o.defaultProps === void 0 ? (i.tag = 15, i.type = h, cj(e, i, h, s, d)) : (e = yh(o.type, null, s, i, i.mode, d), e.ref = i.ref, e.return = i, i.child = e);
  }
  if (h = e.child, !(e.lanes & d)) {
    var _ = h.memoizedProps;
    if (o = o.compare, o = o !== null ? o : Ie, o(_, s) && e.ref === i.ref)
      return $i(e, i, d);
  }
  return i.flags |= 1, e = wh(h, s), e.ref = i.ref, e.return = i, i.child = e;
}
function cj(e, i, o, s, d) {
  if (e !== null) {
    var h = e.memoizedProps;
    if (Ie(h, s) && e.ref === i.ref)
      if (Ug = !1, i.pendingProps = s = h, (e.lanes & d) !== 0)
        e.flags & 131072 && (Ug = !0);
      else
        return i.lanes = e.lanes, $i(e, i, d);
  }
  return dj(e, i, o, s, d);
}
function ej(e, i, o) {
  var s = i.pendingProps, d = s.children, h = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden")
    if (!(i.mode & 1))
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= o;
    else {
      if (!(o & 1073741824))
        return e = h !== null ? h.baseLanes | o : o, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, i.updateQueue = null, G(fj, gj), gj |= e, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = h !== null ? h.baseLanes : o, G(fj, gj), gj |= s;
    }
  else
    h !== null ? (s = h.baseLanes | o, i.memoizedState = null) : s = o, G(fj, gj), gj |= s;
  return Yi(e, i, d, o), i.child;
}
function hj(e, i) {
  var o = i.ref;
  (e === null && o !== null || e !== null && e.ref !== o) && (i.flags |= 512, i.flags |= 2097152);
}
function dj(e, i, o, s, d) {
  var h = Zf(o) ? Xf : H.current;
  return h = Yf(i, h), Tg(i, d), o = Xh(e, i, o, s, h, d), s = bi(), e !== null && !Ug ? (i.updateQueue = e.updateQueue, i.flags &= -2053, e.lanes &= ~d, $i(e, i, d)) : (I && s && vg(i), i.flags |= 1, Yi(e, i, o, d), i.child);
}
function ij(e, i, o, s, d) {
  if (Zf(o)) {
    var h = !0;
    cg(i);
  } else
    h = !1;
  if (Tg(i, d), i.stateNode === null)
    jj(e, i), ph(i, o, s), rh(i, o, s, d), s = !0;
  else if (e === null) {
    var _ = i.stateNode, b = i.memoizedProps;
    _.props = b;
    var _e = _.context, et = o.contextType;
    typeof et == "object" && et !== null ? et = Vg(et) : (et = Zf(o) ? Xf : H.current, et = Yf(i, et));
    var ut = o.getDerivedStateFromProps, st = typeof ut == "function" || typeof _.getSnapshotBeforeUpdate == "function";
    st || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (b !== s || _e !== et) && qh(i, _, s, et), $g = !1;
    var ct = i.memoizedState;
    _.state = ct, gh(i, s, _, d), _e = i.memoizedState, b !== s || ct !== _e || Wf.current || $g ? (typeof ut == "function" && (kh(i, o, ut, s), _e = i.memoizedState), (b = $g || oh(i, o, b, s, ct, _e, et)) ? (st || typeof _.UNSAFE_componentWillMount != "function" && typeof _.componentWillMount != "function" || (typeof _.componentWillMount == "function" && _.componentWillMount(), typeof _.UNSAFE_componentWillMount == "function" && _.UNSAFE_componentWillMount()), typeof _.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof _.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = s, i.memoizedState = _e), _.props = s, _.state = _e, _.context = et, s = b) : (typeof _.componentDidMount == "function" && (i.flags |= 4194308), s = !1);
  } else {
    _ = i.stateNode, bh(e, i), b = i.memoizedProps, et = i.type === i.elementType ? b : Lg(i.type, b), _.props = et, st = i.pendingProps, ct = _.context, _e = o.contextType, typeof _e == "object" && _e !== null ? _e = Vg(_e) : (_e = Zf(o) ? Xf : H.current, _e = Yf(i, _e));
    var mt = o.getDerivedStateFromProps;
    (ut = typeof mt == "function" || typeof _.getSnapshotBeforeUpdate == "function") || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (b !== st || ct !== _e) && qh(i, _, s, _e), $g = !1, ct = i.memoizedState, _.state = ct, gh(i, s, _, d);
    var pt = i.memoizedState;
    b !== st || ct !== pt || Wf.current || $g ? (typeof mt == "function" && (kh(i, o, mt, s), pt = i.memoizedState), (et = $g || oh(i, o, et, s, ct, pt, _e) || !1) ? (ut || typeof _.UNSAFE_componentWillUpdate != "function" && typeof _.componentWillUpdate != "function" || (typeof _.componentWillUpdate == "function" && _.componentWillUpdate(s, pt, _e), typeof _.UNSAFE_componentWillUpdate == "function" && _.UNSAFE_componentWillUpdate(s, pt, _e)), typeof _.componentDidUpdate == "function" && (i.flags |= 4), typeof _.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof _.componentDidUpdate != "function" || b === e.memoizedProps && ct === e.memoizedState || (i.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ct === e.memoizedState || (i.flags |= 1024), i.memoizedProps = s, i.memoizedState = pt), _.props = s, _.state = pt, _.context = _e, s = et) : (typeof _.componentDidUpdate != "function" || b === e.memoizedProps && ct === e.memoizedState || (i.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ct === e.memoizedState || (i.flags |= 1024), s = !1);
  }
  return kj(e, i, o, s, h, d);
}
function kj(e, i, o, s, d, h) {
  hj(e, i);
  var _ = (i.flags & 128) !== 0;
  if (!s && !_)
    return d && dg(i, o, !1), $i(e, i, h);
  s = i.stateNode, Xi.current = i;
  var b = _ && typeof o.getDerivedStateFromError != "function" ? null : s.render();
  return i.flags |= 1, e !== null && _ ? (i.child = Bh(i, e.child, null, h), i.child = Bh(i, null, b, h)) : Yi(e, i, b, h), i.memoizedState = s.state, d && dg(i, o, !0), i.child;
}
function lj(e) {
  var i = e.stateNode;
  i.pendingContext ? ag(e, i.pendingContext, i.pendingContext !== i.context) : i.context && ag(e, i.context, !1), Ih(e, i.containerInfo);
}
function mj(e, i, o, s, d) {
  return Ig(), Jg(d), i.flags |= 256, Yi(e, i, o, s), i.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pj(e, i, o) {
  var s = i.pendingProps, d = M.current, h = !1, _ = (i.flags & 128) !== 0, b;
  if ((b = _) || (b = e !== null && e.memoizedState === null ? !1 : (d & 2) !== 0), b ? (h = !0, i.flags &= -129) : (e === null || e.memoizedState !== null) && (d |= 1), G(M, d & 1), e === null)
    return Eg(i), e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (i.mode & 1 ? e.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824 : i.lanes = 1, null) : (_ = s.children, e = s.fallback, h ? (s = i.mode, h = i.child, _ = { mode: "hidden", children: _ }, !(s & 1) && h !== null ? (h.childLanes = 0, h.pendingProps = _) : h = qj(_, s, 0, null), e = Ah(e, s, o, null), h.return = i, e.return = i, h.sibling = e, i.child = h, i.child.memoizedState = oj(o), i.memoizedState = nj, e) : rj(i, _));
  if (d = e.memoizedState, d !== null && (b = d.dehydrated, b !== null))
    return sj(e, i, _, s, b, d, o);
  if (h) {
    h = s.fallback, _ = i.mode, d = e.child, b = d.sibling;
    var _e = { mode: "hidden", children: s.children };
    return !(_ & 1) && i.child !== d ? (s = i.child, s.childLanes = 0, s.pendingProps = _e, i.deletions = null) : (s = wh(d, _e), s.subtreeFlags = d.subtreeFlags & 14680064), b !== null ? h = wh(b, h) : (h = Ah(h, _, o, null), h.flags |= 2), h.return = i, s.return = i, s.sibling = h, i.child = s, s = h, h = i.child, _ = e.child.memoizedState, _ = _ === null ? oj(o) : { baseLanes: _.baseLanes | o, cachePool: null, transitions: _.transitions }, h.memoizedState = _, h.childLanes = e.childLanes & ~o, i.memoizedState = nj, s;
  }
  return h = e.child, e = h.sibling, s = wh(h, { mode: "visible", children: s.children }), !(i.mode & 1) && (s.lanes = o), s.return = i, s.sibling = null, e !== null && (o = i.deletions, o === null ? (i.deletions = [e], i.flags |= 16) : o.push(e)), i.child = s, i.memoizedState = null, s;
}
function rj(e, i) {
  return i = qj({ mode: "visible", children: i }, e.mode, 0, null), i.return = e, e.child = i;
}
function tj(e, i, o, s) {
  return s !== null && Jg(s), Bh(i, e.child, null, o), e = rj(i, i.pendingProps.children), e.flags |= 2, i.memoizedState = null, e;
}
function sj(e, i, o, s, d, h, _) {
  if (o)
    return i.flags & 256 ? (i.flags &= -257, s = Li(Error(p(422))), tj(e, i, _, s)) : i.memoizedState !== null ? (i.child = e.child, i.flags |= 128, null) : (h = s.fallback, d = i.mode, s = qj({ mode: "visible", children: s.children }, d, 0, null), h = Ah(h, d, _, null), h.flags |= 2, s.return = i, h.return = i, s.sibling = h, i.child = s, i.mode & 1 && Bh(i, e.child, null, _), i.child.memoizedState = oj(_), i.memoizedState = nj, h);
  if (!(i.mode & 1))
    return tj(e, i, _, null);
  if (d.data === "$!") {
    if (s = d.nextSibling && d.nextSibling.dataset, s)
      var b = s.dgst;
    return s = b, h = Error(p(419)), s = Li(h, s, void 0), tj(e, i, _, s);
  }
  if (b = (_ & e.childLanes) !== 0, Ug || b) {
    if (s = R, s !== null) {
      switch (_ & -_) {
        case 4:
          d = 2;
          break;
        case 16:
          d = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          d = 32;
          break;
        case 536870912:
          d = 268435456;
          break;
        default:
          d = 0;
      }
      d = d & (s.suspendedLanes | _) ? 0 : d, d !== 0 && d !== h.retryLane && (h.retryLane = d, Zg(e, d), mh(s, e, d, -1));
    }
    return uj(), s = Li(Error(p(421))), tj(e, i, _, s);
  }
  return d.data === "$?" ? (i.flags |= 128, i.child = e.child, i = vj.bind(null, e), d._reactRetry = i, null) : (e = h.treeContext, yg = Lf(d.nextSibling), xg = i, I = !0, zg = null, e !== null && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = e.id, sg = e.overflow, qg = i), i = rj(i, s.children), i.flags |= 4096, i);
}
function wj(e, i, o) {
  e.lanes |= i;
  var s = e.alternate;
  s !== null && (s.lanes |= i), Sg(e.return, i, o);
}
function xj(e, i, o, s, d) {
  var h = e.memoizedState;
  h === null ? e.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: s, tail: o, tailMode: d } : (h.isBackwards = i, h.rendering = null, h.renderingStartTime = 0, h.last = s, h.tail = o, h.tailMode = d);
}
function yj(e, i, o) {
  var s = i.pendingProps, d = s.revealOrder, h = s.tail;
  if (Yi(e, i, s.children, o), s = M.current, s & 2)
    s = s & 1 | 2, i.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = i.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && wj(e, o, i);
          else if (e.tag === 19)
            wj(e, o, i);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === i)
            break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === i)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
    s &= 1;
  }
  if (G(M, s), !(i.mode & 1))
    i.memoizedState = null;
  else
    switch (d) {
      case "forwards":
        for (o = i.child, d = null; o !== null; )
          e = o.alternate, e !== null && Mh(e) === null && (d = o), o = o.sibling;
        o = d, o === null ? (d = i.child, i.child = null) : (d = o.sibling, o.sibling = null), xj(i, !1, d, o, h);
        break;
      case "backwards":
        for (o = null, d = i.child, i.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && Mh(e) === null) {
            i.child = d;
            break;
          }
          e = d.sibling, d.sibling = o, o = d, d = e;
        }
        xj(i, !0, o, null, h);
        break;
      case "together":
        xj(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
  return i.child;
}
function jj(e, i) {
  !(i.mode & 1) && e !== null && (e.alternate = null, i.alternate = null, i.flags |= 2);
}
function $i(e, i, o) {
  if (e !== null && (i.dependencies = e.dependencies), hh |= i.lanes, !(o & i.childLanes))
    return null;
  if (e !== null && i.child !== e.child)
    throw Error(p(153));
  if (i.child !== null) {
    for (e = i.child, o = wh(e, e.pendingProps), i.child = o, o.return = i; e.sibling !== null; )
      e = e.sibling, o = o.sibling = wh(e, e.pendingProps), o.return = i;
    o.sibling = null;
  }
  return i.child;
}
function zj(e, i, o) {
  switch (i.tag) {
    case 3:
      lj(i), Ig();
      break;
    case 5:
      Kh(i);
      break;
    case 1:
      Zf(i.type) && cg(i);
      break;
    case 4:
      Ih(i, i.stateNode.containerInfo);
      break;
    case 10:
      var s = i.type._context, d = i.memoizedProps.value;
      G(Mg, s._currentValue), s._currentValue = d;
      break;
    case 13:
      if (s = i.memoizedState, s !== null)
        return s.dehydrated !== null ? (G(M, M.current & 1), i.flags |= 128, null) : o & i.child.childLanes ? pj(e, i, o) : (G(M, M.current & 1), e = $i(e, i, o), e !== null ? e.sibling : null);
      G(M, M.current & 1);
      break;
    case 19:
      if (s = (o & i.childLanes) !== 0, e.flags & 128) {
        if (s)
          return yj(e, i, o);
        i.flags |= 128;
      }
      if (d = i.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), G(M, M.current), s)
        break;
      return null;
    case 22:
    case 23:
      return i.lanes = 0, ej(e, i, o);
  }
  return $i(e, i, o);
}
var Aj, Bj, Cj, Dj;
Aj = function(e, i) {
  for (var o = i.child; o !== null; ) {
    if (o.tag === 5 || o.tag === 6)
      e.appendChild(o.stateNode);
    else if (o.tag !== 4 && o.child !== null) {
      o.child.return = o, o = o.child;
      continue;
    }
    if (o === i)
      break;
    for (; o.sibling === null; ) {
      if (o.return === null || o.return === i)
        return;
      o = o.return;
    }
    o.sibling.return = o.return, o = o.sibling;
  }
};
Bj = function() {
};
Cj = function(e, i, o, s) {
  var d = e.memoizedProps;
  if (d !== s) {
    e = i.stateNode, Hh(Eh.current);
    var h = null;
    switch (o) {
      case "input":
        d = Ya(e, d), s = Ya(e, s), h = [];
        break;
      case "select":
        d = A({}, d, { value: void 0 }), s = A({}, s, { value: void 0 }), h = [];
        break;
      case "textarea":
        d = gb(e, d), s = gb(e, s), h = [];
        break;
      default:
        typeof d.onClick != "function" && typeof s.onClick == "function" && (e.onclick = Bf);
    }
    ub(o, s);
    var _;
    o = null;
    for (et in d)
      if (!s.hasOwnProperty(et) && d.hasOwnProperty(et) && d[et] != null)
        if (et === "style") {
          var b = d[et];
          for (_ in b)
            b.hasOwnProperty(_) && (o || (o = {}), o[_] = "");
        } else
          et !== "dangerouslySetInnerHTML" && et !== "children" && et !== "suppressContentEditableWarning" && et !== "suppressHydrationWarning" && et !== "autoFocus" && (ea.hasOwnProperty(et) ? h || (h = []) : (h = h || []).push(et, null));
    for (et in s) {
      var _e = s[et];
      if (b = d != null ? d[et] : void 0, s.hasOwnProperty(et) && _e !== b && (_e != null || b != null))
        if (et === "style")
          if (b) {
            for (_ in b)
              !b.hasOwnProperty(_) || _e && _e.hasOwnProperty(_) || (o || (o = {}), o[_] = "");
            for (_ in _e)
              _e.hasOwnProperty(_) && b[_] !== _e[_] && (o || (o = {}), o[_] = _e[_]);
          } else
            o || (h || (h = []), h.push(
              et,
              o
            )), o = _e;
        else
          et === "dangerouslySetInnerHTML" ? (_e = _e ? _e.__html : void 0, b = b ? b.__html : void 0, _e != null && b !== _e && (h = h || []).push(et, _e)) : et === "children" ? typeof _e != "string" && typeof _e != "number" || (h = h || []).push(et, "" + _e) : et !== "suppressContentEditableWarning" && et !== "suppressHydrationWarning" && (ea.hasOwnProperty(et) ? (_e != null && et === "onScroll" && D("scroll", e), h || b === _e || (h = [])) : (h = h || []).push(et, _e));
    }
    o && (h = h || []).push("style", o);
    var et = h;
    (i.updateQueue = et) && (i.flags |= 4);
  }
};
Dj = function(e, i, o, s) {
  o !== s && (i.flags |= 4);
};
function Ej(e, i) {
  if (!I)
    switch (e.tailMode) {
      case "hidden":
        i = e.tail;
        for (var o = null; i !== null; )
          i.alternate !== null && (o = i), i = i.sibling;
        o === null ? e.tail = null : o.sibling = null;
        break;
      case "collapsed":
        o = e.tail;
        for (var s = null; o !== null; )
          o.alternate !== null && (s = o), o = o.sibling;
        s === null ? i || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null;
    }
}
function S(e) {
  var i = e.alternate !== null && e.alternate.child === e.child, o = 0, s = 0;
  if (i)
    for (var d = e.child; d !== null; )
      o |= d.lanes | d.childLanes, s |= d.subtreeFlags & 14680064, s |= d.flags & 14680064, d.return = e, d = d.sibling;
  else
    for (d = e.child; d !== null; )
      o |= d.lanes | d.childLanes, s |= d.subtreeFlags, s |= d.flags, d.return = e, d = d.sibling;
  return e.subtreeFlags |= s, e.childLanes = o, i;
}
function Fj(e, i, o) {
  var s = i.pendingProps;
  switch (wg(i), i.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(i), null;
    case 1:
      return Zf(i.type) && $f(), S(i), null;
    case 3:
      return s = i.stateNode, Jh(), E(Wf), E(H), Oh(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Gg(i) ? i.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(i.flags & 256) || (i.flags |= 1024, zg !== null && (Gj(zg), zg = null))), Bj(e, i), S(i), null;
    case 5:
      Lh(i);
      var d = Hh(Gh.current);
      if (o = i.type, e !== null && i.stateNode != null)
        Cj(e, i, o, s, d), e.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
      else {
        if (!s) {
          if (i.stateNode === null)
            throw Error(p(166));
          return S(i), null;
        }
        if (e = Hh(Eh.current), Gg(i)) {
          s = i.stateNode, o = i.type;
          var h = i.memoizedProps;
          switch (s[Of] = i, s[Pf] = h, e = (i.mode & 1) !== 0, o) {
            case "dialog":
              D("cancel", s), D("close", s);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", s);
              break;
            case "video":
            case "audio":
              for (d = 0; d < lf.length; d++)
                D(lf[d], s);
              break;
            case "source":
              D("error", s);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                s
              ), D("load", s);
              break;
            case "details":
              D("toggle", s);
              break;
            case "input":
              Za(s, h), D("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!h.multiple }, D("invalid", s);
              break;
            case "textarea":
              hb(s, h), D("invalid", s);
          }
          ub(o, h), d = null;
          for (var _ in h)
            if (h.hasOwnProperty(_)) {
              var b = h[_];
              _ === "children" ? typeof b == "string" ? s.textContent !== b && (h.suppressHydrationWarning !== !0 && Af(s.textContent, b, e), d = ["children", b]) : typeof b == "number" && s.textContent !== "" + b && (h.suppressHydrationWarning !== !0 && Af(
                s.textContent,
                b,
                e
              ), d = ["children", "" + b]) : ea.hasOwnProperty(_) && b != null && _ === "onScroll" && D("scroll", s);
            }
          switch (o) {
            case "input":
              Va(s), db(s, h, !0);
              break;
            case "textarea":
              Va(s), jb(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof h.onClick == "function" && (s.onclick = Bf);
          }
          s = d, i.updateQueue = s, s !== null && (i.flags |= 4);
        } else {
          _ = d.nodeType === 9 ? d : d.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = kb(o)), e === "http://www.w3.org/1999/xhtml" ? o === "script" ? (e = _.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = _.createElement(o, { is: s.is }) : (e = _.createElement(o), o === "select" && (_ = e, s.multiple ? _.multiple = !0 : s.size && (_.size = s.size))) : e = _.createElementNS(e, o), e[Of] = i, e[Pf] = s, Aj(e, i, !1, !1), i.stateNode = e;
          e: {
            switch (_ = vb(o, s), o) {
              case "dialog":
                D("cancel", e), D("close", e), d = s;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", e), d = s;
                break;
              case "video":
              case "audio":
                for (d = 0; d < lf.length; d++)
                  D(lf[d], e);
                d = s;
                break;
              case "source":
                D("error", e), d = s;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  e
                ), D("load", e), d = s;
                break;
              case "details":
                D("toggle", e), d = s;
                break;
              case "input":
                Za(e, s), d = Ya(e, s), D("invalid", e);
                break;
              case "option":
                d = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, d = A({}, s, { value: void 0 }), D("invalid", e);
                break;
              case "textarea":
                hb(e, s), d = gb(e, s), D("invalid", e);
                break;
              default:
                d = s;
            }
            ub(o, d), b = d;
            for (h in b)
              if (b.hasOwnProperty(h)) {
                var _e = b[h];
                h === "style" ? sb(e, _e) : h === "dangerouslySetInnerHTML" ? (_e = _e ? _e.__html : void 0, _e != null && nb(e, _e)) : h === "children" ? typeof _e == "string" ? (o !== "textarea" || _e !== "") && ob(e, _e) : typeof _e == "number" && ob(e, "" + _e) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (ea.hasOwnProperty(h) ? _e != null && h === "onScroll" && D("scroll", e) : _e != null && ta(e, h, _e, _));
              }
            switch (o) {
              case "input":
                Va(e), db(e, s, !1);
                break;
              case "textarea":
                Va(e), jb(e);
                break;
              case "option":
                s.value != null && e.setAttribute("value", "" + Sa(s.value));
                break;
              case "select":
                e.multiple = !!s.multiple, h = s.value, h != null ? fb(e, !!s.multiple, h, !1) : s.defaultValue != null && fb(
                  e,
                  !!s.multiple,
                  s.defaultValue,
                  !0
                );
                break;
              default:
                typeof d.onClick == "function" && (e.onclick = Bf);
            }
            switch (o) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
          }
          s && (i.flags |= 4);
        }
        i.ref !== null && (i.flags |= 512, i.flags |= 2097152);
      }
      return S(i), null;
    case 6:
      if (e && i.stateNode != null)
        Dj(e, i, e.memoizedProps, s);
      else {
        if (typeof s != "string" && i.stateNode === null)
          throw Error(p(166));
        if (o = Hh(Gh.current), Hh(Eh.current), Gg(i)) {
          if (s = i.stateNode, o = i.memoizedProps, s[Of] = i, (h = s.nodeValue !== o) && (e = xg, e !== null))
            switch (e.tag) {
              case 3:
                Af(s.nodeValue, o, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Af(s.nodeValue, o, (e.mode & 1) !== 0);
            }
          h && (i.flags |= 4);
        } else
          s = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(s), s[Of] = i, i.stateNode = s;
      }
      return S(i), null;
    case 13:
      if (E(M), s = i.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (I && yg !== null && i.mode & 1 && !(i.flags & 128))
          Hg(), Ig(), i.flags |= 98560, h = !1;
        else if (h = Gg(i), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!h)
              throw Error(p(318));
            if (h = i.memoizedState, h = h !== null ? h.dehydrated : null, !h)
              throw Error(p(317));
            h[Of] = i;
          } else
            Ig(), !(i.flags & 128) && (i.memoizedState = null), i.flags |= 4;
          S(i), h = !1;
        } else
          zg !== null && (Gj(zg), zg = null), h = !0;
        if (!h)
          return i.flags & 65536 ? i : null;
      }
      return i.flags & 128 ? (i.lanes = o, i) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (i.child.flags |= 8192, i.mode & 1 && (e === null || M.current & 1 ? T === 0 && (T = 3) : uj())), i.updateQueue !== null && (i.flags |= 4), S(i), null);
    case 4:
      return Jh(), Bj(e, i), e === null && sf(i.stateNode.containerInfo), S(i), null;
    case 10:
      return Rg(i.type._context), S(i), null;
    case 17:
      return Zf(i.type) && $f(), S(i), null;
    case 19:
      if (E(M), h = i.memoizedState, h === null)
        return S(i), null;
      if (s = (i.flags & 128) !== 0, _ = h.rendering, _ === null)
        if (s)
          Ej(h, !1);
        else {
          if (T !== 0 || e !== null && e.flags & 128)
            for (e = i.child; e !== null; ) {
              if (_ = Mh(e), _ !== null) {
                for (i.flags |= 128, Ej(h, !1), s = _.updateQueue, s !== null && (i.updateQueue = s, i.flags |= 4), i.subtreeFlags = 0, s = o, o = i.child; o !== null; )
                  h = o, e = s, h.flags &= 14680066, _ = h.alternate, _ === null ? (h.childLanes = 0, h.lanes = e, h.child = null, h.subtreeFlags = 0, h.memoizedProps = null, h.memoizedState = null, h.updateQueue = null, h.dependencies = null, h.stateNode = null) : (h.childLanes = _.childLanes, h.lanes = _.lanes, h.child = _.child, h.subtreeFlags = 0, h.deletions = null, h.memoizedProps = _.memoizedProps, h.memoizedState = _.memoizedState, h.updateQueue = _.updateQueue, h.type = _.type, e = _.dependencies, h.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), o = o.sibling;
                return G(M, M.current & 1 | 2), i.child;
              }
              e = e.sibling;
            }
          h.tail !== null && B() > Hj && (i.flags |= 128, s = !0, Ej(h, !1), i.lanes = 4194304);
        }
      else {
        if (!s)
          if (e = Mh(_), e !== null) {
            if (i.flags |= 128, s = !0, o = e.updateQueue, o !== null && (i.updateQueue = o, i.flags |= 4), Ej(h, !0), h.tail === null && h.tailMode === "hidden" && !_.alternate && !I)
              return S(i), null;
          } else
            2 * B() - h.renderingStartTime > Hj && o !== 1073741824 && (i.flags |= 128, s = !0, Ej(h, !1), i.lanes = 4194304);
        h.isBackwards ? (_.sibling = i.child, i.child = _) : (o = h.last, o !== null ? o.sibling = _ : i.child = _, h.last = _);
      }
      return h.tail !== null ? (i = h.tail, h.rendering = i, h.tail = i.sibling, h.renderingStartTime = B(), i.sibling = null, o = M.current, G(M, s ? o & 1 | 2 : o & 1), i) : (S(i), null);
    case 22:
    case 23:
      return Ij(), s = i.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (i.flags |= 8192), s && i.mode & 1 ? gj & 1073741824 && (S(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : S(i), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, i.tag));
}
function Jj(e, i) {
  switch (wg(i), i.tag) {
    case 1:
      return Zf(i.type) && $f(), e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
    case 3:
      return Jh(), E(Wf), E(H), Oh(), e = i.flags, e & 65536 && !(e & 128) ? (i.flags = e & -65537 | 128, i) : null;
    case 5:
      return Lh(i), null;
    case 13:
      if (E(M), e = i.memoizedState, e !== null && e.dehydrated !== null) {
        if (i.alternate === null)
          throw Error(p(340));
        Ig();
      }
      return e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
    case 19:
      return E(M), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(i.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = !1, U = !1, Lj = typeof WeakSet == "function" ? WeakSet : Set, V = null;
function Mj(e, i) {
  var o = e.ref;
  if (o !== null)
    if (typeof o == "function")
      try {
        o(null);
      } catch (s) {
        W(e, i, s);
      }
    else
      o.current = null;
}
function Nj(e, i, o) {
  try {
    o();
  } catch (s) {
    W(e, i, s);
  }
}
var Oj = !1;
function Pj(e, i) {
  if (Cf = dd, e = Me(), Ne(e)) {
    if ("selectionStart" in e)
      var o = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        o = (o = e.ownerDocument) && o.defaultView || window;
        var s = o.getSelection && o.getSelection();
        if (s && s.rangeCount !== 0) {
          o = s.anchorNode;
          var d = s.anchorOffset, h = s.focusNode;
          s = s.focusOffset;
          try {
            o.nodeType, h.nodeType;
          } catch {
            o = null;
            break e;
          }
          var _ = 0, b = -1, _e = -1, et = 0, ut = 0, st = e, ct = null;
          t:
            for (; ; ) {
              for (var mt; st !== o || d !== 0 && st.nodeType !== 3 || (b = _ + d), st !== h || s !== 0 && st.nodeType !== 3 || (_e = _ + s), st.nodeType === 3 && (_ += st.nodeValue.length), (mt = st.firstChild) !== null; )
                ct = st, st = mt;
              for (; ; ) {
                if (st === e)
                  break t;
                if (ct === o && ++et === d && (b = _), ct === h && ++ut === s && (_e = _), (mt = st.nextSibling) !== null)
                  break;
                st = ct, ct = st.parentNode;
              }
              st = mt;
            }
          o = b === -1 || _e === -1 ? null : { start: b, end: _e };
        } else
          o = null;
      }
    o = o || { start: 0, end: 0 };
  } else
    o = null;
  for (Df = { focusedElem: e, selectionRange: o }, dd = !1, V = i; V !== null; )
    if (i = V, e = i.child, (i.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = i, V = e;
    else
      for (; V !== null; ) {
        i = V;
        try {
          var pt = i.alternate;
          if (i.flags & 1024)
            switch (i.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (pt !== null) {
                  var vt = pt.memoizedProps, ht = pt.memoizedState, nt = i.stateNode, ot = nt.getSnapshotBeforeUpdate(i.elementType === i.type ? vt : Lg(i.type, vt), ht);
                  nt.__reactInternalSnapshotBeforeUpdate = ot;
                }
                break;
              case 3:
                var it = i.stateNode.containerInfo;
                it.nodeType === 1 ? it.textContent = "" : it.nodeType === 9 && it.documentElement && it.removeChild(it.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
        } catch (at) {
          W(i, i.return, at);
        }
        if (e = i.sibling, e !== null) {
          e.return = i.return, V = e;
          break;
        }
        V = i.return;
      }
  return pt = Oj, Oj = !1, pt;
}
function Qj(e, i, o) {
  var s = i.updateQueue;
  if (s = s !== null ? s.lastEffect : null, s !== null) {
    var d = s = s.next;
    do {
      if ((d.tag & e) === e) {
        var h = d.destroy;
        d.destroy = void 0, h !== void 0 && Nj(i, o, h);
      }
      d = d.next;
    } while (d !== s);
  }
}
function Rj(e, i) {
  if (i = i.updateQueue, i = i !== null ? i.lastEffect : null, i !== null) {
    var o = i = i.next;
    do {
      if ((o.tag & e) === e) {
        var s = o.create;
        o.destroy = s();
      }
      o = o.next;
    } while (o !== i);
  }
}
function Sj(e) {
  var i = e.ref;
  if (i !== null) {
    var o = e.stateNode;
    switch (e.tag) {
      case 5:
        e = o;
        break;
      default:
        e = o;
    }
    typeof i == "function" ? i(e) : i.current = e;
  }
}
function Tj(e) {
  var i = e.alternate;
  i !== null && (e.alternate = null, Tj(i)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (i = e.stateNode, i !== null && (delete i[Of], delete i[Pf], delete i[of], delete i[Qf], delete i[Rf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Uj(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Vj(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Uj(e.return))
          return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2))
        return e.stateNode;
    }
}
function Wj(e, i, o) {
  var s = e.tag;
  if (s === 5 || s === 6)
    e = e.stateNode, i ? o.nodeType === 8 ? o.parentNode.insertBefore(e, i) : o.insertBefore(e, i) : (o.nodeType === 8 ? (i = o.parentNode, i.insertBefore(e, o)) : (i = o, i.appendChild(e)), o = o._reactRootContainer, o != null || i.onclick !== null || (i.onclick = Bf));
  else if (s !== 4 && (e = e.child, e !== null))
    for (Wj(e, i, o), e = e.sibling; e !== null; )
      Wj(e, i, o), e = e.sibling;
}
function Xj(e, i, o) {
  var s = e.tag;
  if (s === 5 || s === 6)
    e = e.stateNode, i ? o.insertBefore(e, i) : o.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null))
    for (Xj(e, i, o), e = e.sibling; e !== null; )
      Xj(e, i, o), e = e.sibling;
}
var X = null, Yj = !1;
function Zj(e, i, o) {
  for (o = o.child; o !== null; )
    ak(e, i, o), o = o.sibling;
}
function ak(e, i, o) {
  if (lc && typeof lc.onCommitFiberUnmount == "function")
    try {
      lc.onCommitFiberUnmount(kc, o);
    } catch {
    }
  switch (o.tag) {
    case 5:
      U || Mj(o, i);
    case 6:
      var s = X, d = Yj;
      X = null, Zj(e, i, o), X = s, Yj = d, X !== null && (Yj ? (e = X, o = o.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(o) : e.removeChild(o)) : X.removeChild(o.stateNode));
      break;
    case 18:
      X !== null && (Yj ? (e = X, o = o.stateNode, e.nodeType === 8 ? Kf(e.parentNode, o) : e.nodeType === 1 && Kf(e, o), bd(e)) : Kf(X, o.stateNode));
      break;
    case 4:
      s = X, d = Yj, X = o.stateNode.containerInfo, Yj = !0, Zj(e, i, o), X = s, Yj = d;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (s = o.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        d = s = s.next;
        do {
          var h = d, _ = h.destroy;
          h = h.tag, _ !== void 0 && (h & 2 || h & 4) && Nj(o, i, _), d = d.next;
        } while (d !== s);
      }
      Zj(e, i, o);
      break;
    case 1:
      if (!U && (Mj(o, i), s = o.stateNode, typeof s.componentWillUnmount == "function"))
        try {
          s.props = o.memoizedProps, s.state = o.memoizedState, s.componentWillUnmount();
        } catch (b) {
          W(o, i, b);
        }
      Zj(e, i, o);
      break;
    case 21:
      Zj(e, i, o);
      break;
    case 22:
      o.mode & 1 ? (U = (s = U) || o.memoizedState !== null, Zj(e, i, o), U = s) : Zj(e, i, o);
      break;
    default:
      Zj(e, i, o);
  }
}
function bk(e) {
  var i = e.updateQueue;
  if (i !== null) {
    e.updateQueue = null;
    var o = e.stateNode;
    o === null && (o = e.stateNode = new Lj()), i.forEach(function(s) {
      var d = ck.bind(null, e, s);
      o.has(s) || (o.add(s), s.then(d, d));
    });
  }
}
function dk(e, i) {
  var o = i.deletions;
  if (o !== null)
    for (var s = 0; s < o.length; s++) {
      var d = o[s];
      try {
        var h = e, _ = i, b = _;
        e:
          for (; b !== null; ) {
            switch (b.tag) {
              case 5:
                X = b.stateNode, Yj = !1;
                break e;
              case 3:
                X = b.stateNode.containerInfo, Yj = !0;
                break e;
              case 4:
                X = b.stateNode.containerInfo, Yj = !0;
                break e;
            }
            b = b.return;
          }
        if (X === null)
          throw Error(p(160));
        ak(h, _, d), X = null, Yj = !1;
        var _e = d.alternate;
        _e !== null && (_e.return = null), d.return = null;
      } catch (et) {
        W(d, i, et);
      }
    }
  if (i.subtreeFlags & 12854)
    for (i = i.child; i !== null; )
      ek(i, e), i = i.sibling;
}
function ek(e, i) {
  var o = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (dk(i, e), fk(e), s & 4) {
        try {
          Qj(3, e, e.return), Rj(3, e);
        } catch (vt) {
          W(e, e.return, vt);
        }
        try {
          Qj(5, e, e.return);
        } catch (vt) {
          W(e, e.return, vt);
        }
      }
      break;
    case 1:
      dk(i, e), fk(e), s & 512 && o !== null && Mj(o, o.return);
      break;
    case 5:
      if (dk(i, e), fk(e), s & 512 && o !== null && Mj(o, o.return), e.flags & 32) {
        var d = e.stateNode;
        try {
          ob(d, "");
        } catch (vt) {
          W(e, e.return, vt);
        }
      }
      if (s & 4 && (d = e.stateNode, d != null)) {
        var h = e.memoizedProps, _ = o !== null ? o.memoizedProps : h, b = e.type, _e = e.updateQueue;
        if (e.updateQueue = null, _e !== null)
          try {
            b === "input" && h.type === "radio" && h.name != null && ab(d, h), vb(b, _);
            var et = vb(b, h);
            for (_ = 0; _ < _e.length; _ += 2) {
              var ut = _e[_], st = _e[_ + 1];
              ut === "style" ? sb(d, st) : ut === "dangerouslySetInnerHTML" ? nb(d, st) : ut === "children" ? ob(d, st) : ta(d, ut, st, et);
            }
            switch (b) {
              case "input":
                bb(d, h);
                break;
              case "textarea":
                ib(d, h);
                break;
              case "select":
                var ct = d._wrapperState.wasMultiple;
                d._wrapperState.wasMultiple = !!h.multiple;
                var mt = h.value;
                mt != null ? fb(d, !!h.multiple, mt, !1) : ct !== !!h.multiple && (h.defaultValue != null ? fb(
                  d,
                  !!h.multiple,
                  h.defaultValue,
                  !0
                ) : fb(d, !!h.multiple, h.multiple ? [] : "", !1));
            }
            d[Pf] = h;
          } catch (vt) {
            W(e, e.return, vt);
          }
      }
      break;
    case 6:
      if (dk(i, e), fk(e), s & 4) {
        if (e.stateNode === null)
          throw Error(p(162));
        d = e.stateNode, h = e.memoizedProps;
        try {
          d.nodeValue = h;
        } catch (vt) {
          W(e, e.return, vt);
        }
      }
      break;
    case 3:
      if (dk(i, e), fk(e), s & 4 && o !== null && o.memoizedState.isDehydrated)
        try {
          bd(i.containerInfo);
        } catch (vt) {
          W(e, e.return, vt);
        }
      break;
    case 4:
      dk(i, e), fk(e);
      break;
    case 13:
      dk(i, e), fk(e), d = e.child, d.flags & 8192 && (h = d.memoizedState !== null, d.stateNode.isHidden = h, !h || d.alternate !== null && d.alternate.memoizedState !== null || (gk = B())), s & 4 && bk(e);
      break;
    case 22:
      if (ut = o !== null && o.memoizedState !== null, e.mode & 1 ? (U = (et = U) || ut, dk(i, e), U = et) : dk(i, e), fk(e), s & 8192) {
        if (et = e.memoizedState !== null, (e.stateNode.isHidden = et) && !ut && e.mode & 1)
          for (V = e, ut = e.child; ut !== null; ) {
            for (st = V = ut; V !== null; ) {
              switch (ct = V, mt = ct.child, ct.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, ct, ct.return);
                  break;
                case 1:
                  Mj(ct, ct.return);
                  var pt = ct.stateNode;
                  if (typeof pt.componentWillUnmount == "function") {
                    s = ct, o = ct.return;
                    try {
                      i = s, pt.props = i.memoizedProps, pt.state = i.memoizedState, pt.componentWillUnmount();
                    } catch (vt) {
                      W(s, o, vt);
                    }
                  }
                  break;
                case 5:
                  Mj(ct, ct.return);
                  break;
                case 22:
                  if (ct.memoizedState !== null) {
                    hk(st);
                    continue;
                  }
              }
              mt !== null ? (mt.return = ct, V = mt) : hk(st);
            }
            ut = ut.sibling;
          }
        e:
          for (ut = null, st = e; ; ) {
            if (st.tag === 5) {
              if (ut === null) {
                ut = st;
                try {
                  d = st.stateNode, et ? (h = d.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none") : (b = st.stateNode, _e = st.memoizedProps.style, _ = _e != null && _e.hasOwnProperty("display") ? _e.display : null, b.style.display = rb("display", _));
                } catch (vt) {
                  W(e, e.return, vt);
                }
              }
            } else if (st.tag === 6) {
              if (ut === null)
                try {
                  st.stateNode.nodeValue = et ? "" : st.memoizedProps;
                } catch (vt) {
                  W(e, e.return, vt);
                }
            } else if ((st.tag !== 22 && st.tag !== 23 || st.memoizedState === null || st === e) && st.child !== null) {
              st.child.return = st, st = st.child;
              continue;
            }
            if (st === e)
              break e;
            for (; st.sibling === null; ) {
              if (st.return === null || st.return === e)
                break e;
              ut === st && (ut = null), st = st.return;
            }
            ut === st && (ut = null), st.sibling.return = st.return, st = st.sibling;
          }
      }
      break;
    case 19:
      dk(i, e), fk(e), s & 4 && bk(e);
      break;
    case 21:
      break;
    default:
      dk(
        i,
        e
      ), fk(e);
  }
}
function fk(e) {
  var i = e.flags;
  if (i & 2) {
    try {
      e: {
        for (var o = e.return; o !== null; ) {
          if (Uj(o)) {
            var s = o;
            break e;
          }
          o = o.return;
        }
        throw Error(p(160));
      }
      switch (s.tag) {
        case 5:
          var d = s.stateNode;
          s.flags & 32 && (ob(d, ""), s.flags &= -33);
          var h = Vj(e);
          Xj(e, h, d);
          break;
        case 3:
        case 4:
          var _ = s.stateNode.containerInfo, b = Vj(e);
          Wj(e, b, _);
          break;
        default:
          throw Error(p(161));
      }
    } catch (_e) {
      W(e, e.return, _e);
    }
    e.flags &= -3;
  }
  i & 4096 && (e.flags &= -4097);
}
function ik(e, i, o) {
  V = e, jk(e);
}
function jk(e, i, o) {
  for (var s = (e.mode & 1) !== 0; V !== null; ) {
    var d = V, h = d.child;
    if (d.tag === 22 && s) {
      var _ = d.memoizedState !== null || Kj;
      if (!_) {
        var b = d.alternate, _e = b !== null && b.memoizedState !== null || U;
        b = Kj;
        var et = U;
        if (Kj = _, (U = _e) && !et)
          for (V = d; V !== null; )
            _ = V, _e = _.child, _.tag === 22 && _.memoizedState !== null ? kk(d) : _e !== null ? (_e.return = _, V = _e) : kk(d);
        for (; h !== null; )
          V = h, jk(h), h = h.sibling;
        V = d, Kj = b, U = et;
      }
      lk(e);
    } else
      d.subtreeFlags & 8772 && h !== null ? (h.return = d, V = h) : lk(e);
  }
}
function lk(e) {
  for (; V !== null; ) {
    var i = V;
    if (i.flags & 8772) {
      var o = i.alternate;
      try {
        if (i.flags & 8772)
          switch (i.tag) {
            case 0:
            case 11:
            case 15:
              U || Rj(5, i);
              break;
            case 1:
              var s = i.stateNode;
              if (i.flags & 4 && !U)
                if (o === null)
                  s.componentDidMount();
                else {
                  var d = i.elementType === i.type ? o.memoizedProps : Lg(i.type, o.memoizedProps);
                  s.componentDidUpdate(d, o.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
                }
              var h = i.updateQueue;
              h !== null && ih(i, h, s);
              break;
            case 3:
              var _ = i.updateQueue;
              if (_ !== null) {
                if (o = null, i.child !== null)
                  switch (i.child.tag) {
                    case 5:
                      o = i.child.stateNode;
                      break;
                    case 1:
                      o = i.child.stateNode;
                  }
                ih(i, _, o);
              }
              break;
            case 5:
              var b = i.stateNode;
              if (o === null && i.flags & 4) {
                o = b;
                var _e = i.memoizedProps;
                switch (i.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    _e.autoFocus && o.focus();
                    break;
                  case "img":
                    _e.src && (o.src = _e.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (i.memoizedState === null) {
                var et = i.alternate;
                if (et !== null) {
                  var ut = et.memoizedState;
                  if (ut !== null) {
                    var st = ut.dehydrated;
                    st !== null && bd(st);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
        U || i.flags & 512 && Sj(i);
      } catch (ct) {
        W(i, i.return, ct);
      }
    }
    if (i === e) {
      V = null;
      break;
    }
    if (o = i.sibling, o !== null) {
      o.return = i.return, V = o;
      break;
    }
    V = i.return;
  }
}
function hk(e) {
  for (; V !== null; ) {
    var i = V;
    if (i === e) {
      V = null;
      break;
    }
    var o = i.sibling;
    if (o !== null) {
      o.return = i.return, V = o;
      break;
    }
    V = i.return;
  }
}
function kk(e) {
  for (; V !== null; ) {
    var i = V;
    try {
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          var o = i.return;
          try {
            Rj(4, i);
          } catch (_e) {
            W(i, o, _e);
          }
          break;
        case 1:
          var s = i.stateNode;
          if (typeof s.componentDidMount == "function") {
            var d = i.return;
            try {
              s.componentDidMount();
            } catch (_e) {
              W(i, d, _e);
            }
          }
          var h = i.return;
          try {
            Sj(i);
          } catch (_e) {
            W(i, h, _e);
          }
          break;
        case 5:
          var _ = i.return;
          try {
            Sj(i);
          } catch (_e) {
            W(i, _, _e);
          }
      }
    } catch (_e) {
      W(i, i.return, _e);
    }
    if (i === e) {
      V = null;
      break;
    }
    var b = i.sibling;
    if (b !== null) {
      b.return = i.return, V = b;
      break;
    }
    V = i.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R = null, Y = null, Z = 0, gj = 0, fj = Uf(0), T = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = 1 / 0, vk = null, Pi = !1, Qi = null, Si = null, wk = !1, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L() {
  return K & 6 ? B() : Bk !== -1 ? Bk : Bk = B();
}
function lh(e) {
  return e.mode & 1 ? K & 2 && Z !== 0 ? Z & -Z : Kg.transition !== null ? (Ck === 0 && (Ck = yc()), Ck) : (e = C, e !== 0 || (e = window.event, e = e === void 0 ? 16 : jd(e.type)), e) : 1;
}
function mh(e, i, o, s) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p(185));
  Ac(e, o, s), (!(K & 2) || e !== R) && (e === R && (!(K & 2) && (rk |= o), T === 4 && Dk(e, Z)), Ek(e, s), o === 1 && K === 0 && !(i.mode & 1) && (Hj = B() + 500, fg && jg()));
}
function Ek(e, i) {
  var o = e.callbackNode;
  wc(e, i);
  var s = uc(e, e === R ? Z : 0);
  if (s === 0)
    o !== null && bc(o), e.callbackNode = null, e.callbackPriority = 0;
  else if (i = s & -s, e.callbackPriority !== i) {
    if (o != null && bc(o), i === 1)
      e.tag === 0 ? ig(Fk.bind(null, e)) : hg(Fk.bind(null, e)), Jf(function() {
        !(K & 6) && jg();
      }), o = null;
    else {
      switch (Dc(s)) {
        case 1:
          o = fc;
          break;
        case 4:
          o = gc;
          break;
        case 16:
          o = hc;
          break;
        case 536870912:
          o = jc;
          break;
        default:
          o = hc;
      }
      o = Gk(o, Hk.bind(null, e));
    }
    e.callbackPriority = i, e.callbackNode = o;
  }
}
function Hk(e, i) {
  if (Bk = -1, Ck = 0, K & 6)
    throw Error(p(327));
  var o = e.callbackNode;
  if (Ik() && e.callbackNode !== o)
    return null;
  var s = uc(e, e === R ? Z : 0);
  if (s === 0)
    return null;
  if (s & 30 || s & e.expiredLanes || i)
    i = Jk(e, s);
  else {
    i = s;
    var d = K;
    K |= 2;
    var h = Kk();
    (R !== e || Z !== i) && (vk = null, Hj = B() + 500, Lk(e, i));
    do
      try {
        Mk();
        break;
      } catch (b) {
        Nk(e, b);
      }
    while (1);
    Qg(), nk.current = h, K = d, Y !== null ? i = 0 : (R = null, Z = 0, i = T);
  }
  if (i !== 0) {
    if (i === 2 && (d = xc(e), d !== 0 && (s = d, i = Ok(e, d))), i === 1)
      throw o = qk, Lk(e, 0), Dk(e, s), Ek(e, B()), o;
    if (i === 6)
      Dk(e, s);
    else {
      if (d = e.current.alternate, !(s & 30) && !Pk(d) && (i = Jk(e, s), i === 2 && (h = xc(e), h !== 0 && (s = h, i = Ok(e, h))), i === 1))
        throw o = qk, Lk(e, 0), Dk(e, s), Ek(e, B()), o;
      switch (e.finishedWork = d, e.finishedLanes = s, i) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Qk(e, uk, vk);
          break;
        case 3:
          if (Dk(e, s), (s & 130023424) === s && (i = gk + 500 - B(), 10 < i)) {
            if (uc(e, 0) !== 0)
              break;
            if (d = e.suspendedLanes, (d & s) !== s) {
              L(), e.pingedLanes |= e.suspendedLanes & d;
              break;
            }
            e.timeoutHandle = Ff(Qk.bind(null, e, uk, vk), i);
            break;
          }
          Qk(e, uk, vk);
          break;
        case 4:
          if (Dk(e, s), (s & 4194240) === s)
            break;
          for (i = e.eventTimes, d = -1; 0 < s; ) {
            var _ = 31 - oc(s);
            h = 1 << _, _ = i[_], _ > d && (d = _), s &= ~h;
          }
          if (s = d, s = B() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * mk(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = Ff(Qk.bind(null, e, uk, vk), s);
            break;
          }
          Qk(e, uk, vk);
          break;
        case 5:
          Qk(e, uk, vk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  return Ek(e, B()), e.callbackNode === o ? Hk.bind(null, e) : null;
}
function Ok(e, i) {
  var o = tk;
  return e.current.memoizedState.isDehydrated && (Lk(e, i).flags |= 256), e = Jk(e, i), e !== 2 && (i = uk, uk = o, i !== null && Gj(i)), e;
}
function Gj(e) {
  uk === null ? uk = e : uk.push.apply(uk, e);
}
function Pk(e) {
  for (var i = e; ; ) {
    if (i.flags & 16384) {
      var o = i.updateQueue;
      if (o !== null && (o = o.stores, o !== null))
        for (var s = 0; s < o.length; s++) {
          var d = o[s], h = d.getSnapshot;
          d = d.value;
          try {
            if (!He(h(), d))
              return !1;
          } catch {
            return !1;
          }
        }
    }
    if (o = i.child, i.subtreeFlags & 16384 && o !== null)
      o.return = i, i = o;
    else {
      if (i === e)
        break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === e)
          return !0;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
  }
  return !0;
}
function Dk(e, i) {
  for (i &= ~sk, i &= ~rk, e.suspendedLanes |= i, e.pingedLanes &= ~i, e = e.expirationTimes; 0 < i; ) {
    var o = 31 - oc(i), s = 1 << o;
    e[o] = -1, i &= ~s;
  }
}
function Fk(e) {
  if (K & 6)
    throw Error(p(327));
  Ik();
  var i = uc(e, 0);
  if (!(i & 1))
    return Ek(e, B()), null;
  var o = Jk(e, i);
  if (e.tag !== 0 && o === 2) {
    var s = xc(e);
    s !== 0 && (i = s, o = Ok(e, s));
  }
  if (o === 1)
    throw o = qk, Lk(e, 0), Dk(e, i), Ek(e, B()), o;
  if (o === 6)
    throw Error(p(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = i, Qk(e, uk, vk), Ek(e, B()), null;
}
function Rk(e, i) {
  var o = K;
  K |= 1;
  try {
    return e(i);
  } finally {
    K = o, K === 0 && (Hj = B() + 500, fg && jg());
  }
}
function Sk(e) {
  xk !== null && xk.tag === 0 && !(K & 6) && Ik();
  var i = K;
  K |= 1;
  var o = pk.transition, s = C;
  try {
    if (pk.transition = null, C = 1, e)
      return e();
  } finally {
    C = s, pk.transition = o, K = i, !(K & 6) && jg();
  }
}
function Ij() {
  gj = fj.current, E(fj);
}
function Lk(e, i) {
  e.finishedWork = null, e.finishedLanes = 0;
  var o = e.timeoutHandle;
  if (o !== -1 && (e.timeoutHandle = -1, Gf(o)), Y !== null)
    for (o = Y.return; o !== null; ) {
      var s = o;
      switch (wg(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && $f();
          break;
        case 3:
          Jh(), E(Wf), E(H), Oh();
          break;
        case 5:
          Lh(s);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E(M);
          break;
        case 19:
          E(M);
          break;
        case 10:
          Rg(s.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      o = o.return;
    }
  if (R = e, Y = e = wh(e.current, null), Z = gj = i, T = 0, qk = null, sk = rk = hh = 0, uk = tk = null, Wg !== null) {
    for (i = 0; i < Wg.length; i++)
      if (o = Wg[i], s = o.interleaved, s !== null) {
        o.interleaved = null;
        var d = s.next, h = o.pending;
        if (h !== null) {
          var _ = h.next;
          h.next = d, s.next = _;
        }
        o.pending = s;
      }
    Wg = null;
  }
  return e;
}
function Nk(e, i) {
  do {
    var o = Y;
    try {
      if (Qg(), Ph.current = ai, Sh) {
        for (var s = N.memoizedState; s !== null; ) {
          var d = s.queue;
          d !== null && (d.pending = null), s = s.next;
        }
        Sh = !1;
      }
      if (Rh = 0, P = O = N = null, Th = !1, Uh = 0, ok.current = null, o === null || o.return === null) {
        T = 1, qk = i, Y = null;
        break;
      }
      e: {
        var h = e, _ = o.return, b = o, _e = i;
        if (i = Z, b.flags |= 32768, _e !== null && typeof _e == "object" && typeof _e.then == "function") {
          var et = _e, ut = b, st = ut.tag;
          if (!(ut.mode & 1) && (st === 0 || st === 11 || st === 15)) {
            var ct = ut.alternate;
            ct ? (ut.updateQueue = ct.updateQueue, ut.memoizedState = ct.memoizedState, ut.lanes = ct.lanes) : (ut.updateQueue = null, ut.memoizedState = null);
          }
          var mt = Vi(_);
          if (mt !== null) {
            mt.flags &= -257, Wi(mt, _, b, h, i), mt.mode & 1 && Ti(h, et, i), i = mt, _e = et;
            var pt = i.updateQueue;
            if (pt === null) {
              var vt = /* @__PURE__ */ new Set();
              vt.add(_e), i.updateQueue = vt;
            } else
              pt.add(_e);
            break e;
          } else {
            if (!(i & 1)) {
              Ti(h, et, i), uj();
              break e;
            }
            _e = Error(p(426));
          }
        } else if (I && b.mode & 1) {
          var ht = Vi(_);
          if (ht !== null) {
            !(ht.flags & 65536) && (ht.flags |= 256), Wi(ht, _, b, h, i), Jg(Ki(_e, b));
            break e;
          }
        }
        h = _e = Ki(_e, b), T !== 4 && (T = 2), tk === null ? tk = [h] : tk.push(h), h = _;
        do {
          switch (h.tag) {
            case 3:
              h.flags |= 65536, i &= -i, h.lanes |= i;
              var nt = Oi(h, _e, i);
              fh(h, nt);
              break e;
            case 1:
              b = _e;
              var ot = h.type, it = h.stateNode;
              if (!(h.flags & 128) && (typeof ot.getDerivedStateFromError == "function" || it !== null && typeof it.componentDidCatch == "function" && (Si === null || !Si.has(it)))) {
                h.flags |= 65536, i &= -i, h.lanes |= i;
                var at = Ri(h, b, i);
                fh(h, at);
                break e;
              }
          }
          h = h.return;
        } while (h !== null);
      }
      Tk(o);
    } catch (St) {
      i = St, Y === o && o !== null && (Y = o = o.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var e = nk.current;
  return nk.current = ai, e === null ? ai : e;
}
function uj() {
  (T === 0 || T === 3 || T === 2) && (T = 4), R === null || !(hh & 268435455) && !(rk & 268435455) || Dk(R, Z);
}
function Jk(e, i) {
  var o = K;
  K |= 2;
  var s = Kk();
  (R !== e || Z !== i) && (vk = null, Lk(e, i));
  do
    try {
      Uk();
      break;
    } catch (d) {
      Nk(e, d);
    }
  while (1);
  if (Qg(), K = o, nk.current = s, Y !== null)
    throw Error(p(261));
  return R = null, Z = 0, T;
}
function Uk() {
  for (; Y !== null; )
    Vk(Y);
}
function Mk() {
  for (; Y !== null && !cc(); )
    Vk(Y);
}
function Vk(e) {
  var i = Wk(e.alternate, e, gj);
  e.memoizedProps = e.pendingProps, i === null ? Tk(e) : Y = i, ok.current = null;
}
function Tk(e) {
  var i = e;
  do {
    var o = i.alternate;
    if (e = i.return, i.flags & 32768) {
      if (o = Jj(o, i), o !== null) {
        o.flags &= 32767, Y = o;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        T = 6, Y = null;
        return;
      }
    } else if (o = Fj(o, i, gj), o !== null) {
      Y = o;
      return;
    }
    if (i = i.sibling, i !== null) {
      Y = i;
      return;
    }
    Y = i = e;
  } while (i !== null);
  T === 0 && (T = 5);
}
function Qk(e, i, o) {
  var s = C, d = pk.transition;
  try {
    pk.transition = null, C = 1, Xk(e, i, o, s);
  } finally {
    pk.transition = d, C = s;
  }
  return null;
}
function Xk(e, i, o, s) {
  do
    Ik();
  while (xk !== null);
  if (K & 6)
    throw Error(p(327));
  o = e.finishedWork;
  var d = e.finishedLanes;
  if (o === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, o === e.current)
    throw Error(p(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var h = o.lanes | o.childLanes;
  if (Bc(e, h), e === R && (Y = R = null, Z = 0), !(o.subtreeFlags & 2064) && !(o.flags & 2064) || wk || (wk = !0, Gk(hc, function() {
    return Ik(), null;
  })), h = (o.flags & 15990) !== 0, o.subtreeFlags & 15990 || h) {
    h = pk.transition, pk.transition = null;
    var _ = C;
    C = 1;
    var b = K;
    K |= 4, ok.current = null, Pj(e, o), ek(o, e), Oe(Df), dd = !!Cf, Df = Cf = null, e.current = o, ik(o), dc(), K = b, C = _, pk.transition = h;
  } else
    e.current = o;
  if (wk && (wk = !1, xk = e, yk = d), h = e.pendingLanes, h === 0 && (Si = null), mc(o.stateNode), Ek(e, B()), i !== null)
    for (s = e.onRecoverableError, o = 0; o < i.length; o++)
      d = i[o], s(d.value, { componentStack: d.stack, digest: d.digest });
  if (Pi)
    throw Pi = !1, e = Qi, Qi = null, e;
  return yk & 1 && e.tag !== 0 && Ik(), h = e.pendingLanes, h & 1 ? e === Ak ? zk++ : (zk = 0, Ak = e) : zk = 0, jg(), null;
}
function Ik() {
  if (xk !== null) {
    var e = Dc(yk), i = pk.transition, o = C;
    try {
      if (pk.transition = null, C = 16 > e ? 16 : e, xk === null)
        var s = !1;
      else {
        if (e = xk, xk = null, yk = 0, K & 6)
          throw Error(p(331));
        var d = K;
        for (K |= 4, V = e.current; V !== null; ) {
          var h = V, _ = h.child;
          if (V.flags & 16) {
            var b = h.deletions;
            if (b !== null) {
              for (var _e = 0; _e < b.length; _e++) {
                var et = b[_e];
                for (V = et; V !== null; ) {
                  var ut = V;
                  switch (ut.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, ut, h);
                  }
                  var st = ut.child;
                  if (st !== null)
                    st.return = ut, V = st;
                  else
                    for (; V !== null; ) {
                      ut = V;
                      var ct = ut.sibling, mt = ut.return;
                      if (Tj(ut), ut === et) {
                        V = null;
                        break;
                      }
                      if (ct !== null) {
                        ct.return = mt, V = ct;
                        break;
                      }
                      V = mt;
                    }
                }
              }
              var pt = h.alternate;
              if (pt !== null) {
                var vt = pt.child;
                if (vt !== null) {
                  pt.child = null;
                  do {
                    var ht = vt.sibling;
                    vt.sibling = null, vt = ht;
                  } while (vt !== null);
                }
              }
              V = h;
            }
          }
          if (h.subtreeFlags & 2064 && _ !== null)
            _.return = h, V = _;
          else
            e:
              for (; V !== null; ) {
                if (h = V, h.flags & 2048)
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, h, h.return);
                  }
                var nt = h.sibling;
                if (nt !== null) {
                  nt.return = h.return, V = nt;
                  break e;
                }
                V = h.return;
              }
        }
        var ot = e.current;
        for (V = ot; V !== null; ) {
          _ = V;
          var it = _.child;
          if (_.subtreeFlags & 2064 && it !== null)
            it.return = _, V = it;
          else
            e:
              for (_ = ot; V !== null; ) {
                if (b = V, b.flags & 2048)
                  try {
                    switch (b.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, b);
                    }
                  } catch (St) {
                    W(b, b.return, St);
                  }
                if (b === _) {
                  V = null;
                  break e;
                }
                var at = b.sibling;
                if (at !== null) {
                  at.return = b.return, V = at;
                  break e;
                }
                V = b.return;
              }
        }
        if (K = d, jg(), lc && typeof lc.onPostCommitFiberRoot == "function")
          try {
            lc.onPostCommitFiberRoot(kc, e);
          } catch {
          }
        s = !0;
      }
      return s;
    } finally {
      C = o, pk.transition = i;
    }
  }
  return !1;
}
function Yk(e, i, o) {
  i = Ki(o, i), i = Oi(e, i, 1), e = dh(e, i, 1), i = L(), e !== null && (Ac(e, 1, i), Ek(e, i));
}
function W(e, i, o) {
  if (e.tag === 3)
    Yk(e, e, o);
  else
    for (; i !== null; ) {
      if (i.tag === 3) {
        Yk(i, e, o);
        break;
      } else if (i.tag === 1) {
        var s = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Si === null || !Si.has(s))) {
          e = Ki(o, e), e = Ri(i, e, 1), i = dh(i, e, 1), e = L(), i !== null && (Ac(i, 1, e), Ek(i, e));
          break;
        }
      }
      i = i.return;
    }
}
function Ui(e, i, o) {
  var s = e.pingCache;
  s !== null && s.delete(i), i = L(), e.pingedLanes |= e.suspendedLanes & o, R === e && (Z & o) === o && (T === 4 || T === 3 && (Z & 130023424) === Z && 500 > B() - gk ? Lk(e, 0) : sk |= o), Ek(e, i);
}
function Zk(e, i) {
  i === 0 && (e.mode & 1 ? (i = sc, sc <<= 1, !(sc & 130023424) && (sc = 4194304)) : i = 1);
  var o = L();
  e = Zg(e, i), e !== null && (Ac(e, i, o), Ek(e, o));
}
function vj(e) {
  var i = e.memoizedState, o = 0;
  i !== null && (o = i.retryLane), Zk(e, o);
}
function ck(e, i) {
  var o = 0;
  switch (e.tag) {
    case 13:
      var s = e.stateNode, d = e.memoizedState;
      d !== null && (o = d.retryLane);
      break;
    case 19:
      s = e.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  s !== null && s.delete(i), Zk(e, o);
}
var Wk;
Wk = function(e, i, o) {
  if (e !== null)
    if (e.memoizedProps !== i.pendingProps || Wf.current)
      Ug = !0;
    else {
      if (!(e.lanes & o) && !(i.flags & 128))
        return Ug = !1, zj(e, i, o);
      Ug = !!(e.flags & 131072);
    }
  else
    Ug = !1, I && i.flags & 1048576 && ug(i, ng, i.index);
  switch (i.lanes = 0, i.tag) {
    case 2:
      var s = i.type;
      jj(e, i), e = i.pendingProps;
      var d = Yf(i, H.current);
      Tg(i, o), d = Xh(null, i, s, e, d, o);
      var h = bi();
      return i.flags |= 1, typeof d == "object" && d !== null && typeof d.render == "function" && d.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, Zf(s) ? (h = !0, cg(i)) : h = !1, i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, ah(i), d.updater = nh, i.stateNode = d, d._reactInternals = i, rh(i, s, e, o), i = kj(null, i, s, !0, h, o)) : (i.tag = 0, I && h && vg(i), Yi(null, i, d, o), i = i.child), i;
    case 16:
      s = i.elementType;
      e: {
        switch (jj(e, i), e = i.pendingProps, d = s._init, s = d(s._payload), i.type = s, d = i.tag = $k(s), e = Lg(s, e), d) {
          case 0:
            i = dj(null, i, s, e, o);
            break e;
          case 1:
            i = ij(null, i, s, e, o);
            break e;
          case 11:
            i = Zi(null, i, s, e, o);
            break e;
          case 14:
            i = aj(null, i, s, Lg(s.type, e), o);
            break e;
        }
        throw Error(p(
          306,
          s,
          ""
        ));
      }
      return i;
    case 0:
      return s = i.type, d = i.pendingProps, d = i.elementType === s ? d : Lg(s, d), dj(e, i, s, d, o);
    case 1:
      return s = i.type, d = i.pendingProps, d = i.elementType === s ? d : Lg(s, d), ij(e, i, s, d, o);
    case 3:
      e: {
        if (lj(i), e === null)
          throw Error(p(387));
        s = i.pendingProps, h = i.memoizedState, d = h.element, bh(e, i), gh(i, s, null, o);
        var _ = i.memoizedState;
        if (s = _.element, h.isDehydrated)
          if (h = { element: s, isDehydrated: !1, cache: _.cache, pendingSuspenseBoundaries: _.pendingSuspenseBoundaries, transitions: _.transitions }, i.updateQueue.baseState = h, i.memoizedState = h, i.flags & 256) {
            d = Ki(Error(p(423)), i), i = mj(e, i, s, o, d);
            break e;
          } else if (s !== d) {
            d = Ki(Error(p(424)), i), i = mj(e, i, s, o, d);
            break e;
          } else
            for (yg = Lf(i.stateNode.containerInfo.firstChild), xg = i, I = !0, zg = null, o = Ch(i, null, s, o), i.child = o; o; )
              o.flags = o.flags & -3 | 4096, o = o.sibling;
        else {
          if (Ig(), s === d) {
            i = $i(e, i, o);
            break e;
          }
          Yi(e, i, s, o);
        }
        i = i.child;
      }
      return i;
    case 5:
      return Kh(i), e === null && Eg(i), s = i.type, d = i.pendingProps, h = e !== null ? e.memoizedProps : null, _ = d.children, Ef(s, d) ? _ = null : h !== null && Ef(s, h) && (i.flags |= 32), hj(e, i), Yi(e, i, _, o), i.child;
    case 6:
      return e === null && Eg(i), null;
    case 13:
      return pj(e, i, o);
    case 4:
      return Ih(i, i.stateNode.containerInfo), s = i.pendingProps, e === null ? i.child = Bh(i, null, s, o) : Yi(e, i, s, o), i.child;
    case 11:
      return s = i.type, d = i.pendingProps, d = i.elementType === s ? d : Lg(s, d), Zi(e, i, s, d, o);
    case 7:
      return Yi(e, i, i.pendingProps, o), i.child;
    case 8:
      return Yi(e, i, i.pendingProps.children, o), i.child;
    case 12:
      return Yi(e, i, i.pendingProps.children, o), i.child;
    case 10:
      e: {
        if (s = i.type._context, d = i.pendingProps, h = i.memoizedProps, _ = d.value, G(Mg, s._currentValue), s._currentValue = _, h !== null)
          if (He(h.value, _)) {
            if (h.children === d.children && !Wf.current) {
              i = $i(e, i, o);
              break e;
            }
          } else
            for (h = i.child, h !== null && (h.return = i); h !== null; ) {
              var b = h.dependencies;
              if (b !== null) {
                _ = h.child;
                for (var _e = b.firstContext; _e !== null; ) {
                  if (_e.context === s) {
                    if (h.tag === 1) {
                      _e = ch(-1, o & -o), _e.tag = 2;
                      var et = h.updateQueue;
                      if (et !== null) {
                        et = et.shared;
                        var ut = et.pending;
                        ut === null ? _e.next = _e : (_e.next = ut.next, ut.next = _e), et.pending = _e;
                      }
                    }
                    h.lanes |= o, _e = h.alternate, _e !== null && (_e.lanes |= o), Sg(
                      h.return,
                      o,
                      i
                    ), b.lanes |= o;
                    break;
                  }
                  _e = _e.next;
                }
              } else if (h.tag === 10)
                _ = h.type === i.type ? null : h.child;
              else if (h.tag === 18) {
                if (_ = h.return, _ === null)
                  throw Error(p(341));
                _.lanes |= o, b = _.alternate, b !== null && (b.lanes |= o), Sg(_, o, i), _ = h.sibling;
              } else
                _ = h.child;
              if (_ !== null)
                _.return = h;
              else
                for (_ = h; _ !== null; ) {
                  if (_ === i) {
                    _ = null;
                    break;
                  }
                  if (h = _.sibling, h !== null) {
                    h.return = _.return, _ = h;
                    break;
                  }
                  _ = _.return;
                }
              h = _;
            }
        Yi(e, i, d.children, o), i = i.child;
      }
      return i;
    case 9:
      return d = i.type, s = i.pendingProps.children, Tg(i, o), d = Vg(d), s = s(d), i.flags |= 1, Yi(e, i, s, o), i.child;
    case 14:
      return s = i.type, d = Lg(s, i.pendingProps), d = Lg(s.type, d), aj(e, i, s, d, o);
    case 15:
      return cj(e, i, i.type, i.pendingProps, o);
    case 17:
      return s = i.type, d = i.pendingProps, d = i.elementType === s ? d : Lg(s, d), jj(e, i), i.tag = 1, Zf(s) ? (e = !0, cg(i)) : e = !1, Tg(i, o), ph(i, s, d), rh(i, s, d, o), kj(null, i, s, !0, e, o);
    case 19:
      return yj(e, i, o);
    case 22:
      return ej(e, i, o);
  }
  throw Error(p(156, i.tag));
};
function Gk(e, i) {
  return ac(e, i);
}
function al(e, i, o, s) {
  this.tag = e, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Bg(e, i, o, s) {
  return new al(e, i, o, s);
}
function bj(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function $k(e) {
  if (typeof e == "function")
    return bj(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Da)
      return 11;
    if (e === Ga)
      return 14;
  }
  return 2;
}
function wh(e, i) {
  var o = e.alternate;
  return o === null ? (o = Bg(e.tag, i, e.key, e.mode), o.elementType = e.elementType, o.type = e.type, o.stateNode = e.stateNode, o.alternate = e, e.alternate = o) : (o.pendingProps = i, o.type = e.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = e.flags & 14680064, o.childLanes = e.childLanes, o.lanes = e.lanes, o.child = e.child, o.memoizedProps = e.memoizedProps, o.memoizedState = e.memoizedState, o.updateQueue = e.updateQueue, i = e.dependencies, o.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, o.sibling = e.sibling, o.index = e.index, o.ref = e.ref, o;
}
function yh(e, i, o, s, d, h) {
  var _ = 2;
  if (s = e, typeof e == "function")
    bj(e) && (_ = 1);
  else if (typeof e == "string")
    _ = 5;
  else
    e:
      switch (e) {
        case ya:
          return Ah(o.children, d, h, i);
        case za:
          _ = 8, d |= 8;
          break;
        case Aa:
          return e = Bg(12, o, i, d | 2), e.elementType = Aa, e.lanes = h, e;
        case Ea:
          return e = Bg(13, o, i, d), e.elementType = Ea, e.lanes = h, e;
        case Fa:
          return e = Bg(19, o, i, d), e.elementType = Fa, e.lanes = h, e;
        case Ia:
          return qj(o, d, h, i);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Ba:
                _ = 10;
                break e;
              case Ca:
                _ = 9;
                break e;
              case Da:
                _ = 11;
                break e;
              case Ga:
                _ = 14;
                break e;
              case Ha:
                _ = 16, s = null;
                break e;
            }
          throw Error(p(130, e == null ? e : typeof e, ""));
      }
  return i = Bg(_, o, i, d), i.elementType = e, i.type = s, i.lanes = h, i;
}
function Ah(e, i, o, s) {
  return e = Bg(7, e, s, i), e.lanes = o, e;
}
function qj(e, i, o, s) {
  return e = Bg(22, e, s, i), e.elementType = Ia, e.lanes = o, e.stateNode = { isHidden: !1 }, e;
}
function xh(e, i, o) {
  return e = Bg(6, e, null, i), e.lanes = o, e;
}
function zh(e, i, o) {
  return i = Bg(4, e.children !== null ? e.children : [], e.key, i), i.lanes = o, i.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, i;
}
function bl(e, i, o, s, d) {
  this.tag = i, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = zc(0), this.expirationTimes = zc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zc(0), this.identifierPrefix = s, this.onRecoverableError = d, this.mutableSourceEagerHydrationData = null;
}
function cl(e, i, o, s, d, h, _, b, _e) {
  return e = new bl(e, i, o, b, _e), i === 1 ? (i = 1, h === !0 && (i |= 8)) : i = 0, h = Bg(3, null, null, i), e.current = h, h.stateNode = e, h.memoizedState = { element: s, isDehydrated: o, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ah(h), e;
}
function dl(e, i, o) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: wa, key: s == null ? null : "" + s, children: e, containerInfo: i, implementation: o };
}
function el(e) {
  if (!e)
    return Vf;
  e = e._reactInternals;
  e: {
    if (Vb(e) !== e || e.tag !== 1)
      throw Error(p(170));
    var i = e;
    do {
      switch (i.tag) {
        case 3:
          i = i.stateNode.context;
          break e;
        case 1:
          if (Zf(i.type)) {
            i = i.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      i = i.return;
    } while (i !== null);
    throw Error(p(171));
  }
  if (e.tag === 1) {
    var o = e.type;
    if (Zf(o))
      return bg(e, o, i);
  }
  return i;
}
function fl(e, i, o, s, d, h, _, b, _e) {
  return e = cl(o, s, !0, e, d, h, _, b, _e), e.context = el(null), o = e.current, s = L(), d = lh(o), h = ch(s, d), h.callback = i ?? null, dh(o, h, d), e.current.lanes = d, Ac(e, d, s), Ek(e, s), e;
}
function gl(e, i, o, s) {
  var d = i.current, h = L(), _ = lh(d);
  return o = el(o), i.context === null ? i.context = o : i.pendingContext = o, i = ch(h, _), i.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (i.callback = s), e = dh(d, i, _), e !== null && (mh(e, d, _, h), eh(e, d, _)), _;
}
function hl(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function il(e, i) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var o = e.retryLane;
    e.retryLane = o !== 0 && o < i ? o : i;
  }
}
function jl(e, i) {
  il(e, i), (e = e.alternate) && il(e, i);
}
function kl() {
  return null;
}
var ll = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function ml(e) {
  this._internalRoot = e;
}
nl.prototype.render = ml.prototype.render = function(e) {
  var i = this._internalRoot;
  if (i === null)
    throw Error(p(409));
  gl(e, i, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var i = e.containerInfo;
    Sk(function() {
      gl(null, e, null, null);
    }), i[uf] = null;
  }
};
function nl(e) {
  this._internalRoot = e;
}
nl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var i = Hc();
    e = { blockedOn: null, target: e, priority: i };
    for (var o = 0; o < Qc.length && i !== 0 && i < Qc[o].priority; o++)
      ;
    Qc.splice(o, 0, e), o === 0 && Vc(e);
  }
};
function ol(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function pl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ql() {
}
function rl(e, i, o, s, d) {
  if (d) {
    if (typeof s == "function") {
      var h = s;
      s = function() {
        var et = hl(_);
        h.call(et);
      };
    }
    var _ = fl(i, s, e, 0, null, !1, !1, "", ql);
    return e._reactRootContainer = _, e[uf] = _.current, sf(e.nodeType === 8 ? e.parentNode : e), Sk(), _;
  }
  for (; d = e.lastChild; )
    e.removeChild(d);
  if (typeof s == "function") {
    var b = s;
    s = function() {
      var et = hl(_e);
      b.call(et);
    };
  }
  var _e = cl(e, 0, !1, null, null, !1, !1, "", ql);
  return e._reactRootContainer = _e, e[uf] = _e.current, sf(e.nodeType === 8 ? e.parentNode : e), Sk(function() {
    gl(i, _e, o, s);
  }), _e;
}
function sl(e, i, o, s, d) {
  var h = o._reactRootContainer;
  if (h) {
    var _ = h;
    if (typeof d == "function") {
      var b = d;
      d = function() {
        var _e = hl(_);
        b.call(_e);
      };
    }
    gl(i, _, e, d);
  } else
    _ = rl(o, i, e, d, s);
  return hl(_);
}
Ec = function(e) {
  switch (e.tag) {
    case 3:
      var i = e.stateNode;
      if (i.current.memoizedState.isDehydrated) {
        var o = tc(i.pendingLanes);
        o !== 0 && (Cc(i, o | 1), Ek(i, B()), !(K & 6) && (Hj = B() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var s = Zg(e, 1);
        if (s !== null) {
          var d = L();
          mh(s, e, 1, d);
        }
      }), jl(e, 1);
  }
};
Fc = function(e) {
  if (e.tag === 13) {
    var i = Zg(e, 134217728);
    if (i !== null) {
      var o = L();
      mh(i, e, 134217728, o);
    }
    jl(e, 134217728);
  }
};
Gc = function(e) {
  if (e.tag === 13) {
    var i = lh(e), o = Zg(e, i);
    if (o !== null) {
      var s = L();
      mh(o, e, i, s);
    }
    jl(e, i);
  }
};
Hc = function() {
  return C;
};
Ic = function(e, i) {
  var o = C;
  try {
    return C = e, i();
  } finally {
    C = o;
  }
};
yb = function(e, i, o) {
  switch (i) {
    case "input":
      if (bb(e, o), i = o.name, o.type === "radio" && i != null) {
        for (o = e; o.parentNode; )
          o = o.parentNode;
        for (o = o.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < o.length; i++) {
          var s = o[i];
          if (s !== e && s.form === e.form) {
            var d = Db(s);
            if (!d)
              throw Error(p(90));
            Wa(s), bb(s, d);
          }
        }
      }
      break;
    case "textarea":
      ib(e, o);
      break;
    case "select":
      i = o.value, i != null && fb(e, !!o.multiple, i, !1);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: !1, Events: [Cb, ue, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Zb(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(e, i) {
  var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ol(i))
    throw Error(p(200));
  return dl(e, i, null, o);
};
reactDom_production_min.createRoot = function(e, i) {
  if (!ol(e))
    throw Error(p(299));
  var o = !1, s = "", d = ll;
  return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onRecoverableError !== void 0 && (d = i.onRecoverableError)), i = cl(e, 1, !1, null, null, o, !1, s, d), e[uf] = i.current, sf(e.nodeType === 8 ? e.parentNode : e), new ml(i);
};
reactDom_production_min.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var i = e._reactInternals;
  if (i === void 0)
    throw typeof e.render == "function" ? Error(p(188)) : (e = Object.keys(e).join(","), Error(p(268, e)));
  return e = Zb(i), e = e === null ? null : e.stateNode, e;
};
reactDom_production_min.flushSync = function(e) {
  return Sk(e);
};
reactDom_production_min.hydrate = function(e, i, o) {
  if (!pl(i))
    throw Error(p(200));
  return sl(null, e, i, !0, o);
};
reactDom_production_min.hydrateRoot = function(e, i, o) {
  if (!ol(e))
    throw Error(p(405));
  var s = o != null && o.hydratedSources || null, d = !1, h = "", _ = ll;
  if (o != null && (o.unstable_strictMode === !0 && (d = !0), o.identifierPrefix !== void 0 && (h = o.identifierPrefix), o.onRecoverableError !== void 0 && (_ = o.onRecoverableError)), i = fl(i, null, e, 1, o ?? null, d, !1, h, _), e[uf] = i.current, sf(e), s)
    for (e = 0; e < s.length; e++)
      o = s[e], d = o._getVersion, d = d(o._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [o, d] : i.mutableSourceEagerHydrationData.push(
        o,
        d
      );
  return new nl(i);
};
reactDom_production_min.render = function(e, i, o) {
  if (!pl(i))
    throw Error(p(200));
  return sl(null, e, i, !1, o);
};
reactDom_production_min.unmountComponentAtNode = function(e) {
  if (!pl(e))
    throw Error(p(40));
  return e._reactRootContainer ? (Sk(function() {
    sl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[uf] = null;
    });
  }), !0) : !1;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(e, i, o, s) {
  if (!pl(o))
    throw Error(p(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(p(38));
  return sl(e, i, o, !1, s);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
(function(e) {
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (o) {
        console.error(o);
      }
  }
  i(), e.exports = reactDom_production_min;
})(reactDom);
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
var buildExports = {}, build = {
  get exports() {
    return buildExports;
  },
  set exports(e) {
    buildExports = e;
  }
};
(function(e, i) {
  (function(s, d) {
    e.exports = d(reactExports);
  })(commonjsGlobal, function(o) {
    return (
      /******/
      function(s) {
        var d = {};
        function h(_) {
          if (d[_])
            return d[_].exports;
          var b = d[_] = {
            /******/
            i: _,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return s[_].call(b.exports, b, b.exports, h), b.l = !0, b.exports;
        }
        return h.m = s, h.c = d, h.d = function(_, b, _e) {
          h.o(_, b) || Object.defineProperty(_, b, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: _e
            /******/
          });
        }, h.n = function(_) {
          var b = _ && _.__esModule ? (
            /******/
            function() {
              return _.default;
            }
          ) : (
            /******/
            function() {
              return _;
            }
          );
          return h.d(b, "a", b), b;
        }, h.o = function(_, b) {
          return Object.prototype.hasOwnProperty.call(_, b);
        }, h.p = "/", h(h.s = 11);
      }([
        /* 0 */
        /***/
        function(s, d, h) {
          (function(_) {
            s.exports = h(16)();
          }).call(d, h(2));
        },
        /* 1 */
        /***/
        function(s, d) {
          s.exports = o;
        },
        /* 2 */
        /***/
        function(s, d) {
          var h = s.exports = {}, _, b;
          function _e() {
            throw new Error("setTimeout has not been defined");
          }
          function et() {
            throw new Error("clearTimeout has not been defined");
          }
          (function() {
            try {
              typeof setTimeout == "function" ? _ = setTimeout : _ = _e;
            } catch {
              _ = _e;
            }
            try {
              typeof clearTimeout == "function" ? b = clearTimeout : b = et;
            } catch {
              b = et;
            }
          })();
          function ut(at) {
            if (_ === setTimeout)
              return setTimeout(at, 0);
            if ((_ === _e || !_) && setTimeout)
              return _ = setTimeout, setTimeout(at, 0);
            try {
              return _(at, 0);
            } catch {
              try {
                return _.call(null, at, 0);
              } catch {
                return _.call(this, at, 0);
              }
            }
          }
          function st(at) {
            if (b === clearTimeout)
              return clearTimeout(at);
            if ((b === et || !b) && clearTimeout)
              return b = clearTimeout, clearTimeout(at);
            try {
              return b(at);
            } catch {
              try {
                return b.call(null, at);
              } catch {
                return b.call(this, at);
              }
            }
          }
          var ct = [], mt = !1, pt, vt = -1;
          function ht() {
            !mt || !pt || (mt = !1, pt.length ? ct = pt.concat(ct) : vt = -1, ct.length && nt());
          }
          function nt() {
            if (!mt) {
              var at = ut(ht);
              mt = !0;
              for (var St = ct.length; St; ) {
                for (pt = ct, ct = []; ++vt < St; )
                  pt && pt[vt].run();
                vt = -1, St = ct.length;
              }
              pt = null, mt = !1, st(at);
            }
          }
          h.nextTick = function(at) {
            var St = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var _t = 1; _t < arguments.length; _t++)
                St[_t - 1] = arguments[_t];
            ct.push(new ot(at, St)), ct.length === 1 && !mt && ut(nt);
          };
          function ot(at, St) {
            this.fun = at, this.array = St;
          }
          ot.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {};
          function it() {
          }
          h.on = it, h.addListener = it, h.once = it, h.off = it, h.removeListener = it, h.removeAllListeners = it, h.emit = it, h.prependListener = it, h.prependOnceListener = it, h.listeners = function(at) {
            return [];
          }, h.binding = function(at) {
            throw new Error("process.binding is not supported");
          }, h.cwd = function() {
            return "/";
          }, h.chdir = function(at) {
            throw new Error("process.chdir is not supported");
          }, h.umask = function() {
            return 0;
          };
        },
        /* 3 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.default = function(_) {
            return _.reduce(function(b, _e) {
              return b + _e;
            }) / _.length;
          };
        },
        /* 4 */
        /***/
        function(s, d, h) {
          function _(_e) {
            return function() {
              return _e;
            };
          }
          var b = function() {
          };
          b.thatReturns = _, b.thatReturnsFalse = _(!1), b.thatReturnsTrue = _(!0), b.thatReturnsNull = _(null), b.thatReturnsThis = function() {
            return this;
          }, b.thatReturnsArgument = function(_e) {
            return _e;
          }, s.exports = b;
        },
        /* 5 */
        /***/
        function(s, d, h) {
          (function(_) {
            function b(_e, et, ut, st, ct, mt, pt, vt) {
              if (!_e) {
                var ht;
                if (et === void 0)
                  ht = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                  var nt = [ut, st, ct, mt, pt, vt], ot = 0;
                  ht = new Error(et.replace(/%s/g, function() {
                    return nt[ot++];
                  })), ht.name = "Invariant Violation";
                }
                throw ht.framesToPop = 1, ht;
              }
            }
            s.exports = b;
          }).call(d, h(2));
        },
        /* 6 */
        /***/
        function(s, d, h) {
          var _ = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
          s.exports = _;
        },
        /* 7 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.default = function(_) {
            return Math.min.apply(Math, _);
          };
        },
        /* 8 */
        /***/
        function(s, d, h) {
          (function(_) {
            var b = h(4), _e = b;
            s.exports = _e;
          }).call(d, h(2));
        },
        /* 9 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.default = function(_) {
            return Math.max.apply(Math, _);
          };
        },
        /* 10 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = h(3), b = _e(_);
          function _e(et) {
            return et && et.__esModule ? et : { default: et };
          }
          d.default = function(et) {
            var ut = (0, b.default)(et), st = et.map(function(mt) {
              return Math.pow(mt - ut, 2);
            }), ct = (0, b.default)(st);
            return Math.sqrt(ct);
          };
        },
        /* 11 */
        /***/
        function(s, d, h) {
          s.exports = h(12);
        },
        /* 12 */
        /***/
        function(s, d, h) {
          s.exports = h(13);
        },
        /* 13 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.SparklinesText = d.SparklinesNormalBand = d.SparklinesReferenceLine = d.SparklinesSpots = d.SparklinesBars = d.SparklinesCurve = d.SparklinesLine = d.Sparklines = void 0;
          var _ = function() {
            function Gt(Mt, Ct) {
              for (var It = 0; It < Ct.length; It++) {
                var jt = Ct[It];
                jt.enumerable = jt.enumerable || !1, jt.configurable = !0, "value" in jt && (jt.writable = !0), Object.defineProperty(Mt, jt.key, jt);
              }
            }
            return function(Mt, Ct, It) {
              return Ct && Gt(Mt.prototype, Ct), It && Gt(Mt, It), Mt;
            };
          }(), b = h(0), _e = Ft(b), et = h(1), ut = Ft(et), st = h(17), ct = Ft(st), mt = h(18), pt = Ft(mt), vt = h(19), ht = Ft(vt), nt = h(20), ot = Ft(nt), it = h(21), at = Ft(it), St = h(22), _t = Ft(St), xt = h(27), Tt = Ft(xt), Lt = h(28), $t = Ft(Lt);
          function Ft(Gt) {
            return Gt && Gt.__esModule ? Gt : { default: Gt };
          }
          function nn(Gt, Mt) {
            if (!(Gt instanceof Mt))
              throw new TypeError("Cannot call a class as a function");
          }
          function an(Gt, Mt) {
            if (!Gt)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return Mt && (typeof Mt == "object" || typeof Mt == "function") ? Mt : Gt;
          }
          function pn(Gt, Mt) {
            if (typeof Mt != "function" && Mt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof Mt);
            Gt.prototype = Object.create(Mt && Mt.prototype, { constructor: { value: Gt, enumerable: !1, writable: !0, configurable: !0 } }), Mt && (Object.setPrototypeOf ? Object.setPrototypeOf(Gt, Mt) : Gt.__proto__ = Mt);
          }
          var wn = function(Gt) {
            pn(Mt, Gt);
            function Mt(Ct) {
              return nn(this, Mt), an(this, (Mt.__proto__ || Object.getPrototypeOf(Mt)).call(this, Ct));
            }
            return _(Mt, [{
              key: "render",
              value: function() {
                var It = this.props, jt = It.data, Yt = It.limit, Pt = It.width, Dt = It.height, Xt = It.svgWidth, Jt = It.svgHeight, Wt = It.preserveAspectRatio, rn = It.margin, en = It.style, on = It.max, fn = It.min;
                if (jt.length === 0)
                  return null;
                var cn = (0, $t.default)({ data: jt, limit: Yt, width: Pt, height: Dt, margin: rn, max: on, min: fn }), _n = { style: en, viewBox: "0 0 " + Pt + " " + Dt, preserveAspectRatio: Wt };
                return Xt > 0 && (_n.width = Xt), Jt > 0 && (_n.height = Jt), ut.default.createElement(
                  "svg",
                  _n,
                  ut.default.Children.map(this.props.children, function(Tr) {
                    return ut.default.cloneElement(Tr, { data: jt, points: cn, width: Pt, height: Dt, margin: rn });
                  })
                );
              }
            }]), Mt;
          }(et.PureComponent);
          wn.propTypes = {
            data: _e.default.array,
            limit: _e.default.number,
            width: _e.default.number,
            height: _e.default.number,
            svgWidth: _e.default.number,
            svgHeight: _e.default.number,
            preserveAspectRatio: _e.default.string,
            margin: _e.default.number,
            style: _e.default.object,
            min: _e.default.number,
            max: _e.default.number,
            onMouseMove: _e.default.func
          }, wn.defaultProps = {
            data: [],
            width: 240,
            height: 60,
            //Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
            preserveAspectRatio: "none",
            //https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
            margin: 2
          }, d.Sparklines = wn, d.SparklinesLine = pt.default, d.SparklinesCurve = ht.default, d.SparklinesBars = ot.default, d.SparklinesSpots = at.default, d.SparklinesReferenceLine = _t.default, d.SparklinesNormalBand = Tt.default, d.SparklinesText = ct.default;
        },
        /* 14 */
        /***/
        function(s, d, h) {
          (function(_) {
            var b = h(4), _e = h(5), et = h(8), ut = h(6), st = h(15);
            s.exports = function(ct, mt) {
              var pt = typeof Symbol == "function" && Symbol.iterator, vt = "@@iterator";
              function ht(Pt) {
                var Dt = Pt && (pt && Pt[pt] || Pt[vt]);
                if (typeof Dt == "function")
                  return Dt;
              }
              var nt = "<<anonymous>>", ot = {
                array: _t("array"),
                bool: _t("boolean"),
                func: _t("function"),
                number: _t("number"),
                object: _t("object"),
                string: _t("string"),
                symbol: _t("symbol"),
                any: xt(),
                arrayOf: Tt,
                element: Lt(),
                instanceOf: $t,
                node: pn(),
                objectOf: nn,
                oneOf: Ft,
                oneOfType: an,
                shape: wn
              };
              function it(Pt, Dt) {
                return Pt === Dt ? Pt !== 0 || 1 / Pt === 1 / Dt : Pt !== Pt && Dt !== Dt;
              }
              function at(Pt) {
                this.message = Pt, this.stack = "";
              }
              at.prototype = Error.prototype;
              function St(Pt) {
                function Dt(Jt, Wt, rn, en, on, fn, cn) {
                  return en = en || nt, fn = fn || rn, cn !== ut && mt && _e(
                    !1,
                    "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
                  ), Wt[rn] == null ? Jt ? Wt[rn] === null ? new at("The " + on + " `" + fn + "` is marked as required " + ("in `" + en + "`, but its value is `null`.")) : new at("The " + on + " `" + fn + "` is marked as required in " + ("`" + en + "`, but its value is `undefined`.")) : null : Pt(Wt, rn, en, on, fn);
                }
                var Xt = Dt.bind(null, !1);
                return Xt.isRequired = Dt.bind(null, !0), Xt;
              }
              function _t(Pt) {
                function Dt(Xt, Jt, Wt, rn, en, on) {
                  var fn = Xt[Jt], cn = Ct(fn);
                  if (cn !== Pt) {
                    var _n = It(fn);
                    return new at("Invalid " + rn + " `" + en + "` of type " + ("`" + _n + "` supplied to `" + Wt + "`, expected ") + ("`" + Pt + "`."));
                  }
                  return null;
                }
                return St(Dt);
              }
              function xt() {
                return St(b.thatReturnsNull);
              }
              function Tt(Pt) {
                function Dt(Xt, Jt, Wt, rn, en) {
                  if (typeof Pt != "function")
                    return new at("Property `" + en + "` of component `" + Wt + "` has invalid PropType notation inside arrayOf.");
                  var on = Xt[Jt];
                  if (!Array.isArray(on)) {
                    var fn = Ct(on);
                    return new at("Invalid " + rn + " `" + en + "` of type " + ("`" + fn + "` supplied to `" + Wt + "`, expected an array."));
                  }
                  for (var cn = 0; cn < on.length; cn++) {
                    var _n = Pt(on, cn, Wt, rn, en + "[" + cn + "]", ut);
                    if (_n instanceof Error)
                      return _n;
                  }
                  return null;
                }
                return St(Dt);
              }
              function Lt() {
                function Pt(Dt, Xt, Jt, Wt, rn) {
                  var en = Dt[Xt];
                  if (!ct(en)) {
                    var on = Ct(en);
                    return new at("Invalid " + Wt + " `" + rn + "` of type " + ("`" + on + "` supplied to `" + Jt + "`, expected a single ReactElement."));
                  }
                  return null;
                }
                return St(Pt);
              }
              function $t(Pt) {
                function Dt(Xt, Jt, Wt, rn, en) {
                  if (!(Xt[Jt] instanceof Pt)) {
                    var on = Pt.name || nt, fn = Yt(Xt[Jt]);
                    return new at("Invalid " + rn + " `" + en + "` of type " + ("`" + fn + "` supplied to `" + Wt + "`, expected ") + ("instance of `" + on + "`."));
                  }
                  return null;
                }
                return St(Dt);
              }
              function Ft(Pt) {
                if (!Array.isArray(Pt))
                  return b.thatReturnsNull;
                function Dt(Xt, Jt, Wt, rn, en) {
                  for (var on = Xt[Jt], fn = 0; fn < Pt.length; fn++)
                    if (it(on, Pt[fn]))
                      return null;
                  var cn = JSON.stringify(Pt);
                  return new at("Invalid " + rn + " `" + en + "` of value `" + on + "` " + ("supplied to `" + Wt + "`, expected one of " + cn + "."));
                }
                return St(Dt);
              }
              function nn(Pt) {
                function Dt(Xt, Jt, Wt, rn, en) {
                  if (typeof Pt != "function")
                    return new at("Property `" + en + "` of component `" + Wt + "` has invalid PropType notation inside objectOf.");
                  var on = Xt[Jt], fn = Ct(on);
                  if (fn !== "object")
                    return new at("Invalid " + rn + " `" + en + "` of type " + ("`" + fn + "` supplied to `" + Wt + "`, expected an object."));
                  for (var cn in on)
                    if (on.hasOwnProperty(cn)) {
                      var _n = Pt(on, cn, Wt, rn, en + "." + cn, ut);
                      if (_n instanceof Error)
                        return _n;
                    }
                  return null;
                }
                return St(Dt);
              }
              function an(Pt) {
                if (!Array.isArray(Pt))
                  return b.thatReturnsNull;
                for (var Dt = 0; Dt < Pt.length; Dt++) {
                  var Xt = Pt[Dt];
                  if (typeof Xt != "function")
                    return et(
                      !1,
                      "Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",
                      jt(Xt),
                      Dt
                    ), b.thatReturnsNull;
                }
                function Jt(Wt, rn, en, on, fn) {
                  for (var cn = 0; cn < Pt.length; cn++) {
                    var _n = Pt[cn];
                    if (_n(Wt, rn, en, on, fn, ut) == null)
                      return null;
                  }
                  return new at("Invalid " + on + " `" + fn + "` supplied to " + ("`" + en + "`."));
                }
                return St(Jt);
              }
              function pn() {
                function Pt(Dt, Xt, Jt, Wt, rn) {
                  return Gt(Dt[Xt]) ? null : new at("Invalid " + Wt + " `" + rn + "` supplied to " + ("`" + Jt + "`, expected a ReactNode."));
                }
                return St(Pt);
              }
              function wn(Pt) {
                function Dt(Xt, Jt, Wt, rn, en) {
                  var on = Xt[Jt], fn = Ct(on);
                  if (fn !== "object")
                    return new at("Invalid " + rn + " `" + en + "` of type `" + fn + "` " + ("supplied to `" + Wt + "`, expected `object`."));
                  for (var cn in Pt) {
                    var _n = Pt[cn];
                    if (_n) {
                      var Tr = _n(on, cn, Wt, rn, en + "." + cn, ut);
                      if (Tr)
                        return Tr;
                    }
                  }
                  return null;
                }
                return St(Dt);
              }
              function Gt(Pt) {
                switch (typeof Pt) {
                  case "number":
                  case "string":
                  case "undefined":
                    return !0;
                  case "boolean":
                    return !Pt;
                  case "object":
                    if (Array.isArray(Pt))
                      return Pt.every(Gt);
                    if (Pt === null || ct(Pt))
                      return !0;
                    var Dt = ht(Pt);
                    if (Dt) {
                      var Xt = Dt.call(Pt), Jt;
                      if (Dt !== Pt.entries) {
                        for (; !(Jt = Xt.next()).done; )
                          if (!Gt(Jt.value))
                            return !1;
                      } else
                        for (; !(Jt = Xt.next()).done; ) {
                          var Wt = Jt.value;
                          if (Wt && !Gt(Wt[1]))
                            return !1;
                        }
                    } else
                      return !1;
                    return !0;
                  default:
                    return !1;
                }
              }
              function Mt(Pt, Dt) {
                return Pt === "symbol" || Dt["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && Dt instanceof Symbol;
              }
              function Ct(Pt) {
                var Dt = typeof Pt;
                return Array.isArray(Pt) ? "array" : Pt instanceof RegExp ? "object" : Mt(Dt, Pt) ? "symbol" : Dt;
              }
              function It(Pt) {
                if (typeof Pt > "u" || Pt === null)
                  return "" + Pt;
                var Dt = Ct(Pt);
                if (Dt === "object") {
                  if (Pt instanceof Date)
                    return "date";
                  if (Pt instanceof RegExp)
                    return "regexp";
                }
                return Dt;
              }
              function jt(Pt) {
                var Dt = It(Pt);
                switch (Dt) {
                  case "array":
                  case "object":
                    return "an " + Dt;
                  case "boolean":
                  case "date":
                  case "regexp":
                    return "a " + Dt;
                  default:
                    return Dt;
                }
              }
              function Yt(Pt) {
                return !Pt.constructor || !Pt.constructor.name ? nt : Pt.constructor.name;
              }
              return ot.checkPropTypes = st, ot.PropTypes = ot, ot;
            };
          }).call(d, h(2));
        },
        /* 15 */
        /***/
        function(s, d, h) {
          (function(_) {
            function b(_e, et, ut, st, ct) {
            }
            s.exports = b;
          }).call(d, h(2));
        },
        /* 16 */
        /***/
        function(s, d, h) {
          var _ = h(4), b = h(5), _e = h(6);
          s.exports = function() {
            function et(ct, mt, pt, vt, ht, nt) {
              nt !== _e && b(
                !1,
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
            }
            et.isRequired = et;
            function ut() {
              return et;
            }
            var st = {
              array: et,
              bool: et,
              func: et,
              number: et,
              object: et,
              string: et,
              symbol: et,
              any: et,
              arrayOf: ut,
              element: et,
              instanceOf: ut,
              node: et,
              objectOf: ut,
              oneOf: ut,
              oneOfType: ut,
              shape: ut
            };
            return st.checkPropTypes = _, st.PropTypes = st, st;
          };
        },
        /* 17 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function ht(nt, ot) {
              for (var it = 0; it < ot.length; it++) {
                var at = ot[it];
                at.enumerable = at.enumerable || !1, at.configurable = !0, "value" in at && (at.writable = !0), Object.defineProperty(nt, at.key, at);
              }
            }
            return function(nt, ot, it) {
              return ot && ht(nt.prototype, ot), it && ht(nt, it), nt;
            };
          }(), b = h(0), _e = st(b), et = h(1), ut = st(et);
          function st(ht) {
            return ht && ht.__esModule ? ht : { default: ht };
          }
          function ct(ht, nt) {
            if (!(ht instanceof nt))
              throw new TypeError("Cannot call a class as a function");
          }
          function mt(ht, nt) {
            if (!ht)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return nt && (typeof nt == "object" || typeof nt == "function") ? nt : ht;
          }
          function pt(ht, nt) {
            if (typeof nt != "function" && nt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof nt);
            ht.prototype = Object.create(nt && nt.prototype, { constructor: { value: ht, enumerable: !1, writable: !0, configurable: !0 } }), nt && (Object.setPrototypeOf ? Object.setPrototypeOf(ht, nt) : ht.__proto__ = nt);
          }
          var vt = function(ht) {
            pt(nt, ht);
            function nt() {
              return ct(this, nt), mt(this, (nt.__proto__ || Object.getPrototypeOf(nt)).apply(this, arguments));
            }
            return _(nt, [{
              key: "render",
              value: function() {
                var it = this.props, at = it.point, St = it.text, _t = it.fontSize, xt = it.fontFamily, Tt = at.x, Lt = at.y;
                return ut.default.createElement(
                  "g",
                  null,
                  ut.default.createElement(
                    "text",
                    { x: Tt, y: Lt, fontFamily: xt || "Verdana", fontSize: _t || 10 },
                    St
                  )
                );
              }
            }]), nt;
          }(ut.default.Component);
          vt.propTypes = {
            text: _e.default.string,
            point: _e.default.object,
            fontSize: _e.default.number,
            fontFamily: _e.default.string
          }, vt.defaultProps = {
            text: "",
            point: { x: 0, y: 0 }
          }, d.default = vt;
        },
        /* 18 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function ht(nt, ot) {
              for (var it = 0; it < ot.length; it++) {
                var at = ot[it];
                at.enumerable = at.enumerable || !1, at.configurable = !0, "value" in at && (at.writable = !0), Object.defineProperty(nt, at.key, at);
              }
            }
            return function(nt, ot, it) {
              return ot && ht(nt.prototype, ot), it && ht(nt, it), nt;
            };
          }(), b = h(0), _e = st(b), et = h(1), ut = st(et);
          function st(ht) {
            return ht && ht.__esModule ? ht : { default: ht };
          }
          function ct(ht, nt) {
            if (!(ht instanceof nt))
              throw new TypeError("Cannot call a class as a function");
          }
          function mt(ht, nt) {
            if (!ht)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return nt && (typeof nt == "object" || typeof nt == "function") ? nt : ht;
          }
          function pt(ht, nt) {
            if (typeof nt != "function" && nt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof nt);
            ht.prototype = Object.create(nt && nt.prototype, { constructor: { value: ht, enumerable: !1, writable: !0, configurable: !0 } }), nt && (Object.setPrototypeOf ? Object.setPrototypeOf(ht, nt) : ht.__proto__ = nt);
          }
          var vt = function(ht) {
            pt(nt, ht);
            function nt() {
              return ct(this, nt), mt(this, (nt.__proto__ || Object.getPrototypeOf(nt)).apply(this, arguments));
            }
            return _(nt, [{
              key: "render",
              value: function() {
                var it = this.props, at = it.data, St = it.points;
                it.width;
                var _t = it.height, xt = it.margin, Tt = it.color, Lt = it.style, $t = it.onMouseMove, Ft = St.map(function(Mt) {
                  return [Mt.x, Mt.y];
                }).reduce(function(Mt, Ct) {
                  return Mt.concat(Ct);
                }), nn = [St[St.length - 1].x, _t - xt, xt, _t - xt, xt, St[0].y], an = Ft.concat(nn), pn = {
                  stroke: Tt || Lt.stroke || "slategray",
                  strokeWidth: Lt.strokeWidth || "1",
                  strokeLinejoin: Lt.strokeLinejoin || "round",
                  strokeLinecap: Lt.strokeLinecap || "round",
                  fill: "none"
                }, wn = {
                  stroke: Lt.stroke || "none",
                  strokeWidth: "0",
                  fillOpacity: Lt.fillOpacity || ".1",
                  fill: Lt.fill || Tt || "slategray",
                  pointerEvents: "auto"
                }, Gt = St.map(function(Mt, Ct) {
                  return ut.default.createElement("circle", {
                    key: Ct,
                    cx: Mt.x,
                    cy: Mt.y,
                    r: 2,
                    style: wn,
                    onMouseEnter: function(jt) {
                      return $t("enter", at[Ct], Mt);
                    },
                    onClick: function(jt) {
                      return $t("click", at[Ct], Mt);
                    }
                  });
                });
                return ut.default.createElement(
                  "g",
                  null,
                  Gt,
                  ut.default.createElement("polyline", { points: an.join(" "), style: wn }),
                  ut.default.createElement("polyline", { points: Ft.join(" "), style: pn })
                );
              }
            }]), nt;
          }(ut.default.Component);
          vt.propTypes = {
            color: _e.default.string,
            style: _e.default.object
          }, vt.defaultProps = {
            style: {},
            onMouseMove: function() {
            }
          }, d.default = vt;
        },
        /* 19 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function ht(nt, ot) {
              for (var it = 0; it < ot.length; it++) {
                var at = ot[it];
                at.enumerable = at.enumerable || !1, at.configurable = !0, "value" in at && (at.writable = !0), Object.defineProperty(nt, at.key, at);
              }
            }
            return function(nt, ot, it) {
              return ot && ht(nt.prototype, ot), it && ht(nt, it), nt;
            };
          }(), b = h(0), _e = st(b), et = h(1), ut = st(et);
          function st(ht) {
            return ht && ht.__esModule ? ht : { default: ht };
          }
          function ct(ht, nt) {
            if (!(ht instanceof nt))
              throw new TypeError("Cannot call a class as a function");
          }
          function mt(ht, nt) {
            if (!ht)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return nt && (typeof nt == "object" || typeof nt == "function") ? nt : ht;
          }
          function pt(ht, nt) {
            if (typeof nt != "function" && nt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof nt);
            ht.prototype = Object.create(nt && nt.prototype, { constructor: { value: ht, enumerable: !1, writable: !0, configurable: !0 } }), nt && (Object.setPrototypeOf ? Object.setPrototypeOf(ht, nt) : ht.__proto__ = nt);
          }
          var vt = function(ht) {
            pt(nt, ht);
            function nt() {
              return ct(this, nt), mt(this, (nt.__proto__ || Object.getPrototypeOf(nt)).apply(this, arguments));
            }
            return _(nt, [{
              key: "render",
              value: function() {
                var it = this.props, at = it.points;
                it.width;
                var St = it.height, _t = it.margin, xt = it.color, Tt = it.style, Lt = it.divisor, $t = Lt === void 0 ? 0.25 : Lt, Ft = void 0, nn = function(It) {
                  var jt = void 0;
                  if (!Ft)
                    jt = [It.x, It.y];
                  else {
                    var Yt = (It.x - Ft.x) * $t;
                    jt = [
                      "C",
                      //x1
                      Ft.x + Yt,
                      //y1
                      Ft.y,
                      //x2,
                      It.x - Yt,
                      //y2,
                      It.y,
                      //x,
                      It.x,
                      //y
                      It.y
                    ];
                  }
                  return Ft = It, jt;
                }, an = at.map(function(Ct) {
                  return nn(Ct);
                }).reduce(function(Ct, It) {
                  return Ct.concat(It);
                }), pn = ["L" + at[at.length - 1].x, St - _t, _t, St - _t, _t, at[0].y], wn = an.concat(pn), Gt = {
                  stroke: xt || Tt.stroke || "slategray",
                  strokeWidth: Tt.strokeWidth || "1",
                  strokeLinejoin: Tt.strokeLinejoin || "round",
                  strokeLinecap: Tt.strokeLinecap || "round",
                  fill: "none"
                }, Mt = {
                  stroke: Tt.stroke || "none",
                  strokeWidth: "0",
                  fillOpacity: Tt.fillOpacity || ".1",
                  fill: Tt.fill || xt || "slategray"
                };
                return ut.default.createElement(
                  "g",
                  null,
                  ut.default.createElement("path", { d: "M" + wn.join(" "), style: Mt }),
                  ut.default.createElement("path", { d: "M" + an.join(" "), style: Gt })
                );
              }
            }]), nt;
          }(ut.default.Component);
          vt.propTypes = {
            color: _e.default.string,
            style: _e.default.object
          }, vt.defaultProps = {
            style: {}
          }, d.default = vt;
        },
        /* 20 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function ht(nt, ot) {
              for (var it = 0; it < ot.length; it++) {
                var at = ot[it];
                at.enumerable = at.enumerable || !1, at.configurable = !0, "value" in at && (at.writable = !0), Object.defineProperty(nt, at.key, at);
              }
            }
            return function(nt, ot, it) {
              return ot && ht(nt.prototype, ot), it && ht(nt, it), nt;
            };
          }(), b = h(0), _e = st(b), et = h(1), ut = st(et);
          function st(ht) {
            return ht && ht.__esModule ? ht : { default: ht };
          }
          function ct(ht, nt) {
            if (!(ht instanceof nt))
              throw new TypeError("Cannot call a class as a function");
          }
          function mt(ht, nt) {
            if (!ht)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return nt && (typeof nt == "object" || typeof nt == "function") ? nt : ht;
          }
          function pt(ht, nt) {
            if (typeof nt != "function" && nt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof nt);
            ht.prototype = Object.create(nt && nt.prototype, { constructor: { value: ht, enumerable: !1, writable: !0, configurable: !0 } }), nt && (Object.setPrototypeOf ? Object.setPrototypeOf(ht, nt) : ht.__proto__ = nt);
          }
          var vt = function(ht) {
            pt(nt, ht);
            function nt() {
              return ct(this, nt), mt(this, (nt.__proto__ || Object.getPrototypeOf(nt)).apply(this, arguments));
            }
            return _(nt, [{
              key: "render",
              value: function() {
                var it = this, at = this.props, St = at.points, _t = at.height, xt = at.style, Tt = at.barWidth, Lt = at.margin, $t = at.onMouseMove, Ft = 1 * (xt && xt.strokeWidth || 0), nn = Lt ? 2 * Lt : 0, an = Tt || (St && St.length >= 2 ? Math.max(0, St[1].x - St[0].x - Ft - nn) : 0);
                return ut.default.createElement(
                  "g",
                  { transform: "scale(1,-1)" },
                  St.map(function(pn, wn) {
                    return ut.default.createElement("rect", {
                      key: wn,
                      x: pn.x - (an + Ft) / 2,
                      y: -_t,
                      width: an,
                      height: Math.max(0, _t - pn.y),
                      style: xt,
                      onMouseMove: $t && $t.bind(it, pn)
                    });
                  })
                );
              }
            }]), nt;
          }(ut.default.Component);
          vt.propTypes = {
            points: _e.default.arrayOf(_e.default.object),
            height: _e.default.number,
            style: _e.default.object,
            barWidth: _e.default.number,
            margin: _e.default.number,
            onMouseMove: _e.default.func
          }, vt.defaultProps = {
            style: { fill: "slategray" }
          }, d.default = vt;
        },
        /* 21 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function ht(nt, ot) {
              for (var it = 0; it < ot.length; it++) {
                var at = ot[it];
                at.enumerable = at.enumerable || !1, at.configurable = !0, "value" in at && (at.writable = !0), Object.defineProperty(nt, at.key, at);
              }
            }
            return function(nt, ot, it) {
              return ot && ht(nt.prototype, ot), it && ht(nt, it), nt;
            };
          }(), b = h(0), _e = st(b), et = h(1), ut = st(et);
          function st(ht) {
            return ht && ht.__esModule ? ht : { default: ht };
          }
          function ct(ht, nt) {
            if (!(ht instanceof nt))
              throw new TypeError("Cannot call a class as a function");
          }
          function mt(ht, nt) {
            if (!ht)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return nt && (typeof nt == "object" || typeof nt == "function") ? nt : ht;
          }
          function pt(ht, nt) {
            if (typeof nt != "function" && nt !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof nt);
            ht.prototype = Object.create(nt && nt.prototype, { constructor: { value: ht, enumerable: !1, writable: !0, configurable: !0 } }), nt && (Object.setPrototypeOf ? Object.setPrototypeOf(ht, nt) : ht.__proto__ = nt);
          }
          var vt = function(ht) {
            pt(nt, ht);
            function nt() {
              return ct(this, nt), mt(this, (nt.__proto__ || Object.getPrototypeOf(nt)).apply(this, arguments));
            }
            return _(nt, [{
              key: "lastDirection",
              value: function(it) {
                return Math.sign = Math.sign || function(at) {
                  return at > 0 ? 1 : -1;
                }, it.length < 2 ? 0 : Math.sign(it[it.length - 2].y - it[it.length - 1].y);
              }
            }, {
              key: "render",
              value: function() {
                var it = this.props, at = it.points;
                it.width, it.height;
                var St = it.size, _t = it.style, xt = it.spotColors, Tt = ut.default.createElement("circle", {
                  cx: at[0].x,
                  cy: at[0].y,
                  r: St,
                  style: _t
                }), Lt = ut.default.createElement("circle", {
                  cx: at[at.length - 1].x,
                  cy: at[at.length - 1].y,
                  r: St,
                  style: _t || { fill: xt[this.lastDirection(at)] }
                });
                return ut.default.createElement(
                  "g",
                  null,
                  _t && Tt,
                  Lt
                );
              }
            }]), nt;
          }(ut.default.Component);
          vt.propTypes = {
            size: _e.default.number,
            style: _e.default.object,
            spotColors: _e.default.object
          }, vt.defaultProps = {
            size: 2,
            spotColors: {
              "-1": "red",
              0: "black",
              1: "green"
            }
          }, d.default = vt;
        },
        /* 22 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function it(at, St) {
              for (var _t = 0; _t < St.length; _t++) {
                var xt = St[_t];
                xt.enumerable = xt.enumerable || !1, xt.configurable = !0, "value" in xt && (xt.writable = !0), Object.defineProperty(at, xt.key, xt);
              }
            }
            return function(at, St, _t) {
              return St && it(at.prototype, St), _t && it(at, _t), at;
            };
          }(), b = h(0), _e = pt(b), et = h(1), ut = pt(et), st = h(23), ct = mt(st);
          function mt(it) {
            if (it && it.__esModule)
              return it;
            var at = {};
            if (it != null)
              for (var St in it)
                Object.prototype.hasOwnProperty.call(it, St) && (at[St] = it[St]);
            return at.default = it, at;
          }
          function pt(it) {
            return it && it.__esModule ? it : { default: it };
          }
          function vt(it, at) {
            if (!(it instanceof at))
              throw new TypeError("Cannot call a class as a function");
          }
          function ht(it, at) {
            if (!it)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return at && (typeof at == "object" || typeof at == "function") ? at : it;
          }
          function nt(it, at) {
            if (typeof at != "function" && at !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof at);
            it.prototype = Object.create(at && at.prototype, { constructor: { value: it, enumerable: !1, writable: !0, configurable: !0 } }), at && (Object.setPrototypeOf ? Object.setPrototypeOf(it, at) : it.__proto__ = at);
          }
          var ot = function(it) {
            nt(at, it);
            function at() {
              return vt(this, at), ht(this, (at.__proto__ || Object.getPrototypeOf(at)).apply(this, arguments));
            }
            return _(at, [{
              key: "render",
              value: function() {
                var _t = this.props, xt = _t.points, Tt = _t.margin, Lt = _t.type, $t = _t.style, Ft = _t.value, nn = xt.map(function(pn) {
                  return pn.y;
                }), an = Lt == "custom" ? Ft : ct[Lt](nn);
                return ut.default.createElement("line", {
                  x1: xt[0].x,
                  y1: an + Tt,
                  x2: xt[xt.length - 1].x,
                  y2: an + Tt,
                  style: $t
                });
              }
            }]), at;
          }(ut.default.Component);
          ot.propTypes = {
            type: _e.default.oneOf(["max", "min", "mean", "avg", "median", "custom"]),
            value: _e.default.number,
            style: _e.default.object
          }, ot.defaultProps = {
            type: "mean",
            style: { stroke: "red", strokeOpacity: 0.75, strokeDasharray: "2, 2" }
          }, d.default = ot;
        },
        /* 23 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.variance = d.stdev = d.median = d.midRange = d.avg = d.mean = d.max = d.min = void 0;
          var _ = h(7), b = ot(_), _e = h(3), et = ot(_e), ut = h(24), st = ot(ut), ct = h(25), mt = ot(ct), pt = h(10), vt = ot(pt), ht = h(26), nt = ot(ht);
          function ot(it) {
            return it && it.__esModule ? it : { default: it };
          }
          d.min = b.default, d.max = b.default, d.mean = et.default, d.avg = et.default, d.midRange = st.default, d.median = mt.default, d.stdev = vt.default, d.variance = nt.default;
        },
        /* 24 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = h(7), b = ut(_), _e = h(9), et = ut(_e);
          function ut(st) {
            return st && st.__esModule ? st : { default: st };
          }
          d.default = function(st) {
            return (0, et.default)(st) - (0, b.default)(st) / 2;
          };
        },
        /* 25 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          }), d.default = function(_) {
            return _.sort(function(b, _e) {
              return b - _e;
            })[Math.floor(_.length / 2)];
          };
        },
        /* 26 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = h(3), b = _e(_);
          function _e(et) {
            return et && et.__esModule ? et : { default: et };
          }
          d.default = function(et) {
            var ut = (0, b.default)(et), st = et.map(function(ct) {
              return Math.pow(ct - ut, 2);
            });
            return (0, b.default)(st);
          };
        },
        /* 27 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = function() {
            function at(St, _t) {
              for (var xt = 0; xt < _t.length; xt++) {
                var Tt = _t[xt];
                Tt.enumerable = Tt.enumerable || !1, Tt.configurable = !0, "value" in Tt && (Tt.writable = !0), Object.defineProperty(St, Tt.key, Tt);
              }
            }
            return function(St, _t, xt) {
              return _t && at(St.prototype, _t), xt && at(St, xt), St;
            };
          }(), b = h(0), _e = vt(b), et = h(1), ut = vt(et), st = h(3), ct = vt(st), mt = h(10), pt = vt(mt);
          function vt(at) {
            return at && at.__esModule ? at : { default: at };
          }
          function ht(at, St) {
            if (!(at instanceof St))
              throw new TypeError("Cannot call a class as a function");
          }
          function nt(at, St) {
            if (!at)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return St && (typeof St == "object" || typeof St == "function") ? St : at;
          }
          function ot(at, St) {
            if (typeof St != "function" && St !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof St);
            at.prototype = Object.create(St && St.prototype, { constructor: { value: at, enumerable: !1, writable: !0, configurable: !0 } }), St && (Object.setPrototypeOf ? Object.setPrototypeOf(at, St) : at.__proto__ = St);
          }
          var it = function(at) {
            ot(St, at);
            function St() {
              return ht(this, St), nt(this, (St.__proto__ || Object.getPrototypeOf(St)).apply(this, arguments));
            }
            return _(St, [{
              key: "render",
              value: function() {
                var xt = this.props, Tt = xt.points, Lt = xt.margin, $t = xt.style, Ft = Tt.map(function(pn) {
                  return pn.y;
                }), nn = (0, ct.default)(Ft), an = (0, pt.default)(Ft);
                return ut.default.createElement("rect", {
                  x: Tt[0].x,
                  y: nn - an + Lt,
                  width: Tt[Tt.length - 1].x - Tt[0].x,
                  height: pt.default * 2,
                  style: $t
                });
              }
            }]), St;
          }(ut.default.Component);
          it.propTypes = {
            style: _e.default.object
          }, it.defaultProps = {
            style: { fill: "red", fillOpacity: 0.1 }
          }, d.default = it;
        },
        /* 28 */
        /***/
        function(s, d, h) {
          Object.defineProperty(d, "__esModule", {
            value: !0
          });
          var _ = h(7), b = ut(_), _e = h(9), et = ut(_e);
          function ut(st) {
            return st && st.__esModule ? st : { default: st };
          }
          d.default = function(st) {
            var ct = st.data, mt = st.limit, pt = st.width, vt = pt === void 0 ? 1 : pt, ht = st.height, nt = ht === void 0 ? 1 : ht, ot = st.margin, it = ot === void 0 ? 0 : ot, at = st.max, St = at === void 0 ? (0, et.default)(ct) : at, _t = st.min, xt = _t === void 0 ? (0, b.default)(ct) : _t, Tt = ct.length;
            mt && mt < Tt && (ct = ct.slice(Tt - mt));
            var Lt = (nt - it * 2) / (St - xt || 2), $t = (vt - it * 2) / ((mt || Tt) - (Tt > 1 ? 1 : 0));
            return ct.map(function(Ft, nn) {
              return {
                x: nn * $t + it,
                y: (St === xt ? 1 : St - Ft) * Lt + it
              };
            });
          };
        }
        /******/
      ])
    );
  });
})(build);
const getHeatmapColor = function(e) {
  var i = 0, o = 0, s = 0, d = 1;
  return e > 0.5 && (i = parseInt(256 * (e - 0.5) * 2)), e < 0.5 && (o = parseInt((0.5 - e) * 2 * 256)), "rgba(" + [i, o, s, d].join(",") + ")";
};
class FilterInput extends React.Component {
  constructor(i) {
    super(i), this.onParamSelectChanged = this.onParamSelectChanged.bind(this), this.onRangeValueChanged = this.onRangeValueChanged.bind(this), this.onInputValueChanged = this.onInputValueChanged.bind(this);
  }
  /** Returns a figure space padded version of the current value. */
  getPaddedValue() {
    let i = this.props.max, o = this.props.value;
    if (i == null)
      return o;
    o == null && (o = "");
    let s = i.toString().length - o.toString().length;
    return (isNaN(s) || s < 0) && (s = 0), " ".repeat(s) + o;
  }
  /**
   * Triggered whenever the select element changes.  Dispatches the
   * change action in a generic way, including the filter base parameter
   * name by way of the provided singular change handler.
   */
  onParamSelectChanged(i) {
    this.props.onChange(this.props.param.name, i.target.value);
  }
  /**
   * Triggered whenever the value changes and it is a range input.
   * Dispatches the change action in a generic way, including the
   * filter base parameter name by way of the provided singular
   * change handler.
   */
  onRangeValueChanged(i) {
    this.props.onChange(this.props.param.name, i.target.value);
  }
  /**
   * Triggered whenever the value changes and it is regular input.
   * Dispatches the change action in a generic way, including the
   * filter base parameter name by way of the provided singular
   * change handler.
   */
  onInputValueChanged(i) {
    this.props.onChange(this.props.param.name, i.target.value);
  }
  render() {
    let i = this.props.param;
    return i.values ? /* @__PURE__ */ jsx(
      "select",
      {
        name: i.name,
        onChange: this.onParamSelectChanged,
        title: i.title ? i.title : "",
        children: i.values.map((o) => /* @__PURE__ */ jsx(
          "option",
          {
            value: o,
            children: o
          },
          o
        ))
      }
    ) : this.props.min != null && this.props.max != null ? /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("span", { children: this.getPaddedValue() }),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: i.name,
          type: "range",
          min: this.props.min,
          max: this.props.max,
          onChange: this.onRangeValueChanged,
          title: i.title ? i.title : ""
        }
      )
    ] }) : /* @__PURE__ */ jsx(
      "input",
      {
        name: i.name,
        type: i.type,
        min: this.props.min,
        max: this.props.max,
        onChange: this.onInputValueChanged,
        title: i.title ? i.title : ""
      }
    );
  }
}
const config = {};
class ParadeFilter extends React.Component {
  constructor(e) {
    super(e), this.state = {
      filterParams: []
    }, this.handleFilterInput = this.handleFilterInput.bind(this);
  }
  componentDidMount() {
    var url = config.indexUrl + "filters/script/" + this.props.name + "/";
    this.props.parentType === "plate" ? (url += "?plate=" + this.props.parentId, this.props.fieldId !== void 0 && (url += "&field=" + this.props.fieldId)) : this.props.parentType === "dataset" ? url += "?dataset=" + this.props.parentId : this.props.parentType === "project" ? url += "?project=" + this.props.parentId : url += "?" + this.props.images.map((e) => "image=" + e.id).join("&"), $.getJSON(url, function(data) {
      if (data.f) {
        var f = eval(data.f), filterValues = data.params.reduce((e, i) => (e[i.name] = i.default, e), {});
        this.props.handleFilterLoaded(this.props.filterIndex, f, filterValues), this.setState({
          filterParams: data.params
        });
      }
    }.bind(this));
  }
  handleFilterInput(e, i) {
    let o = this.state.filterParams.filter((d) => d.name === e)[0];
    o.histograms && this.setState({
      histogram: o.histograms[i]
    }), o.minima && this.setState({
      minimum: o.minima[i]
    }), o.maxima && this.setState({
      maximum: o.maxima[i]
    });
    let s = {};
    s[e] = i, o.maxima && o.minima !== void 0 && (s.count = void 0), this.props.handleFilterChange(this.props.filterIndex, s);
  }
  render() {
    return /* @__PURE__ */ jsxs("div", { className: "parade_filter", children: [
      /* @__PURE__ */ jsxs("div", { className: "parade_filter_controls", children: [
        this.props.name,
        this.state.filterParams.map((e) => /* @__PURE__ */ jsx(
          FilterInput,
          {
            param: e,
            min: this.state.minimum,
            max: this.state.maximum,
            onChange: this.handleFilterInput,
            value: this.props.filterValues[e.name]
          },
          e.name
        ))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sparkline", children: [
        /* @__PURE__ */ jsx("span", { className: "minimum", children: this.state.minimum }),
        /* @__PURE__ */ jsx(buildExports.Sparklines, { data: this.state.histogram, children: /* @__PURE__ */ jsx(buildExports.SparklinesBars, {}) }),
        /* @__PURE__ */ jsx("span", { className: "maximum", children: this.state.maximum })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "parade_removeFilter",
          onClick: () => {
            this.props.handleRemoveFilter(this.props.filterIndex);
          },
          children: "X"
        }
      )
    ] });
  }
}
class FilterContainer extends React.Component {
  constructor(i) {
    super(i), this.state = {
      filters: []
    }, this.handleAddFilter = this.handleAddFilter.bind(this);
  }
  componentDidMount() {
    let i = config.filtersUrl;
    this.props.parentType && this.props.parentId ? i += "?" + this.props.parentType + "=" + this.props.parentId : i += "?" + this.props.images.map((o) => "image=" + o.id).join("&"), $.ajax({
      url: i,
      dataType: "json",
      cache: !1,
      success: (o) => {
        this.setState({
          filters: o.data
        });
      }
    });
  }
  handleAddFilter(i) {
    var o = i.target.value;
    o !== "--" && this.props.addFilter(o);
  }
  render() {
    return /* @__PURE__ */ jsxs("div", { className: "filterContainer", children: [
      /* @__PURE__ */ jsxs("select", { value: "--", onChange: this.handleAddFilter, children: [
        /* @__PURE__ */ jsx(
          "option",
          {
            value: "--",
            children: "Add filter..."
          }
        ),
        this.state.filters.map(function(i, o) {
          return /* @__PURE__ */ jsx(
            "option",
            {
              value: i,
              children: i
            },
            o
          );
        })
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      this.props.filterNames.map((i, o) => /* @__PURE__ */ jsx(
        ParadeFilter,
        {
          filterIndex: o,
          filterValues: this.props.filterValues[o],
          name: i,
          parentType: this.props.parentType,
          parentId: this.props.parentId,
          fieldId: this.props.fieldId,
          images: this.props.images,
          handleFilterLoaded: this.props.handleFilterLoaded,
          handleFilterChange: this.props.handleFilterChange,
          handleRemoveFilter: this.props.handleRemoveFilter
        },
        i + o
      ))
    ] });
  }
}
var lodashExports = {}, lodash = {
  get exports() {
    return lodashExports;
  },
  set exports(e) {
    lodashExports = e;
  }
};
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(e, i) {
  (function() {
    var o, s = "4.17.21", d = 200, h = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", _ = "Expected a function", b = "Invalid `variable` option passed into `_.template`", _e = "__lodash_hash_undefined__", et = 500, ut = "__lodash_placeholder__", st = 1, ct = 2, mt = 4, pt = 1, vt = 2, ht = 1, nt = 2, ot = 4, it = 8, at = 16, St = 32, _t = 64, xt = 128, Tt = 256, Lt = 512, $t = 30, Ft = "...", nn = 800, an = 16, pn = 1, wn = 2, Gt = 3, Mt = 1 / 0, Ct = 9007199254740991, It = 17976931348623157e292, jt = 0 / 0, Yt = 4294967295, Pt = Yt - 1, Dt = Yt >>> 1, Xt = [
      ["ary", xt],
      ["bind", ht],
      ["bindKey", nt],
      ["curry", it],
      ["curryRight", at],
      ["flip", Lt],
      ["partial", St],
      ["partialRight", _t],
      ["rearg", Tt]
    ], Jt = "[object Arguments]", Wt = "[object Array]", rn = "[object AsyncFunction]", en = "[object Boolean]", on = "[object Date]", fn = "[object DOMException]", cn = "[object Error]", _n = "[object Function]", Tr = "[object GeneratorFunction]", Xn = "[object Map]", qr = "[object Number]", gm = "[object Null]", ar = "[object Object]", Hu = "[object Promise]", mm = "[object Proxy]", Xr = "[object RegExp]", Zn = "[object Set]", Zr = "[object String]", yo = "[object Symbol]", ym = "[object Undefined]", _i = "[object WeakMap]", vm = "[object WeakSet]", eo = "[object ArrayBuffer]", Dr = "[object DataView]", Tl = "[object Float32Array]", Al = "[object Float64Array]", Cl = "[object Int8Array]", Pl = "[object Int16Array]", Il = "[object Int32Array]", Rl = "[object Uint8Array]", $l = "[object Uint8ClampedArray]", Nl = "[object Uint16Array]", Ll = "[object Uint32Array]", Sm = /\b__p \+= '';/g, wm = /\b(__p \+=) '' \+/g, _m = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Vu = /&(?:amp|lt|gt|quot|#39);/g, Gu = /[&<>"']/g, xm = RegExp(Vu.source), Em = RegExp(Gu.source), km = /<%-([\s\S]+?)%>/g, Om = /<%([\s\S]+?)%>/g, Ku = /<%=([\s\S]+?)%>/g, Tm = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Am = /^\w*$/, Cm = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Dl = /[\\^$.*+?()[\]{}|]/g, Pm = RegExp(Dl.source), Ml = /^\s+/, Im = /\s/, Rm = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, $m = /\{\n\/\* \[wrapped with (.+)\] \*/, Nm = /,? & /, Lm = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, jm = /[()=,{}\[\]\/\s]/, Dm = /\\(\\)?/g, bm = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Qu = /\w*$/, Mm = /^[-+]0x[0-9a-f]+$/i, Fm = /^0b[01]+$/i, zm = /^\[object .+?Constructor\]$/, Bm = /^0o[0-7]+$/i, Um = /^(?:0|[1-9]\d*)$/, Wm = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, vo = /($^)/, Hm = /['\n\r\u2028\u2029\\]/g, So = "\\ud800-\\udfff", Vm = "\\u0300-\\u036f", Gm = "\\ufe20-\\ufe2f", Km = "\\u20d0-\\u20ff", Yu = Vm + Gm + Km, Ju = "\\u2700-\\u27bf", qu = "a-z\\xdf-\\xf6\\xf8-\\xff", Qm = "\\xac\\xb1\\xd7\\xf7", Ym = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Jm = "\\u2000-\\u206f", qm = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Xu = "A-Z\\xc0-\\xd6\\xd8-\\xde", Zu = "\\ufe0e\\ufe0f", es = Qm + Ym + Jm + qm, Fl = "['’]", Xm = "[" + So + "]", ts = "[" + es + "]", wo = "[" + Yu + "]", ns = "\\d+", Zm = "[" + Ju + "]", rs = "[" + qu + "]", is = "[^" + So + es + ns + Ju + qu + Xu + "]", zl = "\\ud83c[\\udffb-\\udfff]", ey = "(?:" + wo + "|" + zl + ")", os = "[^" + So + "]", Bl = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ul = "[\\ud800-\\udbff][\\udc00-\\udfff]", br = "[" + Xu + "]", ls = "\\u200d", as = "(?:" + rs + "|" + is + ")", ty = "(?:" + br + "|" + is + ")", us = "(?:" + Fl + "(?:d|ll|m|re|s|t|ve))?", ss = "(?:" + Fl + "(?:D|LL|M|RE|S|T|VE))?", fs = ey + "?", cs = "[" + Zu + "]?", ny = "(?:" + ls + "(?:" + [os, Bl, Ul].join("|") + ")" + cs + fs + ")*", ry = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", iy = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ds = cs + fs + ny, oy = "(?:" + [Zm, Bl, Ul].join("|") + ")" + ds, ly = "(?:" + [os + wo + "?", wo, Bl, Ul, Xm].join("|") + ")", ay = RegExp(Fl, "g"), uy = RegExp(wo, "g"), Wl = RegExp(zl + "(?=" + zl + ")|" + ly + ds, "g"), sy = RegExp([
      br + "?" + rs + "+" + us + "(?=" + [ts, br, "$"].join("|") + ")",
      ty + "+" + ss + "(?=" + [ts, br + as, "$"].join("|") + ")",
      br + "?" + as + "+" + us,
      br + "+" + ss,
      iy,
      ry,
      ns,
      oy
    ].join("|"), "g"), fy = RegExp("[" + ls + So + Yu + Zu + "]"), cy = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, dy = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], py = -1, mn = {};
    mn[Tl] = mn[Al] = mn[Cl] = mn[Pl] = mn[Il] = mn[Rl] = mn[$l] = mn[Nl] = mn[Ll] = !0, mn[Jt] = mn[Wt] = mn[eo] = mn[en] = mn[Dr] = mn[on] = mn[cn] = mn[_n] = mn[Xn] = mn[qr] = mn[ar] = mn[Xr] = mn[Zn] = mn[Zr] = mn[_i] = !1;
    var gn = {};
    gn[Jt] = gn[Wt] = gn[eo] = gn[Dr] = gn[en] = gn[on] = gn[Tl] = gn[Al] = gn[Cl] = gn[Pl] = gn[Il] = gn[Xn] = gn[qr] = gn[ar] = gn[Xr] = gn[Zn] = gn[Zr] = gn[yo] = gn[Rl] = gn[$l] = gn[Nl] = gn[Ll] = !0, gn[cn] = gn[_n] = gn[_i] = !1;
    var hy = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, gy = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, my = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, yy = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, vy = parseFloat, Sy = parseInt, ps = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, wy = typeof self == "object" && self && self.Object === Object && self, An = ps || wy || Function("return this")(), Hl = i && !i.nodeType && i, Ar = Hl && !0 && e && !e.nodeType && e, hs = Ar && Ar.exports === Hl, Vl = hs && ps.process, Hn = function() {
      try {
        var gt = Ar && Ar.require && Ar.require("util").types;
        return gt || Vl && Vl.binding && Vl.binding("util");
      } catch {
      }
    }(), gs = Hn && Hn.isArrayBuffer, ms = Hn && Hn.isDate, ys = Hn && Hn.isMap, vs = Hn && Hn.isRegExp, Ss = Hn && Hn.isSet, ws = Hn && Hn.isTypedArray;
    function Mn(gt, Et, wt) {
      switch (wt.length) {
        case 0:
          return gt.call(Et);
        case 1:
          return gt.call(Et, wt[0]);
        case 2:
          return gt.call(Et, wt[0], wt[1]);
        case 3:
          return gt.call(Et, wt[0], wt[1], wt[2]);
      }
      return gt.apply(Et, wt);
    }
    function _y(gt, Et, wt, Nt) {
      for (var Ht = -1, un = gt == null ? 0 : gt.length; ++Ht < un; ) {
        var kn = gt[Ht];
        Et(Nt, kn, wt(kn), gt);
      }
      return Nt;
    }
    function Vn(gt, Et) {
      for (var wt = -1, Nt = gt == null ? 0 : gt.length; ++wt < Nt && Et(gt[wt], wt, gt) !== !1; )
        ;
      return gt;
    }
    function xy(gt, Et) {
      for (var wt = gt == null ? 0 : gt.length; wt-- && Et(gt[wt], wt, gt) !== !1; )
        ;
      return gt;
    }
    function _s(gt, Et) {
      for (var wt = -1, Nt = gt == null ? 0 : gt.length; ++wt < Nt; )
        if (!Et(gt[wt], wt, gt))
          return !1;
      return !0;
    }
    function yr(gt, Et) {
      for (var wt = -1, Nt = gt == null ? 0 : gt.length, Ht = 0, un = []; ++wt < Nt; ) {
        var kn = gt[wt];
        Et(kn, wt, gt) && (un[Ht++] = kn);
      }
      return un;
    }
    function _o(gt, Et) {
      var wt = gt == null ? 0 : gt.length;
      return !!wt && Mr(gt, Et, 0) > -1;
    }
    function Gl(gt, Et, wt) {
      for (var Nt = -1, Ht = gt == null ? 0 : gt.length; ++Nt < Ht; )
        if (wt(Et, gt[Nt]))
          return !0;
      return !1;
    }
    function yn(gt, Et) {
      for (var wt = -1, Nt = gt == null ? 0 : gt.length, Ht = Array(Nt); ++wt < Nt; )
        Ht[wt] = Et(gt[wt], wt, gt);
      return Ht;
    }
    function vr(gt, Et) {
      for (var wt = -1, Nt = Et.length, Ht = gt.length; ++wt < Nt; )
        gt[Ht + wt] = Et[wt];
      return gt;
    }
    function Kl(gt, Et, wt, Nt) {
      var Ht = -1, un = gt == null ? 0 : gt.length;
      for (Nt && un && (wt = gt[++Ht]); ++Ht < un; )
        wt = Et(wt, gt[Ht], Ht, gt);
      return wt;
    }
    function Ey(gt, Et, wt, Nt) {
      var Ht = gt == null ? 0 : gt.length;
      for (Nt && Ht && (wt = gt[--Ht]); Ht--; )
        wt = Et(wt, gt[Ht], Ht, gt);
      return wt;
    }
    function Ql(gt, Et) {
      for (var wt = -1, Nt = gt == null ? 0 : gt.length; ++wt < Nt; )
        if (Et(gt[wt], wt, gt))
          return !0;
      return !1;
    }
    var ky = Yl("length");
    function Oy(gt) {
      return gt.split("");
    }
    function Ty(gt) {
      return gt.match(Lm) || [];
    }
    function xs(gt, Et, wt) {
      var Nt;
      return wt(gt, function(Ht, un, kn) {
        if (Et(Ht, un, kn))
          return Nt = un, !1;
      }), Nt;
    }
    function xo(gt, Et, wt, Nt) {
      for (var Ht = gt.length, un = wt + (Nt ? 1 : -1); Nt ? un-- : ++un < Ht; )
        if (Et(gt[un], un, gt))
          return un;
      return -1;
    }
    function Mr(gt, Et, wt) {
      return Et === Et ? My(gt, Et, wt) : xo(gt, Es, wt);
    }
    function Ay(gt, Et, wt, Nt) {
      for (var Ht = wt - 1, un = gt.length; ++Ht < un; )
        if (Nt(gt[Ht], Et))
          return Ht;
      return -1;
    }
    function Es(gt) {
      return gt !== gt;
    }
    function ks(gt, Et) {
      var wt = gt == null ? 0 : gt.length;
      return wt ? Xl(gt, Et) / wt : jt;
    }
    function Yl(gt) {
      return function(Et) {
        return Et == null ? o : Et[gt];
      };
    }
    function Jl(gt) {
      return function(Et) {
        return gt == null ? o : gt[Et];
      };
    }
    function Os(gt, Et, wt, Nt, Ht) {
      return Ht(gt, function(un, kn, hn) {
        wt = Nt ? (Nt = !1, un) : Et(wt, un, kn, hn);
      }), wt;
    }
    function Cy(gt, Et) {
      var wt = gt.length;
      for (gt.sort(Et); wt--; )
        gt[wt] = gt[wt].value;
      return gt;
    }
    function Xl(gt, Et) {
      for (var wt, Nt = -1, Ht = gt.length; ++Nt < Ht; ) {
        var un = Et(gt[Nt]);
        un !== o && (wt = wt === o ? un : wt + un);
      }
      return wt;
    }
    function Zl(gt, Et) {
      for (var wt = -1, Nt = Array(gt); ++wt < gt; )
        Nt[wt] = Et(wt);
      return Nt;
    }
    function Py(gt, Et) {
      return yn(Et, function(wt) {
        return [wt, gt[wt]];
      });
    }
    function Ts(gt) {
      return gt && gt.slice(0, Is(gt) + 1).replace(Ml, "");
    }
    function Fn(gt) {
      return function(Et) {
        return gt(Et);
      };
    }
    function na(gt, Et) {
      return yn(Et, function(wt) {
        return gt[wt];
      });
    }
    function to(gt, Et) {
      return gt.has(Et);
    }
    function As(gt, Et) {
      for (var wt = -1, Nt = gt.length; ++wt < Nt && Mr(Et, gt[wt], 0) > -1; )
        ;
      return wt;
    }
    function Cs(gt, Et) {
      for (var wt = gt.length; wt-- && Mr(Et, gt[wt], 0) > -1; )
        ;
      return wt;
    }
    function Iy(gt, Et) {
      for (var wt = gt.length, Nt = 0; wt--; )
        gt[wt] === Et && ++Nt;
      return Nt;
    }
    var Ry = Jl(hy), $y = Jl(gy);
    function Ny(gt) {
      return "\\" + yy[gt];
    }
    function Ly(gt, Et) {
      return gt == null ? o : gt[Et];
    }
    function Fr(gt) {
      return fy.test(gt);
    }
    function jy(gt) {
      return cy.test(gt);
    }
    function Dy(gt) {
      for (var Et, wt = []; !(Et = gt.next()).done; )
        wt.push(Et.value);
      return wt;
    }
    function ga(gt) {
      var Et = -1, wt = Array(gt.size);
      return gt.forEach(function(Nt, Ht) {
        wt[++Et] = [Ht, Nt];
      }), wt;
    }
    function Ps(gt, Et) {
      return function(wt) {
        return gt(Et(wt));
      };
    }
    function Sr(gt, Et) {
      for (var wt = -1, Nt = gt.length, Ht = 0, un = []; ++wt < Nt; ) {
        var kn = gt[wt];
        (kn === Et || kn === ut) && (gt[wt] = ut, un[Ht++] = wt);
      }
      return un;
    }
    function Eo(gt) {
      var Et = -1, wt = Array(gt.size);
      return gt.forEach(function(Nt) {
        wt[++Et] = Nt;
      }), wt;
    }
    function by(gt) {
      var Et = -1, wt = Array(gt.size);
      return gt.forEach(function(Nt) {
        wt[++Et] = [Nt, Nt];
      }), wt;
    }
    function My(gt, Et, wt) {
      for (var Nt = wt - 1, Ht = gt.length; ++Nt < Ht; )
        if (gt[Nt] === Et)
          return Nt;
      return -1;
    }
    function Fy(gt, Et, wt) {
      for (var Nt = wt + 1; Nt--; )
        if (gt[Nt] === Et)
          return Nt;
      return Nt;
    }
    function zr(gt) {
      return Fr(gt) ? By(gt) : ky(gt);
    }
    function er(gt) {
      return Fr(gt) ? Uy(gt) : Oy(gt);
    }
    function Is(gt) {
      for (var Et = gt.length; Et-- && Im.test(gt.charAt(Et)); )
        ;
      return Et;
    }
    var zy = Jl(my);
    function By(gt) {
      for (var Et = Wl.lastIndex = 0; Wl.test(gt); )
        ++Et;
      return Et;
    }
    function Uy(gt) {
      return gt.match(Wl) || [];
    }
    function Wy(gt) {
      return gt.match(sy) || [];
    }
    var Hy = function gt(Et) {
      Et = Et == null ? An : Br.defaults(An.Object(), Et, Br.pick(An, dy));
      var wt = Et.Array, Nt = Et.Date, Ht = Et.Error, un = Et.Function, kn = Et.Math, hn = Et.Object, _a = Et.RegExp, Vy = Et.String, Gn = Et.TypeError, ko = wt.prototype, Gy = un.prototype, Ur = hn.prototype, Oo = Et["__core-js_shared__"], To = Gy.toString, dn = Ur.hasOwnProperty, Ky = 0, Rs = function() {
        var a = /[^.]+$/.exec(Oo && Oo.keys && Oo.keys.IE_PROTO || "");
        return a ? "Symbol(src)_1." + a : "";
      }(), Ao = Ur.toString, Qy = To.call(hn), Yy = An._, Jy = _a(
        "^" + To.call(dn).replace(Dl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Co = hs ? Et.Buffer : o, wr = Et.Symbol, Po = Et.Uint8Array, $s = Co ? Co.allocUnsafe : o, Io = Ps(hn.getPrototypeOf, hn), Ns = hn.create, Ls = Ur.propertyIsEnumerable, Ro = ko.splice, js = wr ? wr.isConcatSpreadable : o, no = wr ? wr.iterator : o, Cr = wr ? wr.toStringTag : o, $o = function() {
        try {
          var a = Nr(hn, "defineProperty");
          return a({}, "", {}), a;
        } catch {
        }
      }(), qy = Et.clearTimeout !== An.clearTimeout && Et.clearTimeout, Xy = Nt && Nt.now !== An.Date.now && Nt.now, Zy = Et.setTimeout !== An.setTimeout && Et.setTimeout, No = kn.ceil, Lo = kn.floor, xa = hn.getOwnPropertySymbols, ev = Co ? Co.isBuffer : o, Ds = Et.isFinite, tv = ko.join, nv = Ps(hn.keys, hn), On = kn.max, Pn = kn.min, rv = Nt.now, iv = Et.parseInt, bs = kn.random, ov = ko.reverse, $a = Nr(Et, "DataView"), ro = Nr(Et, "Map"), ba = Nr(Et, "Promise"), Wr = Nr(Et, "Set"), io = Nr(Et, "WeakMap"), oo = Nr(hn, "create"), jo = io && new io(), Hr = {}, lv = Lr($a), av = Lr(ro), uv = Lr(ba), sv = Lr(Wr), fv = Lr(io), Do = wr ? wr.prototype : o, lo = Do ? Do.valueOf : o, Ms = Do ? Do.toString : o;
      function rt(a) {
        if (Sn(a) && !Vt(a) && !(a instanceof tn)) {
          if (a instanceof Kn)
            return a;
          if (dn.call(a, "__wrapped__"))
            return Dp(a);
        }
        return new Kn(a);
      }
      var Vr = function() {
        function a() {
        }
        return function(c) {
          if (!vn(c))
            return {};
          if (Ns)
            return Ns(c);
          a.prototype = c;
          var g = new a();
          return a.prototype = o, g;
        };
      }();
      function bo() {
      }
      function Kn(a, c) {
        this.__wrapped__ = a, this.__actions__ = [], this.__chain__ = !!c, this.__index__ = 0, this.__values__ = o;
      }
      rt.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: km,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Om,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Ku,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: rt
        }
      }, rt.prototype = bo.prototype, rt.prototype.constructor = rt, Kn.prototype = Vr(bo.prototype), Kn.prototype.constructor = Kn;
      function tn(a) {
        this.__wrapped__ = a, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Yt, this.__views__ = [];
      }
      function cv() {
        var a = new tn(this.__wrapped__);
        return a.__actions__ = Ln(this.__actions__), a.__dir__ = this.__dir__, a.__filtered__ = this.__filtered__, a.__iteratees__ = Ln(this.__iteratees__), a.__takeCount__ = this.__takeCount__, a.__views__ = Ln(this.__views__), a;
      }
      function dv() {
        if (this.__filtered__) {
          var a = new tn(this);
          a.__dir__ = -1, a.__filtered__ = !0;
        } else
          a = this.clone(), a.__dir__ *= -1;
        return a;
      }
      function pv() {
        var a = this.__wrapped__.value(), c = this.__dir__, g = Vt(a), j = c < 0, tt = g ? a.length : 0, lt = O0(0, tt, this.__views__), ft = lt.start, dt = lt.end, yt = dt - ft, kt = j ? dt : ft - 1, Ot = this.__iteratees__, At = Ot.length, Rt = 0, bt = Pn(yt, this.__takeCount__);
        if (!g || !j && tt == yt && bt == yt)
          return op(a, this.__actions__);
        var Bt = [];
        e:
          for (; yt-- && Rt < bt; ) {
            kt += c;
            for (var Qt = -1, Ut = a[kt]; ++Qt < At; ) {
              var Zt = Ot[Qt], ln = Zt.iteratee, Un = Zt.type, Nn = ln(Ut);
              if (Un == wn)
                Ut = Nn;
              else if (!Nn) {
                if (Un == pn)
                  continue e;
                break e;
              }
            }
            Bt[Rt++] = Ut;
          }
        return Bt;
      }
      tn.prototype = Vr(bo.prototype), tn.prototype.constructor = tn;
      function Pr(a) {
        var c = -1, g = a == null ? 0 : a.length;
        for (this.clear(); ++c < g; ) {
          var j = a[c];
          this.set(j[0], j[1]);
        }
      }
      function hv() {
        this.__data__ = oo ? oo(null) : {}, this.size = 0;
      }
      function gv(a) {
        var c = this.has(a) && delete this.__data__[a];
        return this.size -= c ? 1 : 0, c;
      }
      function mv(a) {
        var c = this.__data__;
        if (oo) {
          var g = c[a];
          return g === _e ? o : g;
        }
        return dn.call(c, a) ? c[a] : o;
      }
      function yv(a) {
        var c = this.__data__;
        return oo ? c[a] !== o : dn.call(c, a);
      }
      function vv(a, c) {
        var g = this.__data__;
        return this.size += this.has(a) ? 0 : 1, g[a] = oo && c === o ? _e : c, this;
      }
      Pr.prototype.clear = hv, Pr.prototype.delete = gv, Pr.prototype.get = mv, Pr.prototype.has = yv, Pr.prototype.set = vv;
      function ur(a) {
        var c = -1, g = a == null ? 0 : a.length;
        for (this.clear(); ++c < g; ) {
          var j = a[c];
          this.set(j[0], j[1]);
        }
      }
      function Sv() {
        this.__data__ = [], this.size = 0;
      }
      function wv(a) {
        var c = this.__data__, g = Mo(c, a);
        if (g < 0)
          return !1;
        var j = c.length - 1;
        return g == j ? c.pop() : Ro.call(c, g, 1), --this.size, !0;
      }
      function _v(a) {
        var c = this.__data__, g = Mo(c, a);
        return g < 0 ? o : c[g][1];
      }
      function xv(a) {
        return Mo(this.__data__, a) > -1;
      }
      function Ev(a, c) {
        var g = this.__data__, j = Mo(g, a);
        return j < 0 ? (++this.size, g.push([a, c])) : g[j][1] = c, this;
      }
      ur.prototype.clear = Sv, ur.prototype.delete = wv, ur.prototype.get = _v, ur.prototype.has = xv, ur.prototype.set = Ev;
      function sr(a) {
        var c = -1, g = a == null ? 0 : a.length;
        for (this.clear(); ++c < g; ) {
          var j = a[c];
          this.set(j[0], j[1]);
        }
      }
      function kv() {
        this.size = 0, this.__data__ = {
          hash: new Pr(),
          map: new (ro || ur)(),
          string: new Pr()
        };
      }
      function Ov(a) {
        var c = Jo(this, a).delete(a);
        return this.size -= c ? 1 : 0, c;
      }
      function Tv(a) {
        return Jo(this, a).get(a);
      }
      function Av(a) {
        return Jo(this, a).has(a);
      }
      function Cv(a, c) {
        var g = Jo(this, a), j = g.size;
        return g.set(a, c), this.size += g.size == j ? 0 : 1, this;
      }
      sr.prototype.clear = kv, sr.prototype.delete = Ov, sr.prototype.get = Tv, sr.prototype.has = Av, sr.prototype.set = Cv;
      function Ir(a) {
        var c = -1, g = a == null ? 0 : a.length;
        for (this.__data__ = new sr(); ++c < g; )
          this.add(a[c]);
      }
      function Pv(a) {
        return this.__data__.set(a, _e), this;
      }
      function Iv(a) {
        return this.__data__.has(a);
      }
      Ir.prototype.add = Ir.prototype.push = Pv, Ir.prototype.has = Iv;
      function tr(a) {
        var c = this.__data__ = new ur(a);
        this.size = c.size;
      }
      function Rv() {
        this.__data__ = new ur(), this.size = 0;
      }
      function $v(a) {
        var c = this.__data__, g = c.delete(a);
        return this.size = c.size, g;
      }
      function Nv(a) {
        return this.__data__.get(a);
      }
      function Lv(a) {
        return this.__data__.has(a);
      }
      function jv(a, c) {
        var g = this.__data__;
        if (g instanceof ur) {
          var j = g.__data__;
          if (!ro || j.length < d - 1)
            return j.push([a, c]), this.size = ++g.size, this;
          g = this.__data__ = new sr(j);
        }
        return g.set(a, c), this.size = g.size, this;
      }
      tr.prototype.clear = Rv, tr.prototype.delete = $v, tr.prototype.get = Nv, tr.prototype.has = Lv, tr.prototype.set = jv;
      function Fs(a, c) {
        var g = Vt(a), j = !g && jr(a), tt = !g && !j && Or(a), lt = !g && !j && !tt && Yr(a), ft = g || j || tt || lt, dt = ft ? Zl(a.length, Vy) : [], yt = dt.length;
        for (var kt in a)
          (c || dn.call(a, kt)) && !(ft && // Safari 9 has enumerable `arguments.length` in strict mode.
          (kt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          tt && (kt == "offset" || kt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          lt && (kt == "buffer" || kt == "byteLength" || kt == "byteOffset") || // Skip index properties.
          pr(kt, yt))) && dt.push(kt);
        return dt;
      }
      function zs(a) {
        var c = a.length;
        return c ? a[fu(0, c - 1)] : o;
      }
      function Dv(a, c) {
        return qo(Ln(a), Rr(c, 0, a.length));
      }
      function bv(a) {
        return qo(Ln(a));
      }
      function eu(a, c, g) {
        (g !== o && !nr(a[c], g) || g === o && !(c in a)) && fr(a, c, g);
      }
      function ao(a, c, g) {
        var j = a[c];
        (!(dn.call(a, c) && nr(j, g)) || g === o && !(c in a)) && fr(a, c, g);
      }
      function Mo(a, c) {
        for (var g = a.length; g--; )
          if (nr(a[g][0], c))
            return g;
        return -1;
      }
      function Mv(a, c, g, j) {
        return _r(a, function(tt, lt, ft) {
          c(j, tt, g(tt), ft);
        }), j;
      }
      function Bs(a, c) {
        return a && or(c, Tn(c), a);
      }
      function Fv(a, c) {
        return a && or(c, Dn(c), a);
      }
      function fr(a, c, g) {
        c == "__proto__" && $o ? $o(a, c, {
          configurable: !0,
          enumerable: !0,
          value: g,
          writable: !0
        }) : a[c] = g;
      }
      function tu(a, c) {
        for (var g = -1, j = c.length, tt = wt(j), lt = a == null; ++g < j; )
          tt[g] = lt ? o : ju(a, c[g]);
        return tt;
      }
      function Rr(a, c, g) {
        return a === a && (g !== o && (a = a <= g ? a : g), c !== o && (a = a >= c ? a : c)), a;
      }
      function Qn(a, c, g, j, tt, lt) {
        var ft, dt = c & st, yt = c & ct, kt = c & mt;
        if (g && (ft = tt ? g(a, j, tt, lt) : g(a)), ft !== o)
          return ft;
        if (!vn(a))
          return a;
        var Ot = Vt(a);
        if (Ot) {
          if (ft = A0(a), !dt)
            return Ln(a, ft);
        } else {
          var At = In(a), Rt = At == _n || At == Tr;
          if (Or(a))
            return up(a, dt);
          if (At == ar || At == Jt || Rt && !tt) {
            if (ft = yt || Rt ? {} : Ap(a), !dt)
              return yt ? m0(a, Fv(ft, a)) : g0(a, Bs(ft, a));
          } else {
            if (!gn[At])
              return tt ? a : {};
            ft = C0(a, At, dt);
          }
        }
        lt || (lt = new tr());
        var bt = lt.get(a);
        if (bt)
          return bt;
        lt.set(a, ft), em(a) ? a.forEach(function(Ut) {
          ft.add(Qn(Ut, c, g, Ut, a, lt));
        }) : _h(a) && a.forEach(function(Ut, Zt) {
          ft.set(Zt, Qn(Ut, c, g, Zt, a, lt));
        });
        var Bt = kt ? yt ? _u : wu : yt ? Dn : Tn, Qt = Ot ? o : Bt(a);
        return Vn(Qt || a, function(Ut, Zt) {
          Qt && (Zt = Ut, Ut = a[Zt]), ao(ft, Zt, Qn(Ut, c, g, Zt, a, lt));
        }), ft;
      }
      function zv(a) {
        var c = Tn(a);
        return function(g) {
          return Us(g, a, c);
        };
      }
      function Us(a, c, g) {
        var j = g.length;
        if (a == null)
          return !j;
        for (a = hn(a); j--; ) {
          var tt = g[j], lt = c[tt], ft = a[tt];
          if (ft === o && !(tt in a) || !lt(ft))
            return !1;
        }
        return !0;
      }
      function Ws(a, c, g) {
        if (typeof a != "function")
          throw new Gn(_);
        return go(function() {
          a.apply(o, g);
        }, c);
      }
      function uo(a, c, g, j) {
        var tt = -1, lt = _o, ft = !0, dt = a.length, yt = [], kt = c.length;
        if (!dt)
          return yt;
        g && (c = yn(c, Fn(g))), j ? (lt = Gl, ft = !1) : c.length >= d && (lt = to, ft = !1, c = new Ir(c));
        e:
          for (; ++tt < dt; ) {
            var Ot = a[tt], At = g == null ? Ot : g(Ot);
            if (Ot = j || Ot !== 0 ? Ot : 0, ft && At === At) {
              for (var Rt = kt; Rt--; )
                if (c[Rt] === At)
                  continue e;
              yt.push(Ot);
            } else
              lt(c, At, j) || yt.push(Ot);
          }
        return yt;
      }
      var _r = pp(ir), Hs = pp(ru, !0);
      function Bv(a, c) {
        var g = !0;
        return _r(a, function(j, tt, lt) {
          return g = !!c(j, tt, lt), g;
        }), g;
      }
      function Fo(a, c, g) {
        for (var j = -1, tt = a.length; ++j < tt; ) {
          var lt = a[j], ft = c(lt);
          if (ft != null && (dt === o ? ft === ft && !Bn(ft) : g(ft, dt)))
            var dt = ft, yt = lt;
        }
        return yt;
      }
      function Uv(a, c, g, j) {
        var tt = a.length;
        for (g = Kt(g), g < 0 && (g = -g > tt ? 0 : tt + g), j = j === o || j > tt ? tt : Kt(j), j < 0 && (j += tt), j = g > j ? 0 : nm(j); g < j; )
          a[g++] = c;
        return a;
      }
      function Vs(a, c) {
        var g = [];
        return _r(a, function(j, tt, lt) {
          c(j, tt, lt) && g.push(j);
        }), g;
      }
      function Cn(a, c, g, j, tt) {
        var lt = -1, ft = a.length;
        for (g || (g = I0), tt || (tt = []); ++lt < ft; ) {
          var dt = a[lt];
          c > 0 && g(dt) ? c > 1 ? Cn(dt, c - 1, g, j, tt) : vr(tt, dt) : j || (tt[tt.length] = dt);
        }
        return tt;
      }
      var nu = hp(), Gs = hp(!0);
      function ir(a, c) {
        return a && nu(a, c, Tn);
      }
      function ru(a, c) {
        return a && Gs(a, c, Tn);
      }
      function zo(a, c) {
        return yr(c, function(g) {
          return hr(a[g]);
        });
      }
      function $r(a, c) {
        c = Er(c, a);
        for (var g = 0, j = c.length; a != null && g < j; )
          a = a[lr(c[g++])];
        return g && g == j ? a : o;
      }
      function Ks(a, c, g) {
        var j = c(a);
        return Vt(a) ? j : vr(j, g(a));
      }
      function Rn(a) {
        return a == null ? a === o ? ym : gm : Cr && Cr in hn(a) ? k0(a) : b0(a);
      }
      function iu(a, c) {
        return a > c;
      }
      function Wv(a, c) {
        return a != null && dn.call(a, c);
      }
      function Hv(a, c) {
        return a != null && c in hn(a);
      }
      function Vv(a, c, g) {
        return a >= Pn(c, g) && a < On(c, g);
      }
      function ou(a, c, g) {
        for (var j = g ? Gl : _o, tt = a[0].length, lt = a.length, ft = lt, dt = wt(lt), yt = 1 / 0, kt = []; ft--; ) {
          var Ot = a[ft];
          ft && c && (Ot = yn(Ot, Fn(c))), yt = Pn(Ot.length, yt), dt[ft] = !g && (c || tt >= 120 && Ot.length >= 120) ? new Ir(ft && Ot) : o;
        }
        Ot = a[0];
        var At = -1, Rt = dt[0];
        e:
          for (; ++At < tt && kt.length < yt; ) {
            var bt = Ot[At], Bt = c ? c(bt) : bt;
            if (bt = g || bt !== 0 ? bt : 0, !(Rt ? to(Rt, Bt) : j(kt, Bt, g))) {
              for (ft = lt; --ft; ) {
                var Qt = dt[ft];
                if (!(Qt ? to(Qt, Bt) : j(a[ft], Bt, g)))
                  continue e;
              }
              Rt && Rt.push(Bt), kt.push(bt);
            }
          }
        return kt;
      }
      function Gv(a, c, g, j) {
        return ir(a, function(tt, lt, ft) {
          c(j, g(tt), lt, ft);
        }), j;
      }
      function so(a, c, g) {
        c = Er(c, a), a = Rp(a, c);
        var j = a == null ? a : a[lr(Jn(c))];
        return j == null ? o : Mn(j, a, g);
      }
      function Qs(a) {
        return Sn(a) && Rn(a) == Jt;
      }
      function Kv(a) {
        return Sn(a) && Rn(a) == eo;
      }
      function Qv(a) {
        return Sn(a) && Rn(a) == on;
      }
      function fo(a, c, g, j, tt) {
        return a === c ? !0 : a == null || c == null || !Sn(a) && !Sn(c) ? a !== a && c !== c : Yv(a, c, g, j, fo, tt);
      }
      function Yv(a, c, g, j, tt, lt) {
        var ft = Vt(a), dt = Vt(c), yt = ft ? Wt : In(a), kt = dt ? Wt : In(c);
        yt = yt == Jt ? ar : yt, kt = kt == Jt ? ar : kt;
        var Ot = yt == ar, At = kt == ar, Rt = yt == kt;
        if (Rt && Or(a)) {
          if (!Or(c))
            return !1;
          ft = !0, Ot = !1;
        }
        if (Rt && !Ot)
          return lt || (lt = new tr()), ft || Yr(a) ? kp(a, c, g, j, tt, lt) : x0(a, c, yt, g, j, tt, lt);
        if (!(g & pt)) {
          var bt = Ot && dn.call(a, "__wrapped__"), Bt = At && dn.call(c, "__wrapped__");
          if (bt || Bt) {
            var Qt = bt ? a.value() : a, Ut = Bt ? c.value() : c;
            return lt || (lt = new tr()), tt(Qt, Ut, g, j, lt);
          }
        }
        return Rt ? (lt || (lt = new tr()), E0(a, c, g, j, tt, lt)) : !1;
      }
      function Jv(a) {
        return Sn(a) && In(a) == Xn;
      }
      function lu(a, c, g, j) {
        var tt = g.length, lt = tt, ft = !j;
        if (a == null)
          return !lt;
        for (a = hn(a); tt--; ) {
          var dt = g[tt];
          if (ft && dt[2] ? dt[1] !== a[dt[0]] : !(dt[0] in a))
            return !1;
        }
        for (; ++tt < lt; ) {
          dt = g[tt];
          var yt = dt[0], kt = a[yt], Ot = dt[1];
          if (ft && dt[2]) {
            if (kt === o && !(yt in a))
              return !1;
          } else {
            var At = new tr();
            if (j)
              var Rt = j(kt, Ot, yt, a, c, At);
            if (!(Rt === o ? fo(Ot, kt, pt | vt, j, At) : Rt))
              return !1;
          }
        }
        return !0;
      }
      function Ys(a) {
        if (!vn(a) || $0(a))
          return !1;
        var c = hr(a) ? Jy : zm;
        return c.test(Lr(a));
      }
      function qv(a) {
        return Sn(a) && Rn(a) == Xr;
      }
      function Xv(a) {
        return Sn(a) && In(a) == Zn;
      }
      function Zv(a) {
        return Sn(a) && xl(a.length) && !!mn[Rn(a)];
      }
      function Js(a) {
        return typeof a == "function" ? a : a == null ? bn : typeof a == "object" ? Vt(a) ? Zs(a[0], a[1]) : Xs(a) : pm(a);
      }
      function au(a) {
        if (!ho(a))
          return nv(a);
        var c = [];
        for (var g in hn(a))
          dn.call(a, g) && g != "constructor" && c.push(g);
        return c;
      }
      function e0(a) {
        if (!vn(a))
          return D0(a);
        var c = ho(a), g = [];
        for (var j in a)
          j == "constructor" && (c || !dn.call(a, j)) || g.push(j);
        return g;
      }
      function uu(a, c) {
        return a < c;
      }
      function qs(a, c) {
        var g = -1, j = jn(a) ? wt(a.length) : [];
        return _r(a, function(tt, lt, ft) {
          j[++g] = c(tt, lt, ft);
        }), j;
      }
      function Xs(a) {
        var c = Eu(a);
        return c.length == 1 && c[0][2] ? Pp(c[0][0], c[0][1]) : function(g) {
          return g === a || lu(g, a, c);
        };
      }
      function Zs(a, c) {
        return Ou(a) && Cp(c) ? Pp(lr(a), c) : function(g) {
          var j = ju(g, a);
          return j === o && j === c ? Du(g, a) : fo(c, j, pt | vt);
        };
      }
      function Bo(a, c, g, j, tt) {
        a !== c && nu(c, function(lt, ft) {
          if (tt || (tt = new tr()), vn(lt))
            t0(a, c, ft, g, Bo, j, tt);
          else {
            var dt = j ? j(Au(a, ft), lt, ft + "", a, c, tt) : o;
            dt === o && (dt = lt), eu(a, ft, dt);
          }
        }, Dn);
      }
      function t0(a, c, g, j, tt, lt, ft) {
        var dt = Au(a, g), yt = Au(c, g), kt = ft.get(yt);
        if (kt) {
          eu(a, g, kt);
          return;
        }
        var Ot = lt ? lt(dt, yt, g + "", a, c, ft) : o, At = Ot === o;
        if (At) {
          var Rt = Vt(yt), bt = !Rt && Or(yt), Bt = !Rt && !bt && Yr(yt);
          Ot = yt, Rt || bt || Bt ? Vt(dt) ? Ot = dt : xn(dt) ? Ot = Ln(dt) : bt ? (At = !1, Ot = up(yt, !0)) : Bt ? (At = !1, Ot = sp(yt, !0)) : Ot = [] : mo(yt) || jr(yt) ? (Ot = dt, jr(dt) ? Ot = rm(dt) : (!vn(dt) || hr(dt)) && (Ot = Ap(yt))) : At = !1;
        }
        At && (ft.set(yt, Ot), tt(Ot, yt, j, lt, ft), ft.delete(yt)), eu(a, g, Ot);
      }
      function _f(a, c) {
        var g = a.length;
        if (g)
          return c += c < 0 ? g : 0, pr(c, g) ? a[c] : o;
      }
      function _c(a, c, g) {
        c.length ? c = yn(c, function(lt) {
          return Vt(lt) ? function(ft) {
            return $r(ft, lt.length === 1 ? lt[0] : lt);
          } : lt;
        }) : c = [bn];
        var j = -1;
        c = yn(c, Fn(zt()));
        var tt = qs(a, function(lt, ft, dt) {
          var yt = yn(c, function(kt) {
            return kt(lt);
          });
          return { criteria: yt, index: ++j, value: lt };
        });
        return Cy(tt, function(lt, ft) {
          return h0(lt, ft, g);
        });
      }
      function n0(a, c) {
        return _d(a, c, function(g, j) {
          return Du(a, j);
        });
      }
      function _d(a, c, g) {
        for (var j = -1, tt = c.length, lt = {}; ++j < tt; ) {
          var ft = c[j], dt = $r(a, ft);
          g(dt, ft) && co(lt, Er(ft, a), dt);
        }
        return lt;
      }
      function r0(a) {
        return function(c) {
          return $r(c, a);
        };
      }
      function su(a, c, g, j) {
        var tt = j ? Ay : Mr, lt = -1, ft = c.length, dt = a;
        for (a === c && (c = Ln(c)), g && (dt = yn(a, Fn(g))); ++lt < ft; )
          for (var yt = 0, kt = c[lt], Ot = g ? g(kt) : kt; (yt = tt(dt, Ot, yt, j)) > -1; )
            dt !== a && Ro.call(dt, yt, 1), Ro.call(a, yt, 1);
        return a;
      }
      function ep(a, c) {
        for (var g = a ? c.length : 0, j = g - 1; g--; ) {
          var tt = c[g];
          if (g == j || tt !== lt) {
            var lt = tt;
            pr(tt) ? Ro.call(a, tt, 1) : pu(a, tt);
          }
        }
        return a;
      }
      function fu(a, c) {
        return a + Lo(bs() * (c - a + 1));
      }
      function i0(a, c, g, j) {
        for (var tt = -1, lt = On(No((c - a) / (g || 1)), 0), ft = wt(lt); lt--; )
          ft[j ? lt : ++tt] = a, a += g;
        return ft;
      }
      function cu(a, c) {
        var g = "";
        if (!a || c < 1 || c > Ct)
          return g;
        do
          c % 2 && (g += a), c = Lo(c / 2), c && (a += a);
        while (c);
        return g;
      }
      function qt(a, c) {
        return Cu(Ip(a, c, bn), a + "");
      }
      function o0(a) {
        return zs(Jr(a));
      }
      function l0(a, c) {
        var g = Jr(a);
        return qo(g, Rr(c, 0, g.length));
      }
      function co(a, c, g, j) {
        if (!vn(a))
          return a;
        c = Er(c, a);
        for (var tt = -1, lt = c.length, ft = lt - 1, dt = a; dt != null && ++tt < lt; ) {
          var yt = lr(c[tt]), kt = g;
          if (yt === "__proto__" || yt === "constructor" || yt === "prototype")
            return a;
          if (tt != ft) {
            var Ot = dt[yt];
            kt = j ? j(Ot, yt, dt) : o, kt === o && (kt = vn(Ot) ? Ot : pr(c[tt + 1]) ? [] : {});
          }
          ao(dt, yt, kt), dt = dt[yt];
        }
        return a;
      }
      var tp = jo ? function(a, c) {
        return jo.set(a, c), a;
      } : bn, a0 = $o ? function(a, c) {
        return $o(a, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Mu(c),
          writable: !0
        });
      } : bn;
      function u0(a) {
        return qo(Jr(a));
      }
      function Yn(a, c, g) {
        var j = -1, tt = a.length;
        c < 0 && (c = -c > tt ? 0 : tt + c), g = g > tt ? tt : g, g < 0 && (g += tt), tt = c > g ? 0 : g - c >>> 0, c >>>= 0;
        for (var lt = wt(tt); ++j < tt; )
          lt[j] = a[j + c];
        return lt;
      }
      function s0(a, c) {
        var g;
        return _r(a, function(j, tt, lt) {
          return g = c(j, tt, lt), !g;
        }), !!g;
      }
      function Uo(a, c, g) {
        var j = 0, tt = a == null ? j : a.length;
        if (typeof c == "number" && c === c && tt <= Dt) {
          for (; j < tt; ) {
            var lt = j + tt >>> 1, ft = a[lt];
            ft !== null && !Bn(ft) && (g ? ft <= c : ft < c) ? j = lt + 1 : tt = lt;
          }
          return tt;
        }
        return du(a, c, bn, g);
      }
      function du(a, c, g, j) {
        var tt = 0, lt = a == null ? 0 : a.length;
        if (lt === 0)
          return 0;
        c = g(c);
        for (var ft = c !== c, dt = c === null, yt = Bn(c), kt = c === o; tt < lt; ) {
          var Ot = Lo((tt + lt) / 2), At = g(a[Ot]), Rt = At !== o, bt = At === null, Bt = At === At, Qt = Bn(At);
          if (ft)
            var Ut = j || Bt;
          else
            kt ? Ut = Bt && (j || Rt) : dt ? Ut = Bt && Rt && (j || !bt) : yt ? Ut = Bt && Rt && !bt && (j || !Qt) : bt || Qt ? Ut = !1 : Ut = j ? At <= c : At < c;
          Ut ? tt = Ot + 1 : lt = Ot;
        }
        return Pn(lt, Pt);
      }
      function np(a, c) {
        for (var g = -1, j = a.length, tt = 0, lt = []; ++g < j; ) {
          var ft = a[g], dt = c ? c(ft) : ft;
          if (!g || !nr(dt, yt)) {
            var yt = dt;
            lt[tt++] = ft === 0 ? 0 : ft;
          }
        }
        return lt;
      }
      function rp(a) {
        return typeof a == "number" ? a : Bn(a) ? jt : +a;
      }
      function zn(a) {
        if (typeof a == "string")
          return a;
        if (Vt(a))
          return yn(a, zn) + "";
        if (Bn(a))
          return Ms ? Ms.call(a) : "";
        var c = a + "";
        return c == "0" && 1 / a == -Mt ? "-0" : c;
      }
      function xr(a, c, g) {
        var j = -1, tt = _o, lt = a.length, ft = !0, dt = [], yt = dt;
        if (g)
          ft = !1, tt = Gl;
        else if (lt >= d) {
          var kt = c ? null : w0(a);
          if (kt)
            return Eo(kt);
          ft = !1, tt = to, yt = new Ir();
        } else
          yt = c ? [] : dt;
        e:
          for (; ++j < lt; ) {
            var Ot = a[j], At = c ? c(Ot) : Ot;
            if (Ot = g || Ot !== 0 ? Ot : 0, ft && At === At) {
              for (var Rt = yt.length; Rt--; )
                if (yt[Rt] === At)
                  continue e;
              c && yt.push(At), dt.push(Ot);
            } else
              tt(yt, At, g) || (yt !== dt && yt.push(At), dt.push(Ot));
          }
        return dt;
      }
      function pu(a, c) {
        return c = Er(c, a), a = Rp(a, c), a == null || delete a[lr(Jn(c))];
      }
      function ip(a, c, g, j) {
        return co(a, c, g($r(a, c)), j);
      }
      function Wo(a, c, g, j) {
        for (var tt = a.length, lt = j ? tt : -1; (j ? lt-- : ++lt < tt) && c(a[lt], lt, a); )
          ;
        return g ? Yn(a, j ? 0 : lt, j ? lt + 1 : tt) : Yn(a, j ? lt + 1 : 0, j ? tt : lt);
      }
      function op(a, c) {
        var g = a;
        return g instanceof tn && (g = g.value()), Kl(c, function(j, tt) {
          return tt.func.apply(tt.thisArg, vr([j], tt.args));
        }, g);
      }
      function hu(a, c, g) {
        var j = a.length;
        if (j < 2)
          return j ? xr(a[0]) : [];
        for (var tt = -1, lt = wt(j); ++tt < j; )
          for (var ft = a[tt], dt = -1; ++dt < j; )
            dt != tt && (lt[tt] = uo(lt[tt] || ft, a[dt], c, g));
        return xr(Cn(lt, 1), c, g);
      }
      function lp(a, c, g) {
        for (var j = -1, tt = a.length, lt = c.length, ft = {}; ++j < tt; ) {
          var dt = j < lt ? c[j] : o;
          g(ft, a[j], dt);
        }
        return ft;
      }
      function gu(a) {
        return xn(a) ? a : [];
      }
      function mu(a) {
        return typeof a == "function" ? a : bn;
      }
      function Er(a, c) {
        return Vt(a) ? a : Ou(a, c) ? [a] : jp(sn(a));
      }
      var f0 = qt;
      function kr(a, c, g) {
        var j = a.length;
        return g = g === o ? j : g, !c && g >= j ? a : Yn(a, c, g);
      }
      var ap = qy || function(a) {
        return An.clearTimeout(a);
      };
      function up(a, c) {
        if (c)
          return a.slice();
        var g = a.length, j = $s ? $s(g) : new a.constructor(g);
        return a.copy(j), j;
      }
      function yu(a) {
        var c = new a.constructor(a.byteLength);
        return new Po(c).set(new Po(a)), c;
      }
      function c0(a, c) {
        var g = c ? yu(a.buffer) : a.buffer;
        return new a.constructor(g, a.byteOffset, a.byteLength);
      }
      function d0(a) {
        var c = new a.constructor(a.source, Qu.exec(a));
        return c.lastIndex = a.lastIndex, c;
      }
      function p0(a) {
        return lo ? hn(lo.call(a)) : {};
      }
      function sp(a, c) {
        var g = c ? yu(a.buffer) : a.buffer;
        return new a.constructor(g, a.byteOffset, a.length);
      }
      function fp(a, c) {
        if (a !== c) {
          var g = a !== o, j = a === null, tt = a === a, lt = Bn(a), ft = c !== o, dt = c === null, yt = c === c, kt = Bn(c);
          if (!dt && !kt && !lt && a > c || lt && ft && yt && !dt && !kt || j && ft && yt || !g && yt || !tt)
            return 1;
          if (!j && !lt && !kt && a < c || kt && g && tt && !j && !lt || dt && g && tt || !ft && tt || !yt)
            return -1;
        }
        return 0;
      }
      function h0(a, c, g) {
        for (var j = -1, tt = a.criteria, lt = c.criteria, ft = tt.length, dt = g.length; ++j < ft; ) {
          var yt = fp(tt[j], lt[j]);
          if (yt) {
            if (j >= dt)
              return yt;
            var kt = g[j];
            return yt * (kt == "desc" ? -1 : 1);
          }
        }
        return a.index - c.index;
      }
      function cp(a, c, g, j) {
        for (var tt = -1, lt = a.length, ft = g.length, dt = -1, yt = c.length, kt = On(lt - ft, 0), Ot = wt(yt + kt), At = !j; ++dt < yt; )
          Ot[dt] = c[dt];
        for (; ++tt < ft; )
          (At || tt < lt) && (Ot[g[tt]] = a[tt]);
        for (; kt--; )
          Ot[dt++] = a[tt++];
        return Ot;
      }
      function dp(a, c, g, j) {
        for (var tt = -1, lt = a.length, ft = -1, dt = g.length, yt = -1, kt = c.length, Ot = On(lt - dt, 0), At = wt(Ot + kt), Rt = !j; ++tt < Ot; )
          At[tt] = a[tt];
        for (var bt = tt; ++yt < kt; )
          At[bt + yt] = c[yt];
        for (; ++ft < dt; )
          (Rt || tt < lt) && (At[bt + g[ft]] = a[tt++]);
        return At;
      }
      function Ln(a, c) {
        var g = -1, j = a.length;
        for (c || (c = wt(j)); ++g < j; )
          c[g] = a[g];
        return c;
      }
      function or(a, c, g, j) {
        var tt = !g;
        g || (g = {});
        for (var lt = -1, ft = c.length; ++lt < ft; ) {
          var dt = c[lt], yt = j ? j(g[dt], a[dt], dt, g, a) : o;
          yt === o && (yt = a[dt]), tt ? fr(g, dt, yt) : ao(g, dt, yt);
        }
        return g;
      }
      function g0(a, c) {
        return or(a, ku(a), c);
      }
      function m0(a, c) {
        return or(a, Op(a), c);
      }
      function Ho(a, c) {
        return function(g, j) {
          var tt = Vt(g) ? _y : Mv, lt = c ? c() : {};
          return tt(g, a, zt(j, 2), lt);
        };
      }
      function Gr(a) {
        return qt(function(c, g) {
          var j = -1, tt = g.length, lt = tt > 1 ? g[tt - 1] : o, ft = tt > 2 ? g[2] : o;
          for (lt = a.length > 3 && typeof lt == "function" ? (tt--, lt) : o, ft && $n(g[0], g[1], ft) && (lt = tt < 3 ? o : lt, tt = 1), c = hn(c); ++j < tt; ) {
            var dt = g[j];
            dt && a(c, dt, j, lt);
          }
          return c;
        });
      }
      function pp(a, c) {
        return function(g, j) {
          if (g == null)
            return g;
          if (!jn(g))
            return a(g, j);
          for (var tt = g.length, lt = c ? tt : -1, ft = hn(g); (c ? lt-- : ++lt < tt) && j(ft[lt], lt, ft) !== !1; )
            ;
          return g;
        };
      }
      function hp(a) {
        return function(c, g, j) {
          for (var tt = -1, lt = hn(c), ft = j(c), dt = ft.length; dt--; ) {
            var yt = ft[a ? dt : ++tt];
            if (g(lt[yt], yt, lt) === !1)
              break;
          }
          return c;
        };
      }
      function y0(a, c, g) {
        var j = c & ht, tt = po(a);
        function lt() {
          var ft = this && this !== An && this instanceof lt ? tt : a;
          return ft.apply(j ? g : this, arguments);
        }
        return lt;
      }
      function gp(a) {
        return function(c) {
          c = sn(c);
          var g = Fr(c) ? er(c) : o, j = g ? g[0] : c.charAt(0), tt = g ? kr(g, 1).join("") : c.slice(1);
          return j[a]() + tt;
        };
      }
      function Kr(a) {
        return function(c) {
          return Kl(cm(fm(c).replace(ay, "")), a, "");
        };
      }
      function po(a) {
        return function() {
          var c = arguments;
          switch (c.length) {
            case 0:
              return new a();
            case 1:
              return new a(c[0]);
            case 2:
              return new a(c[0], c[1]);
            case 3:
              return new a(c[0], c[1], c[2]);
            case 4:
              return new a(c[0], c[1], c[2], c[3]);
            case 5:
              return new a(c[0], c[1], c[2], c[3], c[4]);
            case 6:
              return new a(c[0], c[1], c[2], c[3], c[4], c[5]);
            case 7:
              return new a(c[0], c[1], c[2], c[3], c[4], c[5], c[6]);
          }
          var g = Vr(a.prototype), j = a.apply(g, c);
          return vn(j) ? j : g;
        };
      }
      function v0(a, c, g) {
        var j = po(a);
        function tt() {
          for (var lt = arguments.length, ft = wt(lt), dt = lt, yt = Qr(tt); dt--; )
            ft[dt] = arguments[dt];
          var kt = lt < 3 && ft[0] !== yt && ft[lt - 1] !== yt ? [] : Sr(ft, yt);
          if (lt -= kt.length, lt < g)
            return wp(
              a,
              c,
              Vo,
              tt.placeholder,
              o,
              ft,
              kt,
              o,
              o,
              g - lt
            );
          var Ot = this && this !== An && this instanceof tt ? j : a;
          return Mn(Ot, this, ft);
        }
        return tt;
      }
      function mp(a) {
        return function(c, g, j) {
          var tt = hn(c);
          if (!jn(c)) {
            var lt = zt(g, 3);
            c = Tn(c), g = function(dt) {
              return lt(tt[dt], dt, tt);
            };
          }
          var ft = a(c, g, j);
          return ft > -1 ? tt[lt ? c[ft] : ft] : o;
        };
      }
      function yp(a) {
        return dr(function(c) {
          var g = c.length, j = g, tt = Kn.prototype.thru;
          for (a && c.reverse(); j--; ) {
            var lt = c[j];
            if (typeof lt != "function")
              throw new Gn(_);
            if (tt && !ft && Yo(lt) == "wrapper")
              var ft = new Kn([], !0);
          }
          for (j = ft ? j : g; ++j < g; ) {
            lt = c[j];
            var dt = Yo(lt), yt = dt == "wrapper" ? xu(lt) : o;
            yt && Tu(yt[0]) && yt[1] == (xt | it | St | Tt) && !yt[4].length && yt[9] == 1 ? ft = ft[Yo(yt[0])].apply(ft, yt[3]) : ft = lt.length == 1 && Tu(lt) ? ft[dt]() : ft.thru(lt);
          }
          return function() {
            var kt = arguments, Ot = kt[0];
            if (ft && kt.length == 1 && Vt(Ot))
              return ft.plant(Ot).value();
            for (var At = 0, Rt = g ? c[At].apply(this, kt) : Ot; ++At < g; )
              Rt = c[At].call(this, Rt);
            return Rt;
          };
        });
      }
      function Vo(a, c, g, j, tt, lt, ft, dt, yt, kt) {
        var Ot = c & xt, At = c & ht, Rt = c & nt, bt = c & (it | at), Bt = c & Lt, Qt = Rt ? o : po(a);
        function Ut() {
          for (var Zt = arguments.length, ln = wt(Zt), Un = Zt; Un--; )
            ln[Un] = arguments[Un];
          if (bt)
            var Nn = Qr(Ut), Wn = Iy(ln, Nn);
          if (j && (ln = cp(ln, j, tt, bt)), lt && (ln = dp(ln, lt, ft, bt)), Zt -= Wn, bt && Zt < kt) {
            var En = Sr(ln, Nn);
            return wp(
              a,
              c,
              Vo,
              Ut.placeholder,
              g,
              ln,
              En,
              dt,
              yt,
              kt - Zt
            );
          }
          var rr = At ? g : this, mr = Rt ? rr[a] : a;
          return Zt = ln.length, dt ? ln = M0(ln, dt) : Bt && Zt > 1 && ln.reverse(), Ot && yt < Zt && (ln.length = yt), this && this !== An && this instanceof Ut && (mr = Qt || po(mr)), mr.apply(rr, ln);
        }
        return Ut;
      }
      function vp(a, c) {
        return function(g, j) {
          return Gv(g, a, c(j), {});
        };
      }
      function Go(a, c) {
        return function(g, j) {
          var tt;
          if (g === o && j === o)
            return c;
          if (g !== o && (tt = g), j !== o) {
            if (tt === o)
              return j;
            typeof g == "string" || typeof j == "string" ? (g = zn(g), j = zn(j)) : (g = rp(g), j = rp(j)), tt = a(g, j);
          }
          return tt;
        };
      }
      function vu(a) {
        return dr(function(c) {
          return c = yn(c, Fn(zt())), qt(function(g) {
            var j = this;
            return a(c, function(tt) {
              return Mn(tt, j, g);
            });
          });
        });
      }
      function Ko(a, c) {
        c = c === o ? " " : zn(c);
        var g = c.length;
        if (g < 2)
          return g ? cu(c, a) : c;
        var j = cu(c, No(a / zr(c)));
        return Fr(c) ? kr(er(j), 0, a).join("") : j.slice(0, a);
      }
      function S0(a, c, g, j) {
        var tt = c & ht, lt = po(a);
        function ft() {
          for (var dt = -1, yt = arguments.length, kt = -1, Ot = j.length, At = wt(Ot + yt), Rt = this && this !== An && this instanceof ft ? lt : a; ++kt < Ot; )
            At[kt] = j[kt];
          for (; yt--; )
            At[kt++] = arguments[++dt];
          return Mn(Rt, tt ? g : this, At);
        }
        return ft;
      }
      function Sp(a) {
        return function(c, g, j) {
          return j && typeof j != "number" && $n(c, g, j) && (g = j = o), c = gr(c), g === o ? (g = c, c = 0) : g = gr(g), j = j === o ? c < g ? 1 : -1 : gr(j), i0(c, g, j, a);
        };
      }
      function Qo(a) {
        return function(c, g) {
          return typeof c == "string" && typeof g == "string" || (c = qn(c), g = qn(g)), a(c, g);
        };
      }
      function wp(a, c, g, j, tt, lt, ft, dt, yt, kt) {
        var Ot = c & it, At = Ot ? ft : o, Rt = Ot ? o : ft, bt = Ot ? lt : o, Bt = Ot ? o : lt;
        c |= Ot ? St : _t, c &= ~(Ot ? _t : St), c & ot || (c &= ~(ht | nt));
        var Qt = [
          a,
          c,
          tt,
          bt,
          At,
          Bt,
          Rt,
          dt,
          yt,
          kt
        ], Ut = g.apply(o, Qt);
        return Tu(a) && $p(Ut, Qt), Ut.placeholder = j, Np(Ut, a, c);
      }
      function Su(a) {
        var c = kn[a];
        return function(g, j) {
          if (g = qn(g), j = j == null ? 0 : Pn(Kt(j), 292), j && Ds(g)) {
            var tt = (sn(g) + "e").split("e"), lt = c(tt[0] + "e" + (+tt[1] + j));
            return tt = (sn(lt) + "e").split("e"), +(tt[0] + "e" + (+tt[1] - j));
          }
          return c(g);
        };
      }
      var w0 = Wr && 1 / Eo(new Wr([, -0]))[1] == Mt ? function(a) {
        return new Wr(a);
      } : Bu;
      function _p(a) {
        return function(c) {
          var g = In(c);
          return g == Xn ? ga(c) : g == Zn ? by(c) : Py(c, a(c));
        };
      }
      function cr(a, c, g, j, tt, lt, ft, dt) {
        var yt = c & nt;
        if (!yt && typeof a != "function")
          throw new Gn(_);
        var kt = j ? j.length : 0;
        if (kt || (c &= ~(St | _t), j = tt = o), ft = ft === o ? ft : On(Kt(ft), 0), dt = dt === o ? dt : Kt(dt), kt -= tt ? tt.length : 0, c & _t) {
          var Ot = j, At = tt;
          j = tt = o;
        }
        var Rt = yt ? o : xu(a), bt = [
          a,
          c,
          g,
          j,
          tt,
          Ot,
          At,
          lt,
          ft,
          dt
        ];
        if (Rt && j0(bt, Rt), a = bt[0], c = bt[1], g = bt[2], j = bt[3], tt = bt[4], dt = bt[9] = bt[9] === o ? yt ? 0 : a.length : On(bt[9] - kt, 0), !dt && c & (it | at) && (c &= ~(it | at)), !c || c == ht)
          var Bt = y0(a, c, g);
        else
          c == it || c == at ? Bt = v0(a, c, dt) : (c == St || c == (ht | St)) && !tt.length ? Bt = S0(a, c, g, j) : Bt = Vo.apply(o, bt);
        var Qt = Rt ? tp : $p;
        return Np(Qt(Bt, bt), a, c);
      }
      function xp(a, c, g, j) {
        return a === o || nr(a, Ur[g]) && !dn.call(j, g) ? c : a;
      }
      function Ep(a, c, g, j, tt, lt) {
        return vn(a) && vn(c) && (lt.set(c, a), Bo(a, c, o, Ep, lt), lt.delete(c)), a;
      }
      function _0(a) {
        return mo(a) ? o : a;
      }
      function kp(a, c, g, j, tt, lt) {
        var ft = g & pt, dt = a.length, yt = c.length;
        if (dt != yt && !(ft && yt > dt))
          return !1;
        var kt = lt.get(a), Ot = lt.get(c);
        if (kt && Ot)
          return kt == c && Ot == a;
        var At = -1, Rt = !0, bt = g & vt ? new Ir() : o;
        for (lt.set(a, c), lt.set(c, a); ++At < dt; ) {
          var Bt = a[At], Qt = c[At];
          if (j)
            var Ut = ft ? j(Qt, Bt, At, c, a, lt) : j(Bt, Qt, At, a, c, lt);
          if (Ut !== o) {
            if (Ut)
              continue;
            Rt = !1;
            break;
          }
          if (bt) {
            if (!Ql(c, function(Zt, ln) {
              if (!to(bt, ln) && (Bt === Zt || tt(Bt, Zt, g, j, lt)))
                return bt.push(ln);
            })) {
              Rt = !1;
              break;
            }
          } else if (!(Bt === Qt || tt(Bt, Qt, g, j, lt))) {
            Rt = !1;
            break;
          }
        }
        return lt.delete(a), lt.delete(c), Rt;
      }
      function x0(a, c, g, j, tt, lt, ft) {
        switch (g) {
          case Dr:
            if (a.byteLength != c.byteLength || a.byteOffset != c.byteOffset)
              return !1;
            a = a.buffer, c = c.buffer;
          case eo:
            return !(a.byteLength != c.byteLength || !lt(new Po(a), new Po(c)));
          case en:
          case on:
          case qr:
            return nr(+a, +c);
          case cn:
            return a.name == c.name && a.message == c.message;
          case Xr:
          case Zr:
            return a == c + "";
          case Xn:
            var dt = ga;
          case Zn:
            var yt = j & pt;
            if (dt || (dt = Eo), a.size != c.size && !yt)
              return !1;
            var kt = ft.get(a);
            if (kt)
              return kt == c;
            j |= vt, ft.set(a, c);
            var Ot = kp(dt(a), dt(c), j, tt, lt, ft);
            return ft.delete(a), Ot;
          case yo:
            if (lo)
              return lo.call(a) == lo.call(c);
        }
        return !1;
      }
      function E0(a, c, g, j, tt, lt) {
        var ft = g & pt, dt = wu(a), yt = dt.length, kt = wu(c), Ot = kt.length;
        if (yt != Ot && !ft)
          return !1;
        for (var At = yt; At--; ) {
          var Rt = dt[At];
          if (!(ft ? Rt in c : dn.call(c, Rt)))
            return !1;
        }
        var bt = lt.get(a), Bt = lt.get(c);
        if (bt && Bt)
          return bt == c && Bt == a;
        var Qt = !0;
        lt.set(a, c), lt.set(c, a);
        for (var Ut = ft; ++At < yt; ) {
          Rt = dt[At];
          var Zt = a[Rt], ln = c[Rt];
          if (j)
            var Un = ft ? j(ln, Zt, Rt, c, a, lt) : j(Zt, ln, Rt, a, c, lt);
          if (!(Un === o ? Zt === ln || tt(Zt, ln, g, j, lt) : Un)) {
            Qt = !1;
            break;
          }
          Ut || (Ut = Rt == "constructor");
        }
        if (Qt && !Ut) {
          var Nn = a.constructor, Wn = c.constructor;
          Nn != Wn && "constructor" in a && "constructor" in c && !(typeof Nn == "function" && Nn instanceof Nn && typeof Wn == "function" && Wn instanceof Wn) && (Qt = !1);
        }
        return lt.delete(a), lt.delete(c), Qt;
      }
      function dr(a) {
        return Cu(Ip(a, o, Fp), a + "");
      }
      function wu(a) {
        return Ks(a, Tn, ku);
      }
      function _u(a) {
        return Ks(a, Dn, Op);
      }
      var xu = jo ? function(a) {
        return jo.get(a);
      } : Bu;
      function Yo(a) {
        for (var c = a.name + "", g = Hr[c], j = dn.call(Hr, c) ? g.length : 0; j--; ) {
          var tt = g[j], lt = tt.func;
          if (lt == null || lt == a)
            return tt.name;
        }
        return c;
      }
      function Qr(a) {
        var c = dn.call(rt, "placeholder") ? rt : a;
        return c.placeholder;
      }
      function zt() {
        var a = rt.iteratee || Fu;
        return a = a === Fu ? Js : a, arguments.length ? a(arguments[0], arguments[1]) : a;
      }
      function Jo(a, c) {
        var g = a.__data__;
        return R0(c) ? g[typeof c == "string" ? "string" : "hash"] : g.map;
      }
      function Eu(a) {
        for (var c = Tn(a), g = c.length; g--; ) {
          var j = c[g], tt = a[j];
          c[g] = [j, tt, Cp(tt)];
        }
        return c;
      }
      function Nr(a, c) {
        var g = Ly(a, c);
        return Ys(g) ? g : o;
      }
      function k0(a) {
        var c = dn.call(a, Cr), g = a[Cr];
        try {
          a[Cr] = o;
          var j = !0;
        } catch {
        }
        var tt = Ao.call(a);
        return j && (c ? a[Cr] = g : delete a[Cr]), tt;
      }
      var ku = xa ? function(a) {
        return a == null ? [] : (a = hn(a), yr(xa(a), function(c) {
          return Ls.call(a, c);
        }));
      } : Uu, Op = xa ? function(a) {
        for (var c = []; a; )
          vr(c, ku(a)), a = Io(a);
        return c;
      } : Uu, In = Rn;
      ($a && In(new $a(new ArrayBuffer(1))) != Dr || ro && In(new ro()) != Xn || ba && In(ba.resolve()) != Hu || Wr && In(new Wr()) != Zn || io && In(new io()) != _i) && (In = function(a) {
        var c = Rn(a), g = c == ar ? a.constructor : o, j = g ? Lr(g) : "";
        if (j)
          switch (j) {
            case lv:
              return Dr;
            case av:
              return Xn;
            case uv:
              return Hu;
            case sv:
              return Zn;
            case fv:
              return _i;
          }
        return c;
      });
      function O0(a, c, g) {
        for (var j = -1, tt = g.length; ++j < tt; ) {
          var lt = g[j], ft = lt.size;
          switch (lt.type) {
            case "drop":
              a += ft;
              break;
            case "dropRight":
              c -= ft;
              break;
            case "take":
              c = Pn(c, a + ft);
              break;
            case "takeRight":
              a = On(a, c - ft);
              break;
          }
        }
        return { start: a, end: c };
      }
      function T0(a) {
        var c = a.match($m);
        return c ? c[1].split(Nm) : [];
      }
      function Tp(a, c, g) {
        c = Er(c, a);
        for (var j = -1, tt = c.length, lt = !1; ++j < tt; ) {
          var ft = lr(c[j]);
          if (!(lt = a != null && g(a, ft)))
            break;
          a = a[ft];
        }
        return lt || ++j != tt ? lt : (tt = a == null ? 0 : a.length, !!tt && xl(tt) && pr(ft, tt) && (Vt(a) || jr(a)));
      }
      function A0(a) {
        var c = a.length, g = new a.constructor(c);
        return c && typeof a[0] == "string" && dn.call(a, "index") && (g.index = a.index, g.input = a.input), g;
      }
      function Ap(a) {
        return typeof a.constructor == "function" && !ho(a) ? Vr(Io(a)) : {};
      }
      function C0(a, c, g) {
        var j = a.constructor;
        switch (c) {
          case eo:
            return yu(a);
          case en:
          case on:
            return new j(+a);
          case Dr:
            return c0(a, g);
          case Tl:
          case Al:
          case Cl:
          case Pl:
          case Il:
          case Rl:
          case $l:
          case Nl:
          case Ll:
            return sp(a, g);
          case Xn:
            return new j();
          case qr:
          case Zr:
            return new j(a);
          case Xr:
            return d0(a);
          case Zn:
            return new j();
          case yo:
            return p0(a);
        }
      }
      function P0(a, c) {
        var g = c.length;
        if (!g)
          return a;
        var j = g - 1;
        return c[j] = (g > 1 ? "& " : "") + c[j], c = c.join(g > 2 ? ", " : " "), a.replace(Rm, `{
/* [wrapped with ` + c + `] */
`);
      }
      function I0(a) {
        return Vt(a) || jr(a) || !!(js && a && a[js]);
      }
      function pr(a, c) {
        var g = typeof a;
        return c = c ?? Ct, !!c && (g == "number" || g != "symbol" && Um.test(a)) && a > -1 && a % 1 == 0 && a < c;
      }
      function $n(a, c, g) {
        if (!vn(g))
          return !1;
        var j = typeof c;
        return (j == "number" ? jn(g) && pr(c, g.length) : j == "string" && c in g) ? nr(g[c], a) : !1;
      }
      function Ou(a, c) {
        if (Vt(a))
          return !1;
        var g = typeof a;
        return g == "number" || g == "symbol" || g == "boolean" || a == null || Bn(a) ? !0 : Am.test(a) || !Tm.test(a) || c != null && a in hn(c);
      }
      function R0(a) {
        var c = typeof a;
        return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
      }
      function Tu(a) {
        var c = Yo(a), g = rt[c];
        if (typeof g != "function" || !(c in tn.prototype))
          return !1;
        if (a === g)
          return !0;
        var j = xu(g);
        return !!j && a === j[0];
      }
      function $0(a) {
        return !!Rs && Rs in a;
      }
      var N0 = Oo ? hr : Wu;
      function ho(a) {
        var c = a && a.constructor, g = typeof c == "function" && c.prototype || Ur;
        return a === g;
      }
      function Cp(a) {
        return a === a && !vn(a);
      }
      function Pp(a, c) {
        return function(g) {
          return g == null ? !1 : g[a] === c && (c !== o || a in hn(g));
        };
      }
      function L0(a) {
        var c = Sl(a, function(j) {
          return g.size === et && g.clear(), j;
        }), g = c.cache;
        return c;
      }
      function j0(a, c) {
        var g = a[1], j = c[1], tt = g | j, lt = tt < (ht | nt | xt), ft = j == xt && g == it || j == xt && g == Tt && a[7].length <= c[8] || j == (xt | Tt) && c[7].length <= c[8] && g == it;
        if (!(lt || ft))
          return a;
        j & ht && (a[2] = c[2], tt |= g & ht ? 0 : ot);
        var dt = c[3];
        if (dt) {
          var yt = a[3];
          a[3] = yt ? cp(yt, dt, c[4]) : dt, a[4] = yt ? Sr(a[3], ut) : c[4];
        }
        return dt = c[5], dt && (yt = a[5], a[5] = yt ? dp(yt, dt, c[6]) : dt, a[6] = yt ? Sr(a[5], ut) : c[6]), dt = c[7], dt && (a[7] = dt), j & xt && (a[8] = a[8] == null ? c[8] : Pn(a[8], c[8])), a[9] == null && (a[9] = c[9]), a[0] = c[0], a[1] = tt, a;
      }
      function D0(a) {
        var c = [];
        if (a != null)
          for (var g in hn(a))
            c.push(g);
        return c;
      }
      function b0(a) {
        return Ao.call(a);
      }
      function Ip(a, c, g) {
        return c = On(c === o ? a.length - 1 : c, 0), function() {
          for (var j = arguments, tt = -1, lt = On(j.length - c, 0), ft = wt(lt); ++tt < lt; )
            ft[tt] = j[c + tt];
          tt = -1;
          for (var dt = wt(c + 1); ++tt < c; )
            dt[tt] = j[tt];
          return dt[c] = g(ft), Mn(a, this, dt);
        };
      }
      function Rp(a, c) {
        return c.length < 2 ? a : $r(a, Yn(c, 0, -1));
      }
      function M0(a, c) {
        for (var g = a.length, j = Pn(c.length, g), tt = Ln(a); j--; ) {
          var lt = c[j];
          a[j] = pr(lt, g) ? tt[lt] : o;
        }
        return a;
      }
      function Au(a, c) {
        if (!(c === "constructor" && typeof a[c] == "function") && c != "__proto__")
          return a[c];
      }
      var $p = Lp(tp), go = Zy || function(a, c) {
        return An.setTimeout(a, c);
      }, Cu = Lp(a0);
      function Np(a, c, g) {
        var j = c + "";
        return Cu(a, P0(j, F0(T0(j), g)));
      }
      function Lp(a) {
        var c = 0, g = 0;
        return function() {
          var j = rv(), tt = an - (j - g);
          if (g = j, tt > 0) {
            if (++c >= nn)
              return arguments[0];
          } else
            c = 0;
          return a.apply(o, arguments);
        };
      }
      function qo(a, c) {
        var g = -1, j = a.length, tt = j - 1;
        for (c = c === o ? j : c; ++g < c; ) {
          var lt = fu(g, tt), ft = a[lt];
          a[lt] = a[g], a[g] = ft;
        }
        return a.length = c, a;
      }
      var jp = L0(function(a) {
        var c = [];
        return a.charCodeAt(0) === 46 && c.push(""), a.replace(Cm, function(g, j, tt, lt) {
          c.push(tt ? lt.replace(Dm, "$1") : j || g);
        }), c;
      });
      function lr(a) {
        if (typeof a == "string" || Bn(a))
          return a;
        var c = a + "";
        return c == "0" && 1 / a == -Mt ? "-0" : c;
      }
      function Lr(a) {
        if (a != null) {
          try {
            return To.call(a);
          } catch {
          }
          try {
            return a + "";
          } catch {
          }
        }
        return "";
      }
      function F0(a, c) {
        return Vn(Xt, function(g) {
          var j = "_." + g[0];
          c & g[1] && !_o(a, j) && a.push(j);
        }), a.sort();
      }
      function Dp(a) {
        if (a instanceof tn)
          return a.clone();
        var c = new Kn(a.__wrapped__, a.__chain__);
        return c.__actions__ = Ln(a.__actions__), c.__index__ = a.__index__, c.__values__ = a.__values__, c;
      }
      function z0(a, c, g) {
        (g ? $n(a, c, g) : c === o) ? c = 1 : c = On(Kt(c), 0);
        var j = a == null ? 0 : a.length;
        if (!j || c < 1)
          return [];
        for (var tt = 0, lt = 0, ft = wt(No(j / c)); tt < j; )
          ft[lt++] = Yn(a, tt, tt += c);
        return ft;
      }
      function B0(a) {
        for (var c = -1, g = a == null ? 0 : a.length, j = 0, tt = []; ++c < g; ) {
          var lt = a[c];
          lt && (tt[j++] = lt);
        }
        return tt;
      }
      function U0() {
        var a = arguments.length;
        if (!a)
          return [];
        for (var c = wt(a - 1), g = arguments[0], j = a; j--; )
          c[j - 1] = arguments[j];
        return vr(Vt(g) ? Ln(g) : [g], Cn(c, 1));
      }
      var W0 = qt(function(a, c) {
        return xn(a) ? uo(a, Cn(c, 1, xn, !0)) : [];
      }), H0 = qt(function(a, c) {
        var g = Jn(c);
        return xn(g) && (g = o), xn(a) ? uo(a, Cn(c, 1, xn, !0), zt(g, 2)) : [];
      }), V0 = qt(function(a, c) {
        var g = Jn(c);
        return xn(g) && (g = o), xn(a) ? uo(a, Cn(c, 1, xn, !0), o, g) : [];
      });
      function G0(a, c, g) {
        var j = a == null ? 0 : a.length;
        return j ? (c = g || c === o ? 1 : Kt(c), Yn(a, c < 0 ? 0 : c, j)) : [];
      }
      function K0(a, c, g) {
        var j = a == null ? 0 : a.length;
        return j ? (c = g || c === o ? 1 : Kt(c), c = j - c, Yn(a, 0, c < 0 ? 0 : c)) : [];
      }
      function Q0(a, c) {
        return a && a.length ? Wo(a, zt(c, 3), !0, !0) : [];
      }
      function Y0(a, c) {
        return a && a.length ? Wo(a, zt(c, 3), !0) : [];
      }
      function J0(a, c, g, j) {
        var tt = a == null ? 0 : a.length;
        return tt ? (g && typeof g != "number" && $n(a, c, g) && (g = 0, j = tt), Uv(a, c, g, j)) : [];
      }
      function bp(a, c, g) {
        var j = a == null ? 0 : a.length;
        if (!j)
          return -1;
        var tt = g == null ? 0 : Kt(g);
        return tt < 0 && (tt = On(j + tt, 0)), xo(a, zt(c, 3), tt);
      }
      function Mp(a, c, g) {
        var j = a == null ? 0 : a.length;
        if (!j)
          return -1;
        var tt = j - 1;
        return g !== o && (tt = Kt(g), tt = g < 0 ? On(j + tt, 0) : Pn(tt, j - 1)), xo(a, zt(c, 3), tt, !0);
      }
      function Fp(a) {
        var c = a == null ? 0 : a.length;
        return c ? Cn(a, 1) : [];
      }
      function q0(a) {
        var c = a == null ? 0 : a.length;
        return c ? Cn(a, Mt) : [];
      }
      function X0(a, c) {
        var g = a == null ? 0 : a.length;
        return g ? (c = c === o ? 1 : Kt(c), Cn(a, c)) : [];
      }
      function Z0(a) {
        for (var c = -1, g = a == null ? 0 : a.length, j = {}; ++c < g; ) {
          var tt = a[c];
          j[tt[0]] = tt[1];
        }
        return j;
      }
      function zp(a) {
        return a && a.length ? a[0] : o;
      }
      function e1(a, c, g) {
        var j = a == null ? 0 : a.length;
        if (!j)
          return -1;
        var tt = g == null ? 0 : Kt(g);
        return tt < 0 && (tt = On(j + tt, 0)), Mr(a, c, tt);
      }
      function t1(a) {
        var c = a == null ? 0 : a.length;
        return c ? Yn(a, 0, -1) : [];
      }
      var n1 = qt(function(a) {
        var c = yn(a, gu);
        return c.length && c[0] === a[0] ? ou(c) : [];
      }), r1 = qt(function(a) {
        var c = Jn(a), g = yn(a, gu);
        return c === Jn(g) ? c = o : g.pop(), g.length && g[0] === a[0] ? ou(g, zt(c, 2)) : [];
      }), i1 = qt(function(a) {
        var c = Jn(a), g = yn(a, gu);
        return c = typeof c == "function" ? c : o, c && g.pop(), g.length && g[0] === a[0] ? ou(g, o, c) : [];
      });
      function o1(a, c) {
        return a == null ? "" : tv.call(a, c);
      }
      function Jn(a) {
        var c = a == null ? 0 : a.length;
        return c ? a[c - 1] : o;
      }
      function l1(a, c, g) {
        var j = a == null ? 0 : a.length;
        if (!j)
          return -1;
        var tt = j;
        return g !== o && (tt = Kt(g), tt = tt < 0 ? On(j + tt, 0) : Pn(tt, j - 1)), c === c ? Fy(a, c, tt) : xo(a, Es, tt, !0);
      }
      function a1(a, c) {
        return a && a.length ? _f(a, Kt(c)) : o;
      }
      var u1 = qt(Bp);
      function Bp(a, c) {
        return a && a.length && c && c.length ? su(a, c) : a;
      }
      function s1(a, c, g) {
        return a && a.length && c && c.length ? su(a, c, zt(g, 2)) : a;
      }
      function f1(a, c, g) {
        return a && a.length && c && c.length ? su(a, c, o, g) : a;
      }
      var c1 = dr(function(a, c) {
        var g = a == null ? 0 : a.length, j = tu(a, c);
        return ep(a, yn(c, function(tt) {
          return pr(tt, g) ? +tt : tt;
        }).sort(fp)), j;
      });
      function d1(a, c) {
        var g = [];
        if (!(a && a.length))
          return g;
        var j = -1, tt = [], lt = a.length;
        for (c = zt(c, 3); ++j < lt; ) {
          var ft = a[j];
          c(ft, j, a) && (g.push(ft), tt.push(j));
        }
        return ep(a, tt), g;
      }
      function Pu(a) {
        return a == null ? a : ov.call(a);
      }
      function p1(a, c, g) {
        var j = a == null ? 0 : a.length;
        return j ? (g && typeof g != "number" && $n(a, c, g) ? (c = 0, g = j) : (c = c == null ? 0 : Kt(c), g = g === o ? j : Kt(g)), Yn(a, c, g)) : [];
      }
      function h1(a, c) {
        return Uo(a, c);
      }
      function g1(a, c, g) {
        return du(a, c, zt(g, 2));
      }
      function m1(a, c) {
        var g = a == null ? 0 : a.length;
        if (g) {
          var j = Uo(a, c);
          if (j < g && nr(a[j], c))
            return j;
        }
        return -1;
      }
      function y1(a, c) {
        return Uo(a, c, !0);
      }
      function v1(a, c, g) {
        return du(a, c, zt(g, 2), !0);
      }
      function S1(a, c) {
        var g = a == null ? 0 : a.length;
        if (g) {
          var j = Uo(a, c, !0) - 1;
          if (nr(a[j], c))
            return j;
        }
        return -1;
      }
      function w1(a) {
        return a && a.length ? np(a) : [];
      }
      function _1(a, c) {
        return a && a.length ? np(a, zt(c, 2)) : [];
      }
      function x1(a) {
        var c = a == null ? 0 : a.length;
        return c ? Yn(a, 1, c) : [];
      }
      function E1(a, c, g) {
        return a && a.length ? (c = g || c === o ? 1 : Kt(c), Yn(a, 0, c < 0 ? 0 : c)) : [];
      }
      function k1(a, c, g) {
        var j = a == null ? 0 : a.length;
        return j ? (c = g || c === o ? 1 : Kt(c), c = j - c, Yn(a, c < 0 ? 0 : c, j)) : [];
      }
      function O1(a, c) {
        return a && a.length ? Wo(a, zt(c, 3), !1, !0) : [];
      }
      function T1(a, c) {
        return a && a.length ? Wo(a, zt(c, 3)) : [];
      }
      var A1 = qt(function(a) {
        return xr(Cn(a, 1, xn, !0));
      }), C1 = qt(function(a) {
        var c = Jn(a);
        return xn(c) && (c = o), xr(Cn(a, 1, xn, !0), zt(c, 2));
      }), P1 = qt(function(a) {
        var c = Jn(a);
        return c = typeof c == "function" ? c : o, xr(Cn(a, 1, xn, !0), o, c);
      });
      function I1(a) {
        return a && a.length ? xr(a) : [];
      }
      function R1(a, c) {
        return a && a.length ? xr(a, zt(c, 2)) : [];
      }
      function $1(a, c) {
        return c = typeof c == "function" ? c : o, a && a.length ? xr(a, o, c) : [];
      }
      function Iu(a) {
        if (!(a && a.length))
          return [];
        var c = 0;
        return a = yr(a, function(g) {
          if (xn(g))
            return c = On(g.length, c), !0;
        }), Zl(c, function(g) {
          return yn(a, Yl(g));
        });
      }
      function Up(a, c) {
        if (!(a && a.length))
          return [];
        var g = Iu(a);
        return c == null ? g : yn(g, function(j) {
          return Mn(c, o, j);
        });
      }
      var N1 = qt(function(a, c) {
        return xn(a) ? uo(a, c) : [];
      }), L1 = qt(function(a) {
        return hu(yr(a, xn));
      }), j1 = qt(function(a) {
        var c = Jn(a);
        return xn(c) && (c = o), hu(yr(a, xn), zt(c, 2));
      }), D1 = qt(function(a) {
        var c = Jn(a);
        return c = typeof c == "function" ? c : o, hu(yr(a, xn), o, c);
      }), b1 = qt(Iu);
      function M1(a, c) {
        return lp(a || [], c || [], ao);
      }
      function F1(a, c) {
        return lp(a || [], c || [], co);
      }
      var z1 = qt(function(a) {
        var c = a.length, g = c > 1 ? a[c - 1] : o;
        return g = typeof g == "function" ? (a.pop(), g) : o, Up(a, g);
      });
      function Wp(a) {
        var c = rt(a);
        return c.__chain__ = !0, c;
      }
      function B1(a, c) {
        return c(a), a;
      }
      function Xo(a, c) {
        return c(a);
      }
      var U1 = dr(function(a) {
        var c = a.length, g = c ? a[0] : 0, j = this.__wrapped__, tt = function(lt) {
          return tu(lt, a);
        };
        return c > 1 || this.__actions__.length || !(j instanceof tn) || !pr(g) ? this.thru(tt) : (j = j.slice(g, +g + (c ? 1 : 0)), j.__actions__.push({
          func: Xo,
          args: [tt],
          thisArg: o
        }), new Kn(j, this.__chain__).thru(function(lt) {
          return c && !lt.length && lt.push(o), lt;
        }));
      });
      function W1() {
        return Wp(this);
      }
      function H1() {
        return new Kn(this.value(), this.__chain__);
      }
      function V1() {
        this.__values__ === o && (this.__values__ = tm(this.value()));
        var a = this.__index__ >= this.__values__.length, c = a ? o : this.__values__[this.__index__++];
        return { done: a, value: c };
      }
      function G1() {
        return this;
      }
      function K1(a) {
        for (var c, g = this; g instanceof bo; ) {
          var j = Dp(g);
          j.__index__ = 0, j.__values__ = o, c ? tt.__wrapped__ = j : c = j;
          var tt = j;
          g = g.__wrapped__;
        }
        return tt.__wrapped__ = a, c;
      }
      function Q1() {
        var a = this.__wrapped__;
        if (a instanceof tn) {
          var c = a;
          return this.__actions__.length && (c = new tn(this)), c = c.reverse(), c.__actions__.push({
            func: Xo,
            args: [Pu],
            thisArg: o
          }), new Kn(c, this.__chain__);
        }
        return this.thru(Pu);
      }
      function Y1() {
        return op(this.__wrapped__, this.__actions__);
      }
      var J1 = Ho(function(a, c, g) {
        dn.call(a, g) ? ++a[g] : fr(a, g, 1);
      });
      function q1(a, c, g) {
        var j = Vt(a) ? _s : Bv;
        return g && $n(a, c, g) && (c = o), j(a, zt(c, 3));
      }
      function X1(a, c) {
        var g = Vt(a) ? yr : Vs;
        return g(a, zt(c, 3));
      }
      var Z1 = mp(bp), eS = mp(Mp);
      function tS(a, c) {
        return Cn(Zo(a, c), 1);
      }
      function nS(a, c) {
        return Cn(Zo(a, c), Mt);
      }
      function rS(a, c, g) {
        return g = g === o ? 1 : Kt(g), Cn(Zo(a, c), g);
      }
      function Hp(a, c) {
        var g = Vt(a) ? Vn : _r;
        return g(a, zt(c, 3));
      }
      function Vp(a, c) {
        var g = Vt(a) ? xy : Hs;
        return g(a, zt(c, 3));
      }
      var iS = Ho(function(a, c, g) {
        dn.call(a, g) ? a[g].push(c) : fr(a, g, [c]);
      });
      function oS(a, c, g, j) {
        a = jn(a) ? a : Jr(a), g = g && !j ? Kt(g) : 0;
        var tt = a.length;
        return g < 0 && (g = On(tt + g, 0)), El(a) ? g <= tt && a.indexOf(c, g) > -1 : !!tt && Mr(a, c, g) > -1;
      }
      var lS = qt(function(a, c, g) {
        var j = -1, tt = typeof c == "function", lt = jn(a) ? wt(a.length) : [];
        return _r(a, function(ft) {
          lt[++j] = tt ? Mn(c, ft, g) : so(ft, c, g);
        }), lt;
      }), aS = Ho(function(a, c, g) {
        fr(a, g, c);
      });
      function Zo(a, c) {
        var g = Vt(a) ? yn : qs;
        return g(a, zt(c, 3));
      }
      function uS(a, c, g, j) {
        return a == null ? [] : (Vt(c) || (c = c == null ? [] : [c]), g = j ? o : g, Vt(g) || (g = g == null ? [] : [g]), _c(a, c, g));
      }
      var sS = Ho(function(a, c, g) {
        a[g ? 0 : 1].push(c);
      }, function() {
        return [[], []];
      });
      function fS(a, c, g) {
        var j = Vt(a) ? Kl : Os, tt = arguments.length < 3;
        return j(a, zt(c, 4), g, tt, _r);
      }
      function cS(a, c, g) {
        var j = Vt(a) ? Ey : Os, tt = arguments.length < 3;
        return j(a, zt(c, 4), g, tt, Hs);
      }
      function dS(a, c) {
        var g = Vt(a) ? yr : Vs;
        return g(a, _l(zt(c, 3)));
      }
      function pS(a) {
        var c = Vt(a) ? zs : o0;
        return c(a);
      }
      function hS(a, c, g) {
        (g ? $n(a, c, g) : c === o) ? c = 1 : c = Kt(c);
        var j = Vt(a) ? Dv : l0;
        return j(a, c);
      }
      function gS(a) {
        var c = Vt(a) ? bv : u0;
        return c(a);
      }
      function mS(a) {
        if (a == null)
          return 0;
        if (jn(a))
          return El(a) ? zr(a) : a.length;
        var c = In(a);
        return c == Xn || c == Zn ? a.size : au(a).length;
      }
      function yS(a, c, g) {
        var j = Vt(a) ? Ql : s0;
        return g && $n(a, c, g) && (c = o), j(a, zt(c, 3));
      }
      var vS = qt(function(a, c) {
        if (a == null)
          return [];
        var g = c.length;
        return g > 1 && $n(a, c[0], c[1]) ? c = [] : g > 2 && $n(c[0], c[1], c[2]) && (c = [c[0]]), _c(a, Cn(c, 1), []);
      }), yl = Xy || function() {
        return An.Date.now();
      };
      function SS(a, c) {
        if (typeof c != "function")
          throw new Gn(_);
        return a = Kt(a), function() {
          if (--a < 1)
            return c.apply(this, arguments);
        };
      }
      function Gp(a, c, g) {
        return c = g ? o : c, c = a && c == null ? a.length : c, cr(a, xt, o, o, o, o, c);
      }
      function Kp(a, c) {
        var g;
        if (typeof c != "function")
          throw new Gn(_);
        return a = Kt(a), function() {
          return --a > 0 && (g = c.apply(this, arguments)), a <= 1 && (c = o), g;
        };
      }
      var Ru = qt(function(a, c, g) {
        var j = ht;
        if (g.length) {
          var tt = Sr(g, Qr(Ru));
          j |= St;
        }
        return cr(a, j, c, g, tt);
      }), Qp = qt(function(a, c, g) {
        var j = ht | nt;
        if (g.length) {
          var tt = Sr(g, Qr(Qp));
          j |= St;
        }
        return cr(c, j, a, g, tt);
      });
      function Yp(a, c, g) {
        c = g ? o : c;
        var j = cr(a, it, o, o, o, o, o, c);
        return j.placeholder = Yp.placeholder, j;
      }
      function Jp(a, c, g) {
        c = g ? o : c;
        var j = cr(a, at, o, o, o, o, o, c);
        return j.placeholder = Jp.placeholder, j;
      }
      function qp(a, c, g) {
        var j, tt, lt, ft, dt, yt, kt = 0, Ot = !1, At = !1, Rt = !0;
        if (typeof a != "function")
          throw new Gn(_);
        c = qn(c) || 0, vn(g) && (Ot = !!g.leading, At = "maxWait" in g, lt = At ? On(qn(g.maxWait) || 0, c) : lt, Rt = "trailing" in g ? !!g.trailing : Rt);
        function bt(En) {
          var rr = j, mr = tt;
          return j = tt = o, kt = En, ft = a.apply(mr, rr), ft;
        }
        function Bt(En) {
          return kt = En, dt = go(Zt, c), Ot ? bt(En) : ft;
        }
        function Qt(En) {
          var rr = En - yt, mr = En - kt, hm = c - rr;
          return At ? Pn(hm, lt - mr) : hm;
        }
        function Ut(En) {
          var rr = En - yt, mr = En - kt;
          return yt === o || rr >= c || rr < 0 || At && mr >= lt;
        }
        function Zt() {
          var En = yl();
          if (Ut(En))
            return ln(En);
          dt = go(Zt, Qt(En));
        }
        function ln(En) {
          return dt = o, Rt && j ? bt(En) : (j = tt = o, ft);
        }
        function Un() {
          dt !== o && ap(dt), kt = 0, j = yt = tt = dt = o;
        }
        function Nn() {
          return dt === o ? ft : ln(yl());
        }
        function Wn() {
          var En = yl(), rr = Ut(En);
          if (j = arguments, tt = this, yt = En, rr) {
            if (dt === o)
              return Bt(yt);
            if (At)
              return ap(dt), dt = go(Zt, c), bt(yt);
          }
          return dt === o && (dt = go(Zt, c)), ft;
        }
        return Wn.cancel = Un, Wn.flush = Nn, Wn;
      }
      var wS = qt(function(a, c) {
        return Ws(a, 1, c);
      }), _S = qt(function(a, c, g) {
        return Ws(a, qn(c) || 0, g);
      });
      function xS(a) {
        return cr(a, Lt);
      }
      function Sl(a, c) {
        if (typeof a != "function" || c != null && typeof c != "function")
          throw new Gn(_);
        var g = function() {
          var j = arguments, tt = c ? c.apply(this, j) : j[0], lt = g.cache;
          if (lt.has(tt))
            return lt.get(tt);
          var ft = a.apply(this, j);
          return g.cache = lt.set(tt, ft) || lt, ft;
        };
        return g.cache = new (Sl.Cache || sr)(), g;
      }
      Sl.Cache = sr;
      function _l(a) {
        if (typeof a != "function")
          throw new Gn(_);
        return function() {
          var c = arguments;
          switch (c.length) {
            case 0:
              return !a.call(this);
            case 1:
              return !a.call(this, c[0]);
            case 2:
              return !a.call(this, c[0], c[1]);
            case 3:
              return !a.call(this, c[0], c[1], c[2]);
          }
          return !a.apply(this, c);
        };
      }
      function ES(a) {
        return Kp(2, a);
      }
      var kS = f0(function(a, c) {
        c = c.length == 1 && Vt(c[0]) ? yn(c[0], Fn(zt())) : yn(Cn(c, 1), Fn(zt()));
        var g = c.length;
        return qt(function(j) {
          for (var tt = -1, lt = Pn(j.length, g); ++tt < lt; )
            j[tt] = c[tt].call(this, j[tt]);
          return Mn(a, this, j);
        });
      }), $u = qt(function(a, c) {
        var g = Sr(c, Qr($u));
        return cr(a, St, o, c, g);
      }), Xp = qt(function(a, c) {
        var g = Sr(c, Qr(Xp));
        return cr(a, _t, o, c, g);
      }), OS = dr(function(a, c) {
        return cr(a, Tt, o, o, o, c);
      });
      function TS(a, c) {
        if (typeof a != "function")
          throw new Gn(_);
        return c = c === o ? c : Kt(c), qt(a, c);
      }
      function AS(a, c) {
        if (typeof a != "function")
          throw new Gn(_);
        return c = c == null ? 0 : On(Kt(c), 0), qt(function(g) {
          var j = g[c], tt = kr(g, 0, c);
          return j && vr(tt, j), Mn(a, this, tt);
        });
      }
      function CS(a, c, g) {
        var j = !0, tt = !0;
        if (typeof a != "function")
          throw new Gn(_);
        return vn(g) && (j = "leading" in g ? !!g.leading : j, tt = "trailing" in g ? !!g.trailing : tt), qp(a, c, {
          leading: j,
          maxWait: c,
          trailing: tt
        });
      }
      function PS(a) {
        return Gp(a, 1);
      }
      function IS(a, c) {
        return $u(mu(c), a);
      }
      function RS() {
        if (!arguments.length)
          return [];
        var a = arguments[0];
        return Vt(a) ? a : [a];
      }
      function $S(a) {
        return Qn(a, mt);
      }
      function NS(a, c) {
        return c = typeof c == "function" ? c : o, Qn(a, mt, c);
      }
      function LS(a) {
        return Qn(a, st | mt);
      }
      function jS(a, c) {
        return c = typeof c == "function" ? c : o, Qn(a, st | mt, c);
      }
      function DS(a, c) {
        return c == null || Us(a, c, Tn(c));
      }
      function nr(a, c) {
        return a === c || a !== a && c !== c;
      }
      var bS = Qo(iu), MS = Qo(function(a, c) {
        return a >= c;
      }), jr = Qs(function() {
        return arguments;
      }()) ? Qs : function(a) {
        return Sn(a) && dn.call(a, "callee") && !Ls.call(a, "callee");
      }, Vt = wt.isArray, FS = gs ? Fn(gs) : Kv;
      function jn(a) {
        return a != null && xl(a.length) && !hr(a);
      }
      function xn(a) {
        return Sn(a) && jn(a);
      }
      function zS(a) {
        return a === !0 || a === !1 || Sn(a) && Rn(a) == en;
      }
      var Or = ev || Wu, BS = ms ? Fn(ms) : Qv;
      function US(a) {
        return Sn(a) && a.nodeType === 1 && !mo(a);
      }
      function WS(a) {
        if (a == null)
          return !0;
        if (jn(a) && (Vt(a) || typeof a == "string" || typeof a.splice == "function" || Or(a) || Yr(a) || jr(a)))
          return !a.length;
        var c = In(a);
        if (c == Xn || c == Zn)
          return !a.size;
        if (ho(a))
          return !au(a).length;
        for (var g in a)
          if (dn.call(a, g))
            return !1;
        return !0;
      }
      function HS(a, c) {
        return fo(a, c);
      }
      function VS(a, c, g) {
        g = typeof g == "function" ? g : o;
        var j = g ? g(a, c) : o;
        return j === o ? fo(a, c, o, g) : !!j;
      }
      function Nu(a) {
        if (!Sn(a))
          return !1;
        var c = Rn(a);
        return c == cn || c == fn || typeof a.message == "string" && typeof a.name == "string" && !mo(a);
      }
      function GS(a) {
        return typeof a == "number" && Ds(a);
      }
      function hr(a) {
        if (!vn(a))
          return !1;
        var c = Rn(a);
        return c == _n || c == Tr || c == rn || c == mm;
      }
      function Zp(a) {
        return typeof a == "number" && a == Kt(a);
      }
      function xl(a) {
        return typeof a == "number" && a > -1 && a % 1 == 0 && a <= Ct;
      }
      function vn(a) {
        var c = typeof a;
        return a != null && (c == "object" || c == "function");
      }
      function Sn(a) {
        return a != null && typeof a == "object";
      }
      var _h = ys ? Fn(ys) : Jv;
      function KS(a, c) {
        return a === c || lu(a, c, Eu(c));
      }
      function QS(a, c, g) {
        return g = typeof g == "function" ? g : o, lu(a, c, Eu(c), g);
      }
      function YS(a) {
        return _g(a) && a != +a;
      }
      function JS(a) {
        if (N0(a))
          throw new Ht(h);
        return Ys(a);
      }
      function qS(a) {
        return a === null;
      }
      function XS(a) {
        return a == null;
      }
      function _g(a) {
        return typeof a == "number" || Sn(a) && Rn(a) == qr;
      }
      function mo(a) {
        if (!Sn(a) || Rn(a) != ar)
          return !1;
        var c = Io(a);
        if (c === null)
          return !0;
        var g = dn.call(c, "constructor") && c.constructor;
        return typeof g == "function" && g instanceof g && To.call(g) == Qy;
      }
      var Lu = vs ? Fn(vs) : qv;
      function ZS(a) {
        return Zp(a) && a >= -Ct && a <= Ct;
      }
      var em = Ss ? Fn(Ss) : Xv;
      function El(a) {
        return typeof a == "string" || !Vt(a) && Sn(a) && Rn(a) == Zr;
      }
      function Bn(a) {
        return typeof a == "symbol" || Sn(a) && Rn(a) == yo;
      }
      var Yr = ws ? Fn(ws) : Zv;
      function ew(a) {
        return a === o;
      }
      function tw(a) {
        return Sn(a) && In(a) == _i;
      }
      function nw(a) {
        return Sn(a) && Rn(a) == vm;
      }
      var rw = Qo(uu), iw = Qo(function(a, c) {
        return a <= c;
      });
      function tm(a) {
        if (!a)
          return [];
        if (jn(a))
          return El(a) ? er(a) : Ln(a);
        if (no && a[no])
          return Dy(a[no]());
        var c = In(a), g = c == Xn ? ga : c == Zn ? Eo : Jr;
        return g(a);
      }
      function gr(a) {
        if (!a)
          return a === 0 ? a : 0;
        if (a = qn(a), a === Mt || a === -Mt) {
          var c = a < 0 ? -1 : 1;
          return c * It;
        }
        return a === a ? a : 0;
      }
      function Kt(a) {
        var c = gr(a), g = c % 1;
        return c === c ? g ? c - g : c : 0;
      }
      function nm(a) {
        return a ? Rr(Kt(a), 0, Yt) : 0;
      }
      function qn(a) {
        if (typeof a == "number")
          return a;
        if (Bn(a))
          return jt;
        if (vn(a)) {
          var c = typeof a.valueOf == "function" ? a.valueOf() : a;
          a = vn(c) ? c + "" : c;
        }
        if (typeof a != "string")
          return a === 0 ? a : +a;
        a = Ts(a);
        var g = Fm.test(a);
        return g || Bm.test(a) ? Sy(a.slice(2), g ? 2 : 8) : Mm.test(a) ? jt : +a;
      }
      function rm(a) {
        return or(a, Dn(a));
      }
      function ow(a) {
        return a ? Rr(Kt(a), -Ct, Ct) : a === 0 ? a : 0;
      }
      function sn(a) {
        return a == null ? "" : zn(a);
      }
      var lw = Gr(function(a, c) {
        if (ho(c) || jn(c)) {
          or(c, Tn(c), a);
          return;
        }
        for (var g in c)
          dn.call(c, g) && ao(a, g, c[g]);
      }), im = Gr(function(a, c) {
        or(c, Dn(c), a);
      }), Ol = Gr(function(a, c, g, j) {
        or(c, Dn(c), a, j);
      }), aw = Gr(function(a, c, g, j) {
        or(c, Tn(c), a, j);
      }), uw = dr(tu);
      function sw(a, c) {
        var g = Vr(a);
        return c == null ? g : Bs(g, c);
      }
      var fw = qt(function(a, c) {
        a = hn(a);
        var g = -1, j = c.length, tt = j > 2 ? c[2] : o;
        for (tt && $n(c[0], c[1], tt) && (j = 1); ++g < j; )
          for (var lt = c[g], ft = Dn(lt), dt = -1, yt = ft.length; ++dt < yt; ) {
            var kt = ft[dt], Ot = a[kt];
            (Ot === o || nr(Ot, Ur[kt]) && !dn.call(a, kt)) && (a[kt] = lt[kt]);
          }
        return a;
      }), cw = qt(function(a) {
        return a.push(o, Ep), Mn(om, o, a);
      });
      function dw(a, c) {
        return xs(a, zt(c, 3), ir);
      }
      function pw(a, c) {
        return xs(a, zt(c, 3), ru);
      }
      function hw(a, c) {
        return a == null ? a : nu(a, zt(c, 3), Dn);
      }
      function gw(a, c) {
        return a == null ? a : Gs(a, zt(c, 3), Dn);
      }
      function mw(a, c) {
        return a && ir(a, zt(c, 3));
      }
      function yw(a, c) {
        return a && ru(a, zt(c, 3));
      }
      function vw(a) {
        return a == null ? [] : zo(a, Tn(a));
      }
      function Sw(a) {
        return a == null ? [] : zo(a, Dn(a));
      }
      function ju(a, c, g) {
        var j = a == null ? o : $r(a, c);
        return j === o ? g : j;
      }
      function ww(a, c) {
        return a != null && Tp(a, c, Wv);
      }
      function Du(a, c) {
        return a != null && Tp(a, c, Hv);
      }
      var _w = vp(function(a, c, g) {
        c != null && typeof c.toString != "function" && (c = Ao.call(c)), a[c] = g;
      }, Mu(bn)), xw = vp(function(a, c, g) {
        c != null && typeof c.toString != "function" && (c = Ao.call(c)), dn.call(a, c) ? a[c].push(g) : a[c] = [g];
      }, zt), Ew = qt(so);
      function Tn(a) {
        return jn(a) ? Fs(a) : au(a);
      }
      function Dn(a) {
        return jn(a) ? Fs(a, !0) : e0(a);
      }
      function kw(a, c) {
        var g = {};
        return c = zt(c, 3), ir(a, function(j, tt, lt) {
          fr(g, c(j, tt, lt), j);
        }), g;
      }
      function Ow(a, c) {
        var g = {};
        return c = zt(c, 3), ir(a, function(j, tt, lt) {
          fr(g, tt, c(j, tt, lt));
        }), g;
      }
      var Tw = Gr(function(a, c, g) {
        Bo(a, c, g);
      }), om = Gr(function(a, c, g, j) {
        Bo(a, c, g, j);
      }), Aw = dr(function(a, c) {
        var g = {};
        if (a == null)
          return g;
        var j = !1;
        c = yn(c, function(lt) {
          return lt = Er(lt, a), j || (j = lt.length > 1), lt;
        }), or(a, _u(a), g), j && (g = Qn(g, st | ct | mt, _0));
        for (var tt = c.length; tt--; )
          pu(g, c[tt]);
        return g;
      });
      function Cw(a, c) {
        return lm(a, _l(zt(c)));
      }
      var Pw = dr(function(a, c) {
        return a == null ? {} : n0(a, c);
      });
      function lm(a, c) {
        if (a == null)
          return {};
        var g = yn(_u(a), function(j) {
          return [j];
        });
        return c = zt(c), _d(a, g, function(j, tt) {
          return c(j, tt[0]);
        });
      }
      function Iw(a, c, g) {
        c = Er(c, a);
        var j = -1, tt = c.length;
        for (tt || (tt = 1, a = o); ++j < tt; ) {
          var lt = a == null ? o : a[lr(c[j])];
          lt === o && (j = tt, lt = g), a = hr(lt) ? lt.call(a) : lt;
        }
        return a;
      }
      function Rw(a, c, g) {
        return a == null ? a : co(a, c, g);
      }
      function $w(a, c, g, j) {
        return j = typeof j == "function" ? j : o, a == null ? a : co(a, c, g, j);
      }
      var am = _p(Tn), um = _p(Dn);
      function Nw(a, c, g) {
        var j = Vt(a), tt = j || Or(a) || Yr(a);
        if (c = zt(c, 4), g == null) {
          var lt = a && a.constructor;
          tt ? g = j ? new lt() : [] : vn(a) ? g = hr(lt) ? Vr(Io(a)) : {} : g = {};
        }
        return (tt ? Vn : ir)(a, function(ft, dt, yt) {
          return c(g, ft, dt, yt);
        }), g;
      }
      function Lw(a, c) {
        return a == null ? !0 : pu(a, c);
      }
      function jw(a, c, g) {
        return a == null ? a : ip(a, c, mu(g));
      }
      function Dw(a, c, g, j) {
        return j = typeof j == "function" ? j : o, a == null ? a : ip(a, c, mu(g), j);
      }
      function Jr(a) {
        return a == null ? [] : na(a, Tn(a));
      }
      function bw(a) {
        return a == null ? [] : na(a, Dn(a));
      }
      function Mw(a, c, g) {
        return g === o && (g = c, c = o), g !== o && (g = qn(g), g = g === g ? g : 0), c !== o && (c = qn(c), c = c === c ? c : 0), Rr(qn(a), c, g);
      }
      function Fw(a, c, g) {
        return c = gr(c), g === o ? (g = c, c = 0) : g = gr(g), a = qn(a), Vv(a, c, g);
      }
      function zw(a, c, g) {
        if (g && typeof g != "boolean" && $n(a, c, g) && (c = g = o), g === o && (typeof c == "boolean" ? (g = c, c = o) : typeof a == "boolean" && (g = a, a = o)), a === o && c === o ? (a = 0, c = 1) : (a = gr(a), c === o ? (c = a, a = 0) : c = gr(c)), a > c) {
          var j = a;
          a = c, c = j;
        }
        if (g || a % 1 || c % 1) {
          var tt = bs();
          return Pn(a + tt * (c - a + vy("1e-" + ((tt + "").length - 1))), c);
        }
        return fu(a, c);
      }
      var Bw = Kr(function(a, c, g) {
        return c = c.toLowerCase(), a + (g ? sm(c) : c);
      });
      function sm(a) {
        return bu(sn(a).toLowerCase());
      }
      function fm(a) {
        return a = sn(a), a && a.replace(Wm, Ry).replace(uy, "");
      }
      function Uw(a, c, g) {
        a = sn(a), c = zn(c);
        var j = a.length;
        g = g === o ? j : Rr(Kt(g), 0, j);
        var tt = g;
        return g -= c.length, g >= 0 && a.slice(g, tt) == c;
      }
      function Ww(a) {
        return a = sn(a), a && Em.test(a) ? a.replace(Gu, $y) : a;
      }
      function Hw(a) {
        return a = sn(a), a && Pm.test(a) ? a.replace(Dl, "\\$&") : a;
      }
      var Vw = Kr(function(a, c, g) {
        return a + (g ? "-" : "") + c.toLowerCase();
      }), Gw = Kr(function(a, c, g) {
        return a + (g ? " " : "") + c.toLowerCase();
      }), Kw = gp("toLowerCase");
      function Qw(a, c, g) {
        a = sn(a), c = Kt(c);
        var j = c ? zr(a) : 0;
        if (!c || j >= c)
          return a;
        var tt = (c - j) / 2;
        return Ko(Lo(tt), g) + a + Ko(No(tt), g);
      }
      function Yw(a, c, g) {
        a = sn(a), c = Kt(c);
        var j = c ? zr(a) : 0;
        return c && j < c ? a + Ko(c - j, g) : a;
      }
      function Jw(a, c, g) {
        a = sn(a), c = Kt(c);
        var j = c ? zr(a) : 0;
        return c && j < c ? Ko(c - j, g) + a : a;
      }
      function qw(a, c, g) {
        return g || c == null ? c = 0 : c && (c = +c), iv(sn(a).replace(Ml, ""), c || 0);
      }
      function Xw(a, c, g) {
        return (g ? $n(a, c, g) : c === o) ? c = 1 : c = Kt(c), cu(sn(a), c);
      }
      function Zw() {
        var a = arguments, c = sn(a[0]);
        return a.length < 3 ? c : c.replace(a[1], a[2]);
      }
      var e_ = Kr(function(a, c, g) {
        return a + (g ? "_" : "") + c.toLowerCase();
      });
      function t_(a, c, g) {
        return g && typeof g != "number" && $n(a, c, g) && (c = g = o), g = g === o ? Yt : g >>> 0, g ? (a = sn(a), a && (typeof c == "string" || c != null && !Lu(c)) && (c = zn(c), !c && Fr(a)) ? kr(er(a), 0, g) : a.split(c, g)) : [];
      }
      var n_ = Kr(function(a, c, g) {
        return a + (g ? " " : "") + bu(c);
      });
      function r_(a, c, g) {
        return a = sn(a), g = g == null ? 0 : Rr(Kt(g), 0, a.length), c = zn(c), a.slice(g, g + c.length) == c;
      }
      function i_(a, c, g) {
        var j = rt.templateSettings;
        g && $n(a, c, g) && (c = o), a = sn(a), c = Ol({}, c, j, xp);
        var tt = Ol({}, c.imports, j.imports, xp), lt = Tn(tt), ft = na(tt, lt), dt, yt, kt = 0, Ot = c.interpolate || vo, At = "__p += '", Rt = _a(
          (c.escape || vo).source + "|" + Ot.source + "|" + (Ot === Ku ? bm : vo).source + "|" + (c.evaluate || vo).source + "|$",
          "g"
        ), bt = "//# sourceURL=" + (dn.call(c, "sourceURL") ? (c.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++py + "]") + `
`;
        a.replace(Rt, function(Ut, Zt, ln, Un, Nn, Wn) {
          return ln || (ln = Un), At += a.slice(kt, Wn).replace(Hm, Ny), Zt && (dt = !0, At += `' +
__e(` + Zt + `) +
'`), Nn && (yt = !0, At += `';
` + Nn + `;
__p += '`), ln && (At += `' +
((__t = (` + ln + `)) == null ? '' : __t) +
'`), kt = Wn + Ut.length, Ut;
        }), At += `';
`;
        var Bt = dn.call(c, "variable") && c.variable;
        if (!Bt)
          At = `with (obj) {
` + At + `
}
`;
        else if (jm.test(Bt))
          throw new Ht(b);
        At = (yt ? At.replace(Sm, "") : At).replace(wm, "$1").replace(_m, "$1;"), At = "function(" + (Bt || "obj") + `) {
` + (Bt ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (dt ? ", __e = _.escape" : "") + (yt ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + At + `return __p
}`;
        var Qt = dm(function() {
          return un(lt, bt + "return " + At).apply(o, ft);
        });
        if (Qt.source = At, Nu(Qt))
          throw Qt;
        return Qt;
      }
      function o_(a) {
        return sn(a).toLowerCase();
      }
      function l_(a) {
        return sn(a).toUpperCase();
      }
      function a_(a, c, g) {
        if (a = sn(a), a && (g || c === o))
          return Ts(a);
        if (!a || !(c = zn(c)))
          return a;
        var j = er(a), tt = er(c), lt = As(j, tt), ft = Cs(j, tt) + 1;
        return kr(j, lt, ft).join("");
      }
      function u_(a, c, g) {
        if (a = sn(a), a && (g || c === o))
          return a.slice(0, Is(a) + 1);
        if (!a || !(c = zn(c)))
          return a;
        var j = er(a), tt = Cs(j, er(c)) + 1;
        return kr(j, 0, tt).join("");
      }
      function s_(a, c, g) {
        if (a = sn(a), a && (g || c === o))
          return a.replace(Ml, "");
        if (!a || !(c = zn(c)))
          return a;
        var j = er(a), tt = As(j, er(c));
        return kr(j, tt).join("");
      }
      function f_(a, c) {
        var g = $t, j = Ft;
        if (vn(c)) {
          var tt = "separator" in c ? c.separator : tt;
          g = "length" in c ? Kt(c.length) : g, j = "omission" in c ? zn(c.omission) : j;
        }
        a = sn(a);
        var lt = a.length;
        if (Fr(a)) {
          var ft = er(a);
          lt = ft.length;
        }
        if (g >= lt)
          return a;
        var dt = g - zr(j);
        if (dt < 1)
          return j;
        var yt = ft ? kr(ft, 0, dt).join("") : a.slice(0, dt);
        if (tt === o)
          return yt + j;
        if (ft && (dt += yt.length - dt), Lu(tt)) {
          if (a.slice(dt).search(tt)) {
            var kt, Ot = yt;
            for (tt.global || (tt = _a(tt.source, sn(Qu.exec(tt)) + "g")), tt.lastIndex = 0; kt = tt.exec(Ot); )
              var At = kt.index;
            yt = yt.slice(0, At === o ? dt : At);
          }
        } else if (a.indexOf(zn(tt), dt) != dt) {
          var Rt = yt.lastIndexOf(tt);
          Rt > -1 && (yt = yt.slice(0, Rt));
        }
        return yt + j;
      }
      function c_(a) {
        return a = sn(a), a && xm.test(a) ? a.replace(Vu, zy) : a;
      }
      var d_ = Kr(function(a, c, g) {
        return a + (g ? " " : "") + c.toUpperCase();
      }), bu = gp("toUpperCase");
      function cm(a, c, g) {
        return a = sn(a), c = g ? o : c, c === o ? jy(a) ? Wy(a) : Ty(a) : a.match(c) || [];
      }
      var dm = qt(function(a, c) {
        try {
          return Mn(a, o, c);
        } catch (g) {
          return Nu(g) ? g : new Ht(g);
        }
      }), p_ = dr(function(a, c) {
        return Vn(c, function(g) {
          g = lr(g), fr(a, g, Ru(a[g], a));
        }), a;
      });
      function h_(a) {
        var c = a == null ? 0 : a.length, g = zt();
        return a = c ? yn(a, function(j) {
          if (typeof j[1] != "function")
            throw new Gn(_);
          return [g(j[0]), j[1]];
        }) : [], qt(function(j) {
          for (var tt = -1; ++tt < c; ) {
            var lt = a[tt];
            if (Mn(lt[0], this, j))
              return Mn(lt[1], this, j);
          }
        });
      }
      function g_(a) {
        return zv(Qn(a, st));
      }
      function Mu(a) {
        return function() {
          return a;
        };
      }
      function m_(a, c) {
        return a == null || a !== a ? c : a;
      }
      var y_ = yp(), v_ = yp(!0);
      function bn(a) {
        return a;
      }
      function Fu(a) {
        return Js(typeof a == "function" ? a : Qn(a, st));
      }
      function S_(a) {
        return Xs(Qn(a, st));
      }
      function w_(a, c) {
        return Zs(a, Qn(c, st));
      }
      var __ = qt(function(a, c) {
        return function(g) {
          return so(g, a, c);
        };
      }), x_ = qt(function(a, c) {
        return function(g) {
          return so(a, g, c);
        };
      });
      function zu(a, c, g) {
        var j = Tn(c), tt = zo(c, j);
        g == null && !(vn(c) && (tt.length || !j.length)) && (g = c, c = a, a = this, tt = zo(c, Tn(c)));
        var lt = !(vn(g) && "chain" in g) || !!g.chain, ft = hr(a);
        return Vn(tt, function(dt) {
          var yt = c[dt];
          a[dt] = yt, ft && (a.prototype[dt] = function() {
            var kt = this.__chain__;
            if (lt || kt) {
              var Ot = a(this.__wrapped__), At = Ot.__actions__ = Ln(this.__actions__);
              return At.push({ func: yt, args: arguments, thisArg: a }), Ot.__chain__ = kt, Ot;
            }
            return yt.apply(a, vr([this.value()], arguments));
          });
        }), a;
      }
      function E_() {
        return An._ === this && (An._ = Yy), this;
      }
      function Bu() {
      }
      function k_(a) {
        return a = Kt(a), qt(function(c) {
          return _f(c, a);
        });
      }
      var O_ = vu(yn), T_ = vu(_s), A_ = vu(Ql);
      function pm(a) {
        return Ou(a) ? Yl(lr(a)) : r0(a);
      }
      function C_(a) {
        return function(c) {
          return a == null ? o : $r(a, c);
        };
      }
      var P_ = Sp(), I_ = Sp(!0);
      function Uu() {
        return [];
      }
      function Wu() {
        return !1;
      }
      function R_() {
        return {};
      }
      function $_() {
        return "";
      }
      function N_() {
        return !0;
      }
      function L_(a, c) {
        if (a = Kt(a), a < 1 || a > Ct)
          return [];
        var g = Yt, j = Pn(a, Yt);
        c = zt(c), a -= Yt;
        for (var tt = Zl(j, c); ++g < a; )
          c(g);
        return tt;
      }
      function j_(a) {
        return Vt(a) ? yn(a, lr) : Bn(a) ? [a] : Ln(jp(sn(a)));
      }
      function D_(a) {
        var c = ++Ky;
        return sn(a) + c;
      }
      var b_ = Go(function(a, c) {
        return a + c;
      }, 0), M_ = Su("ceil"), F_ = Go(function(a, c) {
        return a / c;
      }, 1), z_ = Su("floor");
      function B_(a) {
        return a && a.length ? Fo(a, bn, iu) : o;
      }
      function U_(a, c) {
        return a && a.length ? Fo(a, zt(c, 2), iu) : o;
      }
      function W_(a) {
        return ks(a, bn);
      }
      function H_(a, c) {
        return ks(a, zt(c, 2));
      }
      function V_(a) {
        return a && a.length ? Fo(a, bn, uu) : o;
      }
      function G_(a, c) {
        return a && a.length ? Fo(a, zt(c, 2), uu) : o;
      }
      var K_ = Go(function(a, c) {
        return a * c;
      }, 1), Q_ = Su("round"), Y_ = Go(function(a, c) {
        return a - c;
      }, 0);
      function J_(a) {
        return a && a.length ? Xl(a, bn) : 0;
      }
      function q_(a, c) {
        return a && a.length ? Xl(a, zt(c, 2)) : 0;
      }
      return rt.after = SS, rt.ary = Gp, rt.assign = lw, rt.assignIn = im, rt.assignInWith = Ol, rt.assignWith = aw, rt.at = uw, rt.before = Kp, rt.bind = Ru, rt.bindAll = p_, rt.bindKey = Qp, rt.castArray = RS, rt.chain = Wp, rt.chunk = z0, rt.compact = B0, rt.concat = U0, rt.cond = h_, rt.conforms = g_, rt.constant = Mu, rt.countBy = J1, rt.create = sw, rt.curry = Yp, rt.curryRight = Jp, rt.debounce = qp, rt.defaults = fw, rt.defaultsDeep = cw, rt.defer = wS, rt.delay = _S, rt.difference = W0, rt.differenceBy = H0, rt.differenceWith = V0, rt.drop = G0, rt.dropRight = K0, rt.dropRightWhile = Q0, rt.dropWhile = Y0, rt.fill = J0, rt.filter = X1, rt.flatMap = tS, rt.flatMapDeep = nS, rt.flatMapDepth = rS, rt.flatten = Fp, rt.flattenDeep = q0, rt.flattenDepth = X0, rt.flip = xS, rt.flow = y_, rt.flowRight = v_, rt.fromPairs = Z0, rt.functions = vw, rt.functionsIn = Sw, rt.groupBy = iS, rt.initial = t1, rt.intersection = n1, rt.intersectionBy = r1, rt.intersectionWith = i1, rt.invert = _w, rt.invertBy = xw, rt.invokeMap = lS, rt.iteratee = Fu, rt.keyBy = aS, rt.keys = Tn, rt.keysIn = Dn, rt.map = Zo, rt.mapKeys = kw, rt.mapValues = Ow, rt.matches = S_, rt.matchesProperty = w_, rt.memoize = Sl, rt.merge = Tw, rt.mergeWith = om, rt.method = __, rt.methodOf = x_, rt.mixin = zu, rt.negate = _l, rt.nthArg = k_, rt.omit = Aw, rt.omitBy = Cw, rt.once = ES, rt.orderBy = uS, rt.over = O_, rt.overArgs = kS, rt.overEvery = T_, rt.overSome = A_, rt.partial = $u, rt.partialRight = Xp, rt.partition = sS, rt.pick = Pw, rt.pickBy = lm, rt.property = pm, rt.propertyOf = C_, rt.pull = u1, rt.pullAll = Bp, rt.pullAllBy = s1, rt.pullAllWith = f1, rt.pullAt = c1, rt.range = P_, rt.rangeRight = I_, rt.rearg = OS, rt.reject = dS, rt.remove = d1, rt.rest = TS, rt.reverse = Pu, rt.sampleSize = hS, rt.set = Rw, rt.setWith = $w, rt.shuffle = gS, rt.slice = p1, rt.sortBy = vS, rt.sortedUniq = w1, rt.sortedUniqBy = _1, rt.split = t_, rt.spread = AS, rt.tail = x1, rt.take = E1, rt.takeRight = k1, rt.takeRightWhile = O1, rt.takeWhile = T1, rt.tap = B1, rt.throttle = CS, rt.thru = Xo, rt.toArray = tm, rt.toPairs = am, rt.toPairsIn = um, rt.toPath = j_, rt.toPlainObject = rm, rt.transform = Nw, rt.unary = PS, rt.union = A1, rt.unionBy = C1, rt.unionWith = P1, rt.uniq = I1, rt.uniqBy = R1, rt.uniqWith = $1, rt.unset = Lw, rt.unzip = Iu, rt.unzipWith = Up, rt.update = jw, rt.updateWith = Dw, rt.values = Jr, rt.valuesIn = bw, rt.without = N1, rt.words = cm, rt.wrap = IS, rt.xor = L1, rt.xorBy = j1, rt.xorWith = D1, rt.zip = b1, rt.zipObject = M1, rt.zipObjectDeep = F1, rt.zipWith = z1, rt.entries = am, rt.entriesIn = um, rt.extend = im, rt.extendWith = Ol, zu(rt, rt), rt.add = b_, rt.attempt = dm, rt.camelCase = Bw, rt.capitalize = sm, rt.ceil = M_, rt.clamp = Mw, rt.clone = $S, rt.cloneDeep = LS, rt.cloneDeepWith = jS, rt.cloneWith = NS, rt.conformsTo = DS, rt.deburr = fm, rt.defaultTo = m_, rt.divide = F_, rt.endsWith = Uw, rt.eq = nr, rt.escape = Ww, rt.escapeRegExp = Hw, rt.every = q1, rt.find = Z1, rt.findIndex = bp, rt.findKey = dw, rt.findLast = eS, rt.findLastIndex = Mp, rt.findLastKey = pw, rt.floor = z_, rt.forEach = Hp, rt.forEachRight = Vp, rt.forIn = hw, rt.forInRight = gw, rt.forOwn = mw, rt.forOwnRight = yw, rt.get = ju, rt.gt = bS, rt.gte = MS, rt.has = ww, rt.hasIn = Du, rt.head = zp, rt.identity = bn, rt.includes = oS, rt.indexOf = e1, rt.inRange = Fw, rt.invoke = Ew, rt.isArguments = jr, rt.isArray = Vt, rt.isArrayBuffer = FS, rt.isArrayLike = jn, rt.isArrayLikeObject = xn, rt.isBoolean = zS, rt.isBuffer = Or, rt.isDate = BS, rt.isElement = US, rt.isEmpty = WS, rt.isEqual = HS, rt.isEqualWith = VS, rt.isError = Nu, rt.isFinite = GS, rt.isFunction = hr, rt.isInteger = Zp, rt.isLength = xl, rt.isMap = _h, rt.isMatch = KS, rt.isMatchWith = QS, rt.isNaN = YS, rt.isNative = JS, rt.isNil = XS, rt.isNull = qS, rt.isNumber = _g, rt.isObject = vn, rt.isObjectLike = Sn, rt.isPlainObject = mo, rt.isRegExp = Lu, rt.isSafeInteger = ZS, rt.isSet = em, rt.isString = El, rt.isSymbol = Bn, rt.isTypedArray = Yr, rt.isUndefined = ew, rt.isWeakMap = tw, rt.isWeakSet = nw, rt.join = o1, rt.kebabCase = Vw, rt.last = Jn, rt.lastIndexOf = l1, rt.lowerCase = Gw, rt.lowerFirst = Kw, rt.lt = rw, rt.lte = iw, rt.max = B_, rt.maxBy = U_, rt.mean = W_, rt.meanBy = H_, rt.min = V_, rt.minBy = G_, rt.stubArray = Uu, rt.stubFalse = Wu, rt.stubObject = R_, rt.stubString = $_, rt.stubTrue = N_, rt.multiply = K_, rt.nth = a1, rt.noConflict = E_, rt.noop = Bu, rt.now = yl, rt.pad = Qw, rt.padEnd = Yw, rt.padStart = Jw, rt.parseInt = qw, rt.random = zw, rt.reduce = fS, rt.reduceRight = cS, rt.repeat = Xw, rt.replace = Zw, rt.result = Iw, rt.round = Q_, rt.runInContext = gt, rt.sample = pS, rt.size = mS, rt.snakeCase = e_, rt.some = yS, rt.sortedIndex = h1, rt.sortedIndexBy = g1, rt.sortedIndexOf = m1, rt.sortedLastIndex = y1, rt.sortedLastIndexBy = v1, rt.sortedLastIndexOf = S1, rt.startCase = n_, rt.startsWith = r_, rt.subtract = Y_, rt.sum = J_, rt.sumBy = q_, rt.template = i_, rt.times = L_, rt.toFinite = gr, rt.toInteger = Kt, rt.toLength = nm, rt.toLower = o_, rt.toNumber = qn, rt.toSafeInteger = ow, rt.toString = sn, rt.toUpper = l_, rt.trim = a_, rt.trimEnd = u_, rt.trimStart = s_, rt.truncate = f_, rt.unescape = c_, rt.uniqueId = D_, rt.upperCase = d_, rt.upperFirst = bu, rt.each = Hp, rt.eachRight = Vp, rt.first = zp, zu(rt, function() {
        var a = {};
        return ir(rt, function(c, g) {
          dn.call(rt.prototype, g) || (a[g] = c);
        }), a;
      }(), { chain: !1 }), rt.VERSION = s, Vn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(a) {
        rt[a].placeholder = rt;
      }), Vn(["drop", "take"], function(a, c) {
        tn.prototype[a] = function(g) {
          g = g === o ? 1 : On(Kt(g), 0);
          var j = this.__filtered__ && !c ? new tn(this) : this.clone();
          return j.__filtered__ ? j.__takeCount__ = Pn(g, j.__takeCount__) : j.__views__.push({
            size: Pn(g, Yt),
            type: a + (j.__dir__ < 0 ? "Right" : "")
          }), j;
        }, tn.prototype[a + "Right"] = function(g) {
          return this.reverse()[a](g).reverse();
        };
      }), Vn(["filter", "map", "takeWhile"], function(a, c) {
        var g = c + 1, j = g == pn || g == Gt;
        tn.prototype[a] = function(tt) {
          var lt = this.clone();
          return lt.__iteratees__.push({
            iteratee: zt(tt, 3),
            type: g
          }), lt.__filtered__ = lt.__filtered__ || j, lt;
        };
      }), Vn(["head", "last"], function(a, c) {
        var g = "take" + (c ? "Right" : "");
        tn.prototype[a] = function() {
          return this[g](1).value()[0];
        };
      }), Vn(["initial", "tail"], function(a, c) {
        var g = "drop" + (c ? "" : "Right");
        tn.prototype[a] = function() {
          return this.__filtered__ ? new tn(this) : this[g](1);
        };
      }), tn.prototype.compact = function() {
        return this.filter(bn);
      }, tn.prototype.find = function(a) {
        return this.filter(a).head();
      }, tn.prototype.findLast = function(a) {
        return this.reverse().find(a);
      }, tn.prototype.invokeMap = qt(function(a, c) {
        return typeof a == "function" ? new tn(this) : this.map(function(g) {
          return so(g, a, c);
        });
      }), tn.prototype.reject = function(a) {
        return this.filter(_l(zt(a)));
      }, tn.prototype.slice = function(a, c) {
        a = Kt(a);
        var g = this;
        return g.__filtered__ && (a > 0 || c < 0) ? new tn(g) : (a < 0 ? g = g.takeRight(-a) : a && (g = g.drop(a)), c !== o && (c = Kt(c), g = c < 0 ? g.dropRight(-c) : g.take(c - a)), g);
      }, tn.prototype.takeRightWhile = function(a) {
        return this.reverse().takeWhile(a).reverse();
      }, tn.prototype.toArray = function() {
        return this.take(Yt);
      }, ir(tn.prototype, function(a, c) {
        var g = /^(?:filter|find|map|reject)|While$/.test(c), j = /^(?:head|last)$/.test(c), tt = rt[j ? "take" + (c == "last" ? "Right" : "") : c], lt = j || /^find/.test(c);
        tt && (rt.prototype[c] = function() {
          var ft = this.__wrapped__, dt = j ? [1] : arguments, yt = ft instanceof tn, kt = dt[0], Ot = yt || Vt(ft), At = function(Zt) {
            var ln = tt.apply(rt, vr([Zt], dt));
            return j && Rt ? ln[0] : ln;
          };
          Ot && g && typeof kt == "function" && kt.length != 1 && (yt = Ot = !1);
          var Rt = this.__chain__, bt = !!this.__actions__.length, Bt = lt && !Rt, Qt = yt && !bt;
          if (!lt && Ot) {
            ft = Qt ? ft : new tn(this);
            var Ut = a.apply(ft, dt);
            return Ut.__actions__.push({ func: Xo, args: [At], thisArg: o }), new Kn(Ut, Rt);
          }
          return Bt && Qt ? a.apply(this, dt) : (Ut = this.thru(At), Bt ? j ? Ut.value()[0] : Ut.value() : Ut);
        });
      }), Vn(["pop", "push", "shift", "sort", "splice", "unshift"], function(a) {
        var c = ko[a], g = /^(?:push|sort|unshift)$/.test(a) ? "tap" : "thru", j = /^(?:pop|shift)$/.test(a);
        rt.prototype[a] = function() {
          var tt = arguments;
          if (j && !this.__chain__) {
            var lt = this.value();
            return c.apply(Vt(lt) ? lt : [], tt);
          }
          return this[g](function(ft) {
            return c.apply(Vt(ft) ? ft : [], tt);
          });
        };
      }), ir(tn.prototype, function(a, c) {
        var g = rt[c];
        if (g) {
          var j = g.name + "";
          dn.call(Hr, j) || (Hr[j] = []), Hr[j].push({ name: c, func: g });
        }
      }), Hr[Vo(o, nt).name] = [{
        name: "wrapper",
        func: o
      }], tn.prototype.clone = cv, tn.prototype.reverse = dv, tn.prototype.value = pv, rt.prototype.at = U1, rt.prototype.chain = W1, rt.prototype.commit = H1, rt.prototype.next = V1, rt.prototype.plant = K1, rt.prototype.reverse = Q1, rt.prototype.toJSON = rt.prototype.valueOf = rt.prototype.value = Y1, rt.prototype.first = rt.prototype.head, no && (rt.prototype[no] = G1), rt;
    }, Br = Hy();
    Ar ? ((Ar.exports = Br)._ = Br, Hl._ = Br) : An._ = Br;
  }).call(commonjsGlobal);
})(lodash, lodashExports);
function bind$2(e, i) {
  return function() {
    return e.apply(i, arguments);
  };
}
const { toString } = Object.prototype, { getPrototypeOf } = Object, kindOf = ((e) => (i) => {
  const o = toString.call(i);
  return e[o] || (e[o] = o.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), kindOfTest = (e) => (e = e.toLowerCase(), (i) => kindOf(i) === e), typeOfTest = (e) => (i) => typeof i === e, { isArray: isArray$4 } = Array, isUndefined = typeOfTest("undefined");
function isBuffer$1(e) {
  return e !== null && !isUndefined(e) && e.constructor !== null && !isUndefined(e.constructor) && isFunction(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(e) {
  let i;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? i = ArrayBuffer.isView(e) : i = e && e.buffer && isArrayBuffer(e.buffer), i;
}
const isString$1 = typeOfTest("string"), isFunction = typeOfTest("function"), isNumber$1 = typeOfTest("number"), isObject = (e) => e !== null && typeof e == "object", isBoolean$1 = (e) => e === !0 || e === !1, isPlainObject = (e) => {
  if (kindOf(e) !== "object")
    return !1;
  const i = getPrototypeOf(e);
  return (i === null || i === Object.prototype || Object.getPrototypeOf(i) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, isDate$1 = kindOfTest("Date"), isFile = kindOfTest("File"), isBlob = kindOfTest("Blob"), isFileList = kindOfTest("FileList"), isStream = (e) => isObject(e) && isFunction(e.pipe), isFormData = (e) => {
  const i = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || toString.call(e) === i || isFunction(e.toString) && e.toString() === i);
}, isURLSearchParams = kindOfTest("URLSearchParams"), trim = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(e, i, { allOwnKeys: o = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, d;
  if (typeof e != "object" && (e = [e]), isArray$4(e))
    for (s = 0, d = e.length; s < d; s++)
      i.call(null, e[s], s, e);
  else {
    const h = o ? Object.getOwnPropertyNames(e) : Object.keys(e), _ = h.length;
    let b;
    for (s = 0; s < _; s++)
      b = h[s], i.call(null, e[b], b, e);
  }
}
function findKey(e, i) {
  i = i.toLowerCase();
  const o = Object.keys(e);
  let s = o.length, d;
  for (; s-- > 0; )
    if (d = o[s], i === d.toLowerCase())
      return d;
  return null;
}
const _global = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), isContextDefined = (e) => !isUndefined(e) && e !== _global;
function merge$1() {
  const { caseless: e } = isContextDefined(this) && this || {}, i = {}, o = (s, d) => {
    const h = e && findKey(i, d) || d;
    isPlainObject(i[h]) && isPlainObject(s) ? i[h] = merge$1(i[h], s) : isPlainObject(s) ? i[h] = merge$1({}, s) : isArray$4(s) ? i[h] = s.slice() : i[h] = s;
  };
  for (let s = 0, d = arguments.length; s < d; s++)
    arguments[s] && forEach(arguments[s], o);
  return i;
}
const extend = (e, i, o, { allOwnKeys: s } = {}) => (forEach(i, (d, h) => {
  o && isFunction(d) ? e[h] = bind$2(d, o) : e[h] = d;
}, { allOwnKeys: s }), e), stripBOM = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), inherits = (e, i, o, s) => {
  e.prototype = Object.create(i.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: i.prototype
  }), o && Object.assign(e.prototype, o);
}, toFlatObject = (e, i, o, s) => {
  let d, h, _;
  const b = {};
  if (i = i || {}, e == null)
    return i;
  do {
    for (d = Object.getOwnPropertyNames(e), h = d.length; h-- > 0; )
      _ = d[h], (!s || s(_, e, i)) && !b[_] && (i[_] = e[_], b[_] = !0);
    e = o !== !1 && getPrototypeOf(e);
  } while (e && (!o || o(e, i)) && e !== Object.prototype);
  return i;
}, endsWith = (e, i, o) => {
  e = String(e), (o === void 0 || o > e.length) && (o = e.length), o -= i.length;
  const s = e.indexOf(i, o);
  return s !== -1 && s === o;
}, toArray = (e) => {
  if (!e)
    return null;
  if (isArray$4(e))
    return e;
  let i = e.length;
  if (!isNumber$1(i))
    return null;
  const o = new Array(i);
  for (; i-- > 0; )
    o[i] = e[i];
  return o;
}, isTypedArray = ((e) => (i) => e && i instanceof e)(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array)), forEachEntry = (e, i) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let d;
  for (; (d = s.next()) && !d.done; ) {
    const h = d.value;
    i.call(e, h[0], h[1]);
  }
}, matchAll = (e, i) => {
  let o;
  const s = [];
  for (; (o = e.exec(i)) !== null; )
    s.push(o);
  return s;
}, isHTMLForm = kindOfTest("HTMLFormElement"), toCamelCase = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(o, s, d) {
    return s.toUpperCase() + d;
  }
), hasOwnProperty = (({ hasOwnProperty: e }) => (i, o) => e.call(i, o))(Object.prototype), isRegExp$2 = kindOfTest("RegExp"), reduceDescriptors = (e, i) => {
  const o = Object.getOwnPropertyDescriptors(e), s = {};
  forEach(o, (d, h) => {
    i(d, h, e) !== !1 && (s[h] = d);
  }), Object.defineProperties(e, s);
}, freezeMethods = (e) => {
  reduceDescriptors(e, (i, o) => {
    if (isFunction(e) && ["arguments", "caller", "callee"].indexOf(o) !== -1)
      return !1;
    const s = e[o];
    if (isFunction(s)) {
      if (i.enumerable = !1, "writable" in i) {
        i.writable = !1;
        return;
      }
      i.set || (i.set = () => {
        throw Error("Can not rewrite read-only method '" + o + "'");
      });
    }
  });
}, toObjectSet = (e, i) => {
  const o = {}, s = (d) => {
    d.forEach((h) => {
      o[h] = !0;
    });
  };
  return isArray$4(e) ? s(e) : s(String(e).split(i)), o;
}, noop = () => {
}, toFiniteNumber = (e, i) => (e = +e, Number.isFinite(e) ? e : i), ALPHA = "abcdefghijklmnopqrstuvwxyz", DIGIT = "0123456789", ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}, generateString = (e = 16, i = ALPHABET.ALPHA_DIGIT) => {
  let o = "";
  const { length: s } = i;
  for (; e--; )
    o += i[Math.random() * s | 0];
  return o;
};
function isSpecCompliantForm(e) {
  return !!(e && isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const toJSONObject = (e) => {
  const i = new Array(10), o = (s, d) => {
    if (isObject(s)) {
      if (i.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        i[d] = s;
        const h = isArray$4(s) ? [] : {};
        return forEach(s, (_, b) => {
          const _e = o(_, d + 1);
          !isUndefined(_e) && (h[b] = _e);
        }), i[d] = void 0, h;
      }
    }
    return s;
  };
  return o(e, 0);
}, utils$3 = {
  isArray: isArray$4,
  isArrayBuffer,
  isBuffer: isBuffer$1,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isBoolean: isBoolean$1,
  isObject,
  isPlainObject,
  isUndefined,
  isDate: isDate$1,
  isFile,
  isBlob,
  isRegExp: isRegExp$2,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge: merge$1,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject
};
function AxiosError(e, i, o, s, d) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", i && (this.code = i), o && (this.config = o), s && (this.request = s), d && (this.response = d);
}
utils$3.inherits(AxiosError, Error, {
  toJSON: function e() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$3.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype, descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  descriptors[e] = { value: e };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: !0 });
AxiosError.from = (e, i, o, s, d, h) => {
  const _ = Object.create(prototype$1);
  return utils$3.toFlatObject(e, _, function(_e) {
    return _e !== Error.prototype;
  }, (b) => b !== "isAxiosError"), AxiosError.call(_, e.message, i, o, s, d), _.cause = e, _.name = e.name, h && Object.assign(_, h), _;
};
const httpAdapter = null;
function isVisitable(e) {
  return utils$3.isPlainObject(e) || utils$3.isArray(e);
}
function removeBrackets(e) {
  return utils$3.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function renderKey(e, i, o) {
  return e ? e.concat(i).map(function(d, h) {
    return d = removeBrackets(d), !o && h ? "[" + d + "]" : d;
  }).join(o ? "." : "") : i;
}
function isFlatArray(e) {
  return utils$3.isArray(e) && !e.some(isVisitable);
}
const predicates = utils$3.toFlatObject(utils$3, {}, null, function e(i) {
  return /^is[A-Z]/.test(i);
});
function toFormData(e, i, o) {
  if (!utils$3.isObject(e))
    throw new TypeError("target must be an object");
  i = i || new FormData(), o = utils$3.toFlatObject(o, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(vt, ht) {
    return !utils$3.isUndefined(ht[vt]);
  });
  const s = o.metaTokens, d = o.visitor || ut, h = o.dots, _ = o.indexes, _e = (o.Blob || typeof Blob < "u" && Blob) && utils$3.isSpecCompliantForm(i);
  if (!utils$3.isFunction(d))
    throw new TypeError("visitor must be a function");
  function et(pt) {
    if (pt === null)
      return "";
    if (utils$3.isDate(pt))
      return pt.toISOString();
    if (!_e && utils$3.isBlob(pt))
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    return utils$3.isArrayBuffer(pt) || utils$3.isTypedArray(pt) ? _e && typeof Blob == "function" ? new Blob([pt]) : Buffer.from(pt) : pt;
  }
  function ut(pt, vt, ht) {
    let nt = pt;
    if (pt && !ht && typeof pt == "object") {
      if (utils$3.endsWith(vt, "{}"))
        vt = s ? vt : vt.slice(0, -2), pt = JSON.stringify(pt);
      else if (utils$3.isArray(pt) && isFlatArray(pt) || (utils$3.isFileList(pt) || utils$3.endsWith(vt, "[]")) && (nt = utils$3.toArray(pt)))
        return vt = removeBrackets(vt), nt.forEach(function(it, at) {
          !(utils$3.isUndefined(it) || it === null) && i.append(
            // eslint-disable-next-line no-nested-ternary
            _ === !0 ? renderKey([vt], at, h) : _ === null ? vt : vt + "[]",
            et(it)
          );
        }), !1;
    }
    return isVisitable(pt) ? !0 : (i.append(renderKey(ht, vt, h), et(pt)), !1);
  }
  const st = [], ct = Object.assign(predicates, {
    defaultVisitor: ut,
    convertValue: et,
    isVisitable
  });
  function mt(pt, vt) {
    if (!utils$3.isUndefined(pt)) {
      if (st.indexOf(pt) !== -1)
        throw Error("Circular reference detected in " + vt.join("."));
      st.push(pt), utils$3.forEach(pt, function(nt, ot) {
        (!(utils$3.isUndefined(nt) || nt === null) && d.call(
          i,
          nt,
          utils$3.isString(ot) ? ot.trim() : ot,
          vt,
          ct
        )) === !0 && mt(nt, vt ? vt.concat(ot) : [ot]);
      }), st.pop();
    }
  }
  if (!utils$3.isObject(e))
    throw new TypeError("data must be an object");
  return mt(e), i;
}
function encode$2(e) {
  const i = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return i[s];
  });
}
function AxiosURLSearchParams(e, i) {
  this._pairs = [], e && toFormData(e, this, i);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function e(i, o) {
  this._pairs.push([i, o]);
};
prototype.toString = function e(i) {
  const o = i ? function(s) {
    return i.call(this, s, encode$2);
  } : encode$2;
  return this._pairs.map(function(d) {
    return o(d[0]) + "=" + o(d[1]);
  }, "").join("&");
};
function encode$1(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(e, i, o) {
  if (!i)
    return e;
  const s = o && o.encode || encode$1, d = o && o.serialize;
  let h;
  if (d ? h = d(i, o) : h = utils$3.isURLSearchParams(i) ? i.toString() : new AxiosURLSearchParams(i, o).toString(s), h) {
    const _ = e.indexOf("#");
    _ !== -1 && (e = e.slice(0, _)), e += (e.indexOf("?") === -1 ? "?" : "&") + h;
  }
  return e;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(i, o, s) {
    return this.handlers.push({
      fulfilled: i,
      rejected: o,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(i) {
    this.handlers[i] && (this.handlers[i] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(i) {
    utils$3.forEach(this.handlers, function(s) {
      s !== null && i(s);
    });
  }
}
const InterceptorManager$1 = InterceptorManager, transitionalDefaults = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, URLSearchParams$1 = typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams, FormData$1 = typeof FormData < "u" ? FormData : null, Blob$1 = typeof Blob < "u" ? Blob : null, isStandardBrowserEnv = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), isStandardBrowserWebWorkerEnv = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), platform = {
  isBrowser: !0,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function toURLEncodedForm(e, i) {
  return toFormData(e, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(o, s, d, h) {
      return platform.isNode && utils$3.isBuffer(o) ? (this.append(s, o.toString("base64")), !1) : h.defaultVisitor.apply(this, arguments);
    }
  }, i));
}
function parsePropPath(e) {
  return utils$3.matchAll(/\w+|\[(\w*)]/g, e).map((i) => i[0] === "[]" ? "" : i[1] || i[0]);
}
function arrayToObject$1(e) {
  const i = {}, o = Object.keys(e);
  let s;
  const d = o.length;
  let h;
  for (s = 0; s < d; s++)
    h = o[s], i[h] = e[h];
  return i;
}
function formDataToJSON(e) {
  function i(o, s, d, h) {
    let _ = o[h++];
    const b = Number.isFinite(+_), _e = h >= o.length;
    return _ = !_ && utils$3.isArray(d) ? d.length : _, _e ? (utils$3.hasOwnProp(d, _) ? d[_] = [d[_], s] : d[_] = s, !b) : ((!d[_] || !utils$3.isObject(d[_])) && (d[_] = []), i(o, s, d[_], h) && utils$3.isArray(d[_]) && (d[_] = arrayToObject$1(d[_])), !b);
  }
  if (utils$3.isFormData(e) && utils$3.isFunction(e.entries)) {
    const o = {};
    return utils$3.forEachEntry(e, (s, d) => {
      i(parsePropPath(s), d, o, 0);
    }), o;
  }
  return null;
}
const DEFAULT_CONTENT_TYPE = {
  "Content-Type": void 0
};
function stringifySafely(e, i, o) {
  if (utils$3.isString(e))
    try {
      return (i || JSON.parse)(e), utils$3.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (o || JSON.stringify)(e);
}
const defaults$2 = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [function e(i, o) {
    const s = o.getContentType() || "", d = s.indexOf("application/json") > -1, h = utils$3.isObject(i);
    if (h && utils$3.isHTMLForm(i) && (i = new FormData(i)), utils$3.isFormData(i))
      return d && d ? JSON.stringify(formDataToJSON(i)) : i;
    if (utils$3.isArrayBuffer(i) || utils$3.isBuffer(i) || utils$3.isStream(i) || utils$3.isFile(i) || utils$3.isBlob(i))
      return i;
    if (utils$3.isArrayBufferView(i))
      return i.buffer;
    if (utils$3.isURLSearchParams(i))
      return o.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), i.toString();
    let b;
    if (h) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return toURLEncodedForm(i, this.formSerializer).toString();
      if ((b = utils$3.isFileList(i)) || s.indexOf("multipart/form-data") > -1) {
        const _e = this.env && this.env.FormData;
        return toFormData(
          b ? { "files[]": i } : i,
          _e && new _e(),
          this.formSerializer
        );
      }
    }
    return h || d ? (o.setContentType("application/json", !1), stringifySafely(i)) : i;
  }],
  transformResponse: [function e(i) {
    const o = this.transitional || defaults$2.transitional, s = o && o.forcedJSONParsing, d = this.responseType === "json";
    if (i && utils$3.isString(i) && (s && !this.responseType || d)) {
      const _ = !(o && o.silentJSONParsing) && d;
      try {
        return JSON.parse(i);
      } catch (b) {
        if (_)
          throw b.name === "SyntaxError" ? AxiosError.from(b, AxiosError.ERR_BAD_RESPONSE, this, null, this.response) : b;
      }
    }
    return i;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function e(i) {
    return i >= 200 && i < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
utils$3.forEach(["delete", "get", "head"], function e(i) {
  defaults$2.headers[i] = {};
});
utils$3.forEach(["post", "put", "patch"], function e(i) {
  defaults$2.headers[i] = utils$3.merge(DEFAULT_CONTENT_TYPE);
});
const defaults$3 = defaults$2, ignoreDuplicateOf = utils$3.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), parseHeaders = (e) => {
  const i = {};
  let o, s, d;
  return e && e.split(`
`).forEach(function(_) {
    d = _.indexOf(":"), o = _.substring(0, d).trim().toLowerCase(), s = _.substring(d + 1).trim(), !(!o || i[o] && ignoreDuplicateOf[o]) && (o === "set-cookie" ? i[o] ? i[o].push(s) : i[o] = [s] : i[o] = i[o] ? i[o] + ", " + s : s);
  }), i;
}, $internals = Symbol("internals");
function normalizeHeader(e) {
  return e && String(e).trim().toLowerCase();
}
function normalizeValue(e) {
  return e === !1 || e == null ? e : utils$3.isArray(e) ? e.map(normalizeValue) : String(e);
}
function parseTokens(e) {
  const i = /* @__PURE__ */ Object.create(null), o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = o.exec(e); )
    i[s[1]] = s[2];
  return i;
}
const isValidHeaderName = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function matchHeaderValue(e, i, o, s, d) {
  if (utils$3.isFunction(s))
    return s.call(this, i, o);
  if (d && (i = o), !!utils$3.isString(i)) {
    if (utils$3.isString(s))
      return i.indexOf(s) !== -1;
    if (utils$3.isRegExp(s))
      return s.test(i);
  }
}
function formatHeader(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (i, o, s) => o.toUpperCase() + s);
}
function buildAccessors(e, i) {
  const o = utils$3.toCamelCase(" " + i);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + o, {
      value: function(d, h, _) {
        return this[s].call(this, i, d, h, _);
      },
      configurable: !0
    });
  });
}
class AxiosHeaders {
  constructor(i) {
    i && this.set(i);
  }
  set(i, o, s) {
    const d = this;
    function h(b, _e, et) {
      const ut = normalizeHeader(_e);
      if (!ut)
        throw new Error("header name must be a non-empty string");
      const st = utils$3.findKey(d, ut);
      (!st || d[st] === void 0 || et === !0 || et === void 0 && d[st] !== !1) && (d[st || _e] = normalizeValue(b));
    }
    const _ = (b, _e) => utils$3.forEach(b, (et, ut) => h(et, ut, _e));
    return utils$3.isPlainObject(i) || i instanceof this.constructor ? _(i, o) : utils$3.isString(i) && (i = i.trim()) && !isValidHeaderName(i) ? _(parseHeaders(i), o) : i != null && h(o, i, s), this;
  }
  get(i, o) {
    if (i = normalizeHeader(i), i) {
      const s = utils$3.findKey(this, i);
      if (s) {
        const d = this[s];
        if (!o)
          return d;
        if (o === !0)
          return parseTokens(d);
        if (utils$3.isFunction(o))
          return o.call(this, d, s);
        if (utils$3.isRegExp(o))
          return o.exec(d);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(i, o) {
    if (i = normalizeHeader(i), i) {
      const s = utils$3.findKey(this, i);
      return !!(s && this[s] !== void 0 && (!o || matchHeaderValue(this, this[s], s, o)));
    }
    return !1;
  }
  delete(i, o) {
    const s = this;
    let d = !1;
    function h(_) {
      if (_ = normalizeHeader(_), _) {
        const b = utils$3.findKey(s, _);
        b && (!o || matchHeaderValue(s, s[b], b, o)) && (delete s[b], d = !0);
      }
    }
    return utils$3.isArray(i) ? i.forEach(h) : h(i), d;
  }
  clear(i) {
    const o = Object.keys(this);
    let s = o.length, d = !1;
    for (; s--; ) {
      const h = o[s];
      (!i || matchHeaderValue(this, this[h], h, i, !0)) && (delete this[h], d = !0);
    }
    return d;
  }
  normalize(i) {
    const o = this, s = {};
    return utils$3.forEach(this, (d, h) => {
      const _ = utils$3.findKey(s, h);
      if (_) {
        o[_] = normalizeValue(d), delete o[h];
        return;
      }
      const b = i ? formatHeader(h) : String(h).trim();
      b !== h && delete o[h], o[b] = normalizeValue(d), s[b] = !0;
    }), this;
  }
  concat(...i) {
    return this.constructor.concat(this, ...i);
  }
  toJSON(i) {
    const o = /* @__PURE__ */ Object.create(null);
    return utils$3.forEach(this, (s, d) => {
      s != null && s !== !1 && (o[d] = i && utils$3.isArray(s) ? s.join(", ") : s);
    }), o;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([i, o]) => i + ": " + o).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(i) {
    return i instanceof this ? i : new this(i);
  }
  static concat(i, ...o) {
    const s = new this(i);
    return o.forEach((d) => s.set(d)), s;
  }
  static accessor(i) {
    const s = (this[$internals] = this[$internals] = {
      accessors: {}
    }).accessors, d = this.prototype;
    function h(_) {
      const b = normalizeHeader(_);
      s[b] || (buildAccessors(d, _), s[b] = !0);
    }
    return utils$3.isArray(i) ? i.forEach(h) : h(i), this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$3.freezeMethods(AxiosHeaders.prototype);
utils$3.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(e, i) {
  const o = this || defaults$3, s = i || o, d = AxiosHeaders$1.from(s.headers);
  let h = s.data;
  return utils$3.forEach(e, function(b) {
    h = b.call(o, h, d.normalize(), i ? i.status : void 0);
  }), d.normalize(), h;
}
function isCancel(e) {
  return !!(e && e.__CANCEL__);
}
function CanceledError(e, i, o) {
  AxiosError.call(this, e ?? "canceled", AxiosError.ERR_CANCELED, i, o), this.name = "CanceledError";
}
utils$3.inherits(CanceledError, AxiosError, {
  __CANCEL__: !0
});
function settle(e, i, o) {
  const s = o.config.validateStatus;
  !o.status || !s || s(o.status) ? e(o) : i(new AxiosError(
    "Request failed with status code " + o.status,
    [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4],
    o.config,
    o.request,
    o
  ));
}
const cookies = platform.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function e() {
    return {
      write: function(o, s, d, h, _, b) {
        const _e = [];
        _e.push(o + "=" + encodeURIComponent(s)), utils$3.isNumber(d) && _e.push("expires=" + new Date(d).toGMTString()), utils$3.isString(h) && _e.push("path=" + h), utils$3.isString(_) && _e.push("domain=" + _), b === !0 && _e.push("secure"), document.cookie = _e.join("; ");
      },
      read: function(o) {
        const s = document.cookie.match(new RegExp("(^|;\\s*)(" + o + ")=([^;]*)"));
        return s ? decodeURIComponent(s[3]) : null;
      },
      remove: function(o) {
        this.write(o, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function e() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function isAbsoluteURL(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function combineURLs(e, i) {
  return i ? e.replace(/\/+$/, "") + "/" + i.replace(/^\/+/, "") : e;
}
function buildFullPath(e, i) {
  return e && !isAbsoluteURL(i) ? combineURLs(e, i) : i;
}
const isURLSameOrigin = platform.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function e() {
    const i = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a");
    let s;
    function d(h) {
      let _ = h;
      return i && (o.setAttribute("href", _), _ = o.href), o.setAttribute("href", _), {
        href: o.href,
        protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
        host: o.host,
        search: o.search ? o.search.replace(/^\?/, "") : "",
        hash: o.hash ? o.hash.replace(/^#/, "") : "",
        hostname: o.hostname,
        port: o.port,
        pathname: o.pathname.charAt(0) === "/" ? o.pathname : "/" + o.pathname
      };
    }
    return s = d(window.location.href), function(_) {
      const b = utils$3.isString(_) ? d(_) : _;
      return b.protocol === s.protocol && b.host === s.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function e() {
    return function() {
      return !0;
    };
  }()
);
function parseProtocol(e) {
  const i = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return i && i[1] || "";
}
function speedometer(e, i) {
  e = e || 10;
  const o = new Array(e), s = new Array(e);
  let d = 0, h = 0, _;
  return i = i !== void 0 ? i : 1e3, function(_e) {
    const et = Date.now(), ut = s[h];
    _ || (_ = et), o[d] = _e, s[d] = et;
    let st = h, ct = 0;
    for (; st !== d; )
      ct += o[st++], st = st % e;
    if (d = (d + 1) % e, d === h && (h = (h + 1) % e), et - _ < i)
      return;
    const mt = ut && et - ut;
    return mt ? Math.round(ct * 1e3 / mt) : void 0;
  };
}
function progressEventReducer(e, i) {
  let o = 0;
  const s = speedometer(50, 250);
  return (d) => {
    const h = d.loaded, _ = d.lengthComputable ? d.total : void 0, b = h - o, _e = s(b), et = h <= _;
    o = h;
    const ut = {
      loaded: h,
      total: _,
      progress: _ ? h / _ : void 0,
      bytes: b,
      rate: _e || void 0,
      estimated: _e && _ && et ? (_ - h) / _e : void 0,
      event: d
    };
    ut[i ? "download" : "upload"] = !0, e(ut);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest < "u", xhrAdapter = isXHRAdapterSupported && function(e) {
  return new Promise(function(o, s) {
    let d = e.data;
    const h = AxiosHeaders$1.from(e.headers).normalize(), _ = e.responseType;
    let b;
    function _e() {
      e.cancelToken && e.cancelToken.unsubscribe(b), e.signal && e.signal.removeEventListener("abort", b);
    }
    utils$3.isFormData(d) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) && h.setContentType(!1);
    let et = new XMLHttpRequest();
    if (e.auth) {
      const mt = e.auth.username || "", pt = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      h.set("Authorization", "Basic " + btoa(mt + ":" + pt));
    }
    const ut = buildFullPath(e.baseURL, e.url);
    et.open(e.method.toUpperCase(), buildURL(ut, e.params, e.paramsSerializer), !0), et.timeout = e.timeout;
    function st() {
      if (!et)
        return;
      const mt = AxiosHeaders$1.from(
        "getAllResponseHeaders" in et && et.getAllResponseHeaders()
      ), vt = {
        data: !_ || _ === "text" || _ === "json" ? et.responseText : et.response,
        status: et.status,
        statusText: et.statusText,
        headers: mt,
        config: e,
        request: et
      };
      settle(function(nt) {
        o(nt), _e();
      }, function(nt) {
        s(nt), _e();
      }, vt), et = null;
    }
    if ("onloadend" in et ? et.onloadend = st : et.onreadystatechange = function() {
      !et || et.readyState !== 4 || et.status === 0 && !(et.responseURL && et.responseURL.indexOf("file:") === 0) || setTimeout(st);
    }, et.onabort = function() {
      et && (s(new AxiosError("Request aborted", AxiosError.ECONNABORTED, e, et)), et = null);
    }, et.onerror = function() {
      s(new AxiosError("Network Error", AxiosError.ERR_NETWORK, e, et)), et = null;
    }, et.ontimeout = function() {
      let pt = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const vt = e.transitional || transitionalDefaults;
      e.timeoutErrorMessage && (pt = e.timeoutErrorMessage), s(new AxiosError(
        pt,
        vt.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        e,
        et
      )), et = null;
    }, platform.isStandardBrowserEnv) {
      const mt = (e.withCredentials || isURLSameOrigin(ut)) && e.xsrfCookieName && cookies.read(e.xsrfCookieName);
      mt && h.set(e.xsrfHeaderName, mt);
    }
    d === void 0 && h.setContentType(null), "setRequestHeader" in et && utils$3.forEach(h.toJSON(), function(pt, vt) {
      et.setRequestHeader(vt, pt);
    }), utils$3.isUndefined(e.withCredentials) || (et.withCredentials = !!e.withCredentials), _ && _ !== "json" && (et.responseType = e.responseType), typeof e.onDownloadProgress == "function" && et.addEventListener("progress", progressEventReducer(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && et.upload && et.upload.addEventListener("progress", progressEventReducer(e.onUploadProgress)), (e.cancelToken || e.signal) && (b = (mt) => {
      et && (s(!mt || mt.type ? new CanceledError(null, e, et) : mt), et.abort(), et = null);
    }, e.cancelToken && e.cancelToken.subscribe(b), e.signal && (e.signal.aborted ? b() : e.signal.addEventListener("abort", b)));
    const ct = parseProtocol(ut);
    if (ct && platform.protocols.indexOf(ct) === -1) {
      s(new AxiosError("Unsupported protocol " + ct + ":", AxiosError.ERR_BAD_REQUEST, e));
      return;
    }
    et.send(d || null);
  });
}, knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils$3.forEach(knownAdapters, (e, i) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: i });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: i });
  }
});
const adapters = {
  getAdapter: (e) => {
    e = utils$3.isArray(e) ? e : [e];
    const { length: i } = e;
    let o, s;
    for (let d = 0; d < i && (o = e[d], !(s = utils$3.isString(o) ? knownAdapters[o.toLowerCase()] : o)); d++)
      ;
    if (!s)
      throw s === !1 ? new AxiosError(
        `Adapter ${o} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        utils$3.hasOwnProp(knownAdapters, o) ? `Adapter '${o}' is not available in the build` : `Unknown adapter '${o}'`
      );
    if (!utils$3.isFunction(s))
      throw new TypeError("adapter is not a function");
    return s;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new CanceledError(null, e);
}
function dispatchRequest(e) {
  return throwIfCancellationRequested(e), e.headers = AxiosHeaders$1.from(e.headers), e.data = transformData.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), adapters.getAdapter(e.adapter || defaults$3.adapter)(e).then(function(s) {
    return throwIfCancellationRequested(e), s.data = transformData.call(
      e,
      e.transformResponse,
      s
    ), s.headers = AxiosHeaders$1.from(s.headers), s;
  }, function(s) {
    return isCancel(s) || (throwIfCancellationRequested(e), s && s.response && (s.response.data = transformData.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = AxiosHeaders$1.from(s.response.headers))), Promise.reject(s);
  });
}
const headersToObject = (e) => e instanceof AxiosHeaders$1 ? e.toJSON() : e;
function mergeConfig(e, i) {
  i = i || {};
  const o = {};
  function s(et, ut, st) {
    return utils$3.isPlainObject(et) && utils$3.isPlainObject(ut) ? utils$3.merge.call({ caseless: st }, et, ut) : utils$3.isPlainObject(ut) ? utils$3.merge({}, ut) : utils$3.isArray(ut) ? ut.slice() : ut;
  }
  function d(et, ut, st) {
    if (utils$3.isUndefined(ut)) {
      if (!utils$3.isUndefined(et))
        return s(void 0, et, st);
    } else
      return s(et, ut, st);
  }
  function h(et, ut) {
    if (!utils$3.isUndefined(ut))
      return s(void 0, ut);
  }
  function _(et, ut) {
    if (utils$3.isUndefined(ut)) {
      if (!utils$3.isUndefined(et))
        return s(void 0, et);
    } else
      return s(void 0, ut);
  }
  function b(et, ut, st) {
    if (st in i)
      return s(et, ut);
    if (st in e)
      return s(void 0, et);
  }
  const _e = {
    url: h,
    method: h,
    data: h,
    baseURL: _,
    transformRequest: _,
    transformResponse: _,
    paramsSerializer: _,
    timeout: _,
    timeoutMessage: _,
    withCredentials: _,
    adapter: _,
    responseType: _,
    xsrfCookieName: _,
    xsrfHeaderName: _,
    onUploadProgress: _,
    onDownloadProgress: _,
    decompress: _,
    maxContentLength: _,
    maxBodyLength: _,
    beforeRedirect: _,
    transport: _,
    httpAgent: _,
    httpsAgent: _,
    cancelToken: _,
    socketPath: _,
    responseEncoding: _,
    validateStatus: b,
    headers: (et, ut) => d(headersToObject(et), headersToObject(ut), !0)
  };
  return utils$3.forEach(Object.keys(e).concat(Object.keys(i)), function(ut) {
    const st = _e[ut] || d, ct = st(e[ut], i[ut], ut);
    utils$3.isUndefined(ct) && st !== b || (o[ut] = ct);
  }), o;
}
const VERSION = "1.3.5", validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, i) => {
  validators$1[e] = function(s) {
    return typeof s === e || "a" + (i < 1 ? "n " : " ") + e;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function e(i, o, s) {
  function d(h, _) {
    return "[Axios v" + VERSION + "] Transitional option '" + h + "'" + _ + (s ? ". " + s : "");
  }
  return (h, _, b) => {
    if (i === !1)
      throw new AxiosError(
        d(_, " has been removed" + (o ? " in " + o : "")),
        AxiosError.ERR_DEPRECATED
      );
    return o && !deprecatedWarnings[_] && (deprecatedWarnings[_] = !0, console.warn(
      d(
        _,
        " has been deprecated since v" + o + " and will be removed in the near future"
      )
    )), i ? i(h, _, b) : !0;
  };
};
function assertOptions(e, i, o) {
  if (typeof e != "object")
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let d = s.length;
  for (; d-- > 0; ) {
    const h = s[d], _ = i[h];
    if (_) {
      const b = e[h], _e = b === void 0 || _(b, h, e);
      if (_e !== !0)
        throw new AxiosError("option " + h + " must be " + _e, AxiosError.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (o !== !0)
      throw new AxiosError("Unknown option " + h, AxiosError.ERR_BAD_OPTION);
  }
}
const validator = {
  assertOptions,
  validators: validators$1
}, validators = validator.validators;
class Axios {
  constructor(i) {
    this.defaults = i, this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(i, o) {
    typeof i == "string" ? (o = o || {}, o.url = i) : o = i || {}, o = mergeConfig(this.defaults, o);
    const { transitional: s, paramsSerializer: d, headers: h } = o;
    s !== void 0 && validator.assertOptions(s, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, !1), d != null && (utils$3.isFunction(d) ? o.paramsSerializer = {
      serialize: d
    } : validator.assertOptions(d, {
      encode: validators.function,
      serialize: validators.function
    }, !0)), o.method = (o.method || this.defaults.method || "get").toLowerCase();
    let _;
    _ = h && utils$3.merge(
      h.common,
      h[o.method]
    ), _ && utils$3.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (pt) => {
        delete h[pt];
      }
    ), o.headers = AxiosHeaders$1.concat(_, h);
    const b = [];
    let _e = !0;
    this.interceptors.request.forEach(function(vt) {
      typeof vt.runWhen == "function" && vt.runWhen(o) === !1 || (_e = _e && vt.synchronous, b.unshift(vt.fulfilled, vt.rejected));
    });
    const et = [];
    this.interceptors.response.forEach(function(vt) {
      et.push(vt.fulfilled, vt.rejected);
    });
    let ut, st = 0, ct;
    if (!_e) {
      const pt = [dispatchRequest.bind(this), void 0];
      for (pt.unshift.apply(pt, b), pt.push.apply(pt, et), ct = pt.length, ut = Promise.resolve(o); st < ct; )
        ut = ut.then(pt[st++], pt[st++]);
      return ut;
    }
    ct = b.length;
    let mt = o;
    for (st = 0; st < ct; ) {
      const pt = b[st++], vt = b[st++];
      try {
        mt = pt(mt);
      } catch (ht) {
        vt.call(this, ht);
        break;
      }
    }
    try {
      ut = dispatchRequest.call(this, mt);
    } catch (pt) {
      return Promise.reject(pt);
    }
    for (st = 0, ct = et.length; st < ct; )
      ut = ut.then(et[st++], et[st++]);
    return ut;
  }
  getUri(i) {
    i = mergeConfig(this.defaults, i);
    const o = buildFullPath(i.baseURL, i.url);
    return buildURL(o, i.params, i.paramsSerializer);
  }
}
utils$3.forEach(["delete", "get", "head", "options"], function e(i) {
  Axios.prototype[i] = function(o, s) {
    return this.request(mergeConfig(s || {}, {
      method: i,
      url: o,
      data: (s || {}).data
    }));
  };
});
utils$3.forEach(["post", "put", "patch"], function e(i) {
  function o(s) {
    return function(h, _, b) {
      return this.request(mergeConfig(b || {}, {
        method: i,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: h,
        data: _
      }));
    };
  }
  Axios.prototype[i] = o(), Axios.prototype[i + "Form"] = o(!0);
});
const Axios$1 = Axios;
class CancelToken {
  constructor(i) {
    if (typeof i != "function")
      throw new TypeError("executor must be a function.");
    let o;
    this.promise = new Promise(function(h) {
      o = h;
    });
    const s = this;
    this.promise.then((d) => {
      if (!s._listeners)
        return;
      let h = s._listeners.length;
      for (; h-- > 0; )
        s._listeners[h](d);
      s._listeners = null;
    }), this.promise.then = (d) => {
      let h;
      const _ = new Promise((b) => {
        s.subscribe(b), h = b;
      }).then(d);
      return _.cancel = function() {
        s.unsubscribe(h);
      }, _;
    }, i(function(h, _, b) {
      s.reason || (s.reason = new CanceledError(h, _, b), o(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(i) {
    if (this.reason) {
      i(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(i) : this._listeners = [i];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(i) {
    if (!this._listeners)
      return;
    const o = this._listeners.indexOf(i);
    o !== -1 && this._listeners.splice(o, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let i;
    return {
      token: new CancelToken(function(d) {
        i = d;
      }),
      cancel: i
    };
  }
}
const CancelToken$1 = CancelToken;
function spread(e) {
  return function(o) {
    return e.apply(null, o);
  };
}
function isAxiosError(e) {
  return utils$3.isObject(e) && e.isAxiosError === !0;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([e, i]) => {
  HttpStatusCode[i] = e;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(e) {
  const i = new Axios$1(e), o = bind$2(Axios$1.prototype.request, i);
  return utils$3.extend(o, Axios$1.prototype, i, { allOwnKeys: !0 }), utils$3.extend(o, i, null, { allOwnKeys: !0 }), o.create = function(d) {
    return createInstance(mergeConfig(e, d));
  }, o;
}
const axios = createInstance(defaults$3);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function e(i) {
  return Promise.all(i);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (e) => formDataToJSON(utils$3.isHTMLForm(e) ? new FormData(e) : e);
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const axios$1 = axios, styles$2 = {
  selected: {
    color: "white",
    backgroundColor: "#3875d7",
    border: "solid 1px #3875d7",
    boxShadow: "0 1px 1px rgba(0,0,0,0.2)"
  },
  fsSelected: {
    backgroundColor: "#cddcfc",
    border: "solid 1px #cddcfc"
  }
};
class ImageIcon extends React.Component {
  constructor(i) {
    super(i), this.handleIconClick = this.handleIconClick.bind(this);
  }
  handleIconClick(i) {
    this.props.handleImageWellClicked(this.props.image, i);
  }
  getImgStyle() {
    var i = this.props.iconSize;
    return { width: i, maxHeight: i };
  }
  // After rendering, scroll selectd icon into view
  // NB: scrollIntoViewIfNeeded() is provided by polyfill
  componentDidUpdate() {
    this.props.image.selected && this.refs.icon && this.refs.icon.scrollIntoViewIfNeeded();
  }
  render() {
    var i = this.props.image, o = this.getImgStyle(), s = [];
    let d = { width: this.props.iconSize, height: this.props.iconSize };
    i.fsSelected && (d = Object.assign({}, d, styles$2.fsSelected)), i.selected && (d = Object.assign({}, d, styles$2.selected));
    let h = "", _ = this.props.src;
    return _ || (h = "waiting", _ = config.staticPrefix + "webgateway/img/spacer.gif"), /* @__PURE__ */ jsx(
      "li",
      {
        className: "datasetThumb " + s.join(" "),
        id: "image_icon-" + i.id,
        style: d,
        "data-fileset": i.data ? i.data.obj.filesetId : "",
        "data-type": "image",
        "data-id": i.id,
        tabIndex: 0,
        onClick: this.handleIconClick,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "image",
            className: h,
            style: o,
            src: _,
            title: i.name
          }
        )
      }
    );
  }
}
class Images extends React.Component {
  constructor(i) {
    super(i);
  }
  render() {
    let {
      imgJson: i,
      iconSize: o,
      handleImageWellClicked: s
    } = this.props;
    return /* @__PURE__ */ jsx("ul", { children: i.map((d) => /* @__PURE__ */ jsx(
      ImageIcon,
      {
        image: d,
        src: this.props.thumbnails[d.id],
        iconSize: o,
        handleImageWellClicked: s
      },
      d.id + (d.parent ? d.parent : "")
    )) });
  }
}
class Dataset extends React.Component {
  componentDidMount() {
    $(this.refs.dataIcons).selectable({
      filter: "li.datasetThumb",
      distance: 2,
      stop: () => {
        let i = [];
        $(".parade_centrePanel .ui-selected").each(function() {
          i.push(parseInt($(this).attr("data-id"), 10));
        }), this.props.setImagesWellsSelected("image", i);
      }
    });
  }
  componentWillUnmount() {
    $(this.refs.dataIcons).selectable("destroy");
  }
  render() {
    let {
      imgJson: i,
      iconSize: o,
      showDatasets: s,
      handleImageWellClicked: d
    } = this.props, h;
    return s && i.length > 0 && i[0].datasetId ? h = i.reduce((b, _e, et, ut) => ((et === 0 || ut[et - 1].datasetId !== _e.datasetId) && b.push({
      name: _e.datasetName,
      id: _e.datasetId,
      images: []
    }), b[b.length - 1].images.push(_e), b), []).map((b) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: b.name }),
      /* @__PURE__ */ jsx(
        Images,
        {
          imgJson: b.images,
          iconSize: o,
          handleImageWellClicked: d,
          thumbnails: this.props.thumbnails
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { clear: "both" } })
    ] }, b.id)) : h = /* @__PURE__ */ jsx(
      Images,
      {
        imgJson: i,
        iconSize: o,
        handleImageWellClicked: d,
        thumbnails: this.props.thumbnails
      }
    ), /* @__PURE__ */ jsx(
      "div",
      {
        className: "parade_centrePanel",
        ref: "dataIcons",
        children: h
      }
    );
  }
}
class Well extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //     // Only re-render if visibility changes
  //     return this.props.hidden !== nextProps.hidden;
  // },
  render() {
    let {
      id: i,
      iconSize: o,
      selected: s,
      hidden: d,
      row: h,
      col: _,
      thumb_url: b,
      imgTableData: _e,
      handleWellClick: et,
      selectedHeatmap: ut,
      heatmapRange: st,
      heatmapValues: ct
    } = this.props, mt = "" + h + _;
    mt = mt + " " + _e.join(" ");
    let pt = { width: o + "px", maxHeight: o + "px" };
    d && (pt.opacity = 0.1);
    let vt = { width: o + "px", height: o + "px" }, ht = "";
    s && (ht += " ui-selected");
    let nt = "", ot = this.props.thumb_url;
    return ot || (nt = "waiting", ot = config.staticPrefix + "webgateway/img/spacer.gif"), /* @__PURE__ */ jsx(
      "td",
      {
        className: "well " + ht,
        "data-wellid": i,
        title: "" + h + _,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            style: vt,
            onClick: (it) => {
              et(it, i);
            },
            title: mt,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                className: nt,
                src: ot,
                style: pt
              }
            )
          }
        )
      }
    );
  }
}
class PlateGrid extends React.Component {
  constructor(i) {
    super(i);
  }
  componentDidMount() {
    $(this.refs.plateGrid).selectable({
      filter: "td.well",
      distance: 2,
      stop: () => {
        let i = [];
        $(".plateGrid .ui-selected").each(function() {
          i.push(parseInt($(this).attr("data-wellid"), 10));
        }), this.props.setImagesWellsSelected("well", i);
      }
    });
  }
  componentWillUnmount() {
    $(this.refs.dataIcons).selectable("destroy");
  }
  render() {
    var i = this.props.plateData, o = this.props.iconSize, s = {
      width: o + "px",
      height: o + "px"
    }, d = this.props.selectedWellIds, h = this.props.handleImageWellClicked, _ = this.props.tableData, b = this.props.filteredImages.map((st) => st.id);
    if (!i)
      return /* @__PURE__ */ jsx("table", {});
    var _e = i.collabels.map(function(st) {
      return /* @__PURE__ */ jsx("th", { children: st }, st);
    }), et = i.grid, ut = i.rowlabels.map((st, ct) => {
      var mt = i.collabels.map((pt, vt) => {
        var ht = et[ct][vt];
        if (ht) {
          var nt = b !== void 0 && b.indexOf(ht.id) === -1, ot = d.indexOf(ht.wellId) > -1, it = Object.keys(_).map((at) => at + ": " + _[at].data[ht.id]);
          return /* @__PURE__ */ jsx(
            Well,
            {
              id: ht.wellId,
              iid: ht.id,
              thumb_url: this.props.thumbnails[ht.id],
              selected: ot,
              hidden: nt,
              iconSize: o,
              handleWellClick: (at) => {
                h(ht, at);
              },
              row: st,
              col: pt,
              imgTableData: it
            },
            ht.wellId
          );
        } else
          return /* @__PURE__ */ jsx("td", { className: "placeholder", children: /* @__PURE__ */ jsx("div", { style: s }) }, st + "_" + pt);
      });
      return /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: st }),
        mt
      ] }, st);
    });
    return /* @__PURE__ */ jsx("div", { className: "plateGrid", ref: "plateGrid", children: /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: " " }),
        _e
      ] }),
      ut
    ] }) }) });
  }
}
const styles$1 = {
  xAxisSelect: {},
  yAxisSelect: {}
};
class DataPlot extends React.Component {
  constructor(i) {
    super(i), this.state = {
      xAxisName: void 0,
      yAxisName: void 0
    }, this.setAxisName = this.setAxisName.bind(this);
  }
  setAxisName(i, o, s) {
    let d = o.target.value;
    i === "x" ? this.setState({ xAxisName: d, yAxisName: s }) : this.setState({ yAxisName: d, xAxisName: s });
  }
  componentDidMount() {
    let i = this.props.imgJson[0].wellId ? "well" : "image", o = i === "well" ? "data-wellid" : "data-id";
    $(this.refs.thumb_plot_canvas).selectable({
      filter: "div",
      distance: 2,
      stop: () => {
        let s = [];
        $(".thumbnail_plot_canvas .ui-selected").each(function() {
          s.push(parseInt($(this).attr(o), 10));
        }), this.props.setImagesWellsSelected(i, s);
      }
    });
  }
  componentWillUnmount() {
    $(this.refs.dataIcons).selectable("destroy");
  }
  getAxisPercent(i, o, s) {
    if (!s)
      return 0;
    let d = i[o];
    return (s - d[0]) / (d[1] - d[0]) * 100;
  }
  getAxisTicks(i, o, s) {
    let d = i[o];
    return s.map((_, b) => (d[0] + (d[1] - d[0]) * _ / 100).toFixed(2));
  }
  render() {
    let {
      imgJson: i,
      iconSize: o,
      tableData: s,
      handleImageWellClicked: d,
      selectedWellIds: h
    } = this.props, _ = this.state.xAxisName, b = this.state.yAxisName, _e = Object.keys(s);
    if (_e.length < 2)
      return /* @__PURE__ */ jsx("div", { children: "Choose more data to load" });
    _ !== void 0 && _e.splice(_e.indexOf(_), 1), b !== void 0 && _e.splice(_e.indexOf(b), 1), _ == null && (_ = _e[0], _e.splice(0, 1)), b == null && (b = _e[0]), _e = Object.keys(s);
    let et = _e.reduce((ot, it) => {
      let at = s[it];
      return ot[it] = [at.min, at.max], ot;
    }, {});
    const ut = i.map((ot) => {
      const it = [];
      let at = this.props.thumbnails[ot.id];
      at || (it.push("waiting"), at = config.staticPrefix + "webgateway/img/spacer.gif"), (ot.selected || h.includes(ot.wellId)) && it.push("ui-selected");
      const St = s[_].data[ot.id], _t = s[b].data[ot.id];
      let xt = "";
      for (let $t in s)
        $t != _ && $t != b && (xt += `
` + $t + ": " + s[$t].data[ot.id]);
      let Tt = this.getAxisPercent(et, _, St), Lt = 100 - this.getAxisPercent(et, b, _t);
      return it.push("data-point"), /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            left: Tt + "%",
            top: Lt + "%"
          },
          className: it.join(" "),
          "data-id": ot.id,
          "data-wellid": ot.wellId,
          title: "Image Name: " + ot.name + `
` + _ + ": " + St + `
` + b + ": " + _t + xt,
          onClick: ($t) => {
            d(ot, $t);
          }
        },
        ot.id + (ot.parent ? ot.parent : "")
      );
    }), st = 450, ct = [0, 25, 50, 75, 100], mt = this.getAxisTicks(
      et,
      _,
      ct
    ), pt = ct.map((ot, it) => {
      const at = ot + "%";
      return ot == 0 ? /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-x-tick-lines",
            x1: at,
            x2: at,
            y2: "10",
            style: { transform: "translateX(1px)" }
          }
        ),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: at,
            y: "25",
            style: { transform: "translateX(-10px)" },
            children: mt[it]
          }
        )
      ] }) : ot == 100 ? /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-x-tick-lines",
            x1: at,
            x2: at,
            y2: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: at,
            y: "25",
            style: { transform: "translateX(-10px)" },
            children: mt[it]
          }
        )
      ] }) : /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-x-tick-lines",
            x1: at,
            x2: at,
            y2: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-x-grid-lines",
            x1: at,
            x2: at,
            y2: -st
          }
        ),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: at,
            y: "25",
            style: { transform: "translateX(-10px)" },
            children: mt[it]
          }
        )
      ] });
    }), vt = [0, 33, 66, 100], ht = this.getAxisTicks(
      et,
      b,
      vt
    ), nt = vt.map((ot, it) => {
      const at = (100 - ot) * st / 100;
      return ot == 0 ? /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-y-tick-lines",
            y1: at,
            y2: at,
            x2: "-10"
          }
        ),
        /* @__PURE__ */ jsx("text", { x: "-45", y: at - 5, children: ht[it] })
      ] }) : ot == 100 ? /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-y-tick-lines",
            y1: at,
            y2: at,
            x2: "-10",
            style: { transform: "translateY(1px)" }
          }
        ),
        /* @__PURE__ */ jsx("text", { x: "-45", y: at - 5, children: ht[it] })
      ] }) : /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-y-tick-lines",
            y1: at,
            y2: at,
            x2: "-10"
          }
        ),
        /* @__PURE__ */ jsx(
          "line",
          {
            className: "plot-y-grid-lines",
            y1: at,
            y2: at,
            x2: "100%"
          }
        ),
        /* @__PURE__ */ jsx("text", { x: "-45", y: at - 5, children: ht[it] })
      ] });
    });
    return /* @__PURE__ */ jsxs("div", { className: "parade_centrePanel", children: [
      /* @__PURE__ */ jsx("div", { className: "thumbnail_plot", children: /* @__PURE__ */ jsx("div", { className: "thumbnail_plot_canvas", ref: "thumb_plot_canvas", children: ut }) }),
      /* @__PURE__ */ jsx("div", { className: "plot-x-ticks", children: /* @__PURE__ */ jsx("svg", { style: { width: "100%", resize: "both", fontSize: "10px", overflow: "inherit" }, children: pt }) }),
      /* @__PURE__ */ jsx("div", { className: "plot-x-label", children: /* @__PURE__ */ jsx(
        "select",
        {
          onChange: (ot) => {
            this.setAxisName("x", ot, b);
          },
          value: _,
          style: styles$1.xAxisSelect,
          children: _e.map((ot, it) => /* @__PURE__ */ jsxs("option", { value: ot, children: [
            " ",
            ot
          ] }, it))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "plot-y-ticks", children: /* @__PURE__ */ jsx("svg", { style: { width: "100%", resize: "both", fontSize: "10px", overflow: "inherit" }, children: nt }) }),
      /* @__PURE__ */ jsx("div", { className: "plot-y-label", children: /* @__PURE__ */ jsx(
        "select",
        {
          onChange: (ot) => {
            this.setAxisName("y", ot, _);
          },
          value: b,
          style: styles$1.yAxisSelect,
          children: _e.map((ot, it) => /* @__PURE__ */ jsxs("option", { value: ot, children: [
            " ",
            ot
          ] }, it))
        }
      ) })
    ] });
  }
}
class DatasetTable extends React.Component {
  heatMapColor(i, o, s) {
    let d = i[o], h = (s - d[0]) / (d[1] - d[0]);
    return getHeatmapColor(h);
  }
  renderImages(i, o) {
    const s = this.props.tableData;
    return i.length < 1 ? null : i.map((d) => {
      const h = this.props.iconSize;
      this.props.selectedWellIds;
      const _ = [];
      let b = this.props.thumbnails[d.id];
      b || (_.push("waiting"), b = config.staticPrefix + "webgateway/img/spacer.gif"), (d.selected || this.props.selectedWellIds.includes(d.wellId)) && _.push("ui-selected");
      let _e = o.reduce((ut, st) => {
        let ct = s[st];
        return ut[st] = [ct.min, ct.max], ut;
      }, {});
      const et = o.map((ut) => {
        let st = "transparent";
        return this.props.showHeatmapColumns[ut] && (st = this.heatMapColor(
          _e,
          ut,
          s[ut].data[d.id]
        )), /* @__PURE__ */ jsx("td", { style: { backgroundColor: st }, children: s[ut].data[d.id] }, ut);
      });
      return /* @__PURE__ */ jsxs("tr", { className: _.join(" "), children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "image",
            className: _.join(" "),
            width: h + "px",
            height: h + "px",
            src: b,
            title: d.name,
            "data-id": d.id,
            "data-wellid": d.wellId,
            onClick: (ut) => {
              this.props.handleImageWellClicked(d, ut);
            }
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: d.name }),
        et
      ] }, d.id + (d.parent ? d.parent : ""));
    });
  }
  renderTableTitle(i) {
    const o = this.props.tableTitle;
    return o ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("th", { colSpan: i.length + 2, children: o }) }) : null;
  }
  render() {
    let i = this.props.imgJson;
    if (this.props.sortBy != null) {
      let s = this.props.tableData[this.props.sortBy].data;
      i = i.map((h) => Object.assign(h, { sortKey: s[h.id] }));
      let d = this.props.sortReverse ? -1 : 1;
      i.sort((h, _) => h.sortKey === void 0 ? -d : _.sortKey === void 0 ? d : h.sortKey < _.sortKey ? -d : d);
    }
    const o = Object.keys(this.props.tableData);
    return /* @__PURE__ */ jsxs("tbody", { children: [
      this.renderTableTitle(o),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", {}),
        /* @__PURE__ */ jsx("td", { children: "Name" }),
        o.map((s) => /* @__PURE__ */ jsxs("td", { children: [
          /* @__PURE__ */ jsx("a", { onClick: (d) => {
            this.props.handleSortTable(d, s);
          }, children: s }),
          /* @__PURE__ */ jsx(
            "input",
            {
              onClick: (d) => {
                this.props.handleShowHeatmap(d, s);
              },
              type: "checkbox",
              title: "Show Heatmap"
            }
          )
        ] }, s))
      ] }),
      this.renderImages(i, o)
    ] });
  }
}
class Tables extends React.Component {
  constructor(i) {
    super(i), this.state = {
      showHeatmapColumns: {},
      sortBy: void 0,
      sortReverse: !1
    }, this.handleSortTable = this.handleSortTable.bind(this), this.handleShowHeatmap = this.handleShowHeatmap.bind(this);
  }
  componentDidMount() {
    $(this.refs.dataTable).selectable({
      filter: "img",
      distance: 2,
      stop: () => {
        let i = this.props.imgJson[0].wellId ? "well" : "image", o = i === "well" ? "data-wellid" : "data-id", s = [];
        $(".parade_dataTable .ui-selected").each(function() {
          s.push(parseInt($(this).attr(o), 10));
        }), this.props.setImagesWellsSelected(i, s);
      }
    });
  }
  componentWillUnmount() {
    $(this.refs.dataIcons).selectable("destroy");
  }
  handleSortTable(i, o) {
    i.preventDefault(), this.setState((s) => ({
      sortBy: o,
      sortReverse: s.sortBy === o ? !s.sortReverse : !1
    }));
  }
  handleShowHeatmap(i, o) {
    let s = i.target.checked, d = Object.assign({}, this.state.showHeatmapColumns);
    d[o] = s, this.setState({
      showHeatmapColumns: d
    });
  }
  render() {
    let {
      imgJson: i,
      iconSize: o,
      tableData: s,
      showDatasets: d,
      selectedWellIds: h,
      handleImageWellClicked: _
    } = this.props, b;
    return d && i.length > 0 && i[0].datasetId ? b = i.reduce((et, ut, st, ct) => ((st === 0 || ct[st - 1].datasetId !== ut.datasetId) && et.push({
      name: ut.datasetName,
      id: ut.datasetId,
      images: []
    }), et[et.length - 1].images.push(ut), et), []).map((et) => /* @__PURE__ */ jsx(
      DatasetTable,
      {
        tableTitle: et.name,
        imgJson: et.images,
        iconSize: o,
        tableData: s,
        sortBy: this.state.sortBy,
        sortReverse: this.state.sortReverse,
        selectedWellIds: h,
        showHeatmapColumns: this.state.showHeatmapColumns,
        handleSortTable: this.handleSortTable,
        handleShowHeatmap: this.handleShowHeatmap,
        handleImageWellClicked: _,
        thumbnails: this.props.thumbnails
      },
      et.id
    )) : b = /* @__PURE__ */ jsx(
      DatasetTable,
      {
        imgJson: i,
        iconSize: o,
        tableData: s,
        sortBy: this.state.sortBy,
        sortReverse: this.state.sortReverse,
        selectedWellIds: h,
        showHeatmapColumns: this.state.showHeatmapColumns,
        handleSortTable: this.handleSortTable,
        handleShowHeatmap: this.handleShowHeatmap,
        handleImageWellClicked: _,
        thumbnails: this.props.thumbnails
      }
    ), /* @__PURE__ */ jsx(
      "div",
      {
        className: "parade_centrePanel",
        ref: "dataTable",
        children: /* @__PURE__ */ jsx("table", { className: "parade_dataTable", children: b })
      }
    );
  }
}
const styles = {
  footer: {
    position: "relative",
    height: 25,
    flex: "0 0 25px",
    borderRight: 0,
    borderBottom: "solid 1px hsl(210,10%,90%)",
    overflow: "hidden",
    background: "none repeat scroll 0 0 #EFF1F4"
  },
  slider: {
    position: "absolute",
    right: 25,
    width: 120,
    top: 6,
    border: "solid #aaa 1px"
  }
};
class Footer extends React.Component {
  render() {
    let { setIconSize: i, iconSize: o } = this.props;
    return /* @__PURE__ */ jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        style: styles.slider,
        className: "parade",
        min: "30",
        max: "200",
        value: o,
        onChange: (s) => {
          i(s.target.value);
        }
      }
    ) });
  }
}
class Layout extends React.Component {
  constructor(i) {
    super(i), this.state = {
      iconSize: 50,
      layout: "icon",
      // "icon", "plot" or "table"
      dataProviders: [],
      tableData: {},
      selectedWellIds: [],
      showDatasets: !0,
      thumbnails: {}
    }, this.setIconSize = this.setIconSize.bind(this), this.setLayout = this.setLayout.bind(this), this.setShowDatasets = this.setShowDatasets.bind(this), this.handleAddData = this.handleAddData.bind(this), this.handleImageWellClicked = this.handleImageWellClicked.bind(this), this.setImagesWellsSelected = this.setImagesWellsSelected.bind(this), this.setSelectedWells = this.setSelectedWells.bind(this);
  }
  setIconSize(i) {
    this.setState({ iconSize: parseInt(i, 10) });
  }
  setLayout(i) {
    this.setState({ layout: i });
  }
  setShowDatasets(i) {
    let o = i.target.checked;
    this.setState({ showDatasets: o });
  }
  loadThumbnails() {
    const i = this.props.filteredImages.map((s) => s.id).filter((s) => !this.state.thumbnails[s]);
    if (i.length < 1)
      return;
    const o = axios$1.CancelToken;
    this.source = o.source(), this.props.thumbnailLoader.getThumbnails(i, (s) => {
      this.setState((d) => {
        let h = d.thumbnails;
        for (const _ in s.data)
          h[_] = s.data[_];
        return { thumbnails: h };
      });
    }, (s) => {
      axios$1.isCancel(s) || console.log("Error loading thumbnails!", s);
    }, this.source.token);
  }
  componentDidMount() {
    let i = config.dataprovidersUrl;
    if (this.props.parentType === "project")
      i += "?project=" + this.props.parentId;
    else if (this.props.datasetId || this.props.parentType === "dataset") {
      let o = this.props.datasetId;
      o || (o = this.props.parentId), i += "?dataset=" + o;
    } else if (this.props.plateId || this.props.parentType == "plate") {
      let o = this.props.plateId;
      o || (o = this.props.parentId), i += "?plate=" + o;
    }
    $.ajax({
      url: i,
      dataType: "json",
      cache: !1,
      success: (o) => {
        this.setState({
          dataProviders: o.data
        });
      }
    }), this.loadThumbnails();
  }
  componentWillUnmount() {
    this.source && this.source.cancel();
  }
  componentDidUpdate(i, o, s) {
    const d = this.props.filteredImages.map((_) => _.id), h = i.filteredImages.map((_) => _.id);
    lodashExports.isEqual(d, h) || this.loadThumbnails();
  }
  handleAddData(i) {
    var o = i.target.value;
    if (o !== "--") {
      var s = config.indexUrl + "data/" + btoa(o) + "/";
      this.props.parentType === "plate" ? (s += "?plate=" + this.props.parentId, this.props.fieldId !== void 0 && (s += "&field=" + this.props.fieldId)) : this.props.parentType === "dataset" ? s += "?dataset=" + this.props.parentId : this.props.parentType === "project" ? s += "?project=" + this.props.parentId : s += "?" + this.props.filteredImages.map((d) => "image=" + d.id).join("&"), $.getJSON(s, (d) => {
        let h = Object.assign({}, this.state.tableData);
        h[o] = d, this.setState({
          tableData: h
        });
      });
    }
  }
  handleImageWellClicked(i, o) {
    let s = i.id, d = i.wellId;
    if (d) {
      this.setSelectedWells([d]);
      return;
    }
    let h = this.props.filteredImages.filter((et) => et.selected).map((et) => et.id), _ = this.props.filteredImages.map((et) => et.id), b = _.indexOf(s), _e = [];
    if (o.shiftKey && h.length > 0) {
      let et = _.indexOf(h[0]), ut = _.indexOf(h[h.length - 1]);
      et = Math.min(et, b), ut = Math.max(ut, b), _e = _.slice(et, ut + 1);
    } else
      o.metaKey ? h.indexOf(s) === -1 ? (h.push(s), _e = h) : _e = h.filter((et) => et !== s) : _e = [s];
    this.props.setSelectedImages(_e);
  }
  setImagesWellsSelected(i, o) {
    i === "well" ? this.setSelectedWells(o) : this.props.setSelectedImages(o);
  }
  setSelectedWells(i) {
    this.setState({ selectedWellIds: i }), this.props.fieldId;
    var o = i.map((s) => ({ id: "well-" + s, index: this.props.fieldId }));
    $("body").data("selected_objects.ome", o).trigger("selection_change.ome"), buttonsShowHide && buttonsShowHide([]);
  }
  render() {
    if (this.props.plateData === void 0 && this.props.filteredImages === void 0)
      return /* @__PURE__ */ jsx("div", {});
    let i = this.props.filteredImages, o;
    return this.state.layout === "table" ? o = /* @__PURE__ */ jsx(
      Tables,
      {
        iconSize: this.state.iconSize,
        imgJson: i,
        selectedWellIds: this.state.selectedWellIds,
        showDatasets: this.state.showDatasets,
        handleImageWellClicked: this.handleImageWellClicked,
        setImagesWellsSelected: this.setImagesWellsSelected,
        tableData: this.state.tableData,
        thumbnails: this.state.thumbnails
      }
    ) : this.state.layout === "plot" ? o = /* @__PURE__ */ jsx(
      DataPlot,
      {
        iconSize: this.state.iconSize,
        imgJson: i,
        tableData: this.state.tableData,
        selectedWellIds: this.state.selectedWellIds,
        handleImageWellClicked: this.handleImageWellClicked,
        setImagesWellsSelected: this.setImagesWellsSelected,
        thumbnails: this.state.thumbnails
      }
    ) : this.props.plateData ? o = /* @__PURE__ */ jsx(
      PlateGrid,
      {
        iconSize: this.state.iconSize,
        plateData: this.props.plateData,
        filteredImages: i,
        tableData: this.state.tableData,
        selectedWellIds: this.state.selectedWellIds,
        handleImageWellClicked: this.handleImageWellClicked,
        setImagesWellsSelected: this.setImagesWellsSelected,
        thumbnails: this.state.thumbnails
      }
    ) : o = /* @__PURE__ */ jsx(
      Dataset,
      {
        iconSize: this.state.iconSize,
        imgJson: i,
        showDatasets: this.state.showDatasets,
        handleImageWellClicked: this.handleImageWellClicked,
        setImagesWellsSelected: this.setImagesWellsSelected,
        thumbnails: this.state.thumbnails
      }
    ), /* @__PURE__ */ jsxs("div", { className: "parade_layout_container", children: [
      /* @__PURE__ */ jsxs("div", { className: "layoutHeader", children: [
        /* @__PURE__ */ jsxs("select", { value: "--", onChange: this.handleAddData, children: [
          /* @__PURE__ */ jsx(
            "option",
            {
              value: "--",
              children: "Add table data..."
            }
          ),
          this.state.dataProviders.map(function(s, d) {
            return /* @__PURE__ */ jsx(
              "option",
              {
                value: s,
                children: s
              },
              d
            );
          })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "layoutControls", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "Show Datasets",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: this.state.showDatasets,
                onChange: this.setShowDatasets
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  this.setLayout("icon");
                },
                className: "iconLayoutButton " + (this.state.layout === "icon" ? "checked" : "")
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  this.setLayout("table");
                },
                className: "tableLayoutButton " + (this.state.layout === "table" ? "checked" : "")
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  this.setLayout("plot");
                },
                className: "plotLayoutButton " + (this.state.layout === "plot" ? "checked" : "")
              }
            )
          ] })
        ] })
      ] }),
      o,
      /* @__PURE__ */ jsx(
        Footer,
        {
          iconSize: this.state.iconSize,
          setIconSize: this.setIconSize
        }
      )
    ] });
  }
}
class FilterHub extends React.Component {
  constructor(i) {
    super(i);
    const o = [], s = [], d = [], h = this.filterImages(
      o,
      s,
      d
    );
    this.state = {
      filterFunctions: o,
      filterNames: s,
      filterValues: d,
      // [{'inputName':'value'}]
      filteredImages: h,
      iconSize: 50
    }, this.addFilter = this.addFilter.bind(this), this.handleFilterLoaded = this.handleFilterLoaded.bind(this), this.handleFilterChange = this.handleFilterChange.bind(this), this.handleRemoveFilter = this.handleRemoveFilter.bind(this), this.setIconSize = this.setIconSize.bind(this);
  }
  componentDidUpdate(i, o, s) {
    Object.is(this.props.images, i.images) || this.setState({
      filteredImages: this.filterImages(
        this.state.filterFunctions,
        this.state.filterNames,
        this.state.filterValues
      )
    });
  }
  filterImages(i, o, s) {
    const d = this.props.images;
    if (o.length < 1)
      return d;
    let h;
    const _ = performance.now();
    return h = o.reduce((b, _e, et) => {
      let ut = i[et], st = s[et];
      return ut && st && (b = b.filter((ct) => ut(ct, st))), b;
    }, d), console.log("Filtering images took ms:", performance.now() - _), h;
  }
  addFilter(i) {
    const o = [...this.state.filterNames, i], s = this.filterImages(
      this.state.filterFunctions,
      o,
      this.state.filterValues
    );
    this.setState({
      filterNames: o,
      filteredImages: s
    });
  }
  handleFilterLoaded(i, o, s) {
    let d = [...this.state.filterFunctions];
    d[i] = o;
    let h = [...this.state.filterValues];
    h[i] = s;
    const _ = this.filterImages(
      d,
      this.state.filterNames,
      h
    );
    this.setState({
      filterFunctions: d,
      filterValues: h,
      filteredImages: _
    });
  }
  handleFilterChange(i, o) {
    this.setState((s) => {
      let d = Object.assign(
        {},
        s.filterValues[i],
        o
      ), h = [...s.filterValues];
      h[i] = d;
      const _ = this.filterImages(
        this.state.filterFunctions,
        this.state.filterNames,
        h
      );
      return {
        filterValues: h,
        filteredImages: _
      };
    });
  }
  handleRemoveFilter(i) {
    let o = [...this.state.filterNames], s = [...this.state.filterValues];
    o.splice(i, 1), s.splice(i, 1);
    const d = this.filterImages(
      this.state.filterFunctions,
      o,
      s
    );
    this.setState({
      filterNames: o,
      filterValues: s,
      filteredImages: d
    });
  }
  setIconSize(i) {
    this.setState({ iconSize: parseInt(i, 10) });
  }
  render() {
    return /* @__PURE__ */ jsxs("div", { className: "reactContainer", children: [
      /* @__PURE__ */ jsx(
        FilterContainer,
        {
          parentType: this.props.parentType,
          parentId: this.props.parentId,
          fieldId: this.props.fieldId,
          images: this.props.images,
          addFilter: this.addFilter,
          handleFilterLoaded: this.handleFilterLoaded,
          handleFilterChange: this.handleFilterChange,
          handleRemoveFilter: this.handleRemoveFilter,
          filterNames: this.state.filterNames,
          filterValues: this.state.filterValues
        }
      ),
      /* @__PURE__ */ jsx(
        Layout,
        {
          parentType: this.props.parentType,
          parentId: this.props.parentId,
          fieldId: this.props.fieldId,
          setSelectedImages: this.props.setSelectedImages,
          plateData: this.props.plateData,
          filteredImages: this.state.filteredImages,
          thumbnailLoader: this.props.thumbnailLoader
        }
      )
    ] });
  }
}
class PlateLoader extends React.Component {
  constructor(i) {
    super(i), this.state = {
      data: void 0,
      selectedWellIds: []
    };
  }
  loadData() {
    let i = this.props.plateId, o = this.props.fieldId;
    if (o === void 0)
      return;
    const s = ["plate", i, o, ""], d = config.webgatewayBaseUrl + s.join("/");
    $.ajax({
      url: d,
      dataType: "json",
      cache: !1,
      success: (h) => {
        this.setState({
          data: h
        });
      }
    });
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(i, o, s) {
    (i.plateId !== this.props.plateId || i.fieldId !== this.props.fieldId) && this.loadData();
  }
  render() {
    if (this.props.fieldId === void 0)
      return /* @__PURE__ */ jsx("div", {});
    let i = [];
    return this.state.data && this.state.data.grid.forEach((o) => {
      o.forEach((s) => {
        s && i.push(s);
      });
    }), /* @__PURE__ */ jsx(
      FilterHub,
      {
        images: i,
        parentType: "plate",
        parentId: this.props.plateId,
        fieldId: this.props.fieldId,
        plateData: this.state.data,
        thumbnailLoader: this.props.thumbnailLoader
      }
    );
  }
}
class Plate extends React.Component {
  constructor(i) {
    super(i), this.state = {
      fields: [],
      selectedField: void 0
    };
  }
  loadData() {
    const i = this.props.treeSelectedNodes[0];
    let o;
    if (i.type === "plate")
      o = { plate: i.data.id };
    else if (i.type === "acquisition")
      o = { run: i.data.id };
    else
      return;
    const s = config.indexUrl + "api/fields/";
    $.ajax({
      url: s,
      data: o,
      dataType: "json",
      cache: !1,
      success: (d) => {
        this.setState({
          fields: d.data,
          selectedField: d.data[0]
        });
      }
    });
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(i, o, s) {
    const d = i.treeSelectedNodes[0], h = this.props.treeSelectedNodes[0];
    d.id !== h.id && this.loadData();
  }
  render() {
    if (this.props.treeOpenNodes.length < 1)
      return null;
    const i = this.props.treeOpenNodes[0];
    return /* @__PURE__ */ jsx(
      PlateLoader,
      {
        plateId: i.data.id,
        fieldId: this.state.selectedField,
        thumbnailLoader: this.props.thumbnailLoader
      }
    );
  }
}
class DatasetContainer extends React.Component {
  constructor(i) {
    super(i);
    let o = !1;
    for (let s of i.treeOpenNodes)
      if (i.jstree.is_loading(s)) {
        o = !0;
        break;
      }
    this.state = {
      imagesJson: this.createImagesJson(),
      transientState: o
    };
  }
  componentDidUpdate(i, o, s) {
    const d = this.props.treeOpenNodes.map((_e) => _e.id), h = i.treeOpenNodes.map((_e) => _e.id), _ = this.props.treeSelectedNodes.map((_e) => _e.id), b = i.treeSelectedNodes.map((_e) => _e.id);
    (this.state.transientState || !lodashExports.isEqual(d, h) || !lodashExports.isEqual(_, b)) && this.setState({
      imagesJson: this.createImagesJson(),
      transientState: !1
    });
  }
  createImagesJson() {
    this.props.effectiveRootNode;
    let o = this.getImageNodes().map((d) => this.marshalNode(d)), s = o.filter((d) => d.selected).map((d) => d.data.obj.filesetId);
    if (s.length > 0)
      for (let d of o) {
        const h = d.data.obj.filesetId;
        s.includes(h) && (d.fsSelected = !0);
      }
    return o;
  }
  marshalNode(i) {
    const o = this.props.effectiveRootNode, s = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }, d = i.data.obj.date || i.data.obj.acqDate;
    let h = new Date(d);
    h = h.toLocaleTimeString(void 0, s);
    let _ = {
      id: i.data.obj.id,
      name: i.text,
      data: JSON.parse(JSON.stringify(i.data)),
      selected: i.state.selected,
      date: h,
      parent: i.parent,
      // jstree node_id string e.g. 'j1_118'
      datasetName: i.datasetName,
      datasetId: i.datasetId
    };
    return i.data.obj.shareId && !o.data.obj.isOwned && (_.shareId = i.data.obj.shareId), _;
  }
  getImageNodes() {
    const i = this.props.jstree;
    let o = [];
    for (let s of this.props.treeOpenNodes)
      for (let d of s.children)
        d = i.get_node(d), d.type === "image" && (s.type === "dataset" && (d.datasetName = s.text, d.datasetId = s.data.id), o.push(d));
    return o;
  }
  render() {
    const i = this.props.effectiveRootNode;
    return /* @__PURE__ */ jsx(
      FilterHub,
      {
        parentType: i.type,
        parentId: i.data.obj.id,
        setSelectedImages: this.props.setSelectedImages,
        thumbnailLoader: this.props.thumbnailLoader,
        images: this.state.imagesJson
      }
    );
  }
}
class DataContainer extends React.Component {
  static get ROOT_NODE_TYPES() {
    return [
      "project",
      "dataset",
      "orphaned",
      "tag",
      "share",
      "screen",
      "plate",
      "acquisition"
    ];
  }
  constructor(i) {
    super(i);
    const s = this.props.jstree.get_selected(!0), d = this.getRootNodes(s), h = this.getEffectiveRootNode(d, s), _ = this.getOpenNodes(s, h);
    this.state = {
      treeSelectedNodes: s,
      treeRootNodes: d,
      effectiveRootNode: h,
      treeOpenNodes: _
    }, $("body").on("selection_change.ome", null, this, this.onSelectionChangeOme), $("#dataTree").on("open_node.jstree", null, this, this.onJsTreeOpenCloseNode).on("close_node.jstree", null, this, this.onJsTreeOpenCloseNode), this.setSelectedImages = this.setSelectedImages.bind(this), this.onOpenAllClicked = this.onOpenAllClicked.bind(this);
  }
  /**
   * Called whenever the "Open All" button is clicked.  Unbinds the
   * 'open_node.jstree' event handler, initiates the opening of all nodes
   * under the effective root node, and then rebinds the event handler.
   */
  onOpenAllClicked(i) {
    $("#dataTree").off("open_node.jstree"), $("#dataTree").on("open_all.jstree", null, this, (o, s) => {
      $("#dataTree").off("open_all.jstree");
      const d = o.data;
      $("#dataTree").on(
        "open_node.jstree",
        null,
        d,
        d.onJsTreeOpenCloseNode
      ), d.onJsTreeOpenCloseNode(o, s);
    }), this.props.jstree.open_all(this.state.effectiveRootNode.id);
  }
  /**
   * Called whenever a 'selection_change.ome' event is triggered on the page
   * body.  This is a jQuery event handler so has slightly different
   * semantics than if it were a React one.
   * @see https://www.jstree.com/api/#/?q=.jstree%20Event
   */
  onSelectionChangeOme(i) {
    const o = i.data, d = o.props.jstree.get_selected(!0), h = o.getRootNodes(d), _ = o.getEffectiveRootNode(h, d), b = o.getOpenNodes(d, _);
    o.setState({
      treeSelectedNodes: d,
      treeRootNodes: h,
      effectiveRootNode: _,
      treeOpenNodes: b
    });
  }
  /**
   * Called whenever a 'open_node.jstree', 'close_node.jstree' or
   * 'open_all.jstree' event is fired by the jsTree instance on the page.
   * This is a jQuery event handler so has slightly different semantics
   * than if it were a React one.
   * @see https://www.jstree.com/api/#/?q=.jstree%20Event
   */
  onJsTreeOpenCloseNode(i, o) {
    const s = i.data;
    s.setState((d, h) => ({
      treeOpenNodes: s.getOpenNodes(
        d.treeSelectedNodes,
        d.effectiveRootNode
      )
    }));
  }
  /**
   * From a set of selected jsTree nodes return a corresponding array of
   * root nodes.
   */
  getRootNodes(i) {
    const o = this.props.jstree;
    return i.map((s) => {
      let d = s, h = d;
      for (; h.type !== "experimenter"; )
        d = h, h = o.get_node(
          o.get_parent(d.id)
        );
      return d;
    });
  }
  /**
   * From a set of selected and root jsTree nodes return the single
   * effective root node.  The set of supported root node types is
   * defined by <code>ROOT_NODE_TYPES</code>, all selected nodes must
   * be of the same type, and either one node must be selected or
   * <strong>only</strong> images must be selected.
   *
   * If any of these conditions are not met the effective root node is
   * undefined.
   */
  getEffectiveRootNode(i, o) {
    if (i.length < 1)
      return;
    const s = i[0];
    if (DataContainer.ROOT_NODE_TYPES.includes(s.type)) {
      for (let d of i)
        if (s.id !== d.id)
          return;
      if (o.length > 1) {
        for (let d of o)
          if (d.type !== "image")
            return;
      }
      return s;
    }
  }
  /**
   * From a set of selected and effective root jsTree nodes return the
   * array of open jsTree nodes under that effective root.
   */
  getOpenNodes(i, o) {
    const s = this.props.jstree;
    if (o) {
      if (o.type === "project")
        return o.children.filter(
          (d) => s.is_open(d)
        ).map((d) => s.get_node(d));
      if (o.type === "dataset")
        return [o];
      if (["screen", "plate"].includes(o.type)) {
        let d = i[0];
        if (d.type === "plate")
          return [d];
        if (d.type === "acquisition")
          return [s.get_node(
            s.get_parent(d.id)
          )];
      }
    }
    return [];
  }
  setSelectedImages(i) {
    let o = this.props.jstree;
    if (o) {
      o.deselect_all(), i.length < 1 && o.select_node(this.state.effectiveRootNode.id), OME.getTreeImageContainerBestGuess(i[0]);
      let s = i.map((d) => {
        let h = OME.getTreeImageContainerBestGuess(d);
        return o.locate_node("image-" + d, h)[0];
      });
      o.select_node(s, !0), s.length > 0 && $("#" + s[0].id).children(".jstree-anchor").focus(), $("#dataTree").trigger(
        "selection_change.ome",
        o.get_selected(!0).length
      );
    }
  }
  render() {
    const i = this.props.jstree, o = this.state.effectiveRootNode;
    return o ? o.type === "plate" && o.children.length > 1 ? /* @__PURE__ */ jsx("h2", { className: "iconTable", children: "Select Run" }) : o.type === "project" && this.state.treeOpenNodes.length < 1 ? /* @__PURE__ */ jsxs("div", { className: "parade_openAll", children: [
      /* @__PURE__ */ jsx("h1", { children: "No open Datasets" }),
      /* @__PURE__ */ jsx("button", { onClick: this.onOpenAllClicked, children: "Open All" })
    ] }) : o.type === "screen" || o.type === "plate" ? /* @__PURE__ */ jsx(
      Plate,
      {
        treeSelectedNodes: this.state.treeSelectedNodes,
        treeOpenNodes: this.state.treeOpenNodes,
        effectiveRootNode: this.state.effectiveRootNode,
        thumbnailLoader: this.props.thumbnailLoader
      }
    ) : o.type === "project" || o.type === "dataset" ? /* @__PURE__ */ jsx(
      DatasetContainer,
      {
        jstree: i,
        treeSelectedNodes: this.state.treeSelectedNodes,
        treeOpenNodes: this.state.treeOpenNodes,
        effectiveRootNode: this.state.effectiveRootNode,
        setSelectedImages: this.setSelectedImages,
        thumbnailLoader: this.props.thumbnailLoader
      }
    ) : /* @__PURE__ */ jsxs("div", { children: [
      "Oops ",
      o.type
    ] }) : /* @__PURE__ */ jsx("div", {});
  }
}
var shams = function e() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var i = {}, o = Symbol("test"), s = Object(o);
  if (typeof o == "string" || Object.prototype.toString.call(o) !== "[object Symbol]" || Object.prototype.toString.call(s) !== "[object Symbol]")
    return !1;
  var d = 42;
  i[o] = d;
  for (o in i)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(i).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(i).length !== 0)
    return !1;
  var h = Object.getOwnPropertySymbols(i);
  if (h.length !== 1 || h[0] !== o || !Object.prototype.propertyIsEnumerable.call(i, o))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var _ = Object.getOwnPropertyDescriptor(i, o);
    if (_.value !== d || _.enumerable !== !0)
      return !1;
  }
  return !0;
}, origSymbol = typeof Symbol < "u" && Symbol, hasSymbolSham = shams, hasSymbols$1 = function e() {
  return typeof origSymbol != "function" || typeof Symbol != "function" || typeof origSymbol("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : hasSymbolSham();
}, ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", slice = Array.prototype.slice, toStr$1 = Object.prototype.toString, funcType = "[object Function]", implementation$1 = function e(i) {
  var o = this;
  if (typeof o != "function" || toStr$1.call(o) !== funcType)
    throw new TypeError(ERROR_MESSAGE + o);
  for (var s = slice.call(arguments, 1), d, h = function() {
    if (this instanceof d) {
      var ut = o.apply(
        this,
        s.concat(slice.call(arguments))
      );
      return Object(ut) === ut ? ut : this;
    } else
      return o.apply(
        i,
        s.concat(slice.call(arguments))
      );
  }, _ = Math.max(0, o.length - s.length), b = [], _e = 0; _e < _; _e++)
    b.push("$" + _e);
  if (d = Function("binder", "return function (" + b.join(",") + "){ return binder.apply(this,arguments); }")(h), o.prototype) {
    var et = function() {
    };
    et.prototype = o.prototype, d.prototype = new et(), et.prototype = null;
  }
  return d;
}, implementation = implementation$1, functionBind = Function.prototype.bind || implementation, bind$1 = functionBind, src = bind$1.call(Function.call, Object.prototype.hasOwnProperty), undefined$1, $SyntaxError = SyntaxError, $Function = Function, $TypeError$1 = TypeError, getEvalledConstructor = function(e) {
  try {
    return $Function('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD)
  try {
    $gOPD({}, "");
  } catch {
    $gOPD = null;
  }
var throwTypeError = function() {
  throw new $TypeError$1();
}, ThrowTypeError = $gOPD ? function() {
  try {
    return arguments.callee, throwTypeError;
  } catch {
    try {
      return $gOPD(arguments, "callee").get;
    } catch {
      return throwTypeError;
    }
  }
}() : throwTypeError, hasSymbols = hasSymbols$1(), getProto = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, needsEval = {}, TypedArray = typeof Uint8Array > "u" ? undefined$1 : getProto(Uint8Array), INTRINSICS = {
  "%AggregateError%": typeof AggregateError > "u" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics > "u" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt > "u" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array > "u" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array > "u" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON == "object" ? JSON : undefined$1,
  "%Map%": typeof Map > "u" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !hasSymbols ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy > "u" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect > "u" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !hasSymbols ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$1,
  "%Uint8Array%": typeof Uint8Array > "u" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap > "u" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? undefined$1 : WeakSet
};
try {
  null.error;
} catch (e) {
  var errorProto = getProto(getProto(e));
  INTRINSICS["%Error.prototype%"] = errorProto;
}
var doEval = function e(i) {
  var o;
  if (i === "%AsyncFunction%")
    o = getEvalledConstructor("async function () {}");
  else if (i === "%GeneratorFunction%")
    o = getEvalledConstructor("function* () {}");
  else if (i === "%AsyncGeneratorFunction%")
    o = getEvalledConstructor("async function* () {}");
  else if (i === "%AsyncGenerator%") {
    var s = e("%AsyncGeneratorFunction%");
    s && (o = s.prototype);
  } else if (i === "%AsyncIteratorPrototype%") {
    var d = e("%AsyncGenerator%");
    d && (o = getProto(d.prototype));
  }
  return INTRINSICS[i] = o, o;
}, LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, bind = functionBind, hasOwn$1 = src, $concat$1 = bind.call(Function.call, Array.prototype.concat), $spliceApply = bind.call(Function.apply, Array.prototype.splice), $replace$1 = bind.call(Function.call, String.prototype.replace), $strSlice = bind.call(Function.call, String.prototype.slice), $exec = bind.call(Function.call, RegExp.prototype.exec), rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = function e(i) {
  var o = $strSlice(i, 0, 1), s = $strSlice(i, -1);
  if (o === "%" && s !== "%")
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  if (s === "%" && o !== "%")
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  var d = [];
  return $replace$1(i, rePropName, function(h, _, b, _e) {
    d[d.length] = b ? $replace$1(_e, reEscapeChar, "$1") : _ || h;
  }), d;
}, getBaseIntrinsic = function e(i, o) {
  var s = i, d;
  if (hasOwn$1(LEGACY_ALIASES, s) && (d = LEGACY_ALIASES[s], s = "%" + d[0] + "%"), hasOwn$1(INTRINSICS, s)) {
    var h = INTRINSICS[s];
    if (h === needsEval && (h = doEval(s)), typeof h > "u" && !o)
      throw new $TypeError$1("intrinsic " + i + " exists, but is not available. Please file an issue!");
    return {
      alias: d,
      name: s,
      value: h
    };
  }
  throw new $SyntaxError("intrinsic " + i + " does not exist!");
}, getIntrinsic = function e(i, o) {
  if (typeof i != "string" || i.length === 0)
    throw new $TypeError$1("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof o != "boolean")
    throw new $TypeError$1('"allowMissing" argument must be a boolean');
  if ($exec(/^%?[^%]*%?$/, i) === null)
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var s = stringToPath(i), d = s.length > 0 ? s[0] : "", h = getBaseIntrinsic("%" + d + "%", o), _ = h.name, b = h.value, _e = !1, et = h.alias;
  et && (d = et[0], $spliceApply(s, $concat$1([0, 1], et)));
  for (var ut = 1, st = !0; ut < s.length; ut += 1) {
    var ct = s[ut], mt = $strSlice(ct, 0, 1), pt = $strSlice(ct, -1);
    if ((mt === '"' || mt === "'" || mt === "`" || pt === '"' || pt === "'" || pt === "`") && mt !== pt)
      throw new $SyntaxError("property names with quotes must have matching quotes");
    if ((ct === "constructor" || !st) && (_e = !0), d += "." + ct, _ = "%" + d + "%", hasOwn$1(INTRINSICS, _))
      b = INTRINSICS[_];
    else if (b != null) {
      if (!(ct in b)) {
        if (!o)
          throw new $TypeError$1("base intrinsic for " + i + " exists, but the property is not available.");
        return;
      }
      if ($gOPD && ut + 1 >= s.length) {
        var vt = $gOPD(b, ct);
        st = !!vt, st && "get" in vt && !("originalValue" in vt.get) ? b = vt.get : b = b[ct];
      } else
        st = hasOwn$1(b, ct), b = b[ct];
      st && !_e && (INTRINSICS[_] = b);
    }
  }
  return b;
}, callBindExports = {}, callBind$1 = {
  get exports() {
    return callBindExports;
  },
  set exports(e) {
    callBindExports = e;
  }
};
(function(e) {
  var i = functionBind, o = getIntrinsic, s = o("%Function.prototype.apply%"), d = o("%Function.prototype.call%"), h = o("%Reflect.apply%", !0) || i.call(d, s), _ = o("%Object.getOwnPropertyDescriptor%", !0), b = o("%Object.defineProperty%", !0), _e = o("%Math.max%");
  if (b)
    try {
      b({}, "a", { value: 1 });
    } catch {
      b = null;
    }
  e.exports = function(st) {
    var ct = h(i, d, arguments);
    if (_ && b) {
      var mt = _(ct, "length");
      mt.configurable && b(
        ct,
        "length",
        { value: 1 + _e(0, st.length - (arguments.length - 1)) }
      );
    }
    return ct;
  };
  var et = function() {
    return h(i, s, arguments);
  };
  b ? b(e.exports, "apply", { value: et }) : e.exports.apply = et;
})(callBind$1);
var GetIntrinsic$1 = getIntrinsic, callBind = callBindExports, $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf")), callBound$1 = function e(i, o) {
  var s = GetIntrinsic$1(i, !!o);
  return typeof s == "function" && $indexOf(i, ".prototype.") > -1 ? callBind(s) : s;
};
const __viteBrowserExternal = {}, __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" })), require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map == "function" && Map.prototype, mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get == "function" ? mapSizeDescriptor.get : null, mapForEach = hasMap && Map.prototype.forEach, hasSet = typeof Set == "function" && Set.prototype, setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get == "function" ? setSizeDescriptor.get : null, setForEach = hasSet && Set.prototype.forEach, hasWeakMap = typeof WeakMap == "function" && WeakMap.prototype, weakMapHas = hasWeakMap ? WeakMap.prototype.has : null, hasWeakSet = typeof WeakSet == "function" && WeakSet.prototype, weakSetHas = hasWeakSet ? WeakSet.prototype.has : null, hasWeakRef = typeof WeakRef == "function" && WeakRef.prototype, weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null, booleanValueOf = Boolean.prototype.valueOf, objectToString = Object.prototype.toString, functionToString = Function.prototype.toString, $match = String.prototype.match, $slice = String.prototype.slice, $replace = String.prototype.replace, $toUpperCase = String.prototype.toUpperCase, $toLowerCase = String.prototype.toLowerCase, $test = RegExp.prototype.test, $concat = Array.prototype.concat, $join = Array.prototype.join, $arrSlice = Array.prototype.slice, $floor = Math.floor, bigIntValueOf = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, gOPS = Object.getOwnPropertySymbols, symToString = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, hasShammedSymbols = typeof Symbol == "function" && typeof Symbol.iterator == "object", toStringTag = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols || "symbol") ? Symbol.toStringTag : null, isEnumerable = Object.prototype.propertyIsEnumerable, gPO = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function addNumericSeparator(e, i) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || $test.call(/e/, i))
    return i;
  var o = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var s = e < 0 ? -$floor(-e) : $floor(e);
    if (s !== e) {
      var d = String(s), h = $slice.call(i, d.length + 1);
      return $replace.call(d, o, "$&_") + "." + $replace.call($replace.call(h, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace.call(i, o, "$&_");
}
var utilInspect = require$$0, inspectCustom = utilInspect.custom, inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null, objectInspect = function e(i, o, s, d) {
  var h = o || {};
  if (has$3(h, "quoteStyle") && h.quoteStyle !== "single" && h.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (has$3(h, "maxStringLength") && (typeof h.maxStringLength == "number" ? h.maxStringLength < 0 && h.maxStringLength !== 1 / 0 : h.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var _ = has$3(h, "customInspect") ? h.customInspect : !0;
  if (typeof _ != "boolean" && _ !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (has$3(h, "indent") && h.indent !== null && h.indent !== "	" && !(parseInt(h.indent, 10) === h.indent && h.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (has$3(h, "numericSeparator") && typeof h.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var b = h.numericSeparator;
  if (typeof i > "u")
    return "undefined";
  if (i === null)
    return "null";
  if (typeof i == "boolean")
    return i ? "true" : "false";
  if (typeof i == "string")
    return inspectString(i, h);
  if (typeof i == "number") {
    if (i === 0)
      return 1 / 0 / i > 0 ? "0" : "-0";
    var _e = String(i);
    return b ? addNumericSeparator(i, _e) : _e;
  }
  if (typeof i == "bigint") {
    var et = String(i) + "n";
    return b ? addNumericSeparator(i, et) : et;
  }
  var ut = typeof h.depth > "u" ? 5 : h.depth;
  if (typeof s > "u" && (s = 0), s >= ut && ut > 0 && typeof i == "object")
    return isArray$3(i) ? "[Array]" : "[Object]";
  var st = getIndent(h, s);
  if (typeof d > "u")
    d = [];
  else if (indexOf(d, i) >= 0)
    return "[Circular]";
  function ct(an, pn, wn) {
    if (pn && (d = $arrSlice.call(d), d.push(pn)), wn) {
      var Gt = {
        depth: h.depth
      };
      return has$3(h, "quoteStyle") && (Gt.quoteStyle = h.quoteStyle), e(an, Gt, s + 1, d);
    }
    return e(an, h, s + 1, d);
  }
  if (typeof i == "function" && !isRegExp$1(i)) {
    var mt = nameOf(i), pt = arrObjKeys(i, ct);
    return "[Function" + (mt ? ": " + mt : " (anonymous)") + "]" + (pt.length > 0 ? " { " + $join.call(pt, ", ") + " }" : "");
  }
  if (isSymbol(i)) {
    var vt = hasShammedSymbols ? $replace.call(String(i), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(i);
    return typeof i == "object" && !hasShammedSymbols ? markBoxed(vt) : vt;
  }
  if (isElement(i)) {
    for (var ht = "<" + $toLowerCase.call(String(i.nodeName)), nt = i.attributes || [], ot = 0; ot < nt.length; ot++)
      ht += " " + nt[ot].name + "=" + wrapQuotes(quote(nt[ot].value), "double", h);
    return ht += ">", i.childNodes && i.childNodes.length && (ht += "..."), ht += "</" + $toLowerCase.call(String(i.nodeName)) + ">", ht;
  }
  if (isArray$3(i)) {
    if (i.length === 0)
      return "[]";
    var it = arrObjKeys(i, ct);
    return st && !singleLineValues(it) ? "[" + indentedJoin(it, st) + "]" : "[ " + $join.call(it, ", ") + " ]";
  }
  if (isError(i)) {
    var at = arrObjKeys(i, ct);
    return !("cause" in Error.prototype) && "cause" in i && !isEnumerable.call(i, "cause") ? "{ [" + String(i) + "] " + $join.call($concat.call("[cause]: " + ct(i.cause), at), ", ") + " }" : at.length === 0 ? "[" + String(i) + "]" : "{ [" + String(i) + "] " + $join.call(at, ", ") + " }";
  }
  if (typeof i == "object" && _) {
    if (inspectSymbol && typeof i[inspectSymbol] == "function" && utilInspect)
      return utilInspect(i, { depth: ut - s });
    if (_ !== "symbol" && typeof i.inspect == "function")
      return i.inspect();
  }
  if (isMap(i)) {
    var St = [];
    return mapForEach && mapForEach.call(i, function(an, pn) {
      St.push(ct(pn, i, !0) + " => " + ct(an, i));
    }), collectionOf("Map", mapSize.call(i), St, st);
  }
  if (isSet(i)) {
    var _t = [];
    return setForEach && setForEach.call(i, function(an) {
      _t.push(ct(an, i));
    }), collectionOf("Set", setSize.call(i), _t, st);
  }
  if (isWeakMap(i))
    return weakCollectionOf("WeakMap");
  if (isWeakSet(i))
    return weakCollectionOf("WeakSet");
  if (isWeakRef(i))
    return weakCollectionOf("WeakRef");
  if (isNumber(i))
    return markBoxed(ct(Number(i)));
  if (isBigInt(i))
    return markBoxed(ct(bigIntValueOf.call(i)));
  if (isBoolean(i))
    return markBoxed(booleanValueOf.call(i));
  if (isString(i))
    return markBoxed(ct(String(i)));
  if (!isDate(i) && !isRegExp$1(i)) {
    var xt = arrObjKeys(i, ct), Tt = gPO ? gPO(i) === Object.prototype : i instanceof Object || i.constructor === Object, Lt = i instanceof Object ? "" : "null prototype", $t = !Tt && toStringTag && Object(i) === i && toStringTag in i ? $slice.call(toStr(i), 8, -1) : Lt ? "Object" : "", Ft = Tt || typeof i.constructor != "function" ? "" : i.constructor.name ? i.constructor.name + " " : "", nn = Ft + ($t || Lt ? "[" + $join.call($concat.call([], $t || [], Lt || []), ": ") + "] " : "");
    return xt.length === 0 ? nn + "{}" : st ? nn + "{" + indentedJoin(xt, st) + "}" : nn + "{ " + $join.call(xt, ", ") + " }";
  }
  return String(i);
};
function wrapQuotes(e, i, o) {
  var s = (o.quoteStyle || i) === "double" ? '"' : "'";
  return s + e + s;
}
function quote(e) {
  return $replace.call(String(e), /"/g, "&quot;");
}
function isArray$3(e) {
  return toStr(e) === "[object Array]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isDate(e) {
  return toStr(e) === "[object Date]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isRegExp$1(e) {
  return toStr(e) === "[object RegExp]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isError(e) {
  return toStr(e) === "[object Error]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isString(e) {
  return toStr(e) === "[object String]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isNumber(e) {
  return toStr(e) === "[object Number]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isBoolean(e) {
  return toStr(e) === "[object Boolean]" && (!toStringTag || !(typeof e == "object" && toStringTag in e));
}
function isSymbol(e) {
  if (hasShammedSymbols)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !symToString)
    return !1;
  try {
    return symToString.call(e), !0;
  } catch {
  }
  return !1;
}
function isBigInt(e) {
  if (!e || typeof e != "object" || !bigIntValueOf)
    return !1;
  try {
    return bigIntValueOf.call(e), !0;
  } catch {
  }
  return !1;
}
var hasOwn = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function has$3(e, i) {
  return hasOwn.call(e, i);
}
function toStr(e) {
  return objectToString.call(e);
}
function nameOf(e) {
  if (e.name)
    return e.name;
  var i = $match.call(functionToString.call(e), /^function\s*([\w$]+)/);
  return i ? i[1] : null;
}
function indexOf(e, i) {
  if (e.indexOf)
    return e.indexOf(i);
  for (var o = 0, s = e.length; o < s; o++)
    if (e[o] === i)
      return o;
  return -1;
}
function isMap(e) {
  if (!mapSize || !e || typeof e != "object")
    return !1;
  try {
    mapSize.call(e);
    try {
      setSize.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function isWeakMap(e) {
  if (!weakMapHas || !e || typeof e != "object")
    return !1;
  try {
    weakMapHas.call(e, weakMapHas);
    try {
      weakSetHas.call(e, weakSetHas);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function isWeakRef(e) {
  if (!weakRefDeref || !e || typeof e != "object")
    return !1;
  try {
    return weakRefDeref.call(e), !0;
  } catch {
  }
  return !1;
}
function isSet(e) {
  if (!setSize || !e || typeof e != "object")
    return !1;
  try {
    setSize.call(e);
    try {
      mapSize.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function isWeakSet(e) {
  if (!weakSetHas || !e || typeof e != "object")
    return !1;
  try {
    weakSetHas.call(e, weakSetHas);
    try {
      weakMapHas.call(e, weakMapHas);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function isElement(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function inspectString(e, i) {
  if (e.length > i.maxStringLength) {
    var o = e.length - i.maxStringLength, s = "... " + o + " more character" + (o > 1 ? "s" : "");
    return inspectString($slice.call(e, 0, i.maxStringLength), i) + s;
  }
  var d = $replace.call($replace.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(d, "single", i);
}
function lowbyte(e) {
  var i = e.charCodeAt(0), o = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[i];
  return o ? "\\" + o : "\\x" + (i < 16 ? "0" : "") + $toUpperCase.call(i.toString(16));
}
function markBoxed(e) {
  return "Object(" + e + ")";
}
function weakCollectionOf(e) {
  return e + " { ? }";
}
function collectionOf(e, i, o, s) {
  var d = s ? indentedJoin(o, s) : $join.call(o, ", ");
  return e + " (" + i + ") {" + d + "}";
}
function singleLineValues(e) {
  for (var i = 0; i < e.length; i++)
    if (indexOf(e[i], `
`) >= 0)
      return !1;
  return !0;
}
function getIndent(e, i) {
  var o;
  if (e.indent === "	")
    o = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    o = $join.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: o,
    prev: $join.call(Array(i + 1), o)
  };
}
function indentedJoin(e, i) {
  if (e.length === 0)
    return "";
  var o = `
` + i.prev + i.base;
  return o + $join.call(e, "," + o) + `
` + i.prev;
}
function arrObjKeys(e, i) {
  var o = isArray$3(e), s = [];
  if (o) {
    s.length = e.length;
    for (var d = 0; d < e.length; d++)
      s[d] = has$3(e, d) ? i(e[d], e) : "";
  }
  var h = typeof gOPS == "function" ? gOPS(e) : [], _;
  if (hasShammedSymbols) {
    _ = {};
    for (var b = 0; b < h.length; b++)
      _["$" + h[b]] = h[b];
  }
  for (var _e in e)
    has$3(e, _e) && (o && String(Number(_e)) === _e && _e < e.length || hasShammedSymbols && _["$" + _e] instanceof Symbol || ($test.call(/[^\w$]/, _e) ? s.push(i(_e, e) + ": " + i(e[_e], e)) : s.push(_e + ": " + i(e[_e], e))));
  if (typeof gOPS == "function")
    for (var et = 0; et < h.length; et++)
      isEnumerable.call(e, h[et]) && s.push("[" + i(h[et]) + "]: " + i(e[h[et]], e));
  return s;
}
var GetIntrinsic = getIntrinsic, callBound = callBound$1, inspect = objectInspect, $TypeError = GetIntrinsic("%TypeError%"), $WeakMap = GetIntrinsic("%WeakMap%", !0), $Map = GetIntrinsic("%Map%", !0), $weakMapGet = callBound("WeakMap.prototype.get", !0), $weakMapSet = callBound("WeakMap.prototype.set", !0), $weakMapHas = callBound("WeakMap.prototype.has", !0), $mapGet = callBound("Map.prototype.get", !0), $mapSet = callBound("Map.prototype.set", !0), $mapHas = callBound("Map.prototype.has", !0), listGetNode = function(e, i) {
  for (var o = e, s; (s = o.next) !== null; o = s)
    if (s.key === i)
      return o.next = s.next, s.next = e.next, e.next = s, s;
}, listGet = function(e, i) {
  var o = listGetNode(e, i);
  return o && o.value;
}, listSet = function(e, i, o) {
  var s = listGetNode(e, i);
  s ? s.value = o : e.next = {
    // eslint-disable-line no-param-reassign
    key: i,
    next: e.next,
    value: o
  };
}, listHas = function(e, i) {
  return !!listGetNode(e, i);
}, sideChannel = function e() {
  var i, o, s, d = {
    assert: function(h) {
      if (!d.has(h))
        throw new $TypeError("Side channel does not contain " + inspect(h));
    },
    get: function(h) {
      if ($WeakMap && h && (typeof h == "object" || typeof h == "function")) {
        if (i)
          return $weakMapGet(i, h);
      } else if ($Map) {
        if (o)
          return $mapGet(o, h);
      } else if (s)
        return listGet(s, h);
    },
    has: function(h) {
      if ($WeakMap && h && (typeof h == "object" || typeof h == "function")) {
        if (i)
          return $weakMapHas(i, h);
      } else if ($Map) {
        if (o)
          return $mapHas(o, h);
      } else if (s)
        return listHas(s, h);
      return !1;
    },
    set: function(h, _) {
      $WeakMap && h && (typeof h == "object" || typeof h == "function") ? (i || (i = new $WeakMap()), $weakMapSet(i, h, _)) : $Map ? (o || (o = new $Map()), $mapSet(o, h, _)) : (s || (s = { key: {}, next: null }), listSet(s, h, _));
    }
  };
  return d;
}, replace = String.prototype.replace, percentTwenties = /%20/g, Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, formats$3 = {
  default: Format.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return replace.call(e, percentTwenties, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
}, formats$2 = formats$3, has$2 = Object.prototype.hasOwnProperty, isArray$2 = Array.isArray, hexTable = function() {
  for (var e = [], i = 0; i < 256; ++i)
    e.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  return e;
}(), compactQueue = function e(i) {
  for (; i.length > 1; ) {
    var o = i.pop(), s = o.obj[o.prop];
    if (isArray$2(s)) {
      for (var d = [], h = 0; h < s.length; ++h)
        typeof s[h] < "u" && d.push(s[h]);
      o.obj[o.prop] = d;
    }
  }
}, arrayToObject = function e(i, o) {
  for (var s = o && o.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, d = 0; d < i.length; ++d)
    typeof i[d] < "u" && (s[d] = i[d]);
  return s;
}, merge = function e(i, o, s) {
  if (!o)
    return i;
  if (typeof o != "object") {
    if (isArray$2(i))
      i.push(o);
    else if (i && typeof i == "object")
      (s && (s.plainObjects || s.allowPrototypes) || !has$2.call(Object.prototype, o)) && (i[o] = !0);
    else
      return [i, o];
    return i;
  }
  if (!i || typeof i != "object")
    return [i].concat(o);
  var d = i;
  return isArray$2(i) && !isArray$2(o) && (d = arrayToObject(i, s)), isArray$2(i) && isArray$2(o) ? (o.forEach(function(h, _) {
    if (has$2.call(i, _)) {
      var b = i[_];
      b && typeof b == "object" && h && typeof h == "object" ? i[_] = e(b, h, s) : i.push(h);
    } else
      i[_] = h;
  }), i) : Object.keys(o).reduce(function(h, _) {
    var b = o[_];
    return has$2.call(h, _) ? h[_] = e(h[_], b, s) : h[_] = b, h;
  }, d);
}, assign = function e(i, o) {
  return Object.keys(o).reduce(function(s, d) {
    return s[d] = o[d], s;
  }, i);
}, decode = function(e, i, o) {
  var s = e.replace(/\+/g, " ");
  if (o === "iso-8859-1")
    return s.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}, encode = function e(i, o, s, d, h) {
  if (i.length === 0)
    return i;
  var _ = i;
  if (typeof i == "symbol" ? _ = Symbol.prototype.toString.call(i) : typeof i != "string" && (_ = String(i)), s === "iso-8859-1")
    return escape(_).replace(/%u[0-9a-f]{4}/gi, function(ut) {
      return "%26%23" + parseInt(ut.slice(2), 16) + "%3B";
    });
  for (var b = "", _e = 0; _e < _.length; ++_e) {
    var et = _.charCodeAt(_e);
    if (et === 45 || et === 46 || et === 95 || et === 126 || et >= 48 && et <= 57 || et >= 65 && et <= 90 || et >= 97 && et <= 122 || h === formats$2.RFC1738 && (et === 40 || et === 41)) {
      b += _.charAt(_e);
      continue;
    }
    if (et < 128) {
      b = b + hexTable[et];
      continue;
    }
    if (et < 2048) {
      b = b + (hexTable[192 | et >> 6] + hexTable[128 | et & 63]);
      continue;
    }
    if (et < 55296 || et >= 57344) {
      b = b + (hexTable[224 | et >> 12] + hexTable[128 | et >> 6 & 63] + hexTable[128 | et & 63]);
      continue;
    }
    _e += 1, et = 65536 + ((et & 1023) << 10 | _.charCodeAt(_e) & 1023), b += hexTable[240 | et >> 18] + hexTable[128 | et >> 12 & 63] + hexTable[128 | et >> 6 & 63] + hexTable[128 | et & 63];
  }
  return b;
}, compact = function e(i) {
  for (var o = [{ obj: { o: i }, prop: "o" }], s = [], d = 0; d < o.length; ++d)
    for (var h = o[d], _ = h.obj[h.prop], b = Object.keys(_), _e = 0; _e < b.length; ++_e) {
      var et = b[_e], ut = _[et];
      typeof ut == "object" && ut !== null && s.indexOf(ut) === -1 && (o.push({ obj: _, prop: et }), s.push(ut));
    }
  return compactQueue(o), i;
}, isRegExp = function e(i) {
  return Object.prototype.toString.call(i) === "[object RegExp]";
}, isBuffer = function e(i) {
  return !i || typeof i != "object" ? !1 : !!(i.constructor && i.constructor.isBuffer && i.constructor.isBuffer(i));
}, combine = function e(i, o) {
  return [].concat(i, o);
}, maybeMap = function e(i, o) {
  if (isArray$2(i)) {
    for (var s = [], d = 0; d < i.length; d += 1)
      s.push(o(i[d]));
    return s;
  }
  return o(i);
}, utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge
}, getSideChannel = sideChannel, utils$1 = utils$2, formats$1 = formats$3, has$1 = Object.prototype.hasOwnProperty, arrayPrefixGenerators = {
  brackets: function e(i) {
    return i + "[]";
  },
  comma: "comma",
  indices: function e(i, o) {
    return i + "[" + o + "]";
  },
  repeat: function e(i) {
    return i;
  }
}, isArray$1 = Array.isArray, push = Array.prototype.push, pushToArray = function(e, i) {
  push.apply(e, isArray$1(i) ? i : [i]);
}, toISO = Date.prototype.toISOString, defaultFormat = formats$1.default, defaults$1 = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: utils$1.encode,
  encodeValuesOnly: !1,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  // deprecated
  indices: !1,
  serializeDate: function e(i) {
    return toISO.call(i);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, isNonNullishPrimitive = function e(i) {
  return typeof i == "string" || typeof i == "number" || typeof i == "boolean" || typeof i == "symbol" || typeof i == "bigint";
}, sentinel = {}, stringify$1 = function e(i, o, s, d, h, _, b, _e, et, ut, st, ct, mt, pt, vt, ht) {
  for (var nt = i, ot = ht, it = 0, at = !1; (ot = ot.get(sentinel)) !== void 0 && !at; ) {
    var St = ot.get(i);
    if (it += 1, typeof St < "u") {
      if (St === it)
        throw new RangeError("Cyclic object value");
      at = !0;
    }
    typeof ot.get(sentinel) > "u" && (it = 0);
  }
  if (typeof _e == "function" ? nt = _e(o, nt) : nt instanceof Date ? nt = st(nt) : s === "comma" && isArray$1(nt) && (nt = utils$1.maybeMap(nt, function(Gt) {
    return Gt instanceof Date ? st(Gt) : Gt;
  })), nt === null) {
    if (h)
      return b && !pt ? b(o, defaults$1.encoder, vt, "key", ct) : o;
    nt = "";
  }
  if (isNonNullishPrimitive(nt) || utils$1.isBuffer(nt)) {
    if (b) {
      var _t = pt ? o : b(o, defaults$1.encoder, vt, "key", ct);
      return [mt(_t) + "=" + mt(b(nt, defaults$1.encoder, vt, "value", ct))];
    }
    return [mt(o) + "=" + mt(String(nt))];
  }
  var xt = [];
  if (typeof nt > "u")
    return xt;
  var Tt;
  if (s === "comma" && isArray$1(nt))
    pt && b && (nt = utils$1.maybeMap(nt, b)), Tt = [{ value: nt.length > 0 ? nt.join(",") || null : void 0 }];
  else if (isArray$1(_e))
    Tt = _e;
  else {
    var Lt = Object.keys(nt);
    Tt = et ? Lt.sort(et) : Lt;
  }
  for (var $t = d && isArray$1(nt) && nt.length === 1 ? o + "[]" : o, Ft = 0; Ft < Tt.length; ++Ft) {
    var nn = Tt[Ft], an = typeof nn == "object" && typeof nn.value < "u" ? nn.value : nt[nn];
    if (!(_ && an === null)) {
      var pn = isArray$1(nt) ? typeof s == "function" ? s($t, nn) : $t : $t + (ut ? "." + nn : "[" + nn + "]");
      ht.set(i, it);
      var wn = getSideChannel();
      wn.set(sentinel, ht), pushToArray(xt, e(
        an,
        pn,
        s,
        d,
        h,
        _,
        s === "comma" && pt && isArray$1(nt) ? null : b,
        _e,
        et,
        ut,
        st,
        ct,
        mt,
        pt,
        vt,
        wn
      ));
    }
  }
  return xt;
}, normalizeStringifyOptions = function e(i) {
  if (!i)
    return defaults$1;
  if (i.encoder !== null && typeof i.encoder < "u" && typeof i.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var o = i.charset || defaults$1.charset;
  if (typeof i.charset < "u" && i.charset !== "utf-8" && i.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var s = formats$1.default;
  if (typeof i.format < "u") {
    if (!has$1.call(formats$1.formatters, i.format))
      throw new TypeError("Unknown format option provided.");
    s = i.format;
  }
  var d = formats$1.formatters[s], h = defaults$1.filter;
  return (typeof i.filter == "function" || isArray$1(i.filter)) && (h = i.filter), {
    addQueryPrefix: typeof i.addQueryPrefix == "boolean" ? i.addQueryPrefix : defaults$1.addQueryPrefix,
    allowDots: typeof i.allowDots > "u" ? defaults$1.allowDots : !!i.allowDots,
    charset: o,
    charsetSentinel: typeof i.charsetSentinel == "boolean" ? i.charsetSentinel : defaults$1.charsetSentinel,
    delimiter: typeof i.delimiter > "u" ? defaults$1.delimiter : i.delimiter,
    encode: typeof i.encode == "boolean" ? i.encode : defaults$1.encode,
    encoder: typeof i.encoder == "function" ? i.encoder : defaults$1.encoder,
    encodeValuesOnly: typeof i.encodeValuesOnly == "boolean" ? i.encodeValuesOnly : defaults$1.encodeValuesOnly,
    filter: h,
    format: s,
    formatter: d,
    serializeDate: typeof i.serializeDate == "function" ? i.serializeDate : defaults$1.serializeDate,
    skipNulls: typeof i.skipNulls == "boolean" ? i.skipNulls : defaults$1.skipNulls,
    sort: typeof i.sort == "function" ? i.sort : null,
    strictNullHandling: typeof i.strictNullHandling == "boolean" ? i.strictNullHandling : defaults$1.strictNullHandling
  };
}, stringify_1 = function(e, i) {
  var o = e, s = normalizeStringifyOptions(i), d, h;
  typeof s.filter == "function" ? (h = s.filter, o = h("", o)) : isArray$1(s.filter) && (h = s.filter, d = h);
  var _ = [];
  if (typeof o != "object" || o === null)
    return "";
  var b;
  i && i.arrayFormat in arrayPrefixGenerators ? b = i.arrayFormat : i && "indices" in i ? b = i.indices ? "indices" : "repeat" : b = "indices";
  var _e = arrayPrefixGenerators[b];
  if (i && "commaRoundTrip" in i && typeof i.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var et = _e === "comma" && i && i.commaRoundTrip;
  d || (d = Object.keys(o)), s.sort && d.sort(s.sort);
  for (var ut = getSideChannel(), st = 0; st < d.length; ++st) {
    var ct = d[st];
    s.skipNulls && o[ct] === null || pushToArray(_, stringify$1(
      o[ct],
      ct,
      _e,
      et,
      s.strictNullHandling,
      s.skipNulls,
      s.encode ? s.encoder : null,
      s.filter,
      s.sort,
      s.allowDots,
      s.serializeDate,
      s.format,
      s.formatter,
      s.encodeValuesOnly,
      s.charset,
      ut
    ));
  }
  var mt = _.join(s.delimiter), pt = s.addQueryPrefix === !0 ? "?" : "";
  return s.charsetSentinel && (s.charset === "iso-8859-1" ? pt += "utf8=%26%2310003%3B&" : pt += "utf8=%E2%9C%93&"), mt.length > 0 ? pt + mt : "";
}, utils = utils$2, has = Object.prototype.hasOwnProperty, isArray = Array.isArray, defaults = {
  allowDots: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, interpretNumericEntities = function(e) {
  return e.replace(/&#(\d+);/g, function(i, o) {
    return String.fromCharCode(parseInt(o, 10));
  });
}, parseArrayValue = function(e, i) {
  return e && typeof e == "string" && i.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, isoSentinel = "utf8=%26%2310003%3B", charsetSentinel = "utf8=%E2%9C%93", parseValues = function e(i, o) {
  var s = {}, d = o.ignoreQueryPrefix ? i.replace(/^\?/, "") : i, h = o.parameterLimit === 1 / 0 ? void 0 : o.parameterLimit, _ = d.split(o.delimiter, h), b = -1, _e, et = o.charset;
  if (o.charsetSentinel)
    for (_e = 0; _e < _.length; ++_e)
      _[_e].indexOf("utf8=") === 0 && (_[_e] === charsetSentinel ? et = "utf-8" : _[_e] === isoSentinel && (et = "iso-8859-1"), b = _e, _e = _.length);
  for (_e = 0; _e < _.length; ++_e)
    if (_e !== b) {
      var ut = _[_e], st = ut.indexOf("]="), ct = st === -1 ? ut.indexOf("=") : st + 1, mt, pt;
      ct === -1 ? (mt = o.decoder(ut, defaults.decoder, et, "key"), pt = o.strictNullHandling ? null : "") : (mt = o.decoder(ut.slice(0, ct), defaults.decoder, et, "key"), pt = utils.maybeMap(
        parseArrayValue(ut.slice(ct + 1), o),
        function(vt) {
          return o.decoder(vt, defaults.decoder, et, "value");
        }
      )), pt && o.interpretNumericEntities && et === "iso-8859-1" && (pt = interpretNumericEntities(pt)), ut.indexOf("[]=") > -1 && (pt = isArray(pt) ? [pt] : pt), has.call(s, mt) ? s[mt] = utils.combine(s[mt], pt) : s[mt] = pt;
    }
  return s;
}, parseObject = function(e, i, o, s) {
  for (var d = s ? i : parseArrayValue(i, o), h = e.length - 1; h >= 0; --h) {
    var _, b = e[h];
    if (b === "[]" && o.parseArrays)
      _ = [].concat(d);
    else {
      _ = o.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var _e = b.charAt(0) === "[" && b.charAt(b.length - 1) === "]" ? b.slice(1, -1) : b, et = parseInt(_e, 10);
      !o.parseArrays && _e === "" ? _ = { 0: d } : !isNaN(et) && b !== _e && String(et) === _e && et >= 0 && o.parseArrays && et <= o.arrayLimit ? (_ = [], _[et] = d) : _e !== "__proto__" && (_[_e] = d);
    }
    d = _;
  }
  return d;
}, parseKeys = function e(i, o, s, d) {
  if (i) {
    var h = s.allowDots ? i.replace(/\.([^.[]+)/g, "[$1]") : i, _ = /(\[[^[\]]*])/, b = /(\[[^[\]]*])/g, _e = s.depth > 0 && _.exec(h), et = _e ? h.slice(0, _e.index) : h, ut = [];
    if (et) {
      if (!s.plainObjects && has.call(Object.prototype, et) && !s.allowPrototypes)
        return;
      ut.push(et);
    }
    for (var st = 0; s.depth > 0 && (_e = b.exec(h)) !== null && st < s.depth; ) {
      if (st += 1, !s.plainObjects && has.call(Object.prototype, _e[1].slice(1, -1)) && !s.allowPrototypes)
        return;
      ut.push(_e[1]);
    }
    return _e && ut.push("[" + h.slice(_e.index) + "]"), parseObject(ut, o, s, d);
  }
}, normalizeParseOptions = function e(i) {
  if (!i)
    return defaults;
  if (i.decoder !== null && i.decoder !== void 0 && typeof i.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof i.charset < "u" && i.charset !== "utf-8" && i.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var o = typeof i.charset > "u" ? defaults.charset : i.charset;
  return {
    allowDots: typeof i.allowDots > "u" ? defaults.allowDots : !!i.allowDots,
    allowPrototypes: typeof i.allowPrototypes == "boolean" ? i.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof i.allowSparse == "boolean" ? i.allowSparse : defaults.allowSparse,
    arrayLimit: typeof i.arrayLimit == "number" ? i.arrayLimit : defaults.arrayLimit,
    charset: o,
    charsetSentinel: typeof i.charsetSentinel == "boolean" ? i.charsetSentinel : defaults.charsetSentinel,
    comma: typeof i.comma == "boolean" ? i.comma : defaults.comma,
    decoder: typeof i.decoder == "function" ? i.decoder : defaults.decoder,
    delimiter: typeof i.delimiter == "string" || utils.isRegExp(i.delimiter) ? i.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof i.depth == "number" || i.depth === !1 ? +i.depth : defaults.depth,
    ignoreQueryPrefix: i.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof i.interpretNumericEntities == "boolean" ? i.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof i.parameterLimit == "number" ? i.parameterLimit : defaults.parameterLimit,
    parseArrays: i.parseArrays !== !1,
    plainObjects: typeof i.plainObjects == "boolean" ? i.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof i.strictNullHandling == "boolean" ? i.strictNullHandling : defaults.strictNullHandling
  };
}, parse$1 = function(e, i) {
  var o = normalizeParseOptions(i);
  if (e === "" || e === null || typeof e > "u")
    return o.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var s = typeof e == "string" ? parseValues(e, o) : e, d = o.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, h = Object.keys(s), _ = 0; _ < h.length; ++_) {
    var b = h[_], _e = parseKeys(b, s[b], o, typeof e == "string");
    d = utils.merge(d, _e, o);
  }
  return o.allowSparse === !0 ? d : utils.compact(d);
}, stringify = stringify_1, parse = parse$1, formats = formats$3, lib = {
  formats,
  parse,
  stringify
};
class ThumbnailLoader {
  constructor() {
    this.last = new Promise((i, o) => {
      i();
    });
  }
  getThumbnails(i, o, s, d) {
    const h = config.thumbnailsBatch;
    return this.last = this.last.then(() => {
      const _ = [];
      for (let b = 0, _e = i.length; b < _e; b += h)
        _.push(this.loadThumbnails(
          i.slice(b, b + h),
          o,
          s,
          d
        ));
      return Promise.all(_);
    }), this.last;
  }
  loadThumbnails(i, o, s, d) {
    return axios$1.get(config.webgatewayBaseUrl + "get_thumbnails/", {
      cancelToken: d,
      params: { id: i },
      paramsSerializer: (h) => lib.stringify(h, { indices: !1 })
    }).then(o, s);
  }
}
class App extends reactExports.Component {
  constructor(i) {
    super(i), this.thumbnailLoader = new ThumbnailLoader();
  }
  render() {
    return /* @__PURE__ */ jsx(
      DataContainer,
      {
        jstree: this.props.jstree,
        thumbnailLoader: this.thumbnailLoader
      }
    );
  }
}
class SearchForm extends React.Component {
  constructor(i) {
    super(i), this.state = {
      text: ""
    }, this.handleChange = this.handleChange.bind(this), this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(i) {
    this.setState({ text: i.target.value });
  }
  handleSubmit(i) {
    if (i.preventDefault(), !this.state.text.length)
      return;
    let o = config.indexUrl + "search/?query=" + this.state.text;
    $.getJSON(
      o,
      (s) => {
        this.props.setSearchResults(s.data);
      }
    );
  }
  render() {
    return /* @__PURE__ */ jsxs("form", { onSubmit: this.handleSubmit, children: [
      /* @__PURE__ */ jsx("h2", { children: "Search" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          onChange: this.handleChange,
          name: "search_query",
          placeholder: "Search for Images"
        }
      ),
      /* @__PURE__ */ jsx("button", { children: "Search" })
    ] });
  }
}
class SearchApp extends React.Component {
  constructor(i) {
    super(i), this.thumbnailLoader = new ThumbnailLoader(), this.state = {
      searchResults: []
    }, this.setSearchResults = this.setSearchResults.bind(this), this.setSelectedImages = this.setSelectedImages.bind(this);
  }
  setSearchResults(i) {
    this.setState({
      searchResults: i
    });
  }
  setSelectedImages(i) {
    console.log("TODO setSelectedImages...", i);
  }
  render() {
    return /* @__PURE__ */ jsxs("div", { className: "columnContainer", children: [
      /* @__PURE__ */ jsx("div", { className: "leftPanel", children: /* @__PURE__ */ jsx(
        SearchForm,
        {
          setSearchResults: this.setSearchResults
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "paradeCentrePanel", children: /* @__PURE__ */ jsx(
        FilterHub,
        {
          setSelectedImages: this.setSelectedImages,
          images: this.state.searchResults,
          thumbnailLoader: this.thumbnailLoader
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "rightPanel" })
    ] });
  }
}
function omero_parade(e, i) {
  Object.assign(config, i), ReactDOM.render(
    /* @__PURE__ */ jsx(App, { jstree: e }),
    document.getElementById("omero_parade")
  );
}
function full_page_app(e, i) {
  Object.assign(config, i), ReactDOM.render(
    /* @__PURE__ */ jsx(SearchApp, {}),
    document.getElementById(e)
  );
}
const index = { omero_parade, full_page_app };
export {
  index as default
};
