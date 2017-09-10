# whyql official spec

This document aims to clearly define and explain whyql.


## Definition

whyql aims to solve the data interchange problem between frontends and backends.
It tries to implement a set of conventions or ideas that provide a simple foundation
to ease software development and detangle tightly coupled systems.

The basic idea is that we have two or more parts of a system sending data to each other.
All parts rely on the same basic data types and actions. We take those basic data types
and actions and clearly define how to use them everywhere. That means we only have to worry about implementing the details and architect the whole thing ourselves.

## Technical overview

All clients and backends built around a CRUD architecture do the same basic things.
whyql provides a basic interface around the CRUD architecture. It does so by:

- Defining the four CRUD actions as generic verbs (Create, Read, Update, Delete) and
actions used in systems.

- Providing a standard data structure to POST and GET data through.

- Defining idioms and conventions to be used.

- Reducing URI usage to only one endpoint. Let the verbs and data define actions and not endpoints.

## Example

Let's look at a simple web app as an example. The web app is built around a javascript client that GETs and POSTs data to a Python backend.

On both sides, we have the same basic data structures:

```
User object

name
email
password
```

We also have four basic CRUD actions:

```
Create User
Read User
Update User
Delete User
```

The ReSTful approach (which I'm not saying is wrong) would have something like this:

```
Create User => POST /user/
Read User => GET /user/
Update User => POST /user/update/ or PUT /user/ if available
Delete User => POST /user/delete/ or DELETE /user/ if available
```

The data for the above would vary, but would be a variation of the `User object` defined above.

whyql simply takes the idea of the CRUD actions and puts them behind one endpoint:

```
CRUD => POST /query/
```

It would receieve a similar data structure to this:

```
{
    "query":
        {
            "action": "read",
            "object": {
                "type": "user",
                "email": "pryelluw@gmail.com"
            }
        }
}
```

The structure states that:

- It is a query type

- It is a read action

- For object `User` of email `pryelluw@gmail.com`


The frontend and backend would define the four actions and data structures.
Thus establishing a standard interface for the CRUD operations. Like so:

```
// Javascript

class User extends whyql {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password; 
    }

    create() {}

    read() {}

    update() {}

    delete() {}

}


/*
Application code
*/

<UserButton onClick=this.user.update() />
```


```
# Python

class User(Whyql):


    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


    def create(self):
        """
        Insert new user into db
        """
        pass


    def read(self):
        ""
        Select user from db
        """
        pass


    def update(self):
        ""
        Update user in db
        """
        pass


    def delete(self):
        """
        Delete user in db
        """
        pass

```

There is something missing from this code and it is letting the whyql code
that glues everything together and exposes the interfaces. It would be a simple
class where you register the objects and actions that will be exposed. When a request to `/query/` comes through, the json is processed and the `action` gets called for the given `object (if the action is registered.)


## Downsides

I think this is too close to what an RPC is. Sure I'm not inventing anything new here. Or if this is better than ReST in practice.
