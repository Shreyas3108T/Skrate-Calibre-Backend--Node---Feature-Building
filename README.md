# Skrate-Calibre-Backend--Node---Feature-Building
Skrate Calibre Backend (Node) Feature Building Task (round 2)

### URL endpoint = "https://fast-citadel-03015.herokuapp.com"
### URl VIDEO = "https://drive.google.com/file/d/1oxuWW4crXWUckKcEIwcAEgqRY8FJ-Cb_/view?usp=sharing"
### URL Log = "https://drive.google.com/file/d/1kokVbFUN6z1jbeDoRYGtz9OU00ntzo5l/view?usp=sharing"

To create a new user post
https://fast-citadel-03015.herokuapp.com/users/new 
with parameters in body
username,role ----- required 

to create a new ticket post 
"https://fast-citadel-03015.herokuapp.com/tickets/new""
with parameters in body
title,description ------ required 
assignedTo,priority ---- not necessary
along with bearer token in the header 

to query a new ticket get
"https://fast-citadel-03015.herokuapp.com/tickets/[param]"


to mark a ticket closed post 
"https://fast-citadel-03015.herokuapp.com/tickets/markAsClosed"
with parameters in body 
ticketID ------- required 

to delete a ticket post 
"https://fast-citadel-03015.herokuapp.com/tickets/delete
with parameters in body 
ticketID ------- required 





