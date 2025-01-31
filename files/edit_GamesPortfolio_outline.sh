#!/usr/bin/env bash
set -eu

ORIG='/d/stuff/cv/em Word/2024/GamesPortfolio.pdf'
DEST='GamesPortfolio_4.pdf'

declare -A GAMES
GAMES['Slide 1']='Homeseek'
GAMES['Slide 2']='unBroken Dreams'
GAMES['Slide 3']='Hush My Child'
GAMES['Slide 4']='The Lava Is Floor'
GAMES['Slide 5']='Harvest Defense'

function emit_substitutions() {
    for page in "${!GAMES[@]}"; do
        printf 's;/Title(%s);/Title(%s);\n' "$page" "${GAMES[$page]}"
    done
}

cp "$ORIG" "$DEST"
sed --binary --in-place "$(emit_substitutions)" "$DEST"
