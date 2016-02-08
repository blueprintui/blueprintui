/*! X-rayHTML - v0.1.0 - 2015-07-21
* https://github.com/filamentgroup/X-rayHTML
* Copyright (c) 2015 Mat Marquis; Licensed MIT */

// i.setAttribute("class", "language-markup");

window.jQuery = window.jQuery || window.shoestring;

(function ($) {
    var pluginName = "xrayhtml",
          o = {
              text: {
                  open: "View Source",
                  close: "View Demo"
              },
              classes: {
                  button: "btn btn-small",
                  open: "view-source",
                  sourcepanel: "source-panel"
              },
              initSelector: "[data-" + pluginName + "]",
              defaultReveal: "inline"
          },
      methods = {
          _create: function () {
              return $(this).each(function () {
                  var init = $(this).data("init." + pluginName);

                  if (init) {
                      return false;
                  }

                  $(this)
                      .data("init." + pluginName, true)
                      [pluginName]("_init")
                      .trigger("create." + pluginName);
              });
          },
          _init: function () {
              var method = $(this).data(pluginName) || o.defaultReveal;

              if (method === "flip") {
                  $(this)[pluginName]("_createButton");
              }

              $(this)
                  .addClass(pluginName + " " + "method-" + method)
                  [pluginName]("_createSource");
          },
          _createButton: function () {
              var btn = document.createElement("a"),
                  txt = document.createTextNode(o.text.open),
                  el = $(this);

              btn.setAttribute("class", o.classes.button);
              btn.href = "#";
              btn.appendChild(txt);

              $(btn)
                  .bind("click", function (e) {
                      var isOpen = el.attr("class").indexOf(o.classes.open) > -1;

                      el[isOpen ? "removeClass" : "addClass"](o.classes.open);
                      btn.innerHTML = (isOpen ? o.text.open : o.text.close);

                      e.preventDefault();

                  })
                  .insertBefore(el);
          },
          _createSource: function () {
              var el = this,
                  preel = document.createElement("pre"),
                  codeel = document.createElement("code"),
                  wrap = document.createElement("div"),
                  sourcepanel = document.createElement("div"),
                  code = el.innerHTML.replace(/\=\"\"/g, ''),
                  source = document.createTextNode(code);

              // Custom 
              preel.setAttribute("class", "language-markup");

              wrap.setAttribute("class", "snippet");

              $(el).wrapInner(wrap);

              codeel.appendChild(source);
              preel.appendChild(codeel);

              sourcepanel.setAttribute("class", o.classes.sourcepanel);
              sourcepanel.appendChild(preel);

              this.appendChild(sourcepanel);
          }
      };

    // Collection method.
    $.fn[pluginName] = function (arrg, a, b, c) {
        return this.each(function () {

            // if it's a method
            if (arrg && typeof (arrg) === "string") {
                return $.fn[pluginName].prototype[arrg].call(this, a, b, c);
            }

            // don't re-init
            if ($(this).data(pluginName + "data")) {
                return $(this);
            }

            // otherwise, init
            $(this).data(pluginName + "active", true);
            $.fn[pluginName].prototype._create.call(this);
        });
    };

    // add methods
    $.extend($.fn[pluginName].prototype, methods);

    // DOM-ready auto-init
    $(function () {
        $(o.initSelector)[pluginName]();
    });

}(jQuery));