class Api::V1::ProjectsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @projects = @user.projects.all
    render json: @projects
  end

  def show
    @project = Project.find(params[:id])
    render json: @project
  end

  def create
    project = Project.new(project_params)
    if project.save
      render json: project, status: :created
    else
      render json: { error: project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project, status: :ok
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render json: { message: 'Project deleted successfully' }
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :tasks_count, :user_id)
  end

end