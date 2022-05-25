# Data Visualization example

Simple data visualization tool that gets data from breakingbadapi(https://breakingbadapi.com/api).

On the main page a user can choose a character and a letter.
An application fetches quotes of the chosen character and creates a histogram based on the chosen letter
(it counts the letter in each quote and shows on the histogram how offen it occurs).

## Simple example

### Data

```
[
    {
        quote_id: 1,
        quote: "aabbcc"
    },
    {
        quote_id: 2,
        quote: "aa"
    },
    {
        quote_id: 2,
        quote: "ab"
    }
]
```
chosen letter - a

### The expected histogram

2/3 of the quotes has 2 letter 'a' and 1/3 has 1 letter 'a',
so the histogram should consist of 2 areas in 2:1 ratio and 
number 2 should be displayed near the bigger area and number 1 near the smaller.