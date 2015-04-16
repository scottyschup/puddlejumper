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
    desc: "Origin of human life in the Milky Way.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 1,
    protected: true
  },
  {
    name: :Abydos,
    alias: "",
    gate_address: "27-7-15-32-12-30",
    desc: "Closest planet to Earth in the SG network. Mostly desert, but the food is great!",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 2,
    protected: false
  },
  {
    name: :Chulak,
    alias: "Jaffa Homeworld",
    gate_address: "9-2-23-15-37-20",
    desc: "Birthplace of Teal'c, current Leader of the Free Jaffa.",
    galaxy: "Milky Way",
    race: "Jaffa",
    clearance: 2,
    protected: true
  },
  {
    name: :"Nox Homeworld",
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
    desc: "Home of the Tollan, an advanced people who refuse to share technology with less developed planets for fear that they will use it to destroy themselves.",
    galaxy: "Milky Way",
    race: "Tollan",
    clearance: 2,
    protected: true
  },
  {
    name: :Cimmeria,
    alias: "Sumeria",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Less technologically advanced planet under Asgard protection. Home of the famed Thor's Hammer.",
    galaxy: "Milky Way",
    race: "Human",
    clearance: 3,
    protected: true
  },
  {
    name: :"P3W-451",
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
    desc: "Homeworld of the Reetou, a scary looking species that is able to cloak itself naturally. They are mostly unhostile toward humans, unless provoked.",
    galaxy: "Milky Way",
    race: "Reetou",
    clearance: 3,
    protected: true
  },
  {
    name: :Tartarus,
    alias: "Hell",
    gate_address: "33-28-23-26-16-31",
    desc: "Fiery hell-like Goa'uld planet formerly ruled by Sokar. Air is unsafe for prolonged periods of time.",
    galaxy: "Milky Way",
    race: "Goa'uld",
    clearance: 7,
    protected: false
  },
  {
    name: :Kheb,
    alias: "Planet of Enlightenment",
    gate_address: "26-35-6-8-23-14",
    desc: "Home of the Temple of Oma Desala. When the mind is enlightened, the spirit is freed and the body matters not. Travel here to release your burden.",
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
    name: :"P4X-650",
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
    name: :"P3X-888",
    alias: "Unas Homeworld",
    gate_address: Array.new(6) { rand(2..39) }.join('-'),
    desc: "Unas homeworld and original Goa'uld birthplace.",
    galaxy: "Milky Way",
    race: "Unas",
    clearance: 5,
    protected: false
  },
  {
    name: :"P9G-844",
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
end_time = time + 1.month
earth = planets.shift
planets.select { |planet| planet.clearance < 7 }

until time >= end_time

  planets.each do |planet|
    Trip.create(
      origin_id: earth.id,
      destination_id: planet.id,
      remaining_space: rand(20),
      datetime: time.strftime("%Y-%m-%d %H:%M:%S")
    )
    time += 17.minutes

    other_planets = planets - [planet]

    Trip.create(
      origin_id: other_planets.shuffle.pop.id,
      destination_id: other_planets.sample.id,
      remaining_space: rand(20),
      datetime: time.strftime("%Y-%m-%d %H:%M:%S")
    )

    Trip.create(
      origin_id: planet.id,
      destination_id: earth.id,
      remaining_space: rand(20),
      datetime: time.strftime("%Y-%m-%d %H:%M:%S")

    )
    time += 17.minutes
  end
end

# Users
users = [
  { name: "Jack O'Neill", clearance: 8 },
  { name: 'George Hammond', clearance: 8 },
  { name: 'Samantha Carter', clearance: 8 },
  { name: 'Daniel Jackson', clearance: 8 },
  { name: "Teal'c", clearance: 8 },
  { name: 'Jacob Carter', clearance: 8 },
  { name: 'Rodney McKay', clearance: 8 },
  { name: 'Cameron Mitchell', clearance: 8 },
  { name: 'Jonas Quinn', clearance: 8 },
  { name: 'Janet Fraiser', clearance: 7 },
  { name: 'Hank Landry', clearance: 8 },
  { name: "Bra'tac", clearance: 7 },
  { name: 'John Sheppard', clearance: 8 },
  { name: 'Elizabeth Weir', clearance: 8 },
  { name: 'Ronon Dex', clearance: 7 },
  { name: 'Teyla Emmagan', clearance: 7 },
  { name: 'Carson Beckett', clearance: 7 },
  { name: 'Jennifer Keller', clearance: 7 },
  { name: 'Vala Mal Doran', clearance: 5 },
  { name: 'Robert Kinsey', clearance: 5 },
  { name: 'Harry Maybourne', clearance: 6 },
  { name: 'Scott Schupbach', clearance: 8 }
]

users.each do |user|
  User.create(
    name: user[:name],
    email: "#{user[:name].gsub(/[\s\']/, '').downcase}@stargate-command.gov",
    password_digest: BCrypt::Password.create('password'),
    session_token: SecureRandom.urlsafe_base64,
    sgtid: SecureRandom.urlsafe_base64(10),
    clearance:  user[:clearance]
  )
end
