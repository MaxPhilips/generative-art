require 'json'

# This script is meant to change the download directory in Google Chrome but Chrome seems to be smart enough to guard
# against this kind of thing

ORIGINAL_JSON = '/Users/mp028833/Library/Application Support/Google/Chrome/Default/Preferences'
NEW_JSON = ORIGINAL_JSON + '.new'
OLD_JSON = ORIGINAL_JSON + '.old'

json_hash = JSON.parse(File.read(ORIGINAL_JSON))

if json_hash['download']['default_directory'] == '/Users/mp028833/Downloads'
  json_hash['download']['default_directory'] = '/Users/mp028833/git/generative-art/processing/warped-barcode/images'
else
  json_hash['download']['default_directory'] = '/Users/mp028833/Downloads'
end

File.write(NEW_JSON, json_hash.to_json)

File.rename(ORIGINAL_JSON, OLD_JSON)
File.rename(NEW_JSON, ORIGINAL_JSON)
File.delete(OLD_JSON)
