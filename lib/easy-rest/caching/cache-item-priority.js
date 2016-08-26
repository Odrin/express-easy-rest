"use strict";
(function (CacheItemPriority) {
    CacheItemPriority[CacheItemPriority["low"] = 0] = "low";
    CacheItemPriority[CacheItemPriority["normal"] = 1] = "normal";
    CacheItemPriority[CacheItemPriority["hight"] = 2] = "hight";
    CacheItemPriority[CacheItemPriority["notRemovable"] = 3] = "notRemovable";
})(exports.CacheItemPriority || (exports.CacheItemPriority = {}));
var CacheItemPriority = exports.CacheItemPriority;
