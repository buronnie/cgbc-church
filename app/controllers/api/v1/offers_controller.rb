module Api::V1
  class OffersController < ApiController

    # GET /v1/offers
    def index
      render json: Offer.all
    end

    # GET /v1/offers/{id}
    def show
      render json: Offer.find(params[:id])
    end

    def create
      offer = Offer.new(permitted_params)
      if offer.valid?
        offer.save
        render status: 200, json: {}
      else
        render status: 422, json: { errors: offer.errors }
      end
    end

    private

    def permitted_params
      params.require(:offer).permit(:contributor, :amount, :offer_type, :offered_at, :note)
    end

  end
end