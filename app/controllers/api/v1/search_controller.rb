class Api::V1::SearchController < ApplicationController
  def posts
    @posts = Post.where("title ILIKE ? OR body ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%" ).order(created_at: :desc)

    posts_with_images = @posts.map do |post|
      if post.image.attached?
        post.as_json.merge(image_url: url_for(post.image))
      else
        post.as_json.merge(image_url: nil)
      end
    end
    
    render json: posts_with_images    
  end
end
