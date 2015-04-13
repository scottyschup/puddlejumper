class Api::TripsController < ApplicationController
  def index
    @trip_search = TripSearch.new(trip_params)
    render :index
  end

  def show
    @trip = Trip.find(params[:id])
  end

  private
  def trip_params
    params.require(:trip).permit(
      :origin,
      :destination,
      :num_travelers,
      :depart,
      :arrive,
      :roundtrip,
      :flex_dates,
      :depart_range,
      :arrive_range
    )
  end
end
