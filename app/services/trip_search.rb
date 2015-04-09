class TripSearch
  attr_accessor :departures, :returns, :roundtrip
  def initialize(params)
    @origin = Planet.find_by(name: params[:origin])
    @destination = Planet.find_by(name: params[:destination])
    @depart = params[:depart]
    @arrive = params[:return]
    @num_travelers = params[:num_travelers]
    @roundtrip = params[:roundtrip]

    @departures = nonstop_there + one_stop_there
    @arrivals = nonstop_back + one_stop_back
  end

  def nonstop_there
    @origin.departures_to(@destination).where(
      "trip_date = ? AND
      remaining_space >= ?",
      @depart,
      @num_travelers
    )
  end

  def nonstop_back
    @origin.arrivals_from(@destination).where(
      "trip_date = ? AND
      remaining_space >= ?",
      @return,
      @num_travelers
    )
  end

  def one_stop_there
    []
  end

  def one_stop_back
    []
  end
end
