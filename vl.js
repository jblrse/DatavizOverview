// Assign the specification to a local variable vlSpec.
  var vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "data": {
      'url': 'data.csv',
      'format': {
        'type': 'csv'
      }
    },
    'vconcat': [
      {
        'width': 750,
        'transform': [{
          'filter': {
            'selection': {'and': ['pts', 'pmas']}
          },
        }],
        'mark': 'line',
        'encoding': {
          'x': {
            'timeUnit': 'year', 'field': 'Date', 'type': 'temporal',
          },
          'y': {'aggregate': 'sum', 'field': 'LRE', 'type': 'quantitative'},
          'color': {'field': 'PEO', 'type': 'nominal'}
        }
      },
      {
        'width': 750,
        'transform': [{
          'filter': {'selection': 'pts'}
        }],
        'mark': 'circle',
        'selection': {
          'pmas': {
            'type': 'interval', 'encodings': ['x']
          }
        },
        'encoding': {
          'x': {'field': 'PMA', 'type': 'nominal'},
          'y': {'aggregate': 'count', 'field': 'LRE', 'type': 'quantitative'},
          'color': {
            'condition': {
              'selection': 'pmas', 'field': 'PEO', 'type': 'nominal'
            },
            'value': 'grey'
          }
        }
      },
      {
        'width': 750,
        "mark": "bar",
        'selection': {
          'pts': {
            'type': 'single', 'encodings': ['y']
          }
        },
        "encoding": {
          "y": {"field": "PEO", "type": "nominal"},
          "x": {
            "aggregate": "count", "field": "PEO", "type": "quantitative",
            "axis": {
              "title": "Average of b"
            }
          },
          'color': {
            'condition': {
              'selection': 'pts',
              'value': 'steelblue'
            },
            'value': 'grey'
          }
        }
      }
    ]
  };

  // Embed the visualization in the container with id `vis`
  vegaEmbed("#vis", vlSpec);