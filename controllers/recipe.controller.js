"use strict";
function _typeof(e) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
var _excluded = ["user"],
  _excluded2 = ["password"];
function ownKeys(t, e) {
  var r,
    n = Object.keys(t);
  return (
    Object.getOwnPropertySymbols &&
      ((r = Object.getOwnPropertySymbols(t)),
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
      n.push.apply(n, r)),
    n
  );
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(r), !0).forEach(function (e) {
          _defineProperty(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : ownKeys(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function _defineProperty(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var r,
    n = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols)
    for (var o = Object.getOwnPropertySymbols(e), i = 0; i < o.length; i++)
      (r = o[i]),
        0 <= t.indexOf(r) ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  return n;
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  for (var r, n = {}, o = Object.keys(e), i = 0; i < o.length; i++)
    (r = o[i]), 0 <= t.indexOf(r) || (n[r] = e[r]);
  return n;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return a;
  };
  var a = {},
    e = Object.prototype,
    u = e.hasOwnProperty,
    t = "function" == typeof Symbol ? Symbol : {},
    n = t.iterator || "@@iterator",
    r = t.asyncIterator || "@@asyncIterator",
    o = t.toStringTag || "@@toStringTag";
  function i(e, t, r) {
    return (
      Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      e[t]
    );
  }
  try {
    i({}, "");
  } catch (e) {
    i = function (e, t, r) {
      return (e[t] = r);
    };
  }
  function c(e, t, r, n) {
    var o,
      i,
      a,
      c,
      t = t && t.prototype instanceof f ? t : f,
      t = Object.create(t.prototype),
      n = new w(n || []);
    return (
      (t._invoke =
        ((o = e),
        (i = r),
        (a = n),
        (c = "suspendedStart"),
        function (e, t) {
          if ("executing" === c)
            throw new Error("Generator is already running");
          if ("completed" === c) {
            if ("throw" === e) throw t;
            return j();
          }
          for (a.method = e, a.arg = t; ; ) {
            var r = a.delegate;
            if (r) {
              r = (function e(t, r) {
                var n = t.iterator[r.method];
                if (void 0 === n) {
                  if (((r.delegate = null), "throw" === r.method)) {
                    if (
                      t.iterator.return &&
                      ((r.method = "return"),
                      (r.arg = void 0),
                      e(t, r),
                      "throw" === r.method)
                    )
                      return p;
                    (r.method = "throw"),
                      (r.arg = new TypeError(
                        "The iterator does not provide a 'throw' method"
                      ));
                  }
                  return p;
                }
                n = s(n, t.iterator, r.arg);
                if ("throw" === n.type)
                  return (
                    (r.method = "throw"),
                    (r.arg = n.arg),
                    (r.delegate = null),
                    p
                  );
                n = n.arg;
                return n
                  ? n.done
                    ? ((r[t.resultName] = n.value),
                      (r.next = t.nextLoc),
                      "return" !== r.method &&
                        ((r.method = "next"), (r.arg = void 0)),
                      (r.delegate = null),
                      p)
                    : n
                  : ((r.method = "throw"),
                    (r.arg = new TypeError("iterator result is not an object")),
                    (r.delegate = null),
                    p);
              })(r, a);
              if (r) {
                if (r === p) continue;
                return r;
              }
            }
            if ("next" === a.method) a.sent = a._sent = a.arg;
            else if ("throw" === a.method) {
              if ("suspendedStart" === c) throw ((c = "completed"), a.arg);
              a.dispatchException(a.arg);
            } else "return" === a.method && a.abrupt("return", a.arg);
            c = "executing";
            r = s(o, i, a);
            if ("normal" === r.type) {
              if (((c = a.done ? "completed" : "suspendedYield"), r.arg === p))
                continue;
              return { value: r.arg, done: a.done };
            }
            "throw" === r.type &&
              ((c = "completed"), (a.method = "throw"), (a.arg = r.arg));
          }
        })),
      t
    );
  }
  function s(e, t, r) {
    try {
      return { type: "normal", arg: e.call(t, r) };
    } catch (e) {
      return { type: "throw", arg: e };
    }
  }
  a.wrap = c;
  var p = {};
  function f() {}
  function l() {}
  function h() {}
  var t = {},
    d =
      (i(t, n, function () {
        return this;
      }),
      Object.getPrototypeOf),
    d = d && d(d(x([]))),
    y =
      (d && d !== e && u.call(d, n) && (t = d),
      (h.prototype = f.prototype = Object.create(t)));
  function v(e) {
    ["next", "throw", "return"].forEach(function (t) {
      i(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function g(a, c) {
    var t;
    this._invoke = function (r, n) {
      function e() {
        return new c(function (e, t) {
          !(function t(e, r, n, o) {
            var i,
              e = s(a[e], a, r);
            if ("throw" !== e.type)
              return (r = (i = e.arg).value) &&
                "object" == _typeof(r) &&
                u.call(r, "__await")
                ? c.resolve(r.__await).then(
                    function (e) {
                      t("next", e, n, o);
                    },
                    function (e) {
                      t("throw", e, n, o);
                    }
                  )
                : c.resolve(r).then(
                    function (e) {
                      (i.value = e), n(i);
                    },
                    function (e) {
                      return t("throw", e, n, o);
                    }
                  );
            o(e.arg);
          })(r, n, e, t);
        });
      }
      return (t = t ? t.then(e, e) : e());
    };
  }
  function m(e) {
    var t = { tryLoc: e[0] };
    1 in e && (t.catchLoc = e[1]),
      2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
      this.tryEntries.push(t);
  }
  function b(e) {
    var t = e.completion || {};
    (t.type = "normal"), delete t.arg, (e.completion = t);
  }
  function w(e) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      e.forEach(m, this),
      this.reset(!0);
  }
  function x(t) {
    if (t) {
      var r,
        e = t[n];
      if (e) return e.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length))
        return (
          (r = -1),
          ((e = function e() {
            for (; ++r < t.length; )
              if (u.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          }).next = e)
        );
    }
    return { next: j };
  }
  function j() {
    return { value: void 0, done: !0 };
  }
  return (
    i(y, "constructor", (l.prototype = h)),
    i(h, "constructor", l),
    (l.displayName = i(h, o, "GeneratorFunction")),
    (a.isGeneratorFunction = function (e) {
      e = "function" == typeof e && e.constructor;
      return (
        !!e && (e === l || "GeneratorFunction" === (e.displayName || e.name))
      );
    }),
    (a.mark = function (e) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(e, h)
          : ((e.__proto__ = h), i(e, o, "GeneratorFunction")),
        (e.prototype = Object.create(y)),
        e
      );
    }),
    (a.awrap = function (e) {
      return { __await: e };
    }),
    v(g.prototype),
    i(g.prototype, r, function () {
      return this;
    }),
    (a.AsyncIterator = g),
    (a.async = function (e, t, r, n, o) {
      void 0 === o && (o = Promise);
      var i = new g(c(e, t, r, n), o);
      return a.isGeneratorFunction(t)
        ? i
        : i.next().then(function (e) {
            return e.done ? e.value : i.next();
          });
    }),
    v(y),
    i(y, o, "Generator"),
    i(y, n, function () {
      return this;
    }),
    i(y, "toString", function () {
      return "[object Generator]";
    }),
    (a.keys = function (r) {
      var e,
        n = [];
      for (e in r) n.push(e);
      return (
        n.reverse(),
        function e() {
          for (; n.length; ) {
            var t = n.pop();
            if (t in r) return (e.value = t), (e.done = !1), e;
          }
          return (e.done = !0), e;
        }
      );
    }),
    (a.values = x),
    (w.prototype = {
      constructor: w,
      reset: function (e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(b),
          !e)
        )
          for (var t in this)
            "t" === t.charAt(0) &&
              u.call(this, t) &&
              !isNaN(+t.slice(1)) &&
              (this[t] = void 0);
      },
      stop: function () {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ("throw" === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function (r) {
        if (this.done) throw r;
        var n = this;
        function e(e, t) {
          return (
            (i.type = "throw"),
            (i.arg = r),
            (n.next = e),
            t && ((n.method = "next"), (n.arg = void 0)),
            !!t
          );
        }
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var o = this.tryEntries[t],
            i = o.completion;
          if ("root" === o.tryLoc) return e("end");
          if (o.tryLoc <= this.prev) {
            var a = u.call(o, "catchLoc"),
              c = u.call(o, "finallyLoc");
            if (a && c) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
              if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            } else if (a) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
            } else {
              if (!c) throw new Error("try statement without catch or finally");
              if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            }
          }
        }
      },
      abrupt: function (e, t) {
        for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
          var n = this.tryEntries[r];
          if (
            n.tryLoc <= this.prev &&
            u.call(n, "finallyLoc") &&
            this.prev < n.finallyLoc
          ) {
            var o = n;
            break;
          }
        }
        var i = (o =
          o &&
          ("break" === e || "continue" === e) &&
          o.tryLoc <= t &&
          t <= o.finallyLoc
            ? null
            : o)
          ? o.completion
          : {};
        return (
          (i.type = e),
          (i.arg = t),
          o
            ? ((this.method = "next"), (this.next = o.finallyLoc), p)
            : this.complete(i)
        );
      },
      complete: function (e, t) {
        if ("throw" === e.type) throw e.arg;
        return (
          "break" === e.type || "continue" === e.type
            ? (this.next = e.arg)
            : "return" === e.type
            ? ((this.rval = this.arg = e.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === e.type && t && (this.next = t),
          p
        );
      },
      finish: function (e) {
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var r = this.tryEntries[t];
          if (r.finallyLoc === e)
            return this.complete(r.completion, r.afterLoc), b(r), p;
        }
      },
      catch: function (e) {
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var r,
            n,
            o = this.tryEntries[t];
          if (o.tryLoc === e)
            return (
              "throw" === (r = o.completion).type && ((n = r.arg), b(o)), n
            );
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, t, r) {
        return (
          (this.delegate = { iterator: x(e), resultName: t, nextLoc: r }),
          "next" === this.method && (this.arg = void 0),
          p
        );
      },
    }),
    a
  );
}
function asyncGeneratorStep(e, t, r, n, o, i, a) {
  try {
    var c = e[i](a),
      u = c.value;
  } catch (e) {
    return void r(e);
  }
  c.done ? t(u) : Promise.resolve(u).then(n, o);
}
function _asyncToGenerator(c) {
  return function () {
    var e = this,
      a = arguments;
    return new Promise(function (t, r) {
      var n = c.apply(e, a);
      function o(e) {
        asyncGeneratorStep(n, t, r, o, i, "next", e);
      }
      function i(e) {
        asyncGeneratorStep(n, t, r, o, i, "throw", e);
      }
      o(void 0);
    });
  };
}
var Recipe = require("../models/recipe.model"),
  User = require("../models/user.model"),
  jwtSecret = require("../config/auth.config").jwtSecret,
  jwt = require("jsonwebtoken"),
  langValidation = function (e) {
    return "en" === e || "ru" === e || "ro" === e;
  },
  getAllRecipes = (function () {
    var r = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, r) {
        var n;
        return _regeneratorRuntime().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.prev = 0), (e.next = 3), Recipe.find({}).populate("user")
                  );
                case 3:
                  (n = e.sent), r.status(200).json(n), (e.next = 10);
                  break;
                case 7:
                  (e.prev = 7), (e.t0 = e.catch(0)), r.status(500).json(e.t0);
                case 10:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[0, 7]]
        );
      })
    );
    return function (e, t) {
      return r.apply(this, arguments);
    };
  })(),
  getRecipeById = (function () {
    var r = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, r) {
        var n, o, i, a, c;
        return _regeneratorRuntime().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.prev = 0),
                    (o = t.params.id),
                    (e.next = 4),
                    Recipe.findById(o)
                  );
                case 4:
                  if ((n = e.sent)) {
                    e.next = 7;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(404).json({ msg: "Recipe not found" })
                  );
                case 7:
                  return (
                    (o = n._doc),
                    (a = o.user),
                    (i = _objectWithoutProperties(o, _excluded)),
                    (e.next = 10),
                    User.findById(a)
                  );
                case 10:
                  (a = e.sent),
                    (c = a._doc),
                    c.password,
                    (c = _objectWithoutProperties(c, _excluded2)),
                    (c = _objectSpread(_objectSpread({}, i), {}, { user: c })),
                    r.status(200).json(c),
                    (e.next = 19);
                  break;
                case 16:
                  (e.prev = 16), (e.t0 = e.catch(0)), r.status(500).json(e.t0);
                case 19:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[0, 16]]
        );
      })
    );
    return function (e, t) {
      return r.apply(this, arguments);
    };
  })(),
  createRecipe = (function () {
    var r = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, r) {
        var n, o, i, a, c, u, s, p, f, l, h;
        return _regeneratorRuntime().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (
                    ((e.prev = 0),
                    (p = t.body),
                    (n = p.title),
                    (o = p.description),
                    (i = p.steps),
                    (a = p.ingredients),
                    (c = p.image),
                    (u = p.lang),
                    (s = p.time),
                    (p = p.hot),
                    langValidation(u))
                  ) {
                    e.next = 4;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(400).json({ msg: "Invalid language" })
                  );
                case 4:
                  if (
                    (f = jwt.verify(t.headers["x-access-token"], jwtSecret))
                  ) {
                    e.next = 7;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(401).json({ msg: "Token validation error" })
                  );
                case 7:
                  return (e.next = 9), User.findById(f.user._id);
                case 9:
                  if ((l = e.sent)) {
                    e.next = 12;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(404).json({ msg: "User not found" })
                  );
                case 12:
                  (h = new Recipe({
                    user: l._id,
                    image: c,
                    approved: "pending",
                    langs: _defineProperty({}, u, {
                      title: n,
                      description: o,
                      steps: i,
                      ingredients: a,
                    }),
                    time: s,
                    hot: p,
                  })).save(function (e, t) {
                    if (e) return r.status(500).json(e);
                    r.status(201).json(t);
                  }),
                    l.recipes.push(h._id),
                    (e.next = 20);
                  break;
                case 17:
                  (e.prev = 17),
                    (e.t0 = e.catch(0)),
                    r.status(500).json({ msg: e.t0 });
                case 20:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[0, 17]]
        );
      })
    );
    return function (e, t) {
      return r.apply(this, arguments);
    };
  })(),
  updateRecipe = (function () {
    var r = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, r) {
        var n;
        return _regeneratorRuntime().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (((n = t.body.recipe), oldRecipe)) {
                    e.next = 3;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(400).json({ msg: "Recipe Not found" })
                  );
                case 3:
                  return (
                    (e.prev = 3),
                    (e.next = 6),
                    Recipe.findByIdAndUpdate(n._id, n)
                  );
                case 6:
                  e.next = 11;
                  break;
                case 8:
                  (e.prev = 8), (e.t0 = e.catch(3)), r.status(500).json(e.t0);
                case 11:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[3, 8]]
        );
      })
    );
    return function (e, t) {
      return r.apply(this, arguments);
    };
  })(),
  deleteRecipe = (function () {
    var r = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, r) {
        var n, o;
        return _regeneratorRuntime().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.prev = 0),
                    (n = t.params.id),
                    (e.next = 4),
                    Recipe.findById(n)
                  );
                case 4:
                  if ((o = e.sent)) {
                    e.next = 7;
                    break;
                  }
                  return e.abrupt(
                    "return",
                    r.status(404).json({ msg: "Recipe not found" })
                  );
                case 7:
                  return (e.next = 9), o.remove();
                case 9:
                  r.status(200).json({ msg: "Recipe deleted" }), (e.next = 15);
                  break;
                case 12:
                  (e.prev = 12), (e.t0 = e.catch(0)), r.status(500).json(e.t0);
                case 15:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[0, 12]]
        );
      })
    );
    return function (e, t) {
      return r.apply(this, arguments);
    };
  })();
module.exports = {
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe,
};
