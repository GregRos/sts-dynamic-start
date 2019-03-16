package DynamicStart;
import com.evacipated.cardcrawl.modthespire.lib.SpirePatch;
import com.evacipated.cardcrawl.modthespire.lib.SpirePostfixPatch;
import com.megacrit.cardcrawl.cards.AbstractCard;
import com.megacrit.cardcrawl.cards.CardGroup;
import com.megacrit.cardcrawl.dungeons.AbstractDungeon;
import com.megacrit.cardcrawl.neow.NeowEvent;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;

public class dailyBlessingPatch
{
  @SpirePatch(clz= NeowEvent.class, method="dailyBlessing")
  public static class dailyBlessing
  {
      private final static Logger logger = DynamicStart.logger;;

      @SpirePostfixPatch
    public static void Postfix(NeowEvent __instance)
    {
        CardsByCategory byCategory = new CardsByCategory();
        ArrayList<AbstractCard> cards = new ArrayList<>();

        cards.addAll(byCategory.offense.get(4));
        cards.addAll(byCategory.defense.get(4));
        cards.addAll(byCategory.special.get(2));

        CardGroup grp = new CardGroup(CardGroup.CardGroupType.UNSPECIFIED);
        grp.group = cards;
        AbstractDungeon.player.masterDeck.clear();
        AbstractDungeon.player.masterDeck.update();
        AbstractDungeon.gridSelectScreen.openConfirmationGrid(grp, "Here you go!");
        AbstractDungeon.player.masterDeck.update();

    }
  }
}
