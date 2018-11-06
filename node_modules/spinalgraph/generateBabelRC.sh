#!/usr/bin/env bash
echo "{
        \"presets\": [
          [
            \"@babel/preset-env\",
            {
              \"targets\": {
                \"node\": \"6\"
              }
            }
          ]
        ]
      }
"> .babelrc

