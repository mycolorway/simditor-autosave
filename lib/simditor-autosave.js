(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-autosave', ["jquery","simple-module","simditor"], function (a0,b1,c2) {
      return (root['SimditorAutosave'] = factory(a0,b1,c2));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"),require("simditor"));
  } else {
    root['SimditorAutosave'] = factory(jQuery,SimpleModule,Simditor);
  }
}(this, function ($, SimpleModule, Simditor) {

var SimditorAutosave,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimditorAutosave = (function(superClass) {
  extend(SimditorAutosave, superClass);

  function SimditorAutosave() {
    return SimditorAutosave.__super__.constructor.apply(this, arguments);
  }

  SimditorAutosave.pluginName = 'Autosave';

  SimditorAutosave.prototype.opts = {
    autosave: false,
    autosave_global_key: false
  };

  SimditorAutosave.prototype._init = function() {
    var currentVal, link, path, val;
    this.editor = this._module;
    this.opts.autosave = this.opts.autosave || this.editor.textarea.data('autosave');
    if (!this.opts.autosave) {
      return;
    }
    if (!this.opts.autosave_global_key) {
      link = $("<a/>", {
        href: location.href
      });
      path = "/" + link[0].pathname.replace(/\/$/g, "").replace(/^\//g, "") + "/";
      path = path + this.opts.autosave + "/autosave/";
    } else {
      path = "/" + this.opts.autosave + "/autosave/global/" + this.opts.autosave_global_key;
    }
    this.editor.on("valuechanged", (function(_this) {
      return function() {
        return _this.storage.set(path, _this.editor.getValue());
      };
    })(this));
    this.editor.el.closest('form').on('ajax:success.simditor-' + this.editor.id, (function(_this) {
      return function(e) {
        return _this.storage.remove(path);
      };
    })(this));
    val = this.storage.get(path);
    if (!val) {
      return;
    }
    currentVal = this.editor.textarea.val();
    if (val === currentVal) {
      return;
    }
    if (this.editor.textarea.is('[data-autosave-confirm]')) {
      if (confirm('有未保存的内容，确定要回复么？')) {
        return this.editor.setValue(val);
      } else {
        return this.storage.remove(path);
      }
    } else {
      return this.editor.setValue(val);
    }
  };

  SimditorAutosave.prototype.storage = {
    supported: function() {
      var error;
      try {
        localStorage.setItem('_storageSupported', 'yes');
        localStorage.removeItem('_storageSupported');
        return true;
      } catch (_error) {
        error = _error;
        return false;
      }
    },
    set: function(key, val, session) {
      var storage;
      if (session == null) {
        session = false;
      }
      if (!this.supported()) {
        return;
      }
      storage = session ? sessionStorage : localStorage;
      return storage.setItem(key, val);
    },
    get: function(key, session) {
      var storage;
      if (session == null) {
        session = false;
      }
      if (!this.supported()) {
        return;
      }
      storage = session ? sessionStorage : localStorage;
      return storage[key];
    },
    remove: function(key, session) {
      var storage;
      if (session == null) {
        session = false;
      }
      if (!this.supported()) {
        return;
      }
      storage = session ? sessionStorage : localStorage;
      return storage.removeItem(key);
    }
  };

  return SimditorAutosave;

})(SimpleModule);

Simditor.connect(SimditorAutosave);

return SimditorAutosave;

}));
