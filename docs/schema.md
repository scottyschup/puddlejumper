# Schema Information

## gates
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
address     | string    | not null, unique
planet_id   | integer   | not null

## gate_trips
column name          | data type | details
---------------------|-----------|-----------------------
id                   | integer   | not null, primary key
origin_gate_id       | integer   | not null
destination_gate_id  | integer   | not null
max_travelers        | integer   | not null
departure_time       | datetime  | not null

## gate_trip_reservations
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null
gate_trip_id  | integer   | not null

## lodging_reviews
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null
review_title  | string    | not null
review_body   | text      | not null

## lodgings
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
name               | string    | not null
planet_id          | integer   | not null
distance_from_gate | float     | not null

## planets
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null, unique
gso_3166_code | string    | not null, unique
description   | text      |
clearance     | integer   | not null

## rental_agencies
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
name         | string    | not null
planet_id    | integer   | not null

## room_rentals
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null
room_id     | integer   | not null
start_date  | datetime  | not null
end_date    | datetime  | not null

## rooms
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
lodging_id    | integer   | not null
max_occupants | integer   | not null

## ship_rentals
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
ship_id      | integer   | not null
start_date   | datetime  | not null
end_date     | datetime  | not null
user_id      | integer   | not null

## ships
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
agency_id      | integer   | not null
class          | string    | not null
description    | text      | not null
pax_capacity   | integer   | not null
cargo_capacity | integer   | not null
price          | decimal   | not null

## users
column name            | data type | details
-----------------------|-----------|-----------------------
id                     | integer   | not null, primary key
email                  | string    | not null, unique
password_digest        | string    | not null
first_name             | string    |
last_name              | string    |
sg_traveler_id         | integer   |
galactic_monetary_acct | integer   |
session_token          | string    | not null, unique
