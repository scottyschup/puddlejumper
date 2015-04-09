class Api::TripsController < ApplicationController
  def index
    @search_results = TripSearch.new(params)
    render :index
  end

  private
  def trip_params
    params.require(:trip).permit(
      :origin_id,
      :destination_id,
      :num_travelers,
      :departure_date,
      :return_date,
      :roundtrip
    )
  end
end
