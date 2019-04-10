class UsersController < ApplicationController
  def create
    if params[:email]!='' && params[:user]!='' && params[:name]!=''
      @user = User.create(user_params)
      render json:@user
    else
      render json:false
    end
  end

  def authenticate
    @user = User.find_by(email: params[:email])
    if !!@user && @user.password == params[:password]
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

  def get_pins
    @user = User.find(params[:id])
    @pins = @user.pins
    render json:@pins
  end

  def add_favorites
    @favorite = Favorite.create(user_id: params[:user_id], foursquare_id: params[:foursquare_id])
    render json:@favorite
  end

  def delete_favorites
    @favorite = Favorite.find_by(user_id: params[:user_id], foursquare_id: params[:foursquare_id])
    @favorite.destroy
    render json:true
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
