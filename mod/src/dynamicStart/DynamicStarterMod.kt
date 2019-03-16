package dynamicStart

import com.megacrit.cardcrawl.core.CardCrawlGame
import com.megacrit.cardcrawl.daily.mods.AbstractDailyMod

class DynamicStartMod : AbstractDailyMod(ID, NAME, DESC, null, true) {
    companion object {
        val ID = "DynamicStart:DynamicStart"
        private val modStrings = CardCrawlGame.languagePack.getRunModString("DynamicStart:DynamicStart")
        val NAME = modStrings.NAME
        val DESC = modStrings.DESCRIPTION

        @JvmStatic
        fun initialize() {
            DynamicStartMod()
        }
    }
}
