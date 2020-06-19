// Base64 JavaScript decoder
// Copyright (c) 2008-2019 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function (undefined) {
"use strict";

var Base64 = {},
    decoder, // populated on first usage
    haveU8 = ('Uint8Array' in (typeof window == 'object' ? window : global));

Base64.decode = function (a) {
    var i;
    if (decoder === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            ignore = "= \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 64; ++i)
            decoder[b64.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
            decoder[ignore.charAt(i)] = -1;
        // RFC 3548 URL & file safe encoding
        decoder['-'] = decoder['+'];
        decoder['_'] = decoder['/'];
    }
    var out = haveU8 ? new Uint8Array(a.length * 3 >> 2) : [];
    var bits = 0, char_count = 0, len = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
            break;
        c = decoder[c];
        if (c == -1)
            continue;
        if (c === undefined)
            throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 4) {
            out[len++] = (bits >> 16);
            out[len++] = (bits >> 8) & 0xFF;
            out[len++] = bits & 0xFF;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 6;
        }
    }
    switch (char_count) {
    case 1:
        throw "Base64 encoding incomplete: at least 2 bits missing";
    case 2:
        out[len++] = (bits >> 10);
        break;
    case 3:
        out[len++] = (bits >> 16);
        out[len++] = (bits >> 8) & 0xFF;
        break;
    }
    if (haveU8 && out.length > len) // in case it was originally longer because of ignored characters
        out = out.subarray(0, len);
    return out;
};

Base64.pretty = function (str) {
    // fix padding
    if (str.length % 4 > 0)
        str = (str + '===').slice(0, str.length + str.length % 4);
    // convert RFC 3548 to standard Base64
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // 80 column width
    console.log(str.replace(/(.{80})/g, '$1\n'));
    return str.replace(/(.{80})/g, '$1\n');
};

Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
Base64.unarmor = function (a) {
    var m = Base64.re.exec(a);
    if (m) {
        if (m[1])
            a = m[1];
        else if (m[2])
            a = m[2];
        else
            throw "RegExp out of sync";
    }
    //console.log(Base64.decode(a));
    return Base64.decode(a);
};

// export globals
if (typeof module !== 'undefined') { module.exports = Base64; } else { window.Base64 = Base64; }
})();


// Big integer base-10 printing library
// Copyright (c) 2008-2019 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function () {
"use strict";

var max = 10000000000000; // biggest 10^n integer that can still fit 2^53 when multiplied by 256

function Int10(value) {
    this.buf = [+value || 0];
}

Int10.prototype.mulAdd = function (m, c) {
    // assert(m <= 256)
    var b = this.buf,
        l = b.length,
        i, t;
    for (i = 0; i < l; ++i) {
        t = b[i] * m + c;
        if (t < max)
            c = 0;
        else {
            c = 0|(t / max);
            t -= c * max;
        }
        b[i] = t;
    }
    if (c > 0)
        b[i] = c;
};

Int10.prototype.sub = function (c) {
    // assert(m <= 256)
    var b = this.buf,
        l = b.length,
        i, t;
    for (i = 0; i < l; ++i) {
        t = b[i] - c;
        if (t < 0) {
            t += max;
            c = 1;
        } else
            c = 0;
        b[i] = t;
    }
    while (b[b.length - 1] === 0)
        b.pop();
};

Int10.prototype.toString = function (base) {
    if ((base || 10) != 10)
        throw 'only base 10 is supported';
    var b = this.buf,
        s = b[b.length - 1].toString();
    for (var i = b.length - 2; i >= 0; --i)
        s += (max + b[i]).toString().substring(1);
    return s;
};

Int10.prototype.valueOf = function () {
    var b = this.buf,
        v = 0;
    for (var i = b.length - 1; i >= 0; --i)
        v = v * max + b[i];
    return v;
};

Int10.prototype.simplify = function () {
    var b = this.buf;
    return (b.length == 1) ? b[0] : this;
};

// export globals
if (typeof module !== 'undefined') { module.exports = Int10; } else { window.Int10 = Int10; }
})();

