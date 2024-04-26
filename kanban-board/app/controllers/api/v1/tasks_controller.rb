class Api::V1::TasksController < ApplicationController

  def index
    board = Board.find(params[:board_id])
    @tasks = board.tasks.all
    render json: @tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render json: { message: 'Task deleted successfully' }
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :board_id, :created_by)
  end

end