class BoardSerializer < ActiveModel::Serializer
  attributes :id, :status, :description
  has_many :tasks
end
