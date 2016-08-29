#!/usr/bin/env ruby

require 'fileutils'

screenshots = Dir['screenshots/*.png'].sort do |a, b|
  time = File.mtime(a) <=> File.mtime(b)
  if time.zero?
    a <=> b
  else
    time
  end
end

force = ENV.fetch('FORCE', false) == '1'
screenshots.each_with_index do |screenshot, i|
  index = "%.3d" % i
  dirname = File.dirname(screenshot)
  target = "#{dirname}/#{index}.png"
  puts "#{screenshot} -> #{target}"
  FileUtils.mv(screenshot, target, noop: !force)
end

if !force
  puts 'Run with FORCE=1 to actually mutate the filesystem'
end
