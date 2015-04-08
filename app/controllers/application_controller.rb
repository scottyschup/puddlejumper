class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def tmp_root
    render "layouts/tmp_root"
  end
end
