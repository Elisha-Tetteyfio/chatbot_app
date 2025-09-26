class MessagesController < ApplicationController
  before_action :set_conversation

  def index
    render json: @conversation.messages.order(:created_at)
  end

  def create
    @message = @conversation.messages.build(message_params)
    
    if @message.save
      sleep(2)
      @conversation.messages.create(sender: 'bot', content: 'This is an AI generated response.')
      render json: @conversation.messages, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end
  
  private
    def message_params
      params.require(:message).permit(:content, :sender)
    end
    
    def set_conversation
      @conversation = Conversation.find(params[:conversation_id].to_i)
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Conversation not found" }, status: :not_found
    end
end
