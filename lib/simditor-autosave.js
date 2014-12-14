(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('Simditor', ["jquery",
      "simple-module",
      "simditor"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"),
      require("simditor"));
  } else {
    root['Simditor'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var SimditorAutosave,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SimditorAutosave = (function(_super) {
  __extends(SimditorAutosave, _super);

  function SimditorAutosave() {
    return SimditorAutosave.__super__.constructor.apply(this, arguments);
  }

  SimditorAutosave.pluginName = 'Autosave';

  SimditorAutosave.prototype.opts = {
    autosave: false
  };

  SimditorAutosave.prototype._init = function() {
    var currentVal, link, path, val;
    this.editor = this._module;
    this.opts.autosave = this.opts.autosave || this.editor.textarea.data('autosave');
    if (!this.opts.autosave) {
      return;
    }
    link = $("<a/>", {
      href: location.href
    });
    path = "/" + link[0].pathname.replace(/\/$/g, "").replace(/^\//g, "") + "/";
    path = path + this.opts.autosave + "/autosave/";
    this.editor.on("valuechanged", (function(_this) {
      return function() {
        return simple.util.storage.set(path, _this.editor.getValue());
      };
    })(this));
    this.editor.el.closest('form').on('ajax:success.simditor-' + this.editor.id, (function(_this) {
      return function(e) {
        return simple.util.storage.remove(path);
      };
    })(this));
    val = simple.util.storage.get(path);
    if (!val) {
      return;
    }
    currentVal = this.editor.textarea.val();
    if (val === currentVal) {
      return;
    }
    if (this.editor.textarea.is('[data-autosave-confirm]')) {
      return simple.dialog.confirm({
        content: '有未保存的内容，确定要恢复吗？',
        confirmCallback: (function(_this) {
          return function(e, ok) {
            if (ok) {
              return _this.editor.setValue(val);
            } else {
              return simple.util.storage.remove(path);
            }
          };
        })(this)
      });
    } else {
      return this.editor.setValue(val);
    }
  };

  return SimditorAutosave;

})(SimpleModule);

Simditor.connect(SimditorAutosave);

return Simditor;

}));
