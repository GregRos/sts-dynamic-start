package DynamicStarterDeck;

import com.megacrit.cardcrawl.cards.AbstractCard;
import com.megacrit.cardcrawl.dungeons.AbstractDungeon;
import org.apache.logging.log4j.Logger;
import java.util.function.Function;

public class CardMeasure implements Function<AbstractCard, Double> {

    private AbstractCard.CardColor _color;
    private final static Logger logger = DynamicStarterDeck.logger;;
    CardMeasure(AbstractCard.CardColor color) {
        _color = color;
    }

    public Double apply(AbstractCard x) {
        double colorWeight = 0;

        if (x.color == AbstractCard.CardColor.COLORLESS) {
            colorWeight = 1;
        } else if (x.color == _color) {
            colorWeight = 3;
        } else if (x.color == AbstractCard.CardColor.CURSE || x.color == null) {
            colorWeight = 1;
        }
        double upgradedWeight = 0;
        if (!x.upgraded) {
            upgradedWeight = 1;
        }
        double rarityWeight = 0;
        switch (x.rarity) {
            case RARE:
                rarityWeight = 1;
                break;
            case UNCOMMON:
                rarityWeight = 4;
                break;
            case COMMON:
                rarityWeight = 32;
                break;
            case BASIC:
                rarityWeight = 64;
                break;
            case CURSE:
                rarityWeight = 1;
                break;
        }
        double result = colorWeight * upgradedWeight * rarityWeight;
        logger.debug(String.format("Card measure function output: %s %f.2 %f.2 %f.2 %f.2", x.name, colorWeight, rarityWeight, upgradedWeight, result));
        return result;
    }
}
