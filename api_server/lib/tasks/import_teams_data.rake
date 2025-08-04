require "json"

namespace :db do
    desc "Imports initial team data into database"
    task import_teams_data: :environment do
        file_path = Rails.root.join("data", "teams.json")
        unless File.exist?(file_path)
            puts "Error: JSON file not found at #{file_path}"
            exit 1
        end

        json_data = File.read(file_path)
        parsed_data = JSON.parse(json_data)

        Team.destroy_all

        parsed_data.each do |item_data|
        Team.create!(
            name: item_data["name"],
            league: item_data["league"],
            division: item_data["division"],
            abbrev: item_data["abbrev"]
        )
        end

        puts "JSON data imported successfully!"
    rescue JSON::ParserError => e
        puts "Error parsing JSON: #{e.message}"
    rescue StandardError => e
        puts "An error occurred during import: #{e.message}"
    end
end