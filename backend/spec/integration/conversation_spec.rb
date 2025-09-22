require 'swagger_helper'

RSpec.describe 'conversations', type: :request do
  path '/conversations' do
    get('list conversations') do
      tags 'Conversations'
      produces 'application/json'

      response(200, 'successful') do
        run_test!
      end
    end

    post('create conversation') do
      tags 'Conversations'
      consumes 'application/json'
      parameter name: :conversation, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string }
        },
        required: []
      }

      response(201, 'created') do
        let(:conversation) { { title: 'Support' } }
        run_test!
      end
    end
  end
end
