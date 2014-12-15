
class SimditorAutosave extends SimpleModule

  @pluginName: 'Autosave'

  opts:
    autosave: false

  _init: () ->
    @editor = @_module
    @opts.autosave = @opts.autosave || @editor.textarea.data('autosave')
    return unless @opts.autosave

    link = $( "<a/>", {href: location.href})
    path = "/" + link[0].pathname.replace( /\/$/g, "" ).replace( /^\//g, "" ) + "/"
    path = path + @opts.autosave + "/autosave/"

    @editor.on "valuechanged", =>
      @storage.set path, @editor.getValue()

    @editor.el.closest('form').on 'ajax:success.simditor-' + @editor.id, (e) =>
      @storage.remove path

    val = @storage.get path
    return unless val

    currentVal = @editor.textarea.val()
    return if val is currentVal

    if @editor.textarea.is('[data-autosave-confirm]')
      if confirm '有未保存的内容，确定要回复么？'
        @editor.setValue val
      else
        @storage.remove path
    else
      @editor.setValue val

  storage:
    supported: () ->
      try
        localStorage.setItem('_storageSupported', 'yes')
        localStorage.removeItem('_storageSupported')
        true
      catch error
        false
    set: (key, val, session = false) ->
      return unless @.supported()
      storage = if session then sessionStorage else localStorage
      storage.setItem(key, val)
    get: (key, session = false) ->
      return unless @.supported()
      storage = if session then sessionStorage else localStorage
      storage[key]
    remove: (key, session = false) ->
      return unless @.supported()
      storage = if session then sessionStorage else localStorage
      storage.removeItem(key);

Simditor.connect SimditorAutosave