// ASN.1 JavaScript decoder
// Copyright (c) 2008-2019 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function (undefined) {
"use strict";

var Int10 = (typeof module !== 'undefined') ? require('./int10.js') : window.Int10,
    oids = (typeof module !== 'undefined') ? require('./oids.js') : window.oids,
    ellipsis = "\u2026",
    reTimeS =     /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
    reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function stringCut(str, len) {
    if (str.length > len)
        str = str.substring(0, len) + ellipsis;
    return str;
}

function Stream(enc, pos) {
    if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
    } else {
        // enc should be an array or a binary string
        this.enc = enc;
        this.pos = pos;
    }
}
Stream.prototype.get = function (pos) {
    if (pos === undefined)
        pos = this.pos++;
    if (pos >= this.enc.length)
        throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
    return (typeof this.enc == "string") ? this.enc.charCodeAt(pos) : this.enc[pos];
};
Stream.prototype.hexDigits = "0123456789ABCDEF";
Stream.prototype.hexByte = function (b) {
    return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
};
Stream.prototype.hexDump = function (start, end, raw) {
    var s = "";
    for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true)
            switch (i & 0xF) {
                    case 0x7: s += "  "; break;
                    case 0xF: s += "\n"; break;
                    default:  s += " ";
            }
    }
    return s;
};
var b64Safe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
Stream.prototype.b64Dump = function (start, end) {
    var extra = (end - start) % 3,
        s = '',
        i, c;
    for (i = start; i + 2 < end; i += 3) {
        c = this.get(i) << 16 | this.get(i + 1) << 8 | this.get(i + 2);
        s += b64Safe.charAt(c >> 18 & 0x3F);
        s += b64Safe.charAt(c >> 12 & 0x3F);
        s += b64Safe.charAt(c >>  6 & 0x3F);
        s += b64Safe.charAt(c       & 0x3F);
    }
    if (extra > 0) {
        c = this.get(i) << 16;
        if (extra > 1) c |= this.get(i + 1) << 8;
        s += b64Safe.charAt(c >> 18 & 0x3F);
        s += b64Safe.charAt(c >> 12 & 0x3F);
        if (extra == 2) s += b64Safe.charAt(c >> 6 & 0x3F);
    }
    //console.log(s);
    return s;
};
Stream.prototype.isASCII = function (start, end) {
    for (var i = start; i < end; ++i) {
        var c = this.get(i);
        if (c < 32 || c > 176)
            return false;
    }
    return true;
};
Stream.prototype.parseStringISO = function (start, end) {
    var s = "";
    for (var i = start; i < end; ++i)
        s += String.fromCharCode(this.get(i));
    return s;
};
Stream.prototype.parseStringUTF = function (start, end) {
    function ex(c) { // must be 10xxxxxx
        if ((c < 0x80) || (c >= 0xC0))
            throw new Error('Invalid UTF-8 continuation byte: ' + c);
        return (c & 0x3F);
    }
    function surrogate(cp) {
        if (cp < 0x10000)
            throw new Error('UTF-8 overlong encoding, codepoint encoded in 4 bytes: ' + cp);
        // we could use String.fromCodePoint(cp) but let's be nice to older browsers and use surrogate pairs
        cp -= 0x10000;
        return String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00);
    }
    var s = "";
    for (var i = start; i < end; ) {
        var c = this.get(i++);
        if (c < 0x80) // 0xxxxxxx (7 bit)
            s += String.fromCharCode(c);
        else if (c < 0xC0)
            throw new Error('Invalid UTF-8 starting byte: ' + c);
        else if (c < 0xE0) // 110xxxxx 10xxxxxx (11 bit)
            s += String.fromCharCode(((c & 0x1F) << 6) | ex(this.get(i++)));
        else if (c < 0xF0) // 1110xxxx 10xxxxxx 10xxxxxx (16 bit)
            s += String.fromCharCode(((c & 0x0F) << 12) | (ex(this.get(i++)) << 6) | ex(this.get(i++)));
        else if (c < 0xF8) // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (21 bit)
            s += surrogate(((c & 0x07) << 18) | (ex(this.get(i++)) << 12) | (ex(this.get(i++)) << 6) | ex(this.get(i++)));
        else
            throw new Error('Invalid UTF-8 starting byte (since 2003 it is restricted to 4 bytes): ' + c);
    }
    return s;
};
Stream.prototype.parseStringBMP = function (start, end) {
    var str = "", hi, lo;
    for (var i = start; i < end; ) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode((hi << 8) | lo);
    }
    return str;
};
Stream.prototype.parseTime = function (start, end, shortYear) {
    var s = this.parseStringISO(start, end),
        m = (shortYear ? reTimeS : reTimeL).exec(s);
    if (!m)
        return "Unrecognized time: " + s;
    if (shortYear) {
        // to avoid querying the timer, use the fixed range [1970, 2069]
        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
        m[1] = +m[1];
        m[1] += (m[1] < 70) ? 2000 : 1900;
    }
    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
    if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
            s += ":" + m[6];
            if (m[7])
                s += "." + m[7];
        }
    }
    if (m[8]) {
        s += " UTC";
        if (m[8] != 'Z') {
            s += m[8];
            if (m[9])
                s += ":" + m[9];
        }
    }
    return s;
};
Stream.prototype.parseInteger = function (start, end) {
    var v = this.get(start),
        neg = (v > 127),
        pad = neg ? 255 : 0,
        len,
        s = '';
    // skip unuseful bits (not allowed in DER)
    while (v == pad && ++start < end)
        v = this.get(start);
    len = end - start;
    if (len === 0)
        return neg ? '-1' : '0';
    // show bit length of huge integers
    if (len > 4) {
        s = v;
        len <<= 3;
        while (((s ^ pad) & 0x80) == 0) {
            s <<= 1;
            --len;
        }
        s = "(" + len + " bit)\n";
    }
    // decode the integer
    if (neg) v = v - 256;
    var n = new Int10(v);
    for (var i = start + 1; i < end; ++i)
        n.mulAdd(256, this.get(i));
    //console.log("Test");
    console.log(n.toString());
    if (document.getElementById('key_d').textContent=="") {
        document.getElementById('key_d').textContent+=n.toString();
    }
    else if (document.getElementById('key_e').textContent==""){
        document.getElementById('key_e').textContent+= n.toString();
        //pass;
    }
    else if (document.getElementById('key_n').textContent==""){
        document.getElementById('key_n').textContent+= n.toString();
        pass;
    }
    else {
        console.log("test");
        pass;
    }
    return s + n.toString();
};
Stream.prototype.parseBitString = function (start, end, maxLength) {
    var unusedBit = this.get(start),
        lenBit = ((end - start - 1) << 3) - unusedBit,
        intro = "(" + lenBit + " bit)\n",
        s = "";
    for (var i = start + 1; i < end; ++i) {
        var b = this.get(i),
            skip = (i == end - 1) ? unusedBit : 0;
        for (var j = 7; j >= skip; --j)
            s += (b >> j) & 1 ? "1" : "0";
        if (s.length > maxLength)
            return intro + stringCut(s, maxLength);
    }
    return intro + s;
};
Stream.prototype.parseOctetString = function (start, end, maxLength) {
    if (this.isASCII(start, end))
        return stringCut(this.parseStringISO(start, end), maxLength);
    var len = end - start,
        s = "(" + len + " byte)\n";
    maxLength /= 2; // we work in bytes
    if (len > maxLength)
        end = start + maxLength;
    for (var i = start; i < end; ++i)
        s += this.hexByte(this.get(i));
    if (len > maxLength)
        s += ellipsis;
    //console.log(s);
    return s;
};
Stream.prototype.parseOID = function (start, end, maxLength) {
    var s = '',
        n = new Int10(),
        bits = 0;
    for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) { // finished
            if (s === '') {
                n = n.simplify();
                if (n instanceof Int10) {
                    n.sub(80);
                    s = "2." + n.toString();
                } else {
                    var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                    s = m + "." + (n - m * 40);
                }
            } else
                s += "." + n.toString();
            if (s.length > maxLength)
                return stringCut(s, maxLength);
            n = new Int10();
            bits = 0;
        }
    }
    if (bits > 0)
        s += ".incomplete";
    if (typeof oids === 'object') {
        var oid = oids[s];
        if (oid) {
            if (oid.d) s += "\n" + oid.d;
            if (oid.c) s += "\n" + oid.c;
            if (oid.w) s += "\n(warning!)";
        }
    }
    return s;
};

