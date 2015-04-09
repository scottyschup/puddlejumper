# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

planets = Planet.create(
  [{
    name: :Earth,
    alias: "Tauri",
    gate_address: "28-26-5-36-11-29",
    desc: "Origin of human life in the Milky Way. Also known as Tauri.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 1,
    protected: true
  },
  {
    name: :Abydos,
    alias: "",
    gate_address: "27-7-15-32-12-30",
    desc: "Closest planet to Earth in the SG network. Mostly desert.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 2,
    protected: false
  },
  {
    name: :Chulak,
    alias: "Jaffa Homeworld",
    gate_address: "9-2-23-15-37-20",
    desc: "Origin of human life in the Milky Way. Also known as Tauri.",
    galaxy: "Milky Way",
    race: "Jaffa",
    clearance: 2,
    protected: true
  },
  {
    name: :Nox_Homeworld,
    alias: "Noxworld",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Home to a magical race that are extremely advanced but live simply and keep to themselves.",
    galaxy: "Milky Way",
    race: "Nox",
    clearance: 2,
    protected: true
  },
  {
    name: :Tollana,
    alias: "New Tollan",
    gate_address: "4-29-8-22-18-25",
    desc: "Home of the Tollan, an advanced people who refuse to share technology with less developed planets for fear that they will destroy themselves.",
    galaxy: "Milky Way",
    race: "Tollan",
    clearance: 2,
    protected: true
  },
  {
    name: :Cimmeria,
    alias: "Sumeria",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Asgard protected planet and home of Thor's Hammer.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 3,
    protected: true
  },
  {
    name: :P3W451,
    alias: "Black hole planet",
    gate_address: "19-8-4-37-26-16",
    desc: "Very near to a black hole. Unvisitable.",
    galaxy: "Milky Way",
    race: nil,
    clearance: 8,
    protected: false
  },
  {
    name: :Reetalia,
    alias: "Reetou Homeworld",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Homeworld of the Reetou, a scary looking species that is able to cloak itself naturally. They are mostly unhostile toward humans.",
    galaxy: "Milky Way",
    race: "Reetou",
    clearance: 3,
    protected: true
  },
  {
    name: :Tartarus,
    alias: "Hell",
    gate_address: "33-28-23-26-16-31",
    desc: "Fiery hell-like Goa'uld planet ruled by Sokar.",
    galaxy: "Milky Way",
    race: "Goa'uld",
    clearance: 7,
    protected: false
  },
  {
    name: :Kheb,
    alias: "Planet of Enlightenment",
    gate_address: "26-35-6-8-23-14",
    desc: "Home of the Temple of Oma Desala.",
    galaxy: "Milky Way",
    race: "Ancient",
    clearance: 3,
    protected: true
  },
  {
    name: :Atlantis,
    alias: "Home of the Ancients",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Earth outpost in the Pegasus Galaxy.",
    galaxy: "Pegasus",
    race: "Human",
    clearance: 6,
    protected: false
  },
  {
    name: :P4X650,
    alias: "Alpha Site",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Current Earth alpha site.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 5,
    protected: true
  },
  {
    name: :Dakkara,
    alias: "Jaffa Capitol",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Capitol of the Free Jaffa.",
    galaxy: "Milky Way",
    race: "Jaffa",
    clearance: 2,
    protected: true
  },
  {
    name: :P3X888,
    alias: "Unas Homeworld",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Unas homeworld and original Goa'uld birthplace.",
    galaxy: "Milky Way",
    race: "Unas",
    clearance: 5,
    protected: false
  },
  {
    name: :P9G844,
    alias: "Sodan Homeworld",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Homeworld of the Sodan warriors.",
    galaxy: "Milky Way",
    race: "Jaffa",
    clearance: 3,
    protected: false
  }]
)

# earth based trips
time = Time.now
end_time = time + 2.months
earth = planets.shift
planets.select { |planet| planet.clearance < 7 }

until time >= end_time

  planets.each do |planet|
    Trip.create(
      origin_id: earth.id,
      destination_id: planet.id,
      remaining_space: rand(20),
      trip_date: time.strftime("%Y-%m-%d"),
      trip_time: time.strftime("%H:%M:%S")
    )
    time += 33.minutes

    other_planets = planets - [planet]

    Trip.create(
      origin_id: other_planets.shuffle.pop.id,
      destination_id: other_planets.sample.id,
      remaining_space: rand(20),
      trip_date: time.strftime("%Y-%m-%d"),
      trip_time: time.strftime("%H:%M:%S")
    )

    Trip.create(
      origin_id: planet.id,
      destination_id: earth.id,
      remaining_space: rand(20),
      trip_date: time.strftime("%Y-%m-%d"),
      trip_time: time.strftime("%H:%M:%S")
    )
    time += 33.minutes
  end
end
