simditor-autosave
=================

[Simditor](http://simditor.tower.im/) 的官方扩展，运用HTML5的localStorage技术来自动保存用户输入内容。

### 如何使用

在 Simditor 的基础上额外引用 simditor-autosave 的脚本。

```html
<script src="/assets/javascripts/simditor-autosave.js"></script>
```

配置

方法一：
直接在使用了Simditor对应的textarea中设置data-autosave属性，其值将作为内容保存时的路径。
例如下面的设置数据将保存在  url_path/editor-content/autosave/   中
```html
<textarea id="txt-content" data-autosave="editor-content" autofocus></textarea>
```

方法二：
在Simditor初始化时，直接写入配置信息中,例如下面的设置，效果个上面一样，
数据也将保存在  url_path/editor-content/autosave/   中
```javascript
new Simditor({
  textarea: textareaElement,
  ...,
  autosave: editor-content
})
```
__注意__ 当方法一和方法二同时定义时，则有限选择方法而中参数作为保存时的路径
