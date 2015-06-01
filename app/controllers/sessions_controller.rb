class SessionsController < ApplicationController
  def new
  end

  def create
    @traveler = Traveler.find_by_credentials(params[:traveler])

    if @traveler
      sign_in!(@traveler)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end
end
