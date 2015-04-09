class Api::TripsController < ApplicationController
  def index
    if params[:trip].nil?
      render json: params
    else
      @search_results = TripSearch.new(trip_params)
      render :index
    end
  end

  private
  def trip_params
    debugger
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
