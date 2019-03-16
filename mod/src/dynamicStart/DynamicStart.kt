package dynamicStart

import basemod.BaseMod
import basemod.interfaces.AddCustomModeModsSubscriber
import basemod.interfaces.EditStringsSubscriber
import com.badlogic.gdx.Gdx
import com.evacipated.cardcrawl.modthespire.lib.SpireInitializer
import com.megacrit.cardcrawl.localization.RunModStrings
import com.megacrit.cardcrawl.screens.custom.CustomMod
import org.apache.logging.log4j.LogManager
import java.nio.charset.StandardCharsets

val logger = LogManager.getLogger(DynamicStart::class.java)!!

@SpireInitializer
class DynamicStart : AddCustomModeModsSubscriber, EditStringsSubscriber {
    override fun receiveEditStrings() {
        logger.info("It was ${123}")

        val modStrings = Gdx.files.internal("localization/DynamicStart-DailyModStrings.json").readString(
            StandardCharsets.UTF_8.toString()
        )
        BaseMod.loadCustomStrings(RunModStrings::class.java, modStrings)
    }

    override fun receiveCustomModeMods(p0: MutableList<CustomMod>?) {
        p0?.add(CustomMod("DynamicStart:DynamicStart", "b", true))
        logger.info("It was ${123}")
    }

    init {
        BaseMod.subscribe(this)
    }

    companion object {

        @JvmStatic
        fun initialize(): DynamicStart {
            return DynamicStart()
        }
    }
}

