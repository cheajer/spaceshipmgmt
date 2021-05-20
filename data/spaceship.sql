create table Location (
    id int auto_increment,
    City varchar(100) not null,
    Planet varchar(100) not null,
    Capacity int not null,
    primary key (id)
);


create table Spaceship (
    id int auto_increment,
    locatedAt int,
    Name varchar(100),
    Model varchar(100),
    Status varchar(100),
    primary key (id),
    foreign key (locatedAt) references Location (id)
);

--Starter variables for testing
insert into Location values (0, "Swordbase", "Reach", "5");
insert into Location values (0, "Sydney", "Earth", "5");
insert into Spaceship values (0, 1, "Pelican", "UNSC-1", "operational");
insert into Spaceship values (0, 1, "Trafalgar", "UNSC-2", "operational");




