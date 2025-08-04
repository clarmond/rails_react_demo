# Rails React Demo

## Introduction
This application serves no real purpose other than to be a demonstration of
[Ruby on Rails](https://rubyonrails.org/) and [React](https://react.dev/).

What this app does:
- Scrapes the MLB site for data
- Stores that data in the built-in SQLite database
- Provides an API server for React
- Takes the raw API data and filters it
- Displays parsed data

## Lessons Learned
- How to install and run a Rails API server
- Creating database models using Rails scaffolding
- How to create associations (foreign keys) between database tables in Rails
- Using [rake](https://guides.rubyonrails.org/v4.2/command_line.html#rake) to run data migration tasks
- Configuring [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) headers in Rails
- Practice React skills

## Instructions

### Requirements
- Ruby Version 3.4.4
- Rails Version 8.0.2
- Node Version 22+

### API Server
```bash
cd api_server
bundle install --gemfile
bin/rake db:import_teams_data
bin/rake db:import_team_records
rails s
```

### React Server
```bash
cd client
npm install
```

Create a `.env` file with the following line:
`VITE_API_URL=http://127.0.0.1:3000`

`npm run dev`

Open http://localhost:3001/