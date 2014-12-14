
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
      simple.util.storage.set path, @editor.getValue()

    @editor.el.closest('form').on 'ajax:success.simditor-' + @editor.id, (e) =>
      simple.util.storage.remove path

    val = simple.util.storage.get path
    return unless val

    currentVal = @editor.textarea.val()
    return if val is currentVal

    if @editor.textarea.is('[data-autosave-confirm]')
      if confirm '有未保存的内容，确定要回复么？'
        @editor.setValue val
      else
        simple.util.storage.remove path
    else
      @editor.setValue val

Simditor.connect SimditorAutosave

