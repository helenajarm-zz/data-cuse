curl 'https://api.census.gov/data/2015/acs5?get=B23025_005E&for=tract:*&in=state:36+county:067' -o unemployment-raw.json
ndjson-cat unemployment-raw.json | ndjson-split 'd.slice(1)' | ndjson-map '{id: d[2] + d[3], B23025: +d[0]}' > unemployment-raw.ndjson
ndjson-join 'd.id' tracts-id.ndjson unemployment-raw.ndjson > joined-unemployment.ndjson
ndjson-map 'd[0].properties = { unemployment: d[1].B23025}, d[0]' < joined-unemployment.ndjson > unemployment-geo.ndjson
ndjson-reduce < unemployment-geo.ndjson | ndjson-map '{type: "FeatureCollection", features: d}'> unemployment-geo.json
