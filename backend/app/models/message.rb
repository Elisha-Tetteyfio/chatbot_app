class Message < ApplicationRecord
  enum :sender, user: "user", bot: "bot"
  belongs_to :conversation

  before_validation :set_sender, on: :create
  validates :sender, presence: true

  private

  def set_sender
    self.sender = :bot if sender.blank?
  end
end
