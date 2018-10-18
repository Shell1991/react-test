var OpenLayers = {
    VERSION_NUMBER: "Release 2.13.1",
    singleFile: !0,
    _getScriptLocation: function() {
        for(var a = /(^|(.*?\/))(OpenLayers[^\/]*?\.js)(\?|$)/, b = document.getElementsByTagName("script"), c, d = "", e = 0, f = b.length; e < f; e++)
            if(c = b[e].getAttribute("src"))
                if(c = c.match(a)) {
                    d = c[1];
                    break
                }
        return function() {
            return d
        }
    }(),
    ImgPath: ""
};
OpenLayers.Class = function() {
    var a = arguments.length,
        b = arguments[0],
        c = arguments[a - 1],
        d = "function" == typeof c.initialize ? c.initialize : function() {
            b.prototype.initialize.apply(this, arguments)
        };
    1 < a ? (a = [d, b].concat(Array.prototype.slice.call(arguments).slice(1, a - 1), c), OpenLayers.inherit.apply(null, a)) : d.prototype = c;
    return d
};
OpenLayers.inherit = function(a, b) {
    var c = function() {};
//	c.prototype = b.prototype;
    a.prototype = new c;
    var d, e, c = 2;
    for(d = arguments.length; c < d; c++) e = arguments[c], "function" === typeof e && (e = e.prototype), OpenLayers.Util.extend(a.prototype, e)
};
OpenLayers.Util = OpenLayers.Util || {};

OpenLayers.LonLat = OpenLayers.Class({
    lon: 0,
    lat: 0,
    initialize: function(a, b) {
        OpenLayers.Util.isArray(a) && (b = a[1], a = a[0]);
        this.lon = OpenLayers.Util.toFloat(a);
        this.lat = OpenLayers.Util.toFloat(b)
    },
    toString: function() {
        return "lon=" + this.lon + ",lat=" + this.lat
    },
    toShortString: function() {
        return this.lon + ", " + this.lat
    },
    clone: function() {
        return new OpenLayers.LonLat(this.lon, this.lat)
    },
    add: function(a, b) {
        if(null == a || null == b) throw new TypeError("LonLat.add cannot receive null values");
        return new OpenLayers.LonLat(this.lon +
            OpenLayers.Util.toFloat(a), this.lat + OpenLayers.Util.toFloat(b))
    },
    equals: function(a) {
        var b = !1;
        null != a && (b = this.lon == a.lon && this.lat == a.lat || isNaN(this.lon) && isNaN(this.lat) && isNaN(a.lon) && isNaN(a.lat));
        return b
    },
    transform: function(a, b) {
        var c = OpenLayers.Projection.transform({
            x: this.lon,
            y: this.lat
        }, a, b);
        this.lon = c.x;
        this.lat = c.y;
        return this
    },
    wrapDateLine: function(a) {
        var b = this.clone();
        if(a) {
            for(; b.lon < a.left;) b.lon += a.getWidth();
            for(; b.lon > a.right;) b.lon -= a.getWidth()
        }
        return b
    },
    CLASS_NAME: "OpenLayers.LonLat"
});

OpenLayers.Util.isArray = function(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
};

OpenLayers.Util.DEFAULT_PRECISION = 14;
OpenLayers.Util.toFloat = function(a, b) {
    null == b && (b = OpenLayers.Util.DEFAULT_PRECISION);
    "number" !== typeof a && (a = parseFloat(a));
    return 0 === b ? a : parseFloat(a.toPrecision(b))
};

export default OpenLayers;
