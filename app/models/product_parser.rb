


class ProductParser
  
  require 'active_support/all'
  require 'open-uri'
 
 def self.getImgs(url)
   html = open(url)
   doc = Nokogiri::HTML(html.read)
   doc.encoding = 'utf-8'

   arr = []
   
   doc.css('a img').each do |el|
    if  /([^\s]+(\.(?i)(jpg|png|gif|bmp))$)/ =~ el[:href]
      arr << el[:href]
    elsif el[:src] 
      arr << el[:src]
    # elsif el.text[/\$[0-9\.]+/]
   #    arr << el.text
    end
    
   end
   prices = []
   doc.css('div').each do |el|
    if el.text =~ /\$[0-9\.]+/
      prices = el.text.scan(/\$[0-9\.]+/)
 
    end
 
   end
   arr2 = []
   arr2 << [url]
   arr2 << arr 
   arr2<< prices
   arr2
  
 end
 
 
 def self.encode64(url)
   str = URI::encode(url)
   
   'data:image/jpeg;base64,' + Base64.encode64(open(str) { |io| io.read })
 end
  
end