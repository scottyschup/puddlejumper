class Api::TravelersController < ApplicationController
  def show
    @traveler = Traveler.where(name: traveler_params[:name]).first_or_create
    @traveler.update(traveler_params)

    render json: @traveler
  end

  private

  def traveler_params
    params.require(:traveler).permit(:name, :email, :sgtid)
  end
end
