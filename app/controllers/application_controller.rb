class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    render status: :unauthorized, json: { errors: 'You have no permission to access this resource' }
  end
end
