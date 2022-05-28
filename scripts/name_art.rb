require 'optparse'

require_relative 'helper'

# This script renames the artwork directory named TEMP to the provided name

title = nil

ARGV.options do |opts|
  opts.on('-t', '--title=val') do |val|
    title = val
  end

  opts.parse!
end

abort('pass in a title with -t') unless title

base_dir = File.expand_path('..', __dir__)
art_dir = base_dir + '/art/'
title_dir = art_dir + title

abort("there is no #{art_dir + 'TEMP'} directory to rename") unless Dir.exist?(art_dir + 'TEMP')

FileUtils.cp_r(art_dir + 'TEMP', title_dir)

file_edit("#{title_dir}/index.html", /TEMP/, title)

FileUtils.mv("#{title_dir}/TEMP.js", "#{title_dir}/#{title}.js")

FileUtils.mkdir_p("#{title_dir}/images")

# update index.html
file_replace(base_dir + '/index.html', 'TEMP', title)

FileUtils.rm_r(art_dir + 'TEMP')
