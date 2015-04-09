@planets.array! do |planet|
  json.(planet, :id, :name, :desc, :galaxy, :clearance, :gate_address, :alias)
end
