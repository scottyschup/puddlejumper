json.array! @search_results.departures do |departure|
  if @search_results.roundtrip
    json.array! @search_results.arrivals do |arrival|
      json.(departure, :id, :remaining_space, :trip_time)
      json.(arrival, :id, :remaining_space, :trip_time)
    end
  else
    json.(arrival, :id, :remaining_space, :trip_time)
  end
end
