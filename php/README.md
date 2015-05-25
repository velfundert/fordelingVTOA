This is where the part that lets you hook into Wordpress lives. It consists of a
php-file that handles two post-requests, one that checks if the current user is
logged in and has the neccessary permissions, and one that accepts a new 
data set.

It also handles GET-requests, either returning a list of all available
data sets, or one specific set.

*NOTE:* The variable `$THIS_BASENAME` must be set to the path requests to the
php-file will be directed to, e.g. `/mandater/REST`.

Future
======

- Implement support for PUT to allow updating data sets.
