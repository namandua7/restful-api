class Api::V1::BoardsController < ApplicationController

  def index
    project = Project.find(params[:project_id])
    @boards = project.boards.all
    render json: @boards
  end

  def show
    @board = Board.find(params[:id])
    render json: @board, includes: [:tasks]
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render json: @board, status: :created
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      render json: @board, status: :ok
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  private

  def board_params
    params.require(:board).permit(:status, :description, :project_id)
  end
  
end