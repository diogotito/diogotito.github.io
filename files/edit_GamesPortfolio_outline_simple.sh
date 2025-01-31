cp '/d/stuff/cv/em Word/2024/GamesPortfolio.pdf' GamesPortfolio_4.pdf
sed --binary --in-place '
    s/Slide 1/Homeseek/
    s/Slide 2/unBroken Dreams/
    s/Slide 3/Hush My Child/
    s/Slide 4/The Lava Is Floor/
    s/Slide 5/Harvest Defense/
' GamesPortfolio_4.pdf
