class Api::ItinerariesController < ApplicationController
  def create
    @itinerary = Itinerary.new(reservation_params)
    if @itinerary.save
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
    remove_blanks!(params[:reservation])

    params
      .require(:reservation)
      .permit(
        :departure_id,
        :arrival_id,
        traveler_attributes: [:name, :email, :sgtid],
        companions_attributes: [:name, :email, :sgtid]
      )
  end

  def remove_blanks!(hsh)
    hsh.reject! do |key, val|
      remove_blanks!(val) if val.is_a? Hash
      val.to_s.empty?
    end
  end
end
