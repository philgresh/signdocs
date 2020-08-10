## Frontend Routes
Our components are organized as follows:
+ `Root`
  + `App`
    + `NavBar`
    + (main component goes here)
    + `Footer`

The following routes, defined in `App`, will render components between `NavBar` and `Footer`.

+ `/`
  + `Splash`
+ `/login`
  + `SessionForm`
+ `/signup`
  + `SessionForm`
+ `/users/:userId`
  + `ProfileComponent`
+ `/doc/new`
  + `DocForm`
+ `/doc/:docId`
  + `DocShow`
+ `/doc/:docId/edit`
  + `DocForm`