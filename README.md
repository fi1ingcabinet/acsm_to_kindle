# ascm_to_kindle

Javascript only implementation to convert ascm to Kindle

-    1. Upload the ascm epub file
-    1.1. unzip the file
-    1.2. 
-    2. (IF ENCRYPTED) Locate encryption key and create book
-    2.1. If the book elements are encrypted get the key from rights.xml
-Y    2.2. "User Key" - Get the second file upload for user key
-Y    2.3. "Parse User Key" - parse user key
-Y    2.4. "cryptico/test_rsa_book_key.html" decrypt book key with user key
-    2.5. Create a new book template with all unencrypted files (excl config files)
-    2.6. Decrypt the rest of the book files and add them to the new template
-    2.7. Zip the new template as epub and prompt download
-    3. Create kindle html file
-    3.1. IF NOT ENCRYPTED - take original file and make html
-    3.2. IF ENCRYPTED - take the above file and make html
-    3.1. Parse the book into html file 
-    4. Show how to send to kindle
-    4.1. email with condition "configure" or whatever it is to create a book

