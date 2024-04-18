class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :lockable
  has_many :projects
  has_many :tasks, foreign_key: :assignee_id
end