package dynamicStart

import com.evacipated.cardcrawl.modthespire.lib.SpirePatch
import com.megacrit.cardcrawl.cards.CardGroup
import com.megacrit.cardcrawl.cards.CardGroup.*
import com.megacrit.cardcrawl.core.CardCrawlGame
import com.megacrit.cardcrawl.dungeons.AbstractDungeon
import com.megacrit.cardcrawl.neow.NeowEvent
import java.util.ArrayList

object dailyBlessingPatch {
    @SpirePatch(clz = NeowEvent::class, method = "dailyBlessing")
    object dailyBlessing {
        @JvmStatic
        fun Postfix(__instance: NeowEvent) {
            if (CardCrawlGame.trial.dailyModIDs().contains("DynamicStart:DynamicStart")) {
                val byCat = CardsByCategory()
                val cards = listOf(
                    byCat.offense.get(4),
                    byCat.defense.get(4),
                    byCat.special.get(2)
                ).flatten()

                val grp = CardGroup(CardGroupType.UNSPECIFIED)
                grp.group = ArrayList(cards)
                val playa = AbstractDungeon.player
                val deck = playa.masterDeck
                deck.clear()
                deck.update()
                AbstractDungeon.gridSelectScreen.openConfirmationGrid(grp, "Here you go!")
                deck.update()
            }
        }
    }
}
