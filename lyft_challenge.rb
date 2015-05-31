# Calculate the detour distance between two different rides. Given four latitude / longitude pairs, where driver one is traveling from point A to point B and driver two is traveling from point C to point D, write a function (in your language of choice) to calculate the shorter of the detour distances the drivers would need to take to pick-up and drop-off the other driver.

def shorter_detour(point_a, point_b, point_c, point_d)
  trip_one = distance_between(point_a, point_b)
  trip_two = distance_between(point_c, point_d)

  detour_one = distance_between(point_a, point_c) +
               trip_two +
               distance_between(point_d, point_b) +
  detour_two = distance_between(point_c, point_a)
end

def distance_between(start, finish)
  # for now, assume simple grid
  (start[0] - finsih[0]).abs + (start[1] - finish[1]).abs
end
