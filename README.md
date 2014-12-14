simditor-autosave
=================

[Simditor](http://simditor.tower.im/) 的官方扩展，运用HTML5的localStorage技术来自动保存用户输入内容。

### 如何使用

在 Simditor 的基础上额外引用 simditor-autosave 的脚本。

```html
<script src="/assets/javascripts/simditor-autosave.js"></script>
```

配置

```javascript
new Simditor({
  textarea: textareaElement,
  ...,
  autosave: true
})
```
