package dynamicStart

import com.megacrit.cardcrawl.cards.AbstractCard
import com.megacrit.cardcrawl.cards.AbstractCard.CardType.*
import com.megacrit.cardcrawl.dungeons.AbstractDungeon
import com.megacrit.cardcrawl.helpers.CardLibrary

val blockPattern = """(\d+|!B!) Block""".toRegex()

class CardsByCategory {
    var offense: CdfSelector
    var defense: CdfSelector
    var special: CdfSelector
    var curse: CdfSelector

    init {
        val result = CardLibrary.getAllCards().flatMap { card ->
            val cards = mutableListOf(card)
            if (card.canUpgrade()) {
                val upgraded = card.makeCopy()
                upgraded.upgrade()
                cards.add(upgraded)
            }
            cards
        }
        val offensePool = mutableListOf<AbstractCard>()
        val defensePool = offensePool.toMutableList()
        val specialPool = offensePool.toMutableList()
        val cursePool = offensePool.toMutableList()

        for (card in result) {
            card.initializeDescription()

            when(card.type) {
                CURSE -> cursePool += card
                POWER -> specialPool += card
                SKILL ->
                    if (blockPattern.containsMatchIn(card.rawDescription)) {
                        defensePool += card
                    } else {
                        specialPool += card
                    }
                ATTACK -> {
                    if (blockPattern.containsMatchIn(card.rawDescription)) {
                        defensePool += card
                    }
                    offensePool += card
                }
                else -> {

                }
            }
        }
        val measure = CardMeasure(AbstractDungeon.player.cardColor)
        val rng = AbstractDungeon.cardRandomRng
        offense = CdfSelector(rng, offensePool, measure)
        defense = CdfSelector(rng, defensePool, measure)
        special = CdfSelector(rng, specialPool, measure)
        curse = CdfSelector(rng, cursePool, measure)
    }
}
