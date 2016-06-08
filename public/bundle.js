/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(1);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _App2.default(document.getElementById('app'), 'allrait');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Controller = __webpack_require__(2);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Storage = __webpack_require__(10);

	var _Storage2 = _interopRequireDefault(_Storage);

	var _Router = __webpack_require__(11);

	var _Router2 = _interopRequireDefault(_Router);

	var _ModelManager = __webpack_require__(12);

	var _ModelManager2 = _interopRequireDefault(_ModelManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function App(element, name) {
	  _classCallCheck(this, App);

	  this.name = name;
	  this.container = element;
	  this.storage = new _Storage2.default(this.name);
	  this.modelManager = new _ModelManager2.default(this.storage);
	  this.controller = new _Controller2.default(this);
	  this.router = new _Router2.default(this.controller);
	};

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ListListView = __webpack_require__(3);

	var _ListListView2 = _interopRequireDefault(_ListListView);

	var _TaskListView = __webpack_require__(6);

	var _TaskListView2 = _interopRequireDefault(_TaskListView);

	var _List = __webpack_require__(7);

	var _List2 = _interopRequireDefault(_List);

	var _Task = __webpack_require__(9);

	var _Task2 = _interopRequireDefault(_Task);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = function () {
	  function Controller(app) {
	    _classCallCheck(this, Controller);

	    this.modelManager = app.modelManager;
	    this.app = app;
	  }

	  _createClass(Controller, [{
	    key: "showIndex",
	    value: function showIndex() {
	      this.showLists(true);
	    }
	  }, {
	    key: "showLists",
	    value: function showLists() {
	      var focus = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var lists = this.modelManager.findAll(_List2.default);
	      var view = new _ListListView2.default(this);
	      view.render(lists, focus);
	    }
	  }, {
	    key: "showTasks",
	    value: function showTasks(listId) {
	      var focus = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var tasks = this.modelManager.findAllByParent(_Task2.default, listId);
	      var list = this.modelManager.find(_List2.default, listId);
	      var view = new _TaskListView2.default(this);
	      view.render(tasks, list, focus);
	    }
	  }, {
	    key: "saveList",
	    value: function saveList(name) {
	      var list = new _List2.default(name);
	      this.modelManager.persist(list);
	      this.showLists(true);
	    }
	  }, {
	    key: "deleteList",
	    value: function deleteList(id) {
	      var list = this.modelManager.find(_List2.default, id);
	      this.modelManager.remove(_List2.default, list.id);
	      this.modelManager.removeByParentId(_Task2.default, list.id);
	      this.showLists();
	    }
	  }, {
	    key: "saveTask",
	    value: function saveTask(title, parentId) {
	      var task = new _Task2.default(title, parentId);
	      this.modelManager.persist(task);
	      this.showTasks(task.parentId, true);
	    }
	  }, {
	    key: "deleteTask",
	    value: function deleteTask(id) {
	      var task = this.modelManager.find(_Task2.default, id);
	      var parentId = task.parentId;
	      this.modelManager.remove(_Task2.default, task.id);
	      this.showTasks(parentId, false);
	    }
	  }, {
	    key: "toggleTaskComplete",
	    value: function toggleTaskComplete(id, completed) {
	      var task = this.modelManager.find(_Task2.default, id);
	      task.completed = completed;
	      this.modelManager.update(task);
	      this.showTasks(task.parentId, false);
	    }
	  }]);

	  return Controller;
	}();

	exports.default = Controller;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseView2 = __webpack_require__(4);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var _helpers = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListListView = function (_BaseView) {
	  _inherits(ListListView, _BaseView);

	  function ListListView(controller) {
	    _classCallCheck(this, ListListView);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListListView).call(this, controller));
	  }

	  _createClass(ListListView, [{
	    key: 'render',
	    value: function render(lists) {
	      var _this2 = this;

	      var focus = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      this.controller.app.container.innerHTML = '\n      <input id="addList" type="text" placeholder="... list go!"> \n      <ul class="lists" id="lists"></ul>\n    ';

	      var inputAddList = (0, _helpers.$ge)('addList');

	      if (focus) {
	        inputAddList.focus();
	      }

	      /**
	       * Safari triggers 'change' event twice - hence 'keyup'
	       */
	      (0, _helpers.$on)(inputAddList, 'keyup', function (e) {
	        if (e.keyCode === 13 && e.target.value.trim() !== '') {
	          _this2.controller.saveList(e.target.value);
	        }
	      });

	      this.renderLists((0, _helpers.$ge)('lists'), lists);
	    }
	  }, {
	    key: 'renderLists',
	    value: function renderLists(container, lists) {
	      var _this3 = this;

	      var list = [];
	      lists.map(function (l) {
	        list.push('<li>\n            <a href="#/lists/' + l.id + '">' + l.title + '</a>\n            <button class="deleteList" data-id="' + l.id + '">x</button>\n        </li>');
	      });
	      list = list.join('');
	      container.innerHTML = list;

	      Array.from((0, _helpers.$gc)(container, 'deleteList')).map(function (element) {
	        (0, _helpers.$on)(element, 'click', function () {
	          _this3.controller.deleteList(element.dataset.id);
	        });
	      });
	    }
	  }]);

	  return ListListView;
	}(_BaseView3.default);

	exports.default = ListListView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseView = function BaseView(controller) {
	  _classCallCheck(this, BaseView);

	  this.controller = controller;
	};

	exports.default = BaseView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$trigger = $trigger;
	exports.$on = $on;
	exports.$ge = $ge;
	exports.$gc = $gc;
	exports.$gt = $gt;
	exports.uuid = uuid;
	function $trigger(eventType, element) {
	  var event = document.createEvent('HTMLEvents');
	  event.initEvent(eventType, true, false);
	  (element || window).dispatchEvent(event);
	}

	function $on(element, eventType, handler) {
	  return (element || window).addEventListener(eventType, handler);
	}

	function $ge(id) {
	  return document.getElementById(id);
	}

	//todo: reverse order of parameters
	function $gc(element, className) {
	  return (element || document).getElementsByClassName(className);
	}

	//todo: reverse order of parameters
	function $gt(element, tagName) {
	  return (element || document).getElementsByTagName(tagName);
	}

	function uuid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0,
	        v = c == 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseView2 = __webpack_require__(4);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var _helpers = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TaskListView = function (_BaseView) {
	  _inherits(TaskListView, _BaseView);

	  function TaskListView(controller) {
	    _classCallCheck(this, TaskListView);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TaskListView).call(this, controller));
	  }

	  _createClass(TaskListView, [{
	    key: 'render',
	    value: function render(tasks, list) {
	      var _this2 = this;

	      var focus = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      this.controller.app.container.innerHTML = '\n        <input id="addTask" type="text" placeholder="' + list.title + '">\n        <ul class="tasks" id="tasks"></ul>\n    ';

	      var inputAddTask = (0, _helpers.$ge)('addTask');

	      if (focus) {
	        inputAddTask.focus();
	      }

	      /**
	       * Safari triggers 'change' event twice - hence 'keyup'
	       */
	      (0, _helpers.$on)(inputAddTask, 'keyup', function (e) {
	        if (e.keyCode === 13 && e.target.value.trim() !== '') {
	          _this2.controller.saveTask(e.target.value, list.id);
	        }
	      });

	      this.renderTasks((0, _helpers.$ge)('tasks'), tasks);
	    }
	  }, {
	    key: 'renderTasks',
	    value: function renderTasks(container, tasks) {
	      var _this3 = this;

	      var list = [];
	      tasks.map(function (task) {
	        var completed = task.completed ? 'completed' : '';
	        var checked = task.completed ? 'checked' : '';
	        list.push('\n        <li class="task ' + completed + '" data-id="' + task.id + '">\n            <input class="completeTask" type="checkbox" value="complete" ' + checked + '>\n            <span>' + task.title + '</span>\n            <button class="deleteTask">x</button>\n        </li>\n      ');
	      });
	      list = list.join('');
	      container.innerHTML = list;

	      Array.from((0, _helpers.$gc)(container, 'task')).map(function (element) {

	        (0, _helpers.$on)((0, _helpers.$gc)(element, 'completeTask')[0], 'change', function (e) {
	          _this3.controller.toggleTaskComplete(element.dataset.id, e.target.checked);
	        });

	        (0, _helpers.$on)((0, _helpers.$gt)(element, 'button')[0], 'click', function () {
	          _this3.controller.deleteTask(element.dataset.id);
	        });
	      });
	    }
	  }]);

	  return TaskListView;
	}(_BaseView3.default);

	exports.default = TaskListView;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseModel2 = __webpack_require__(8);

	var _BaseModel3 = _interopRequireDefault(_BaseModel2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_BaseModel) {
	  _inherits(List, _BaseModel);

	  function List(title) {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, title));
	  }

	  return List;
	}(_BaseModel3.default);

	exports.default = List;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _helpers = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseModel = function BaseModel(title) {
	  _classCallCheck(this, BaseModel);

	  this.id = (0, _helpers.uuid)();
	  this.title = title;
	  this.completed = false;
	};

	exports.default = BaseModel;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseModel2 = __webpack_require__(8);

	var _BaseModel3 = _interopRequireDefault(_BaseModel2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Task = function (_BaseModel) {
	  _inherits(Task, _BaseModel);

	  function Task(title, parentId) {
	    _classCallCheck(this, Task);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Task).call(this, title));

	    _this.parentId = parentId;
	    return _this;
	  }

	  return Task;
	}(_BaseModel3.default);

	exports.default = Task;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Storage = function () {
	  function Storage(name) {
	    _classCallCheck(this, Storage);

	    this.name = name;
	    Storage.init(name);
	  }

	  _createClass(Storage, [{
	    key: "get",
	    value: function get() {
	      return JSON.parse(localStorage.getItem(this.name));
	    }
	  }, {
	    key: "set",
	    value: function set(data) {
	      localStorage.setItem(this.name, JSON.stringify(data));
	    }
	  }], [{
	    key: "init",
	    value: function init(name, d) {
	      if (!localStorage[name]) {
	        var data = d || { lists: [], tasks: [] };
	        localStorage[name] = JSON.stringify(data);
	      }
	    }
	  }]);

	  return Storage;
	}();

	exports.default = Storage;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Router = function () {
	  function Router(controller) {
	    var _this = this;

	    _classCallCheck(this, Router);

	    this.controller = controller;
	    (0, _helpers.$on)(window, 'hashchange', function () {
	      _this.match(document.location.hash);
	    });
	    (0, _helpers.$on)(window, 'load', (0, _helpers.$trigger)('hashchange'));
	  }

	  _createClass(Router, [{
	    key: 'match',
	    value: function match(hash) {
	      var hashInfo = hash.split('/');
	      var route = hashInfo[1] || 'index';
	      var listId = hashInfo[2] || null;

	      switch (route) {
	        case 'lists':
	          if (listId === null) {
	            this.controller.showLists();
	          } else {
	            this.controller.showTasks(listId);
	          }
	          break;
	        case 'index':
	          this.controller.showIndex();
	          break;
	        default:
	      }
	    }
	  }]);

	  return Router;
	}();

	exports.default = Router;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ModelManager = function () {
	  function ModelManager(storage) {
	    _classCallCheck(this, ModelManager);

	    this.storage = storage;
	  }

	  _createClass(ModelManager, [{
	    key: "persist",
	    value: function persist(o) {
	      var className = o.constructor.name;
	      var nodeName = className.toLowerCase() + "s";
	      var store = this.storage.get();
	      store[nodeName].push(o);
	      this.storage.set(store);
	    }
	  }, {
	    key: "update",
	    value: function update(o) {
	      var className = o.constructor.name;
	      var nodeName = className.toLowerCase() + "s";
	      var store = this.storage.get();
	      store[nodeName].forEach(function (n) {
	        if (n.id === o.id) {
	          for (var key in o) {
	            //noinspection JSUnfilteredForInLoop
	            n[key] = o[key];
	          }
	        }
	      });
	      this.storage.set(store);
	    }
	  }, {
	    key: "find",
	    value: function find(c, id) {
	      var store = this.storage.get();
	      var nodeName = c.name.toLowerCase() + "s";
	      var coll = store[nodeName].filter(function (o) {
	        return o.id === id;
	      });
	      return this.hydrate(coll[0], c) || null;
	    }
	  }, {
	    key: "findAll",
	    value: function findAll(c) {
	      var _this = this;

	      var store = this.storage.get();
	      var nodeName = c.name.toLowerCase() + "s";
	      return store[nodeName].map(function (item) {
	        return _this.hydrate(item, c);
	      });
	    }
	  }, {
	    key: "findAllByParent",
	    value: function findAllByParent(c, parentId) {
	      var _this2 = this;

	      var store = this.storage.get();
	      var nodeName = c.name.toLowerCase() + "s";
	      var items = store[nodeName].filter(function (o) {
	        return o.parentId === parentId;
	      });

	      return items.map(function (item) {
	        return _this2.hydrate(item, c);
	      });
	    }
	  }, {
	    key: "remove",
	    value: function remove(c, id) {
	      var nodeName = c.name.toLowerCase() + "s";
	      var store = this.storage.get();

	      for (var i = 0; i < store[nodeName].length; i++) {
	        if (store[nodeName][i].id === id) {
	          store[nodeName].splice(i, 1);
	          break;
	        }
	      }

	      this.storage.set(store);
	    }
	  }, {
	    key: "removeByParentId",
	    value: function removeByParentId(c, parentId) {
	      var nodeName = c.name.toLowerCase() + "s";
	      var store = this.storage.get();

	      store[nodeName] = store[nodeName].filter(function (o) {
	        return o.parentId !== parentId;
	      });

	      this.storage.set(store);
	    }
	  }, {
	    key: "hydrate",
	    value: function hydrate(o, targetClass) {
	      var c = new targetClass();
	      Object.keys(c).map(function (k) {
	        if (o[k]) {
	          c[k] = o[k];
	        }
	      });
	      return c;
	    }
	  }]);

	  return ModelManager;
	}();

	exports.default = ModelManager;

/***/ }
/******/ ]);