# spaceshipmgmt
A RESTful API for managing spaceships.

Spaceship Database API
A simple REST API that deals with the management and creation of hypothetical spaceships and hypothetical locations.

Methods
/spaceship
/spaceship/create - POST
Create a new spaceship with required parameters, name, model, location ID and status. Status has to be either decommissioned, operational or maintenance.

Example POST Object:
{
    'Name': 'Trafalgar,
    'Model': 'UNSC-2',
    'locatedAt': 1
    'Status': 'operational
}

/spaceship/update - PUT
Update a spaceship's status to operational, maintenance or decommissioned.

Example PUT Object:
{
    'spaceship': 1,
    'status': 'decommissioned'
}

/spaceship/remove - DELETE
Remove a spaceship from the database. Must provide ID of spaceship to be removed.

Example DELETE Object:
{
    'id': 1
}

/spaceship/travel - PUT
Update a spaceship's location to signify their new location. User to provide ID of spaceship to be moved, and ID of destination location.

Example PUT Object:
{
    'spaceship': 1,
    'location': 2
}

/location
/location/create - POST
Create a new location with required parameters, city, planet, and max capacity of ships allowed at location.

Example POST Object:
{
    'City': 'Sydney,
    'Planet': 'Earth',
    'Capacity': 1
}

/location/remove - DELETE
Remove a location from the database. Must provide ID of location to be removed.

Example DELETE Object:
{
    'id': 1
}
