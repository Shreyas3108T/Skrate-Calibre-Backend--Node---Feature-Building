# Skrate-Calibre-Backend--Node---Feature-Building
Skrate Calibre Backend (Node) Feature Building Task (round 2)

#### URL endpoint = "https://fast-citadel-03015.herokuapp.com"
#### URl VIDEO = "https://drive.google.com/file/d/10icz0Z_6ThppdI1juhPjhVSwbaDpzQVi/view?usp=sharing"
#### URL Log = "https://drive.google.com/file/d/1kokVbFUN6z1jbeDoRYGtz9OU00ntzo5l/view?usp=sharing"

>To create a new user <b>POST</b>

 `https://fast-citadel-03015.herokuapp.com/users/new`
 
with parameters in body
* username ----- required
* role ----- required 

>To create a new ticket <b>POST</b>

`https://fast-citadel-03015.herokuapp.com/tickets/new`

with parameters in body
* title  ------ required 
* description ------ required 
* assignedTo ---- not necessary
* priority ---- not necessary
- along with bearer token in the header 

>to query a  ticket <b>GET</b>

`https://fast-citadel-03015.herokuapp.com/tickets/[param]`

where Param can be 

* <b> To GET All the tickets </b>

`https://fast-citadel-03015.herokuapp.com/tickets/All`

*  <b> To GET All the tickets with status open or close </b>

`https://fast-citadel-03015.herokuapp.com/tickets/?status=status=open/close`   

* <b> To GET tickets with title</b>
  
 `https://fast-citadel-03015.herokuapp.com/tickets/?title=<title>`
 
 - along with bearer token in the header 

>To mark a ticket closed post 
  
`https://fast-citadel-03015.herokuapp.com/tickets/markAsClosed`

with parameters in body 
* ticketID ------- required 

- along with bearer token in the header 

>to delete a ticket post 

`https://fast-citadel-03015.herokuapp.com/tickets/delete`
with parameters in body 
* ticketID ------- required 

- along with bearer token in the header 