function ASN1(stream, header, length, tag, sub) {
    if (!(tag instanceof ASN1Tag)) throw 'Invalid tag value.';
    this.stream = stream;
    this.header = header;
    this.length = length;
    this.tag = tag;
    this.sub = sub;
    //console.log(sub);
}
ASN1.prototype.typeName = function () {
    switch (this.tag.tagClass) {
    case 0: // universal
        switch (this.tag.tagNumber) {
        case 0x00: return "EOC";
        case 0x01: return "BOOLEAN";
        case 0x02: return "INTEGER";
        case 0x03: return "BIT_STRING";
        case 0x04: return "OCTET_STRING";
        case 0x05: return "NULL";
        case 0x06: return "OBJECT_IDENTIFIER";
        case 0x07: return "ObjectDescriptor";
        case 0x08: return "EXTERNAL";
        case 0x09: return "REAL";
        case 0x0A: return "ENUMERATED";
        case 0x0B: return "EMBEDDED_PDV";
        case 0x0C: return "UTF8String";
        case 0x10: return "SEQUENCE";
        case 0x11: return "SET";
        case 0x12: return "NumericString";
        case 0x13: return "PrintableString"; // ASCII subset
        case 0x14: return "TeletexString"; // aka T61String
        case 0x15: return "VideotexString";
        case 0x16: return "IA5String"; // ASCII
        case 0x17: return "UTCTime";
        case 0x18: return "GeneralizedTime";
        case 0x19: return "GraphicString";
        case 0x1A: return "VisibleString"; // ASCII subset
        case 0x1B: return "GeneralString";
        case 0x1C: return "UniversalString";
        case 0x1E: return "BMPString";
        }
        return "Universal_" + this.tag.tagNumber.toString();
    case 1: return "Application_" + this.tag.tagNumber.toString();
    case 2: return "[" + this.tag.tagNumber.toString() + "]"; // Context
    case 3: return "Private_" + this.tag.tagNumber.toString();
    }
};
ASN1.prototype.content = function (maxLength) { // a preview of the content (intended for humans)
    if (this.tag === undefined)
        return null;
    if (maxLength === undefined)
        maxLength = Infinity;
    var content = this.posContent(),
        len = Math.abs(this.length);
    if (!this.tag.isUniversal()) {
        if (this.sub !== null)
            return "(" + this.sub.length + " elem)";
        return this.stream.parseOctetString(content, content + len, maxLength);
    }
    switch (this.tag.tagNumber) {
    case 0x01: // BOOLEAN
        return (this.stream.get(content) === 0) ? "false" : "true";
    case 0x02: // INTEGER
        return this.stream.parseInteger(content, content + len);
    case 0x03: // BIT_STRING
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseBitString(content, content + len, maxLength);
    case 0x04: // OCTET_STRING
            //console.log("4");
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseOctetString(content, content + len, maxLength);
    //case 0x05: // NULL
    case 0x06: // OBJECT_IDENTIFIER
        return this.stream.parseOID(content, content + len, maxLength);
    //case 0x07: // ObjectDescriptor
    //case 0x08: // EXTERNAL
    //case 0x09: // REAL
    case 0x0A: // ENUMERATED
        return this.stream.parseInteger(content, content + len);
    //case 0x0B: // EMBEDDED_PDV
    case 0x10: // SEQUENCE
    case 0x11: // SET
        if (this.sub !== null)
            return "(" + this.sub.length + " elem)";
        else
            return "(no elem)";
    case 0x0C: // UTF8String
        return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
    case 0x12: // NumericString
    case 0x13: // PrintableString
    case 0x14: // TeletexString
    case 0x15: // VideotexString
    case 0x16: // IA5String
    //case 0x19: // GraphicString
    case 0x1A: // VisibleString
    case 0x1B: // GeneralString
    //case 0x1C: // UniversalString
        return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
    case 0x1E: // BMPString
        return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
    case 0x17: // UTCTime
    case 0x18: // GeneralizedTime
        return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));
    }
    return null;
};
ASN1.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
};
ASN1.prototype.toPrettyString = function (indent) {
    if (indent === undefined) indent = '';
    var s = indent + this.typeName() + " @" + this.stream.pos;
    if (this.length >= 0)
        s += "+";
    s += this.length;
    if (this.tag.tagConstructed)
        s += " (constructed)";
    else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null))
        s += " (encapsulates)";
    var content = this.content();
    if (content)
        s += ": " + content.replace(/\n/g, '|');
    s += "\n";
    if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            s += this.sub[i].toPrettyString(indent);
    }
    return s;
};
ASN1.prototype.posStart = function () {
    return this.stream.pos;
};
ASN1.prototype.posContent = function () {
    return this.stream.pos + this.header;
};
ASN1.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
};
ASN1.prototype.toHexString = function () {
    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
};
ASN1.prototype.toB64String = function () {
    return this.stream.b64Dump(this.posStart(), this.posEnd());
};
ASN1.decodeLength = function (stream) {
    var buf = stream.get(),
        len = buf & 0x7F;
    if (len == buf)
        return len;
    if (len > 6) // no reason to use Int10, as it would be a huge buffer anyways
        throw "Length over 48 bits not supported at position " + (stream.pos - 1);
    if (len === 0)
        return null; // undefined
    buf = 0;
    for (var i = 0; i < len; ++i)
        buf = (buf * 256) + stream.get();
    return buf;
};
function ASN1Tag(stream) {
    var buf = stream.get();
    this.tagClass = buf >> 6;
    this.tagConstructed = ((buf & 0x20) !== 0);
    this.tagNumber = buf & 0x1F;
    if (this.tagNumber == 0x1F) { // long tag
        var n = new Int10();
        do {
            buf = stream.get();
            n.mulAdd(128, buf & 0x7F);
        } while (buf & 0x80);
        this.tagNumber = n.simplify();
    }
}
ASN1Tag.prototype.isUniversal = function () {
    return this.tagClass === 0x00;
};
ASN1Tag.prototype.isEOC = function () {
    return this.tagClass === 0x00 && this.tagNumber === 0x00;
};
ASN1.decode = function (stream) {
    //console.log("Test1");
    if (!(stream instanceof Stream))
        stream = new Stream(stream, 0);
    var streamStart = new Stream(stream),
        tag = new ASN1Tag(stream),
        len = ASN1.decodeLength(stream),
        start = stream.pos,
        header = start - streamStart.pos,
        sub = null,
        getSub = function () {
            sub = [];
            if (len !== null) {
                // definite length
                var end = start + len;
                if (end > stream.enc.length)
                    throw 'Container at offset ' + start +  ' has a length of ' + len + ', which is past the end of the stream';
                while (stream.pos < end)
                    sub[sub.length] = ASN1.decode(stream);
                if (stream.pos != end)
                    throw 'Content size is not correct for container at offset ' + start;
            } else {
                // undefined length
                try {
                    for (;;) {
                        var s = ASN1.decode(stream);
                        if (s.tag.isEOC())
                            break;
                        sub[sub.length] = s;
                    }
                    len = start - stream.pos; // undefined lengths are represented as negative values
                } catch (e) {
                    throw 'Exception while decoding undefined length content at offset ' + start + ': ' + e;
                }
            }
        };
    //console.log("test2");
    if (tag.tagConstructed) {
        // must have valid content
        getSub();
    } else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
        // sometimes BitString and OctetString are used to encapsulate ASN.1
        try {
            if (tag.tagNumber == 0x03)
                if (stream.get() != 0)
                    throw "BIT STRINGs with unused bits cannot encapsulate.";
            getSub();
            for (var i = 0; i < sub.length; ++i)
                if (sub[i].tag.isEOC())
                    throw 'EOC is not supposed to be actual content.';
        } catch (e) {
            // but silently ignore when they don't
            sub = null;
            //DEBUG console.log('Could not decode structure at ' + start + ':', e);
        }
    }
    if (sub === null) {
        if (len === null)
            throw "We can't skip over an invalid tag with undefined length at offset " + start;
        stream.pos = start + Math.abs(len);
    }
    //console.log(sub);
    return new ASN1(streamStart, header, len, tag, sub);
};

