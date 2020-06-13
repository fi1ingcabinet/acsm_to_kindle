# ascm_to_kindle

Javascript only implementation to convert ascm to Kindle

-    1. Upload the ascm epub file
-    1.1. unzip the file
-    1.2. 
-    2. (IF ENCRYPTED) Locate encryption key and create book
-    2.1. If the book elements are encrypted get the key from rights.xml
-Y    2.2. Get the second file upload for user key
-    2.3. parse user key
-    2.4. decrypt book key with user key
-    2.5. Create a new book template with all unencrypted files (excl config files)
-    2.6. Decrypt the rest of the book files and add them to the new template
-    2.7. Zip the new template as epub and prompt download
-    3. (IF NOT ENCRYPTED) create book <<< do we need this?! if not enc then it can go anyway, but we can't send to kindle
-    3.1. Create a new book template with all unencrypted files 
-    3.2. Zip the new template as epub and prompt download
-    4. Create kindle html file
-    4.1. Parse the book into html file 
-    5. Show how to send to kindle
-    5.1. email with condition "configure" or whatever it is to create a book

