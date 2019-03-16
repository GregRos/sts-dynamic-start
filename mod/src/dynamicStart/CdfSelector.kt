package dynamicStart

import com.megacrit.cardcrawl.cards.AbstractCard
import com.megacrit.cardcrawl.random.Random
import java.util.logging.LogManager

class CdfSelector(
    val _rng: Random,
    cards: List<AbstractCard>,
    val _measure: (AbstractCard) -> Double
) {
    val _cdf = mutableListOf<Double>()
    val _cards = mutableListOf<AbstractCard>()
    init {
        var last = .0
        for (card in cards) {
            val curMeasure = _measure(card);
            if (curMeasure == .0) continue;
            last += curMeasure
            _cdf.add(last)
            _cards.add(card)
        }
        logger.debug(_cdf.map { x -> "$x" })
    }

    fun get(): AbstractCard {
        val rnd = _rng.random(_cdf.last().toFloat())
        logger.debug("Random: $rnd")

        for (i in 0.._cdf.size) {
            val cur = _cdf[i]
            if (cur > rnd) {
                return _cards[i].makeCopy()!!
            }
        }
        throw Exception("this code should not be reachable")
    }

    fun get(n: Int): List<AbstractCard> {
        return (0..n).map { get() }
    }


}
