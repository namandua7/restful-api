class Task < ApplicationRecord
  belongs_to :board
  belongs_to :assignee, class_name: "User", optional: true
end
