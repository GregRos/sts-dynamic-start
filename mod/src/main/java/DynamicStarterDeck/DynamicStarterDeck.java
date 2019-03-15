package DynamicStarterDeck;
import com.evacipated.cardcrawl.modthespire.lib.SpireInitializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpireInitializer
public class DynamicStarterDeck {

    public static final Logger logger = LogManager.getLogger(DynamicStarterDeck.class.getName());

    public DynamicStarterDeck() {
        // TODO: make an awesome mod!
    }

    public static void initialize() {
        new DynamicStarterDeck();
    }

}
