# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

home = Planet.create(
  name: "Earth",
  desc: "Origin of human life in the Milky Way. Also known as Tauri.",
  galaxy: "Milky Way",
  clearance: 1,
  protected: true,
  race: "Human"
)
