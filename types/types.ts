/*
    Custom Type: Spaceship
    Used to add spaceship rows to DBMS
*/
export interface Spaceship {
    locatedAt: number,
    Name: string,
    Model: string,
    Status: string
}

/*
    Custom Type: Location
    Used to add location rows to DBMS
*/
export interface Location {
    City: string,
    Planet: string,
    Capacity: number
}