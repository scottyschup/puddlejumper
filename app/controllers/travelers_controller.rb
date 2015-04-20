class TravelersController < ApplicationController
  def new; end

  def create
    debugger
    @traveler = Traveler.where(name: traveler_params[:name]).first_or_create
    if @traveler.update(traveler_params)
      render json: @traveler
    else
      render json: { errors: @traveler.errors.full_messages }
    end
  end

  private

  def traveler_params
    params
      .require(:traveler)
      .permit(:name, :email, :sgtid, :clearance)
  end
end
