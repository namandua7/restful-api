class Api::V1::BlogsController < ApplicationController

  def create
    @blog = Blog.new(blog_params)
    if @blog.save
      render json: @blog, status: :created
    else
      render json: @blog.errors, status: :unprocessable_entity
    end
  end
  
  def search
    query = params[:query]
    words = query.split
    sphinx_query = words.map { |word| "#{word}*" }.join(' ')
    @results = Blog.search(sphinx_query)
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :description, :published, :author)
  end

end
