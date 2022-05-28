require 'optparse'

require_relative 'helper'

# This script clones a template directory into a new directory for a new artwork

title = 'TEMP'

ARGV.options do |opts|
  opts.on('-t', '--title=val') do |val|
    title = val
  end

  opts.parse!
end

puts 'no title passed in, naming new art TEMP' unless title

base_dir = File.expand_path('..', __dir__)
art_dir = base_dir + '/art/'
title_dir = art_dir + title

FileUtils.cp_r(art_dir + '.template', title_dir)

file_edit("#{title_dir}/index.html", /@artwork@/, title)

FileUtils.mv("#{title_dir}/template.js", "#{title_dir}/#{title}.js")

FileUtils.mkdir_p("#{title_dir}/images")

# update index.html
file_insert(base_dir + '/index.html', title)
