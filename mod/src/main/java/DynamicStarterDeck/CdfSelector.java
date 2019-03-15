package DynamicStarterDeck;
import basemod.BaseMod;
import com.megacrit.cardcrawl.cards.AbstractCard;
import com.megacrit.cardcrawl.random.Random;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.function.Function;

class CdfSelector {
    private Random _rng;
    private ArrayList<Double> _cdf;
    private ArrayList<AbstractCard> _cards;
    private final static Logger logger = DynamicStarterDeck.logger;;

    CdfSelector(Random rng, ArrayList<AbstractCard> cards, Function<AbstractCard, Double> measure) {
        _cards = new ArrayList<>();
        _cdf = new ArrayList<Double>();
        _rng = rng;
        double last = 0;
        for (AbstractCard card : cards) {
            double curMeasure = measure.apply(card);
            if (curMeasure == 0) continue;
            last = last + curMeasure;
            _cdf.add(last);
            _cards.add(card);
        }
        ArrayList<String> stringified = new ArrayList<>();
        for (double weight : _cdf) {
            stringified.add("" + weight);
        }
        logger.info(String.format("Cdf initialized: %s", String.join(", ", stringified)));
    }

    private AbstractCard get() {
        double random = _rng.random(this._cdf.get(_cdf.size() - 1).floatValue());
        logger.info(String.format("Random: %f", random));
        for (int i = 0; i < _cdf.size(); i++) {
            Double cur = _cdf.get(i);
            if (cur > random) {
                return _cards.get(i).makeCopy();
            }
        }
        throw new RuntimeException("This code should not be reachable");
    }

    ArrayList<AbstractCard> get(int n) {
        ArrayList<AbstractCard> grp = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            AbstractCard card = get();
            grp.add(card);
            logger.debug(String.format("CdfSelector drew: %s", card));
        }
        return grp;
    }
}
