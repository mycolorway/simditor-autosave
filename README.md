simditor-autosave
=================

[Simditor](http://simditor.tower.im/) 的官方扩展，运用 HTML5 的 localStorage 技术来自动保存用户输入内容。

### 如何使用

在 Simditor 的基础上额外引用 simditor-autosave 的脚本。

```html
<script src="/assets/javascripts/simditor-autosave.js"></script>
```

**配置**

方法一：

直接在使用了 Simditor 对应的 textarea 中设置 `data-autosave` 属性，其值将作为内容保存时的路径。
例如下面的设置数据将保存在 `url_path/editor-content/autosave/` 中
```html
<textarea id="txt-content" data-autosave="editor-content" autofocus></textarea>
```

方法二：

在 Simditor 初始化时，直接写入配置信息中,例如下面的设置，效果跟上面一样，
数据也将保存在 `url_path/editor-content/autosave/` 中
```javascript
new Simditor({
  textarea: textareaElement,
  ...,
  autosave: 'editor-content'
})
```

方法三：

在 Simditor 初始化时，可直接指定数据保存路径，如：
```javascript
new Simditor({
  textarea: textareaElement,
  ...,
  autosavePath: '/url_path/editor-content/autosave'
})
```

_注意_ 当方法一和方法二同时定义时，则优先选择方法一中的参数作为保存时的路径

另外，可通过 `autosave: false` 关闭自动保存。
