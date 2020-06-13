// From cryptico
function int2char(n) {
    return BI_RM.charAt(n);
}
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function base64tobase16(s) {
        var ret = "";
        var i;
        var k = 0;
        var slop;
        var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        for (i = 0; i < s.length; ++i)
        {
            if (s.charAt(i) == "=") break;
            v = base64Chars.indexOf(s.charAt(i));
            if (v < 0) continue;
            if (k == 0)
            {
                ret += int2char(v >> 2);
                slop = v & 3;
                k = 1;
            }
            else if (k == 1)
            {
                ret += int2char((slop << 2) | (v >> 4));
                slop = v & 0xf;
                k = 2;
            }
            else if (k == 2)
            {
                ret += int2char(slop);
                ret += int2char(v >> 2);
                slop = v & 3;
                k = 3;
            }
            else
            {
                ret += int2char((slop << 2) | (v >> 4));
                ret += int2char(v & 0xf);
                k = 0;
            }
        }
        if (k == 1) ret += int2char(slop << 2);
        return ret;
    }
function parse_key(bytes) {
    
    // Octet 1
    upto=0;
    id1 = identifier_octets(bytes,"one");
    if (id1.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    
    len1_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len1_bytes_size == 1){
        length1 = parseInt(bytes.substring(upto,upto+2),16);
        content1 = bytes.substring(upto,length1);
    } 
    else {
        upto = upto+2;
        length1 = parseInt(bytes.substring(upto,upto+4),16);
        upto=upto+4;
        content1 = bytes.substring(upto,upto+length1*2);
    }
    
    
    
    // Octet >1
    id2 = identifier_octets(bytes.substring(upto),">1");
    if (id2.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len2_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len2_bytes_size == 1){
        length2 = parseInt(bytes.substring(upto,upto+2),16);
        upto = upto+parseInt(len2_bytes_size)*2;
        content2 = bytes.substring(upto,upto+length2*2);
        upto = upto+length2*2;
    } 
    else {
        console.log("ALERT");
    }
    
    // Octet >1
    id3 = identifier_octets(bytes.substring(upto),">1");
    if (id3.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len3_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len3_bytes_size == 1){
        length3 = parseInt(bytes.substring(upto,upto+2),16);
        upto = upto+parseInt(len3_bytes_size)*2;
        content3 = bytes.substring(upto,upto+length3*2);
        upto = upto+length3*2;
    } 
    else {
        console.log("ALERT");
    }
    
    // Octet >1
    id4 = identifier_octets(bytes.substring(upto),">1");
    if (id4.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len4_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len4_bytes_size == 1){
        length4 = parseInt(bytes.substring(upto,upto+2),16);
        upto = upto+parseInt(len4_bytes_size)*2;
        content4 = bytes.substring(upto,upto+length4*2);
        upto = upto+length4*2;
    } 
    else {
        console.log("here");
        length4 = parseInt(bytes.substring(upto+2,upto+len4_bytes_size+4),16);
        upto = upto+(len4_bytes_size*2+2);
        content4 = bytes.substring(upto,upto+length4*2);
    }
    
    // Octet >1
    id5 = identifier_octets(bytes.substring(upto),">1");
    if (id5.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len5_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len5_bytes_size == 1){
        length5 = parseInt(bytes.substring(upto,upto+2),16);
        upto = upto+parseInt(len5_bytes_size)*2;
        content5 = bytes.substring(upto,upto+length5*2);
        upto = upto+length5*2;
    } 
    else {
        console.log("here");
        length5 = parseInt(bytes.substring(upto+2,upto+len5_bytes_size+4),16);
        upto = upto+(len5_bytes_size*2+2);
        content5 = bytes.substring(upto,upto+length5*2);
    }
    
    console.log(id5);
    console.log(id5, len5_bytes_size, length5, content5);
    
    // Octet >1
    id6 = identifier_octets(bytes.substring(upto),">1");
    if (id6.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len6_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len6_bytes_size == 1){
        length6 = parseInt(bytes.substring(upto,upto+2),16);
        upto = upto+parseInt(len6_bytes_size)*2;
        content6 = bytes.substring(upto,upto+length6*2);
        upto = upto+length6*2;
    } 
    else {
        console.log("here");
        length6 = parseInt(bytes.substring(upto+2,upto+len6_bytes_size+4),16);
        upto = upto+(len6_bytes_size*2+2);
        content6 = bytes.substring(upto,upto+length6*2);
    }
    
    console.log(id6);
    console.log(id6, len6_bytes_size, length6, content6);
    
    // Octet >1
    id7 = identifier_octets(bytes.substring(upto),">1");
    if (id7.substr(0,3)=="Key"){ alert("key incorrect");return}
    else {upto=upto+2}
    len7_bytes_size = length_size_octet(bytes.substring(upto,upto+2));
    if (len7_bytes_size == 1){
        length7 = parseInt(bytes.substring(upto,upto+2),17);
        upto = upto+parseInt(len7_bytes_size)*2;
        content7 = bytes.substring(upto,upto+length7*2);
        upto = upto+length7*2;
    } 
    else {
        console.log("here");
        length7 = parseInt(bytes.substring(upto+2,upto+len7_bytes_size+4),17);
        upto = upto+(len7_bytes_size*2+2);
        content7 = bytes.substring(upto,upto+length7*2);
    }
    
    console.log(id7);
    console.log(id7, len7_bytes_size, length7, content7);
    
    
    
    
    
    
    return {id1: id1, len1_bytes_size: len1_bytes_size, length1: length1, content1: content1,
           id2: id2, len2_bytes_size: len2_bytes_size, length2: length2, content2: content2,
           id3: id3, len3_bytes_size: len3_bytes_size, length3: length3, content3: content3,
           id4: id4, len4_bytes_size: len4_bytes_size, length4: length4, content4: content4,
           id5: id5, len5_bytes_size: len5_bytes_size, length5: length5, content5: content5,
           id6: id6, len6_bytes_size: len6_bytes_size, length6: length6, content6: content6,
           id7: id7, len7_bytes_size: len7_bytes_size, length7: length7, content7: content7};
            
            //, len4_bytes_size: len4_bytes_size, length4: length4, content4: content4};
    
}

function identifier_octets(bytes,octet_num){
    
    if (octet_num == "one") {
        if (bytes.substring(0,2) == "30") {
            identifier = "30";
            return identifier;
    }
        else {
            return "Key element identifier 1 could not be parsed. Please ensure the key file is correct.";
        }
    }
    if (octet_num == ">1") {
        if (bytes.substring(0,2) == "30") {
            identifier = "30";
            return identifier;
    }
        else if (bytes.substring(0,2) == "02"){
            identifier = "02";
            return identifier;
        }
        else if (bytes.substring(0,2) == "04"){
            identifier = "04";
            return identifier;
        }
        else {
            return "Key element identifier 1 could not be parsed. Please ensure the key file is correct.";
        }
    }
}

function length_size_octet(bytes){
    
    if (parseInt(bytes,16)<127) {
        length_bytes = 1;
    }
    else {
        length_bytes = 2;
    }
    //console.log(bytes);
    return length_bytes;
}













