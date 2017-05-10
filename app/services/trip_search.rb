#
class TripSearch
  def initialize(params)
    @params = params
    create_date_ranges
  end

  def arrivals
    @arrivals ||= lookup_arrivals
  end

  def departures
    @departures ||= origin.departures_to(destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      num_travelers,
      @depart_start.to_s(:db), (@depart_end + 1.day).to_s(:db)
    ).order(:remaining_space)
  end

  def destination
    @destination ||= planet(:destination)
  end

  def flex_dates
    @flex_dates ||= {
      dep: @params[:depart_range].to_i,
      arr: roundtrip? ? @params[:arrive_range].to_i : 0
    }
  end

  def lookup_arrivals
    return [] unless roundtrip?
    origin.arrivals_from(destination).where(
      "remaining_space >= ? AND
      datetime >= ? AND
      datetime < ?",
      num_travelers,
      @arrive_start.to_s(:db), (@arrive_end + 1.day).to_s(:db)
    ).order(:remaining_space)
  end

  def num_travelers
    @num_travelers ||= @params[:num_travelers].to_i
  end

  def origin
    @origin ||= planet(:origin)
  end

  def roundtrip?
    @params[:roundtrip] == 'true'
  end

  private

  def create_date_ranges
    @depart_start = Time.zone.parse(@params[:depart])
    @depart_end = @depart_start + flex_dates[:dep].days
    return unless roundtrip?
    @arrive_start = Time.zone.parse(@params[:arrive])
    @arrive_end = @arrive_start + flex_dates[:arr].days
  end

  def planet(type)
    Planet.where('LOWER(name) = ?', @params[type].downcase).first
  end
end
