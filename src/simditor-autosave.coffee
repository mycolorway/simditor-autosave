
class SimditorAutosave extends SimpleModule

  @pluginName: 'Autosave'

  opts:
    autosave: true
    autosavePath: null

  _init: () ->
    @editor = @_module
    return unless @opts.autosave

    @name = if typeof @opts.autosave == 'string' then @opts.autosave else 'simditor'

    if @opts.autosavePath
      @path = @opts.autosavePath
    else
      link = $( "<a/>", {href: location.href})
      name = @editor.textarea.data('autosave') || @name
      @path = "/#{link[0].pathname.replace( /\/$/g, "" ).replace( /^\//g, "" )}/autosave/#{name}/"

    return unless @path

    @editor.on "valuechanged", =>
      @storage.set @path, @editor.getValue()

    @editor.el.closest('form').on 'ajax:success.simditor-' + @editor.id, (e) =>
      @storage.remove @path

    val = @storage.get @path
    return unless val

    currentVal = @editor.textarea.val()
    return if val is currentVal

    if @editor.textarea.is('[data-autosave-confirm]')
      if confirm(@editor.textarea.data('autosave-confirm') || 'Are you sure to restore unsaved changes?')
        @editor.setValue val
      else
        @storage.remove @path
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
