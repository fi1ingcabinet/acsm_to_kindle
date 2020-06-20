# ascm_to_kindle

## Javascript only implementation to convert ascm to Kindle

This a javascript only implementation to create a decrypted epub book opened in Adobe Digital Editions, allowing it to open in other epub readers (Apple Books, etc.)

1. Upload an epub file using JSZip (example in the JSZip folder)
1.1. When its uploaded automatically check if there are encrypted files in there and pull out the encrytped book key if so
2. If prompted, upload the encryption key for the User (used to decrypt the book key)
2.1. Click to decrypt the book key (parse user key > decrypt book key)
3. Build the book (copy all non-encrypted files, decrypt encrypted files and copy them, output the book)
