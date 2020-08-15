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
})({"js/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(id, hp) {
  _classCallCheck(this, Player);

  this.id = id;
  this.hp = hp;
};

exports.default = Player;
},{}],"js/weapon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function Weapon(id, name, damages) {
  _classCallCheck(this, Weapon);

  this.id = id;
  this.name = name;
  this.damages = damages;
};

exports.default = Weapon;
},{}],"js/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _player = _interopRequireDefault(require("./player.js"));

var _weapon = _interopRequireDefault(require("./weapon.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// class Map : génération des obstacles, import des joueurs et des armes
var Map = /*#__PURE__*/function () {
  function Map(nbLines, nbCols, nbWeapons, listWeapons, nbPlayers, listPlayers) {
    _classCallCheck(this, Map);

    this.nbLines = nbLines;
    this.nbCols = nbCols;
    this.nbWeapons = nbWeapons;
    this.listWeapons = [new _weapon.default(0, 'Default', 10), new _weapon.default(1, 'Cage Eclair', 20), new _weapon.default(2, 'Double Pied', 30), new _weapon.default(3, 'Noeud herbe', 40), new _weapon.default(4, 'Surf', 50)];
    this.nbPlayers = nbPlayers;
    this.listPlayers = [new _player.default(0, 100), new _player.default(1, 100)];
  }

  _createClass(Map, [{
    key: "createGrid",
    value: function createGrid() {
      var i;
      var j;
      var x = 0;
      var y = 0;

      for (i = 0; i < this.nbLines; i++) {
        var trElt = document.createElement('tr');
        trElt.id = 'line-' + i;
        document.querySelector('#plateau').appendChild(trElt);

        for (j = 0; j < this.nbCols; j++) {
          var tdElt = document.createElement('td');
          tdElt.id = x + '-' + y;
          tdElt.dataset.x = x;
          tdElt.dataset.y = y; //tdElt.innerHTML = `${i} - ${j}`; // data attribute

          document.getElementById("line-".concat(y)).appendChild(tdElt);
          x++; // aller à droite
          // passer à la ligne

          if (document.getElementById("line-".concat(y)).children.length == this.nbCols) {
            y++;
            x = 0;
          }
        }
      }
    }
  }, {
    key: "createWalls",
    value: function createWalls() {
      var $tdElts = $('td'); // le nb de mur va être dans cet interval

      var min = 10;
      var max = 15; // generation d'un nb aléatoire (voir la fonction dans initGame.js)

      var randomNumber = random(min, max);

      for (var i = 0; i < randomNumber; i++) {
        // sélectionne un td au hasard
        var index = random(0, $tdElts.length); //index = 0 à 99 taille de la grille

        var randomTdElt = $tdElts[index]; // fais les vérifications pour qu'un mur n'apparaisse pas sur un autre

        while (this.getCellInfos(randomTdElt.id) !== 0) {
          //3-1
          index = random(0, $tdElts.length);
          randomTdElt = $tdElts[index];
        } // on donne la class walls et les roches


        $(randomTdElt).addClass('walls');
      }
    }
  }, {
    key: "createWeapons",
    value: function createWeapons() {
      var $tdElts = $('td');
      var min = 4;
      var max = 4;
      var nb = 1;
      var randomNumber = random(min, max);

      for (var i = 0; i < randomNumber; i++) {
        var index = random(0, $tdElts.length);
        var randomTdElt = $tdElts[index];

        while (this.getCellInfos(randomTdElt.id) !== 0) {
          index = random(0, $tdElts.length);
          randomTdElt = $tdElts[index];
        }

        $(randomTdElt).addClass('weapon' + nb);
        nb++;
      }
    }
  }, {
    key: "createPlayers",
    value: function createPlayers() {
      var $tdElts = $('td');
      var min = 2;
      var max = 2;
      var nb = 1;
      var randomNumber = random(min, max);

      for (var i = 0; i < randomNumber; i++) {
        var index = random(0, $tdElts.length);
        var randomTdElt = $tdElts[index];

        while (this.getCellInfos(randomTdElt.id) !== 0) {
          index = random(0, $tdElts.length);
          randomTdElt = $tdElts[index];
        }

        $(randomTdElt).addClass('player' + nb);
        nb++;
      }
    } // renvoi ce qu'il y a sur la cellule visée
    // returne un nombre correspondant à la classe associée ou 0 si rien ne correspond

  }, {
    key: "getCellInfos",
    value: function getCellInfos(pos) {
      // la pos ressemble à 3-1 par exemple
      // on la sélectionne avec jquery
      var posTd = $("#".concat(pos));
      if ($(posTd).hasClass('walls')) return 1;
      if ($(posTd).hasClass('weapon1')) return 1;
      if ($(posTd).hasClass('weapon2')) return 1;
      if ($(posTd).hasClass('weapon3')) return 1;
      if ($(posTd).hasClass('weapon4')) return 1;
      if ($(posTd).hasClass('player1')) return 1;else return 0;
    }
  }, {
    key: "regarderAutour",
    value: function regarderAutour(pos) {
      var celluleARegarder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      // pos est sous la forme 3-1
      var x = pos.chartAt(0);
      var y = pos.charAt(pos.charAt.length - 1);
    }
  }]);

  return Map;
}(); // a faire :
// pikachu et evoli ne doivent pas tomber cote a cote
// il faut une case de libre minimum en bas, haut, gauche, droite
// les cases libres doivent etre a 0


exports.default = Map;
},{"./player.js":"js/player.js","./weapon.js":"js/weapon.js"}],"js/initGame.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = _interopRequireDefault(require("./map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// window : appel global
window.random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var Init = /*#__PURE__*/function () {
  function Init() {
    _classCallCheck(this, Init);
  }

  _createClass(Init, [{
    key: "createGrid",
    value: function createGrid() {
      // tous les objets
      var Grille = new _map.default(10, 10);
      Grille.createGrid();
      Grille.createWalls();
      Grille.createWeapons();
      Grille.createPlayers();
    }
  }]);

  return Init;
}();

exports.default = Init;
},{"./map.js":"js/map.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _initGame = _interopRequireDefault(require("./initGame.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  var InitGame = new _initGame.default(10, 10);
  InitGame.createGrid(); // initgame.createplayer
});
},{"./initGame.js":"js/initGame.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55551" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map