// export globals
if (typeof module !== 'undefined') { module.exports = ASN1; } else { window.ASN1 = ASN1; }
})();

// ASN.1 JavaScript decoder
// Copyright (c) 2008-2019 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function (undefined) {
"use strict";

var ASN1 = (typeof module !== 'undefined') ? require('./asn1.js') : window.ASN1,
    oids = (typeof module !== 'undefined') ? require('./oids.js') : window.oids,
    lineLength = 80,
    contentLength = 8 * lineLength,
    DOM = {
        ellipsis: "\u2026",
        tag: function (tagName, className) {
            var t = document.createElement(tagName);
            t.className = className;
            return t;
        },
        text: function (str) {
            return document.createTextNode(str);
        },
        space: function () {
            var t = document.createElement('span');
            t.className = 'spaces';
            t.innerHTML = ' ';
            return t;
        },
        breakLines: function (str, length) {
            var lines = str.split(/\r?\n/),
                o = '';
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if (i > 0) o += "\n";
                while (line.length > length) {
                    o += line.substring(0, length);
                    o += "\n";
                    line = line.substring(length);
                }
                o += line;
            }
            return o;
        }
    };

ASN1.prototype.toDOM = function (spaces) {
    spaces = spaces || '';
    var isOID = (typeof oids === 'object') && (this.tag.isUniversal() && (this.tag.tagNumber == 0x06));
    var node = DOM.tag("div", "node");
    node.asn1 = this;
    var head = DOM.tag("div", "head");
    head.innerHTML = "<span class='spaces'>" + spaces + "</span>" + this.typeName().replace(/_/g, " ");
    var content = this.content(contentLength);
    if (content !== null) {
        var preview = DOM.tag("span", "preview"),
            shortContent;
        if (isOID)
            content = content.split('\n', 1)[0];
        shortContent = (content.length > lineLength) ? content.substring(0, lineLength) + DOM.ellipsis : content;
        preview.appendChild(DOM.space());
        preview.appendChild(DOM.text(shortContent));
        if (isOID) {
            var oid = oids[content];
            if (oid) {
                if (oid.d) {
                    preview.appendChild(DOM.space());
                    var oidd = DOM.tag("span", "oid description");
                    oidd.appendChild(DOM.text(oid.d));
                    preview.appendChild(oidd);
                }
                if (oid.c) {
                    preview.appendChild(DOM.space());
                    var oidc = DOM.tag("span", "oid comment");
                    oidc.appendChild(DOM.text("(" + oid.c + ")"));
                    preview.appendChild(oidc);
                }
            }
        }
        head.appendChild(preview);
        content = DOM.breakLines(content, lineLength);
        content = content.replace(/</g, "&lt;");
        content = content.replace(/\n/g, "<br>");
    }
    node.appendChild(head);
    this.node = node;
    this.head = head;
    var value = DOM.tag("div", "value");
    var s = "Offset: " + this.stream.pos + "<br>";
    s += "Length: " + this.header + "+";
    if (this.length >= 0)
        s += this.length;
    else
        s += (-this.length) + " (undefined)";
    if (this.tag.tagConstructed)
        s += "<br>(constructed)";
    else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null))
        s += "<br>(encapsulates)";
    //TODO if (this.tag.isUniversal() && this.tag.tagNumber == 0x03) s += "Unused bits: "
    if (content !== null) {
        s += "<br>Value:<br><b>" + content + "</b>";
        if (isOID && oid) {
            if (oid.d) s += "<br>" + oid.d;
            if (oid.c) s += "<br>" + oid.c;
            if (oid.w) s += "<br>(warning!)";
        }
    }
    value.innerHTML = s;
    node.appendChild(value);
    var sub = DOM.tag("div", "sub");
    if (this.sub !== null) {
        spaces += '\xA0 ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            sub.appendChild(this.sub[i].toDOM(spaces));
    }
    node.appendChild(sub);
    head.onclick = function () {
        node.className = (node.className == "node collapsed") ? "node" : "node collapsed";
    };
    return node;
};
ASN1.prototype.fakeHover = function (current) {
    this.node.className += " hover";
    if (current)
        this.head.className += " hover";
};
ASN1.prototype.fakeOut = function (current) {
    var re = / ?hover/;
    this.node.className = this.node.className.replace(re, "");
    if (current)
        this.head.className = this.head.className.replace(re, "");
};
ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
    if (start >= end)
        return;
    var sub = DOM.tag("span", className);
    sub.appendChild(DOM.text(
        stream.hexDump(start, end)));
    node.appendChild(sub);
};
ASN1.prototype.toHexDOM = function (root) {
    var node = DOM.tag("span", "hex");
    if (root === undefined) root = node;
    this.head.hexNode = node;
    this.head.onmouseover = function () { this.hexNode.className = "hexCurrent"; };
    this.head.onmouseout  = function () { this.hexNode.className = "hex"; };
    node.asn1 = this;
    node.onmouseover = function () {
        var current = !root.selected;
        if (current) {
            root.selected = this.asn1;
            this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
    };
    node.onmouseout  = function () {
        var current = (root.selected == this.asn1);
        this.asn1.fakeOut(current);
        if (current) {
            root.selected = null;
            this.className = "hex";
        }
    };
    this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
    this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
    if (this.sub === null) {
        var start = this.posContent();
        var end = this.posEnd();
        if (end - start < 10 * 16)
            node.appendChild(DOM.text(
                this.stream.hexDump(start, end)));
        else {
            var end1 = start + 5 * 16 - (start & 0xF);
            var start2 = end - 16 - (end & 0xF);
            node.appendChild(DOM.text(
                this.stream.hexDump(start, end1)));
            var sub = DOM.tag("span", "skip");
            sub.appendChild(DOM.text("\u2026 skipping " + (start2 - end1) + " bytes \u2026\n"));
            node.appendChild(sub);
            node.appendChild(DOM.text(
                this.stream.hexDump(start2, end)));
        }
    } else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
            node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
    } else
        this.toHexDOM_sub(node, "outro", this.stream, this.posContent(), this.posEnd());
    return node;
};

})();

