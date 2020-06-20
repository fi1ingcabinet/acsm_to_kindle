//var mySubString = "";
function upload_key() {
    document.getElementById('inputfile').addEventListener('change', function() { 
        file2 = this.files[0];
        console.log(file2);
        var fr=new FileReader(); 
        var mySubString = "";
        document.getElementById('submit_file').addEventListener('click', function() {
            fr.onload=function(){ 
                //console.log(fr.result);
                mySubString = fr.result.substring(
                    fr.result.lastIndexOf("<adept:privateLicenseKey>") + 25, 
                    fr.result.lastIndexOf("</adept:privateLicenseKey>")
                );
                document.getElementById('output').textContent=mySubString; 
                //mySubString = console.log(mySubString);
                console.log(mySubString);
                test = decodeText(mySubString);
                Decrypt_function_book(document.getElementById('book_key').innerHTML, document.getElementById('key_n').innerHTML, document.getElementById('key_d').innerHTML)
                //return mySubString;
            }

            mySubString = fr.readAsText(file2);

            document.getElementById("file_upload").style.display = "block";
            //console.log(mySubString);
            //test = decodeText(mySubString);
            //console.log(test);
            
        });

    });
}