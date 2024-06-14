"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
config_1.app.listen(config_1.PORTA, () => {
    console.log(`ouvindo porta ${config_1.PORTA}`);
});
