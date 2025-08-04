# Create Models
```bash
bin/rails g scaffold Team name:string league:string division:string abbrev:string

bin/rails g scaffold Record name:string wins:integer losses:integer team:references

rails db:migrate
```

# Data Import
```bash
bin/rake db:import_teams_data
bin/rake db:import_teams_records
```
