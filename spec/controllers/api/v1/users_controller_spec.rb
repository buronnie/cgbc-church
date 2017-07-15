require 'rails_helper'

describe Api::V1::UsersController do

  describe 'GET #show' do

    before do
      @user = create :user
      auth_headers = @user.create_new_auth_token
      request.headers.merge!(auth_headers)
      get :show, params: { id: @user.id }
    end

    it 'responds with 200 status code' do
      expect(response.code).to eq('200')
    end

    it 'returns the serialized user attributes' do
      expect(JSON.parse(response.body)['data']['attributes']).to eq({'name'=>'John Doe', 'email'=>'test@test.com'})
    end

  end

  describe 'GET #index' do

    before(:each) do
      @user = create :user
      auth_headers = @user.create_new_auth_token
      request.headers.merge!(auth_headers)
      get :index
    end

    it 'responds with 200 status code' do
      expect(response.code).to eq('200')
    end

    it 'returns the serialized user attributes' do
      expect(JSON.parse(response.body)['data'].length).to eq(1)
      expect(JSON.parse(response.body)['data'].first['attributes']).to eq({'name'=>'John Doe', 'email'=>'test@test.com'})
    end

  end

end