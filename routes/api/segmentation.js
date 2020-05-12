var natural = require('natural');

var classifier = new natural.BayesClassifier();


const segmentation = param => {

    //
    classifier.addDocument('i am long qqqq', 'mouhib');
    classifier.addDocument('buy the long q\'s', 'buy');
    classifier.addDocument('forfait', 'all offers');
    classifier.addDocument('offre', 'all offers');
    classifier.addDocument('qSDQFQ', 'no question');
    classifier.addDocument('le forfait internet  25 gb 25d/mois', 'forfait internet');
    classifier.addDocument('le forfait internet 50 gb 55/mois', 'forfait internet');
    classifier.addDocument('le forfait appel 5 heures a 55/mois', 'forfait appel');
    classifier.addDocument('le forfait appel illimité  a 150/mois', 'forfait appel');
    classifier.addDocument('internet ', 'internet');
    classifier.addDocument('connection', 'internet');
    classifier.addDocument('gb', 'internet');
    classifier.addDocument('go', 'internet');






    classifier.train();

    return classifier.classify(param)

}
module.exports = segmentation;