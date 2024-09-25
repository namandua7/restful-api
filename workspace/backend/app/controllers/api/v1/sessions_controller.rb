class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_for_database_authentication(email: params[:email])
    if user && user.valid_password?(params[:password])
      sign_in user
      render json: { user: user }
    else
      render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out current_user
    render json: { message: 'Logged out successfully' }
  end
end