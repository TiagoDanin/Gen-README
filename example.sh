# Show help
gen-readme --help

# Write to stdout
gen-readme package.json

# Pipe output into a new file
gen-readme package.json > README.md

# Add a Travis badge (if not exit .travis.yml)
gen-readme package.json --travis

# Output in README.md
gen-readme package.json --write
