//var mySubString = "";
function upload_key() {
    document.getElementById('inputfile').addEventListener('change', function() { 
        file2 = this.files[0];
        console.log(file2);
        var fr=new FileReader(); 
        document.getElementById('submit_file').addEventListener('click', function() {
            fr.onload=function(){ 
                //console.log(fr.result);
                mySubString = fr.result.substring(
                    fr.result.lastIndexOf("<adept:privateLicenseKey>") + 25, 
                    fr.result.lastIndexOf("</adept:privateLicenseKey>")
                );
                document.getElementById('output').textContent=mySubString; 
                //mySubString = console.log(mySubString);
                return mySubString;
            }

            mySubString = fr.readAsText(file2);

            document.getElementById("file_upload").style.display = "block";
        });

    });
}