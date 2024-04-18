class Project < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :tasks, through: :boards
end
