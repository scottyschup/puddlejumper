class Api::TripsController < ApplicationController # TripResultsController
  def index
    @trip_search = TripSearch.new(trip_params)
    render :index
  end

  private
  def trip_params
    params.require(:trip).permit(
      :origin,
      :destination,
      :num_travelers,
      :depart,
      :return,
      :roundtrip
    )
  end
end
