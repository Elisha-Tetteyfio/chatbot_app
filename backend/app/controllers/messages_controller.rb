class MessagesController < ApplicationController
  before_action :set_conversation

  def index
    @messages = Message.all

    render json: @messages
  end

  def create
    @message = @conversation.messages.build(message_params)
    
    if @message.save
      render json: @conversation, include: :messages, status: :created
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
