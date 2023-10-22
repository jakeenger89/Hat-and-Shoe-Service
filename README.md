# Wardrobify

Team:

* Jake Enger - Hat Microservice
* Peter  - Shoe Microservice

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

hats microservcie is responsible for managing information about hats and their location. it polls from the wardrobe api to get information for location, to create location value objects, which provides the url. the locationVO represents a hat location in the wardrobe. the values included are href, loset name, section num shelf num. hatlist.js and hatform.js get information from the hats microservice api endpoints for managing that, where we can get, del, and post information.
