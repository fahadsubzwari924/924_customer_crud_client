# Customer Management Application

# Application functional requirements:
-	User able to see customers list as a grid on customers listing page.
-	User able to add new customer from listing page.
-	User able to edit any existing customer from the customer’s grid.
-	User able to remove any existing customer from the customer’s grid.
-	User able to sort customers by name or date created.


#  Prerequisites to run the application
-	`Docker` should be installed on the system.
-	Both `client` and `server` repos should be clone in a same folder side by side like this folder structure 

/customersApplication  /* root folder having client and server repos */

```
│--- client
|     |
│     │---client   
│     |--- server
└──   └──  
```


#  Cloning the repos
To `clone` customer application server application run this command
`git clone https://github.com/fahadsubzwari924/924_customers_crud_server.git`

To `clone` customer client application run this command
`'it clone https://github.com/fahadsubzwari924/924_customer_crud_client.git`

# Install depencies
-	Navigate to the folder `924_customer_crud_client` using this command `cd 924_customer _crud_client`
-	Run `npm install` to get all dependencies. Make sure your internet connection is up n running.


# Running the app locally on dev environment via Docker
For running the whole application you just have to navigate to the `924_customer_crud_server` folder`(coned repo folder)` and follow below instructions:
-	Make sure `docker` service is up n running. 
-	Run this command `docker-compose up`
-	It will start whole application e. `front-end` , `back-end`, database (mongoose) in one go and now you can access the application in browser `http://localhost:4200`

# Validations Implemented (Create Customer, Update Customer)
-	In create customer form name field is mandatory.
-	In create customer form email field is mandatory and must be a valid email
-	Create button will be disabled until all validation errors will be removed.

# Unit Test 
Unit tests are only implemented in front-end application.



#  Project structure

```
\---src
    |   
    |---app  /* whole application lives here */
    |   |   app-routing.module.ts
    |   |   app.component.html
    |   |   app.component.scss
    |   |   app.component.spec.ts
    |   |   app.component.ts
    |   |   app.module.ts
    |   |   
    |   |---core /* all stuff required to instantiate the project */
    |   |   |   core.module.ts
    |   |   |   
    |   |   |---components
    |   |   |   |---footer
    |   |   |   |       footer.component.html
    |   |   |   |       footer.component.scss
    |   |   |   |       footer.component.ts
    |   |   |   |       
    |   |   |   |---header
    |   |   |           header.component.html
    |   |   |           header.component.scss
    |   |   |           header.component.spec.ts
    |   |   |           header.component.ts
    |   |   |           
    |   |   |---constants /* contains global constants used in whole app */
    |   |   |       api.constants.ts
    |   |   |       forms.constants.ts
    |   |   |       global.constants.ts
    |   |   |       mock-data.constants.ts
    |   |   |       
    |   |   |---interceptors /* global interceptors for http requests */
    |   |   |       http-error.interceptor.ts
    |   |   |       loader.interceptor.ts
    |   |   |       
    |   |   |---services /* having common services used in whole app */
    |   |           customers.service.ts
    |   |           http.service.ts
    |   |           testing-helper.service.ts
    |   |           util.service.spec.ts
    |   |           util.service.ts
    |   |           
    |   |---modules /* contains modules based on entities */
    |   |   |---customers
    |   |   |   |   customer-routing.module.ts
    |   |   |   |   customers.module.ts
    |   |   |   |   
    |   |   |   |---create
    |   |   |   |       create.component.html
    |   |   |   |       create.component.scss
    |   |   |   |       create.component.spec.ts
    |   |   |   |       create.component.ts
    |   |   |   |       
    |   |   |   |---list
    |   |   |           list.component.html
    |   |   |           list.component.scss
    |   |   |           list.component.spec.ts
    |   |   |           list.component.ts
    |   |   |           
    |   |   |---mock-dependecies
    |   |           mock-dependencies.module.ts
    |   |           
    |   |---shared /* contains stuff that will be re-used in multiple places */
    |       +---components
    |       \---models
    |               customer.model.ts
    |               
    |---assets /* contain all external assets */
    |   |   .gitkeep
    |   |   
    |   |---scss
    |           font.scss
    |           theme.scss
    |           variables.scss
    |           
    |---environments 
            environment.prod.ts
            environment.ts

```

# Technology used in server application
-	Angular framework.
-	MDB Bootstrap UI Suit
-	Docker for containerization
-	No CI/CD implemented in front-end
- Karma, Jasmin for unit testing


# Note
While running the whole application for the first time, it may take few minutes upto 8-10mins(maximum) due to following reasons

-	It will pull the `nodejs` image from docker-hub and start that service.
-	It will pull `mongoDb` image from docker-hub and configure, start the mongo service.
-	It will make connection between 2 containers i.e `mongo` and 'node' to work properly.

