class Api::IntinerariesController < ApplicationController
  def create
    @itinerary = Itinerary.new(itinerary_params)
  end

  def show
  end

  def destroy
  end

  def itinerary_params
    params
      .require(:itinerary)
      .permit(
        traveler_attributes: [:name, :email, :sgtid],
        trips_attributes: [:id],
        travelers_attributes: [:name, :eamil, :sgtid]
      )
  end
end
