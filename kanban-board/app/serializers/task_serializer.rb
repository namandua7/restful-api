class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :updated_at, :board_id, :created_by, :deadline
end
