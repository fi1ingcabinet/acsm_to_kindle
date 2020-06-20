// THIS SCRIPT IS USED TO GET A LIST OF ZIP FILE CONTENTS
function upload_book() {
    //document.getElementById('submit_button').addEventListener('click', function() {
    var all_files = [];
    var encrypted_files = []
    var book_key = "";
    document.getElementById('file').addEventListener('change', function() {
        //console.log(document.getElementById('file').value);
        file = this.files;
            //console.log(this.files);
            document.getElementById('submit_button').addEventListener('click', function() {
            //document.getElementById('file').addEventListener('change', function() {
            //file = this.files;
                //console.log("one");

                // This function takes the file input and works with it in JSZip
                function handleFile(f) {
                    JSZip.loadAsync(f)    // 1) read the Blob
                    .then(function(zip) {
                        zip.forEach(function (relativePath, zipEntry) {  // 2) print entries

                            //
                            // Show all of the files in the zip file in the page
                            //
                            //document.getElementById('file_list').innerHTML += zipEntry.name + ", ";
                            all_files.push(zipEntry.name);
                            zipEntry.async("base64")
                                .then(function (binary) {
                                if (zipEntry.name=="EPUB/images/img_0013.png"){
                                    var dataURI = binary;
                                    //console.log(zipEntry.name);
                                    //console.log(dataURI);
                                    //console.log(base64tobase16(dataURI));
                                }
                            }
                                      );
                            //console.log(zipEntry.name);
                        })}, function (e) {
                                console.log(e);
                            }
                         );
                }

                //
                // Get a complete list of all files in the epub book
                //
                //var all_files = [];

                for (var i = 0; i < file.length; i++) {
                    handleFile(file[i]);
                }

                //
                // Check if there are encrypted files and add them to an array
                //
                //var encrypted_files = []
                var enc_flag = 0;
                function checkEncryptedAndParse(f) {
                    JSZip.loadAsync(f)    // 1) read the Blob
                    .then(function(zip) {
                        zip.forEach(function (relativePath, zipEntry) {
                            if (zipEntry.name.includes("encryption.xml")){
                                enc_flag = 1;
                                document.getElementById('encryption_flag_yes').style.visibility = "";
                                document.getElementById('need_key').style.visibility = "";
                                //console.log(zipEntry.name)

                                zipEntry.async("string")
                                .then(function (text) {
                                    var dataURI = text;
                                    //console.log(dataURI);
                                    var lines = dataURI.split(/[\r\n]+/g);
                                    for (i=0; i<lines.length; i++){
                                        //console.log(lines[i]);
                                        //console.log(lines[i]);  //console.log(lines[i].includes("Cipher"));
                                        if (lines[i].includes("CipherRefer")){
                                            mySubString = lines[i].substring(
                                              lines[i].lastIndexOf("<CipherReference URI=\"") + 22, lines[i].lastIndexOf("\"></CipherReference>")
                                                  );
                                            //console.log(mySubString);
                                            encrypted_files.push(mySubString);
                                            }
                                      }
                                    }
                                    );                                
                            }
                            else if (enc_flag =0) {document.getElementById('encryption_flag_no').style.visibility = "";}
                            if (zipEntry.name.includes("rights.xml")){
                                //document.getElementById('need_key').style.visibility = "";

                                zipEntry.async("string")
                                .then(function (text) {
                                    var dataURI = text;
                                    //console.log(dataURI);
                                    var lines = dataURI.split(/[\r\n]+/g);
                                    for (i=0; i<lines.length; i++){
                                        //console.log(lines[i]);
                                        //console.log(lines[i]);  //console.log(lines[i].includes("Cipher"));

                                        if (lines[i].includes("encryptedKey")){
                                            mySubString = lines[i].substring(
                                              lines[i].lastIndexOf("<encryptedKey keyInfo=\"user\">") + 29, lines[i].lastIndexOf("</encryptedKey>")
                                                  );
                                            document.getElementById('book_key').innerHTML = mySubString;
                                            //console.log(mySubString);
                                            //document.getElementById('enc_file_list').innerHTML += mySubString + ", ";
                                            //encrypted_files.push(mySubString);
                                            }
                                      }
                                    }
                                    );                                
                            }
                            
                        }
                                    )
                    });}

                for (var i = 0; i < file.length; i++) {
                    checkEncryptedAndParse(file[i]);
                    //document.getElementById('enc_file_list').innerHTML = encrypted_files.toString();
                }
                console.log(all_files);
                console.log(encrypted_files);


})
        
    document.getElementById('submit_button2').addEventListener('click', function() {
        
        function handleFile2(f,zip_out) {
            //var zip_out = new JSZip();
            //console.log(zip_out);
            //console.log("key2: ");
            var key2 = document.getElementById('book_key_dec').innerHTML
            console.log(key2);
            //console.log(typeof key2);
            var key3 = aesjs.utils.hex.toBytes(key2);
            console.log(key3);
            JSZip.loadAsync(f)    // 1) read the Blob
            .then(function(zip) {
                //var zip_out = new JSZip();
                const promises = [];
                zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                    //console.log(zipEntry.name);
                    // skip the encryption and rights.xml files, these will not be included in the new zip
                    if (zipEntry.name.includes("encryption.xml") || zipEntry.name.includes("rights.xml")) {
                        1==1;
                        //console.log("enc and rights: ")
                        //console.log(zipEntry.name);
                    }
                    // Decrypt the encrypted files, and INFLATE them
                    else if (encrypted_files.includes(zipEntry.name)) {
                        //console.log(zipEntry.name);
                        //console.log("encrypted files: ")
                        //console.log(zipEntry.name);
                        //if (zipEntry.name.includes("img_0013")){
                        if (1==1){
                            promises.push(zipEntry.async("base64") // Load the content
                                .then(function (binary) {
                                    var file_content = base64tobase16(binary);
                                    //console.log("file content: ");
                                    //console.log(file_content);
                                    //console.log(typeof file_content);
                                    var file_content = aesjs.utils.hex.toBytes(file_content);
                                    //console.log("file content hex to bytes: ");
                                    //console.log(file_content);
                                    
                                    //var key = [ 0xf9, 0x25, 0xaa, 0x58, 0x05, 0xb4, 0xe3, 0xbd, 0xb2, 0x6d, 0x2c, 0xf3, 0x16, 0x9b, 0x3c, 0x98, ];
                                    var key = key3;
                                    //var key2 = [];
                                    //var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
                                    //console.log(binary);
                                    
                                    //console.log("here: ");
                                    byte_array = file_content;
                                    //console.log(byte_array);
                                    var iv = byte_array.slice(0, 16);
                                    var enc_text = byte_array.slice(16);
                                    //console.log(iv);
                                    //console.log(enc_text);
                                    const toHexString = bytes => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
                                    //console.log(toHexString(iv));
                                    //console.log(toHexString(enc_text));
                                    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
                                    var decryptedBytes = aesCbc.decrypt(enc_text);
                                    //console.log(decryptedBytes);

                                    // Convert our bytes back into text
                                    var decryptedText = aesjs.utils.hex.fromBytes(decryptedBytes);
                                    //console.log(decryptedText);
                                
                                
                                    //
                                    // Now INFLATE IT
                                    //
                                    var output = pako.inflateRaw(decryptedBytes,{window_size:-15});
                                    //console.log(output);
                                    //chardata3 = toHexString(output);
                                    //console.log(chardata3);
                                
                                    //
                                    // Add the file
                                    //
                                    zip_out.file(zipEntry.name.toString(), output);
                                    
                            }
                                      )
                                          )}
                    
                        
                        
                    }
                    else {
                        //console.log("unenc files: ")
                        //console.log(zipEntry.name);
                        //console.log(zipEntry.name);
                        promises.push(zipEntry.async("blob")
                                .then(function (blob_text) {
                                    var file_content = blob_text;
                                    //console.log(file_content);
                                    zip_out.file(zipEntry.name.toString(), file_content);
                            //zip_out.generateAsync({type:"blob"}).then(function (blob) {saveAs(blob, "hello2.zip");});
                            //console.log(zip_out);
                    }
                                      ));
                        
                    }
                    
                    
                    //console.log(zipEntry.name);
                });
                
                Promise.all(promises).then(function (data) {
                    zip_out.generateAsync({type:"blob"}).then(function (blob) {
                        saveAs(blob, "hello2.epub");
                        });
                });
                
                /*
                zip_out.generateAsync({type:"blob"}).then(function (blob) {
                            saveAs(blob, "hello2.zip");
                        });*/
            
            }, function (e) {
                        console.log(e);
                    }
                 );
            }
        for (var i = 0; i < file.length; i++) {
            console.log(file[i]);
            var zip_out = new JSZip();
            handleFile2(file[i],zip_out);
                }
    });
        });
}