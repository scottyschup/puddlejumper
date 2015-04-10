class Api::PlanetsController < ApplicationController
  def index
    @planets = Planet.all
  end
end
