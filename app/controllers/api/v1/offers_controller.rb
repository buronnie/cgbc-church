module Api::V1
  class OffersController < ApiController
    before_action :authorize_offer

    # GET /v1/offers
    def index
      render status: :ok, json: { data: Offer.all }
    end

    # GET /v1/offers/{id}
    def show
      offer = Offer.find(params[:id])
      if offer
        file_list = offer.documents.map do |doc|
          {
            uid: doc['file_uid'],
            name: doc['file_file_name'],
            link: doc.file.url,
          }
        end
        render status: :ok, json: offer.as_json.merge(file_list: file_list)
      else
        render status: :not_found, json: {}
      end
    end

    def new
      render status: :ok, json: Offer::DEFAULT_OFFER
    end

    def create
      offer = Offer.new(permitted_params)
      if offer.save
        offer.save_attachments(permitted_params) if params[:document_data].present?
        render status: :created, json: { offer: offer }
      else
        render status: :unprocessable_entity, json: { errors: offer.errors }
      end
    end

    def update
      offer = Offer.find(params[:id])
      if offer.update(permitted_params)
        offer.save_attachments(permitted_params)
        render status: :ok, json: { offer: offer }
      else
        render status: :unprocessable_entity, json: { errors: offer.errors }
      end
    end

    private

    def permitted_params
      params.permit(:id, :contributor, :amount, :offer_type,
                    :offered_at, :note, document_data: [:uid, :url, :name])
    end

    def authorize_offer
      authorize Offer
    end
  end
end