"use strict";
(function (CacheItemRemovedReason) {
    CacheItemRemovedReason[CacheItemRemovedReason["expired"] = 0] = "expired";
    CacheItemRemovedReason[CacheItemRemovedReason["removed"] = 1] = "removed";
    CacheItemRemovedReason[CacheItemRemovedReason["underused"] = 2] = "underused";
})(exports.CacheItemRemovedReason || (exports.CacheItemRemovedReason = {}));
var CacheItemRemovedReason = exports.CacheItemRemovedReason;
