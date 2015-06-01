class TravelersController < ApplicationController
  def new; end

  def create
    @traveler = Traveler.new(traveler_params)

    if @traveler.save
      sign_in!(@traveler)
      redirect_to root_url
    else
      flash.now[:errors] = @traveler.errors.full_messages
      render :new
    end
  end

  private

  def traveler_params
    params
      .require(:traveler)
      .permit(:email, :password, :stgid, :clearance, :password)
  end
end
