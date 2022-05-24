# Data Visualization example

Simple data visualization tool that gets data from anime-facts-rest-api(https://chandan-02.github.io/anime-facts-rest-api/).

On the main page a user can choose an anime and a letter.
An application fetches facts about the chosen anime and creates a histogram based on the chosen letter
(it counts the letter in each fact and shows on the histogram how offen it occurs).

## Simple example

### Data

```
[
    {
        fact_id: 1,
        fact: "aabbcc"
    },
    {
        fact_id: 2,
        fact: "aa"
    },
    {
        fact_id: 2,
        fact: "ab"
    }
]
```
chosen letter - a

### The expected histogram

2/3 of the facts has 2 letter 'a' and 1/3 has 1 letter 'a',
so the histogram should consist of 2 areas in proportions 2:1 and 
number 2 should be displayed near the bigger area and number 1 near the smaller.