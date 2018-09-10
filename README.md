# SWITCH Light

## Requirements

- Node v8.0 and up
- npm (this should be taken care of by Node)

## Running

1. Clone the project. (`git clone`)
2. Run `npm install` in the directory where you cloned it
3. Run `npm start`

## Add to sidebar

https://youtu.be/qPyGMcT8Bbs

## TODOS

1. Check that the load zones correspond to the 53 we have in Mexico. `load_zones.tab`
2. Switch to TypeScript
3. Add support for `*.tsv` files (do not hardcode extensions)
4. Add propTypes to components
5. Add Redux?

### Code Health

1. Add linter
2. Switch to TypeScript

# EXCEPTIONS:


`sed -i 's/,_/_/g'`
Run that for all `.tab` files

1. Check that all the `.tab` files are actually tab separated (`\t`). EXAMPLE: `rps_targets.tab`
2. commas in names for gen_projects_predetermined are not acceptable
3. `\r` line endings in `gen_build_predetermined.tab`. (CR which not used by either Linux nor Windows)
4. Make sure they have EOL char
5. **GEN_BUILD_COSTS** refuses to be read by xsv and weird things happen when read with R
6. `gen_projects_info.tab`: the `_,_` and `a,b` patterns are illegal in CSV files:
	- `sed -i -r 's/([a-z]),([a-z])/\1_\2/g' generation_projects_info.tab`
