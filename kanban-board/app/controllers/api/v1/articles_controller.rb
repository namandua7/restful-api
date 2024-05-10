class Api::V1::ArticlesController < ApplicationController

  def create
    @article = Article.new(article_params)
    if @article.save
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def search
    @q = Article.ransack(keyword_i_cont_any: params[:q])
    @articles = @q.result(distinct: true)
    render json: @articles
  end

  private

  def article_params
    params.require(:article).permit(:title, :desciption, :keyword)
  end

end
