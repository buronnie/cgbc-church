Devise.setup do |config|
  # Using rails-api, tell devise to not use ActionDispatch::Flash
  # middleware b/c rails-api does not include it.
  config.navigational_formats = [:json]
  config.secret_key = ENV[‘DEVISE_SECRET_KEY’]
end