# SafariDownloadBug
Reproduces an issue with file downloading in Safari. Long file names get broken during download, when using http/1 or http/1 with https.

node app.js

You'll need to put a certificate and a key to the example's root folder as server.crt and server.pem, correspondingly. 

The application runs three web servers which implement the same functionality. They respond to a GET request, using HTTP headers specified in headers.txt, and a simple text body. 

http://localhost:8880 - HTTP1 server. The link will download a file with some automatically generated file name in Safari, but will download with correct name in other browsers.

https://localhost:8443 - HTTP1 / HTTPS server. The link will download a file with some automatically generated file name in Safari, but will download with correct name in other browsers.

https://localhost:8443 - HTTP2 / HTTPS server. The link will download a file with correct name in Safari and other browsers.
