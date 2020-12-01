// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var canvas = document.querySelector(".myCanvas");
var ctx = canvas.getContext("2d");
var lineWidth = document.querySelector(".lineWidth");
var input_lineWidth = document.querySelector("#width");
var input_lineColor = document.querySelector("#color");
var choose_color_nav = document.querySelector(".colorNav");
var brush_rect = document.querySelector(".brush").querySelector(".rect");
var brush_circle = document.querySelector(".brush").querySelector(".circle");
var display_rect = document.querySelector(".rectangle");
var display_circle = document.querySelector(".main").querySelector(".circle");
var body = document.body; //正确获取鼠标在画板canvas的位置

function getCanvas_x_y(e) {
  var arr = new Array(2);
  arr[0] = e.clientX - canvas.offsetLeft;
  arr[1] = e.clientY - canvas.offsetTop;
  return arr;
} //设置canvas画板的宽高，没有单位；


canvas.width = 1152;
canvas.height = 518; //设置线条样式

ctx.lineCap = "round";
ctx.lineWidth = 1;
ctx.lineJoin = "round";
ctx.strokeStyle = "black"; //画画模式

var flag_painting = false; //设置变量表示是否在画画中
//清除线条粗细组类名的函数

function clearSelected() {
  var children = Array.from(lineWidth.children);

  for (var i = 0; i < 4; i++) {
    if (children[i].classList.contains("selected")) {
      children[i].classList.remove("selected");
    }
  }
} //监听线条粗细变化事件


lineWidth.addEventListener("click", function (e) {
  var t = e.target;

  if (t.className.includes("line")) {
    clearSelected();
    t.classList.add("selected");
  } //必须在每次选择线条粗细后重新beginPath,不然线条全部都会变成一个粗细


  ctx.beginPath();
  ctx.lineWidth = parseInt(t.dataset.width);
  ctx.closePath();
}); // 画画模式

canvas.addEventListener("mousedown", function (e1) {
  flag_painting = true;

  var _getCanvas_x_y = getCanvas_x_y(e1),
      _getCanvas_x_y2 = _slicedToArray(_getCanvas_x_y, 2),
      x = _getCanvas_x_y2[0],
      y = _getCanvas_x_y2[1];

  ctx.moveTo(x, y);
  canvas.addEventListener("mousemove", function (e2) {
    if (flag_painting) {
      var _getCanvas_x_y3 = getCanvas_x_y(e2),
          _getCanvas_x_y4 = _slicedToArray(_getCanvas_x_y3, 2),
          _x = _getCanvas_x_y4[0],
          _y = _getCanvas_x_y4[1];

      ctx.strokeStyle = input_lineColor.value;
      ctx.lineTo(_x, _y);
      ctx.stroke();
    }
  });
  canvas.addEventListener("mouseup", function () {
    flag_painting = false;
  });
}); //监听表单线条粗细输入事件

input_lineWidth.addEventListener("blur", function (e) {
  var t = e.target;
  var value = t.value;

  if (value < 0 || value > 50) {
    window.alert("为了绘画体验，线条粗细范围：1-50(px)");
    t.value = 1;
    return;
  }

  clearSelected();
  ctx.beginPath();
  ctx.lineWidth = t.value;
  ctx.closePath();
}); //监听表单的颜色输入事件

input_lineColor.addEventListener("blur", function (e) {
  var t = e.target;
  ctx.beginPath();
  ctx.strokeStyle = t.value;
  ctx.closePath();
}); //监听直接选择颜色的事件

choose_color_nav.addEventListener("click", function (e) {
  var t = e.target;
  input_lineColor.value = t.outerHTML.substring(30, 37);
  ctx.beginPath();
  ctx.strokeStyle = input_lineColor.value;
  ctx.closePath();
}); //橡皮擦功能

function eraser_rect(event) {
  var _getCanvas_x_y5 = getCanvas_x_y(event),
      _getCanvas_x_y6 = _slicedToArray(_getCanvas_x_y5, 2),
      x = _getCanvas_x_y6[0],
      y = _getCanvas_x_y6[1];

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.clearRect(x, y, 20, 20);
  ctx.closePath();
}

function eraser_cir(event) {
  var _getCanvas_x_y7 = getCanvas_x_y(event),
      _getCanvas_x_y8 = _slicedToArray(_getCanvas_x_y7, 2),
      x = _getCanvas_x_y8[0],
      y = _getCanvas_x_y8[1];

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.strokeStyle = "#fff";
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.closePath();
}

var inWipeMode_rect = false,
    inWipeMode_cir = false;

brush_rect.onclick = function () {
  inWipeMode_rect = true;
  inWipeMode_cir = false;
  flag_painting = false;
  display_rect.style.display = "block";
  display_circle.style.display = "none";
};

brush_circle.onclick = function () {
  inWipeMode_cir = true;
  inWipeMode_rect = false;
  display_circle.style.display = "block";
  display_rect.style.display = "none";
};

lineWidth.onclick = function () {
  inWipeMode_cir = false;
  inWipeMode_rect = false;
  display_rect.style.display = "none";
  display_circle.style.display = "none";
};

brush_rect.addEventListener("click", function () {
  canvas.addEventListener("mousemove", function (e) {
    display_rect.style.left = e.clientX + "px";
    display_rect.style.top = e.clientY + "px";

    if (inWipeMode_rect) {
      eraser_rect(e);
    }
  });
});
brush_circle.addEventListener("click", function () {
  canvas.addEventListener("mousemove", function (e) {
    display_circle.style.left = e.clientX + "px";
    display_circle.style.top = e.clientY + "px";

    if (inWipeMode_cir) {
      eraser_cir(e);
    }
  });
});
},{}],"C:/Users/93705/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62862" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/93705/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map