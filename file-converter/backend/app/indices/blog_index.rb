ThinkingSphinx::Index.define :blog, with: :active_record do
  indexes title, sortable: true
  indexes description
  indexes author

  has published
end
