class Conversation < ApplicationRecord
  has_many :messages, -> { order(created_at: :desc) }, dependent: :destroy
  after_create :set_default_title

  private

  def set_default_title
    if title.blank?
      update_column(:title, "Conversation #{id}")
    end
  end
end
