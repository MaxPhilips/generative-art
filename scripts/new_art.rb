require 'fileutils'
require 'optparse'
require 'tempfile'

# This script clones a template directory into a new directory for a new artwork

# https://stackoverflow.com/questions/1274605/how-to-search-file-text-for-a-pattern-and-replace-it-with-a-given-value
def file_edit(filename, regexp, replacement)
  Tempfile.open(".#{File.basename(filename)}", File.dirname(filename)) do |tempfile|
    File.open(filename).each do |line|
      tempfile.puts line.gsub(regexp, replacement)
    end

    tempfile.close

    FileUtils.mv tempfile.path, filename
  end
end

# Inserts a line containing list item HTML into index.html
def file_insert(filename, title)
  Tempfile.open(".#{File.basename(filename)}", File.dirname(filename)) do |tempfile|
    # copy first chunk
    line_cursor = nil
    File.open(filename).each_with_index do |line, index|
      line_cursor = index
      break if /^\s+<li><a href="art\/(?<art_title>[\w-]+)/.match(line)
      tempfile.puts line
    end

    # pick up all li lines
    li_lines = ["        <li><a href=\"art/#{title}/index.html\">#{title}</a></li>\n"]
    line_cursor_2 = nil
    File.open(filename).drop(line_cursor).each_with_index do |line, index|
      line_cursor_2 = index
      break unless /^\s+<li><a href="art\/(?<art_title>[\w-]+)/.match(line)
      li_lines << line
    end

    li_lines.sort.each do |line|
      tempfile.puts line
    end

    # copy last chunk
    File.open(filename).drop(line_cursor + line_cursor_2).each do |line|
      tempfile.puts line
    end

    tempfile.close

    FileUtils.mv tempfile.path, filename
  end
end

title = nil

ARGV.options do |opts|
  opts.on('-t', '--title=val') do |val|
    title = val
  end

  opts.parse!
end

abort('Pass in a title with -t') unless title

base_dir = File.expand_path('..', __dir__)
art_dir = base_dir + '/art/'
title_dir = art_dir + title

FileUtils.cp_r art_dir + '.template', title_dir

file_edit("#{title_dir}/index.html", /@artwork@/, title)

FileUtils.mv "#{title_dir}/template.js", "#{title_dir}/#{title}.js"

FileUtils.mkdir_p("#{title_dir}/images")

# update index.html
file_insert(base_dir + '/index.html', title)
