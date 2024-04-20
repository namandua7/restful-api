class Project < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :tasks, through: :boards
  attribute :tasks_count, :integer, default: 0
end
