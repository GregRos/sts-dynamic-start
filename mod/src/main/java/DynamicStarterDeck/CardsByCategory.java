package DynamicStarterDeck;

import com.megacrit.cardcrawl.cards.AbstractCard;
import com.megacrit.cardcrawl.dungeons.AbstractDungeon;
import com.megacrit.cardcrawl.helpers.CardLibrary;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.regex.Pattern;

class CardsByCategory {
    CdfSelector offense;
    CdfSelector defense;
    CdfSelector special;
    CdfSelector curse;
    private static final Logger logger = DynamicStarterDeck.logger;

    CardsByCategory() {
        ArrayList<AbstractCard> all = new ArrayList<>();
        for (AbstractCard card : CardLibrary.getAllCards()) {
            // We will make a copy of the card before it's returned
            all.add(card);
            if (card.canUpgrade()) {
                AbstractCard upgraded = card.makeCopy();
                upgraded.upgrade();
                all.add(upgraded);
            }
        }

        ArrayList<AbstractCard> offensePool = new ArrayList<>();
        ArrayList<AbstractCard> defensePool = new ArrayList<>();
        ArrayList<AbstractCard> specialPool = new ArrayList<>();
        ArrayList<AbstractCard> cursePool = new ArrayList<>();

        Pattern pattern = Pattern.compile("(\\d+|!B!) Block");
        for (AbstractCard card : all) {
            card.initializeDescription();
            switch (card.type) {
                case CURSE:
                    cursePool.add(card);
                    break;
                case POWER:
                    specialPool.add(card);
                    break;
                case SKILL:
                    if (pattern.matcher(card.rawDescription).find()) {
                        defensePool.add(card);
                    } else {
                        specialPool.add(card);
                    }
                    break;
                case ATTACK:
                    if (pattern.matcher(card.rawDescription).find()) {
                        defensePool.add(card);
                    }
                    offensePool.add(card);
                    break;
            }
        }

        CardMeasure measure = new CardMeasure(AbstractDungeon.player.getCardColor());


        this.offense = new CdfSelector(
                AbstractDungeon.cardRandomRng,
                offensePool,
                measure
        );

        this.defense = new CdfSelector(
                AbstractDungeon.cardRandomRng,
                defensePool,
                measure
        );

        this.special = new CdfSelector(
                AbstractDungeon.cardRandomRng,
                specialPool,
                measure
        );
        this.curse = new CdfSelector(
                AbstractDungeon.cardRandomRng,
                cursePool,
                measure
        );
    }
}
