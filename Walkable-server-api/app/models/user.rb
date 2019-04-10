class User < ApplicationRecord
  has_many :favorites
  has_many :pins
end
