package dynamicStart

import com.megacrit.cardcrawl.cards.AbstractCard
import com.megacrit.cardcrawl.cards.AbstractCard.CardColor
import com.megacrit.cardcrawl.cards.AbstractCard.CardRarity

class CardMeasure(private val _color: CardColor): (AbstractCard) -> Double {
    override fun invoke(p1: AbstractCard): Double {
        val colorWeight = when (p1.color) {
            CardColor.COLORLESS -> 1.0
            _color -> 3.0
            CardColor.CURSE -> 1.0
            null -> 1.0
            else -> 0.0
        }
        val upgradedWeight = if (p1.upgraded) 0 else 1
        val rarityWeight = when (p1.rarity) {
            CardRarity.BASIC -> 64
            CardRarity.COMMON -> 32
            CardRarity.UNCOMMON -> 4
            CardRarity.RARE -> 1
            CardRarity.CURSE -> 1
            CardRarity.SPECIAL -> 1
            null -> 1
        }
        val result = colorWeight * upgradedWeight * rarityWeight
        logger.debug("Card measure output: $colorWeight * $upgradedWeight $rarityWeight = $result")
        return result
    }

}
