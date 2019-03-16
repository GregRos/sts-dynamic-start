package DynamicStart;
import com.evacipated.cardcrawl.modthespire.lib.SpireInitializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpireInitializer
public class DynamicStart {

    public static final Logger logger = LogManager.getLogger(DynamicStart.class.getName());

    public DynamicStart() {
        // TODO: make an awesome mod!
    }

    public static void initialize() {
        new DynamicStart();
    }

}
