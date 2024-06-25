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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  fetchPage: () => fetchPage,
  fetchPageById: () => fetchPageById,
  fetchPages: () => fetchPages,
  parseContentfulContentImage: () => parseContentfulContentImage,
  parseContentfulPage: () => parseContentfulPage
});
module.exports = __toCommonJS(src_exports);

// src/lib/contentfulClient.ts
var import_contentful = require("contentful");
var { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_ACCESS_TOKEN } = process.env;
if (!CONTENTFUL_SPACE_ID) {
  throw new Error("CONTENTFUL_SPACE_ID is not defined");
}
if (!CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("CONTENTFUL_ACCESS_TOKEN is not defined");
}
if (!CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
  throw new Error("CONTENTFUL_PREVIEW_ACCESS_TOKEN is not defined");
}
var client = (0, import_contentful.createClient)({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});
var previewClient = (0, import_contentful.createClient)({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "https://preview-brooklynaikikai.netlify.app"
});
var contentfulClient = (options) => {
  const { preview = false } = options || {};
  if (preview) {
    return previewClient;
  }
  return client;
};

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

// src/services/page.ts
function fetchPages() {
  return __async(this, null, function* () {
    const contentful = contentfulClient();
    const pagesResult = yield contentful.getEntries({
      content_type: "page",
      include: 2,
      order: ["fields.title"]
    });
    return pagesResult.items.map((pageEntry) => parseContentfulPage(pageEntry));
  });
}
function fetchPage(_0) {
  return __async(this, arguments, function* ({ slug }) {
    const contentful = contentfulClient();
    const pagesResult = yield contentful.getEntries({
      content_type: "page",
      "fields.slug": slug,
      include: 2
    });
    return parseContentfulPage(pagesResult.items[0]);
  });
}
function fetchPageById(_0) {
  return __async(this, arguments, function* ({ id }) {
    const contentful = contentfulClient();
    const pageResult = yield contentful.getEntry(id, {
      include: 2
    });
    return parseContentfulPage(pageResult);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchPage,
  fetchPageById,
  fetchPages,
  parseContentfulContentImage,
  parseContentfulPage
});
//# sourceMappingURL=index.js.map