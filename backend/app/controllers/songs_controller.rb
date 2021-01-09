class SongsController < ApplicationController
  def index
    @songs = Song.all
    render json: @songs
  end

  def create
    @song = Song.create(title: params[:song])
    render json: @song
  end

  def update
    @song = Song.find(params[:id])
    @song.update_attributes(title: params[:song])
    render json: @song
  end

  def destroy
    @song = Song.find(params[:id])
    if @song.destroy
      head :no_content, status: :ok # head: HTTPヘッダーのみで構成されたレスポンスを作成してブラウザに送信する
    else
      render json: @song.errors, status: :unprocessable_entity # status: 処理できないエンティティ
    end
  end
end
