#
class TripSearch
  attr_reader :departures, :arrivals, :roundtrip, :num_travelers, :flex_dates,
              :origin, :destination

  def initialize(params)
    find_planets(params)
    create_date_ranges(params)
    party_size_and_trip_type(params)

    @departures = nonstop_there + one_stop_there
    @arrivals = @roundtrip ? nonstop_back + one_stop_back : []
  end

  def create_date_ranges(params)
    @depart_start = Time.zone.parse(params[:depart])
    @arrive_start = Time.zone.parse(params[:arrive])

    if params[:flex_dates] == 'true'
      @flex_dates = {
        dep: params[:depart_range].to_i,
        arr: params[:arrive_range].to_i
      }
      @depart_end = @depart_start + (params[:depart_range].to_i).days
      @arrive_end = @arrive_start + (params[:arrive_range].to_i).days
    else
      @flex_dates = {
        dep: 0,
        arr: 0
      }
      @depart_end, @arrive_end = @depart_start, @arrive_start
    end
  end

  def find_planets(params)
    @origin = Planet.where(
      'LOWER(name) = ?',
      params[:origin].downcase
    ).first

    @destination = Planet.where(
      'LOWER(name) = ?',
      params[:destination].downcase
    ).first
  end

  def nonstop_there
    @origin.departures_to(@destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      @num_travelers,
      @depart_start.to_s(:db), (@depart_end + 1.day).to_s(:db)
    ).order(:remaining_space)
  end

  def nonstop_back
    @origin.arrivals_from(@destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      @num_travelers,
      @arrive_start.to_s(:db), (@arrive_end + 1.day).to_s(:db)
    ).order(:remaining_space)
  end

  def one_stop_there
    []
  end

  def one_stop_back
    []
  end

  def party_size_and_trip_type(params)
    @num_travelers = params[:num_travelers].to_i
    @roundtrip = params[:roundtrip] == 'true' ? true : false
  end
end
