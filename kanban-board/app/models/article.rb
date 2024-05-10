class Article < ApplicationRecord
  def self.ransackable_associations(auth_object = nil)
    []
  end
  
  def self.ransackable_attributes(auth_object = nil)
    ['keyword']
  end
end