/*global Hex, Base64, ASN1 */
"use strict";

var maxLength = 10240,
    reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
    area = id('key_b64'),
    hash = null;
function id(elem) {
    return document.getElementById(elem);
}
function text(el, string) {
    if ('textContent' in el)
        el.textContent = string;
    else
        el.innerText = string;
}
function decode(der) {
    tree.innerHTML = '';
    dump.innerHTML = '';
    try {
        var asn1 = ASN1.decode(der);
        tree.appendChild(asn1.toDOM());
        var b64 = (der.length < maxLength) ? asn1.toB64String() : '';
        if (area.value === '')
            area.value = Base64.pretty(b64);
        try {
            window.location.hash = hash = '#' + b64;
        } catch (e) { // fails with "Access Denied" on IE with URLs longer than ~2048 chars
            window.location.hash = hash = '#';
        }
    } catch (e) {
        text(tree, e);
    }
}
function decodeText(val) {
    try {
        var der = reHex.test(val) ? Hex.decode(val) : Base64.unarmor(val);
        decode(der);
    } catch (e) {
        //text(tree, e);
        //dump.innerHTML = '';
        console.log(e);
    }
}
// set up buttons
//id('butDecode').onclick = function () { 
    //console.log(area.innerHTML);
  //  decodeText(area.innerHTML); };


// main
document.ondragover = stop;
document.ondragleave = stop;
