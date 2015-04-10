json.departures @trip_search.departures
json.arrivals @trip_search.arrivals if @trip_search.roundtrip
json.(@trip_search, :clearance, :roundtrip)
