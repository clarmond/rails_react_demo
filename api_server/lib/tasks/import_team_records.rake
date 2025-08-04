require "date"
require "httparty" 
require "nokogiri"
require "json"

namespace :db do
    desc "Imports data from a JSON file into the database"
    task import_team_records: :environment do
        # Check for existing screen scrape.  If modification date is today, then do not update
        html_file = Rails.root.join("data", "mlb-standings.html")
        update_file = true
        if File.exist?(html_file)
            last_modified = File.mtime(html_file).strftime("%Y-%m-%d")
            current_date = Date.today.strftime("%Y-%m-%d")
            if last_modified == current_date
                update_file = false
            end
        end

        if update_file == false
            puts "Nothing to update"
            exit(0)
        end

        response = HTTParty.get("https://www.mlb.com/standings/", { 
            headers: { 
                "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36" 
            }, 
        })
        File.write(html_file, Nokogiri::HTML(response.body))
        puts "#{html_file} updated"

        # Parse HTML data 
        records = []
        doc = Nokogiri::HTML(File.open(html_file))
        table_rows = doc.css("tr")
        table_rows.each do |table_row|
            team_name = table_row.css("th").css("a").text.strip
            team_data = table_row.css("td")
            if team_name != ""
                wins = team_data[0].text.strip
                losses = team_data[1].text.strip
                records.push({
                    "name" => team_name,
                    "wins" => wins,
                    "losses"=> losses
                })
            end
        end

        # Update database
        Record.destroy_all

        records.each do |item_data|
            puts "Importing #{item_data["name"]}"
            team = Team.find_by(name: item_data["name"])
            Record.create!(
                team_id: team.id,
                name: item_data["name"],
                wins: item_data["wins"],
                losses: item_data["losses"]
            )
        end

        puts "JSON data imported successfully!"
    rescue JSON::ParserError => e
        puts "Error parsing JSON: #{e.message}"
    rescue StandardError => e
        puts "An error occurred during import: #{e.message}"
    end
end