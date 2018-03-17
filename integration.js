(function (global, scalaFiddleUrl, iconUrl, validVersions, defaultScalaVersion) {
  "use strict";
  var dom = global.document;

  // set up templates
  var defaultTemplate = {
    pre: "import fiddle.Fiddle, Fiddle.println\n" +
    "\n" +
    "@scalajs.js.annotation.JSExportTopLevel(\"ScalaFiddle\")\n" +
    "object ScalaFiddle {\n",
    post: "\n}\n"
  };
  var templates = global.scalaFiddleTemplates || {};

  // use a random prefix in CSS to ensure it's unique
  var cssPrefix = "p" + Math.random().toString(36).substring(2, 15);

  function findFiddles() {
    return Array.from(dom.querySelectorAll("div[data-scalafiddle]"))
  }

  function injectCSS() {
    var sfColor = "244, 0, 161";
    // create CSS styles
    var css = (
      ".scalafiddle-button {\n" +
      "    all: initial;\n" +
      "    position: absolute; right: 10px; top: 10px;\n" +
      "    background: rgba(255,255,255,0.6)!important;\n" +
      "    color: rgba(0, 0, 0, 0.6)!important;\n" +
      "    border-radius: 5px;\n" +
      "    border: 1px solid #ddd;\n" +
      "    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;\n" +
      "    font-size: 14px;\n" +
      "    padding: 3px 8px;\n" +
      "    transition: all 350ms ease;\n" +
      "}\n" +
      ".scalafiddle-button:hover {\n" +
      "    background: rgba(255,255,255,0.8)!important;\n" +
      "    color: rgba(0, 0, 0, 0.8)!important;\n" +
      "    box-shadow: 0 0 0 1px rgba(" + sfColor + ",.25), 0 0 2px 2px rgba(" + sfColor + ",.10);\n" +
      "}\n" +
      "div[data-theme='dark'] > button.scalafiddle-button {\n" +
      "    background: rgba(60,60,60,0.6)!important;\n" +
      "    color: rgba(220, 220, 220, 0.6)!important;\n" +
      "    border-radius: 3px;\n" +
      "    border: 1px solid #333;\n" +
      "}\n" +
      "div[data-theme='dark'] > button.scalafiddle-button:hover {\n" +
      "    background: rgba(60,60,60,0.8)!important;\n" +
      "    color: rgba(220, 220, 220, 0.8)!important;\n" +
      "    box-shadow: 0 0 0 1px rgba(" + sfColor + ",.50), 0 0 2px 2px rgba(" + sfColor + ",.20);\n" +
      "}\n" +
      ".scalafiddle-button img { all: initial; padding: 0; margin: 0 0 4px 0; vertical-align: middle; width: 16px; height: 16px; display: inline; }\n" +
      "div[data-scalafiddle] {\n" +
      "    position: relative;\n " +
      "    transition: box-shadow 350ms ease;\n" +
      "}\n" +
      "div[data-scalafiddle].scalafiddle-button-hovering {\n" +
      "    box-shadow: 0 0 1px 1px rgba(" + sfColor + ",.25), 0 0 4px 2px rgba(" + sfColor + ",.10);\n" +
      "}\n").replace(/\.scalafiddle/g, "." + cssPrefix)
    ;

    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.appendChild(dom.createTextNode(css));
    dom.querySelector("head").appendChild(s);
  }

  function buildSource(fiddleData) {
    return fiddleData.template.pre +
      fiddleData.prefix +
      "\n// $FiddleStart\n" +
      fiddleData.content +
      "\n// $FiddleEnd\n" +
      fiddleData.template.post + "\n" +
      fiddleData.dependencies.map(function (dep) { return "// $FiddleDependency " + dep + "\n"}).join("") +
      "// $ScalaVersion " + fiddleData.scalaVersion + "\n"
  }

  var dependencyRE = / *([^ %]+) +%%%? +([^ %]+) +% +([^ %]+) */;
  var rawTemplateRE = /.+_raw/;

  function constructFiddle(el) {
    var templateId = el.getAttribute("data-template");

    var template;
    if (templateId === null) {
      template = defaultTemplate
    } else {
      template = templates[templateId];
      if (template === undefined) {
        throw "ScalaFiddle template '" + templateId + "' is not defined";
      }
      if (!rawTemplateRE.test(templateId)) {
        // add default template
        template = {
          pre: defaultTemplate.pre + template.pre,
          post: template.post + defaultTemplate.post
        }
      }
    }
    var dependencies = el.hasAttribute("data-dependency") ? el.getAttribute("data-dependency").split(",") : [];
    var prefix = el.hasAttribute("data-prefix") ? "\n" + el.getAttribute("data-prefix") + "\n" : "";
    var scalaVersion = el.hasAttribute("data-scalaversion") ? el.getAttribute("data-scalaversion") : defaultScalaVersion;
    var selector = el.getAttribute("data-selector") || "pre";
    var minHeight = parseInt(el.getAttribute("data-minheight") || "350", 10);
    var contentElements = Array.prototype.slice.call(el.querySelectorAll(selector));
    // validate parameters
    dependencies.forEach(function (dep) {
      if (!dependencyRE.test(dep)) throw "ScalaFiddle dependency '" + dep + "' is not correctly formed";
    });
    if (validVersions[scalaVersion] === undefined)
      throw "Invalid Scala version '" + scalaVersion + "'";
    if (isNaN(minHeight))
      throw "Invalid minheight value '" + el.getAttribute("data-minheight") + "'";
    if (contentElements.length === 0)
      throw "No content elements for '" + selector + "' found";

    el["scalaFiddleData"] = {
      element: el,
      content: contentElements.reduce(function(c, e, idx, ar) { if(idx < ar.length - 1) return c + e.textContent + "\n"; else return c + e.textContent;}, ""),
      template: template,
      scalaVersion: scalaVersion,
      dependencies: dependencies,
      prefix: prefix,
      injected: false,
      minHeight: minHeight
    };
    var button = dom.createElement("button");
    button.setAttribute("class", cssPrefix + "-button");
    var icon = dom.createElement("img");
    icon.src = iconUrl;
    button.appendChild(icon);
    button.appendChild(dom.createTextNode("Run"));
    button.onclick = function () {
      el.classList.remove(cssPrefix + "-button-hovering");
      injectFiddle(el);
    };
    if(contentElements.length > 1) {
      // add special hover effect if multiple code blocks per fiddle
      button.onmouseover = function() { el.classList.add(cssPrefix + "-button-hovering") };
      button.onmouseout = function() { el.classList.remove(cssPrefix + "-button-hovering") };
    }
    el.appendChild(button);
  }

  function injectFiddle(el) {
    var fiddleData = el["scalaFiddleData"];
    // compute height for the iframe
    var height = Math.max(el.clientHeight, fiddleData.minHeight);
    var iframe = dom.createElement("iframe");
    iframe.setAttribute("height", height + "px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("style", "width: 100%");
    var layout = el.getAttribute("data-layout") || "v65";
    var theme = el.getAttribute("data-theme") || "light";
    iframe.setAttribute("src", scalaFiddleUrl + "embed?theme=" + theme + "&layout=" + layout);
    iframe.onload = function(e) {
      var msg = {"cmd": "setSource", "data": buildSource(fiddleData)};
      iframe.contentWindow.postMessage(msg, "*");
    };
    fiddleData.injected = true;
    // clear out existing code block and the button
    el.innerHTML = "";
    el.appendChild(iframe);
  }

  // set up styles
  injectCSS();

  // inject fiddles
  findFiddles().forEach(function (el) {
    try {
      constructFiddle(el)
    } catch (e) {
      console.error(e);
    }
  })
})(
window,"https://embed.scalafiddle.io/","https://embed.scalafiddle.io/runicon.png",{"2.11":true,"2.12":true}, "2.12" 
);