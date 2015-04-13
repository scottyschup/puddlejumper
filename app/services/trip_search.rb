#
class TripSearch
  attr_reader :departures, :arrivals, :roundtrip, :num_travelers, :flex_dates

  def initialize(params)
    @origin = Planet.find_by(name: params[:origin])
    @destination = Planet.find_by(name: params[:destination])

    @depart_start = Time.zone.parse(params[:depart])
    @arrive_start = Time.zone.parse(params[:arrive])

    if params[:flex_dates] == 'true'
      @flex_dates = {
        dep: params[:depart_range],
        arr: params[:arrive_range]
      }
      @depart_end = @depart_start + (params[:depart_range].to_i).days
      @arrive_end = @arrive_start + (params[:arrive_range].to_i).days
    else
      @flex_dates = {
        departure: 0,
        arrival:   0
      }
      @depart_end, @arrive_end = @depart_start, @arrive_start
    end

    @num_travelers = params[:num_travelers]
    @roundtrip = params[:roundtrip]

    @departures = nonstop_there + one_stop_there
    @arrivals = @roundtrip ? nonstop_back + one_stop_back : []
  end

  def nonstop_there
    @origin.departures_to(@destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      @num_travelers,
      @depart_start.to_s(:db), (@depart_end + 1.day).to_s(:db)
    )
  end

  def nonstop_back
    @origin.arrivals_from(@destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      @num_travelers,
      @arrive_start.to_s(:db), (@arrive_end + 1.day).to_s(:db)
    )
  end

  def one_stop_there
    []
  end

  def one_stop_back
    []
  end
end
