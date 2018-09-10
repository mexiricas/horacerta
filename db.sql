create table users (
    username varchar(50) not null primary key,
    password varchar(120) not null,
    enabled boolean not null
);

create table authorities (
    username varchar(50) not null,
    authority varchar(50) not null,
    foreign key (username) references users (username)
);

insert into users(username, password, enabled)values('admin','admin@123',true);
insert into authorities(username,authority)values('admin','ROLE_ADMIN');
insert into pessoa (id,cargo,data_registro,nome) values (1,'Testador',now(),'Testolino Testadorzao')
 