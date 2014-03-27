class Search
  
  
  def self.run(string)
    string.downcase!
    reg = Regexp.new(string)
    result = []
    arr = User.select([:id, :email]).map { |i| {id: i.id, email: i.email} }
    p arr
    arr.each do |el|
      if el[:email] =~ reg
        result << el
      end
    end
    result
  end
  
end