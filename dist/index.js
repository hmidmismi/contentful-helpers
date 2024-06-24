"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  parseContentfulContentImage: () => parseContentfulContentImage,
  parseContentfulPage: () => parseContentfulPage
});
module.exports = __toCommonJS(src_exports);

// src/utils/parsers.ts
function parseContentfulContentImage(asset) {
  var _a, _b, _c, _d, _e;
  if (!asset) {
    return null;
  }
  if (!("fields" in asset)) {
    return null;
  }
  return {
    id: asset.sys.id,
    src: ((_a = asset.fields.file) == null ? void 0 : _a.url) || "",
    alt: asset.fields.description || "",
    width: ((_c = (_b = asset.fields.file) == null ? void 0 : _b.details.image) == null ? void 0 : _c.width) || 0,
    height: ((_e = (_d = asset.fields.file) == null ? void 0 : _d.details.image) == null ? void 0 : _e.height) || 0
  };
}
function parseContentfulPage(pageEntry) {
  var _a;
  if (!pageEntry) {
    return null;
  }
  const images = ((_a = pageEntry.fields.images) == null ? void 0 : _a.map(parseContentfulContentImage).filter((img) => img !== null)) || [];
  return {
    id: pageEntry.sys.id,
    title: pageEntry.fields.title || "",
    slug: pageEntry.fields.slug || "",
    body: pageEntry.fields.body || null,
    images
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseContentfulContentImage,
  parseContentfulPage
});
//# sourceMappingURL=index.js.map