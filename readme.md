# DynamicStart

**Currently in development.**

This mod lets you spice up your playthrough by giving you a random, but balanced set of cards to make playthroughs less samey at the start. Here is how it works:

1. You don't choose the cards themselves. You choose from several deck profiles, with specific numbers of cards of each category (see below). This keeps things playable.
2. The cards are drawn randomly, with much lower chances of getting rarer cards. This keeps things interesting but not overpowered. 
3. You have a low chance of drawing colorless cards.

[**There is a snazzy React app that can let you test it out.**](https://dynamic-start.netlify.com/)

## Card categories

1. **Offense cards** - All cards of the Attack type, with a few hand-picked Skill cards (mainly cards that give Shivs and other Attack cards)
2. **Defense cards** - All non-Power cards that grant a fixed amount of Block (including some Attack cards)
3. **Special cards** - All Power cards, and all Skill cards not in the above categories.
4. **Curse** - Self-explanatory

Some cards are both Offense and Defense.

### Hand-picked 

These are mostly subjective, but I think my categorization is fairly common-sense.

| Color | Card             | Type   | Counted As       | Why?                                          |
| ----- | ---------------- | ------ | ---------------- | --------------------------------------------- |
| R     | Iron Wave        | Attack | Offense, Defense | It deals damage and blocks                    |
| G     | Blade Dance      | Skill  | Offense          | All give-a-shiv Skills are considered attacks |
| G     | Cloak and Dagger | Skill  | Offense, Defense  | It's a Shiv card that gives Block             |
| G     | Dash             | Attack | Offense, Defense  | It deals damage and blocks                    |

The plan is for there to be some generic rules for determining which guard goes into which category, plus hand-picked exceptions. So the mod can interact with modded cards to some extent.

## Deck profiles

Number of cards of each category that each profile gets. Some profiles get curse cards.

[**Current profiles (YAML)**](site/app/content/profiles.yaml)

### Example table

This doesn't reflect the real profiles. It's just an example of what's possible.

| Profile         | Offense | Defense | Special | Curse |
| --------------- | ------ | ------- | ------- | ----- |
| **Balanced**    | 4      | 4       | 2       |       |
| **Brute**       | 8      | 2       | 2       |       |
| **Sly**         | 2      | 5       | 3       |       |
| Glutton         | 8      | 8       | 3       | 1     |

## How cards are drawn

*This section has MathJax math in it, which GItHub doesn't really support. You can find an extension to render it for you.*

We give different cards weights depending on:

1. Their color (same color = more weight)
2. Their rarity (less rare = more weight)
3. To draw the starter deck, we pick randomly pick cards for each category from all the unlocked cards, with some cards receiving more weight based on the above criteria. 

The group of cards you pick from includes all colorless cards and same-color cards. If additional cards are enabled with custom game options, they will be weighted as colorless cards.

All curses are equally likely to be drawn.

The weights can also be seen as odds (for and against). To find the actual probability of something from its odds:


$$
P(X)=\frac{\mathrm{Odds}(X)}{\sum_{i=1}^{n}\mathrm{Odds}(X_i)}
$$


So if X and Y have 3:1 odds, the probability of X is ${3\over4}$. At least for me, it's easier to reason about probability like this than using 0.344123 and stuff.

[**Current weights (YAML)**](site/app/content/weights.yaml)