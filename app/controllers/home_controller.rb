class HomeController < ApplicationController
  def index
    render status: :ok, json: { text: 'cool' }
  end
end