This is where the part that lets you hook into Wordpress lives. It consists of a
php-file that handles two post-requests, one that checks if the current user is
logged in and has the neccessary permissions, and one that accepts a file
upload.

It also handles GET-requests, either returning a list of all available
csv-files, or a specific file.
