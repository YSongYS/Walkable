class PinsController < ApplicationController

  def create
    @pin=Pin.create(pin_params)
    render json:@pin
  end

  def delete
    @pin=Pin.find(params[:id])
    if !!@pin
      @pin.destroy
      render json:true
    else
      render json:false
    end
  end

  private
  def pin_params
    params.require(:pin).permit(:user_id, :title, :description, :longitude, :latitude)
  end

end
