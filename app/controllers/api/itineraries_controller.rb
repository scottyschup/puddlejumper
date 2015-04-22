class Api::ItinerariesController < ApplicationController
  def create
    @itinerary = Itinerary.create(reservation_params)

    if @itinerary
      render json: @itinerary
    else
      render json: @itinerary.errors.full_messages
    end
  end

  def show
  end

  def destroy
  end

  def reservation_params
    params
      .require(:reservation)
      .permit(
        :departure_id,
        :arrival_id,
        traveler_attributes: [:name, :email, :sgtid],
        companions_attributes: [:name, :email, :sgtid]
      )
  end
end
