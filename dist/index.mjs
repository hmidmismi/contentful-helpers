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
export {
  parseContentfulContentImage,
  parseContentfulPage
};
//# sourceMappingURL=index.mjs.map