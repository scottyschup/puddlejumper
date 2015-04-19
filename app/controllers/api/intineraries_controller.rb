class Api::IntinerariesController < ApplicationController
  def create
    @itinerary
  end

  def show
  end

  def destroy
  end

  def res_params
    params.permit[:res]
  end
end
