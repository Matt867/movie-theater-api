# movie-theater-api
Movie Theater Project for Express Week Day 5

The User Router can GET ALL users from the database using the endpoint /users.


The User Router can GET one user from the database using an endpoint.
For example, /users/1 can return the first user.


The User Router can GET all the shows watched by a user using an endpoint.
For example, /users/2/shows can return all the shows for the 2nd user.


The User Router can update and add a show if a user has watched it using an endpoint.
For example, a PUT request to  /users/2/shows/9 can update the 9th show for the 2nd user.


The Show Router can GET ALL shows from the database using the endpoint /shows.


The Show Router can GET one show from the database using an endpoint.
For example, /shows/5 can return the 5th show in the database.


The Show Router can get shows of a specific genre using an endpoint.
For example, /shows/genres/Comedy should return all shows with a genre of Comedy.


The Show Router can update a rating on a specific show using an endpoint.


The Show Router can update the status on a specific show from “canceled” to “on-going” or vice versa using an endpoint.
For example, a PUT request with the endpoint /shows/3/updates should be able to update the 3rd show to “canceled” or “on-going”.
