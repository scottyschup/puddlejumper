class Sgtid < ActiveRecord::Base
  before_save :default_clearance
  validates_presence_of :sgtid

  has_one :user

  def default_clearance
    self.clearance ||= 4
  end
end
