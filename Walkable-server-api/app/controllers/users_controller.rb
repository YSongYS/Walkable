class UsersController < ApplicationController
  def create
    if params[:email]!='' && params[:user]!='' && params[:name]!=''
      @user = User.create(user_params)
      render json:@user
    else
      render json:false
    end
  end

  def get_favorites
    @user = User.find(params[:id])
    @favorites = @user.favorites
    @favorites_ids = @favorites.map{|f| f.foursquare_id}
    render json:@favorites_ids
  end

  def authenticate
    @user = User.find_by(email: params[:email])
    if !!@user && @user.password == params[:password]
      render json:@user
    else
      render json:false
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
