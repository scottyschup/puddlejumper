require 'open-uri'
require 'nokogiri'

class ImageDownloader
  def initialize(url)
    @url = url
    @stargate_url = "http://rdanderson.com/stargate/glyphs/"
  end

  def images
    @url.scrapify[:images].uniq
  end

  def download_test
    download(test_mode = true)
  end

  def download(test_mode = false)
    urls = test_mode ? self.images.first(3) : images
    success = 0

    urls.each do |image_url|
      filename = image_url.split('/')[-1]
      puts "#{image_url}: #{filename}"
      open(filename, 'wb') do |file|
        file << open(@stargate_url + filename).read
        success += 1
        puts "Success!"
      end
    end

    return success.to_s + " images downloaded!"
  end
end
