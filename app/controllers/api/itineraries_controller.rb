class Api::ItinerariesController < ApplicationController
  def create

    @itinerary = Itinerary.create(reservation_params)
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
        traveler_attrs: [:name, :email, :sgtid],
        companion_attrs: [:name, :email, :sgtid]
      )
  end
end
