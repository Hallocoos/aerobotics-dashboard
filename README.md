# Aerobotics Dashboard

# How To:
## Commands
  * `make fresh` - Do a clean npm install.
  * `make/make start` - Start the Application.
  * `make lint` - Ensure is following linting standards.
  * `make fix` - Fix specific linting issues.
  * `make test` - Run Jest testing suite.
  * `make update` - Update test snapshots.

## Project Specifications
### Overview
In this assignment you will need to build a simple web app to display a dashboard of tree
survey data. To accomplish this, you will be given access to the Aerobotics API which will
provide information about the different data types.

Your submission will be evaluated on both code quality and overall UI/UX. The task is meant to
be relatively open-ended so please take the initiative to design and build the app to the best of
your ability.

### The Task
Develop a Web Application

Build a single page web app that displays a table and histogram of tree survey information.

Technical requirements
 - The application should be built with React JS + Typescript
 - Farms, orchards and tree surveys need to be fetched from the Aerobotics Developers
  API
  Product requirements:
 - User can view a table that includes the following columns:
 - Farm name
 - Orchard name
 - Total trees surveyed
 - Latest survey date
 - Average NDVI
 - Average NDRE
 - User can click on the NDVI field in the table to view a histogram of NDVI values
 - User can click on the NDRE field in the table to view a histogram of NDRE values
 - [Bonus] When selecting a row in the table, overlay the tree survey lat/lng coordinates as points on a map.

### Submission

On submission, please send us a link to your source code (github, gitlab, etc) as well as a few
screenshots or screen recording of the app in action.
Relevant Context
Aerobotics API
In order to build your API, you will need to have the basic information about farms and
orchards available to you. For this, you can make use of the Aerobotics API. You can navigate
the public API documentation, the link is given at the bottom of this doc.

