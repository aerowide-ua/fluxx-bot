const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    userId: {type: String, require: true, unique: true},
    silvercards: {type: Number, default: 0},
    goldcards: {type: Number, default: 0},

    vehmicsilver: {type: Number, default: 0},
    nextsilver: {type: Number, default: 0},
    alphasilver: {type: Number, default: 0},
    irongirlssilver: {type: Number, default: 0},
    sythsilver: {type: Number, default: 0},
    panzersilver: {type: Number, default: 0},
    cirilicsilver: {type: Number, default: 0},
    harmsilver: {type: Number, default: 0},
    dtlsilver: {type: Number, default: 0},
    mrtoastysilver: {type: Number, default: 0},
    shebeelsilver: {type: Number, default: 0},
    contrasilver: {type: Number, default: 0},
    hexerionsilver: {type: Number, default: 0},
    sirfilosilver: {type: Number, default: 0},
    kamtesilver: {type: Number, default: 0},
    epicbroomsilver: {type: Number, default: 0},
    okiepsilver: {type: Number, default: 0},
    smirkysilver: {type: Number, default: 0},
    xdiimsilver: {type: Number, default: 0},
    ralseisilver: {type: Number, default: 0},
    catiogold: {type: Number, default: 0},
    coldgold: {type: Number, default: 0},
    darkgold: {type: Number, default: 0},
    ralseigold: {type: Number, default: 0},
    vultragold: {type: Number, default: 0},
    stretchogold: {type: Number, default: 0},
    valkyriegold: {type: Number, default: 0},
    xendergold: {type: Number, default: 0},
    krystalgold: {type: Number, default: 0},
    xdiimgold: {type: Number, default: 0},
    jayxgold: {type: Number, default: 0},
    blazengold: {type: Number, default: 0},
    ranifgold: {type: Number, default: 0},
    xdissgold: {type: Number, default: 0},
    noobseogold: {type: Number, default: 0},
    nightfalcongold: {type: Number, default: 0},
    aerowidegold: {type: Number, default: 0},
    lacleygold: {type: Number, default: 0},
    alekirlgold: {type: Number, default: 0},
    epicbroomgold: {type: Number, default: 0},
    farosegold: {type: Number, default: 0},
    heylogold: {type: Number, default: 0},
    zakaigold: {type: Number, default: 0},
    mirkgold: {type: Number, default: 0},
    vehmicgold: {type: Number, default: 0},

}, {strict: false});

const model = mongoose.model("fluxxcards", cardSchema);

module.exports = model;

